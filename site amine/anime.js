// Gestion du thème visuel (Mode clair / Mode sombre)
const bouton = document.getElementById("monBouton");
const body = document.body;
bouton.addEventListener("click", function() {
    body.classList.toggle("mode-sombre");
    if (body.classList.contains("mode-sombre")) {
        bouton.textContent = "Activer le mode clair";
    } else {
        bouton.textContent = "Activer le Dark Mode";
    }
});

// Système de navigation dynamique par onglets
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});
    
// Contrôle audio : mise en pause automatique des autres pistes lors d'une lecture
document.addEventListener('play' , function(e){
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
        if(audios[i] != e.target){
            audios[i].pause(); 
        }
    }
}, true); 

// Transition visuelle : remplacement du bouton de connexion par le formulaire d'inscription (1er animation )
const btnInscription = document.getElementById('inscription-btn');
const formConnexion = document.getElementById('connexion');
const formInscription = document.getElementById('inscription-form');

btnInscription.addEventListener('click', function() {
    formConnexion.style.display = 'none';
    btnInscription.style.display = 'none';
    
    formInscription.style.display = 'flex';
    formInscription.style.flexDirection = 'column';
    
    anime({
        targets: formInscription,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1700,
        easing: 'easeOutExpo'
    });
});

// Validation du formulaire d'inscription et gestion des erreurs visuelles
const feedback = document.getElementById('feedback-message');

formInscription.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page par défaut

    // Ciblage des champs du formulaire
    const pseudo = document.getElementById('pseudo-inscription');
    const email = document.getElementById('email-inscription');
    const mdp = document.getElementById('password-inscription');
    const mdpConfirm = document.getElementById('password-confirmation');
    const qcmRadios = document.getElementsByName('genre');

    let isFormValid = true;

    // Fonction de validation générique : ajoute le style et l'animation de "secousse" d'erreur si la condition n'est pas respectée (2eme animation)
    function validateField(element, condition) {
        if (condition) {
            element.classList.remove('field-error');
        } else {
            element.classList.add('field-error');
            isFormValid = false;

            anime({
                targets: element, 
                translateX: [-15, 8, -5, 5, 0],
                duration: 400,
                easing: 'easeInOutSine'
            });
        }
    }

    // Application des règles de validation (longueur, format,etc..)
    validateField(pseudo, pseudo.value.length >= 6);
    validateField(email, email.value.includes('@'));
    validateField(mdp, mdp.value.length >= 8);
    validateField(mdpConfirm, mdpConfirm.value === mdp.value && mdpConfirm.value !== "");

    // Validation spécifique pour les boutons radio (QCM)
    let qcmChecked = Array.from(qcmRadios).some(r => r.checked);
    const qcmSection = document.getElementById('qcm-section');
    
    qcmSection.style.color = qcmChecked ? "white" : "#ff3e3e";
    
    if(!qcmChecked) {
        isFormValid = false;
        anime({
            targets: qcmSection, 
            translateX: [-8, 8, -5, 5, 0],
            duration: 400,
            easing: 'easeInOutSine'
        });
    }

    // Déclenchement de la séquence de succès si aucune erreur n'est détectée
    if (isFormValid) {
        triggerSuccessAnimation();
    }
});

// Séquence d'animation : transition entre la disparition du formulaire et l'apparition du message de réussite (3ème animation)
function triggerSuccessAnimation() {
    anime({
        targets: formInscription,
        opacity: 0,
        scale: 0.8,
        duration: 500,
        complete: function() {
            formInscription.style.display = 'none';
            feedback.style.display = 'block';
            
            anime({
                targets: feedback,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800
            });
        }
    });
}