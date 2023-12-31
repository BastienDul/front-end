console.log("script chargé");

// Liste de mots mystères prédéfinis
const motsMysteres = ["JACUZZI", "ORDINATEUR", "VOITURE", "TELEPHONE", "MAISON", "PONEY", "GAG", "ATRE", "AIMER", "CABANE", "ARBRE", "BANANE", "CROCODILE", "DINOSAURE", "ELEPHANT", "FUSEE", "GIRAFE", "HIBOU", "IGLOO", "JARDIN", "KANGOUROU", "LUNE", "MONTAGNE", "NAVIRES", "OCEAN", "PAPILLON", "QUAD", "RADIO", "SOURIS", "TORTUE", "URGENCE", "VOYAGE", "WAGON", "XYLOPHONE", "YACHT", "ZEBRE", "TABLEAU", "LIVRE", "PLANTE", "FENETRE", "CHEVAL", "PISCINE", "PIZZA", "CAFE", "SANDWICH", "AVION", "BATEAU", "CHAUSSURE", "CASQUE", "CHOCOLAT", "CISEAUX", "EPEE", "FLEUR", "GUITARE", "HORLOGE", "IGUANE", "JUPITER", "KIOSQUE", "LAMPADAIRE", "MICROPHONE", "NUAGE", "ORANGE", "PIERRE", "QUOTIDIEN", "RADAR", "SATELLITE", "TROMPETTE", "ULYSSE", "VACHE", "WAGONNET", "XYLOPHONE", "YACHT", "ZENITH", "TROU", "ECLAIR", "HARMONIE", "MANGUE", "TRONC", "SILENCE", "VOLCAN", "CHAUVE", "BEURRE", "CUIVRE", "PISTOLET", "BRISE", "CIGARE", "FREIN", "BANQUE", "DELTA", "GOLF", "JAVA", "LOTION", "OTARIE", "SUD", "VESTE", "YOGA", "ZOO", "TARTINE", "TATOUAGE", "BOTTINE", "PLAISIR", "MANCHE", "CAPUCINE", "CHIFFON", "DOUANE", "ELEVAGE", "FOYER", "GUITARE", "HAMSTER", "INSECTE", "JUPE", "KIOSQUE", "LUCARNE", "MERIDIEN", "NID", "OASIS", "PIERRE", "QUILLE", "RUBAN", "SERPENT", "TREILLE", "UTOPIE", "VIOLETTE", "WAGONNET", "XYLOPHONE", "YOGOURT", "ZIGZAG"];

// Sélectionnez un mot mystère aléatoire
const indexAleatoire = Math.floor(Math.random() * motsMysteres.length);
const MOTMYSTERE = motsMysteres[indexAleatoire];
let lettresMotMystere = MOTMYSTERE.split(""); // Convertir en majuscules



// Création du conteneur main
let main = document.createElement("main");
document.body.appendChild(main);

// Création du conteneur section qui contiendra la table avec les lettres de l'alphabet
let sectionAlphabet = document.createElement("section");
sectionAlphabet.id = "alphabet";
main.appendChild(sectionAlphabet);



// Création de la boucle afin de stocker les lettres de l'alphabet dans des boutons
for (let i = 0; i < 26; i++) { // Utiliser un index de 0 à 25 pour les lettres de l'alphabet
    // Création des boutons
    let buttonDansTable = document.createElement("button");
    let lettre = String.fromCharCode(65 + i); // Convertir l'index en lettre majuscule
    buttonDansTable.id = "button_" + lettre;
    sectionAlphabet.appendChild(buttonDansTable);
    // Injecter les lettres dans les boutons
    buttonDansTable.textContent = lettre;
}

// Création du compteur pour la défaite
let compteur = 0;

// Création du conteneur section qui contiendra le bouton pour le décompte d'erreurs.
let sectionButton = document.createElement("section");
main.appendChild(sectionButton);

// Création du conteneur pour accueillir les éléments span dedans
let sectionSpan = document.createElement("section");
sectionSpan.id = "span_lettre";
main.appendChild(sectionSpan);

// Création des spans pour afficher les lettres choisies par l'utilisateur
for (let index = 0; index < lettresMotMystere.length; index++) {
    let span = document.createElement("span");
    span.classList.add("span_reception");
    sectionSpan.appendChild(span);
    span.textContent = "-";
}

// Ajoutez un compteur d'essais restants
let essaisRestants = 8; // Nombre d'essais initiaux
let essaisRestantsText = document.createElement("span");
essaisRestantsText.id = "essais";
essaisRestantsText.textContent = essaisRestants + " essais restants";
sectionButton.appendChild(essaisRestantsText);

// Gestion des clics sur les boutons de l'alphabet
let lesTirets = document.querySelectorAll(".span_reception");

// Fonction pour désactiver tous les boutons de l'alphabet
function desactiverBoutonsAlphabet() {
    document.querySelectorAll("button").forEach((button) => {
        button.disabled = true;
    });
}

// Gestion des clics sur les boutons de l'alphabet
document.querySelectorAll("button").forEach((element) => {
    element.addEventListener("click", (eventDetail) => {
        if (essaisRestants <= 0) return; // Ne faites rien si le jeu est terminé

        eventDetail.target.disabled = true;
        let trouve = false;
        let gagne = true;
        for (let index = 0; index < lettresMotMystere.length; index++) {
            if (eventDetail.target.innerText === lettresMotMystere[index]) {
                trouve = true;
                lesTirets[index].textContent = lettresMotMystere[index];
            }
        }
        if (!trouve) {
            essaisRestants--;
            essaisRestantsText.textContent = essaisRestants + " essais restants";

            if(essaisRestants ===1){
                essaisRestantsText.textContent = essaisRestants + " essai restant";

            }

            if (essaisRestants === 0) {
                sectionAlphabet.style.visibility = "hidden"
                essaisRestantsText.textContent = "Perdu ! Le mot était : " + lettresMotMystere.join("");
                desactiverBoutonsAlphabet(); // Désactiver les boutons en cas de défaite
                let boutonRejouer = document.createElement('button');
                boutonRejouer.id = "rejouer";
                main.appendChild(boutonRejouer);
                boutonRejouer.innerText ="Rejouer"
                boutonRejouer.addEventListener("click", function(){
                    location.reload();
                })
            }
        } else {
            // Vérifiez la victoire
            lesTirets.forEach(spanTiret => {
                if (spanTiret.innerText === "-") {
                    gagne = false;
                }
            })
            if (gagne === true) {
                sectionAlphabet.style.visibility = "hidden"
                essaisRestantsText.textContent = "Gagné !";
                desactiverBoutonsAlphabet(); // Désactiver les boutons en cas de victoire
                let boutonRejouer = document.createElement('button');
                boutonRejouer.id = "rejouer";
                main.appendChild(boutonRejouer);
                boutonRejouer.innerText ="Rejouer"
                boutonRejouer.addEventListener("click", function(){
                    location.reload();
                })

            }
        }
    });
});
