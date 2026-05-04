<?php
session_start(); // lancement de la session 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Connexion PDO
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=exercice_login', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Récupération et nettoyage des données
        $email = trim($_POST['email']);
        $password = $_POST['password'];

        // On cherche l'utilisateur par son email
        $stmt = $pdo->prepare("SELECT * FROM utilisateurs WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$user) {
    echo "L'email n'existe pas dans la base.";
} else {
    echo "Utilisateur trouvé ! Voici le hash en base : " . $user['mot_de_passe'];
}

        // Vérification avec password_verify
        if ($user && password_verify($password, $user['mot_de_passe'])) {
            // Succès : on enregistre les infos en session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            
            header('Location: acceuil.php'); // Redirection
            exit;
        } else {
            $erreur = "Email ou mot de passe incorrect.";
        }
    } catch (PDOException $e) {
        $erreur = "Erreur de connexion : " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Connexion</title>
</head>
<body>
    <h2>Se connecter</h2>
    <?php if (isset($erreur)) echo "<p style='color:red'>$erreur</p>"; ?>
    
    <form method="POST"> 
        <label>Email :</label><br>
        <input type="email" name="email" required><br><br>
        
        <label>Mot de passe :</label><br>
        <input type="password" name="password" required><br><br>
        
        <button type="submit">Se connecter</button>
    </form>
</body>
</html>