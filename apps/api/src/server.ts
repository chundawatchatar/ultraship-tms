import { startApolloServer } from "./app";

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    const httpServer = await startApolloServer();
    httpServer.listen(PORT, () => {
      console.info(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
