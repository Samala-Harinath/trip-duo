import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatWindow = ({ 
  conversation, 
  messages, 
  currentUserId, 
  onSendMessage, 
  onBackToList,
  isTyping 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😊', '😂', '❤️', '👍', '👎', '😍', '🤔', '😢', '😮', '🎉', '✈️', '🏖️', '🗺️', '📸', '🌟', '🔥'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      onSendMessage({
        type: 'text',
        content: newMessage?.trim(),
        timestamp: new Date()
      });
      setNewMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Mock file upload
      onSendMessage({
        type: 'image',
        content: URL.createObjectURL(file),
        timestamp: new Date()
      });
    }
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatMessageDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (messageDate?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (messageDate?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: messageDate?.getFullYear() !== today?.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const shouldShowDateSeparator = (currentMessage, previousMessage) => {
    if (!previousMessage) return true;
    
    const currentDate = new Date(currentMessage.timestamp)?.toDateString();
    const previousDate = new Date(previousMessage.timestamp)?.toDateString();
    
    return currentDate !== previousDate;
  };

  if (!conversation) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-background text-center p-6">
        <Icon name="MessageCircle" size={64} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Select a conversation</h3>
        <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border bg-surface">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackToList}
          className="md:hidden mr-2"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        
        <div className="relative flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
            <Image
              src={conversation?.participant?.avatar}
              alt={conversation?.participant?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {conversation?.participant?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{conversation?.participant?.name}</h3>
          <p className="text-sm text-muted-foreground">
            {conversation?.participant?.isOnline ? 'Online' : `Last seen ${formatMessageTime(conversation?.participant?.lastSeen)}`}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Video" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message, index) => {
          const isCurrentUser = message?.senderId === currentUserId;
          const previousMessage = index > 0 ? messages?.[index - 1] : null;
          const showDateSeparator = shouldShowDateSeparator(message, previousMessage);

          return (
            <div key={message?.id}>
              {showDateSeparator && (
                <div className="flex items-center justify-center my-4">
                  <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                    {formatMessageDate(message?.timestamp)}
                  </div>
                </div>
              )}
              <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                  {message?.type === 'text' && (
                    <div className={`px-4 py-2 rounded-2xl ${
                      isCurrentUser 
                        ? 'bg-primary text-primary-foreground rounded-br-md' 
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
                    </div>
                  )}
                  
                  {message?.type === 'image' && (
                    <div className={`rounded-2xl overflow-hidden ${
                      isCurrentUser ? 'rounded-br-md' : 'rounded-bl-md'
                    }`}>
                      <Image
                        src={message?.content}
                        alt="Shared image"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  
                  {message?.type === 'location' && (
                    <div className={`p-3 rounded-2xl border ${
                      isCurrentUser 
                        ? 'bg-primary/10 border-primary/20 rounded-br-md' :'bg-muted border-border rounded-bl-md'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <Icon name="MapPin" size={16} className="text-primary" />
                        <span className="text-sm font-medium">Location shared</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{message?.content}</p>
                    </div>
                  )}
                  
                  <div className={`flex items-center mt-1 space-x-1 ${
                    isCurrentUser ? 'justify-end' : 'justify-start'
                  }`}>
                    <span className="text-xs text-muted-foreground">
                      {formatMessageTime(message?.timestamp)}
                    </span>
                    {isCurrentUser && (
                      <Icon 
                        name={message?.read ? "CheckCheck" : "Check"} 
                        size={12} 
                        className={message?.read ? "text-primary" : "text-muted-foreground"} 
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="p-4 border-t border-border bg-surface">
        {showEmojiPicker && (
          <div className="mb-3 p-3 bg-muted rounded-lg">
            <div className="grid grid-cols-8 gap-2">
              {emojis?.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="text-lg hover:bg-background rounded p-1 transition-smooth"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-end space-x-2">
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Icon name="Smile" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef?.current?.click()}
            >
              <Icon name="Paperclip" size={20} />
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage?.trim()}
            size="icon"
            className="rounded-full"
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;