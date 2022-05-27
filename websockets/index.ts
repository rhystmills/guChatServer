import { WebSocket, WebSocketServer } from "ws";
import type { IncomingMessage } from "http";
import queryString from "query-string";

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
  color: string;
  brushSize: number;
};

type MessageRequest = {
  type: "message";
  message: Message;
};

type DrawRequest = {
  type: "draw";
  coords: Coords;
};

type NameRequest = {
  type: "name";
  name: string;
  id: number;
};

type User = {
  connection: WebSocket;
  id: number;
  name?: string;
};

type Request = MessageRequest | DrawRequest | NameRequest;

const messages: Message[] = [];
let users: User[] = [];
const drawing: Coords[] = [];

const updateAllConnectionsWithMessages = (message: Message) => {
  users.forEach((user) =>
    user.connection.send(
      JSON.stringify({ type: "messages", messages: [message] })
    )
  );
};

const updateAllConnectionsWithCoords = (coords: Coords) => {
  users.forEach((user) =>
    user.connection.send(JSON.stringify({ type: "draw", coords }))
  );
};

const updateAllConnectionsWithUsers = () => {
  users.forEach((user) =>
    user.connection.send(
      JSON.stringify({
        type: "users",
        users: users.map((user) => {
          return {
            name: user.name,
            id: user.id,
          };
        }),
      })
    )
  );
};

const handleRequest = (request: Request) => {
  switch (request.type) {
    case "message":
      messages.push(request.message);
      updateAllConnectionsWithMessages(request.message);
      break;
    case "draw":
      drawing.push(request.coords);
      updateAllConnectionsWithCoords(request.coords);
      break;
    case "name":
      users.forEach((user) => {
        if (user.id === request.id) {
          user.name = request.name;
        }
      });
      updateAllConnectionsWithUsers();
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

  const onConnection = (
    websocketConnection: WebSocket,
    connectionRequest: IncomingMessage
  ) => {
    const [_path, params] = connectionRequest?.url?.split("?");
    const connectionParams = queryString.parse(params);
    const userId = connectionParams.userId.toString();

    drawing.forEach((coords) => {
      websocketConnection.send(JSON.stringify({ type: "draw", coords }));
    });
    users.push({
      connection: websocketConnection,
      id: Number(userId),
    });
    websocketConnection.send(JSON.stringify({ type: "messages", messages }));
    updateAllConnectionsWithUsers();
    // NOTE: connectParams are not used here but good to understand how to get
    // to them if you need to pass data with the connection to identify it (e.g., a userId).
    const onClose = (a: any, b: any, c: any) => {
      users = users.filter((user) => user.connection !== websocketConnection);
      updateAllConnectionsWithUsers();
    };
    websocketConnection.on("message", requestCallback);
    websocketConnection.on("close", onClose);
  };

  websocketServer.on("connection", onConnection);

  return websocketServer;
};
