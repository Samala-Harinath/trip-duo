import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import FilterPanel from './components/FilterPanel';
import SearchHeader from './components/SearchHeader';
import PartnerCard from './components/PartnerCard';
import EmptyState from './components/EmptyState';
import LoadingGrid from './components/LoadingGrid';

const TravelPartnerDiscovery = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('compatibility');
  const [filters, setFilters] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    activities: '',
    minAge: '',
    maxAge: ''
  });

  // Mock data for travel partners
  const mockPartners = [
    {
      id: 1,
      name: "Harinath Samala",
      age: 28,
      location: "New York, USA",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      compatibilityScore: 92,
      isOnline: true,
      isVerified: true,
      isBookmarked: false,
      nextDestination: "Paris, France",
      travelDates: "Dec 15-22, 2024",
      interests: ["cultural", "food", "photography"],
      countriesVisited: 15,
      rating: 4.8,
      reviewCount: 23,
      bio: `Adventure-loving photographer who enjoys exploring historical sites and trying local cuisines. Looking for a travel companion to share amazing experiences and create lasting memories.`,
      travelStyle: "Mid-range explorer with focus on authentic experiences",
      languages: ["English", "Spanish", "French"],
      recentTrips: ["Barcelona, Spain (Oct 2024)", "Tokyo, Japan (Aug 2024)"],
      additionalPhotos: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 32,
      location: "San Francisco, USA",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      compatibilityScore: 87,
      isOnline: false,
      isVerified: true,
      isBookmarked: true,
      nextDestination: "Bali, Indonesia",
      travelDates: "Jan 10-20, 2025",
      interests: ["adventure", "wellness", "photography"],
      countriesVisited: 22,
      rating: 4.9,
      reviewCount: 31,
      bio: `Tech professional who loves adventure sports and wellness retreats. Seeking a travel partner for exciting outdoor activities and relaxation.`,
      travelStyle: "Adventure seeker with luxury comfort preferences",
      languages: ["English", "Mandarin"],
      recentTrips: ["Iceland (Sep 2024)", "New Zealand (Jul 2024)"],
      additionalPhotos: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
      ]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      age: 26,
      location: "Miami, USA",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      compatibilityScore: 84,
      isOnline: true,
      isVerified: false,
      isBookmarked: false,
      nextDestination: "Santorini, Greece",
      travelDates: "May 5-15, 2025",
      interests: ["relaxation", "nightlife", "cultural"],
      countriesVisited: 8,
      rating: 4.6,
      reviewCount: 12,
      bio: `Beach lover and culture enthusiast looking for someone to explore Mediterranean destinations and enjoy sunset views.`,
      travelStyle: "Relaxed traveler with appreciation for local culture",
      languages: ["English", "Spanish"],
      recentTrips: ["Cabo, Mexico (Nov 2024)", "Costa Rica (Sep 2024)"],
      additionalPhotos: []
    },
    {
      id: 4,
      name: "David Kim",
      age: 35,
      location: "Seattle, USA",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      compatibilityScore: 79,
      isOnline: false,
      isVerified: true,
      isBookmarked: false,
      nextDestination: "Tokyo, Japan",
      travelDates: "Mar 20-30, 2025",
      interests: ["food", "cultural", "shopping"],
      countriesVisited: 18,
      rating: 4.7,
      reviewCount: 28,
      bio: `Food enthusiast and culture lover seeking a travel companion to explore Asian cuisines and traditional markets.`,
      travelStyle: "Culinary explorer with cultural immersion focus",
      languages: ["English", "Korean", "Japanese"],
      recentTrips: ["Seoul, Korea (Oct 2024)", "Vietnam (Aug 2024)"],
      additionalPhotos: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      ]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      age: 29,
      location: "Austin, USA",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      compatibilityScore: 76,
      isOnline: true,
      isVerified: true,
      isBookmarked: false,
      nextDestination: "Machu Picchu, Peru",
      travelDates: "Apr 12-22, 2025",
      interests: ["adventure", "cultural", "photography"],
      countriesVisited: 12,
      rating: 4.5,
      reviewCount: 19,
      bio: `Adventure photographer passionate about ancient civilizations and hiking. Looking for an adventurous travel partner.`,
      travelStyle: "Adventure-focused with historical interest",
      languages: ["English", "Portuguese"],
      recentTrips: ["Ecuador (Nov 2024)", "Bolivia (Sep 2024)"],
      additionalPhotos: []
    },
    {
      id: 6,
      name: "James Wilson",
      age: 31,
      location: "Chicago, USA",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      compatibilityScore: 73,
      isOnline: false,
      isVerified: false,
      isBookmarked: false,
      nextDestination: "Marrakech, Morocco",
      travelDates: "Feb 8-18, 2025",
      interests: ["cultural", "adventure", "food"],
      countriesVisited: 14,
      rating: 4.4,
      reviewCount: 16,
      bio: `Cultural explorer interested in Middle Eastern and North African destinations. Seeking authentic travel experiences.`,
      travelStyle: "Cultural immersion with moderate adventure",
      languages: ["English", "Arabic"],
      recentTrips: ["Egypt (Oct 2024)", "Jordan (Aug 2024)"],
      additionalPhotos: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
      ]
    }
  ];

  // Filter and search logic
  const filteredPartners = useMemo(() => {
    let result = [...mockPartners];

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      result = result?.filter(partner => 
        partner?.name?.toLowerCase()?.includes(query) ||
        partner?.location?.toLowerCase()?.includes(query) ||
        partner?.nextDestination?.toLowerCase()?.includes(query) ||
        partner?.interests?.some(interest => interest?.toLowerCase()?.includes(query))
      );
    }

    // Apply filters
    if (filters?.destination) {
      result = result?.filter(partner => 
        partner?.nextDestination?.toLowerCase()?.includes(filters?.destination?.toLowerCase())
      );
    }

    if (filters?.budget) {
      // Mock budget filtering logic
      result = result?.filter(partner => {
        if (filters?.budget === 'budget') return partner?.compatibilityScore < 80;
        if (filters?.budget === 'mid-range') return partner?.compatibilityScore >= 80 && partner?.compatibilityScore < 90;
        if (filters?.budget === 'luxury') return partner?.compatibilityScore >= 90;
        return true;
      });
    }

    if (filters?.activities) {
      result = result?.filter(partner => 
        partner?.interests?.includes(filters?.activities)
      );
    }

    if (filters?.minAge) {
      result = result?.filter(partner => partner?.age >= parseInt(filters?.minAge));
    }

    if (filters?.maxAge) {
      result = result?.filter(partner => partner?.age <= parseInt(filters?.maxAge));
    }

    // Apply sorting
    switch (sortBy) {
      case 'compatibility':
        result?.sort((a, b) => b?.compatibilityScore - a?.compatibilityScore);
        break;
      case 'recent':
        result?.sort((a, b) => b?.isOnline - a?.isOnline);
        break;
      case 'rating':
        result?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'age-asc':
        result?.sort((a, b) => a?.age - b?.age);
        break;
      case 'age-desc':
        result?.sort((a, b) => b?.age - a?.age);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      destination: '',
      startDate: '',
      endDate: '',
      budget: '',
      activities: '',
      minAge: '',
      maxAge: ''
    });
    setSearchQuery('');
  };

  const handleViewProfile = (partnerId) => {
    navigate(`/user-profile-management?id=${partnerId}`);
  };

  const handleSendInvitation = (partnerId) => {
    navigate(`/trip-planning?invite=${partnerId}`);
  };

  const handleStartChat = (partnerId) => {
    navigate(`/messaging-center?chat=${partnerId}`);
  };

  const handleBookmark = (partnerId, isBookmarked) => {
    console.log(`${isBookmarked ? 'Bookmarked' : 'Unbookmarked'} partner:`, partnerId);
  };

  const handleReport = (partnerId) => {
    console.log('Reported partner:', partnerId);
  };

  const handleBrowseAll = () => {
    handleClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '') || searchQuery?.trim() !== '';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Discover Travel Partners</h1>
              <p className="text-muted-foreground mt-1">
                Find compatible opposite-gender companions for your next adventure
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Users" size={16} className="mr-2" />
                <span>{filteredPartners?.length} partners available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              matchCount={filteredPartners?.length}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Search Header */}
            <SearchHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Results */}
            {isLoading ? (
              <LoadingGrid />
            ) : filteredPartners?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPartners?.map((partner) => (
                  <PartnerCard
                    key={partner?.id}
                    partner={partner}
                    onViewProfile={handleViewProfile}
                    onSendInvitation={handleSendInvitation}
                    onStartChat={handleStartChat}
                    onBookmark={handleBookmark}
                    onReport={handleReport}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                hasFilters={hasActiveFilters}
                onClearFilters={handleClearFilters}
                onBrowseAll={handleBrowseAll}
              />
            )}
          </div>
        </div>
      </div>
      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default TravelPartnerDiscovery;