import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchUserData = async () => {
      try {
        // Simulated API call
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <Icon name="Loader2" size={24} className="text-primary" />
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Icon name="UserX" size={48} className="text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">User Not Found</h2>
        <p className="text-muted-foreground">The user profile you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-soft mb-8">
        <div className="relative h-48 md:h-64 bg-muted">
          <Image
            src={userData.coverImage || '/default-cover.jpg'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-20">
            <div className="relative">
              <Image
                src={userData.profileImage}
                alt={userData.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-surface object-cover"
              />
              {userData.isOnline && (
                <div className="absolute bottom-2 right-2">
                  <div className="w-4 h-4 bg-success rounded-full border-2 border-surface" />
                </div>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {userData.name}, {userData.age}
                  </h1>
                  <div className="flex items-center mt-1 text-muted-foreground">
                    <Icon name="MapPin" size={16} className="mr-1" />
                    {userData.location}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Button
                    variant="primary"
                    onClick={() => {}} // TODO: Implement send invitation
                    iconName="Send"
                    iconPosition="left"
                  >
                    Send Invitation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {}} // TODO: Implement start chat
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - About & Stats */}
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p className="text-muted-foreground">{userData.bio}</p>
          </div>

          {/* Travel Stats */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Travel Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon name="Globe" size={16} className="mr-2 text-primary" />
                  <span>Countries Visited</span>
                </div>
                <span className="font-semibold">{userData.countriesVisited}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon name="Star" size={16} className="mr-2 text-primary" />
                  <span>Rating</span>
                </div>
                <span className="font-semibold">{userData.rating} ({userData.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon name="Users" size={16} className="mr-2 text-primary" />
                  <span>Travel Partners</span>
                </div>
                <span className="font-semibold">{userData.partnerCount || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - Travel Preferences & Interests */}
        <div className="space-y-6">
          {/* Travel Preferences */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Travel Preferences</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Next Destination</h3>
                <div className="flex items-center text-muted-foreground">
                  <Icon name="Plane" size={16} className="mr-2 text-primary" />
                  {userData.nextDestination}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {userData.travelDates}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Travel Style</h3>
                <p className="text-muted-foreground">{userData.travelStyle}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.languages?.map((language, index) => (
                    <div
                      key={index}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {userData.interests?.map((interest, index) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Photos & Recent Trips */}
        <div className="space-y-6">
          {/* Photos */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Photos</h2>
            <div className="grid grid-cols-2 gap-2">
              {[userData.profileImage, ...(userData.additionalPhotos || [])]
                .slice(0, 4)
                .map((photo, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={photo}
                      alt={`Travel photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Trips */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Trips</h2>
            <div className="space-y-4">
              {userData.recentTrips?.map((trip, index) => (
                <div key={index} className="text-muted-foreground">
                  {trip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
