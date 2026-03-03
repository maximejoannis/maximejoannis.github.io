# analyse_dom_interactif_id_name.py
# Extraction DOM : éléments interactifs avec ID ou Name uniquement

from bs4 import BeautifulSoup

HTML_FILE = "amn_auditor_dom.html"
OUTPUT_FILE = "amn_auditor_dom_interactif_id_name.txt"

INTERACTIVE_TAGS = {"button", "input", "select", "textarea", "a", "option"}

with open(HTML_FILE, "r", encoding="utf-8") as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, "html.parser")

# Liste des éléments interactifs filtrés
interactive_elements = []

for elem in soup.find_all(INTERACTIVE_TAGS):
    elem_id = elem.get("id")
    elem_name = elem.get("name")
    if elem_id or elem_name:  # Garde uniquement ceux avec ID ou Name
        interactive_elements.append(elem)

# Écriture dans le fichier
with open(OUTPUT_FILE, "w", encoding="utf-8") as out_file:
    out_file.write("=== Éléments INTERACTIFS avec ID ou Name ===\n\n")
    for idx, elem in enumerate(interactive_elements):
        tag = elem.name
        elem_id = elem.get("id")
        elem_class = " ".join(elem.get("class")) if elem.get("class") else None
        elem_name = elem.get("name")
        elem_value = elem.get("value")
        elem_title = elem.get("title")
        elem_placeholder = elem.get("placeholder")
        text = elem.get_text(strip=True)
        
        out_file.write(
            f"[{idx}] Tag: {tag} | ID: {elem_id} | Class: {elem_class} "
            f"| Name: {elem_name} | Value: {elem_value} | Title: {elem_title} "
            f"| Placeholder: {elem_placeholder} | Text: {text}\n"
        )

print(f"✅ Analyse DOM filtrée (ID/Name) enregistrée dans : {OUTPUT_FILE}")
