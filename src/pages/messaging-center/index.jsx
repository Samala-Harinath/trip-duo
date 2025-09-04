import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import ConversationStarters from './components/ConversationStarters';
import SafetyPanel from './components/SafetyPanel';
import MessagingHeader from './components/MessagingHeader';

const MessagingCenter = () => {
  const navigate = useNavigate();
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSafetyPanel, setShowSafetyPanel] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const currentUserId = 'user-1';

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      participant: {
        id: 'user-2',
        name: 'Harinath samala',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        lastSeen: new Date(Date.now() - 300000)
      },
      lastMessage: {
        id: 'msg-1',
        senderId: 'user-2',
        type: 'text',
        content: 'That sounds like an amazing trip! I would love to join you for the Italy adventure.',
        timestamp: new Date(Date.now() - 300000),
        read: true
      },
      unreadCount: 2
    },
    {
      id: 'conv-2',
      participant: {
        id: 'user-3',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: new Date(Date.now() - 3600000)
      },
      lastMessage: {
        id: 'msg-2',
        senderId: 'user-1',
        type: 'text',
        content: 'Perfect! Let me know when you have the flight details ready.',
        timestamp: new Date(Date.now() - 3600000),
        read: true
      },
      unreadCount: 0
    },
    {
      id: 'conv-3',
      participant: {
        id: 'user-4',
        name: 'Emma Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        lastSeen: new Date()
      },
      lastMessage: {
        id: 'msg-3',
        senderId: 'user-4',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        timestamp: new Date(Date.now() - 7200000),
        read: false
      },
      unreadCount: 1
    },
    {
      id: 'conv-4',
      participant: {
        id: 'user-5',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isOnline: false,
        lastSeen: new Date(Date.now() - 86400000)
      },
      lastMessage: {
        id: 'msg-4',
        senderId: 'user-5',
        type: 'location',
        content: 'Tokyo Station, Japan',
        timestamp: new Date(Date.now() - 86400000),
        read: true
      },
      unreadCount: 0
    }
  ]);

  // Mock messages data
  const [allMessages, setAllMessages] = useState({
    'conv-1': [
      {
        id: 'msg-1-1',
        senderId: 'user-1',
        type: 'text',
        content: 'Hi Harinath! I saw your profile and noticed we both love adventure travel. Are you planning any trips soon?',
        timestamp: new Date(Date.now() - 86400000),
        read: true
      },
      {
        id: 'msg-1-2',
        senderId: 'user-2',
        type: 'text',
        content: 'Hi! Yes, I am actually planning a trip to Italy next month. I love hiking and exploring historical sites.',
        timestamp: new Date(Date.now() - 82800000),
        read: true
      },
      {
        id: 'msg-1-3',
        senderId: 'user-1',
        type: 'text',
        content: 'That sounds incredible! Italy is on my bucket list. I was thinking about a 2-week trip covering Rome, Florence, and the Amalfi Coast.',
        timestamp: new Date(Date.now() - 79200000),
        read: true
      },
      {
        id: 'msg-1-4',
        senderId: 'user-2',
        type: 'text',
        content: 'That sounds like an amazing trip! I would love to join you for the Italy adventure.',
        timestamp: new Date(Date.now() - 300000),
        read: true
      }
    ],
    'conv-2': [
      {
        id: 'msg-2-1',
        senderId: 'user-3',
        type: 'text',
        content: 'Hey! I saw your message about the Japan trip. I have been there twice and can share some great recommendations.',
        timestamp: new Date(Date.now() - 172800000),
        read: true
      },
      {
        id: 'msg-2-2',
        senderId: 'user-1',
        type: 'text',
        content: 'That would be amazing! I am particularly interested in experiencing authentic Japanese culture and trying local cuisine.',
        timestamp: new Date(Date.now() - 169200000),
        read: true
      },
      {
        id: 'msg-2-3',
        senderId: 'user-1',
        type: 'text',
        content: 'Perfect! Let me know when you have the flight details ready.',
        timestamp: new Date(Date.now() - 3600000),
        read: true
      }
    ],
    'conv-3': [
      {
        id: 'msg-3-1',
        senderId: 'user-4',
        type: 'text',
        content: 'Hi! I love your travel photos from Bali. I am planning a similar trip and would love some advice!',
        timestamp: new Date(Date.now() - 259200000),
        read: true
      },
      {
        id: 'msg-3-2',
        senderId: 'user-1',
        type: 'text',
        content: 'Thank you! Bali was absolutely magical. I spent 10 days there exploring temples, beaches, and rice terraces.',
        timestamp: new Date(Date.now() - 255600000),
        read: true
      },
      {
        id: 'msg-3-3',
        senderId: 'user-4',
        type: 'image',
        content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
        timestamp: new Date(Date.now() - 7200000),
        read: false
      }
    ],
    'conv-4': [
      {
        id: 'msg-4-1',
        senderId: 'user-1',
        type: 'text',
        content: 'Hi David! I noticed you have extensive experience traveling in Asia. I am planning my first solo trip to Japan.',
        timestamp: new Date(Date.now() - 345600000),
        read: true
      },
      {
        id: 'msg-4-2',
        senderId: 'user-5',
        type: 'text',
        content: 'Japan is incredible for first-time solo travelers! Very safe and the people are extremely helpful.',
        timestamp: new Date(Date.now() - 342000000),
        read: true
      },
      {
        id: 'msg-4-3',
        senderId: 'user-5',
        type: 'location',
        content: 'Tokyo Station, Japan',
        timestamp: new Date(Date.now() - 86400000),
        read: true
      }
    ]
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeConversation = conversations?.find(conv => conv?.id === activeConversationId);
  const messages = allMessages?.[activeConversationId] || [];

  const handleConversationSelect = (conversationId) => {
    setActiveConversationId(conversationId);
    
    // Mark messages as read
    setConversations(prev => 
      prev?.map(conv => 
        conv?.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleSendMessage = (messageData) => {
    if (!activeConversationId) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      ...messageData,
      read: false
    };

    // Add message to conversation
    setAllMessages(prev => ({
      ...prev,
      [activeConversationId]: [...(prev?.[activeConversationId] || []), newMessage]
    }));

    // Update last message in conversation list
    setConversations(prev =>
      prev?.map(conv =>
        conv?.id === activeConversationId
          ? { ...conv, lastMessage: newMessage }
          : conv
      )
    );

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleStarterSelect = (message) => {
    if (activeConversation) {
      handleSendMessage({
        type: 'text',
        content: message,
        timestamp: new Date()
      });
    }
  };

  const handleReport = (reportData) => {
    console.log('User reported:', reportData);
    // Handle report submission
  };

  const handleBlock = (userId) => {
    console.log('User blocked:', userId);
    // Handle user blocking
    setConversations(prev => prev?.filter(conv => conv?.participant?.id !== userId));
    setActiveConversationId(null);
  };

  const handleBackToList = () => {
    setActiveConversationId(null);
  };

  const showConversationList = !isMobileView || !activeConversationId;
  const showChatWindow = !isMobileView || activeConversationId;

  return (
    <div className="min-h-screen bg-background">
      <MessagingHeader />
      <div className="h-[calc(100vh)] flex pt-16">
        {/* Conversation List */}
        {showConversationList && (
          <div className={`${isMobileView ? 'w-full' : 'w-80'} flex-shrink-0`}>
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onConversationSelect={handleConversationSelect}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        )}

        {/* Chat Window */}
        {showChatWindow && (
          <div className="flex-1 flex">
            {activeConversation ? (
              <div className="flex-1">
                <ChatWindow
                  conversation={activeConversation}
                  messages={messages}
                  currentUserId={currentUserId}
                  onSendMessage={handleSendMessage}
                  onBackToList={handleBackToList}
                  isTyping={isTyping}
                />
              </div>
            ) : (
              <div className="flex-1">
                <ConversationStarters
                  onStarterSelect={handleStarterSelect}
                  participant={activeConversation?.participant}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Safety Panel Modal */}
      {showSafetyPanel && selectedParticipant && (
        <SafetyPanel
          participant={selectedParticipant}
          onClose={() => {
            setShowSafetyPanel(false);
            setSelectedParticipant(null);
          }}
          onReport={handleReport}
          onBlock={handleBlock}
        />
      )}
    </div>
  );
};

export default MessagingCenter;