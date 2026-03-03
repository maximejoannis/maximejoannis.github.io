import time
from pywinauto import Application
from pywinauto.controls.uiawrapper import UIAElementInfo

# === CONFIGURATION ===
APP_PATH = r"C:\Users\maxim\AppData\Local\Programs\amn-auditor\Co-Auditor.exe"
OUTPUT_FILE = "amn_auditor_uia_elements.txt"

print("🚀 Lancement d'AMN AUDITOR via Pywinauto (backend='uia')...")

# 1️⃣ Lancer l'application avec le backend UIA
app = Application(backend="uia").start(APP_PATH)

# 2️⃣ Attendre le chargement complet
time.sleep(5)

# 3️⃣ Se connecter à la fenêtre principale (titre contient "Amn Auditor")
try:
    main_window = app.window(title_re="Amn Auditor")
    print("✅ Fenêtre principale détectée :", main_window.window_text())
except Exception as e:
    print("❌ Impossible de détecter la fenêtre principale :", e)
    exit()

# 4️⃣ Attendre que l’UI soit prête
time.sleep(2)

# 5️⃣ Récupérer tous les descendants accessibles
print("🔍 Exploration de la hiérarchie UIA...")
elements = main_window.descendants()

# 6️⃣ Sauvegarder les informations dans un fichier texte
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(f"=== INVENTAIRE UIA DE L’APPLICATION AMN AUDITOR ===\n\n")
    f.write(f"Nombre total d’éléments : {len(elements)}\n\n")

    for i, elem in enumerate(elements):
        info = elem.element_info
        f.write(f"[{i}] Name: {info.name} | ClassName: {info.class_name} | AutomationId: {info.automation_id}\n")

print(f"📂 Résultats enregistrés dans : {OUTPUT_FILE}")
print(f"Nombre total d’éléments trouvés : {len(elements)}")

# 7️⃣ Fermer l’application proprement (optionnel)
try:
    main_window.close()
    print("👋 AMN AUDITOR fermé.")
except:
    print("⚠️ Impossible de fermer la fenêtre automatiquement.")
