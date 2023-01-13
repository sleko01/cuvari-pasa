const {By,Key,Builder} = require("selenium-webdriver")
require("chromedriver")

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function loginTest(){
    let driver = await new Builder().forBrowser("chrome").build()
    await driver.get("http://localhost:3000")

    await driver.findElement(By.linkText("Prijava")).click()
    await sleep(500)

    await driver.findElement(By.name("username")).sendKeys("asd")
    await driver.findElement(By.name("password")).sendKeys("asdasdasd")
    await driver.findElement(By.id("login")).click()
    await sleep(500)

    if (await driver.getCurrentUrl() == "http://localhost:3000/") {
        await driver.quit()
        console.log("uspjeh")
        return true;
    } else {
        await driver.quit()
        console.log("neuspjeh")
        return false;
    }
}

loginTest();