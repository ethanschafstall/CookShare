import "dotenv/config";
import app from "./app.js";

const host = process.env.HOST || "localhost";
const port = Number(process.env.PORT) || 3000;

app.listen(port, host, () => {
  console.log(`Listening on port http://${host}:${port}/api/v1/`);
});
