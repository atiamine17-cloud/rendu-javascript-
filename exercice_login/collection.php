<?php
// On lance la session pour vérifier si le membre est logué
session_start();

// Protection de la page : si pas d'ID en session, on renvoie vers le login
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

// Connexion à ma base de données (j'utilise bien PDO comme demandé en cours)
try {
    $pdo = new PDO('mysql:host=localhost;dbname=exercice_login', 'root', '');
    // J'active les erreurs pour voir s'il y a un souci dans mes requêtes
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Problème de connexion : " . $e->getMessage());
}

$message = "";

// --- PARTIE AJOUT (Le "C" du CRUD) ---
if (isset($_POST['ajouter'])) {
    // Je récupère les données et je nettoie les espaces avec trim
    $titre = trim($_POST['titre']);
    $note = trim($_POST['note']);
    $image_url = trim($_POST['image_url']);

    // Je vérifie que le titre et la note sont bien remplis
    if (!empty($titre) && !empty($note)) {
        // Requête préparée pour éviter les injections SQL
        $stmt = $pdo->prepare("INSERT INTO animes_collection (titre, note, image_url) VALUES (:titre, :note, :image_url)");
        $stmt->execute([
            'titre' => $titre,
            'note' => $note,
            'image_url' => $image_url
        ]);
        $message = "<p style='color:green'>Super, l'animé est ajouté !</p>";
    }
}

// --- PARTIE SUPPRESSION (Le "D" du CRUD) ---
if (isset($_GET['supprimer_id'])) {
    $id = $_GET['supprimer_id'];
    // Je supprime l'animé qui a cet ID précis
    $stmt = $pdo->prepare("DELETE FROM animes_collection WHERE id = :id");
    $stmt->execute(['id' => $id]);
    // Je recharge la page pour mettre à jour la liste
    header('Location: collection.php');
    exit;
}

// --- PARTIE MODIFICATION (Le "U" du CRUD) ---
if (isset($_POST['modifier'])) {
    $id = $_POST['id'];
    $titre = trim($_POST['titre']);
    $note = trim($_POST['note']);
    
    // Validation : le titre et la note ne doivent pas être vides pour la MAJ
    if (!empty($titre) && !empty($note)) {
        $stmt = $pdo->prepare("UPDATE animes_collection SET titre = :titre, note = :note WHERE id = :id");
        $stmt->execute([
            'titre' => $titre,
            'note' => $note,
            'id' => $id
        ]);
        $message = "<p style='color:green'>Modifications enregistrées !</p>";
    } else {
        $message = "<p style='color:red'>Attention : il faut un titre et une note.</p>";
    }
}

// --- PARTIE AFFICHAGE (Le "R" du CRUD) ---
// Je récupère tout et je trie par titre (ordre alphabétique)
$stmt = $pdo->query("SELECT * FROM animes_collection ORDER BY titre ASC");
$animes = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Mon Back-Office Anime</title>
    <!-- Lien vers mon fichier CSS de base -->
    <link rel="stylesheet" href="style.css"> 
    <style>
        /* Styles rapides pour que le tableau soit propre */
        body { padding: 20px; color: white; background-color: #1a1a1a; }
        .crud-container { max-width: 900px; margin: auto; background: #2a2a2a; padding: 20px; border-radius: 10px;}
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #66e0ff; padding: 10px; text-align: center; }
        img { width: 80px; border-radius: 5px; }
        input { padding: 5px; border-radius: 5px; border: 1px solid #ccc; }
        button { padding: 5px 10px; background: #66e0ff; color: #000; font-weight: bold; cursor: pointer; border:none; border-radius:3px;}
    </style>
</head>
<body>

<div class="crud-container">
    <!-- Lien pour revenir au site principal -->
    <a href="index.php" style="color:#66e0ff;">← Retour au site</a>
    
    <h2>Gestion de ma collection</h2>
    
    <!-- Affichage des messages d'erreur ou de succès -->
    <?= $message ?>

    <!-- Formulaire pour ajouter un nouvel animé -->
    <form method="POST" style="margin-bottom: 20px; padding: 15px; border: 1px dashed #66e0ff;">
        <h3>Ajouter une pépite</h3>
        <input type="text" name="titre" placeholder="Nom de l'animé" required>
        <input type="number" step="0.1" name="note" placeholder="Ma note /10" required>
        <input type="text" name="image_url" placeholder="Lien de l'image (URL)">
        <button type="submit" name="ajouter">Ajouter à la liste</button>
    </form>

    <!-- Liste de mes animés -->
    <table>
        <tr>
            <th>Image</th>
            <th>Titre</th>
            <th>Note</th>
            <th>Actions</th>
        </tr>
        
        <?php foreach ($animes as $anime): ?>
        <tr>
            <td>
                <?php if($anime['image_url']): ?>
                    <img src="<?= htmlspecialchars($anime['image_url']) ?>">
                <?php endif; ?>
            </td>
            
            <!-- Formulaire pour modifier directement dans le tableau -->
            <form method="POST">
                <td>
                    <input type="hidden" name="id" value="<?= $anime['id'] ?>">
                    <input type="text" name="titre" value="<?= htmlspecialchars($anime['titre']) ?>" required>
                </td>
                <td>
                    <input type="number" step="0.1" name="note" value="<?= htmlspecialchars($anime['note']) ?>" required>
                </td>
                <td>
                    <button type="submit" name="modifier">Enregistrer</button>
                    
                    <!-- Bouton supprimer avec la petite alerte de confirmation[cite: 1] -->
                    <a href="?supprimer_id=<?= $anime['id'] ?>" 
                       onclick="return confirm('Es-tu certain de vouloir virer cet animé ?');" 
                       style="color: red; margin-left: 10px;">Supprimer</a>
                </td>
            </form>
        </tr>
        <?php endforeach; ?>
    </table>
</div>

</body>
</html>