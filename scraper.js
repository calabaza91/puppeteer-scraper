/**
 * Web Scraper for books
 */

//Requirements
const puppeteer = require('puppeteer')
const { url } = require('./config')

;
(async() => {

    // Open Browser
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        devtools: false
    })

    const page = await browser.newPage()


    // Setup Browser
    await page.setDefaultTimeout(10000)
    await page.setViewport({ width: 1200, height: 800 })

    // Close Browser
    await browser.close()

})().catch(error => {
    console.log(error)
    process.exit(1)
})