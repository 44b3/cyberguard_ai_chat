import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigationItems = [
    {
      label: 'Chat',
      path: '/main-chat-interface',
      icon: 'MessageSquare',
      description: 'AI-powered security analysis',
      badge: null
    },
    {
      label: 'History',
      path: '/chat-history-archive',
      icon: 'Archive',
      description: 'Conversation archive',
      badge: null
    },
    {
      label: 'Settings',
      path: '/api-configuration-settings',
      icon: 'Settings',
      description: 'API configuration',
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo = () => (
    <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center cosmic-glow">
          <Icon name="Shield" size={24} className="text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-cosmic-pulse"></div>
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-lg font-heading font-bold text-foreground">CyberGuard</span>
          <span className="text-xs text-muted-foreground font-data">AI Chat</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Cosmic Background Elements for Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 pointer-events-none z-1">
        <div className="absolute top-32 left-8 w-1 h-1 bg-primary rounded-full animate-cosmic-pulse opacity-40"></div>
        <div className="absolute top-64 left-12 w-1.5 h-1.5 bg-secondary rounded-full animate-cosmic-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-6 w-0.5 h-0.5 bg-accent rounded-full animate-cosmic-pulse opacity-50" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-100 bg-surface/90 backdrop-blur-cosmic border-t border-border pb-safe">
        <nav className="flex items-center justify-around px-4 py-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`cosmic-nav-item flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'active text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
                title={item.description}
              >
                <Icon name={item.icon} size={20} />
                <span className="text-xs font-body font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block fixed left-0 top-0 bottom-0 z-100 bg-surface/80 backdrop-blur-cosmic border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Logo />
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCollapse}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Collapse sidebar"
              >
                <Icon name="PanelLeftClose" size={18} />
              </Button>
            )}
          </div>

          {/* Collapsed Toggle Button */}
          {isCollapsed && (
            <div className="flex justify-center p-4 border-b border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCollapse}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Expand sidebar"
              >
                <Icon name="PanelLeftOpen" size={18} />
              </Button>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`cosmic-nav-item w-full flex items-center rounded-lg transition-all duration-300 ${
                    isCollapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-3'
                  } ${
                    isActive 
                      ? 'active text-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                  title={isCollapsed ? `${item.label} - ${item.description}` : item.description}
                >
                  <Icon name={item.icon} size={20} />
                  {!isCollapsed && (
                    <div className="flex flex-col items-start flex-1">
                      <span className="font-body font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={16} className="text-success-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-body font-medium text-foreground">System Active</p>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center cosmic-glow">
                  <Icon name="Zap" size={16} className="text-success-foreground" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cosmic Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-primary rounded-full animate-cosmic-pulse opacity-30"></div>
          <div className="absolute top-3/4 left-1/4 w-0.5 h-0.5 bg-secondary rounded-full animate-cosmic-pulse opacity-40" style={{ animationDelay: '3s' }}></div>
        </div>
      </aside>

      {/* Shooting Stars for Sidebar Area */}
      <div className="hidden md:block fixed left-0 top-0 bottom-0 w-64 pointer-events-none z-1 overflow-hidden">
        <div className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-shooting-star opacity-60" style={{ animationDelay: '5s', top: '30%', left: '-50px' }}></div>
        <div className="absolute w-1 h-1 bg-secondary rounded-full animate-shooting-star opacity-40" style={{ animationDelay: '20s', top: '70%', left: '-50px' }}></div>
      </div>
    </>
  );
};

export default Sidebar;