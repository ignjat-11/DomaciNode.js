const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "users.json");


const server = http.createServer((req, res) => {

    let body = "";
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        if(!data.hasOwnProperty("email") || !data.hasOwnProperty("password")) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            const jsonResponse = JSON.stringify({success: false, message: "Missing email or password"});
            res.end(jsonResponse);
            return;
        }

            let users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
            const exists = users.some(user => user.email === data.email);
            if(exists) {
                const errorResponse = JSON.stringify({success: false, message: "User already exist"});
                res.writeHead(409, {'Content-Type': 'application/json'});
                res.end(errorResponse);
                return;
            }
            users.push(data);

            fs.writeFileSync(filePath, JSON.stringify(users));

            const jsonResponse = JSON.stringify({success: true, message: "Successfully created new user"});
            res.end(jsonResponse);


    });

});
server.listen(3000);