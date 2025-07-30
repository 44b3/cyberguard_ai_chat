import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onClearChat, messageCount, onToggleSettings }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [apiStatus, setApiStatus] = useState('connected');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success';
      case 'connecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'Wifi';
      case 'connecting':
        return 'Loader';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'Wifi';
    }
  };

  return (
    <div className="border-b border-border bg-surface/80 backdrop-blur-cosmic">
      <div className="flex items-center justify-between p-6">
        {/* Left Section - Session Info */}
        <div className="flex items-center space-x-6">
          {/* AI Status */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center cosmic-glow">
                <Icon name="Bot" size={24} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface animate-cosmic-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-heading font-bold text-foreground">CyberGuard AI</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={14} className="text-primary" />
                <span>Red Team Assistant</span>
              </div>
            </div>
          </div>

          {/* Session Stats */}
          <div className="hidden md:flex items-center space-x-6 pl-6 border-l border-border">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground font-data">{messageCount}</div>
              <div className="text-xs text-muted-foreground">Messages</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary font-data">Active</div>
              <div className="text-xs text-muted-foreground">Session</div>
            </div>
          </div>
        </div>

        {/* Right Section - Controls & Status */}
        <div className="flex items-center space-x-4">
          {/* Time Display */}
          <div className="hidden lg:block text-right">
            <div className="text-sm font-bold text-foreground font-data">{formatTime(currentTime)}</div>
            <div className="text-xs text-muted-foreground">{formatDate(currentTime)}</div>
          </div>

          {/* API Status */}
          <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted/20 border border-border">
            <Icon 
              name={getStatusIcon(apiStatus)} 
              size={16} 
              className={`${getStatusColor(apiStatus)} ${apiStatus === 'connecting' ? 'animate-spin' : ''}`} 
            />
            <span className={`text-xs font-medium ${getStatusColor(apiStatus)}`}>
              {apiStatus === 'connected' ? 'Online' : apiStatus === 'connecting' ? 'Connecting' : 'Offline'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSettings}
              className="text-muted-foreground hover:text-foreground cosmic-glow"
              title="API Settings"
            >
              <Icon name="Settings" size={18} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClearChat}
              className="text-muted-foreground hover:text-error cosmic-glow"
              title="Clear Chat History"
              disabled={messageCount === 0}
            >
              <Icon name="Trash2" size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Session Stats */}
      <div className="md:hidden flex items-center justify-center space-x-8 pb-4">
        <div className="text-center">
          <div className="text-base font-bold text-foreground font-data">{messageCount}</div>
          <div className="text-xs text-muted-foreground">Messages</div>
        </div>
        <div className="text-center">
          <div className="text-base font-bold text-primary font-data">Active</div>
          <div className="text-xs text-muted-foreground">Session</div>
        </div>
        <div className="text-center">
          <div className={`text-base font-bold font-data ${getStatusColor(apiStatus)}`}>
            {apiStatus === 'connected' ? 'Online' : 'Offline'}
          </div>
          <div className="text-xs text-muted-foreground">API Status</div>
        </div>
      </div>

      {/* Cosmic Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 right-20 w-1 h-1 bg-primary rounded-full animate-cosmic-pulse opacity-60"></div>
        <div className="absolute bottom-4 left-32 w-0.5 h-0.5 bg-secondary rounded-full animate-cosmic-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default ChatHeader;