const http = require('http');

const {handleStaticFiles} = require('./src/handlers/staticHandler');
const {handleApiCall} = require('./src/handlers/apiHandler');
const {handlePage} = require('./src/handlers/pageHandler');
const server = http.createServer((req, res) =>
{
    if(req.url.startsWith('/public/')){
        handleStaticFiles(req,res);
        return;
    }
    else if(req.url.startsWith('/api/'))
    {
        handleApiCall(req,res);
        return;
    }
    if(req.url === '/') {
        handlePage(req, res);
        return;
    }


    res.writeHead(404, {"Content-Type": "text/plain"});
    return res.end('Not Found');


});
server.listen(3000, ()=> console.log("Server running at http://localhost:3000"));