import subprocess
import time
import psutil
import pytest
import win32gui
from appium import webdriver
from appium.options.common import AppiumOptions
from selenium.common.exceptions import WebDriverException

# === CONFIGURATION ===
WINAPP_PATH = r"C:\Program Files (x86)\Windows Application Driver\WinAppDriver.exe"
APP_PATH = r"C:\Users\maxim\AppData\Local\Programs\amn-auditor\Co-Auditor.exe"
PROJECT_PATH = r"C:\Users\maxim\Documents\AMN_BRAINS\AMN Banque - Guide Test Academy.amna"
WINAPP_PORT = 4723


# === OUTILS ===
def start_winappdriver():
    """Démarre WinAppDriver si non lancé"""
    for proc in psutil.process_iter(['name']):
        if proc.info['name'] == "WinAppDriver.exe":
            print("✅ WinAppDriver déjà en cours d’exécution.")
            return
    print("🚀 Démarrage de WinAppDriver...")
    subprocess.Popen([WINAPP_PATH, str(WINAPP_PORT)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(3)
    print(f"✅ WinAppDriver lancé sur le port {WINAPP_PORT}.")


def get_amna_window_handle(max_wait=10):
    """Recherche la fenêtre principale 'Amn Auditor' (attente dynamique)."""
    for i in range(max_wait):
        hwnd = win32gui.FindWindow(None, "Amn Auditor")
        if hwnd:
            print(f"🪟 Fenêtre détectée : 'Amn Auditor' (handle {hwnd})")
            return format(hwnd, 'x')
        time.sleep(1)
    print("❌ Aucune fenêtre 'Amn Auditor' trouvée.")
    return None


def close_existing_amn_auditor():
    """Ferme toute instance AMN AUDITOR"""
    for proc in psutil.process_iter(['name']):
        if proc.info['name'] and "Co-Auditor" in proc.info['name']:
            proc.terminate()
            return True
    return False


# === FIXTURE PYTEST ===
@pytest.fixture(scope="module")
def driver():
    """Initialise la session WinAppDriver de manière robuste"""
    start_winappdriver()

    hwnd = get_amna_window_handle()

    desired_caps = {
        "platformName": "Windows",
        "deviceName": "WindowsPC"
    }

    # ✅ Cas 1 : l'application est déjà ouverte
    if hwnd:
        desired_caps["appTopLevelWindow"] = hwnd
        print("🔗 Connexion à la fenêtre existante d’AMN AUDITOR...")
    else:
        # ✅ Cas 2 : on la lance nous-même
        print("🆕 Lancement d’une nouvelle instance d’AMN AUDITOR...")
        close_existing_amn_auditor()
        desired_caps["app"] = APP_PATH

    # Chargement propre des capabilities
    options = AppiumOptions()
    options.load_capabilities(desired_caps)

    try:
        driver = webdriver.Remote(
            command_executor=f"http://127.0.0.1:{WINAPP_PORT}",
            options=options
        )
        print("✅ Session WebDriver établie avec succès.")
    except WebDriverException as e:
        # 🔄 Tentative automatique de relance si Bad Capabilities
        if "Bad capabilities" in str(e):
            print("⚠️ Erreur 'Bad capabilities' — tentative de reconnexion...")
            hwnd = get_amna_window_handle()
            if not hwnd:
                print("🚀 Relancement de l’application...")
                subprocess.Popen(APP_PATH)
                time.sleep(5)
                hwnd = get_amna_window_handle()
            desired_caps = {
                "platformName": "Windows",
                "deviceName": "WindowsPC",
                "appTopLevelWindow": hwnd
            }
            options = AppiumOptions()
            options.load_capabilities(desired_caps)
            driver = webdriver.Remote(
                command_executor=f"http://127.0.0.1:{WINAPP_PORT}",
                options=options
            )
            print("✅ Reconnexion réussie après erreur capabilities.")
        else:
            raise

    time.sleep(5)
    yield driver

    print("🧩 Fermeture de la session...")
    driver.quit()
    close_existing_amn_auditor()


# === TEST PRINCIPAL ===
def test_open_existing_project(driver):
    """Test fonctionnel : ouverture d’un projet existant"""
    print("\n=== TEST : OUVERTURE D’UN PROJET EXISTANT ===")

    try:
        open_btn = driver.find_element("name", "Ouvrir un projet")
        open_btn.click()
        print("🖱️ Bouton 'Ouvrir un projet' cliqué.")
    except Exception as e:
        pytest.fail(f"❌ Impossible de cliquer sur 'Ouvrir un projet' : {e}")

    time.sleep(2)

    try:
        file_input = driver.find_element("class name", "Edit")
        file_input.send_keys(PROJECT_PATH)
        print(f"📂 Chemin du projet saisi : {PROJECT_PATH}")

        open_dialog_btn = driver.find_element("name", "Ouvrir")
        open_dialog_btn.click()
        print("📁 Projet sélectionné et ouverture demandée.")
    except Exception as e:
        pytest.fail(f"❌ Erreur lors de la saisie du chemin du projet : {e}")

    time.sleep(5)

    try:
        window_element = driver.find_element("class name", "Chrome_WidgetWin_1")
        window_title = window_element.get_attribute("Name")
        print(f"🔎 Titre actuel de la fenêtre : {window_title}")

        assert "Projet" in window_title or ".amnproj" in window_title, \
            f"❌ Le titre ne correspond pas à un projet ouvert : {window_title}"
        print("✅ Projet ouvert avec succès !")
    except Exception as e:
        pytest.fail(f"❌ Impossible de valider le titre de la fenêtre : {e}")
