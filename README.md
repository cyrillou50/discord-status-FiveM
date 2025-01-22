# Cfx.re Status Discord Bot

Un bot Discord conçu pour afficher en temps réel le statut des services de [Cfx.re](https://status.cfx.re) dans un canal Discord. Ce bot organise les services par catégories, traduit les statuts en français, et met à jour les informations automatiquement toutes les 5 minutes.

---

## 🚀 Fonctionnalités
- **Catégories claires** : Organisation des services en groupes comme Jeux, Services de jeu, et Services web.
- **Traduction** : Les statuts sont affichés en français (Opérationnel, Panne partielle, Panne majeure).
- **Mises à jour automatiques** : Vérification du statut des services toutes les 5 minutes.
- **Icônes intuitives** : Affichage des statuts avec des emojis pour une compréhension rapide.
- **Lien direct** : L'embed inclut un lien vers la page de statut officielle de Cfx.re.

---

## 🛠️ Prérequis
Avant de commencer, assurez-vous d'avoir installé :
1. **Node.js** : Téléchargez la version 16 ou supérieure depuis [nodejs.org](https://nodejs.org/).
2. **Gestionnaire de paquets** : Utilisez `npm` (installé avec Node.js) ou `yarn`.
3. **Compte Discord avec droits administrateur** sur le serveur où le bot sera utilisé.
4. **Token du bot Discord** : Créez une application bot sur le [Portail des développeurs Discord](https://discord.com/developers/applications).

---

## 🔧 Installation et Configuration

### 1. Cloner le projet
Commencez par télécharger les fichiers du bot sur votre machine. Ouvrez un terminal et exécutez la commande suivante :
```bash
git clone https://github.com/votre-utilisateur/votre-depot.git
cd votre-depot
```

### 2. Installer les dépendances
Une fois dans le répertoire du projet, installez les dépendances nécessaires :
```bash
npm install
```

### 3. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet. Ce fichier sera utilisé pour stocker vos informations sensibles comme le token du bot et l'ID du canal Discord.

Exemple de contenu du fichier `.env` :
```env
BOT_TOKEN="Token Bot Discord"
CHANNEL_ID="ID du salon discord"
```
* **BOT\_TOKEN** : Le token du bot Discord que vous pouvez récupérer dans le [Portail des développeurs Discord](https://discord.com/developers/applications).
* **CHANNEL\_ID** : L'ID du canal où le bot enverra les mises à jour.
  * Pour obtenir cet ID :
      1. Activez le **Mode développeur** dans Discord : _Paramètres utilisateur > Avancé > Mode développeur_.
      2. Faites un clic droit sur le canal cible et cliquez sur **Copier l'ID**.
   
### 4. Lancer le bot
Lancez le bot en exécutant la commande suivante dans le terminal :
```bash
node index.js
```
Si tout est correctement configuré, vous verrez le message suivant dans le terminal :
```css
Connecté en tant que [NOM_DU_BOT]
```
Le bot commencera à envoyer des mises à jour dans le canal spécifié toutes les 5 minutes.

## ⚙️ Personnalisation

### Modifier l'intervalle de vérification
L'intervalle de vérification est défini par la variable `CHECK_INTERVAL` dans le fichier principal (`index.js`).
Par défaut, il est configuré à 5 minutes :
```javascript
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes
```

## 🖼️ Exemple de Résultat
Voici un exemple de message envoyé par le bot :

![statusdiscord](https://github.com/user-attachments/assets/d1685306-bab7-4689-8883-b0c8427b5a59)
