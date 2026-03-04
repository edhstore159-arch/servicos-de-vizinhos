// Mock data para allovoisins clone

export const mockUsers = [
  {
    id: '1',
    name: 'Hassan H.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    location: 'Paris (Faubourg du Roule 8) - 17 km',
    rating: 4.8,
    reviews: 24
  },
  {
    id: '2',
    name: 'Marie L.',
    avatar: 'https://i.pravatar.cc/150?img=45',
    location: 'Lyon (Part-Dieu) - 8 km',
    rating: 4.9,
    reviews: 32
  },
  {
    id: '3',
    name: 'Thomas B.',
    avatar: 'https://i.pravatar.cc/150?img=33',
    location: 'Marseille (Vieux Port) - 5 km',
    rating: 4.7,
    reviews: 18
  },
  {
    id: '4',
    name: 'Sophie M.',
    avatar: 'https://i.pravatar.cc/150?img=48',
    location: 'Toulouse (Capitole) - 12 km',
    rating: 5.0,
    reviews: 41
  },
  {
    id: '5',
    name: 'Lucas D.',
    avatar: 'https://i.pravatar.cc/150?img=52',
    location: 'Nice (Promenade des Anglais) - 6 km',
    rating: 4.6,
    reviews: 15
  }
];

export const mockDemands = [
  {
    id: '1',
    userId: '1',
    title: 'Mécanicien professionnel pour changer une butée hydraulique',
    description: "Bonjour, je cherche mécanicien professionnel pour changer une butée hydraulique de ma megane 4 1.5 dci. Je voudrais vous informer que j'ai déjà remplacé un kit complet d'embrayage de la marque LuK en Algérie. Depuis, lorsque je roule environ 20 kilomètres, tout va bien au début, mais une fois le moteur bien chaud, l'embrayage commence à grincer, avec un bruit de grincement au niveau de la boîte. En plus, les vitesses, notamment la première et la deuxième, passent mal, elles claquent. Le bimasse et l'embrayage sont neufs, mais je pense que le problème vient de la butée.",
    budget: 'Sur devis',
    category: 'Mécanique',
    location: 'Paris (Faubourg du Roule 8) - 17 km',
    postedAt: '2026-03-04T10:35:00',
    likes: 1,
    recommends: 0,
    responses: 1,
    isPro: true
  },
  {
    id: '2',
    userId: '2',
    title: 'Aide pour déménagement appartement T3',
    description: "Je recherche une personne disponible ce week-end pour m'aider à déménager mon appartement T3 vers une maison. J'ai déjà loué un camion, j'aurais besoin d'aide pour porter les meubles et cartons. Déménagement local, environ 15km de distance.",
    budget: '80€',
    category: 'Déménagement',
    location: 'Lyon (Part-Dieu) - 8 km',
    postedAt: '2026-03-04T09:20:00',
    likes: 5,
    recommends: 2,
    responses: 3,
    isPro: false
  },
  {
    id: '3',
    userId: '3',
    title: 'Cours particuliers de mathématiques niveau lycée',
    description: "Bonjour, je cherche un professeur de mathématiques pour ma fille en Terminale S. Elle a besoin d'aide pour préparer son bac, notamment en géométrie dans l'espace et probabilités. Cours à domicile préférés, 2h par semaine.",
    budget: '25€/h',
    category: 'Cours particuliers',
    location: 'Marseille (Vieux Port) - 5 km',
    postedAt: '2026-03-04T08:15:00',
    likes: 3,
    recommends: 1,
    responses: 5,
    isPro: false
  },
  {
    id: '4',
    userId: '4',
    title: 'Garde d\'enfants mercredi après-midi',
    description: "Je cherche une personne de confiance pour garder mes deux enfants (5 et 8 ans) tous les mercredis après-midi de 14h à 18h. Activités ludiques et aide aux devoirs appréciées. Longue durée souhaitée.",
    budget: '12€/h',
    category: 'Garde d\'enfants',
    location: 'Toulouse (Capitole) - 12 km',
    postedAt: '2026-03-03T16:45:00',
    likes: 8,
    recommends: 4,
    responses: 7,
    isPro: false
  },
  {
    id: '5',
    userId: '5',
    title: 'Réparation fuite robinet cuisine',
    description: "Mon robinet de cuisine fuit depuis hier soir. La fuite vient de la base du robinet. J'ai coupé l'arrivée d'eau en attendant. Intervention rapide souhaitée, je peux me rendre disponible facilement.",
    budget: 'À négocier',
    category: 'Plomberie',
    location: 'Nice (Promenade des Anglais) - 6 km',
    postedAt: '2026-03-03T15:30:00',
    likes: 2,
    recommends: 1,
    responses: 4,
    isPro: false
  }
];

export const mockThematiques = [
  {
    id: '1',
    title: 'J\'ai besoin d\'aide pour des petits travaux',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    likes: '9.6k',
    shares: '2.6k'
  },
  {
    id: '2',
    title: 'J\'ai besoin d\'aide pour le ménage',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop',
    likes: '12.5k',
    shares: '3.3k'
  },
  {
    id: '3',
    title: 'J\'entretiens mon véhicule',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop',
    likes: '5.1k',
    shares: '1.0k'
  }
];

export const mockCategories = [
  'Bricolage',
  'Jardinage',
  'Déménagement',
  'Ménage',
  'Mécanique',
  'Plomberie',
  'Électricité',
  'Cours particuliers',
  'Garde d\'enfants',
  'Informatique',
  'Peinture',
  'Réparation'
];

export const mockMessages = [
  {
    id: '1',
    fromUserId: '2',
    toUserId: '1',
    demandId: '1',
    message: 'Bonjour, je suis disponible pour vous aider avec votre problème de mécanique.',
    timestamp: '2026-03-04T11:00:00',
    read: false
  }
];

export const getCurrentUser = () => ({
  id: 'current',
  name: 'Francis De France F.',
  avatar: 'https://i.pravatar.cc/150?img=68',
  email: 'francis@example.com',
  location: 'Paris (Châtelet)',
  phone: '+33 6 12 34 56 78',
  isPremier: true,
  rating: 4.9,
  reviews: 28
});