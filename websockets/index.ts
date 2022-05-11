import { WebSocketServer } from "ws";
import queryString from "query-string";
import { Application } from "express";

type Message = {
  name: string;
  text: string;
  date: number;
};

type Coord = {
  x: number;
  y: number;
};

type Coords = {
  start: Coord;
  end: Coord;
};

type MessageRequest = {
  type: "message";
  message: Message;
};

type DrawRequest = {
  type: "draw";
  coords: Coords;
};

type Request = MessageRequest | DrawRequest;

const messages: Message[] = [];
const connections: any[] = [];
const drawing: Coords[] = [];

const updateAllConnectionsWithMessages = () => {
  connections.forEach((connection) =>
    connection.send(JSON.stringify({ type: "messages", messages }))
  );
};

const updateAllConnectionsWithCoords = (coords: Coords) => {
  connections.forEach((connection) =>
    connection.send(JSON.stringify({ type: "draw", coords }))
  );
};

const handleRequest = (request: Request) => {
  switch (request.type) {
    case "message":
      messages.push(request.message);
      updateAllConnectionsWithMessages();
      break;
    case "draw":
      drawing.push(request.coords);
      updateAllConnectionsWithCoords(request.coords);
      break;
  }
};

export default async (expressServer: any) => {
  const websocketServer = new WebSocketServer({
    noServer: true,
    path: "/websockets",
  });

  expressServer.on("upgrade", (request: any, socket: any, head: any) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  const requestCallback = (requestBuffer: string) => {
    const request: Request = JSON.parse(JSON.parse(requestBuffer));
    handleRequest(request);
  };

  const onConnection = (websocketConnection: any, connectionRequest: any) => {
    const [_path, params] = connectionRequest?.url?.split("?");
    // const connectionParams = queryString.parse(params);

    drawing.forEach((coords) => {
      websocketConnection.send(JSON.stringify({ type: "draw", coords }));
    });
    connections.push(websocketConnection);
    updateAllConnectionsWithMessages();
    // NOTE: connectParams are not used here but good to understand how to get
    // to them if you need to pass data with the connection to identify it (e.g., a userId).

    websocketConnection.on("message", requestCallback);
  };

  websocketServer.on("connection", onConnection);

  return websocketServer;
};
