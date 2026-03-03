import subprocess
import time
import requests
import os
import psutil

APP_PATH = r"C:\Users\maxim\AppData\Local\Programs\amn-auditor\Co-Auditor.exe"
PORT = 9222

def is_port_open(port):
    """Vérifie si un port est accessible en local"""
    import socket
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)
    result = s.connect_ex(("127.0.0.1", port))
    s.close()
    return result == 0

def kill_existing_amnauditor():
    """Ferme toute instance AMN AUDITOR avant de relancer"""
    for proc in psutil.process_iter(['name']):
        if proc.info['name'] and "Amn Auditor" in proc.info['name']:
            proc.terminate()
            print("💀 Fermeture de l'instance AMN AUDITOR existante...")
            time.sleep(1)

def main():
    print("🚀 Lancement d'AMN AUDITOR avec le flag --remote-debugging-port...")
    kill_existing_amnauditor()
    
    try:
        process = subprocess.Popen(
            [APP_PATH, f"--remote-debugging-port={PORT}"],
            shell=False,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
    except Exception as e:
        print("❌ Erreur au lancement :", e)
        return

    print("⏳ Attente du démarrage de l’application (10 secondes)...")
    time.sleep(10)

    print(f"🔍 Vérification du port {PORT}...")
    if not is_port_open(PORT):
        print(f"❌ Le port {PORT} n'est pas ouvert. L'application n'expose pas DevTools.")
        process.terminate()
        return
    print(f"✅ Port {PORT} détecté comme ouvert.")

    print("🌐 Tentative d’accès à l’API DevTools : http://localhost:9222/json")
    try:
        response = requests.get(f"http://localhost:{PORT}/json")
        if response.status_code == 200:
            pages = response.json()
            print(f"✅ API DevTools accessible ({len(pages)} pages détectées) :")
            for page in pages:
                print(f"  - URL : {page.get('url')}")
                print(f"    Title : {page.get('title')}")
                print(f"    DevTools : {page.get('devtoolsFrontendUrl')}")
        else:
            print(f"⚠️ Réponse inattendue du serveur : {response.status_code}")
    except Exception as e:
        print("❌ Impossible d’accéder à http://localhost:9222/json :", e)

    print("\n🧩 Fin du test.")
    process.terminate()

if __name__ == "__main__":
    main()
