const puppeteer = require('puppeteer');
// importing the function into the test file
const { generateText, checkAndGenerate } = require('./util');

// define the outputs we are testing for
// testing code is executed in anonymous function
test('should output name and age', () => {
    const text = generateText('Max', 29)
    expect(text).toBe('Max (29 years old)');
    // can generate multiple tests
    const text2 = generateText('Ana', 28)
    expect(text2).toBe('Ana (28 years old)');
});


// check for false positives and opposites
// test ('should output data-less text', ()=> {
//     const text = generateText('', null);
//     expect(text).toBe(' ( years old)');
// })


//  INTEGRATION TESTING
test('should generate a valid text output', ()=>{
    const text = checkAndGenerate('Max', 29);
    expect(text).toBe('Max (29 years old)')
})

//  USER INTERFACE TEST:
test('should create an element with text and correct class', async ()=>{
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    })
    const page = await browser.newPage();
    await page.goto(
        'file:///Users/nancyluu/js-testing-introduction/index.html'
    );
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent)
    expect(finalText).toBe('Anna (28 years old)'); 
}, 10000);