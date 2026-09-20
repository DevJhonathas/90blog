const http = require("http");

const PORT = 3000;
const API_KEY = "KEY";

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/neocities-info") {
    try {
      const response = await fetch(
        "https://neocities.org/api/info?sitename=johnnythestrangeguy",
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );

      const data = await response.text();

      res.writeHead(response.status, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });

      res.end(data);
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });

      res.end(
        JSON.stringify({
          error: error.message,
        }),
      );
    }

    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
