const { _electron: electron } = require('playwright');

(async () => {
  try {
    // 1️⃣ Lancer l'application Electron avec DevTools ouvert
    const electronApp = await electron.launch({
      executablePath: 'C:\\Users\\maxim\\AppData\\Local\\Programs\\amn-auditor\\Co-Auditor.exe',
      devtools: true // ouvre DevTools intégré à la fenêtre
    });

    // 2️⃣ Récupérer la fenêtre principale
    const window = await electronApp.firstWindow();

    // 3️⃣ Attendre que le loader disparaisse
    console.log('⏳ En attente du loader...');
    await window.waitForSelector('.MuiCircularProgress-root', { state: 'detached', timeout: 20000 });
    console.log('✅ Loader disparu');

    // 4️⃣ Attendre un élément principal visible (tu peux adapter ce sélecteur)
    console.log('⏳ En attente du bouton principal...');
    await window.waitForSelector('#main-button', { state: 'visible', timeout: 20000 });
    console.log('✅ Bouton principal visible');

    // 5️⃣ Garder la fenêtre ouverte pour inspecter le DOM dans DevTools
    console.log('🚀 DevTools ouvert, explore le DOM maintenant. Le script attend 5 minutes avant de fermer.');
    await window.waitForTimeout(5 * 60 * 1000); // 5 minutes pour inspection

    // 6️⃣ Fermer l'application
    await electronApp.close();
    console.log('🛑 Application fermée');
    
  } catch (err) {
    console.error('❌ Erreur Playwright Electron :', err);
  }
})();
