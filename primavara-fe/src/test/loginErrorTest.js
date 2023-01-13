const {By,Key,Builder} = require("selenium-webdriver")
require("chromedriver")

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function loginErrorTest(){
    let driver = await new Builder().forBrowser("chrome").build()
    await driver.get("http://localhost:3000")

    await driver.findElement(By.linkText("Prijava")).click()
    await sleep(500)

    await driver.findElement(By.name("username")).sendKeys("tes")
    await driver.findElement(By.name("password")).sendKeys("aaaaaaaaaaa")
    await driver.findElement(By.id("login")).click()
    await sleep(500)


    if (await driver.switchTo().alert().getText() == "Unauthorized"){
        await driver.quit()
        console.log("uspjesno")
        return true;
    } else {
        await driver.quit()
        console.log("neuspjesno")
        return false;
    }
}

loginErrorTest()