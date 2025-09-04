import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchCard from './components/MatchCard';
import TripCard from './components/TripCard';
import QuickActions from './components/QuickActions';
import PreferencesWidget from './components/PreferencesWidget';
import ActivityFeed from './components/ActivityFeed';
import StatsOverview from './components/StatsOverview';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentUser] = useState({
    name: "Harinath Samala",
    age: 28,
    location: "New York, NY"
  });

  // Mock data for potential matches
  const [matches] = useState([
    {
      id: 1,
      name: "Saurabh khondekar",
      age: 32,
      location: "Mumbai, Maharashtra",
      photo: "https://media.licdn.com/dms/image/v2/C5603AQHOnhkM_FVEiw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1609942655511?e=1759968000&v=beta&t=z3o2D2I429rsIo6l9Z5kEBkCsaDXhK-X9ixqy7sHc0o",
      destination: "Tokyo, Japan",
      travelDates: "Dec 15-25, 2024",
      compatibilityScore: 87,
      interests: ["Photography", "Food Tours", "Museums", "Nightlife", "Shopping"]
    },
    {
      id: 2,
      name: "Aditya Pandita",
      age: 29,
      location: "Pune, Maharastra",
      photo: "https://media.licdn.com/dms/image/v2/D5603AQFhgD0HkU-Rzg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1687009278554?e=1759968000&v=beta&t=U7GAXRCWAkSZFwzjKIJc5XfqVUdM_QsNQzipvkfUOjA",
      destination: "Paris, France",
      travelDates: "Jan 10-20, 2025",
      compatibilityScore: 92,
      interests: ["Art Galleries", "Wine Tasting", "Walking Tours", "Architecture"]
    },
    // {
    //   id: 3,
    //   name: "James Wilson",
    //   age: 35,
    //   location: "Chicago, IL",
    //   photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    //   destination: "Bali, Indonesia",
    //   travelDates: "Feb 5-15, 2025",
    //   compatibilityScore: 78,
    //   interests: ["Beach Activities", "Yoga", "Local Cuisine", "Adventure Sports"]
    // },
    // {
    //   id: 4,
    //   name: "Alex Thompson",
    //   age: 31,
    //   location: "Seattle, WA",
    //   photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
    //   destination: "Iceland",
    //   travelDates: "Mar 1-10, 2025",
    //   compatibilityScore: 85,
    //   interests: ["Hiking", "Photography", "Northern Lights", "Hot Springs"]
    // }
  ]);

  // Mock data for upcoming trips
  const [trips] = useState([
    {
      id: 1,
      destination: "Tokyo, Japan",
      startDate: "2024-12-15",
      endDate: "2024-12-25",
      status: "confirmed",
      budget: 3500,
      companion: "Michael Rodriguez",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      destination: "Paris, France",
      startDate: "2025-01-10",
      endDate: "2025-01-20",
      status: "pending",
      budget: 2800,
      companion: null,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      destination: "Santorini, Greece",
      startDate: "2025-04-15",
      endDate: "2025-04-25",
      status: "planning",
      budget: 2200,
      companion: null,
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=200&fit=crop"
    }
  ]);

  // Mock data for user preferences
  const [preferences] = useState({
    destinations: ["Europe", "Asia", "Mediterranean", "Caribbean"],
    budgetRange: { min: 2000, max: 5000 },
    activities: ["Photography", "Food Tours", "Museums", "Beach Activities", "Adventure Sports"]
  });

  // Mock data for recent activities
  const [activities] = useState([
    {
      id: 1,
      type: "new_match",
      userName: "Michael Rodriguez",
      userPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      message: "liked your profile",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: "profile_view",
      userName: "David Chen",
      userPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      message: "viewed your profile",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 3,
      type: "trip_update",
      userName: "System",
      userPhoto: null,
      message: "Your Tokyo trip has been confirmed",
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 4,
      type: "message",
      userName: "Alex Thompson",
      userPhoto: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
      message: "sent you a message",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 5,
      type: "invitation",
      userName: "James Wilson",
      userPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      message: "invited you to join their Bali trip",
      timestamp: new Date(Date.now() - 7200000)
    }
  ]);

  // Mock data for stats
  const [stats] = useState({
    profileViews: 127,
    profileViewsChange: 15,
    newMatches: 8,
    newMatchesChange: 25,
    activeTrips: 3,
    activeTripsChange: 0,
    messages: 24,
    messagesChange: -8
  });

  const [messageCount] = useState(5);

  // Navigation handlers
  const handleCreateTrip = () => {
    navigate('/trip-planning');
  };

  const handleSearchDestinations = () => {
    navigate('/travel-partner-discovery');
  };

  const handleViewMessages = () => {
    navigate('/messaging-center');
  };

  const handleEditPreferences = () => {
    navigate('/user-profile-management');
  };

  // Match interaction handlers
  const handleViewProfile = (matchId) => {
    // This function can remain empty since the modal is handled in MatchCard
    // Or you can use it for analytics/tracking if needed
    console.log('Viewing profile:', matchId);
  };

  const handleLikeMatch = (matchId) => {
    console.log('Liked match:', matchId);
    // In a real app, this would send a like to the backend
  };

  const handlePassMatch = (matchId) => {
    console.log('Passed on match:', matchId);
    // In a real app, this would record the pass in the backend
  };

  // Trip interaction handlers
  const handleViewTripDetails = (tripId) => {
    console.log('Viewing trip details:', tripId);
    navigate('/trip-planning');
  };

  const handleManageTrip = (tripId) => {
    console.log('Managing trip:', tripId);
    navigate('/trip-planning');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Discover your next travel companion and plan amazing adventures together.
          </p>
        </div>

        {/* Stats Overview */}
        <StatsOverview stats={stats} />

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions 
            onCreateTrip={handleCreateTrip}
            onSearchDestinations={handleSearchDestinations}
            onViewMessages={handleViewMessages}
            messageCount={messageCount}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Matches Feed */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Potential Travel Matches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matches?.map((match) => (
                  <MatchCard
                    key={match?.id}
                    match={match}
                    onViewProfile={handleViewProfile}
                    onLike={handleLikeMatch}
                    onPass={handlePassMatch}
                  />
                ))}
              </div>
            </div>

            {/* Upcoming Trips */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Trips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trips?.map((trip) => (
                  <TripCard
                    key={trip?.id}
                    trip={trip}
                    onViewDetails={handleViewTripDetails}
                    onManageTrip={handleManageTrip}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Travel Preferences */}
            <PreferencesWidget 
              preferences={preferences}
              onEditPreferences={handleEditPreferences}
            />

            {/* Activity Feed */}
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;