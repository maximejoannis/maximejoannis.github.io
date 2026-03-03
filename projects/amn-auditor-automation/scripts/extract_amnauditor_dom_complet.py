from bs4 import BeautifulSoup

html_file = "amn_auditor_dom.html"
output_dom_file = "amn_auditor_dom_hierarchique.txt"
output_interactif_file = "amn_auditor_elements_interactifs.txt"

# Lire le fichier HTML
with open(html_file, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# =======================
# 1️⃣ DOM hiérarchique complet
# =======================
def parcourir_dom(element, niveau=0, f=None, index=[0]):
    indent = "    " * niveau
    f.write(f"{indent}[{index[0]}] Tag: {element.name}\n")
    index[0] += 1
    
    # Attributs
    if element.attrs:
        for attr, value in element.attrs.items():
            f.write(f"{indent}    {attr}: {value}\n")
    
    # Texte
    if element.string and element.string.strip():
        f.write(f"{indent}    Text: {element.string.strip()}\n")
    
    # Enfants
    for child in element.find_all(recursive=False):
        parcourir_dom(child, niveau + 1, f, index)

with open(output_dom_file, "w", encoding="utf-8") as f:
    f.write("=== DOM hiérarchique complet de l'application AMN AUDITOR ===\n\n")
    parcourir_dom(soup, f=f)

print(f"✅ DOM hiérarchique complet enregistré dans : {output_dom_file}")

# =======================
# 2️⃣ Extraction des éléments interactifs
# =======================
interactifs_tags = ["button", "input", "select", "textarea", "a", "menu", "option"]

with open(output_interactif_file, "w", encoding="utf-8") as f:
    f.write("=== Éléments interactifs de l'application AMN AUDITOR ===\n\n")
    index = 0
    for tag in interactifs_tags:
        for element in soup.find_all(tag):
            f.write(f"[{index}] Tag: {element.name}\n")
            for attr, value in element.attrs.items():
                f.write(f"    {attr}: {value}\n")
            if element.string and element.string.strip():
                f.write(f"    Text: {element.string.strip()}\n")
            f.write("\n")
            index += 1

print(f"✅ Éléments interactifs enregistrés dans : {output_interactif_file}")
