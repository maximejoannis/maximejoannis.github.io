import json
import os
import time
import requests
import subprocess
from websocket import create_connection

# === CONFIGURATION ===
APP_PATH = r"C:\Users\maxim\AppData\Local\Programs\amn-auditor\Co-Auditor.exe"
DEBUG_PORT = 9222
WAIT_TIME = 10  # secondes
OUTPUT_FILE = "amn_auditor_dom.html"

# === 1️⃣ Lancement d'AMN AUDITOR avec les flags nécessaires ===
print(f"🚀 Lancement d'AMN AUDITOR sur le port {DEBUG_PORT}...")
process = subprocess.Popen(
    [APP_PATH, f"--remote-debugging-port={DEBUG_PORT}", "--remote-allow-origins=*"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

# === 2️⃣ Attente du démarrage complet ===
print(f"⏳ Attente de {WAIT_TIME} secondes pour le démarrage complet...")
time.sleep(WAIT_TIME)

# === 3️⃣ Connexion à l’API DevTools ===
try:
    response = requests.get(f"http://localhost:{DEBUG_PORT}/json")
    pages = response.json()
    if not pages:
        raise Exception("Aucune page détectée via /json")

    page = pages[0]
    ws_url = page.get("webSocketDebuggerUrl")
    print(f"✅ API DevTools détectée : {page.get('title')}")
    print(f"🔗 WebSocket URL : {ws_url}")

except Exception as e:
    print(f"❌ Erreur lors de la connexion à DevTools : {e}")
    process.terminate()
    exit(1)

# === 4️⃣ Connexion au WebSocket DevTools ===
print("🌐 Connexion à la session DevTools...")
ws = create_connection(ws_url)

# === 5️⃣ Extraction du DOM ===
print("📡 Envoi de la commande DOM.getDocument...")
ws.send(json.dumps({"id": 1, "method": "DOM.getDocument"}))
result = json.loads(ws.recv())

root_node_id = result["result"]["root"]["nodeId"]
print(f"🧩 ID racine du DOM : {root_node_id}")

print("📑 Récupération du contenu HTML complet...")
ws.send(json.dumps({
    "id": 2,
    "method": "DOM.getOuterHTML",
    "params": {"nodeId": root_node_id}
}))
html_result = json.loads(ws.recv())

html_content = html_result["result"]["outerHTML"]

# === 6️⃣ Sauvegarde du DOM ===
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"✅ DOM complet enregistré dans : {OUTPUT_FILE}")

# === 7️⃣ Fermeture propre ===
ws.close()
print("👋 Fermeture de la connexion WebSocket.")
