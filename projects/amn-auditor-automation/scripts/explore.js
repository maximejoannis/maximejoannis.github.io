const wd = require("wd");

const driver = wd.promiseChainRemote("http://127.0.0.1:4723");

(async () => {
    await driver.init({
        app: "C:\\Users\\maxim\\AppData\\Local\\Programs\\amn-auditor\\Co-Auditor.exe",
        platformName: "Windows",
        deviceName: "WindowsPC"
    });
    console.log("✅ AMN Auditor lancé !");

    await driver.sleep(4000);

    // Récupère tous les éléments accessibles à la racine
    const elements = await driver.elementsByXPath("//*");
    console.log(`Nombre d'éléments trouvés : ${elements.length}`);

    for (let i = 0; i < elements.length; i++) {
        try {
            const name = await elements[i].getAttribute("Name");
            const className = await elements[i].getAttribute("ClassName");
            const automationId = await elements[i].getAttribute("AutomationId");
            console.log(`[${i}] Name: ${name}, ClassName: ${className}, AutomationId: ${automationId}`);
        } catch (e) {
            // ignore
        }
    }

    await driver.quit();
})();
