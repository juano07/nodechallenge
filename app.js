const http = require('http');
const { getHints, decryptUrl } = require('./process');

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {   
   
    if (req.url === "/" && req.method === "POST") {
      
        let hint = await getHints(req);
       
        let decryptedUrl = await new decryptUrl(JSON.parse(hint));
       
        res.writeHead(200, { "Content-Type": "application/json" });
      
        res.end(decryptedUrl);
    }    
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ Message: "Page not found!" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});