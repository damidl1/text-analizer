 // una cosa utile da fare prima di iniziare un progetto node è usare npm init in terminale

 
const fs = require("fs");
 
 const fileUrl = process.argv[2]; // argomento 0 sempre node, argomento 1 nome della mia applicazione e da argomento 3 (che si prende con indice 2) in poi sono quelli che aggiungo e mi interessano, che di solito sono da indice 2 in poi

 const outputUrl = createOutputUrl(fileUrl);

 const data = readFile(fileUrl);  // andiamo a leggere il file

 
 if (data) {  // se c'è data leggi il file con url e se c'è crea un file e riscrivilo ad es pippo-report
    
    const report = createReport(data);
    writeData(outputUrl, report);
 }



 
 function createOutputUrl(url) { // prende url file input e fa url file output simile a quello di input ma con una differenza // esempio ./demo-files/pippo.txt => ./demo-files/pippo-report.txt
   
   const splittedUrl = url.split('.');
  
   const lastPart = splittedUrl.pop();  // togliamo via ultima parte dell'url
   
   const firstPart = splittedUrl.join('.');
   
   const finalUrl = firstPart + '-report.' + lastPart;

   return finalUrl;
 
}

 
 
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


function createReport(data) {  //scriverà il report partendo da data
    
    let report = 'numero di caratteri: ' + countChars(data) + '\n' + 
                 'numero di parole: ' + countWords(data) + '\n' +
                 'carattere più usato: ' + mostUsedChar(data) + '\n' +
                 'parola con più occorrenze: ' + mostUsedWord(data);
    return report;

}


function countChars(data) {
    const dataWithoutSpaces = data.replace(/ /g, '');
   
   return dataWithoutSpaces.length;

}


function countWords(data) {
    
 const dataArray = data.split(' ');
 return dataArray.length;

}

function topOccurencyInArray(arr) {
    
    let occurrencyMap = {};
    for (let i = 0; i < arr.length; i++) {

        const el = arr[i];

        if(occurrencyMap[el]){
            occurrencyMap[el]+=1;
        }else{
            occurrencyMap[el]=1;
        }
    }

    const keyValues = Object.entries(occurrencyMap);

    keyValues.sort((e1,e2) =>{
        const firstValue = e1[1];
        const secondValue = e2[1];
        return secondValue - firstValue;
    });

    return keyValues[0][0];
}



function mostUsedChar(data) {
    
    const dataWithoutSpaces = data.replace(/ /g, ''); // per rimuovere tutti gli spazi che ci sono (sia prima, che dopo che dentro le stringhe)
    return topOccurencyInArray(dataWithoutSpaces);

//     let charMap = {};

//     for (let i = 0; i < dataWithoutSpaces.length; i++) {
//         const char = dataWithoutSpaces[i];
        
//         if (charMap[char]) {
//             charMap[char] += 1; // se la lettera c'è già aumenta il conto di 1
//         } else {
//             charMap[char] = 1;  // se la lettera non c'è ancora crea una nuova proprietà e quando incontra lettere già presenti le aggiunge
//         }
//     }
  

//   const keyValues = Object.entries(charMap);
//   keyValues.sort((e1, e2) => {
//     const firstValue = e1[1];
//     const secondValue = e2[1];
//     return secondValue - firstValue;

//  });

//  return keyValues[0][0];  // prendiamo il primo elemento mettendo indice 0 e per prendere il secondo 
 

}



function mostUsedWord(data) {
    
    const splittedData = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()(\r\n|\n|\r)]/g,"").split(' ');
    return topOccurencyInArray(splittedData);


//     let wordMap = {};

//     for (let i = 0; i < splittedData.length; i++) {
//         const word = splittedData[i];

//         if (wordMap[word]) {
//             wordMap[word] += 1;
//         } else {
//             wordMap[word] = 1;
//         }
        
//     }
//     const keyValues = Object.entries(wordMap);
//     keyValues.sort((e1, e2) => {
//       const firstValue = e1[1];
//       const secondValue = e2[1];
//       return secondValue - firstValue;
  
//    });
  
//    return keyValues[0][0];

}