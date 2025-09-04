import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Icon from '../AppIcon';
import Image from '../AppImage';

const Header = ({ notificationCount = 0, user = null }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/user-dashboard', icon: 'LayoutDashboard' },
    { label: 'Discover', path: '/travel-partner-discovery', icon: 'Compass' },
    { label: 'Plan Trip', path: '/trip-planning', icon: 'MapPin' },
    { label: 'Messages', path: '/messaging-center', icon: 'MessageCircle' },
    { label: 'Profile', path: '/user-profile-management', icon: 'User' }
  ];

  const isActivePath = (path) => {
    return router?.pathname === path;
  };

  const handleNavigation = (path) => {
    router?.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logging out...');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router?.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer transition-smooth hover:opacity-80"
              onClick={() => handleNavigation('/user-dashboard')}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Icon name="Plane" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">TripDuo</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`relative flex items-center px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} className="mr-2" />
                {item?.label}
                {item?.path === '/messaging-center' && notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Avatar & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* User Avatar Dropdown - Desktop */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownToggle}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <Image 
                      src={user?.avatar} 
                      alt={user?.name || 'User'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="User" size={16} color="var(--color-primary)" />
                  )}
                </div>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated py-1 z-1100">
                  <button
                    onClick={() => {
                      handleNavigation('/user-profile-management');
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error/10 transition-smooth"
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-surface border-t border-border z-1200">
          <nav className="px-4 py-6 space-y-4">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`relative flex items-center w-full px-4 py-3 text-base font-medium rounded-lg transition-smooth ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} className="mr-3" />
                {item?.label}
                {item?.path === '/messaging-center' && notificationCount > 0 && (
                  <span className="ml-auto bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </button>
            ))}
            
            {/* Mobile User Actions */}
            <div className="pt-4 border-t border-border space-y-2">
              <button
                onClick={() => handleNavigation('/user-profile-management')}
                className="flex items-center w-full px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name="Settings" size={20} className="mr-3" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-base text-error hover:bg-error/10 rounded-lg transition-smooth"
              >
                <Icon name="LogOut" size={20} className="mr-3" />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;