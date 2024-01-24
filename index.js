const fs = require('fs');
const path = require('path');

// Fonction pour générer une liste HTML à partir d'un tableau d'éléments
function generateList(items) {
    return items.map(item => `
        <div class="item" onclick="displayDetails('${item.target.name}', '${item.type}', '${item.actionDescriptor ? item.actionDescriptor.description : 'No description'}', '${item.dependencyTargets ? item.dependencyTargets.map(target => target.name).join(', ') : 'No dependencies'}', '${item.query ? encodeURIComponent(item.query) : 'No query'}')">
            ${item.target.name}
        </div>
    `).join('');
}

// Fonction pour générer le fichier HTML à partir du JSON
function generateHTMLFromJSON(dataformJSON) {
    // Génération du fichier HTML
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dataform Project Documentation</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    display: flex;
                    margin: 0;
                    padding: 0;
                    background-color: #f8f9fa; /* Couleur de fond */
                }
                #sidebar {
                    width: 25%;
                    background-color: #ffffff; /* Couleur de fond de la barre latérale */
                    padding: 20px;
                    overflow: auto;
                    border-right: 1px solid #dee2e6;
                }
                #sidebar img {
                    max-width: 50%; /* Réduire la taille du logo */
                    ali
                }
                #content {
                    width: 75%;
                    padding: 20px;
                    overflow: auto;
                    background-color: #ffffff; /* Couleur de fond du contenu */
                }
                .item {
                    cursor: pointer;
                    padding: 10px;
                    margin-bottom: 5px;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                    background-color: #f8f9fa; /* Couleur de fond des éléments de la liste */
                }
                .item:hover {
                    background-color: #e2e6ea; /* Couleur de fond au survol des éléments de la liste */
                }
                h2 {
                    color: #007bff; /* Couleur du texte du titre */
                }
                strong {
                    color: #dc3545; /* Couleur du texte en gras */
                }
            </style>
        </head>
        <body>
            <div class="container-fluid">
                <div class="row">
                    <div id="sidebar" class="col-md-3 text-center">
                        <!-- Logo Dataform -->
                        <img src="img/dataform.png" alt="Dataform Logo" class="img-fluid mb-4 logo-align-middle">
                        <!-- Liste générée par JavaScript -->
                        ${generateList(dataformJSON.tables.concat(dataformJSON.assertions))}
                    </div>
                    <div id="content" class="col-md-9">
                        <!-- Contenu généré par JavaScript -->
                    </div>
                </div>
            </div>

            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

            <script>
                // Fonction pour afficher les détails dans le contenu
                function displayDetails(name, type, description, dependencies, query) {
                    const decodedQuery = decodeURIComponent(query);
                    document.getElementById('content').innerHTML = \`
                        <h2 class="mt-4">\${name}</h2>
                        <p class="lead"><strong>Type:</strong> \${type}</p>
                        <p><strong>Description:</strong> \${description}</p>
                        <p><strong>Dependencies:</strong> \${dependencies}</p>
                        </br>
                        <pre><code class="sql">\${decodedQuery}</code></pre>
                    \`;
                }
            </script>
        </body>
        </html>
    `;

    return htmlContent;
}

// Utilisation de la fonction pour générer le HTML à partir du JSON
const dataformJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'dataform-ex-output.json'), 'utf8'));
const htmlContent = generateHTMLFromJSON(dataformJSON);

// Écriture du contenu HTML dans un fichier
fs.writeFileSync(path.join(__dirname, 'dataform_documentation.html'), htmlContent);
