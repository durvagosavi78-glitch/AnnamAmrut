export const DEMO_PROFILES = {
  restaurant: {
    id: 'rest-1',
    name: 'GreenLeaf Bistro & Banquet',
    role: 'restaurant',
    email: 'contact@greenleafbistro.com',
    phone: '+91 98201 44552',
    address: 'Plot 42, Bandra West, Linking Road, Mumbai',
    organization: 'GreenLeaf Hospitality Group',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&auto=format&fit=crop&q=80',
    impactScore: 850,
    rank: 3,
    mealsSaved: 2450,
    foodRescuedKg: 520,
    activeDonationsCount: 2,
    tier: 'Gold Tier Social Hero',
    badges: [
      { id: 'b1', name: 'Zero Waste Champion', icon: '🏆', tier: 'gold', description: 'Rescued over 2,000 meals', dateEarned: 'Aug 2026' },
      { id: 'b2', name: 'Rapid Response Partner', icon: '⚡', tier: 'silver', description: 'Dispatches under 20 mins', dateEarned: 'Jul 2026' },
      { id: 'b3', name: 'Community Pillar', icon: '🌟', tier: 'gold', description: 'Partnered with 8+ verified NGOs', dateEarned: 'May 2026' },
      { id: 'b4', name: 'ESG Certified Donor', icon: '🌱', tier: 'diamond', description: 'Verified 500kg CO2e offset', dateEarned: 'Aug 2026' }
    ]
  },
  individual: {
    id: 'ind-1',
    name: 'Priya Sharma',
    role: 'individual',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 21098',
    address: 'B-402, Sunshine Heights, Powai, Mumbai',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    impactScore: 180,
    rank: 14,
    mealsSaved: 95,
    foodRescuedKg: 24,
    activeDonationsCount: 1,
    tier: 'Community Caretaker',
    badges: [
      { id: 'b11', name: 'Compassionate Neighbor', icon: '❤️', tier: 'bronze', description: 'Made 5+ personal donations', dateEarned: 'Aug 2026' },
      { id: 'b12', name: 'Fresh Protector', icon: '🥗', tier: 'silver', description: 'Zero spoiled meal submissions', dateEarned: 'Aug 2026' }
    ]
  },
  ngo: {
    id: 'ngo-1',
    name: 'Asha Food Rescue Foundation',
    role: 'ngo',
    email: 'dispatch@ashafoundation.org',
    phone: '+91 99302 77112',
    address: 'Rescue Hub 3, Dadar TT Circle, Mumbai',
    organization: 'Asha Foundation for Hunger Relief',
    avatar: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=150&auto=format&fit=crop&q=80',
    impactScore: 1420,
    rank: 1,
    mealsSaved: 6890,
    foodRescuedKg: 1840,
    activeDonationsCount: 4,
    tier: 'Platinum Rescue Network',
    badges: [
      { id: 'b21', name: 'Lightning Rescue Squad', icon: '⚡', tier: 'diamond', description: 'Average response under 15 mins', dateEarned: 'Aug 2026' },
      { id: 'b22', name: 'Zero Rejection Badge', icon: '🛡️', tier: 'gold', description: '100% successful shelter handovers', dateEarned: 'Jul 2026' }
    ]
  },
  volunteer: {
    id: 'vol-1',
    name: 'Arun Kumar',
    role: 'volunteer',
    email: 'arun.volunteer@gmail.com',
    phone: '+91 97654 32110',
    address: 'Kurla West, Mumbai',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    impactScore: 490,
    rank: 2,
    mealsSaved: 420,
    foodRescuedKg: 95,
    activeDonationsCount: 1,
    tier: 'Star Rider Hero',
    badges: [
      { id: 'b31', name: 'Speedy Wheels', icon: '🚴', tier: 'gold', description: '50+ bike delivery rescues completed', dateEarned: 'Aug 2026' },
      { id: 'b32', name: 'Night Owl Hero', icon: '🦉', tier: 'silver', description: 'Rescued post-10PM banquet leftovers', dateEarned: 'Aug 2026' }
    ]
  }
};

export const INITIAL_DONATIONS = [
  {
    id: 'DON-101',
    title: 'Hyderabadi Veg Biryani & Paneer Gravy',
    category: 'Cooked Meals',
    servings: 80,
    quantityKg: 28,
    preparedAt: 'Today, 1:30 PM',
    expiresAt: 'Today, 5:30 PM (in 45 mins)',
    urgency: 'urgent',
    dietary: ['Vegetarian', 'Jain Friendly'],
    packaging: 'Packed Boxes',
    providerId: 'rest-1',
    providerName: 'GreenLeaf Bistro & Banquet',
    providerType: 'restaurant',
    providerAddress: 'Plot 42, Bandra West, Linking Road, Mumbai',
    coordinates: [19.0600, 72.8360],
    contactPhone: '+91 98201 44552',
    pickupInstructions: 'Collect from Kitchen Back Exit (Door B), speak to Chef Rajesh.',
    status: 'available',
    statusUpdates: [
      { status: 'available', timestamp: '1:45 PM', note: 'Surplus banquet lunch packaged in fresh boxes', updatedBy: 'GreenLeaf Staff' }
    ],
    createdAt: '2026-08-22T13:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'DON-102',
    title: 'Fresh Artisan Breads, Croissants & Buns',
    category: 'Bakery & Bread',
    servings: 50,
    quantityKg: 12,
    preparedAt: 'Today, 8:00 AM',
    expiresAt: 'Today, 5:15 PM (in 30 mins)',
    urgency: 'urgent',
    dietary: ['Vegetarian', 'Halal'],
    packaging: 'Packed Boxes',
    providerId: 'rest-2',
    providerName: 'The French Crust Bakery',
    providerType: 'restaurant',
    providerAddress: 'Hill Road, Bandra West, Mumbai',
    coordinates: [19.0550, 72.8290],
    contactPhone: '+91 98111 88223',
    pickupInstructions: 'Brown paper bags ready behind the front counter.',
    status: 'available',
    statusUpdates: [
      { status: 'available', timestamp: '2:10 PM', note: 'Fresh morning bake surplus from lunch rush', updatedBy: 'Manager Sarah' }
    ],
    createdAt: '2026-08-22T14:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'DON-103',
    title: 'North Indian Deluxe Thali Meal Boxes',
    category: 'Cooked Meals',
    servings: 60,
    quantityKg: 22,
    preparedAt: 'Today, 2:00 PM',
    expiresAt: 'Today, 7:00 PM (in 2.5 hrs)',
    urgency: 'soon',
    dietary: ['Vegetarian'],
    packaging: 'Buffet Trays',
    providerId: 'rest-3',
    providerName: 'Spice Route Grand Hotel',
    providerType: 'restaurant',
    providerAddress: 'Juhu Tara Road, Juhu, Mumbai',
    coordinates: [19.0980, 72.8260],
    contactPhone: '+91 98450 11223',
    pickupInstructions: 'Bring 4-5 medium thermal boxes, food is hot in warmers.',
    status: 'claimed',
    claimedByNgoId: 'ngo-1',
    claimedByNgoName: 'Asha Food Rescue Foundation',
    assignedVolunteer: 'Arun Kumar (Bike Squad)',
    targetDestination: 'Sneha Sadan Child Home, Andheri',
    statusUpdates: [
      { status: 'available', timestamp: '2:30 PM', note: 'Buffet extra meals recorded', updatedBy: 'Spice Route GM' },
      { status: 'claimed', timestamp: '3:05 PM', note: 'Claimed by Asha Rescue Unit', updatedBy: 'Asha Dispatch' },
      { status: 'pickup_started', timestamp: '3:20 PM', note: 'Volunteer Arun Kumar en route (ETA 10 min)', updatedBy: 'Arun Kumar' }
    ],
    createdAt: '2026-08-22T14:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'DON-104',
    title: 'Organic Apples, Oranges & Green Veggies',
    category: 'Raw Produce & Veggies',
    servings: 120,
    quantityKg: 45,
    preparedAt: 'Today, 11:00 AM',
    expiresAt: 'Today, 8:00 PM (in 3.5 hrs)',
    urgency: 'soon',
    dietary: ['Vegetarian', 'Vegan', 'Jain Friendly'],
    packaging: 'Containers Provided',
    providerId: 'rest-4',
    providerName: 'FarmFresh Organic Mart',
    providerType: 'restaurant',
    providerAddress: 'Khar West 14th Road, Mumbai',
    coordinates: [19.0700, 72.8340],
    contactPhone: '+91 97766 55443',
    pickupInstructions: 'Crates stacked near loading dock #1.',
    status: 'available',
    statusUpdates: [
      { status: 'available', timestamp: '1:00 PM', note: 'Edible, cosmetically imperfect produce safe for cooking', updatedBy: 'Store Lead' }
    ],
    createdAt: '2026-08-22T13:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'DON-105',
    title: 'Packaged Wheat Flour, Rice & Lentils Kit',
    category: 'Packaged Food',
    servings: 35,
    quantityKg: 18,
    preparedAt: 'Yesterday',
    expiresAt: 'Tomorrow, 9:00 PM',
    urgency: 'flexible',
    dietary: ['Vegetarian', 'Vegan'],
    packaging: 'Packed Boxes',
    providerId: 'ind-1',
    providerName: 'Priya Sharma',
    providerType: 'individual',
    providerAddress: 'B-402, Sunshine Heights, Powai, Mumbai',
    coordinates: [19.1170, 72.9050],
    contactPhone: '+91 98765 21098',
    pickupInstructions: 'Ring doorbell 402, packages kept sealed in cartons.',
    status: 'available',
    statusUpdates: [
      { status: 'available', timestamp: '11:30 AM', note: 'Surplus wedding pantry ingredients donation', updatedBy: 'Priya Sharma' }
    ],
    createdAt: '2026-08-22T11:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'DON-106',
    title: 'Veg Hakka Noodles & Paneer Chilli',
    category: 'Cooked Meals',
    servings: 45,
    quantityKg: 15,
    preparedAt: 'Today, 11:30 AM',
    expiresAt: 'Delivered at 2:15 PM',
    urgency: 'flexible',
    dietary: ['Vegetarian'],
    packaging: 'Packed Boxes',
    providerId: 'rest-5',
    providerName: 'Wok & Roll Kitchen',
    providerType: 'restaurant',
    providerAddress: 'Mahim West, Mumbai',
    coordinates: [19.0350, 72.8400],
    contactPhone: '+91 98223 99881',
    pickupInstructions: 'Delivered successfully to St. Jude shelter.',
    status: 'delivered',
    claimedByNgoId: 'ngo-2',
    claimedByNgoName: 'Robin Hood Army Dadar',
    assignedVolunteer: 'Kiran Patel',
    targetDestination: 'St. Jude Homeless Community Center',
    statusUpdates: [
      { status: 'available', timestamp: '12:00 PM', note: 'Food posted', updatedBy: 'Wok & Roll' },
      { status: 'claimed', timestamp: '12:20 PM', note: 'Claimed by RHA', updatedBy: 'RHA Volunteer' },
      { status: 'collected', timestamp: '1:10 PM', note: 'Collected hot boxes', updatedBy: 'Kiran' },
      { status: 'delivered', timestamp: '2:15 PM', note: 'Distributed 45 hot meals with smiles!', updatedBy: 'Kiran' }
    ],
    createdAt: '2026-08-22T12:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=80'
  }
];

export const MOCK_NGOS = [
  {
    id: 'ngo-1',
    name: 'Asha Food Rescue Foundation',
    category: 'Hunger Relief & Child Nutrition',
    activeVolunteers: 42,
    collectionsToday: 18,
    totalRescues: 6890,
    coordinates: [19.0178, 72.8478], // Dadar
    address: 'Rescue Hub 3, Dadar TT Circle, Mumbai',
    phone: '+91 99302 77112',
    rating: 4.9,
    verified: true
  },
  {
    id: 'ngo-2',
    name: 'Robin Hood Army - City Wing',
    category: 'Youth Volunteer Network',
    activeVolunteers: 65,
    collectionsToday: 14,
    totalRescues: 9240,
    coordinates: [19.0596, 72.8295], // Bandra
    address: 'Chapter Base, Carter Road, Bandra, Mumbai',
    phone: '+91 98199 00441',
    rating: 4.95,
    verified: true
  },
  {
    id: 'ngo-3',
    name: 'Roti Bank Seva Trust',
    category: 'Community Kitchen & Night Shelters',
    activeVolunteers: 28,
    collectionsToday: 10,
    totalRescues: 4120,
    coordinates: [19.0760, 72.8777], // Kurla
    address: 'Station Road, Kurla West, Mumbai',
    phone: '+91 98200 12345',
    rating: 4.8,
    verified: true
  },
  {
    id: 'ngo-4',
    name: 'Annam Seva Sanstha',
    category: 'Hospital & Slum Feeding',
    activeVolunteers: 19,
    collectionsToday: 8,
    totalRescues: 2950,
    coordinates: [19.1136, 72.8697], // Andheri
    address: 'Near Old Nagardas Rd, Andheri East, Mumbai',
    phone: '+91 98334 66778',
    rating: 4.85,
    verified: true
  }
];

export const MOCK_VOLUNTEERS = [
  {
    id: 'vol-1',
    name: 'Arun Kumar',
    vehicle: 'Bike',
    deliveriesToday: 7,
    totalDeliveries: 420,
    points: 490,
    coordinates: [19.0650, 72.8400],
    status: 'on_route'
  },
  {
    id: 'vol-2',
    name: 'Meera Deshmukh',
    vehicle: 'Van',
    deliveriesToday: 9,
    totalDeliveries: 610,
    points: 720,
    coordinates: [19.0480, 72.8350],
    status: 'available'
  },
  {
    id: 'vol-3',
    name: 'Farhan Ali',
    vehicle: 'Electric Scooter',
    deliveriesToday: 5,
    totalDeliveries: 310,
    points: 380,
    coordinates: [19.1020, 72.8450],
    status: 'available'
  }
];

export const MOCK_LEADERBOARDS = {
  restaurants: [
    {
      id: 'r1',
      name: 'GreenLeaf Bistro & Banquet',
      type: 'restaurant',
      mealsRescued: 2450,
      points: 850,
      rank: 1,
      badge: '🥇 Zero Waste Champion',
      recentActivity: 'Rescued 80 servings biryani 45m ago',
      avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'r2',
      name: 'ABC Grand Hotel & Suites',
      type: 'restaurant',
      mealsRescued: 1920,
      points: 710,
      rank: 2,
      badge: '🥈 Community Contributor',
      recentActivity: 'Donated 120 lunch buffet meals yesterday',
      avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'r3',
      name: "Rahul's Cloud Kitchen",
      type: 'restaurant',
      mealsRescued: 1540,
      points: 590,
      rank: 3,
      badge: '🥉 Food Saver Hero',
      recentActivity: 'Provided 35 dinner packets 3h ago',
      avatar: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'r4',
      name: 'The French Crust Bakery',
      type: 'restaurant',
      mealsRescued: 1120,
      points: 440,
      rank: 4,
      badge: '🌟 Bakery Guardian',
      recentActivity: 'Donated 50 fresh loaves 1h ago',
      avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'r5',
      name: 'Spice Route Indian Fine Dining',
      type: 'restaurant',
      mealsRescued: 980,
      points: 390,
      rank: 5,
      badge: '🌱 Fresh Sustainer',
      recentActivity: 'Dispatched 60 Thalis today',
      avatar: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&auto=format&fit=crop&q=80'
    }
  ],
  ngos: [
    {
      id: 'n1',
      name: 'Asha Food Rescue Foundation',
      type: 'ngo',
      mealsRescued: 6890,
      points: 1420,
      rank: 1,
      badge: '🔥 18 Collections Today',
      recentActivity: 'Picked up 60 meals from Juhu, en route to shelter',
      avatar: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'n2',
      name: 'Robin Hood Army - City Chapter',
      type: 'ngo',
      mealsRescued: 9240,
      points: 1380,
      rank: 2,
      badge: '⚡ 14 Collections Today',
      recentActivity: 'Delivered 45 meal boxes to St. Jude center',
      avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'n3',
      name: 'Roti Bank Seva Trust',
      type: 'ngo',
      mealsRescued: 4120,
      points: 920,
      rank: 3,
      badge: '🤝 10 Collections Today',
      recentActivity: 'Mobilized van squad in Kurla zone',
      avatar: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'n4',
      name: 'Annam Seva Sanstha',
      type: 'ngo',
      mealsRescued: 2950,
      points: 710,
      rank: 4,
      badge: '🍲 8 Collections Today',
      recentActivity: 'Distributed 70 hot dinners to hospital visitors',
      avatar: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=100&auto=format&fit=crop&q=80'
    }
  ],
  volunteers: [
    {
      id: 'v1',
      name: 'Arun Kumar',
      type: 'volunteer',
      mealsRescued: 420,
      points: 490,
      rank: 1,
      badge: '🚴 7 Rescues Today',
      recentActivity: 'Completed pickup at Bandra West',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'v2',
      name: 'Meera Deshmukh',
      type: 'volunteer',
      mealsRescued: 610,
      points: 720,
      rank: 2,
      badge: '🚐 9 Rescues Today',
      recentActivity: 'Collected 40kg wholesale produce',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'v3',
      name: 'Farhan Ali',
      type: 'volunteer',
      mealsRescued: 310,
      points: 380,
      rank: 3,
      badge: '⚡ 5 Rescues Today',
      recentActivity: 'Delivered bakery stock to night school',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    }
  ]
};

export const INITIAL_LIVE_ACTIVITIES = [
  {
    id: 'act-1',
    actorName: 'GreenLeaf Bistro',
    actorType: 'restaurant',
    actionText: 'posted urgent surplus donation',
    foodTitle: 'Hyderabadi Veg Biryani (80 servings)',
    quantity: '80 meals',
    timestamp: '2 mins ago',
    status: 'posted'
  },
  {
    id: 'act-2',
    actorName: 'Asha Food Rescue',
    actorType: 'ngo',
    actionText: 'accepted urgent mission from',
    foodTitle: 'Spice Route Hotel (60 meals)',
    quantity: '60 meals',
    timestamp: '14 mins ago',
    status: 'claimed'
  },
  {
    id: 'act-3',
    actorName: 'Arun Kumar',
    actorType: 'volunteer',
    actionText: 'arrived at pickup location',
    foodTitle: 'Spice Route Hotel',
    quantity: 'En Route',
    timestamp: '22 mins ago',
    status: 'collected'
  },
  {
    id: 'act-4',
    actorName: 'Robin Hood Army',
    actorType: 'ngo',
    actionText: 'successfully delivered rescue to St. Jude Center',
    foodTitle: 'Wok & Roll Manchurian & Noodles',
    quantity: '45 meals',
    timestamp: '1 hour ago',
    status: 'delivered'
  },
  {
    id: 'act-5',
    actorName: 'The French Crust',
    actorType: 'restaurant',
    actionText: 'posted bakery rescue before closing',
    foodTitle: 'Artisan Breads & Croissants',
    quantity: '50 items',
    timestamp: '1.5 hours ago',
    status: 'posted'
  }
];
