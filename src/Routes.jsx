import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ChatHistoryArchive from './pages/chat-history-archive';
import ApiConfigurationSettings from './pages/api-configuration-settings';
import MainChatInterface from './pages/main-chat-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MainChatInterface />} />
        <Route path="/chat-history-archive" element={<ChatHistoryArchive />} />
        <Route path="/api-configuration-settings" element={<ApiConfigurationSettings />} />
        <Route path="/main-chat-interface" element={<MainChatInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;