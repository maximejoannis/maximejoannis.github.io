const wd = require("wd");

const driver = wd.promiseChainRemote("http://127.0.0.1:4723");

(async () => {
    await driver.init({
        app: "C:\\Users\\maxim\\AppData\\Local\\Programs\\amn-auditor\\Co-Auditor.exe",
        platformName: "Windows",
        deviceName: "WindowsPC"
    });
    console.log("✅ AMN Auditor lancé !");
    await driver.quit();
})();
