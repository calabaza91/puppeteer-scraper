/**
 * Web Scraper for books
 */

//Requirements
const puppeteer = require('puppeteer')
const randomUserAgent = require('random-useragent')
const { url } = require('./config')

;
(async() => {

    // Open Browser
    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 250,
        devtools: false
    })
    const page = await browser.newPage()


    // Setup Browser
    await page.setDefaultTimeout(10000)
    await page.setViewport({ width: 1200, height: 800 })
    await page.setUserAgent(randomUserAgent.getRandom()) // Make scraper undetectable


    // Get data from bookstore
    const nameSelector = '.product_main h1'
    const priceSelector = '.price_color'
    await page.goto(url)
    await page.waitForSelector(nameSelector)
    await page.waitForSelector(priceSelector)
    const name = await page.$eval(nameSelector, e => e.innerHTML)
    const price = await page.$eval(priceSelector, e => e.innerHTML)
    const nameTrim = name.trim()
    const priceTrim = price.trim()

    // Get current date
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const fullDate = `${day}/${month}/${year}`

    console.log(fullDate + ' | ' + nameTrim + ' | ' + priceTrim)

    // Close Browser
    await browser.close()

})().catch(error => {
    console.log(error)
    process.exit(1)
})