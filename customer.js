// ============================================================================
// SMART MENU - CUSTOMER WEB ORDERING LOGIC
// ============================================================================
(function () {
  'use strict';

  // State
  let restaurant = null;
  let categories = [];
  let menuItems = [];
  let activeCategory = 'All';
  let cart = [];
  let tableNumber = '';
  let dineType = 'dine-in';
  let activeCustomizingItem = null;
  let activeOrder = null;

  // URL Params
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantSlug = urlParams.get('r') || urlParams.get('restaurant') || 'smart-menu-bistro';
  const urlTable = urlParams.get('t') || urlParams.get('table');

  // DOM Elements
  const els = {
    restaurantName: document.getElementById('restaurantName'),
    displayTableNumber: document.getElementById('displayTableNumber'),
    tablePromptBanner: document.getElementById('tablePromptBanner'),
    manualTableInput: document.getElementById('manualTableInput'),
    setTableBtn: document.getElementById('setTableBtn'),
    liveTrackerBanner: document.getElementById('liveTrackerBanner'),
    trackerOrderNum: document.getElementById('trackerOrderNum'),
    trackerStatusText: document.getElementById('trackerStatusText'),
    viewTrackerBtn: document.getElementById('viewTrackerBtn'),
    categoryTabs: document.getElementById('customerCategoryTabs'),
    currentCategoryTitle: document.getElementById('currentCategoryTitle'),
    itemsCountBadge: document.getElementById('itemsCountBadge'),
    menuGrid: document.getElementById('customerMenuGrid'),
    cartBar: document.getElementById('customerCartBar'),
    cartBarCount: document.getElementById('cartBarCount'),
    cartBarTotal: document.getElementById('cartBarTotal'),
    openCartBtn: document.getElementById('openCartBtn'),
    cartModal: document.getElementById('customerCartModal'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    cartModalTableInfo: document.getElementById('cartModalTableInfo'),
    cartItems: document.getElementById('customerCartItems'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartTax: document.getElementById('cartTax'),
    cartTaxRate: document.getElementById('cartTaxRate'),
    cartTotal: document.getElementById('cartTotal'),
    btnTotalText: document.getElementById('btnTotalText'),
    submitOrderBtn: document.getElementById('submitOrderBtn'),
    orderSpecialNotes: document.getElementById('orderSpecialNotes'),
    addonModal: document.getElementById('customerAddonModal'),
    closeCustAddonModal: document.getElementById('closeCustAddonModal'),
    custAddonItemName: document.getElementById('custAddonItemName'),
    custAddonGroupsList: document.getElementById('custAddonGroupsList'),
    custItemNoteInput: document.getElementById('custItemNoteInput'),
    confirmCustAddonBtn: document.getElementById('confirmCustAddonBtn'),
    orderTrackerModal: document.getElementById('orderTrackerModal'),
    closeTrackerModal: document.getElementById('closeTrackerModal'),
    trackerModalStatusTitle: document.getElementById('trackerModalStatusTitle'),
    trackerModalStatusDesc: document.getElementById('trackerModalStatusDesc'),
    trackerDetailOrderNum: document.getElementById('trackerDetailOrderNum'),
    trackerOrderItemsList: document.getElementById('trackerOrderItemsList'),
    orderMoreBtn: document.getElementById('orderMoreBtn'),
    toast: document.getElementById('customerToast'),
    toastMsg: document.getElementById('customerToastMsg')
  };

  // Initialize
  async function init() {
    setupTable();
    await loadRestaurantData();
    bindEvents();
    checkExistingActiveOrder();
  }

  function setupTable() {
    if (urlTable) {
      tableNumber = urlTable.toUpperCase();
      sessionStorage.setItem('sm_cust_table', tableNumber);
    } else {
      tableNumber = sessionStorage.getItem('sm_cust_table') || '';
    }

    if (tableNumber) {
      els.displayTableNumber.textContent = tableNumber;
      els.tablePromptBanner.classList.add('hidden');
      if (els.cartModalTableInfo) els.cartModalTableInfo.textContent = `Table ${tableNumber}`;
    } else {
      els.displayTableNumber.textContent = '?';
      els.tablePromptBanner.classList.remove('hidden');
    }
  }

  async function loadRestaurantData() {
    try {
      restaurant = await window.SmartMenuDB.getRestaurant(restaurantSlug);
      if (restaurant) {
        els.restaurantName.textContent = restaurant.name;
        if (els.cartTaxRate) els.cartTaxRate.textContent = `${restaurant.tax_rate || 0}%`;
      }

      const restId = restaurant ? restaurant.id : window.SmartMenuSupabase.getDefaultRestaurantId();
      categories = await window.SmartMenuDB.getCategories(restId);
      menuItems = await window.SmartMenuDB.getMenuItems(restId);

      renderCategories();
      renderMenu();
    } catch (e) {
      console.error('Error loading restaurant data:', e);
      showToast('Could not load menu. Please retry.');
    }
  }

  function renderCategories() {
    let html = `
      <button class="cat-tab ${activeCategory === 'All' ? 'active' : ''}" data-category="All">
        <span class="cat-tab-emoji">🍽️</span>
        <span class="cat-tab-name">All Items</span>
      </button>
    `;

    categories.forEach(cat => {
      const isAct = activeCategory === cat.name;
      html += `
        <button class="cat-tab ${isAct ? 'active' : ''}" data-category="${cat.name}">
          <span class="cat-tab-emoji">${cat.emoji || '🍴'}</span>
          <span class="cat-tab-name">${cat.name}</span>
        </button>
      `;
    });

    els.categoryTabs.innerHTML = html;
  }

  function renderMenu() {
    const filtered = activeCategory === 'All'
      ? menuItems
      : menuItems.filter(m => m.category === activeCategory);

    els.currentCategoryTitle.textContent = activeCategory === 'All' ? 'All Items' : activeCategory;
    els.itemsCountBadge.textContent = `${filtered.length} item${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      els.menuGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          No items found in this category.
        </div>
      `;
      return;
    }

    els.menuGrid.innerHTML = filtered.map(item => `
      <div class="menu-card" data-id="${item.id}">
        <div class="menu-card-img-wrap">
          ${item.image 
            ? `<img src="${item.image}" alt="${item.name}" loading="lazy" class="menu-card-img">`
            : `<div class="menu-card-placeholder">🍴</div>`
          }
        </div>
        <div class="menu-card-info">
          <div class="menu-card-header">
            <span class="menu-card-category">${item.category}</span>
          </div>
          <h3 class="menu-card-name">${item.name}</h3>
          ${item.description ? `<p class="menu-card-desc">${item.description}</p>` : ''}
          <div class="menu-card-footer">
            <div class="menu-card-price">RM ${item.price.toFixed(2)}</div>
            <button class="btn-accent btn-add-item" data-id="${item.id}" style="padding: 6px 14px; font-size: 0.85rem; border-radius: var(--radius-sm); font-weight: 700;">
              + Add
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function handleItemClick(itemId) {
    const item = menuItems.find(m => m.id === itemId);
    if (!item) return;

    if (item.modifierGroups && item.modifierGroups.length > 0) {
      openAddonCustomizer(item);
    } else {
      addToCart(item, [], '');
      showToast(`Added ${item.name} to cart`);
    }
  }

  function openAddonCustomizer(item) {
    activeCustomizingItem = item;
    els.custAddonItemName.textContent = item.name;
    els.custItemNoteInput.value = '';

    els.custAddonGroupsList.innerHTML = item.modifierGroups.map((group, gIdx) => `
      <div style="background:var(--bg-primary); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border);">
        <div style="font-weight:700; margin-bottom:8px; display:flex; justify-content:space-between;">
          <span>${group.name}</span>
          <span style="font-size:0.75rem; color:var(--text-secondary);">${group.type === 'radio' ? 'Pick 1' : 'Optional'}</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${group.options.map((opt, oIdx) => `
            <label style="display:flex; justify-content:space-between; align-items:center; cursor:pointer; font-size:0.88rem;">
              <div style="display:flex; align-items:center; gap:8px;">
                <input type="${group.type === 'radio' ? 'radio' : 'checkbox'}" 
                       name="cust_group_${gIdx}" 
                       data-group="${gIdx}" 
                       data-opt="${oIdx}"
                       ${group.type === 'radio' && oIdx === 0 ? 'checked' : ''}>
                <span>${opt.name}</span>
              </div>
              <span style="color:var(--accent); font-weight:600;">+RM ${opt.price.toFixed(2)}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');

    els.addonModal.classList.remove('hidden');
  }

  function confirmCustomizedItem() {
    if (!activeCustomizingItem) return;
    const selectedModifiers = [];

    activeCustomizingItem.modifierGroups.forEach((group, gIdx) => {
      const inputs = els.custAddonGroupsList.querySelectorAll(`input[name="cust_group_${gIdx}"]:checked`);
      inputs.forEach(inp => {
        const oIdx = parseInt(inp.dataset.opt);
        const opt = group.options[oIdx];
        if (opt) selectedModifiers.push(opt);
      });
    });

    const note = els.custItemNoteInput.value.trim();
    addToCart(activeCustomizingItem, selectedModifiers, note);
    els.addonModal.classList.add('hidden');
    showToast(`Added ${activeCustomizingItem.name} to cart`);
  }

  function addToCart(item, modifiers = [], note = '') {
    const modTotal = modifiers.reduce((acc, m) => acc + m.price, 0);
    const unitPrice = item.price + modTotal;

    const cartId = `${item.id}_${JSON.stringify(modifiers)}_${note}`;
    const existing = cart.find(c => c.cartId === cartId);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        cartId,
        id: item.id,
        name: item.name,
        price: unitPrice,
        basePrice: item.price,
        qty: 1,
        modifiers,
        note
      });
    }

    updateCartUI();
  }

  function changeCartQty(cartId, delta) {
    const idx = cart.findIndex(c => c.cartId === cartId);
    if (idx === -1) return;

    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
      cart.splice(idx, 1);
    }
    updateCartUI();
    renderCartModal();
  }

  function updateCartUI() {
    const totalCount = cart.reduce((acc, c) => acc + c.qty, 0);
    const subtotal = cart.reduce((acc, c) => acc + c.price * c.qty, 0);

    if (totalCount > 0) {
      els.cartBar.classList.remove('hidden');
      els.cartBarCount.textContent = totalCount;
      els.cartBarTotal.textContent = `RM ${subtotal.toFixed(2)}`;
    } else {
      els.cartBar.classList.add('hidden');
      els.cartModal.classList.add('hidden');
    }
  }

  function renderCartModal() {
    if (cart.length === 0) {
      els.cartModal.classList.add('hidden');
      return;
    }

    els.cartItems.innerHTML = cart.map(item => `
      <div class="order-item" style="padding:12px 0; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">
        <div style="flex:1;">
          <div style="font-weight:700; font-size:0.95rem;">${item.name}</div>
          ${item.modifiers.length > 0 ? `<div style="font-size:0.75rem; color:var(--text-secondary);">${item.modifiers.map(m => m.name).join(', ')}</div>` : ''}
          ${item.note ? `<div style="font-size:0.75rem; color:var(--accent); font-style:italic;">Note: ${item.note}</div>` : ''}
          <div style="font-size:0.85rem; color:var(--accent); font-weight:600; margin-top:2px;">RM ${item.price.toFixed(2)}</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="btn-qty" data-cart-id="${item.cartId}" data-delta="-1" style="width:28px; height:28px; border-radius:50%; border:1px solid var(--border); background:var(--bg-primary); color:var(--text-primary); cursor:pointer;">-</button>
          <span style="font-weight:700; min-width:18px; text-align:center;">${item.qty}</span>
          <button class="btn-qty" data-cart-id="${item.cartId}" data-delta="1" style="width:28px; height:28px; border-radius:50%; border:1px solid var(--border); background:var(--bg-primary); color:var(--text-primary); cursor:pointer;">+</button>
        </div>
      </div>
    `).join('');

    const subtotal = cart.reduce((acc, c) => acc + c.price * c.qty, 0);
    const taxRate = restaurant ? (restaurant.tax_rate || 0) : 6.0;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    els.cartSubtotal.textContent = `RM ${subtotal.toFixed(2)}`;
    els.cartTax.textContent = `RM ${tax.toFixed(2)}`;
    els.cartTotal.textContent = `RM ${total.toFixed(2)}`;
    els.btnTotalText.textContent = `RM ${total.toFixed(2)}`;
  }

  async function submitOrder() {
    if (!tableNumber) {
      showToast('⚠️ Please enter your table number first');
      els.tablePromptBanner.classList.remove('hidden');
      els.cartModal.classList.add('hidden');
      els.manualTableInput.focus();
      return;
    }

    if (cart.length === 0) return;

    const subtotal = cart.reduce((acc, c) => acc + c.price * c.qty, 0);
    const taxRate = restaurant ? (restaurant.tax_rate || 0) : 6.0;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    const orderPayload = {
      table: tableNumber,
      dineType: dineType,
      status: 'pending',
      items: cart.map(c => ({
        id: c.id,
        name: c.name,
        price: c.price,
        qty: c.qty,
        modifiers: c.modifiers,
        note: c.note
      })),
      subtotal,
      tax,
      total,
      notes: els.orderSpecialNotes.value.trim()
    };

    els.submitOrderBtn.disabled = true;
    els.submitOrderBtn.textContent = 'Sending to kitchen...';

    try {
      const restId = restaurant ? restaurant.id : window.SmartMenuSupabase.getDefaultRestaurantId();
      const created = await window.SmartMenuDB.createOrder(restId, orderPayload);

      activeOrder = created;
      localStorage.setItem('sm_cust_active_order', JSON.stringify(created));

      // Reset cart
      cart = [];
      updateCartUI();
      els.cartModal.classList.add('hidden');

      // Start Realtime Subscription
      listenToOrderStatus(created.id);

      // Open Tracker
      openTrackerModal(created);
      showToast('✅ Order sent to kitchen!');
    } catch (e) {
      console.error('Order creation error:', e);
      showToast('Could not submit order. Please try again.');
    } finally {
      els.submitOrderBtn.disabled = false;
      els.submitOrderBtn.innerHTML = `<span>Send Order to Kitchen</span> <strong id="btnTotalText">RM ${total.toFixed(2)}</strong>`;
    }
  }

  function checkExistingActiveOrder() {
    const saved = localStorage.getItem('sm_cust_active_order');
    if (saved) {
      try {
        activeOrder = JSON.parse(saved);
        if (activeOrder && activeOrder.status !== 'served' && activeOrder.status !== 'completed' && activeOrder.status !== 'cancelled') {
          showLiveTrackerBanner(activeOrder);
          listenToOrderStatus(activeOrder.id);
        }
      } catch (e) {}
    }
  }

  function showLiveTrackerBanner(order) {
    els.liveTrackerBanner.classList.remove('hidden');
    els.trackerOrderNum.textContent = order.orderNumber || order.id;
    updateTrackerStatusLabels(order.status);
  }

  function updateTrackerStatusLabels(status) {
    const statusTitles = {
      pending: 'Order Received 🕒',
      preparing: 'Preparing in Kitchen 🍳',
      ready: 'Ready for Table 🔔',
      served: 'Enjoy your meal! ✅',
      completed: 'Completed ✅'
    };

    els.trackerStatusText.textContent = statusTitles[status] || status;
    els.trackerModalStatusTitle.textContent = statusTitles[status] || status;

    // Steps highlights
    const steps = {
      pending: 1,
      preparing: 2,
      ready: 3,
      served: 4,
      completed: 4
    };
    const activeStep = steps[status] || 1;

    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById(`step${i}`);
      if (el) {
        el.classList.toggle('active', i <= activeStep);
      }
    }
  }

  function openTrackerModal(order) {
    els.trackerDetailOrderNum.textContent = order.orderNumber || order.id;
    updateTrackerStatusLabels(order.status);

    els.trackerOrderItemsList.innerHTML = (order.items || []).map(i => `
      <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:6px 0; border-bottom:1px solid var(--border);">
        <span>${i.qty}x ${i.name}</span>
        <span style="color:var(--accent); font-weight:600;">RM ${(i.price * i.qty).toFixed(2)}</span>
      </div>
    `).join('');

    els.orderTrackerModal.classList.remove('hidden');
  }

  function listenToOrderStatus(orderId) {
    const restId = restaurant ? restaurant.id : window.SmartMenuSupabase.getDefaultRestaurantId();
    window.SmartMenuDB.subscribeOrders(restId, (payload) => {
      if (payload.new && (payload.new.id === orderId || payload.new.order_number == orderId)) {
        activeOrder.status = payload.new.status;
        localStorage.setItem('sm_cust_active_order', JSON.stringify(activeOrder));
        showLiveTrackerBanner(activeOrder);
        updateTrackerStatusLabels(activeOrder.status);
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      }
    });
  }

  function showToast(msg) {
    els.toastMsg.textContent = msg;
    els.toast.classList.remove('hidden');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => els.toast.classList.add('hidden'), 2500);
  }

  function bindEvents() {
    // Category tabs
    els.categoryTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.cat-tab');
      if (tab) {
        activeCategory = tab.dataset.category;
        renderCategories();
        renderMenu();
      }
    });

    // Menu add clicks
    els.menuGrid.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.btn-add-item');
      if (addBtn) {
        e.stopPropagation();
        handleItemClick(addBtn.dataset.id ? (isNaN(addBtn.dataset.id) ? addBtn.dataset.id : parseInt(addBtn.dataset.id)) : null);
        return;
      }

      const card = e.target.closest('.menu-card');
      if (card) {
        handleItemClick(card.dataset.id ? (isNaN(card.dataset.id) ? card.dataset.id : parseInt(card.dataset.id)) : null);
      }
    });

    // Customizer Modal
    els.closeCustAddonModal.onclick = () => els.addonModal.classList.add('hidden');
    els.confirmCustAddonBtn.onclick = confirmCustomizedItem;

    // Cart Bar & Modal
    els.openCartBtn.onclick = () => {
      renderCartModal();
      els.cartModal.classList.remove('hidden');
    };
    els.closeCartBtn.onclick = () => els.cartModal.classList.add('hidden');

    // Cart Qty changes
    els.cartItems.addEventListener('click', (e) => {
      const qtyBtn = e.target.closest('.btn-qty');
      if (qtyBtn) {
        changeCartQty(qtyBtn.dataset.cartId, parseInt(qtyBtn.dataset.delta));
      }
    });

    // Dine type
    document.querySelectorAll('.dine-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.dine-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        dineType = btn.dataset.type;
      };
    });

    // Manual Table Setting
    els.setTableBtn.onclick = () => {
      const val = els.manualTableInput.value.trim().toUpperCase();
      if (!val) return showToast('Please enter table number');
      tableNumber = val;
      sessionStorage.setItem('sm_cust_table', tableNumber);
      setupTable();
      showToast(`Table ${tableNumber} set`);
    };

    // Submit Order
    els.submitOrderBtn.onclick = submitOrder;

    // Tracker Modal
    els.viewTrackerBtn.onclick = () => {
      if (activeOrder) openTrackerModal(activeOrder);
    };
    els.closeTrackerModal.onclick = () => els.orderTrackerModal.classList.add('hidden');
    els.orderMoreBtn.onclick = () => els.orderTrackerModal.classList.add('hidden');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
