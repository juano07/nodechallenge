function getHints(req) {

    return new Promise ((resolve, reject) => {

        try {   

            let body = '';  

            req.on('data', (piece) => {               
                body += piece;
            });
           
            req.on('end', () => {                
                resolve(body);
            });

        } catch (er) {
            reject(er);
        }

    });

}

function decryptUrl(hintsArray) {

    return new Promise (resolve => {  
            
        if(hintsArray.length == 2)
        {

            let charKeys = hintsArray[0];       
            let charIndexes = hintsArray[1];
            
            let urlArray = [];   
    
            for (key in charKeys) {
    
                let char = key;           
    
                let charKey = charKeys[char];           
    
                let indexesArray = charIndexes[charKey];          
    
                for (let i = 0; i < indexesArray.length; i++) {
    
                    urlArray[indexesArray[i]] = char;

                }          
                
            }   
            
            resolve(JSON.stringify(urlArray.join('')));
        }
        else 
        {
            resolve(JSON.stringify({ Message: "Array must contain exactly 2 JSONs." }))
        }
    });
}

module.exports = { getHints, decryptUrl };