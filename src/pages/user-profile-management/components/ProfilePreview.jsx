import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePreview = ({ profileData, isVisible, onClose }) => {
  if (!isVisible) return null;

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today?.getFullYear() - birth?.getFullYear();
    const monthDiff = today?.getMonth() - birth?.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birth?.getDate())) {
      age--;
    }
    return age;
  };

  const compatibilityScore = 92; // Mock compatibility score

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Profile Preview</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          {/* Profile Photos */}
          <div className="relative mb-6">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
              {profileData?.photos && profileData?.photos?.length > 0 ? (
                <Image
                  src={profileData?.photos?.[0]?.url}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={48} className="text-muted-foreground" />
                </div>
              )}
            </div>
            
            {profileData?.photos && profileData?.photos?.length > 1 && (
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                1/{profileData?.photos?.length}
              </div>
            )}
            
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full font-medium">
              {compatibilityScore}% Match
            </div>
          </div>

          {/* Basic Info */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-2xl font-bold text-foreground">
                {profileData?.firstName} {profileData?.lastName}
              </h2>
              <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-muted-foreground mb-3">
              <span className="flex items-center">
                <Icon name="MapPin" size={16} className="mr-1" />
                {profileData?.city}
              </span>
              <span className="flex items-center">
                <Icon name="Calendar" size={16} className="mr-1" />
                {profileData?.age} years old
              </span>
            </div>

            <p className="text-foreground leading-relaxed">
              {profileData?.bio || "No bio available"}
            </p>
          </div>

          {/* Travel Preferences */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">Travel Style</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {profileData?.preferences?.travelStyle?.map((style, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {style?.replace('_', ' ')}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Budget:</span>
                <p className="font-medium text-foreground capitalize">
                  {profileData?.preferences?.budget?.replace('_', ' ')}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Frequency:</span>
                <p className="font-medium text-foreground">
                  {profileData?.preferences?.frequency} trips/year
                </p>
              </div>
            </div>
          </div>

          {/* Languages */}
          {profileData?.languages && profileData?.languages?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {profileData?.languages?.map((language, index) => (
                  <span
                    key={index}
                    className="bg-muted text-foreground px-3 py-1 rounded-full text-sm capitalize"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {profileData?.preferences?.activities && profileData?.preferences?.activities?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profileData?.preferences?.activities?.slice(0, 6)?.map((activity, index) => (
                  <span
                    key={index}
                    className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                  >
                    {activity?.replace('_', ' ')}
                  </span>
                ))}
                {profileData?.preferences?.activities?.length > 6 && (
                  <span className="text-muted-foreground text-sm px-3 py-1">
                    +{profileData?.preferences?.activities?.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-border">
            <Button variant="outline" fullWidth>
              <Icon name="X" size={16} className="mr-2" />
              Pass
            </Button>
            <Button fullWidth>
              <Icon name="Heart" size={16} className="mr-2" />
              Like
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;