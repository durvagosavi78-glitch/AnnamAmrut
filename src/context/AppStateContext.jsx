import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DEMO_PROFILES, 
  INITIAL_DONATIONS, 
  MOCK_NGOS, 
  MOCK_VOLUNTEERS, 
  MOCK_LEADERBOARDS, 
  INITIAL_LIVE_ACTIVITIES 
} from '../data/mockData';
import confetti from 'canvas-confetti';

const AppStateContext = createContext(undefined);

const STORAGE_KEYS = {
  DONATIONS: 'annamamrut_donations_v1',
  USER: 'annamamrut_current_user_v1',
  ACTIVITIES: 'annamamrut_activities_v1',
  LEADERBOARD: 'annamamrut_leaderboards_v1'
};

export const AppStateProvider = ({ children }) => {
  // 1. Current user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Default to restaurant demo user so judges see rich ESG points immediately
    return DEMO_PROFILES.restaurant;
  });

  // 2. Donations state
  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_DONATIONS;
  });

  // 3. NGOs & Volunteers
  const [ngos] = useState(MOCK_NGOS);
  const [volunteers] = useState(MOCK_VOLUNTEERS);
  
  // 4. Leaderboards & Activities
  const [leaderboards, setLeaderboards] = useState(MOCK_LEADERBOARDS);
  const [liveActivities, setLiveActivities] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_LIVE_ACTIVITIES;
  });

  // 5. Navigation & UI Modals
  const [activeTab, setActiveTab] = useState('home');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedRescueForMission, setSelectedRescueForMission] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Persist donations
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  }, [donations]);

  // Persist user
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  // Persist activities
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(liveActivities));
  }, [liveActivities]);

  const showToast = (title, desc, type = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev.slice(-3), { id, title, desc, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F8A5B', '#DDEFE0', '#1F5C38', '#F59E0B', '#10B981']
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  };

  const switchRole = (role) => {
    if (role === 'guest') {
      setCurrentUser({
        id: 'guest-1',
        name: 'Guest Explorer',
        role: 'guest',
        email: 'guest@annamamrut.org',
        phone: '',
        address: 'Mumbai Central',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        impactScore: 0,
        mealsSaved: 0,
        foodRescuedKg: 0,
        activeDonationsCount: 0,
        badges: []
      });
      showToast('Switched to Guest Mode', 'Exploring the platform as a public visitor', 'info');
      return;
    }

    const targetProfile = DEMO_PROFILES[role];
    if (targetProfile) {
      setCurrentUser(targetProfile);
      showToast(
        `Switched Role: ${targetProfile.name}`,
        `Now operating as ${role.toUpperCase()} (${targetProfile.tier || 'Verified User'})`,
        'success'
      );
    }
  };

  const addDonation = (donationData) => {
    const now = new Date();
    const newId = `DON-${100 + donations.length + 1}`;
    const newDonation = {
      ...donationData,
      id: newId,
      status: 'available',
      createdAt: now.toISOString(),
      statusUpdates: [
        {
          status: 'available',
          timestamp: 'Just now',
          note: 'Donation posted and broadcast to nearby NGOs & volunteers',
          updatedBy: donationData.providerName
        }
      ]
    };

    setDonations(prev => [newDonation, ...prev]);

    // Update current user points & donations
    setCurrentUser(prev => ({
      ...prev,
      activeDonationsCount: prev.activeDonationsCount + 1,
      impactScore: prev.impactScore + (newDonation.urgency === 'urgent' ? 25 : 15),
      mealsSaved: prev.mealsSaved + newDonation.servings,
      foodRescuedKg: prev.foodRescuedKg + newDonation.quantityKg
    }));

    // Add to live activity feed
    const newActivity = {
      id: `act-${Date.now()}`,
      actorName: donationData.providerName,
      actorType: donationData.providerType,
      actionText: `posted ${newDonation.urgency === 'urgent' ? '🚨 URGENT' : 'fresh'} surplus donation`,
      foodTitle: `${donationData.title} (${donationData.servings} servings)`,
      quantity: `${donationData.servings} meals`,
      timestamp: 'Just now',
      status: 'posted'
    };
    setLiveActivities(prev => [newActivity, ...prev]);

    // Show toast
    showToast(
      '🎉 Donation Broadcasted!',
      `${newDonation.servings} servings of ${newDonation.title} is now visible to nearby rescue teams.`,
      'success'
    );

    return newDonation;
  };

  const claimDonation = (
    donationId, 
    ngoId, 
    ngoName, 
    volunteerName = 'Volunteer Squad #1', 
    destination = 'Sneha Sadan Community Shelter'
  ) => {
    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        const updated = {
          ...item,
          status: 'claimed',
          claimedByNgoId: ngoId,
          claimedByNgoName: ngoName,
          assignedVolunteer: volunteerName,
          targetDestination: destination,
          statusUpdates: [
            ...item.statusUpdates,
            {
              status: 'claimed',
              timestamp: 'Just now',
              note: `Rescue accepted by ${ngoName}. Assigned responder: ${volunteerName}.`,
              updatedBy: ngoName
            }
          ]
        };
        return updated;
      }
      return item;
    }));

    const targetDonation = donations.find(d => d.id === donationId);
    const newActivity = {
      id: `act-${Date.now()}`,
      actorName: ngoName,
      actorType: 'ngo',
      actionText: `accepted rescue mission from`,
      foodTitle: targetDonation ? targetDonation.title : 'Food Rescue',
      quantity: targetDonation ? `${targetDonation.servings} meals` : 'Meals',
      timestamp: 'Just now',
      status: 'claimed'
    };
    setLiveActivities(prev => [newActivity, ...prev]);

    showToast(
      '🚀 Rescue Mission Claimed!',
      `${ngoName} has taken responsibility for this donation. Route assigned to ${volunteerName}.`,
      'success'
    );
  };

  const updateDonationStatus = (donationId, newStatus, note) => {
    let finalItem = null;

    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        const statusNote = note || (
          newStatus === 'pickup_started' ? 'Volunteer is on the way to provider location' :
          newStatus === 'collected' ? 'Food quality verified & safely collected in thermal containers' :
          newStatus === 'delivered' ? `Successfully delivered to ${item.targetDestination || 'Community Shelter'}` :
          'Status updated'
        );

        const updated = {
          ...item,
          status: newStatus,
          statusUpdates: [
            ...item.statusUpdates,
            {
              status: newStatus,
              timestamp: 'Just now',
              note: statusNote,
              updatedBy: currentUser.name
            }
          ]
        };
        finalItem = updated;
        return updated;
      }
      return item;
    }));

    if (newStatus === 'delivered') {
      triggerCelebration();
      showToast(
        '❤️ Food Rescued & Delivered!',
        'Every meal makes a life-changing difference. Thank you for your impact!',
        'success'
      );

      // Increase points for leaderboards
      setLeaderboards(prev => ({
        ...prev,
        ngos: prev.ngos.map(n => n.name.includes('Asha') ? { ...n, mealsRescued: n.mealsRescued + 60, points: n.points + 50 } : n),
        restaurants: prev.restaurants.map(r => r.name.includes('GreenLeaf') ? { ...r, mealsRescued: r.mealsRescued + 60, points: r.points + 40 } : r)
      }));
    } else {
      showToast(
        `Mission Status: ${newStatus.replace('_', ' ').toUpperCase()}`,
        note || 'Updated rescue tracking in real-time',
        'info'
      );
    }

    if (finalItem) {
      const newActivity = {
        id: `act-${Date.now()}`,
        actorName: currentUser.name,
        actorType: currentUser.role,
        actionText: newStatus === 'collected' ? 'collected food from provider' :
                    newStatus === 'delivered' ? 'successfully delivered food to shelter' :
                    'updated transit status',
        foodTitle: finalItem.title,
        quantity: `${finalItem.servings} meals`,
        timestamp: 'Just now',
        status: newStatus
      };
      setLiveActivities(prev => [newActivity, ...prev]);
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        donations,
        addDonation,
        claimDonation,
        updateDonationStatus,
        ngos,
        volunteers,
        leaderboards,
        liveActivities,
        activeTab,
        setActiveTab,
        isDonateModalOpen,
        setIsDonateModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        selectedRescueForMission,
        setSelectedRescueForMission,
        toasts,
        showToast,
        removeToast,
        triggerCelebration
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
