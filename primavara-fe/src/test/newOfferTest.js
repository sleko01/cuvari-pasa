const {By,Key,Builder} = require("selenium-webdriver")
require("chromedriver")

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//preduvjet ovog testa je da account u koji se prijavljujemo ima dovoljne ovlasti za stvaranje ponuda

async function newOfferTest(){
    let driver = await new Builder().forBrowser("chrome").build()
    await driver.get("http://localhost:3000")

    await driver.findElement(By.linkText("Prijava")).click()
    await sleep(500)

    await driver.findElement(By.name("username")).sendKeys("asd")
    await driver.findElement(By.name("password")).sendKeys("asdasdasd")
    await driver.findElement(By.id("login")).click()
    await sleep(500)

    await driver.findElement(By.linkText("Oglasi")).click()
    await sleep(500)

    await driver.findElement(By.linkText("Dodaj novi oglas")).click()
    await sleep(500)

    await driver.findElement(By.id("startDate")).sendKeys("66\t2023\t27a")
    await driver.findElement(By.id("endDate")).sendKeys("66\t2023\t27p")

    await driver.findElement(By.id("address")).sendKeys("Ulica Brune Bušića 30")
    await driver.findElement(By.id("dogAge")).sendKeys("4")
    await driver.findElement(By.id("numberOfDogs")).sendKeys("2")

    await driver.findElement(By.className("button button-primary")).click()
    await sleep(500)

    if (await driver.getCurrentUrl() == "http://localhost:3000/users/offers") {
        await driver.quit()
        console.log("uspjeh")
        return true;
    } else {
        await driver.quit()
        console.log("neuspjeh")
        return false;
    }

}

newOfferTest()