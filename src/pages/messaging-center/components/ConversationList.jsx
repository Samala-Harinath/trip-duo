import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConversationList = ({ 
  conversations, 
  activeConversationId, 
  onConversationSelect, 
  searchQuery, 
  onSearchChange 
}) => {
  const filteredConversations = conversations?.filter(conv =>
    conv?.participant?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    conv?.lastMessage?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return messageTime?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="h-full flex flex-col bg-surface border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3">Messages</h2>
        
        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No conversations</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'No conversations match your search.' : 'Start connecting with travel partners!'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations?.map((conversation) => (
              <div
                key={conversation?.id}
                onClick={() => onConversationSelect(conversation?.id)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-smooth hover:bg-muted ${
                  activeConversationId === conversation?.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0 mr-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={conversation?.participant?.avatar}
                      alt={conversation?.participant?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conversation?.participant?.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {conversation?.participant?.name}
                    </h4>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {formatTime(conversation?.lastMessage?.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation?.lastMessage?.type === 'image' ? (
                        <span className="flex items-center">
                          <Icon name="Image" size={14} className="mr-1" />
                          Photo
                        </span>
                      ) : conversation?.lastMessage?.type === 'location' ? (
                        <span className="flex items-center">
                          <Icon name="MapPin" size={14} className="mr-1" />
                          Location
                        </span>
                      ) : (
                        conversation?.lastMessage?.content
                      )}
                    </p>
                    
                    {conversation?.unreadCount > 0 && (
                      <div className="flex-shrink-0 ml-2">
                        <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation?.unreadCount > 99 ? '99+' : conversation?.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;