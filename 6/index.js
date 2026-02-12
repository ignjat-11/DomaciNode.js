const http = require('http');
const fs = require("fs");
const path = require('path');
const {logUserVisit, helloWorld} = require('./src/logger');

const server = http.createServer((req, res) =>{



    if(req.url.startsWith('/public/js/') && req.url.endsWith('.js')) {
        const jsPath = path.join(__dirname, req.url);
        fs.readFile(jsPath, 'utf8', (err, data) => {
           if(err)
           {
               res.writeHead(500, {'Content-Type': 'text/plain'});
                return res.end('JS file not found!');
           }
           res.writeHead(200, {'Content-Type': 'application/javascript'});
           return res.end(data);
        });
        return;
    }

    if(req.url.startsWith('/api/product')) {

        const jsonPath = path.join(__dirname + "/data", 'product.json');
        fs.readFile(jsonPath, 'utf8', (err, jsonResponse) => {
           if(err)
           {
               res.writeHead(500, {'Content-Type': 'text/plain'});
               return res.end('JSON file not found!');
           }

            res.writeHead(200, {'Content-Type': 'application/json'});
           const status = req.url.includes("available") ? req.url.split("/").pop() : null
           let response = status ?
               JSON.parse(jsonResponse).filter(service=>service.status === status):JSON.parse(jsonResponse)


                return res.end(JSON.stringify(response));
        });

        return;
    }







    const filePath = path.join(__dirname + '/public', 'index.html');
    const filePath2 = path.join('./html/components', 'navigation.html');
    const filePath3 = path.join('./html/components', 'footer.html');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        const nav = fs.readFileSync(filePath2, 'utf-8');
        const footer = fs.readFileSync(filePath3, 'utf-8');
       if(err)
       {
           res.writeHead(500, {'Content-Type': 'text/plain'});
           res.end('Error loading index.html');
       }
        const name = "Test";
       let result = data.replace('{{name}}', name);

       const variables = {
         name: 'Ignjat',
         age: 22,
         height: 185.3,
         weight: 73
       };
       result = result.replace('{{navigation}}', nav);
       result = result.replace("{{footer}}", footer);
       for(const key in variables)
       {
           const htmlKey = "{{"+key+"}}";
           result = result.replace(htmlKey, variables[key]);
       }

       const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        logUserVisit(ip);
        helloWorld();

       res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(result);
    });
});
server.listen(3000, ()=>{
    console.log('Server running at http://localhost:3000');
});
