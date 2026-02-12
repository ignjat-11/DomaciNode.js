const fs = require('fs');
const path = require('path');

function logUserVisit(ip)
{
    const log = ip + "\n";

    fs.appendFile('./visitors.txt', log, (err) =>{
        if(err)
        {
            console.log('Error writing to file' + err);
        }
    });
}

function helloWorld()
{
    console.log('Hello World');
}

module.exports =
    {logUserVisit, helloWorld};