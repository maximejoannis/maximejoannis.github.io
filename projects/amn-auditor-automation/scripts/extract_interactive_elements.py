from lxml import html

# 1️⃣ Charger le DOM complet depuis le fichier extrait
with open("amn_auditor_dom.html", "r", encoding="utf-8") as f:
    dom_content = f.read()

tree = html.fromstring(dom_content)

# 2️⃣ Sélectionner uniquement les éléments interactifs
# Tags courants : button, input, select, textarea, a (liens)
interactive_tags = ["button", "input", "select", "textarea", "a"]
interactive_elements = []

for tag in interactive_tags:
    for elem in tree.findall(".//" + tag):
        elem_info = {
            "tag": tag,
            "id": elem.get("id"),
            "class": elem.get("class"),
            "name": elem.get("name"),
            "text": (elem.text_content() or "").strip()
        }
        interactive_elements.append(elem_info)

# 3️⃣ Générer le rapport texte
with open("amn_auditor_interactive_elements.txt", "w", encoding="utf-8") as f:
    f.write("=== Éléments interactifs de l'application AMN AUDITOR ===\n\n")
    for i, elem in enumerate(interactive_elements):
        f.write(f"[{i}] Tag: {elem['tag']}\n")
        f.write(f"    ID: {elem['id']}\n")
        f.write(f"    Class: {elem['class']}\n")
        f.write(f"    Name: {elem['name']}\n")
        f.write(f"    Text: {elem['text']}\n\n")

print(f"✅ Rapport généré : amn_auditor_interactive_elements.txt")
print(f"Nombre d'éléments interactifs trouvés : {len(interactive_elements)}")
