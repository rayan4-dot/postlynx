
// Données fictives pour les réponses à un tweet
const replies = {
  "t1": [
    {
      id: "r1t1",
      user: {
        id: "user2",
        name: "Marie Durand",
        username: "mariedurand",
        avatar: "https://i.pravatar.cc/150?img=5",
        verified: false
      },
      content: "Totalement d'accord! J'adore utiliser cette combinaison pour mes projets personnels.",
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 heure avant
      stats: {
        replies: 2,
        retweets: 3,
        likes: 14
      },
      liked: false,
      retweeted: false
    },
    {
      id: "r2t1",
      user: {
        id: "user3",
        name: "Alex Martin",
        username: "alexm",
        avatar: "https://i.pravatar.cc/150?img=8",
        verified: true
      },
      content: "Est-ce que tu as essayé d'ajouter des frameworks comme Alpine.js pour plus d'interactivité?",
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes avant
      stats: {
        replies: 1,
        retweets: 0,
        likes: 5
      },
      liked: false,
      retweeted: false
    }
  ],
  "t2": [
    {
      id: "r1t2",
      user: {
        id: "user1",
        name: "Jonathan Doe",
        username: "jonathandoe",
        avatar: "https://i.pravatar.cc/150?img=1",
        verified: true
      },
      content: "Bienvenue! Je suis d'accord, l'interface est vraiment bien conçue et agréable à utiliser.",
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 heures avant
      stats: {
        replies: 0,
        retweets: 1,
        likes: 8
      },
      liked: false,
      retweeted: false
    }
  ]
};

// Fonction d'initialisation
document.addEventListener('DOMContentLoaded', function() {
  // Récupérer l'ID du tweet dans l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const tweetId = urlParams.get('id');
  
  if (!tweetId) {
    // Rediriger vers la page d'accueil si aucun ID de tweet n'est spécifié
    window.location.href = 'index.html';
    return;
  }
  
  // Charger le tweet
  loadTweet(tweetId);
  
  // Charger les réponses au tweet
  loadReplies(tweetId);
  
  // Initialiser les événements pour le compositeur de réponse
  initReplyComposer(tweetId);
  
  // Initialiser le modal de tweet comme dans main.js
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
  
  // Charger les tendances et suggestions comme dans main.js
  if (typeof loadTrendingTopics === 'function') loadTrendingTopics();
  if (typeof loadSuggestedUsers === 'function') loadSuggestedUsers();
});

// Charger le tweet
function loadTweet(tweetId) {
  // Récupérer le conteneur du tweet
  const tweetContainer = document.getElementById('tweet-container');
  if (!tweetContainer) return;
  
  // Récupérer le tweet depuis la variable globale tweets (dans main.js)
  const tweet = window.tweets ? window.tweets.find(t => t.id === tweetId) : null;
  
  if (!tweet) {
    tweetContainer.innerHTML = `
      <div class="p-4 text-center text-gray-500">
        <p>Ce tweet n'existe pas ou a été supprimé.</p>
      </div>
    `;
    return;
  }
  
  // Créer l'élément pour le tweet principal
  const tweetElement = createDetailedTweetElement(tweet);
  tweetContainer.appendChild(tweetElement);
}

// Créer un élément HTML détaillé pour un tweet
function createDetailedTweetElement(tweet) {
  const div = document.createElement('div');
  div.classList.add('p-4', 'border-b', 'border-gray-200', 'dark:border-gray-800');
  
  const formattedTime = formatDate(tweet.timestamp);
  
  let verifiedBadge = tweet.user.verified 
    ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 inline-block ml-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>'
    : '';
  
  let imageContent = tweet.image
    ? `<img src="${tweet.image}" alt="Tweet media" class="mt-3 rounded-2xl max-h-96 w-full object-cover">`
    : '';
  
  // Formater la date complète pour le tweet détaillé
  const fullDate = formatFullDate(tweet.timestamp);
  
  div.innerHTML = `
    <div class="space-y-3">
      <div class="flex items-center space-x-3">
        <a href="profile.html?id=${tweet.user.id}">
          <img src="${tweet.user.avatar}" alt="${tweet.user.name}" class="w-12 h-12 rounded-full">
        </a>
        <div>
          <a href="profile.html?id=${tweet.user.id}" class="font-bold hover:underline">${tweet.user.name}</a>
          ${verifiedBadge}
          <p class="text-gray-500">@${tweet.user.username}</p>
        </div>
      </div>
      
      <p class="text-xl">${tweet.content}</p>
      
      ${imageContent}
      
      <p class="text-gray-500 py-2">${fullDate}</p>
      
      <div class="flex space-x-6 py-2 border-t border-b border-gray-200 dark:border-gray-800">
        <div>
          <span class="font-bold">${tweet.stats.retweets}</span>
          <span class="text-gray-500">Retweets</span>
        </div>
        <div>
          <span class="font-bold">${tweet.stats.likes}</span>
          <span class="text-gray-500">J'aime</span>
        </div>
      </div>
      
      <div class="flex justify-between">
        <button class="tweet-action reply flex items-center space-x-1 text-gray-500 hover:text-blue-500 group">
          <div class="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </button>
        
        <button class="tweet-action retweet flex items-center space-x-1 text-gray-500 hover:text-green-500 group ${tweet.retweeted ? 'active' : ''}">
          <div class="p-2 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </button>
        
        <button class="tweet-action like flex items-center space-x-1 text-gray-500 hover:text-pink-500 group ${tweet.liked ? 'active' : ''}">
          <div class="p-2 rounded-full group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
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
  `;
  
  // Ajouter les événements aux boutons d'interaction
  const likeButton = div.querySelector('.tweet-action.like');
  if (likeButton) {
    likeButton.addEventListener('click', function() {
      toggleLikeTweet(tweet.id);
      loadTweet(tweet.id); // Recharger le tweet pour mettre à jour l'UI
    });
  }
  
  const retweetButton = div.querySelector('.tweet-action.retweet');
  if (retweetButton) {
    retweetButton.addEventListener('click', function() {
      toggleRetweetTweet(tweet.id);
      loadTweet(tweet.id); // Recharger le tweet pour mettre à jour l'UI
    });
  }
  
  return div;
}

// Fonction pour formater la date complète
function formatFullDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Fonction pour formater la date relative (si elle n'est pas définie dans main.js)
function formatDate(dateString) {
  if (window.formatDate) {
    return window.formatDate(dateString);
  }
  
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

// Fonction pour liker/unliker un tweet (si elle n'est pas définie dans main.js)
function toggleLikeTweet(tweetId) {
  if (window.toggleLikeTweet) {
    return window.toggleLikeTweet(tweetId);
  }
  
  // Version simplifiée si la fonction n'est pas définie dans main.js
  if (!window.tweets) return;
  
  const tweetIndex = window.tweets.findIndex(t => t.id === tweetId);
  if (tweetIndex === -1) return;
  
  const tweet = window.tweets[tweetIndex];
  tweet.liked = !tweet.liked;
  
  if (tweet.liked) {
    tweet.stats.likes++;
  } else {
    tweet.stats.likes--;
  }
}

// Fonction pour retweeter/annuler un retweet (si elle n'est pas définie dans main.js)
function toggleRetweetTweet(tweetId) {
  if (window.toggleRetweetTweet) {
    return window.toggleRetweetTweet(tweetId);
  }
  
  // Version simplifiée si la fonction n'est pas définie dans main.js
  if (!window.tweets) return;
  
  const tweetIndex = window.tweets.findIndex(t => t.id === tweetId);
  if (tweetIndex === -1) return;
  
  const tweet = window.tweets[tweetIndex];
  tweet.retweeted = !tweet.retweeted;
  
  if (tweet.retweeted) {
    tweet.stats.retweets++;
  } else {
    tweet.stats.retweets--;
  }
}

// Charger les réponses au tweet
function loadReplies(tweetId) {
  const repliesContainer = document.getElementById('replies-container');
  if (!repliesContainer) return;
  
  // Récupérer les réponses depuis la variable replies
  const tweetReplies = replies[tweetId] || [];
  
  if (tweetReplies.length === 0) {
    repliesContainer.innerHTML = `
      <div class="p-4 text-center text-gray-500">
        <p>Aucune réponse pour l'instant. Soyez le premier à répondre!</p>
      </div>
    `;
    return;
  }
  
  repliesContainer.innerHTML = '';
  
  // Créer et ajouter les réponses
  tweetReplies.forEach(reply => {
    const replyElement = createTweetElement(reply);
    repliesContainer.appendChild(replyElement);
  });
}

// Créer un élément HTML pour une réponse
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
        
        <p class="mt-1 text-gray-900 dark:text-gray-100">${tweet.content}</p>
        
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

// Initialiser le compositeur de réponse
function initReplyComposer(tweetId) {
  const replyComposer = document.getElementById('reply-composer');
  const sendReplyButton = document.getElementById('send-reply-button');
  
  if (!replyComposer || !sendReplyButton) return;
  
  replyComposer.addEventListener('input', function() {
    if (replyComposer.value.trim().length > 0) {
      sendReplyButton.removeAttribute('disabled');
    } else {
      sendReplyButton.setAttribute('disabled', '');
    }
  });
  
  sendReplyButton.addEventListener('click', function() {
    if (replyComposer.value.trim().length > 0) {
      sendReply(tweetId, replyComposer.value);
      replyComposer.value = '';
      sendReplyButton.setAttribute('disabled', '');
    }
  });
}

// Fonction pour envoyer une réponse
function sendReply(tweetId, content) {
  // Créer la nouvelle réponse
  const newReply = {
    id: `r${Date.now()}`,
    user: {
      id: "user0",
      name: "John Doe",
      username: "johndoe",
      avatar: "https://i.pravatar.cc/100",
      verified: false
    },
    content: content,
    timestamp: new Date().toISOString(),
    stats: {
      replies: 0,
      retweets: 0,
      likes: 0
    },
    liked: false,
    retweeted: false
  };
  
  // Initialiser le tableau de réponses pour ce tweet s'il n'existe pas
  if (!replies[tweetId]) {
    replies[tweetId] = [];
  }
  
  // Ajouter la réponse au début du tableau
  replies[tweetId].unshift(newReply);
  
  // Incrémenter le nombre de réponses du tweet original
  if (window.tweets) {
    const tweet = window.tweets.find(t => t.id === tweetId);
    if (tweet) {
      tweet.stats.replies++;
    }
  }
  
  // Recharger les réponses et le tweet
  loadReplies(tweetId);
  loadTweet(tweetId);
}
