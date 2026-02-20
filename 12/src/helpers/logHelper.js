const fs = require('fs');
const path = require('path');

function logFile(file, message) {
    const date = new Date().toISOString();
    const formattedMassage = `[${date}] ${message}\n`;
    const filePath = path.join(__dirname,`../../storage/${file}.log`);
    fs.appendFile(filePath, formattedMassage, (err) => { console.log(err) });
}
module.exports = logFile;