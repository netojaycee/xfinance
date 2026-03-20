'use client';

/**
 * useRealtimeSync Hook
 * 
 * Initializes WebSocket and listens for realtime events
 * Updates session store when events are received
 * 
 * Usage in SessionProvider:
 * const { isConnected } = useRealtimeSync();
 */

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useSessionStore } from '@/lib/store/session';
import { getWhoami, logout } from '@/lib/api/services/authService';
import {
  initializeWebSocket,
  disconnectWebSocket,
  onWebSocketConnectionChange,
} from '@/lib/api/websocket';
import { RealtimeEventType } from '@/lib/types/realtimeEvents';

interface UseRealtimeSyncOptions {
  enabled?: boolean; // Set to false to disable (e.g., during logout)
  onSubscriptionExpired?: (modal: React.ReactNode) => void; // Callback to render modal
}

interface SubscriptionExpiredState {
  isOpen: boolean;
  expiredTier: string;
  expiredDate: string;
}

export function useRealtimeSync(options: UseRealtimeSyncOptions = {}) {
  const { enabled = true } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [subscriptionExpired, setSubscriptionExpired] = useState<SubscriptionExpiredState>({
    isOpen: false,
    expiredTier: '',
    expiredDate: '',
  });

  // Get actions from session store
  const whoami = useSessionStore((state) => state.whoami);
  const setWhoami = useSessionStore((state) => state.setWhoami);
  const user = useSessionStore((state) => state.user);


  // Initialize WebSocket on mount
  useEffect(() => {
    if (!enabled || !user?.id || !whoami?.context?.groupId) {
      return;
    }

    try {
      // WebSocket uses cookie-based auth (withCredentials: true)
      // Cookies are automatically sent by socket.io client
      initializeWebSocket({
        userId: user.id,
        groupId: whoami.context.groupId,
      });

      // Listen to connection state changes
      const unsubscribe = onWebSocketConnectionChange((connected) => {
        setIsConnected(connected);
        setConnectionError(null);
      });

      return unsubscribe;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to initialize WebSocket';
      setConnectionError(message);
    }

    return () => {
      disconnectWebSocket();
    };
  }, [enabled, user?.id, whoami?.context?.groupId]);

  // Handle real-time events: refetch whoami data when backend sends invalidation
  const handleRealtimeEvent = useCallback(
    (event: CustomEvent<{ type: RealtimeEventType; payload: any }>) => {
      const { type, payload } = event.detail;

      if (type === 'whoami-invalidated') {
        // Event payload has 'reason' explaining what changed
        getWhoami().then(setWhoami).catch((error) => {
          console.error('Error fetching whoami:', error);
        });
      } else if (type === 'entity-removed') {
        // Special case: redirect if currently viewing deleted entity
        if (whoami?.context?.currentEntity?.id === payload.entityId) {
          window.location.href = '/dashboard';
        } else {
          getWhoami().then(setWhoami).catch((error) => {
            console.error('Error fetching whoami:', error);
          });
        }
      } else if (type === 'user-role-changed') {
        // User's role assignment changed - show toast and refetch menu/permissions
        const newRoleName = payload.newRoleName || 'Unknown Role';
        toast.info(`Your role has been updated to "${newRoleName}"`, {
          description: 'Menu and permissions have been refreshed.',
        });
        // Refetch whoami to update menu and permissions
        getWhoami().then(setWhoami).catch((error) => {
          console.error('Error fetching whoami after role change:', error);
        });
      } else if (type === 'subscription-expired') {
        // Subscription expired - show modal with countdown
        setSubscriptionExpired({
          isOpen: true,
          expiredTier: payload.expiredTier || 'Premium',
          expiredDate: payload.expiredDate || new Date().toISOString(),
        });
      } else if (
        type === 'permissions-changed' ||
        type === 'menus-invalidated' ||
        type === 'entity-added' ||
        type === 'entity-updated' ||
        type === 'subscription-changed' ||
        type === 'role-changed'
      ) {
        // All these events require refreshing whoami
        // - Menu, permissions, and other user data come from whoami
        // - Subscription changes affect available modules
        // - Role changes affect user menu and available features
        getWhoami().then(setWhoami).catch((error) => {
          console.error('Error fetching whoami:', error);
        });
      }
    },
    [setWhoami, whoami?.context?.currentEntity?.id]
  );

  // Listen for custom realtime events
  useEffect(() => {
    window.addEventListener('realtime-event', handleRealtimeEvent as EventListener);

    return () => {
      window.removeEventListener('realtime-event', handleRealtimeEvent as EventListener);
    };
  }, [handleRealtimeEvent]);

  // Handle subscription expired logout
  const handleSubscriptionExpiredLogout = useCallback(() => {
    // Close modal
    setSubscriptionExpired({
      ...subscriptionExpired,
      isOpen: false,
    });

    // Clear session and disconnect WebSocket
    useSessionStore.getState().clearSession();
    disconnectWebSocket();

    // Call logout API
    logout()
      .then(() => {
        // Redirect to login
        window.location.href = '/auth/login';
      })
      .catch((error) => {
        console.error('Error during logout:', error);
        // Still redirect even if logout API fails
        window.location.href = '/auth/login';
      });
  }, [subscriptionExpired]);

  return {
    isConnected,
    connectionError,
    subscriptionExpired,
    onSubscriptionExpiredLogout: handleSubscriptionExpiredLogout,
  };
}

/**
 * Hook to show realtime connection status in UI
 */
export function useRealtimeStatus() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to connection state changes
    const unsubscribe = onWebSocketConnectionChange((connected) => {
      setIsConnected(connected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isConnected,
    connectionError,
  };
}
