// ============================================================================
// SMART MENU - DATABASE & REALTIME SERVICE
// Clean abstraction over Supabase PostgreSQL tables & Realtime Channels
// ============================================================================
(function (global) {
  'use strict';

  // In-memory runtime state for snappy responsiveness
  let memoryRestaurant = null;
  let memoryCategories = [];
  let memoryMenuItems = [];
  let memoryTables = [];
  let memoryOrders = [];
  let memoryInventory = [];

  let realtimeChannel = null;

  const DBService = {
    // ------------------------------------------------------------------------
    // RESTAURANT / TENANT
    // ------------------------------------------------------------------------
    async getRestaurant(slugOrId) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured()) {
        try {
          const query = client.from('restaurants').select('*');
          if (slugOrId && slugOrId.includes('-') && slugOrId.length === 36) {
            query.eq('id', slugOrId);
          } else {
            query.eq('slug', slugOrId || global.SmartMenuSupabase.getDefaultRestaurantSlug());
          }
          const { data, error } = await query.single();
          if (!error && data) {
            memoryRestaurant = data;
            return data;
          }
        } catch (e) {
          console.warn('[SmartMenuDB] Failed to fetch live restaurant:', e);
        }
      }

      // Default fallback restaurant
      if (!memoryRestaurant) {
        const savedSettings = JSON.parse(localStorage.getItem('receiptConfig') || '{}');
        memoryRestaurant = {
          id: global.SmartMenuSupabase.getDefaultRestaurantId(),
          name: savedSettings.logo || 'Smart Menu Bistro',
          slug: global.SmartMenuSupabase.getDefaultRestaurantSlug(),
          logo_url: 'icons/icon-192.svg',
          address: savedSettings.address || '123 Food Street, Tasty City',
          phone: savedSettings.phone || '012-3456789',
          currency: 'RM',
          tax_rate: typeof savedSettings.taxRate !== 'undefined' ? savedSettings.taxRate : 6.0,
          receipt_header: savedSettings.logo || 'SMART MENU',
          receipt_footer1: savedSettings.footer1 || 'THANK YOU FOR DINING WITH US!',
          receipt_footer2: savedSettings.footer2 || 'Please pay at the cashier counter or via QR.'
        };
      }
      return memoryRestaurant;
    },

    async updateRestaurantSettings(restaurantId, settings) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured()) {
        try {
          const { data, error } = await client
            .from('restaurants')
            .update({
              name: settings.name || settings.logo,
              address: settings.address,
              phone: settings.phone,
              tax_rate: settings.taxRate,
              receipt_header: settings.logo,
              receipt_footer1: settings.footer1,
              receipt_footer2: settings.footer2,
              updated_at: new Date().toISOString()
            })
            .eq('id', restaurantId)
            .select()
            .single();

          if (!error && data) {
            memoryRestaurant = data;
            return data;
          }
        } catch (e) {
          console.warn('[SmartMenuDB] Error updating live restaurant settings:', e);
        }
      }

      // Sync local preferences
      localStorage.setItem('receiptConfig', JSON.stringify({
        logo: settings.logo || settings.name,
        address: settings.address,
        phone: settings.phone,
        taxRate: settings.taxRate,
        footer1: settings.footer1,
        footer2: settings.footer2
      }));
      if (memoryRestaurant) Object.assign(memoryRestaurant, settings);
      return memoryRestaurant;
    },

    // ------------------------------------------------------------------------
    // CATEGORIES
    // ------------------------------------------------------------------------
    async getCategories(restaurantId) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured()) {
        try {
          const { data, error } = await client
            .from('categories')
            .select('*')
            .eq('restaurant_id', restaurantId)
            .eq('is_active', true)
            .order('display_order', { ascending: true });

          if (!error && data && data.length > 0) {
            memoryCategories = data;
            return data;
          }
        } catch (e) {
          console.warn('[SmartMenuDB] Error fetching live categories:', e);
        }
      }

      // Local fallback
      const cached = JSON.parse(localStorage.getItem('waiter_categories') || 'null');
      if (cached && cached.length > 0) {
        memoryCategories = cached;
      }
      return memoryCategories;
    },

    async saveCategories(restaurantId, categoriesList) {
      memoryCategories = categoriesList;
      localStorage.setItem('waiter_categories', JSON.stringify(categoriesList));

      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured()) {
        try {
          // Bulk upsert
          const rows = categoriesList.map((cat, idx) => ({
            restaurant_id: restaurantId,
            name: cat.name,
            emoji: cat.emoji || '🍽️',
            image_url: cat.image || null,
            display_order: idx,
            is_active: true
          }));
          await client.from('categories').upsert(rows, { onConflict: 'restaurant_id,name' });
        } catch (e) {
          console.warn('[SmartMenuDB] Error saving categories to DB:', e);
        }
      }
      return memoryCategories;
    },

    // ------------------------------------------------------------------------
    // MENU ITEMS
    // ------------------------------------------------------------------------
    async getMenuItems(restaurantId) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured()) {
        try {
          const { data, error } = await client
            .from('menu_items')
            .select('*, modifier_groups(*, modifiers(*))')
            .eq('restaurant_id', restaurantId)
            .eq('is_available', true)
            .order('display_order', { ascending: true });

          if (!error && data && data.length > 0) {
            memoryMenuItems = data.map(item => ({
              id: item.id,
              name: item.name,
              price: parseFloat(item.price),
              category: item.category_name,
              description: item.description,
              image: item.image_url,
              gallery: item.gallery || [],
              isHero: item.is_hero,
              heroText: item.hero_text,
              modifierGroups: (item.modifier_groups || []).map(g => ({
                id: g.id,
                name: g.name,
                type: g.selection_type,
                options: (g.modifiers || []).map(m => ({ id: m.id, name: m.name, price: parseFloat(m.price) }))
              }))
            }));
            return memoryMenuItems;
          }
        } catch (e) {
          console.warn('[SmartMenuDB] Error fetching live menu items:', e);
        }
      }

      // Local fallback
      const cached = JSON.parse(localStorage.getItem('wh_menu') || 'null');
      if (cached && cached.length > 0) {
        memoryMenuItems = cached;
      }
      return memoryMenuItems;
    },

    async saveMenuItem(restaurantId, item) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured()) {
        try {
          const payload = {
            restaurant_id: restaurantId,
            name: item.name,
            price: item.price,
            category_name: item.category,
            description: item.description,
            image_url: item.image,
            gallery: item.gallery || [],
            is_hero: !!item.isHero,
            hero_text: item.heroText || '',
            is_available: true,
            updated_at: new Date().toISOString()
          };

          if (item.id && typeof item.id === 'string' && item.id.includes('-')) {
            const { data } = await client.from('menu_items').update(payload).eq('id', item.id).select().single();
            return data;
          } else {
            const { data } = await client.from('menu_items').insert(payload).select().single();
            return data;
          }
        } catch (e) {
          console.warn('[SmartMenuDB] Error saving menu item to DB:', e);
        }
      }

      // Update in memory & storage
      const idx = memoryMenuItems.findIndex(m => m.id === item.id);
      if (idx !== -1) {
        memoryMenuItems[idx] = item;
      } else {
        if (!item.id) item.id = Date.now();
        memoryMenuItems.push(item);
      }
      localStorage.setItem('wh_menu', JSON.stringify(memoryMenuItems));
      return item;
    },

    async deleteMenuItem(restaurantId, itemId) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured() && typeof itemId === 'string' && itemId.includes('-')) {
        try {
          await client.from('menu_items').delete().eq('id', itemId);
        } catch (e) {
          console.warn('[SmartMenuDB] Error deleting item from DB:', e);
        }
      }

      memoryMenuItems = memoryMenuItems.filter(m => m.id !== itemId);
      localStorage.setItem('wh_menu', JSON.stringify(memoryMenuItems));
      return true;
    },

    // ------------------------------------------------------------------------
    // TABLES
    // ------------------------------------------------------------------------
    async getTables(restaurantId) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured()) {
        try {
          const { data, error } = await client
            .from('tables')
            .select('*')
            .eq('restaurant_id', restaurantId)
            .order('label', { ascending: true });

          if (!error && data && data.length > 0) {
            memoryTables = data;
            return data;
          }
        } catch (e) {
          console.warn('[SmartMenuDB] Error fetching live tables:', e);
        }
      }

      // Local fallback
      const cached = JSON.parse(localStorage.getItem('waiter_table_presets') || 'null');
      if (cached) {
        const flatList = [];
        Object.keys(cached).forEach(group => {
          cached[group].forEach(t => flatList.push({ label: t, group_name: group, status: 'available' }));
        });
        memoryTables = flatList;
      }
      return memoryTables;
    },

    // ------------------------------------------------------------------------
    // ORDERS & REALTIME
    // ------------------------------------------------------------------------
    async getOrders(restaurantId, statusFilter) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured()) {
        try {
          let query = client
            .from('orders')
            .select('*, order_items(*)')
            .eq('restaurant_id', restaurantId)
            .order('created_at', { ascending: false });

          if (statusFilter && statusFilter !== 'All') {
            query = query.eq('status', statusFilter.toLowerCase());
          }

          const { data, error } = await query;
          if (!error && data) {
            memoryOrders = data.map(o => ({
              id: o.id,
              orderNumber: o.order_number || o.id,
              table: o.table_number,
              dineType: o.dine_type,
              status: o.status,
              items: (o.order_items || []).map(i => ({
                id: i.menu_item_id,
                name: i.item_name,
                price: parseFloat(i.unit_price),
                qty: i.quantity,
                modifiers: i.modifiers || [],
                note: i.notes || ''
              })),
              subtotal: parseFloat(o.subtotal || 0),
              discount: parseFloat(o.discount_value || 0),
              discountType: o.discount_type,
              tax: parseFloat(o.tax_amount || 0),
              total: parseFloat(o.total_amount || 0),
              paymentStatus: o.payment_status,
              paymentMethod: o.payment_method,
              customerName: o.customer_name,
              customerPhone: o.customer_phone,
              timestamp: o.created_at,
              notes: o.notes
            }));
            return memoryOrders;
          }
        } catch (e) {
          console.warn('[SmartMenuDB] Error fetching live orders:', e);
        }
      }

      // Local fallback
      const cached = JSON.parse(localStorage.getItem('wh_orders') || '[]');
      memoryOrders = cached;
      return memoryOrders;
    },

    async createOrder(restaurantId, orderData) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      const orderId = 'ord_' + Date.now();

      const normalizedOrder = {
        id: orderId,
        orderNumber: Math.floor(1000 + Math.random() * 9000),
        table: orderData.table || 'Takeaway',
        dineType: orderData.dineType || 'dine-in',
        status: orderData.status || 'pending',
        items: orderData.items || [],
        subtotal: orderData.subtotal || 0,
        discount: orderData.discount || 0,
        discountType: orderData.discountType || 'percent',
        tax: orderData.tax || 0,
        total: orderData.total || 0,
        paymentStatus: orderData.paymentStatus || 'unpaid',
        paymentMethod: orderData.paymentMethod || 'unpaid',
        customerName: orderData.customerName || null,
        customerPhone: orderData.customerPhone || null,
        notes: orderData.notes || '',
        timestamp: new Date().toISOString()
      };

      if (client && global.SmartMenuSupabase.isLiveConfigured()) {
        try {
          const { data: dbOrder, error: orderErr } = await client
            .from('orders')
            .insert({
              restaurant_id: restaurantId,
              table_number: normalizedOrder.table,
              dine_type: normalizedOrder.dineType,
              status: normalizedOrder.status,
              subtotal: normalizedOrder.subtotal,
              discount_type: normalizedOrder.discountType,
              discount_value: normalizedOrder.discount,
              tax_amount: normalizedOrder.tax,
              total_amount: normalizedOrder.total,
              payment_status: normalizedOrder.paymentStatus,
              payment_method: normalizedOrder.paymentMethod,
              customer_name: normalizedOrder.customerName,
              customer_phone: normalizedOrder.customerPhone,
              notes: normalizedOrder.notes
            })
            .select()
            .single();

          if (!orderErr && dbOrder) {
            normalizedOrder.id = dbOrder.id;
            normalizedOrder.orderNumber = dbOrder.order_number;

            // Insert line items
            if (normalizedOrder.items.length > 0) {
              const itemRows = normalizedOrder.items.map(it => ({
                order_id: dbOrder.id,
                menu_item_id: typeof it.id === 'string' && it.id.includes('-') ? it.id : null,
                item_name: it.name,
                unit_price: it.price,
                quantity: it.qty,
                total_price: it.price * it.qty,
                modifiers: it.modifiers || [],
                notes: it.note || ''
              }));
              await client.from('order_items').insert(itemRows);
            }
          }
        } catch (e) {
          console.warn('[SmartMenuDB] Error inserting order to DB:', e);
        }
      }

      // Prepend to local memory and cache
      memoryOrders.unshift(normalizedOrder);
      localStorage.setItem('wh_orders', JSON.stringify(memoryOrders));
      return normalizedOrder;
    },

    async updateOrderStatus(orderId, status) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured() && typeof orderId === 'string' && orderId.includes('-')) {
        try {
          await client.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', orderId);
        } catch (e) {
          console.warn('[SmartMenuDB] Error updating status in DB:', e);
        }
      }

      const order = memoryOrders.find(o => o.id === orderId || o.orderNumber === orderId);
      if (order) {
        order.status = status;
        localStorage.setItem('wh_orders', JSON.stringify(memoryOrders));
      }
      return order;
    },

    async updateOrderPayment(orderId, paymentStatus, paymentMethod) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (client && global.SmartMenuSupabase.isLiveConfigured() && typeof orderId === 'string' && orderId.includes('-')) {
        try {
          await client.from('orders').update({
            payment_status: paymentStatus,
            payment_method: paymentMethod,
            updated_at: new Date().toISOString()
          }).eq('id', orderId);
        } catch (e) {
          console.warn('[SmartMenuDB] Error updating payment in DB:', e);
        }
      }

      const order = memoryOrders.find(o => o.id === orderId || o.orderNumber === orderId);
      if (order) {
        order.paymentStatus = paymentStatus;
        order.paymentMethod = paymentMethod;
        localStorage.setItem('wh_orders', JSON.stringify(memoryOrders));
      }
      return order;
    },

    // Subscribe to Realtime order changes (KDS & POS floor live updates)
    subscribeOrders(restaurantId, onChangeCallback) {
      const client = global.SmartMenuSupabase ? global.SmartMenuSupabase.getClient() : null;
      if (!client || !global.SmartMenuSupabase.isLiveConfigured()) return null;

      try {
        if (realtimeChannel) {
          client.removeChannel(realtimeChannel);
        }

        realtimeChannel = client
          .channel(`public:orders:${restaurantId}`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'orders', filter: `restaurant_id=eq.${restaurantId}` },
            (payload) => {
              if (typeof onChangeCallback === 'function') {
                onChangeCallback(payload);
              }
            }
          )
          .subscribe();

        return realtimeChannel;
      } catch (e) {
        console.warn('[SmartMenuDB] Realtime subscription error:', e);
        return null;
      }
    }
  };

  global.SmartMenuDB = DBService;
})(typeof window !== 'undefined' ? window : this);
