const http = require("http");
const server = http.createServer((req, res) => {
    if(req.url === '/')
    {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/plant");
        res.end("Dobrodosli na glavnu stranicu!!!");
    }else if(req.url === '/kontakt')
    {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
    }
    else
    {
        res.statusCode = 404;
        res.setHeader("Content-type", "text/plain");
        res.end("Stranica nije pronadjena!!!");
    }
});
server.listen(3000);
console.log("Server running at adress: http://localhost:3000");