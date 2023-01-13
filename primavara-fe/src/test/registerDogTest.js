const {By,Key,Builder} = require("selenium-webdriver")
require("chromedriver")

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//preduvjet ovog testa je da u bazi ne postoji pas sa zadanim imenom

async function registerDogTest(){
    let driver = await new Builder().forBrowser("chrome").build()
    await driver.get("http://localhost:3000")

    await driver.findElement(By.linkText("Prijava")).click()
    await sleep(500)

    await driver.findElement(By.name("username")).sendKeys("asd")
    await driver.findElement(By.name("password")).sendKeys("asdasdasd")
    await driver.findElement(By.id("login")).click()
    await sleep(500)

    const hoverable = driver.findElement(By.className("dropdown-username"));
    const actions = driver.actions({async: true});
    await actions.move({origin: hoverable}).perform();

    await driver.findElement(By.linkText("Moji psi")).click()
    await sleep(500)

    await driver.findElement(By.linkText("Dodaj psa")).click()
    await sleep(500)

    await driver.findElement(By.id("name")).sendKeys("testniprimjer2")
    await driver.findElement(By.id("dateOfBirth")).sendKeys("66\t1991")

    await driver.findElement(By.id("breed")).click()
    await driver.findElement(By.id("15")).click()

    await driver.findElement(By.className("button button-primary")).click()
    await sleep(500)

    if (await driver.getCurrentUrl() == "http://localhost:3000/users/dogs") {
        await driver.quit()
        console.log("uspjeh")
        return true;
    } else {
        await driver.quit()
        console.log("neuspjeh")
        return false;
    }
}

registerDogTest();