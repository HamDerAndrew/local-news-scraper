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
            const articles = [];
            const title = $(element).find('.list__title').text();
            const list = $(element).find('.list-article__title');
            //const list = $(element).find('.list-article__title').text().replace(/[a-z][A-Z]/gm, '\n');
            
            if(title === "Seneste plus") {
                return
            }
            
            list.each((i, item) => {
                const listItem = $(item).text();
                articles.push(`${listItem}\n`)
                
            });

            console.log(articles);

            //Write a row to CSV (headers)
            writeStream.write(`${title} \n ${articles} \n`);
        })

        console.log("Scraping complete");

    } else {
        console.log(error);
        console.log(response);
    };
});
