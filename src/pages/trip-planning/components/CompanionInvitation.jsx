import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CompanionInvitation = ({ 
  suggestedCompanions = [], 
  invitedCompanions = [], 
  onInviteCompanion,
  onRemoveInvite,
  tripVisibility = 'private',
  onVisibilityChange 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');

  // Mock suggested companions data
  const mockSuggestedCompanions = [
    {
      id: 1,
      name: "Harinath Samala",
      age: 28,
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      compatibilityScore: 92,
      commonInterests: ["Adventure", "Photography", "Cultural Tours"],
      travelExperience: "15 countries",
      languages: ["English", "Spanish"],
      verified: true,
      lastActive: "2 hours ago",
      bio: "Adventure seeker and culture enthusiast. Love exploring new places and meeting new people!"
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      age: 32,
      location: "Los Angeles, CA",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      compatibilityScore: 88,
      commonInterests: ["Food Tours", "Museums", "Hiking"],
      travelExperience: "22 countries",
      languages: ["English", "French", "Italian"],
      verified: true,
      lastActive: "1 day ago",
      bio: "Foodie and history buff. Always ready for the next adventure with great company."
    },
    {
      id: 3,
      name: "Jessica Chen",
      age: 26,
      location: "San Francisco, CA",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      compatibilityScore: 85,
      commonInterests: ["Beach", "Yoga", "Local Markets"],
      travelExperience: "8 countries",
      languages: ["English", "Mandarin"],
      verified: false,
      lastActive: "3 hours ago",
      bio: "Wellness enthusiast who loves peaceful destinations and authentic local experiences."
    },
    {
      id: 4,
      name: "Amanda Wilson",
      age: 30,
      location: "Chicago, IL",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      compatibilityScore: 90,
      commonInterests: ["Nightlife", "Shopping", "Fine Dining"],
      travelExperience: "18 countries",
      languages: ["English", "German"],
      verified: true,
      lastActive: "5 minutes ago",
      bio: "Love luxury travel and vibrant city life. Looking for someone to share amazing experiences!"
    }
  ];

  const visibilityOptions = [
    { value: 'private', label: 'Private', description: 'Only invited companions can see this trip' },
    { value: 'public', label: 'Public', description: 'Anyone can discover and request to join' },
    { value: 'friends', label: 'Friends Only', description: 'Only your connections can see this trip' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Matches' },
    { value: 'high-compatibility', label: 'High Compatibility (85%+)' },
    { value: 'verified', label: 'Verified Users Only' },
    { value: 'recent', label: 'Recently Active' }
  ];

  const filteredCompanions = mockSuggestedCompanions?.filter(companion => {
    const matchesSearch = companion?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         companion?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    let matchesFilter = true;
    switch (filterCriteria) {
      case 'high-compatibility':
        matchesFilter = companion?.compatibilityScore >= 85;
        break;
      case 'verified':
        matchesFilter = companion?.verified;
        break;
      case 'recent':
        matchesFilter = companion?.lastActive?.includes('hour') || companion?.lastActive?.includes('minute');
        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter && !invitedCompanions?.includes(companion?.id);
  });

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getCompatibilityBg = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 80) return 'bg-primary/10';
    if (score >= 70) return 'bg-warning/10';
    return 'bg-muted/10';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Users" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Find Travel Companions</h2>
          <p className="text-sm text-muted-foreground">
            Invite compatible travelers to join your adventure
          </p>
        </div>
      </div>
      {/* Trip Visibility Settings */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-card-foreground">Trip Visibility</h3>
          <Icon name="Eye" size={16} color="var(--color-muted-foreground)" />
        </div>
        <Select
          placeholder="Choose visibility setting"
          options={visibilityOptions}
          value={tripVisibility}
          onChange={onVisibilityChange}
        />
      </div>
      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          iconName="Search"
        />
        <Select
          placeholder="Filter matches"
          options={filterOptions}
          value={filterCriteria}
          onChange={setFilterCriteria}
        />
      </div>
      {/* Invited Companions */}
      {invitedCompanions?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-card-foreground mb-3 flex items-center">
            <Icon name="UserCheck" size={16} className="mr-2" />
            Invited Companions ({invitedCompanions?.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {invitedCompanions?.map(companionId => {
              const companion = mockSuggestedCompanions?.find(c => c?.id === companionId);
              return companion ? (
                <div key={companionId} className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                  <Image 
                    src={companion?.avatar} 
                    alt={companion?.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium">{companion?.name}</span>
                  <button
                    onClick={() => onRemoveInvite(companionId)}
                    className="hover:bg-primary/20 rounded-full p-1"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
      {/* Suggested Companions */}
      <div>
        <h3 className="font-medium text-card-foreground mb-4 flex items-center justify-between">
          <span className="flex items-center">
            <Icon name="Sparkles" size={16} className="mr-2" />
            Suggested Matches ({filteredCompanions?.length})
          </span>
          {filteredCompanions?.length > 0 && (
            <span className="text-xs text-muted-foreground">
              Based on your trip preferences
            </span>
          )}
        </h3>

        {filteredCompanions?.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h4 className="text-lg font-medium text-card-foreground mb-2">No matches found</h4>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or trip preferences
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCompanions?.map((companion) => (
              <div key={companion?.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image 
                        src={companion?.avatar} 
                        alt={companion?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {companion?.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                          <Icon name="Check" size={12} color="white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-card-foreground">{companion?.name}</h4>
                      <p className="text-sm text-muted-foreground">{companion?.age} • {companion?.location}</p>
                      <p className="text-xs text-muted-foreground">{companion?.lastActive}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full ${getCompatibilityBg(companion?.compatibilityScore)}`}>
                    <span className={`text-xs font-medium ${getCompatibilityColor(companion?.compatibilityScore)}`}>
                      {companion?.compatibilityScore}% match
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {companion?.bio}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {companion?.travelExperience}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="Globe" size={12} className="mr-1" />
                    {companion?.languages?.join(', ')}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {companion?.commonInterests?.slice(0, 3)?.map((interest, index) => (
                    <span key={index} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                      {interest}
                    </span>
                  ))}
                  {companion?.commonInterests?.length > 3 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{companion?.commonInterests?.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onInviteCompanion(companion?.id)}
                    iconName="UserPlus"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Invite
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageCircle"
                  >
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanionInvitation;