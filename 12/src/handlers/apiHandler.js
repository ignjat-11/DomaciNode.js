const { createUser, userExists,getUserByEmail } = require('../services/userService');
const queryString = require("node:querystring");
const {pool} = require("../services/mysql");
const bcrypt = require("bcrypt");
const { createSession } = require("../services/sessionService");

async function handleApiCall(req,res)
{
    const urlMatch = req.url.match(/^\/api\/([\w-]+)$/);

    if(urlMatch[1] === 'register' && req.method === 'POST'){

        let body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const formData = queryString.parse(body);
            const errors = [];
            if(!formData.name || formData.name.length < 3)
            {
                errors.push("Name must be set and atleast 3 characters.");
            }
            if(!formData.password || formData.password.length < 3) {
                errors.push("Password must be set and atleast 3 characters.");

            }
            if(!formData.email || !formData.email.includes('@') )
            {
                    errors.push("Email must be set and valid.");
            }
            if(!formData.confirmPassword || formData.confirmPassword.length < 3) {
                errors.push("Password must be confirmed!");

            }
            if(!formData.rules)
            {
                errors.push("You must agree with site rules!");
            }
            if(formData.password && formData.confirmPassword)
            {
                if(formData.password !== formData.confirmPassword)
                {
                    errors.push("Password must match with confirmation password!");
                }
            }
            if(errors.length === 0 && await userExists(formData.email)){
                errors.push("Email already exists!");
            }
            if(errors.length > 0)
            {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify(errors));
            }
            const password = await bcrypt.hash(formData.password, 10);

            const userId = await createUser(formData.name, formData.email, password);
            const sessionId = createSession(userId);
            res.setHeader("Set-Cookie",`sid=${sessionId}; HttpOnly; Path=/`);
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({success: true, message:'Successfully registered'}));
        });

        return;
    }
    if(urlMatch[1] === 'login' && req.method === 'POST')
    {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const formData = queryString.parse(body);
            const errors = [];

            if(!formData.password || formData.password.length < 3) {
                errors.push("Password must be set and atleast 3 characters.");

            }
            if(!formData.email || !formData.email.includes('@') )
            {
                errors.push("Email must be set and valid.");
            }

            if(errors.length > 0)
            {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify(errors));
            }
            const user = await getUserByEmail(formData.email);
            if(!user)
            {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({success:false, message:'This user not exists'}));
            }

            const passwordMatch = await bcrypt.compare(formData.password, user.password);
            if(!passwordMatch)
            {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({success:false, message:'Wrong password'}));
            }

            const sessionId = createSession(user.id);
            res.setHeader("Set-Cookie",`sid=${sessionId}; HttpOnly; Path=/`);
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({success: true, message:'Login success'}));
        });
        return;
    }

    const response = {success: true};
    const data  = JSON.stringify(response);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(data);
}
module.exports = { handleApiCall };