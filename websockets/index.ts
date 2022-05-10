import { WebSocketServer } from "ws";
import queryString from "query-string";
import { Application } from "express";

type Message = {
  name: string;
  text: string;
  date: number;
};

type MessageRequest = {
  type: "message";
  message: Message;
};

type ConnectionRequest = {
  type: "connection";
};

type Request = MessageRequest | ConnectionRequest;

const messages: Message[] = [];
const connections: any[] = [];

const updateAllConnections = () => {
  connections.forEach((connection) =>
    connection.send(JSON.stringify(messages))
  );
};

const handleRequest = (request: Request) => {
  switch (request.type) {
    case "message":
      messages.push(request.message);

      updateAllConnections();
      break;
    case "connection":
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

    connections.push(websocketConnection);
    updateAllConnections();
    // NOTE: connectParams are not used here but good to understand how to get
    // to them if you need to pass data with the connection to identify it (e.g., a userId).

    websocketConnection.on("message", requestCallback);
  };

  websocketServer.on("connection", onConnection);

  return websocketServer;
};
