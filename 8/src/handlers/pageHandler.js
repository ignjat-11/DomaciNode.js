const path = require('path');
const fs = require('fs');
const emitter = require('../events/emitter');
function handlePage(req, res)
{
    const filePath = path.join(__dirname,'../..', '/public/index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {

        err = true;
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            emitter.emit('page:fail');
            return res.end('Error loading file');
        }
        emitter.emit('page:success');
        res.writeHead(200, {"Content-Type": "text/html"});
        return res.end(data);
    });
}
module.exports = { handlePage };