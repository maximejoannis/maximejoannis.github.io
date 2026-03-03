from pywinauto import Application, Desktop
from datetime import datetime
import time

# --- CONFIGURATION ---
APP_PATH = r"C:\Users\maxim\AppData\Local\Programs\amn-auditor\Co-Auditor.exe"
OUTPUT_FILE = "amn_auditor_ui_elements.txt"

# --- FONCTION PRINCIPALE ---
def inspect_amnauditor():
    print("🚀 Lancement d'AMN AUDITOR...")
    app = Application(backend="uia").start(APP_PATH)
    
    # Attendre que la fenêtre principale soit détectée
    print("⏳ En attente de la fenêtre principale...")
    time.sleep(5)
    main_window = None
    
    for window in Desktop(backend="uia").windows():
        if "Auditor" in window.window_text():
            main_window = window
            break
    
    if not main_window:
        print("❌ Fenêtre principale non trouvée. Vérifie le chemin ou l'exécutable.")
        return
    
    print(f"✅ Fenêtre trouvée : {main_window.window_text()}")
    print("📋 Extraction des éléments accessibles à la racine...")
    
    # Récupération des contrôles de haut niveau
    elements = main_window.children()
    print(f"Nombre d'éléments trouvés : {len(elements)}")
    
    # Sauvegarde des résultats dans un fichier
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(f"Rapport d'exploration UI - AMN AUDITOR\n")
        f.write(f"Date : {datetime.now()}\n")
        f.write(f"Nombre d'éléments trouvés : {len(elements)}\n\n")
        for i, elem in enumerate(elements):
            try:
                f.write(f"[{i}] Name: {elem.window_text()}, ClassName: {elem.friendly_class_name()}, AutomationId: {elem.element_info.automation_id}\n")
            except Exception as e:
                f.write(f"[{i}] Erreur de lecture : {e}\n")
    
    print(f"🗂️ Résultats sauvegardés dans : {OUTPUT_FILE}")
    
    # Optionnel : afficher les identifiants de contrôle dans la console
    print("\n🔍 Liste partielle des éléments accessibles :")
    for i, elem in enumerate(elements[:15]):
        print(f"[{i}] Name: {elem.window_text()} | ClassName: {elem.friendly_class_name()} | AutomationId: {elem.element_info.automation_id}")
    
    print("\n✅ Inspection terminée.")

# --- EXÉCUTION ---
if __name__ == "__main__":
    inspect_amnauditor()
