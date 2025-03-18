
// Données fictives pour notre application
let tweets = [
  {
    id: "t1",
    user: {
      id: "user1",
      name: "Jonathan Doe",
      username: "jonathandoe",
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true
    },
    content: "Développer une application avec HTML, Tailwind et JavaScript est une excellente combinaison pour des résultats rapides et élégants!",
    image: null,
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 heures avant
    stats: {
      replies: 12,
      retweets: 24,
      likes: 98
    },
    liked: false,
    retweeted: false
  },
  {
    id: "t2",
    user: {
      id: "user2",
      name: "Marie Durand",
      username: "mariedurand",
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: false
    },
    content: "Je viens de découvrir ce nouveau réseau social! L'interface ressemble beaucoup à celle de Twitter, j'adore!",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
    timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 heures avant
    stats: {
      replies: 5,
      retweets: 8,
      likes: 37
    },
    liked: false,
    retweeted: false
  },
  {
    id: "t3",
    user: {
      id: "user3",
      name: "Alex Martin",
      username: "alexm",
      avatar: "https://i.pravatar.cc/150?img=8",
      verified: true
    },
    content: "Tailwind CSS est vraiment génial pour le développement web moderne. On peut créer des interfaces utilisateur superbes en un temps record!",
    image: null,
    timestamp: new Date(Date.now() - 21600000).toISOString(), // 6 heures avant
    stats: {
      replies: 18,
      retweets: 42,
      likes: 136
    },
    liked: false,
    retweeted: false
  },
  {
    id: "t4",
    user: {
      id: "user4",
      name: "Sophie Chen",
      username: "sophiechen",
      avatar: "https://i.pravatar.cc/150?img=9",
      verified: false
    },
    content: "Qui est partant pour un meetup développeurs web à Paris la semaine prochaine? #WebDev #Paris #Meetup",
    image: null,
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 jour avant
    stats: {
      replies: 32,
      retweets: 15,
      likes: 64
    },
    liked: false,
    retweeted: false
  },
  {
    id: "t5",
    user: {
      id: "user5",
      name: "Thomas Bernard",
      username: "thomasb",
      avatar: "https://i.pravatar.cc/150?img=12",
      verified: true
    },
    content: "Je viens de lancer mon nouveau site web! Réalisé avec HTML, CSS et JavaScript vanilla. Parfois, les solutions simples sont les meilleures. Qu'en pensez-vous? #WebDev",
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800&auto=format&fit=crop",
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 jours avant
    stats: {
      replies: 47,
      retweets: 28,
      likes: 219
    },
    liked: false,
    retweeted: false
  }
];

// Données pour les tendances
const trendingTopics = [
  { id: 1, category: "Technologie", name: "React", tweets: "10.5K" },
  { id: 2, category: "Sport", name: "PSG", tweets: "105K" },
  { id: 3, category: "Business", name: "Bitcoin", tweets: "325K" },
  { id: 4, category: "Divertissement", name: "Netflix", tweets: "43K" },
  { id: 5, category: "Science", name: "NASA", tweets: "28K" }
];

// Données pour les suggestions d'utilisateurs
const suggestedUsers = [
  { id: "user6", name: "Emma Smith", username: "emmasmith", avatar: "https://i.pravatar.cc/150?img=1", verified: false },
  { id: "user7", name: "James Brown", username: "jamesbrown", avatar: "https://i.pravatar.cc/150?img=2", verified: true },
  { id: "user8", name: "Olivia Johnson", username: "oliviaj", avatar: "https://i.pravatar.cc/150?img=3", verified: false }
];

// Utilisateur connecté (fictif)
const currentUser = {
  id: "user0",
  name: "John Doe",
  username: "johndoe",
  avatar: "https://i.pravatar.cc/100",
  verified: false
};

// Fonction d'initialisation
document.addEventListener('DOMContentLoaded', function() {
  // Charger les tweets
  loadTweets();
  
  // Charger les tendances
  loadTrendingTopics();
  
  // Charger les suggestions d'utilisateurs
  loadSuggestedUsers();
  
  // Initialiser les événements
  initEvents();
  
  // Activer le mode sombre si nécessaire
  initDarkMode();
});

// Fonction pour formater la date
function formatDate(dateString) {
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

// Charger les tweets dans la timeline
function loadTweets() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;
  
  timeline.innerHTML = '';
  
  tweets.forEach(tweet => {
    const tweetElement = createTweetElement(tweet);
    timeline.appendChild(tweetElement);
  });
}

// Créer un élément HTML pour un tweet
function createTweetElement(tweet) {
  const div = document.createElement('div');
  div.classList.add('p-4', 'border-b', 'border-gray-200', 'dark:border-gray-800', 'hover:bg-gray-50', 'dark:hover:bg-gray-900', 'transition-colors');
  div.setAttribute('data-tweet-id', tweet.id);
  
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
          <button class="tweet-action reply flex items-center space-x-1 text-gray-500 hover:text-blue-500 group">
            <div class="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span>${tweet.stats.replies}</span>
          </button>
          
          <button class="tweet-action retweet flex items-center space-x-1 text-gray-500 hover:text-green-500 group ${tweet.retweeted ? 'active' : ''}">
            <div class="p-2 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span>${tweet.stats.retweets}</span>
          </button>
          
          <button class="tweet-action like flex items-center space-x-1 text-gray-500 hover:text-pink-500 group ${tweet.liked ? 'active' : ''}">
            <div class="p-2 rounded-full group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span>${tweet.stats.likes}</span>
          </button>
          
          <button class="tweet-action share flex items-center space-x-1 text-gray-500 hover:text-blue-500 group">
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
  
  // Ajouter les événements aux boutons d'interaction
  addTweetInteractionEvents(div, tweet);
  
  return div;
}

// Ajouter les événements aux boutons d'interaction du tweet
function addTweetInteractionEvents(tweetElement, tweet) {
  // Like
  const likeButton = tweetElement.querySelector('.tweet-action.like');
  likeButton.addEventListener('click', function() {
    const tweetId = tweetElement.getAttribute('data-tweet-id');
    toggleLikeTweet(tweetId);
  });
  
  // Retweet
  const retweetButton = tweetElement.querySelector('.tweet-action.retweet');
  retweetButton.addEventListener('click', function() {
    const tweetId = tweetElement.getAttribute('data-tweet-id');
    toggleRetweetTweet(tweetId);
  });
  
  // Reply
  const replyButton = tweetElement.querySelector('.tweet-action.reply');
  replyButton.addEventListener('click', function() {
    const tweetId = tweetElement.getAttribute('data-tweet-id');
    openReplyModal(tweetId);
  });
}

// Fonction pour liker/unliker un tweet
function toggleLikeTweet(tweetId) {
  const tweetIndex = tweets.findIndex(t => t.id === tweetId);
  if (tweetIndex === -1) return;
  
  const tweet = tweets[tweetIndex];
  tweet.liked = !tweet.liked;
  
  if (tweet.liked) {
    tweet.stats.likes++;
  } else {
    tweet.stats.likes--;
  }
  
  // Mettre à jour l'affichage
  loadTweets();
}

// Fonction pour retweeter/annuler un retweet
function toggleRetweetTweet(tweetId) {
  const tweetIndex = tweets.findIndex(t => t.id === tweetId);
  if (tweetIndex === -1) return;
  
  const tweet = tweets[tweetIndex];
  tweet.retweeted = !tweet.retweeted;
  
  if (tweet.retweeted) {
    tweet.stats.retweets++;
  } else {
    tweet.stats.retweets--;
  }
  
  // Mettre à jour l'affichage
  loadTweets();
}

// Fonction pour ouvrir la modal de réponse
function openReplyModal(tweetId) {
  // Cette fonction serait implémentée pour ouvrir une modal de réponse
  console.log(`Répondre au tweet ${tweetId}`);
  alert(`Fonctionnalité de réponse en cours de développement pour le tweet ${tweetId}`);
}

// Charger les tendances
function loadTrendingTopics() {
  const trendingElement = document.getElementById('trending-topics');
  if (!trendingElement) return;
  
  trendingElement.innerHTML = '';
  
  trendingTopics.forEach(topic => {
    const topicElement = document.createElement('div');
    topicElement.classList.add('cursor-pointer', 'hover:bg-gray-200', 'dark:hover:bg-gray-700', 'p-2', 'rounded');
    
    topicElement.innerHTML = `
      <p class="text-xs text-gray-500">${topic.category}</p>
      <p class="font-bold">#${topic.name}</p>
      <p class="text-xs text-gray-500">${topic.tweets} Tweets</p>
    `;
    
    trendingElement.appendChild(topicElement);
  });
}

// Charger les suggestions d'utilisateurs
function loadSuggestedUsers() {
  const suggestedElement = document.getElementById('suggested-users');
  if (!suggestedElement) return;
  
  suggestedElement.innerHTML = '';
  
  suggestedUsers.forEach(user => {
    const userElement = document.createElement('div');
    userElement.classList.add('flex', 'items-center', 'justify-between');
    
    const verifiedBadge = user.verified 
      ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
      : '';
    
    userElement.innerHTML = `
      <div class="flex items-center space-x-2">
        <img
          src="${user.avatar}"
          alt="${user.name}"
          class="w-10 h-10 rounded-full"
        />
        <div>
          <p class="font-bold text-sm">${user.name} ${verifiedBadge}</p>
          <p class="text-gray-500 text-sm">@${user.username}</p>
        </div>
      </div>
      <button class="follow-button rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-sm font-bold py-1 px-4">
        Suivre
      </button>
    `;
    
    // Ajouter l'événement pour suivre l'utilisateur
    const followButton = userElement.querySelector('.follow-button');
    followButton.addEventListener('click', function(e) {
      e.preventDefault();
      followUser(user.id, followButton);
    });
    
    suggestedElement.appendChild(userElement);
  });
}

// Fonction pour suivre un utilisateur
function followUser(userId, button) {
  if (button.innerText === 'Suivre') {
    button.innerText = 'Suivi';
    button.classList.remove('bg-black', 'dark:bg-white', 'text-white', 'dark:text-black');
    button.classList.add('bg-transparent', 'border', 'border-gray-300', 'text-black', 'dark:text-white');
  } else {
    button.innerText = 'Suivre';
    button.classList.remove('bg-transparent', 'border', 'border-gray-300', 'text-black', 'dark:text-white');
    button.classList.add('bg-black', 'dark:bg-white', 'text-white', 'dark:text-black');
  }
}

// Initialiser les événements
function initEvents() {
  // Textarea pour composer un tweet
  const tweetComposer = document.getElementById('tweet-composer');
  const sendTweetButton = document.getElementById('send-tweet-button');
  
  if (tweetComposer && sendTweetButton) {
    tweetComposer.addEventListener('input', function() {
      if (tweetComposer.value.trim().length > 0) {
        sendTweetButton.removeAttribute('disabled');
      } else {
        sendTweetButton.setAttribute('disabled', '');
      }
    });
    
    sendTweetButton.addEventListener('click', function() {
      if (tweetComposer.value.trim().length > 0) {
        sendTweet(tweetComposer.value);
        tweetComposer.value = '';
        sendTweetButton.setAttribute('disabled', '');
      }
    });
  }
  
  // Modal pour composer un tweet
  const tweetButton = document.getElementById('tweet-button');
  const tweetModal = document.getElementById('tweet-modal');
  const closeModal = document.getElementById('close-modal');
  const modalTweetComposer = document.getElementById('modal-tweet-composer');
  const modalSendTweet = document.getElementById('modal-send-tweet');
  
  if (tweetButton && tweetModal && closeModal) {
    tweetButton.addEventListener('click', function() {
      tweetModal.classList.remove('hidden');
    });
    
    closeModal.addEventListener('click', function() {
      tweetModal.classList.add('hidden');
      modalTweetComposer.value = '';
    });
    
    if (modalSendTweet && modalTweetComposer) {
      modalSendTweet.addEventListener('click', function() {
        if (modalTweetComposer.value.trim().length > 0) {
          sendTweet(modalTweetComposer.value);
          modalTweetComposer.value = '';
          tweetModal.classList.add('hidden');
        }
      });
    }
  }
  
  // Recherche
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length > 0) {
          // Rediriger vers la page de résultats de recherche
          window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
        }
      }
    });
  }
}

// Fonction pour envoyer un tweet
function sendTweet(content) {
  const newTweet = {
    id: 't' + (tweets.length + 1),
    user: currentUser,
    content: content,
    image: null,
    timestamp: new Date().toISOString(),
    stats: {
      replies: 0,
      retweets: 0,
      likes: 0
    },
    liked: false,
    retweeted: false
  };
  
  // Ajouter le tweet au début du tableau
  tweets.unshift(newTweet);
  
  // Mettre à jour l'affichage
  loadTweets();
}

// Initialisation du mode sombre
function initDarkMode() {
  const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkModePreference.matches) {
    document.documentElement.classList.add('dark');
  }
  
  // Écouter les changements de préférence système
  darkModePreference.addEventListener('change', function(e) {
    if (e.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
}
