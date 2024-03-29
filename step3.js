const fs = require('fs');
const process = require('process')
const axios = require('axios')

function getOutput (text,out){
    if (out) {
        fs.writeFile('one.txt',text, 'utf8', function(err) {
            if (err) {
               console.error(`Error writing ${out}:${err}`);
               process.kill(1);
            }
             else {
              console.log(text)  ;
            }    
        });
    }
}


function cat (path,out) {
fs.readFile('one.txt', 'utf8', function(err,data) {
    if (err) {
       console.error(`Error reading ${path}:${err}`);
       process.kill(1);
    } 
    else {
      getOutput(data,out) ; 
    }
       
})
}

 async function webCat (url,out){
    try {
      let res = await axios.get (url);
      getOutput(res.data, out);
    }
    catch (err){
        console.error(`Error fetching ${url}:${err}`);
       process.kill(1);
    }
}

let path;
let out;

if (process.argv[2] === '--out'){
    out = process.argv[3];
    path = process.argv[4];
}
else {
    path = process.argv[2];
}


if (path.slice(0,4) === 'http') {
    webCat(path,out);
}
else {
    cat(path,out);
}



