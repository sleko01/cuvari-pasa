const {By,Key,Builder} = require("selenium-webdriver")
require("chromedriver")

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// ovaj test daje ulogu admina prvom korisniku (koji to moze postati) na popisu korisnika na stranici moderation, u suprotnom baca gresku
// preduvjet ovog testa je da dani account u koji se prijavljujemo ima već ulogu admina

async function addAdminTest(){
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

    await driver.findElement(By.linkText("Moderacija")).click()
    await sleep(500)

    const admins = await driver.findElements(By.className("admin-button"))
    for (let admin of admins){
        if (admin.getText() != null){
            admin.click()
        }
    }

    await sleep(500)

    if (await driver.switchTo().alert().getText() == "Uspješno davanje admina!"){
        await driver.quit()
        console.log("uspjesno")
        return true;
    } else {
        await driver.quit()
        console.log("neuspjesno")
        return false;
    }
}

addAdminTest();