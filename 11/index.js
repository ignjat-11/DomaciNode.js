const http = require('http');
const {handleStaticFiles} = require('./src/handlers/staticHandler');
const {handleApiCall} = require('./src/handlers/apiHandler');
const {handlePage} = require('./src/handlers/pageHandler');
const { fetchSingleProduct, getAllProducts } = require('./src/services/productService');

require('./src/listeners/pageListener');

const server = http.createServer(async (req, res) =>
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

        const products = await getAllProducts();
       /* console.log(data);*/
        handlePage('home',{products: products}, req, res);
        return;
    }
    else if(req.url ==='/about')
    {
        handlePage('about',{}, req,res);
        return;
    }
    else if(req.url === '/register')
    {
        handlePage('register',{}, req,res);
        return;
    }else if(req.url === '/login')
    {
        handlePage('login',{}, req,res);
        return;
    }
    const productMatch = req.url.match(/^\/product\/([\w-]+)$/);
    if(productMatch){

        const slug = productMatch[1];
        const product = await fetchSingleProduct(slug);

        if(product)
        {

            handlePage('permalink',{product: product}, req, res);
            return;
        }

    }

    res.writeHead(404, {"Content-Type": "text/plain"});
    return res.end('Not Found');


});
server.listen(3000, ()=> console.log("Server running at http://localhost:3000"));