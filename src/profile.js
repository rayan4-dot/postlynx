
// Données fictives pour le profil
const userProfiles = {
  "user1": {
    id: "user1",
    name: "Jonathan Doe",
    username: "jonathandoe",
    avatar: "https://i.pravatar.cc/150?img=1",
    cover: "https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=800&auto=format&fit=crop",
    bio: "Développeur web passionné | JavaScript | React | Node.js | Aime partager des connaissances tech et des astuces de dev",
    location: "Paris, France",
    website: "jonathandoe.dev",
    joined: "Septembre 2020",
    following: 542,
    followers: 1024,
    verified: true
  },
  "user2": {
    id: "user2",
    name: "Marie Durand",
    username: "mariedurand",
    avatar: "https://i.pravatar.cc/150?img=5",
    cover: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop",
    bio: "Designer UX/UI | Créative | Passionnée d'art et de technologies | Je partage mes créations et mes inspirations",
    location: "Lyon, France",
    website: "mariedurand.design",
    joined: "Mai 2018",
    following: 235,
    followers: 789,
    verified: false
  },
  "user3": {
    id: "user3",
    name: "Alex Martin",
    username: "alexm",
    avatar: "https://i.pravatar.cc/150?img=8",
    cover: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&auto=format&fit=crop",
    bio: "Entrepreneur | Tech enthusiast | Speaker | Toujours à la recherche de nouvelles idées et de collaborations",
    location: "Bordeaux, France",
    website: "alexm.io",
    joined: "Mars 2015",
    following: 1243,
    followers: 5678,
    verified: true
  }
};

// Fonction d'initialisation pour la page profil
document.addEventListener('DOMContentLoaded', function() {
  // Récupérer l'ID du profil dans l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const profileId = urlParams.get('id') || 'user1'; // Par défaut, on affiche le profil user1
  
  // Charger les données du profil
  loadProfile(profileId);
  
  // Charger les tweets du profil
  loadProfileTweets(profileId);
  
  // Initialiser les onglets
  initProfileTabs(profileId);
  
  // Charger les tendances et suggestions comme dans main.js
  if (typeof loadTrendingTopics === 'function') loadTrendingTopics();
  if (typeof loadSuggestedUsers === 'function') loadSuggestedUsers();
  
  // Initialiser le modal tweet comme dans main.js
  const tweetButton = document.getElementById('tweet-button');
  const tweetModal = document.getElementById('tweet-modal');
  const closeModal = document.getElementById('close-modal');
  
  if (tweetButton && tweetModal && closeModal) {
    tweetButton.addEventListener('click', function() {
      tweetModal.classList.remove('hidden');
    });
    
    closeModal.addEventListener('click', function() {
      tweetModal.classList.add('hidden');
    });
  }

  // Bouton éditer le profil
  const editProfileButton = document.getElementById('edit-profile-button');
  if (editProfileButton) {
    editProfileButton.addEventListener('click', function() {
      alert('Fonctionnalité d\'édition de profil en cours de développement!');
    });
  }
});

// Charger les données du profil
function loadProfile(profileId) {
  const profile = userProfiles[profileId];
  if (!profile) return;
  
  // Mettre à jour les éléments HTML avec les données du profil
  const profileNameElements = document.querySelectorAll('.profile-name');
  const profileHandleElements = document.querySelectorAll('.profile-handle');
  const profileImage = document.getElementById('profile-image');
  const profileCover = document.getElementById('profile-cover');
  const profileBio = document.querySelector('.profile-bio');
  const profileLocation = document.querySelector('.profile-location');
  const profileWebsite = document.querySelector('.profile-website');
  const profileJoined = document.querySelector('.profile-joined');
  const profileFollowingCount = document.querySelector('.profile-following-count');
  const profileFollowersCount = document.querySelector('.profile-followers-count');
  const profileTweetCount = document.querySelector('.profile-tweet-count');
  
  // Mettre à jour le nom d'utilisateur et le pseudo partout
  profileNameElements.forEach(el => el.textContent = profile.name);
  profileHandleElements.forEach(el => el.textContent = `@${profile.username}`);
  
  // Mettre à jour l'image de profil et la couverture
  if (profileImage) profileImage.src = profile.avatar;
  if (profileCover) profileCover.src = profile.cover;
  
  // Mettre à jour la bio et les autres informations
  if (profileBio) profileBio.textContent = profile.bio;
  if (profileLocation) profileLocation.textContent = profile.location;
  if (profileWebsite) {
    profileWebsite.textContent = profile.website;
    profileWebsite.parentElement.href = `https://${profile.website}`;
  }
  if (profileJoined) profileJoined.textContent = `A rejoint X en ${profile.joined}`;
  
  // Mettre à jour les stats
  if (profileFollowingCount) profileFollowingCount.textContent = profile.following;
  if (profileFollowersCount) profileFollowersCount.textContent = profile.followers;
  
  // Définir le nombre de tweets (à calculer en fonction des tweets filtrés pour cet utilisateur)
  const tweetCount = tweets.filter(t => t.user.id === profileId).length;
  if (profileTweetCount) profileTweetCount.textContent = `${tweetCount} Tweets`;
}

// Charger les tweets du profil
function loadProfileTweets(profileId) {
  const profileTweets = document.getElementById('profile-tweets');
  if (!profileTweets) return;
  
  // Filtrer les tweets pour ne montrer que ceux de l'utilisateur
  const userTweets = tweets.filter(tweet => tweet.user.id === profileId);
  
  profileTweets.innerHTML = '';
  
  if (userTweets.length === 0) {
    // Pas de tweets à afficher
    profileTweets.innerHTML = `
      <div class="p-4 text-center text-gray-500">
        <p>Aucun tweet à afficher.</p>
      </div>
    `;
    return;
  }
  
  // Créer et ajouter les tweets
  userTweets.forEach(tweet => {
    const tweetElement = createTweetElement(tweet);
    profileTweets.appendChild(tweetElement);
  });
}

// Fonction pour créer un élément tweet (supposons que createTweetElement est défini dans main.js)
// Si ce n'est pas le cas, nous implémentons une version simplifiée ici
function createTweetElement(tweet) {
  if (window.createTweetElement) {
    return window.createTweetElement(tweet);
  }
  
  // Version simplifiée si la fonction n'est pas définie dans main.js
  const div = document.createElement('div');
  div.classList.add('p-4', 'border-b', 'border-gray-200', 'dark:border-gray-800', 'hover:bg-gray-50', 'dark:hover:bg-gray-900', 'transition-colors');
  
  const formattedTime = formatDate(tweet.timestamp);
  
  let verifiedBadge = tweet.user.verified 
    ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
    : '';
  
  let imageContent = tweet.image
    ? `<img src="${tweet.image}" alt="Tweet media" class="mt-3 rounded-2xl max-h-96 w-full object-cover">`
    : '';
  
  div.innerHTML = `
    <div class="flex space-x-3">
      <a href="profile.html?id=${tweet.user.id}">
        <img src="${tweet.user.avatar}" alt="${tweet.user.name}" class="w-12 h-12 rounded-full">
      </a>
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-1">
          <a href="profile.html?id=${tweet.user.id}" class="font-bold hover:underline">${tweet.user.name}</a>
          ${verifiedBadge}
          <span class="text-gray-500">@${tweet.user.username}</span>
          <span class="text-gray-500">·</span>
          <span class="text-gray-500">${formattedTime}</span>
        </div>
        
        <a href="post.html?id=${tweet.id}">
          <p class="mt-1 text-gray-900 dark:text-gray-100">${tweet.content}</p>
          ${imageContent}
        </a>
        
        <div class="flex justify-between mt-3 max-w-md">
          <button class="flex items-center space-x-1 text-gray-500 hover:text-blue-500 group">
            <div class="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span>${tweet.stats.replies}</span>
          </button>
          
          <button class="flex items-center space-x-1 text-gray-500 hover:text-green-500 group">
            <div class="p-2 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span>${tweet.stats.retweets}</span>
          </button>
          
          <button class="flex items-center space-x-1 text-gray-500 hover:text-pink-500 group">
            <div class="p-2 rounded-full group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span>${tweet.stats.likes}</span>
          </button>
          
          <button class="flex items-center space-x-1 text-gray-500 hover:text-blue-500 group">
            <div class="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;
  
  return div;
}

// Fonction pour formater la date (si elle n'est pas définie dans main.js)
function formatDate(dateString) {
  if (window.formatDate) {
    return window.formatDate(dateString);
  }
  
  // Version simplifiée si la fonction n'est pas définie dans main.js
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  
  if (diffDays > 0) {
    return `${diffDays}j`;
  } else if (diffHours > 0) {
    return `${diffHours}h`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes}m`;
  } else {
    return "maintenant";
  }
}

// Initialiser les onglets
function initProfileTabs(profileId) {
  const tabs = document.querySelectorAll('.profile-tab');
  if (!tabs.length) return;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Enlever la classe active de tous les onglets
      tabs.forEach(t => {
        t.classList.remove('active', 'border-b-2', 'border-blue-500');
        t.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-900');
      });
      
      // Ajouter la classe active à l'onglet cliqué
      this.classList.add('active', 'border-b-2', 'border-blue-500');
      this.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-900');
      
      // Charger le contenu correspondant à l'onglet
      const tabName = this.getAttribute('data-tab');
      loadTabContent(tabName, profileId);
    });
  });
}

// Charger le contenu correspondant à l'onglet sélectionné
function loadTabContent(tabName, profileId) {
  const profileTweets = document.getElementById('profile-tweets');
  if (!profileTweets) return;
  
  // Vider le contenu actuel
  profileTweets.innerHTML = '';
  
  // Selon l'onglet sélectionné, afficher différents types de tweets
  switch (tabName) {
    case 'tweets':
      loadProfileTweets(profileId);
      break;
    case 'replies':
      profileTweets.innerHTML = `
        <div class="p-4 text-center text-gray-500">
          <p>Tweets et réponses en cours de développement.</p>
        </div>
      `;
      break;
    case 'media':
      const mediaTweets = tweets.filter(tweet => tweet.user.id === profileId && tweet.image);
      
      if (mediaTweets.length === 0) {
        profileTweets.innerHTML = `
          <div class="p-4 text-center text-gray-500">
            <p>Aucun média à afficher.</p>
          </div>
        `;
        return;
      }
      
      mediaTweets.forEach(tweet => {
        const tweetElement = createTweetElement(tweet);
        profileTweets.appendChild(tweetElement);
      });
      break;
    case 'likes':
      profileTweets.innerHTML = `
        <div class="p-4 text-center text-gray-500">
          <p>Tweets j'aime en cours de développement.</p>
        </div>
      `;
      break;
    default:
      loadProfileTweets(profileId);
  }
}
