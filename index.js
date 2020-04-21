const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('articles.csv');

request('https://faa.dk/svendborg', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        //load html and create a 'jQuery'-like selection variable.
        const $ = cheerio.load(html);
        
        //grab lists in the div container with a class of 'list'
        const lists = $('.list');

        lists.each((index, element) => {
            const title = $(element).find('.list__title').text();
            const list = $(element).find('ul').text().replace(/\s\s\n/, '');
            if(title === "Seneste plus") {
                return
            }

            //Write a row to CSV (headers)
            writeStream.write(`${title} \n ${list} \n`)
        })

        console.log("Scraping complete");
    }
})
