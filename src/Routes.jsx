import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TripPlanning from './pages/trip-planning';
import UserDashboard from './pages/user-dashboard';
import TravelPartnerDiscovery from './pages/travel-partner-discovery';
import UserProfileManagement from './pages/user-profile-management';
import UserRegistration from './pages/user-registration';
import MessagingCenter from './pages/messaging-center';
import SignIn from './pages/sign-in';
import UserProfile from './pages/user-profile';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/trip-planning" element={<TripPlanning />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/travel-partner-discovery" element={<TravelPartnerDiscovery />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/messaging-center" element={<MessagingCenter />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
