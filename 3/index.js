



const http = require("http");
const {URL} = require("url");
const news = require("./news.json");



const server = http.createServer((req, res) => {

    const url = new URL(req.url, "http://localhost:3000");



    if(url.pathname === '/')
    {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html; charset=utf-8");
        let allArticles = "";
        news.forEach((article, id) => {
            allArticles += `<p>${article.title}</p>`;
        });

        const html=
            `<!DOCTYPE html>
             <html>
                <head><title>Prikaz News</title></head>
                <body><h1>Prikaz svih News</h1>
                ${allArticles}</body>
             </html>`;
        res.end(html);
    }else if(url.pathname === '/kontakt')
    {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
    }
    else if(url.pathname === '/news')
    {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/plain");
        const title = url.searchParams.get("title");
        const articleFound = news.find(article=>article.title === title);
        if(articleFound)
        {
            res.end("Nasli smo clanak");
        }else{
            res.end("Nismo nasli clanak");
        }
        console.log(articleFound, title);

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