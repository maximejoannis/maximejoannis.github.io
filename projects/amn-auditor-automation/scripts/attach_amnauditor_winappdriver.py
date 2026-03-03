import time
from pywinauto import Application
from appium import webdriver
from appium.options.common import AppiumOptions

APP_PATH = r"C:\Users\maxim\AppData\Local\Programs\amn-auditor\Co-Auditor.exe"

print("🚀 Lancement d'AMN AUDITOR via Pywinauto...")
app = Application(backend="uia").start(APP_PATH)

# Attente dynamique : jusqu’à 20 secondes pour la fenêtre principale
window = None
for i in range(20):
    try:
        window = app.window(title_re=".*Amn Auditor.*")
        if window.exists():
            print(f"🪟 Fenêtre détectée : {window.window_text()}")
            break
    except:
        pass
    time.sleep(1)

if not window or not window.exists():
    raise RuntimeError("❌ Impossible de trouver la fenêtre principale 'Amn Auditor'.")

# ✅ Récupération du handle
hwnd = window.handle
hwnd_hex = format(hwnd, 'x').zfill(8)
print(f"🔢 Handle trouvé : {hwnd} (hex: {hwnd_hex})")

# ✅ Connexion WinAppDriver
options = AppiumOptions()
options.load_capabilities({
    "platformName": "Windows",
    "deviceName": "WindowsPC",
    "appTopLevelWindow": hwnd_hex
})

print("🔗 Connexion à WinAppDriver...")
driver = webdriver.Remote("http://127.0.0.1:4723", options=options)

print("✅ Session WinAppDriver attachée avec succès à AMN AUDITOR !")

# Exemple simple de récupération du titre
window_element = driver.find_element("class name", "Chrome_WidgetWin_1")
print("Titre :", window_element.get_attribute("Name"))

driver.quit()
print("🧩 Session terminée proprement.")
