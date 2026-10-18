// Part 1 - HARD-CODED SECRETS (insecure on purpose)
// Every secret below is written directly in the source code, so anyone who
// can read this repository (or its git history) can read the secrets.

const http = require("http");
const fs = require("fs");

const PORT = 3000;
const DB_USER = "admin";
const DB_PASSWORD = "SuperSecret123!";
const API_KEY = "demo-api-key-1234567890";

const mask = (value) => value.slice(0, 3) + "*".repeat(value.length - 3);

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  res.setHeader("Content-Type", "text/plain");

  // Simple operation #1: the API key protects the endpoint
  if (url.searchParams.get("key") !== API_KEY) {
    res.statusCode = 401;
    return res.end("401 Unauthorized - pass ?key=<API_KEY>\n");
  }

  // Simple operation #2: "log in" to a pretend database with the credentials
  const files = fs.readdirSync("./").join("\n");
  res.statusCode = 200;
  res.end(
    `Secrets source: hard-coded in app.js\n` +
      `Connected to DB as ${DB_USER} (password ${mask(DB_PASSWORD)})\n\n` +
      `Files in this folder:\n${files}\n`
  );
});

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:${PORT}/?key=${API_KEY}`);
});
