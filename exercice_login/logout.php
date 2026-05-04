<?php
session_start();
session_unset(); // Supprime les variables de session[cite: 1]
session_destroy(); // Détruit la session[cite: 1]

header('Location: login.php'); // Retour au départ[cite: 1]
exit;