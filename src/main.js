
// Fichier principal JavaScript pour le clone X (Twitter)

document.addEventListener('DOMContentLoaded', function() {
  // Activer le mode sombre si nécessaire
  const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkModePreference.matches) {
    document.documentElement.classList.add('dark');
  }
  
  // Fonctionnalité pour le compositeur de Tweet
  const tweetComposer = document.getElementById('tweet-composer');
  const tweetButton = document.getElementById('tweet-button');
  
  if (tweetComposer && tweetButton) {
    tweetComposer.addEventListener('input', function() {
      // Activer/désactiver le bouton Tweeter selon si le texte est vide ou non
      if (tweetComposer.value.trim().length > 0) {
        tweetButton.removeAttribute('disabled');
      } else {
        tweetButton.setAttribute('disabled', '');
      }
    });
    
    tweetButton.addEventListener('click', function() {
      if (tweetComposer.value.trim().length > 0) {
        // Simuler l'envoi d'un tweet
        alert('Tweet envoyé: ' + tweetComposer.value);
        tweetComposer.value = '';
        tweetButton.setAttribute('disabled', '');
      }
    });
  }
  
  // Fonctionnalité pour les boutons d'interaction (like, retweet, etc.)
  const interactionButtons = document.querySelectorAll('.flex-1 .flex button');
  
  interactionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Récupérer le compteur
      const counter = this.querySelector('span');
      if (counter) {
        let count = parseInt(counter.textContent);
        
        // Vérifier si le bouton est déjà actif
        if (this.classList.contains('active')) {
          // Si actif, décrémenter et enlever la classe active
          count--;
          this.classList.remove('active');
        } else {
          // Si inactif, incrémenter et ajouter la classe active
          count++;
          this.classList.add('active');
        }
        
        // Mettre à jour le compteur
        counter.textContent = count;
      }
    });
  });
  
  // Gestion de la recherche (page explore)
  const searchInput = document.querySelector('input[placeholder="Rechercher sur X"]');
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length > 0) {
          // Simuler une recherche
          alert('Recherche pour: ' + searchTerm);
        }
      }
    });
  }
});
