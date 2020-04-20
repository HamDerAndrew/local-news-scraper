const request = require('request');
const cheerio = require('cheerio');

request('https://faa.dk/svendborg', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        //load html and create a 'jQuery'-like selection variable.
        const $ = cheerio.load(html);
        
        //grab lists in the div container with a class of 'list'
        const lists = $('.list');

        lists.each((index, element) => {
            const title = $(element).find('.list__title');
            const list = $(element).find('ul');
            if(title.text() === "Seneste plus") {
                return
            }
            console.log(title.text().replace(/\s\s+/g, ''));
            console.log("---------------------------------");
            console.log(list.text().replace(/\s\s+/g, ''));
            
        })
    }
})
