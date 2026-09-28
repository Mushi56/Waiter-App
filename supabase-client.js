// ============================================================================
// SMART MENU - SUPABASE CLIENT CONFIGURATION
// ============================================================================
(function (global) {
  'use strict';

  // Config defaults: Can be customized via window.SMART_MENU_CONFIG or localStorage
  const DEFAULT_CONFIG = {
    supabaseUrl: 'https://demo-smartmenu.supabase.co',
    supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.demo-placeholder',
    defaultRestaurantSlug: 'smart-menu-bistro',
    defaultRestaurantId: 'a0000000-0000-0000-0000-000000000001'
  };

  const storedConfig = JSON.parse(localStorage.getItem('sm_supabase_config') || '{}');
  const activeConfig = Object.assign({}, DEFAULT_CONFIG, window.SMART_MENU_CONFIG || {}, storedConfig);

  let client = null;
  const isConfigured = Boolean(
    activeConfig.supabaseUrl && 
    activeConfig.supabaseAnonKey && 
    !activeConfig.supabaseUrl.includes('demo-smartmenu.supabase.co')
  );

  function initSupabase() {
    try {
      if (global.supabase && typeof global.supabase.createClient === 'function') {
        client = global.supabase.createClient(activeConfig.supabaseUrl, activeConfig.supabaseAnonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            storageKey: 'sm_auth_token'
          },
          realtime: {
            params: {
              eventsPerSecond: 10
            }
          }
        });
      } else {
        console.warn('[SmartMenu] Supabase JS library not loaded. Falling back to offline client.');
      }
    } catch (err) {
      console.error('[SmartMenu] Error initializing Supabase client:', err);
    }
    return client;
  }

  // Attempt initial init
  initSupabase();

  const SupabaseConfig = {
    get: () => ({ ...activeConfig }),
    isLiveConfigured: () => isConfigured,
    save: (newConfig) => {
      Object.assign(activeConfig, newConfig);
      localStorage.setItem('sm_supabase_config', JSON.stringify(activeConfig));
      initSupabase();
      if (global.SmartMenuDB && typeof global.SmartMenuDB.reconnect === 'function') {
        global.SmartMenuDB.reconnect();
      }
    },
    getClient: () => client,
    getDefaultRestaurantSlug: () => activeConfig.defaultRestaurantSlug,
    getDefaultRestaurantId: () => activeConfig.defaultRestaurantId
  };

  global.SmartMenuSupabase = SupabaseConfig;
})(typeof window !== 'undefined' ? window : this);
