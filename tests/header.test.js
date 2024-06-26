
const Page = require('./helpers/page');

let page;
beforeEach(async () => {
    page = await Page.build(); 
    await page.goto('localhost:3000');

})


// test('The header has the correct text', async () => {
//     const text = await page.$eval('a.brand-logo', el => el.innerHTML);
//     expect(text).toEqual('Blogster');
// });

// test('clicking login start oauth flow', async () => {
//     await page.click('.right a');

//     const url = await page.url();
//     expect(url).toMatch(/accounts\.google\.com/)
// })

test('When signed in, show logout button', async () => {

    await page.login();
    const text = await page.getContentsOf('a[href="/auth/logout"]');

    expect(text).toEqual('Logout');
});


afterEach(async () => {
    await page.close();
})