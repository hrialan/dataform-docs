const fs = require('fs');
const path = require('path');

// Fonction pour générer le fichier HTML à partir du JSON
function generateHTMLFromJSON(dataformJSON) {
    // Génération du fichier HTML (c'est un exemple simple, vous pouvez personnaliser)
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dataform Project Documentation</title>
        </head>
        <body>
            <h1>Dataform Project Documentation</h1>
            
            <h2>Tables</h2>
            <ul>
                ${dataformJSON.tables.map(table => `<li>${table.target.name}</li>`).join('')}
            </ul>
            
            <h2>Assertions</h2>
            <ul>
                ${dataformJSON.assertions.map(assertion => `<li>${assertion.target.name}</li>`).join('')}
            </ul>
            
            <h2>Declarations</h2>
            <ul>
                ${dataformJSON.declarations.map(declaration => `<li>${declaration.target.name}</li>`).join('')}
            </ul>
            
            <h2>Targets</h2>
            <ul>
                ${dataformJSON.targets.map(target => `<li>${target.name}</li>`).join('')}
            </ul>
        </body>
        </html>
    `;

    return htmlContent;
}

// Récupérer le chemin vers le fichier JSON à partir des arguments en ligne de commande
const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
    console.error('Veuillez fournir le chemin vers le fichier JSON en tant qu\'argument.');
    process.exit(1);
}

// Charger le fichier JSON de compilation Dataform
const absoluteJsonFilePath = path.resolve(process.cwd(), jsonFilePath);
const dataformJSON = JSON.parse(fs.readFileSync(absoluteJsonFilePath, 'utf-8'));

// Générer le contenu HTML à partir du JSON
const generatedHTML = generateHTMLFromJSON(dataformJSON);

// Enregistrer le fichier HTML
fs.writeFileSync('dataform_documentation.html', generatedHTML, 'utf-8');

console.log('Documentation HTML générée avec succès.');
