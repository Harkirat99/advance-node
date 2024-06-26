const puppeteer = require("puppeteer");
const sessionFactor = require('../factories/sessionFactor');
const userFactory = require('../factories/userFactory');

class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
            headless: false
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function(target, property) {
                return customPage[property] || browser[property] || page[property]
            }
        })
    }

    constructor(page) {
        this.page = page;
    }

    async login() {
        const user = await userFactory();
        const { session, sig } = sessionFactor(user);
        await this.page.setCookie({ name: 'session', value: session });
        await this.page.setCookie({ name: 'session.sig', value: sig });
        await this.page.goto('localhost:3000/blogs');
        await this.page.waitForSelector('a[href="/auth/logout"]');
    }

    async getContentsOf(selector) {
        return this.page.$eval(selector, el=> el.innerHTML);
    }
}

module.exports = CustomPage;