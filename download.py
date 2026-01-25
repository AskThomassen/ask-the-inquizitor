import os
import requests
from bs4 import BeautifulSoup
import json
from PIL import Image
from io import BytesIO

# Directory for storing flags
FLAG_DIR = "./public/country-flags"
os.makedirs(FLAG_DIR, exist_ok=True)

countries = [
    "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
    "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South",
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden",
    "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
]

# Norwegian translations for each country
norwegian_translations = {
    "Albania": "Albania", "Algeria": "Algerie", "Andorra": "Andorra", "Angola": "Angola",
    "Antigua and Barbuda": "Antigua og Barbuda", "Argentina": "Argentina", "Armenia": "Armenia",
    "Australia": "Australia", "Austria": "Østerrike", "Azerbaijan": "Aserbajdsjan",
    # Add translations for all other countries...
    # Example:
    "Zimbabwe": "Zimbabwe"
}

def download_flag(country):
    search_url = f"https://www.google.com/search?hl=en&q={country}+flag&tbm=isch"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    img_tags = soup.find_all("img")
    flag_url = None

    # Find the first valid image URL
    for img in img_tags:
        if img.get("src") and "http" in img.get("src"):
            flag_url = img.get("src")
            break

    if flag_url:
        try:
            img_data = requests.get(flag_url).content
            img = Image.open(BytesIO(img_data))

            # Convert the image to RGB mode if it's in palette (P) mode
            if img.mode == "P":
                img = img.convert("RGB")

            file_path = os.path.join(FLAG_DIR, f"{country.replace(' ', '_').lower()}.jpg")
            img.save(file_path, "JPEG")
            return file_path

        except Exception as e:
            print(f"Failed to download flag for {country}: {e}")
            return None
    else:
        print(f"No flag image found for {country}")
        return None

# Generate JSON data
quiz_data = []
for country in countries:
    file_path = download_flag(country)
    if file_path:
        norwegian_answer = norwegian_translations.get(country, "")
        quiz_data.append({
            "image": os.path.basename(file_path),
            "answers": [country, norwegian_answer]
        })

# Write to JSON file
with open("flags_quiz.json", "w") as f:
    json.dump(quiz_data, f, indent=4)

print("Flags downloaded and JSON file created.")
