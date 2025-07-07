import * as express from "express";
import { Application } from "express";
import * as cors from "cors";
import helmet from "helmet";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import * as http from "http";

import { typeDefs, resolvers } from "./schema";

export interface MyContext {
  token?: string;
}

const app: Application = express();
const httpServer = http.createServer(app);

// Security
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Apollo setup
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers
});

export const startApolloServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.authorization || "",
      }),
    }),
  );

  return httpServer;
};

export default app;
