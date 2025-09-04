import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PartnerCard = ({ partner, onSendInvitation, onStartChat, onBookmark, onReport }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(partner?.isBookmarked || false);
  // const [isHovered, setIsHovered] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(partner?.id, !isBookmarked);
  };

  const getCompatibilityColor = (score) => {
    if (score >= 85) return 'text-success bg-success/10';
    if (score >= 70) return 'text-warning bg-warning/10';
    return 'text-muted-foreground bg-muted';
  };

  const getActivityIcon = (activity) => {
    const icons = {
      'adventure': 'Mountain',
      'cultural': 'Camera',
      'relaxation': 'Waves',
      'nightlife': 'Music',
      'food': 'UtensilsCrossed',
      'photography': 'Camera',
      'wellness': 'Heart',
      'shopping': 'ShoppingBag'
    };
    return icons?.[activity] || 'MapPin';
  };

  return (
    <div 
      className="bg-surface border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={partner?.profileImage}
          alt={`${partner?.name}'s profile`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isBookmarked 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
          >
            <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
          </button>
          <button
            onClick={() => onReport(partner?.id)}
            className="p-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-all"
          >
            <Icon name="Flag" size={16} />
          </button>
        </div>

        {/* Online Status */}
        {partner?.isOnline && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
              <div className="w-2 h-2 bg-success-foreground rounded-full mr-1 animate-pulse"></div>
              Online
            </div>
          </div>
        )}

        {/* Compatibility Score */}
        <div className="absolute bottom-3 left-3">
          <div className={`px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm ${getCompatibilityColor(partner?.compatibilityScore)}`}>
            {partner?.compatibilityScore}% Match
          </div>
        </div>

        {/* Additional Photos Indicator */}
        {partner?.additionalPhotos && partner?.additionalPhotos?.length > 0 && (
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center bg-black/40 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
              <Icon name="Images" size={12} className="mr-1" />
              +{partner?.additionalPhotos?.length}
            </div>
          </div>
        )}
      </div>
      {/* Profile Information */}
      <div className="p-4">
        {/* Basic Info */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {partner?.name}, {partner?.age}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} className="mr-1" />
              {partner?.location}
            </div>
          </div>
          {partner?.isVerified && (
            <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              <Icon name="BadgeCheck" size={12} className="mr-1" />
              Verified
            </div>
          )}
        </div>

        {/* Travel Preferences */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Icon name="Plane" size={14} className="mr-1 text-primary" />
            <span className="text-sm font-medium text-foreground">Next Trip</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{partner?.nextDestination}</p>
          <p className="text-xs text-muted-foreground">{partner?.travelDates}</p>
        </div>

        {/* Activity Interests */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {partner?.interests?.slice(0, 3)?.map((interest, index) => (
              <div key={index} className="flex items-center bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                <Icon name={getActivityIcon(interest)} size={12} className="mr-1" />
                {interest}
              </div>
            ))}
            {partner?.interests?.length > 3 && (
              <div className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                +{partner?.interests?.length - 3} more
              </div>
            )}
          </div>
        </div>

        {/* Travel Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center">
            <Icon name="Globe" size={12} className="mr-1" />
            {partner?.countriesVisited} countries
          </div>
          <div className="flex items-center">
            <Icon name="Star" size={12} className="mr-1" />
            {partner?.rating} ({partner?.reviewCount} reviews)
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/user-profile/${partner?.id}`)}
            iconName="User"
            iconPosition="left"
            className="flex-1"
          >
            View Profile
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSendInvitation(partner?.id)}
            iconName="Send"
            iconPosition="left"
            className="flex-1"
          >
            Invite
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onStartChat(partner?.id)}
            iconName="MessageCircle"
            iconSize={16}
          >
          </Button>
        </div>
      </div>
      {/* Expanded View on Hover (Desktop Only) */}
      {/* {isHovered && partner?.additionalPhotos && partner?.additionalPhotos?.length > 0 && (
        <div className="hidden lg:block absolute inset-0 bg-surface border border-border rounded-lg shadow-elevated z-10 overflow-hidden">
          <div className="grid grid-cols-2 h-full">
            <div className="relative">
              <Image
                src={partner?.profileImage}
                alt={`${partner?.name}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 overflow-y-auto">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {partner?.name}, {partner?.age}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{partner?.bio}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Travel Style</h4>
                  <p className="text-xs text-muted-foreground">{partner?.travelStyle}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Languages</h4>
                  <p className="text-xs text-muted-foreground">{partner?.languages?.join(', ')}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Recent Trips</h4>
                  <div className="space-y-1">
                    {partner?.recentTrips?.slice(0, 2)?.map((trip, index) => (
                      <p key={index} className="text-xs text-muted-foreground">{trip}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PartnerCard;