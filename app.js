const fs = require("fs");

const inputUrl = process.argv[2];
const splittedInputUrl = inputUrl.split('.');


function readFile(url){
    try {
        const data = fs.readFileSync(url, "utf8");
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}


function writeData(url, data){
    try {
        fs.writeFileSync(url, data);
    } catch (err) {
        console.error(err.message);
    }
}




