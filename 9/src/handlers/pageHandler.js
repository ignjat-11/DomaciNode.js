const path = require('path');
const fs = require('fs');
const emitter = require('../events/emitter');
const ejs = require('ejs');
const { products } = require('../data/products');
function handlePage(req, res)
{
    const homePath = path.join(__dirname,'../..', 'views/pages/home.ejs');
    const layoutPath = path.join(__dirname,'../..', 'views/layout.ejs');





    ejs.renderFile(homePath,{products: products}, (err, html) => {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            emitter.emit('page:fail');
            return res.end('Error loading file');
        }

        ejs.renderFile(layoutPath,{body: html}, (err, finalHtml) => {

            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                emitter.emit('page:fail');
                return res.end('Error loading file');
            }
            emitter.emit('page:success');
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(finalHtml);

        });
    });

}
function handleAboutPage(req, res)
{
    const aboutPath = path.join(__dirname,'../..', 'views/pages/about.ejs');
    const layoutPath = path.join(__dirname,'../..', 'views/layout.ejs');

    ejs.renderFile(aboutPath,{}, (err, html) => {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            emitter.emit('page:fail');
            return res.end('Error loading file');
        }

        ejs.renderFile(layoutPath,{body: html}, (err, finalHtml) => {

            if (err) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                emitter.emit('page:fail');
                return res.end('Error loading file');
            }
            emitter.emit('page:success');
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(finalHtml);

        });
    });

}
module.exports = { handlePage, handleAboutPage };