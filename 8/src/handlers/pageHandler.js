const path = require('path');
const fs = require('fs');
function handlePage(req, res)
{
    const filePath = path.join(__dirname,'../..', '/public/index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {

        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end('Error loading file');
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        return res.end(data);
    });
}
module.exports = { handlePage };