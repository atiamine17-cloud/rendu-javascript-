<?php
session_start();

// Si la session n'existe pas, on renvoie vers le login
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Accueil</title>
</head>
<body>
    <h1>Bienvenue, <?php echo $_SESSION['email']; ?> !</h1>
    <p>Ceci est une page sécurisée.</p>
    <a href="logout.php">Se déconnecter</a> <!-- Lien de déconnexion
</body>
</html>