
let carteEnAttente = "";

function tirerUneCarte() {
    // --- ÉTAPE 1 : RÉCUPÉRATION DES DONNÉES BRUTES ---
    
    // Va chercher dans le HTML tous les éléments <li> qui sont à l'intérieur de l'ID "list-card".
    // 'elements' devient une liste (NodeList) de balises HTML.
    const elements = document.querySelectorAll('#list-card li');
    
    // --- ÉTAPE 2 : NETTOYAGE DES DONNÉES ---

    // On crée un tableau vide qui va servir à stocker nos données propres (Nom + Poids chiffré).
    const candidats = [];
    
    // On lance une boucle pour examiner chaque balise <li> trouvée (qu'on appelle 'el' ici).
    elements.forEach(el => {
        // On ajoute (.push) un nouvel objet dans notre tableau 'candidats'.
        candidats.push({
            // On récupère le texte visible à l'écran (ex: "Onizuka").
            nom: el.innerHTML,
            
            // On récupère l'attribut HTML 'data-poids' (ex: "1").
            // IMPORTANT : parseInt() transforme le texte "1" en chiffre 1 pour pouvoir faire des maths.
            poids: parseInt(el.dataset.poids) 
        });
    });

    // --- ÉTAPE 3 : CALCUL DE LA TAILLE DE LA "ROULETTE" ---

    // On initialise une variable à 0 pour compter le total.
    let totalPoids = 0;
    
    // On parcourt notre tableau propre 'candidats'.
    for (let c of candidats) {
        // On ajoute le poids de chaque candidat au total.
        // Exemple : 0 + 1 + 5 + 20... = 112 (si c'est le total).
        totalPoids += c.poids;
    }

    // --- ÉTAPE 4 : LE LANCER DE BILLE ---

    // Math.random() donne un chiffre entre 0.0 et 1.0.
    // On le multiplie par le totalPoids pour avoir un curseur quelque part dans la zone totale.
    // 'random' est maintenant un chiffre entre 0 et 112 (ex: 45.32).
    let random = Math.random() * totalPoids;
    
    // On prépare une variable vide pour y écrire le nom du gagnant plus tard.
    let gagnant = "";

    // --- ÉTAPE 5 : DÉTERMINER QUI A GAGNÉ ---

    // On repasse sur chaque candidat un par un pour voir si le chiffre 'random' tombe chez lui.
    for (let c of candidats) {
        // Si le chiffre restant est plus petit que le poids du candidat actuel...
        if (random < c.poids) {
            // ... alors c'est lui qui a gagné !
            gagnantHTML = c.nom;
            carteEnAttente = c.nom;
            // 'break' permet de stopper la boucle immédiatement, on a trouvé, pas besoin de continuer.
            break;
        }
        
        // Si ce n'était pas lui, on soustrait son poids du chiffre aléatoire.
        // Cela permet de "passer" à la tranche suivante du camembert.
        random -= c.poids;
    }

    // --- ÉTAPE 6 : AFFICHAGE ---

  // --- ÉTAPE 6 : AFFICHAGE ---
  const zoneResultat = document.getElementById('resultat');
    
    // On injecte UNIQUEMENT la carte, on ne crée plus le bouton ici !
    zoneResultat.innerHTML = `
        <div class="card" style="max-width: 300px; margin: 0 auto;">
            ${gagnantHTML}
        </div>
    `;

    // --- ÉTAPE 7 : RÉINITIALISATION DU BOUTON J'AIME ---
    const boutonJaime = document.getElementById('bouton-jaime');
    
    // On s'assure que le bouton est visible
    boutonJaime.style.display = "block"; 
    
    // On le remet à neuf pour la nouvelle carte tirée
    boutonJaime.innerHTML = "🤍 J'aime";
    boutonJaime.style.backgroundColor = "#ff4d4d"; // Ta couleur rouge de base
    boutonJaime.disabled = false;
    boutonJaime.style.cursor = "pointer";
}

// --- FONCTION POUR LE BOUTON J'AIME ---
function aimerCarte() {
    const bouton = document.getElementById('bouton-jaime');
    
    // On change le texte et l'émoji
    bouton.innerHTML = "❤️ Aimé !";
    
    // On assombrit la couleur pour montrer qu'il est cliqué
    bouton.style.backgroundColor = "#cc0000"; 
    
    // On le désactive pour empêcher de cliquer dessus 100 fois
    bouton.disabled = true;
    bouton.style.cursor = "default";
    const grilleFavoris = document.getElementById('grille-favoris');
    const nouvelleCarte = document.createElement('li');
    nouvelleCarte.className = "card";
    nouvelleCarte.innerHTML = carteEnAttente;
    grilleFavoris.appendChild(nouvelleCarte);
}



