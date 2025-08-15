// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Check if Google Analytics is loaded
export const isGALoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Track page views
export const trackPageView = (page_title: string, page_location?: string): void => {
  if (isGALoaded()) {
    window.gtag('config', 'G-8EX02R52EB', {
      page_title,
      page_location: page_location || window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (
  event_name: string,
  parameters?: Record<string, any>
): void => {
  if (isGALoaded()) {
    window.gtag('event', event_name, {
      event_category: 'engagement',
      event_label: parameters?.label || '',
      value: parameters?.value || 0,
      ...parameters,
    });
  }
};

// Specific tracking functions for your website
export const analytics = {
  // Game interactions
  trackGameClick: (gameName: string, gameId: number) => {
    trackEvent('game_click', {
      event_category: 'games',
      game_name: gameName,
      game_id: gameId,
      event_label: `Game: ${gameName}`,
    });
  },

  trackGamePlay: (gameName: string, gameId: number) => {
    trackEvent('game_play', {
      event_category: 'games',
      game_name: gameName,
      game_id: gameId,
      event_label: `Play: ${gameName}`,
      value: 1,
    });
  },

  trackGameLike: (gameName: string, gameId: number, liked: boolean) => {
    trackEvent('game_like', {
      event_category: 'games',
      game_name: gameName,
      game_id: gameId,
      action: liked ? 'like' : 'unlike',
      event_label: `${liked ? 'Liked' : 'Unliked'}: ${gameName}`,
    });
  },

  trackGameShare: (gameName: string, gameId: number, method: string) => {
    trackEvent('share', {
      event_category: 'games',
      method,
      content_type: 'game',
      item_id: gameId.toString(),
      game_name: gameName,
      event_label: `Share ${gameName} via ${method}`,
    });
  },

  // Navigation
  trackTabChange: (tabName: string) => {
    trackEvent('tab_change', {
      event_category: 'navigation',
      tab_name: tabName,
      event_label: `Tab: ${tabName}`,
    });
  },

  trackSearch: (searchQuery: string, resultsCount: number) => {
    trackEvent('search', {
      event_category: 'navigation',
      search_term: searchQuery,
      results_count: resultsCount,
      event_label: `Search: ${searchQuery}`,
    });
  },

  // Theme and settings
  trackThemeChange: (theme: 'light' | 'dark') => {
    trackEvent('theme_change', {
      event_category: 'settings',
      theme_mode: theme,
      event_label: `Theme: ${theme}`,
    });
  },

  // Social media clicks
  trackSocialClick: (platform: string) => {
    trackEvent('social_click', {
      event_category: 'social',
      platform,
      event_label: `Social: ${platform}`,
    });
  },

  // Analytics dashboard
  trackAnalyticsView: () => {
    trackEvent('analytics_view', {
      event_category: 'engagement',
      event_label: 'Analytics Dashboard Opened',
    });
  },

  // Reviews and feedback
  trackReviewFilter: (filterType: string, filterValue: string) => {
    trackEvent('review_filter', {
      event_category: 'reviews',
      filter_type: filterType,
      filter_value: filterValue,
      event_label: `Filter: ${filterType} = ${filterValue}`,
    });
  },

  trackReviewHelpful: (reviewId: string, gameId: number) => {
    trackEvent('review_helpful', {
      event_category: 'reviews',
      review_id: reviewId,
      game_id: gameId,
      event_label: `Review ${reviewId} marked helpful`,
    });
  },

  // User engagement
  trackTimeOnPage: (seconds: number, pageName: string) => {
    trackEvent('page_engagement', {
      event_category: 'engagement',
      engagement_time_msec: seconds * 1000,
      page_name: pageName,
      event_label: `${pageName}: ${seconds}s`,
    });
  },

  // Error tracking
  trackError: (errorMessage: string, errorLocation: string) => {
    trackEvent('exception', {
      description: errorMessage,
      fatal: false,
      location: errorLocation,
    });
  },
};

// Track page load time
export const trackPageLoadTime = (): void => {
  if (typeof window !== 'undefined' && window.performance) {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    trackEvent('page_load_time', {
      event_category: 'performance',
      value: Math.round(loadTime),
      event_label: 'Page Load Time',
    });
  }
};

// Initialize analytics on app load
export const initializeAnalytics = (): void => {
  if (isGALoaded()) {
    // Track initial page load
    trackPageView('MCX Studios - Home');
    
    // Track page load time after a short delay
    setTimeout(trackPageLoadTime, 1000);
    
    console.log('Google Analytics initialized for MCX Studios');
  }
};
