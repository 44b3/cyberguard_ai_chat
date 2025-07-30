import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Chat',
      path: '/main-chat-interface',
      icon: 'MessageSquare',
      description: 'AI-powered security analysis'
    },
    {
      label: 'History',
      path: '/chat-history-archive',
      icon: 'Archive',
      description: 'Conversation archive'
    },
    {
      label: 'Settings',
      path: '/api-configuration-settings',
      icon: 'Settings',
      description: 'API configuration'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center cosmic-glow">
          <Icon name="Shield" size={24} className="text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-cosmic-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-heading font-bold text-foreground">CyberGuard</span>
        <span className="text-xs text-muted-foreground font-data">AI Chat</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Cosmic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-1">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-cosmic-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-cosmic-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-cosmic-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-100 bg-surface/80 backdrop-blur-cosmic border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`cosmic-nav-item flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'active text-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                  title={item.description}
                >
                  <Icon name={item.icon} size={18} />
                  <span className="font-body font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden"
            aria-label="Toggle navigation menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface/95 backdrop-blur-cosmic border-t border-border">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`cosmic-nav-item w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'active text-primary' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <div className="flex flex-col items-start">
                      <span className="font-body font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Shooting Star Animation */}
      <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
        <div className="absolute w-1 h-1 bg-primary rounded-full animate-shooting-star opacity-80" style={{ animationDelay: '0s', top: '20%', left: '-100px' }}></div>
        <div className="absolute w-0.5 h-0.5 bg-secondary rounded-full animate-shooting-star opacity-60" style={{ animationDelay: '15s', top: '60%', left: '-100px' }}></div>
        <div className="absolute w-1.5 h-1.5 bg-accent rounded-full animate-shooting-star opacity-40" style={{ animationDelay: '30s', top: '80%', left: '-100px' }}></div>
      </div>
    </>
  );
};

export default Header;