const http = require('http');
const {handleStaticFiles} = require('./src/handlers/staticHandler');
const {handleApiCall} = require('./src/handlers/apiHandler');
const {handlePage, handleAboutPage} = require('./src/handlers/pageHandler');
const { products } = require('./src/data/products');

require('./src/listeners/pageListener');

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
    else if(req.url ==='/about')
    {
        handleAboutPage(req,res);
        return;
    }
    const productMatch = req.url.match(/^\/product\/([\w-]+)$/);
    if(productMatch){

        const slug = productMatch[1];
        const product = products.find((product) => product.slug === slug);

        if(product)
        {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            return res.end('Product founded!');

        }

    }

    res.writeHead(404, {"Content-Type": "text/plain"});
    return res.end('Not Found');


});
server.listen(3000, ()=> console.log("Server running at http://localhost:3000"));