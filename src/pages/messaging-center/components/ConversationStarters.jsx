import React from 'react';
import Icon from '../../../components/AppIcon';


const ConversationStarters = ({ onStarterSelect, participant }) => {
  const conversationStarters = [
    {
      id: 1,
      icon: "MapPin",
      title: "Travel Destinations",
      message: `Hi ${participant?.name || 'there'}! I noticed we're both interested in similar destinations. What's your dream travel spot?`
    },
    {
      id: 2,
      icon: "Calendar",
      title: "Travel Dates",
      message: `Hey! I'm planning a trip and saw your travel dates align with mine. When are you thinking of traveling?`
    },
    {
      id: 3,
      icon: "Camera",
      title: "Travel Style",
      message: `Hi! I love your travel photos. What kind of travel experiences do you enjoy most - adventure, relaxation, or cultural exploration?`
    },
    {
      id: 4,
      icon: "Users",
      title: "Group Travel",
      message: `Hello! I'm looking for a travel companion for an upcoming trip. Would you be interested in planning something together?`
    },
    {
      id: 5,
      icon: "Plane",
      title: "Travel Experience",
      message: `Hi there! I see you're an experienced traveler. Any recommendations for must-visit places or travel tips?`
    },
    {
      id: 6,
      icon: "Heart",
      title: "Shared Interests",
      message: `Hey! I noticed we have similar travel interests. What draws you most to exploring new places?`
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-6 text-center border-b border-border">
        <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Start a Conversation</h3>
        <p className="text-muted-foreground">
          Break the ice with these travel-focused conversation starters
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4 max-w-md mx-auto">
          {conversationStarters?.map((starter) => (
            <div
              key={starter?.id}
              className="bg-surface border border-border rounded-lg p-4 hover:shadow-soft transition-smooth cursor-pointer"
              onClick={() => onStarterSelect(starter?.message)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={starter?.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{starter?.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {starter?.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="Shield" size={24} className="text-success mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Safety First:</strong> Keep conversations respectful and report any inappropriate behavior.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationStarters;