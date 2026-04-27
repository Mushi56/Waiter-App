// ===== Waiter Helper - App Logic =====
(function () {
  'use strict';

  // --- Default Menu ---
  const DEFAULT_MENU = [
    // Wraps
    { id: 1, name: 'Beef Tortilla', price: 18.90, category: 'Wraps', image: 'images/beef_tortilla.png', isHero: true, heroText: 'HOT DEAL' },
    { id: 2, name: 'Chicken Tortilla', price: 14.90, category: 'Wraps', image: null },
    { id: 3, name: 'Zinger Tortilla', price: 18.90, category: 'Wraps', image: null },
    // Burgers
    { id: 4, name: 'Burger Wagyu Truffle', price: 49.90, category: 'Burgers', image: 'images/burger_wagyu_truffle.png', isHero: true, heroText: 'BEST SELLER' },
    { id: 5, name: 'Grill Chicken Burger', price: 22.90, category: 'Burgers', image: null },
    { id: 6, name: 'The Mac Daddy', price: 23.90, category: 'Burgers', image: null },
    { id: 7, name: 'Triple B', price: 23.90, category: 'Burgers', image: null },
    { id: 8, name: 'Triple Stack', price: 36.90, category: 'Burgers', image: null },
    { id: 9, name: 'Zinger', price: 21.90, category: 'Burgers', image: null },
    // Main Course
    { id: 10, name: 'Angus Ribeye Steak', price: 79.00, category: 'Main Course', image: 'images/angus_ribeye_steak.png', isHero: true, heroText: 'PREMIUM' },
    { id: 11, name: 'Fried Chicken Chop', price: 22.90, category: 'Main Course', image: 'images/fried_chicken_chop.png' },
    { id: 12, name: 'Grill Chicken Chop', price: 22.90, category: 'Main Course', image: 'images/grill_chicken_chop.png' },
    { id: 13, name: 'Lamb Grilled', price: 36.90, category: 'Main Course', image: 'images/lamb_grilled.png' },
    { id: 14, name: 'Lamb Grilled 1KG', price: 109.90, category: 'Main Course', image: 'images/lamb_grilled.png' },
    { id: 15, name: 'Lamb Grilled 500g', price: 59.90, category: 'Main Course', image: 'images/lamb_grilled.png' },
    { id: 16, name: 'Mix Platter', price: 38.90, category: 'Main Course', image: 'images/mix_platter.png' },
    // Pasta
    { id: 17, name: 'Aglio Bolognaise', price: 18.90, category: 'Pasta', image: null },
    { id: 18, name: 'Aglio Olio', price: 15.90, category: 'Pasta', image: null },
    { id: 19, name: 'Amatricana', price: 19.90, category: 'Pasta', image: null },
    { id: 20, name: 'Beef Bolognaise', price: 19.90, category: 'Pasta', image: null },
    { id: 21, name: 'Carbonara', price: 19.90, category: 'Pasta', image: null },
    { id: 22, name: 'Garlic Butter Cheese', price: 18.90, category: 'Pasta', image: null },
    { id: 23, name: 'Garlic Butter Cream', price: 18.90, category: 'Pasta', image: null },
    { id: 24, name: 'Mac and Cheese', price: 18.90, category: 'Pasta', image: null },
    { id: 25, name: 'Marinara', price: 16.90, category: 'Pasta', image: null },
    { id: 26, name: 'Tomato Cream', price: 18.90, category: 'Pasta', image: null },
    // Salted Egg
    { id: 27, name: 'Salted Egg Calamari', price: 17.90, category: 'Salted Egg', image: null },
    { id: 28, name: 'Salted Egg Chicken', price: 14.90, category: 'Salted Egg', image: null },
    { id: 29, name: 'Salted Egg Prawn', price: 21.90, category: 'Salted Egg', image: null },
    { id: 30, name: 'Salted Egg Zinger', price: 19.90, category: 'Salted Egg', image: null },
    // Snacks
    { id: 31, name: 'Cheesy Bacon Fries', price: 12.90, category: 'Snacks', image: null },
    { id: 32, name: 'Cheesy Fries', price: 12.90, category: 'Snacks', image: null },
    { id: 33, name: 'Chicken n Fries', price: 12.90, category: 'Snacks', image: null },
    { id: 34, name: 'Onion Rings', price: 9.90, category: 'Snacks', image: null },
    { id: 35, name: 'Plain Fries', price: 7.00, category: 'Snacks', image: null },
    { id: 36, name: 'Sober Cheese Snack', price: 5.00, category: 'Snacks', image: null },
    // Coffee
    { id: 37, name: 'Mocha', price: 12.00, category: 'Coffee', image: null },
    { id: 38, name: 'Latte', price: 10.90, category: 'Coffee', image: null },
    { id: 39, name: 'Americano', price: 7.00, category: 'Coffee', image: null },
    // Non Coffee
    { id: 40, name: 'Chocolate', price: 12.00, category: 'Non Coffee', image: null },
    { id: 41, name: 'Matcha', price: 11.00, category: 'Non Coffee', image: null },
    { id: 42, name: 'Ice Peach Tea', price: 4.00, category: 'Non Coffee', image: null },
    { id: 43, name: 'Ice Passionfruit Tea', price: 4.00, category: 'Non Coffee', image: null },
    { id: 44, name: 'Ice Lemon Tea', price: 4.00, category: 'Non Coffee', image: null },
    // Mocktails
    { id: 45, name: 'Watermelon Blackcurrant', price: 6.90, category: 'Mocktails', image: null },
    { id: 46, name: 'Virgin Mojitos', price: 6.90, category: 'Mocktails', image: null },
    { id: 47, name: 'Tropical Sunrise', price: 6.90, category: 'Mocktails', image: null },
    { id: 48, name: 'TripleBerries', price: 6.90, category: 'Mocktails', image: null },
    { id: 49, name: 'Solero', price: 6.00, category: 'Mocktails', image: null },
    // Desserts
    { id: 50, name: 'Tiramisu', price: 25.00, category: 'Desserts', image: null },
    { id: 51, name: 'Banofee Pie', price: 20.00, category: 'Desserts', image: null },
    { id: 52, name: 'Biscoff Cheese Cake', price: 15.00, category: 'Desserts', image: null },
  ];

  let appCategories = JSON.parse(localStorage.getItem('waiter_categories')) || [
    { name: 'Wraps', emoji: '🌯' }, { name: 'Burgers', emoji: '🍔' },
    { name: 'Main Course', emoji: '🥩' }, { name: 'Pasta', emoji: '🍝' },
    { name: 'Salted Egg', emoji: '🥚' }, { name: 'Snacks', emoji: '🍟' },
    { name: 'Coffee', emoji: '☕' }, { name: 'Non Coffee', emoji: '🧋' },
    { name: 'Mocktails', emoji: '🍹' }, { name: 'Desserts', emoji: '🍰' }
  ];
  let EMOJI_MAP = {};
  function updateEmojiMap() {
    EMOJI_MAP = {};
    appCategories.forEach(c => EMOJI_MAP[c.name] = c.emoji);
  }
  updateEmojiMap();

  function saveCategories() {
    localStorage.setItem('waiter_categories', JSON.stringify(appCategories));
    localStorage.setItem('waiter_addons_data', JSON.stringify(ADDONS_DATA));
    updateEmojiMap();
    renderManageCategories();
    populateCategorySelects();
    renderMenu();
  }

  function renderManageCategories() {
    if (!els.categoriesList) return;
    els.categoriesList.innerHTML = appCategories.map((c, idx) => `
      <div class="drag-item" draggable="true" data-index="${idx}" style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border); margin-bottom:8px; cursor:grab;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="drag-handle" style="color:var(--text-muted); cursor:grab;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="18" x2="16" y2="18"/></svg>
          </div>
          <span><span style="font-size:1.2rem; margin-right:8px;">${c.emoji}</span> <strong>${c.name}</strong></span>
        </div>
        <div style="display:flex; gap: 8px; align-items:center;">
          <button type="button" class="btn-cat-addons" onclick="openCategoryAddons('${c.name}')">Add-ons</button>
          <button type="button" class="btn-cat-remove" onclick="removeCategory(${idx})" ${appCategories.length === 1 ? 'disabled' : ''}>&times;</button>
        </div>
      </div>
    `).join('');
    setupCategoryDragAndDrop();
  }

  function setupCategoryDragAndDrop() {
    const items = els.categoriesList.querySelectorAll('.drag-item');
    items.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        item.classList.add('dragging');
        e.dataTransfer.setData('text/plain', item.dataset.index);
      });
      item.addEventListener('dragend', () => item.classList.remove('dragging'));
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        item.classList.add('drag-over');
      });
      item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.classList.remove('drag-over');
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const toIndex = parseInt(item.dataset.index);
        if (fromIndex !== toIndex) {
          const moved = appCategories.splice(fromIndex, 1)[0];
          appCategories.splice(toIndex, 0, moved);
          saveCategories();
        }
      });
    });
  }

  let currentAddonCategory = null;
  window.openCategoryAddons = (catName) => {
    currentAddonCategory = catName;
    els.categoryAddonsTitle.textContent = `${catName} Add-ons`;
    els.categoryAddonsSubtitle.textContent = `These add-ons will appear for all items in the ${catName} category.`;
    renderCategoryAddons();
    els.categoryAddonsModal.classList.remove('hidden');
  };

  function renderCategoryAddons() {
    const categoryData = ADDONS_DATA[currentAddonCategory] || [];
    const addons = categoryData.length > 0 ? categoryData[0].options : [];
    
    if (addons.length === 0) {
      els.catAddonList.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:0.85rem;">No category add-ons yet</div>';
    } else {
      els.catAddonList.innerHTML = addons.map((addon, idx) => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid var(--border);">
          <span style="font-weight:600; font-size:0.9rem;">${addon.name}</span>
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="accent" style="font-weight:700; font-size:0.85rem;">RM ${addon.price.toFixed(2)}</span>
            <button onclick="removeCategoryAddon(${idx})" style="background:rgba(239,68,68,0.1); color:var(--danger); border:none; border-radius:50%; width:24px; height:24px; cursor:pointer;">&times;</button>
          </div>
        </div>
      `).join('');
    }
  }

  window.removeCategoryAddon = (idx) => {
    if (!ADDONS_DATA[currentAddonCategory]) return;
    ADDONS_DATA[currentAddonCategory][0].options.splice(idx, 1);
    saveCategories();
    renderCategoryAddons();
  };

  window.moveCategory = (idx, dir) => {
    if (idx + dir < 0 || idx + dir >= appCategories.length) return;
    const temp = appCategories[idx];
    appCategories[idx] = appCategories[idx + dir];
    appCategories[idx + dir] = temp;
    saveCategories();
  };

  window.removeCategory = (idx) => {
    if (appCategories.length <= 1) return showToast('Must have at least one category');
    if (confirm(`Remove category "${appCategories[idx].name}"? Items in this category will remain but without a category.`)) {
      appCategories.splice(idx, 1);
      saveCategories();
    }
  };

  function addNewCategory() {
    const name = els.newCategoryName.value.trim();
    const emoji = els.newCategoryEmoji.value.trim() || '🍴';
    if (!name) return showToast('Please enter category name');
    if (appCategories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      return showToast('Category already exists');
    }
    appCategories.push({ name, emoji });
    els.newCategoryName.value = '';
    els.newCategoryEmoji.value = '';
    saveCategories();
    showToast('Category added');
  }

  function addCategoryAddon() {
    if (!currentAddonCategory) return;
    const name = els.catAddonName.value.trim();
    const price = parseFloat(els.catAddonPrice.value);
    if (!name || isNaN(price)) return showToast('Enter name and price');

    if (!ADDONS_DATA[currentAddonCategory]) {
      ADDONS_DATA[currentAddonCategory] = [{ name: 'Add-ons', type: 'checkbox', options: [] }];
    }
    ADDONS_DATA[currentAddonCategory][0].options.push({ name, price });
    els.catAddonName.value = '';
    els.catAddonPrice.value = '';
    saveCategories();
    renderCategoryAddons();
    showToast('Add-on added to category');
  }

  function populateCategorySelects() {
    const opts = appCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    if (els.newItemCategory) els.newItemCategory.innerHTML = opts;
    if (els.editItemCategory) els.editItemCategory.innerHTML = opts;
  }

  // --- State ---
  let menuItems = [];
  let currentOrder = []; // { id, name, price, qty }
  let orders = [];
  let tableNumber = '';
  let activeCategory = 'All';
  let nextMenuId = 100;
  let isAdmin = localStorage.getItem('wh_is_admin') === 'true';

  // --- DOM Refs ---
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    menuGrid: $('#menuGrid'),
    orderItems: $('#orderItems'),
    totalItemsCount: $('#totalItemsCount'),
    totalAmount: $('#totalAmount'),
    tableNumberInput: $('#tableNumberInput'),
    tableSection: $('#tableSection'),
    activeTableBanner: $('#activeTableBanner'),
    activeTableNum: $('#activeTableNum'),
    historyPreviewList: $('#historyPreviewList'),
    ordersFullList: $('#ordersFullList'),
    historyFullList: $('#historyFullList'),
    menuManageGrid: $('#menuManageGrid'),
    toast: $('#toast'),
    toastMsg: $('#toastMsg'),

    // Order bottom sheet & cart
    floatingCartBtn: $('#floatingCartBtn'),
    orderModalOverlay: $('#orderModalOverlay'),
    cartBadge: $('#cartBadge'),
    cartTotalBtn: $('#cartTotalBtn'),
    closeOrderModal: $('#closeOrderModal'),
    orderNote: $('#orderNote'),

    addItemModal: $('#addItemModal'),
    orderDetailModal: $('#orderDetailModal'),
    orderDetailTitle: $('#orderDetailTitle'),
    orderDetailBody: $('#orderDetailBody'),
    newItemName: $('#newItemName'),
    newItemPrice: $('#newItemPrice'),
    newItemCategory: $('#newItemCategory'),
    newItemDesc: $('#newItemDesc'),
    newItemImages: $('#newItemImages'),
    newGalleryPreviews: $('#newGalleryPreviews'),
    // Edit modal
    editItemModal: $('#editItemModal'),
    editItemId: $('#editItemId'),
    editItemName: $('#editItemName'),
    editItemPrice: $('#editItemPrice'),
    editItemCategory: $('#editItemCategory'),
    editItemDesc: $('#editItemDesc'),
    editItemImages: $('#editItemImages'),
    editGalleryPreviews: $('#editGalleryPreviews'),
    // Dynamic Categories & Addons UI
    manageCategoriesBtn: $('#manageCategoriesBtn'),
    manageCategoriesModal: $('#manageCategoriesModal'),
    categoriesList: $('#categoriesList'),
    newCategoryEmoji: $('#newCategoryEmoji'),
    newCategoryName: $('#newCategoryName'),
    addNewCategoryBtn: $('#addNewCategoryBtn'),
    closeCategoriesModal: $('#closeCategoriesModal'),
    // Category Addons Modal
    categoryAddonsModal: $('#categoryAddonsModal'),
    categoryAddonsTitle: $('#categoryAddonsTitle'),
    categoryAddonsSubtitle: $('#categoryAddonsSubtitle'),
    catAddonList: $('#catAddonList'),
    catAddonName: $('#catAddonName'),
    catAddonPrice: $('#catAddonPrice'),
    addCatAddonBtn: $('#addCatAddonBtn'),
    closeCatAddonsModal: $('#closeCatAddonsModal'),
    // Table selection modal
    tableSelectModal: $('#tableSelectModal'),
    tableGridPresets: $('#tableGridPresets'),
    customTableInput: $('#customTableInput'),
    confirmTableBtn: $('#confirmTableBtn'),
    closeTableModal: $('#closeTableModal'),
    // Addon Modal (Customer)
    addonModal: $('#addonModal'),
    // Item Detail (Customer)
    itemDetailOverlay: $('#itemDetailOverlay'),
    itemDetailGallery: $('#itemDetailGallery'),
    itemDetailDots: $('#itemDetailDots'),
    itemDetailCategory: $('#itemDetailCategory'),
    itemDetailName: $('#itemDetailName'),
    itemDetailDesc: $('#itemDetailDesc'),
    itemDetailPrice: $('#itemDetailPrice'),
    itemDetailAddBtn: $('#itemDetailAddBtn'),
    // Hero Slider
    heroSection: $('#heroSection'),
    heroSlider: $('#heroSlider'),
    heroDots: $('#heroDots'),
    newItemIsHero: $('#newItemIsHero'),
    newItemHeroText: $('#newItemHeroText'),
    newItemHeroTextGroup: $('#newItemHeroTextGroup'),
    editItemIsHero: $('#editItemIsHero'),
    editItemHeroText: $('#editItemHeroText'),
    editItemHeroTextGroup: $('#editItemHeroTextGroup'),
    closeCatAddonsBtn: $('#closeCatAddonsBtn'),
    newAddonList: $('#newAddonList'),
    newAddonName: $('#newAddonName'),
    newAddonPrice: $('#newAddonPrice'),
    addNewAddonBtn: $('#addNewAddonBtn'),
    editAddonList: $('#editAddonList'),
    editAddonName: $('#editAddonName'),
    editAddonPrice: $('#editAddonPrice'),
    editNewAddonBtn: $('#editNewAddonBtn'),
    // Addon modal
    addonModal: $('#addonModal'),
    addonTitle: $('#addonTitle'),
    addonList: $('#addonList'),
    // Admin Modal
    adminLoginModal: $('#adminLoginModal'),
    adminPinInput: $('#adminPinInput'),
    // Header & Search
    searchWrap: $('#searchWrap'),
    searchToggleBtn: $('#searchToggleBtn'),
    searchCloseBtn: $('#searchCloseBtn'),
    menuSearchInput: $('#menuSearchInput'),
    // Table select modal
    openTableModalBtn: $('#openTableModalBtn'),
    tableSelectModal: $('#tableSelectModal'),
    closeTableModal: $('#closeTableModal'),
    tableGridPresets: $('#tableGridPresets'),
    customTableInput: $('#customTableInput'),
    confirmTableBtn: $('#confirmTableBtn'),
    addMenuItemFull: $('#addMenuItemFull'),
    activeTableBanner: $('#activeTableBanner'),
    tableManageList: $('#tableManageList'),
    manageTableGroup: $('#manageTableGroup'),
    manageTableInput: $('#manageTableInput'),
    manageAddTableBtn: $('#manageAddTableBtn'),
    // Side drawer
    drawerOverlay: $('#drawerOverlay'),
    menuToggleBtn: $('#menuToggleBtn'),
    drawerItems: $$('.drawer-item'),
    bottomNav: $('#bottomNav'),
    // Item detail sheet (customer UX)
    itemDetailOverlay: $('#itemDetailOverlay'),
    itemDetailGallery: $('#itemDetailGallery'),
    itemDetailDots: $('#itemDetailDots'),
    itemDetailCategory: $('#itemDetailCategory'),
    itemDetailName: $('#itemDetailName'),
    itemDetailDesc: $('#itemDetailDesc'),
    itemDetailPrice: $('#itemDetailPrice'),
    itemDetailAddBtn: $('#itemDetailAddBtn')
  };

  const DEFAULT_TABLE_PRESETS = {
    B: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11'],
    S: ['S1', 'S2', 'S3'],
    L: ['L1', 'L2'],
    Others: []
  };
  let tablePresets = JSON.parse(localStorage.getItem('waiter_table_presets'));
  if (!tablePresets || !tablePresets.B || !tablePresets.S || !tablePresets.L) {
    tablePresets = DEFAULT_TABLE_PRESETS;
  }

  let ADDONS_DATA = JSON.parse(localStorage.getItem('waiter_addons_data')) || {
    'Main Course': [{
      name: 'Add-ons',
      type: 'checkbox',
      options: [
        { name: 'Mac and Cheese', price: 4 },
        { name: 'Extra Grilled/Fried Chicken', price: 12 },
        { name: '2 pcs Beef Bacon', price: 4 },
        { name: 'Mashed Potato', price: 3 },
        { name: 'Extra Brown Sauce', price: 3 },
        { name: 'Plain Rice', price: 2 }
      ]
    }],
    'Pasta': [{
      name: 'Add-ons',
      type: 'checkbox',
      options: [
        { name: 'Grilled Chicken', price: 3 },
        { name: 'Seafood', price: 5 },
        { name: 'Prawn Only', price: 5 },
        { name: 'Squid Only', price: 5 },
        { name: 'Zinger', price: 3 },
        { name: 'Grilled Lamb', price: 13 },
        { name: 'Beef Patty', price: 5 },
        { name: 'Australian Wagyu', price: 20 }
      ]
    }],
    'Burgers': [{
      name: 'Add-ons',
      type: 'checkbox',
      options: [
        { name: 'Mac and Cheese', price: 4 },
        { name: '2 pcs Beef Bacon', price: 3 },
        { name: '3 pcs Onion Ring', price: 2 },
        { name: 'Cheddar Cheese', price: 1 },
        { name: 'Mozarella Cheese', price: 4 },
        { name: 'Truffle Sauce', price: 5 }
      ]
    }]
  };

  // --- Init ---
  function init() {
    loadData();
    applyAdminState();
    populateCategorySelects();
    renderMenu();
    renderHeroSlider();
    renderOrder();
    renderHistoryPreview();
    renderTablePresets();
    bindEvents();
    registerSW();

    // Handle initial hash or back button
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) {
        navigateTo(hash, false);
      } else {
        navigateTo('pageHome', false);
      }
    });

    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (document.getElementById(hash)) {
        navigateTo(hash, false);
      }
    }
    
    initIosInstallPrompt();
    initTheme();
  }

  function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themes = ['dark', 'light', 'auto'];
    let currentTheme = localStorage.getItem('wh_theme') || 'dark';
    
    applyTheme(currentTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentIndex = themes.indexOf(currentTheme);
        currentTheme = themes[(currentIndex + 1) % themes.length];
        localStorage.setItem('wh_theme', currentTheme);
        applyTheme(currentTheme);
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem('wh_theme') === 'auto') {
        applyTheme('auto');
      }
    });
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    const themeStatusText = document.getElementById('themeStatusText');
    const themeIcon = document.getElementById('themeIcon');
    
    const icons = {
      dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
      light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
      auto: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20a10 10 0 1 0 0-20z"/></svg>`
    };

    if (themeStatusText) themeStatusText.textContent = theme;
    if (themeIcon) themeIcon.innerHTML = icons[theme] || icons.dark;

    if (theme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      html.setAttribute('data-theme', theme);
    }
  }

  function initIosInstallPrompt() {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    if (isIos && !isStandalone) {
      if (!sessionStorage.getItem('ios_prompt_dismissed')) {
        setTimeout(() => {
          const prompt = document.getElementById('iosPrompt');
          if (prompt) prompt.classList.remove('hidden');
        }, 3000);
      }
    }

    const closeBtn = document.getElementById('closeIosPrompt');
    const gotItBtn = document.getElementById('iosPromptGotIt');
    const prompt = document.getElementById('iosPrompt');

    if (closeBtn && prompt) {
      closeBtn.onclick = () => {
        prompt.classList.add('hidden');
        sessionStorage.setItem('ios_prompt_dismissed', 'true');
      };
    }
    if (gotItBtn && prompt) {
      gotItBtn.onclick = () => {
        prompt.classList.add('hidden');
        sessionStorage.setItem('ios_prompt_dismissed', 'true');
      };
    }
  }

  // --- LocalStorage ---
  const MENU_VERSION = '5'; // Bumped for Hero Slider data

  function loadData() {
    const storedVersion = localStorage.getItem('wh_menu_version');
    const storedMenu = localStorage.getItem('wh_menu');

    // Reset menu if version changed (new menu data)
    if (storedVersion !== MENU_VERSION) {
      menuItems = [...DEFAULT_MENU];
      saveMenu();
      localStorage.setItem('wh_menu_version', MENU_VERSION);
    } else {
      menuItems = storedMenu ? JSON.parse(storedMenu) : [...DEFAULT_MENU];
      if (!storedMenu) saveMenu();
    }

    const storedOrders = localStorage.getItem('wh_orders');
    orders = storedOrders ? JSON.parse(storedOrders) : [];

    const storedNextId = localStorage.getItem('wh_nextId');
    nextMenuId = storedNextId ? parseInt(storedNextId) : 100;
  }

  function saveMenu() { localStorage.setItem('wh_menu', JSON.stringify(menuItems)); }
  function saveOrders() { localStorage.setItem('wh_orders', JSON.stringify(orders)); }
  function saveNextId() { localStorage.setItem('wh_nextId', nextMenuId.toString()); }

  // --- Admin Logic ---
  function applyAdminState() {
    const adminEls = $$('.admin-only');
    const badge = document.querySelector('.drawer-badge');
    const loginBtn = document.getElementById('adminLoginBtn');

    if (isAdmin) {
      adminEls.forEach(el => el.classList.remove('hidden'));
      if (badge) badge.textContent = 'Admin';
      if (loginBtn) loginBtn.textContent = 'Logout Admin';
    } else {
      adminEls.forEach(el => el.classList.add('hidden'));
      if (badge) badge.textContent = 'Waiter';
      if (loginBtn) loginBtn.textContent = 'Admin Login';
    }
  }

  function toggleAdminLogin() {
    if (isAdmin) {
      isAdmin = false;
      localStorage.removeItem('wh_is_admin');
      applyAdminState();
      showToast('Logged out of Admin mode');
      const activePage = document.querySelector('.page.active');
      if (activePage && (activePage.id === 'pageMenu' || activePage.id === 'pageTables')) {
        navigateTo('pageHome');
      }
      if (typeof closeDrawer === 'function') closeDrawer();
    } else {
      // Close drawer immediately so it doesn't block the modal
      if (typeof closeDrawer === 'function') closeDrawer();

      // Open custom modal instead of prompt
      if (els.adminPinInput) els.adminPinInput.value = '';
      if (els.adminLoginModal) els.adminLoginModal.classList.remove('hidden');
      setTimeout(() => { if (els.adminPinInput) els.adminPinInput.focus(); }, 300);
    }
  }

  function confirmAdminPin() {
    const pin = els.adminPinInput.value;
    if (pin === '77375' || pin === '644056') {
      isAdmin = true;
      localStorage.setItem('wh_is_admin', 'true');
      applyAdminState();
      showToast('Admin Mode Unlocked');
      els.adminLoginModal.classList.add('hidden');
      if (typeof closeDrawer === 'function') closeDrawer();
    } else {
      showToast('⚠️ Incorrect passcode!');
      els.adminPinInput.value = '';
      els.adminPinInput.focus();
    }
  }

  // --- Render Menu Grid ---
  function renderMenu() {
    const categoryTabs = document.getElementById('categoryTabs');
    if (categoryTabs) {
      let tabsHtml = `<button class="cat-tab ${activeCategory === 'All' ? 'active' : ''}" data-category="All">All</button>`;
      appCategories.forEach(c => {
        tabsHtml += `<button class="cat-tab ${activeCategory === c.name ? 'active' : ''}" data-category="${c.name}">${c.name}</button>`;
      });
      categoryTabs.innerHTML = tabsHtml;
    }

    const query = els.menuSearchInput ? els.menuSearchInput.value.toLowerCase().trim() : '';

    let filtered = activeCategory === 'All'
      ? [...menuItems]
      : menuItems.filter((i) => i.category === activeCategory);

    // Apply search filter
    if (query) {
      filtered = filtered.filter(i =>
        i.name.toLowerCase().includes(query) ||
        (i.desc && i.desc.toLowerCase().includes(query))
      );
    }

    if (activeCategory === 'All' && !query) {
      const categoryOrder = appCategories.map(c => c.name);
      filtered.sort((a, b) => {
        let indexA = categoryOrder.indexOf(a.category);
        let indexB = categoryOrder.indexOf(b.category);
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        return indexA - indexB;
      });
    }

    els.menuGrid.innerHTML = filtered.map((item) => {
      const qty = getOrderQty(item.id);
      return `
        <div class="menu-card" data-id="${item.id}">
          <div class="menu-card-qty ${qty > 0 ? 'show' : ''}">${qty}</div>
          ${item.image
          ? `<img class="menu-card-img" src="${item.image}" alt="${item.name}" loading="lazy">`
          : `<div class="menu-card-placeholder">${EMOJI_MAP[item.category] || '🍴'}</div>`
        }
          <div class="menu-card-info">
            <div class="menu-card-name">${item.name}</div>
            <div class="menu-card-bottom">
              <div class="menu-card-price">RM ${item.price.toFixed(2)}</div>
              <button class="menu-card-add" data-id="${item.id}">
                ADD <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </button>
            </div>
          </div>
        </div>`;
    }).join('');

    // Staggered card entrance animation
    requestAnimationFrame(() => {
      els.menuGrid.querySelectorAll('.menu-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 40);
      });
    });
  }

  function renderHeroSlider() {
    if (!els.heroSection || !els.heroSlider) return;
    const heroItems = menuItems.filter(m => m.isHero);
    if (!heroItems.length) {
      els.heroSection.classList.add('hidden');
      return;
    }

    els.heroSection.classList.remove('hidden');
    els.heroSlider.innerHTML = heroItems.map((item, idx) => `
      <div class="hero-card" onclick="openItemDetail(${item.id})">
        <img src="${item.image || 'icons/icon-192.svg'}" alt="${item.name}" class="hero-card-img">
      </div>
    `).join('');

    els.heroDots.innerHTML = heroItems.map((_, idx) => `
      <div class="hero-dot ${idx === 0 ? 'active' : ''}"></div>
    `).join('');

    // Handle scroll update dots
    els.heroSlider.onscroll = () => {
      const scrollPos = els.heroSlider.scrollLeft;
      const card = els.heroSlider.querySelector('.hero-card');
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const activeIdx = Math.round(scrollPos / cardWidth);
      
      const dots = els.heroDots.querySelectorAll('.hero-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    };

    // Auto slide logic
    if (window.heroInterval) clearInterval(window.heroInterval);
    window.heroInterval = setInterval(() => {
      if (document.hidden) return;
      const card = els.heroSlider.querySelector('.hero-card');
      if (!card) return;
      const width = card.offsetWidth;
      let nextScroll = els.heroSlider.scrollLeft + width;
      
      // If at end, loop back
      if (nextScroll >= els.heroSlider.scrollWidth - els.heroSlider.offsetWidth) {
        nextScroll = 0;
      }
      
      els.heroSlider.scrollTo({ left: nextScroll, behavior: 'smooth' });
    }, 4000);
  }

  function getOrderQty(id) {
    const found = currentOrder.find((o) => o.id === id);
    return found ? found.qty : 0;
  }

  // --- Render Order List ---
  function renderOrder() {
    if (currentOrder.length === 0) {
      els.orderItems.innerHTML = '<div class="order-empty">No items added yet. Tap menu items to start.</div>';
      els.totalItemsCount.textContent = '0';
      els.totalAmount.textContent = 'RM 0.00';
      if (els.cartBadge) els.cartBadge.textContent = '0';
      if (els.cartTotalBtn) els.cartTotalBtn.textContent = 'RM 0.00';
      if (els.floatingCartBtn) els.floatingCartBtn.classList.add('hidden');
      if (els.orderModalOverlay) els.orderModalOverlay.classList.add('hidden');
      return;
    }

    if (els.floatingCartBtn) els.floatingCartBtn.classList.remove('hidden');

    let totalQty = 0, totalPrice = 0;
    els.orderItems.innerHTML = currentOrder.map((item) => {
      totalQty += item.qty;
      totalPrice += item.price * item.qty;

      const menuItem = menuItems.find(m => m.id === item.id);
      const category = item.category || (menuItem ? menuItem.category : '');
      const canEditAddons = (menuItem && menuItem.addons && menuItem.addons.length > 0) || ADDONS_DATA[category];

      const modText = item.modifiers && item.modifiers.length > 0 ? `<br><span style="color:var(--text-secondary);font-size:0.75rem;">+ ${item.modifiers.map(m => m.name).join(', ')}</span>` : '';

      const editAddonBtn = canEditAddons ? `
        <button class="order-item-edit-addons" data-cart-id="${item.cartItemId}" data-action="edit-addons" title="Edit Add-ons">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>` : '';

      return `
        <div class="order-item">
          <div class="order-item-controls">
            <button class="qty-btn minus" data-cart-id="${item.cartItemId}" data-action="dec">−</button>
            <span class="order-item-qty">${item.qty}</span>
            <button class="qty-btn" data-cart-id="${item.cartItemId}" data-action="inc">+</button>
          </div>
          <span class="order-item-name">${item.name}${modText}</span>
          <span class="order-item-price">RM ${(item.price * item.qty).toFixed(2)}</span>
          <div class="order-item-actions">
            ${editAddonBtn}
            <button class="order-item-delete" data-cart-id="${item.cartItemId}" data-action="remove">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </button>
          </div>
        </div>`;
    }).join('');

    els.totalItemsCount.textContent = totalQty;
    els.totalAmount.textContent = `RM ${totalPrice.toFixed(2)}`;
    if (els.cartBadge) els.cartBadge.textContent = totalQty;
    if (els.cartTotalBtn) els.cartTotalBtn.textContent = `RM ${totalPrice.toFixed(2)}`;
  }

  // --- Add to Order ---
  let pendingAddonItem = null;
  let editingCartItemId = null;

  function addToOrder(id) {
    const menuItem = menuItems.find((m) => m.id === id);
    if (!menuItem) return;

    if ((menuItem.modifierGroups && menuItem.modifierGroups.length > 0) || ADDONS_DATA[menuItem.category]) {
      openAddonModal(menuItem);
    } else {
      addCartItem(menuItem, []);
    }
  }

  function openAddonModal(menuItem, existingModifiers = []) {
    pendingAddonItem = menuItem;
    els.addonTitle.textContent = editingCartItemId ? `Edit ${menuItem.name} Options` : `${menuItem.name} Options`;

    const modifierGroups = (menuItem.modifierGroups && menuItem.modifierGroups.length > 0) ? menuItem.modifierGroups : (ADDONS_DATA[menuItem.category] || []);

    els.addonList.innerHTML = modifierGroups.map((group, gIdx) => {
      const optionsHtml = group.options.map((opt, oIdx) => {
        const isChecked = existingModifiers.some(m => m.name === opt.name) ? 'checked' : '';
        const inputType = group.type === 'radio' ? 'radio' : 'checkbox';
        const inputName = group.type === 'radio' ? `name="modGroup_${gIdx}"` : '';
        return `
          <div class="addon-item">
            <label>
              <input type="${inputType}" ${inputName} value="${gIdx}_${oIdx}" data-gidx="${gIdx}" data-oidx="${oIdx}" ${isChecked}>
              <span class="addon-name">${opt.name}</span>
            </label>
            <span class="addon-price">+RM ${opt.price.toFixed(2)}</span>
          </div>`;
      }).join('');

      return `
        <div class="addon-group">
          <h4 class="addon-group-title">
            <span>${group.name}</span> 
            <span class="addon-group-subtitle">${group.type === 'radio' ? '(Select 1)' : '(Optional)'}</span>
          </h4>
          <div class="addon-group-options">
            ${optionsHtml}
          </div>
        </div>
      `;
    }).join('');

    els.addonModal.classList.remove('hidden');
  }

  function openEditAddonModal(cartItemId) {
    const cartItem = currentOrder.find(o => o.cartItemId === cartItemId);
    if (!cartItem) return;

    const menuItem = menuItems.find(m => m.id === cartItem.id);
    if (!menuItem) return;

    editingCartItemId = cartItemId;
    openAddonModal(menuItem, cartItem.modifiers || []);
  }

  function confirmAddons() {
    if (!pendingAddonItem) return;
    const modifierGroups = (pendingAddonItem.modifierGroups && pendingAddonItem.modifierGroups.length > 0) ? pendingAddonItem.modifierGroups : (ADDONS_DATA[pendingAddonItem.category] || []);

    const inputs = els.addonList.querySelectorAll('input:checked');
    const selectedAddons = Array.from(inputs).map(input => {
      const gIdx = parseInt(input.dataset.gidx);
      const oIdx = parseInt(input.dataset.oidx);
      return modifierGroups[gIdx].options[oIdx];
    });

    if (editingCartItemId) {
      updateCartItemModifiers(editingCartItemId, selectedAddons);
    } else {
      addCartItem(pendingAddonItem, selectedAddons);
    }

    els.addonModal.classList.add('hidden');
    pendingAddonItem = null;
    editingCartItemId = null;
  }

  function addCartItem(menuItem, modifiers) {
    const modifiersKey = modifiers.map(m => m.name).sort().join('|');
    const existing = currentOrder.find(o => o.id === menuItem.id && (o.modifiersKey || '') === modifiersKey);

    if (existing) {
      existing.qty++;
    } else {
      const unitPrice = menuItem.price + modifiers.reduce((s, m) => s + m.price, 0);
      currentOrder.push({
        cartItemId: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        id: menuItem.id,
        name: menuItem.name,
        category: menuItem.category,
        price: unitPrice,
        qty: 1,
        description: '',
        modifiers: modifiers,
        modifiersKey: modifiersKey
      });
    }

    renderOrder();
    renderMenu();
    hapticFeedback();

    // Pulse floating cart
    if (els.floatingCartBtn) {
      els.floatingCartBtn.classList.remove('pulse');
      void els.floatingCartBtn.offsetWidth;
      els.floatingCartBtn.classList.add('pulse');
      setTimeout(() => els.floatingCartBtn.classList.remove('pulse'), 600);
    }

    // Animate card
    const card = els.menuGrid.querySelector(`.menu-card[data-id="${menuItem.id}"]`);
    if (card) {
      card.classList.remove('added');
      void card.offsetWidth;
      card.classList.add('added');
    }
  }

  function updateCartItemModifiers(cartItemId, modifiers) {
    const idx = currentOrder.findIndex(o => o.cartItemId === cartItemId);
    if (idx === -1) return;

    const menuItem = menuItems.find(m => m.id === currentOrder[idx].id);
    if (!menuItem) return;

    const modifiersKey = modifiers.map(m => m.name).sort().join('|');
    const unitPrice = menuItem.price + modifiers.reduce((s, m) => s + m.price, 0);

    currentOrder[idx].modifiers = modifiers;
    currentOrder[idx].modifiersKey = modifiersKey;
    currentOrder[idx].price = unitPrice;

    renderOrder();
    showToast('Add-ons updated');
  }

  function changeQty(cartItemId, action) {
    const idx = currentOrder.findIndex((o) => o.cartItemId === cartItemId);
    if (idx === -1) return;

    if (action === 'inc') {
      currentOrder[idx].qty++;
    } else if (action === 'dec') {
      currentOrder[idx].qty--;
      if (currentOrder[idx].qty <= 0) currentOrder.splice(idx, 1);
    } else if (action === 'remove') {
      currentOrder.splice(idx, 1);
    }

    renderOrder();
    renderMenu();
  }

  // --- Save Order ---
  function saveOrder() {
    if (!tableNumber) {
      showToast('⚠️ Please set a table number first!');
      els.tableNumberInput.focus();
      return;
    }
    if (currentOrder.length === 0) {
      showToast('⚠️ Order is empty!');
      return;
    }

    const totalQty = currentOrder.reduce((s, i) => s + i.qty, 0);
    const totalPrice = currentOrder.reduce((s, i) => s + i.price * i.qty, 0);

    const order = {
      id: Date.now(),
      table: tableNumber,
      items: [...currentOrder],
      note: els.orderNote ? els.orderNote.value.trim() : '',
      totalQty,
      totalPrice,
      timestamp: new Date().toISOString(),
    };

    orders.unshift(order);
    saveOrders();

    currentOrder = [];
    if (els.orderNote) els.orderNote.value = '';
    changeTable();
    renderOrder();
    renderMenu();
    renderHistoryPreview();
    if (els.orderModalOverlay) els.orderModalOverlay.classList.add('hidden');
    showToast('✅ Order saved successfully!');
  }

  // --- Render History ---
  function renderHistoryPreview() {
    if (!els.historyPreviewList) return;
    const recent = orders.slice(0, 3);
    if (recent.length === 0) {
      els.historyPreviewList.innerHTML = '<div class="history-empty">No orders yet</div>';
      return;
    }
    els.historyPreviewList.innerHTML = recent.map((o) => buildHistoryCard(o)).join('');
  }

  function renderOrdersPage() {
    if (orders.length === 0) {
      els.ordersFullList.innerHTML = '<div class="history-empty">No orders yet</div>';
      return;
    }
    els.ordersFullList.innerHTML = orders.map((o) => buildHistoryCard(o)).join('');
  }

  function renderHistoryPage() {
    if (orders.length === 0) {
      els.historyFullList.innerHTML = '<div class="history-empty">No history yet</div>';
      return;
    }
    els.historyFullList.innerHTML = orders.map((o) => buildHistoryCard(o)).join('');
  }

  function buildHistoryCard(order) {
    const d = new Date(order.timestamp);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    return `
      <div class="history-card" data-order-id="${order.id}">
        <div class="history-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7A01E" stroke-width="2">
            <rect x="3" y="3" width="18" height="12" rx="2"/><line x1="7" y1="19" x2="7" y2="15"/><line x1="17" y1="19" x2="17" y2="15"/>
          </svg>
        </div>
        <div class="history-info">
          <div class="history-table">Table ${order.table}</div>
          <div class="history-meta">${dateStr} • ${timeStr}<br>Items: ${order.totalQty} • RM ${order.totalPrice.toFixed(2)}</div>
        </div>
        <div class="history-actions">
           <button class="history-btn-edit" data-order-id="${order.id}" data-action="edit-saved-order" title="Edit Order">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
           </button>
           <button class="history-btn-delete" data-order-id="${order.id}" data-action="delete-saved-order" title="Delete Order">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
           </button>
        </div>
      </div>`;
  }

  function showOrderDetail(orderId) {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    els.orderDetailTitle.textContent = `Table ${order.table}`;
    const d = new Date(order.timestamp);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    let html = `<div class="detail-row"><span class="detail-label">Date</span><span>${dateStr} • ${timeStr}</span></div>`;
    if (order.note) {
      html += `<div class="detail-row" style="background:rgba(231,160,30,0.08);padding:10px;border-radius:var(--radius-sm);margin:8px 0;"><span class="detail-label" style="color:var(--accent)">General Note</span><span style="font-style:italic;">${order.note}</span></div>`;
    }
    html += `<div class="detail-row" style="font-weight:600;margin-top:8px"><span>Item</span><span>Qty × Price</span></div>`;
    order.items.forEach((item) => {
      let modText = item.modifiers && item.modifiers.length > 0 ? `<br><small style="color:var(--text-secondary);font-size:0.75rem;">+ ${item.modifiers.map(m => m.name).join(', ')}</small>` : '';
      html += `<div class="detail-row"><span>${item.name}${modText}</span><span>${item.qty} × RM ${item.price.toFixed(2)} = RM ${(item.qty * item.price).toFixed(2)}</span></div>`;
    });
    html += `<div class="detail-row detail-total"><span>Total</span><span>RM ${order.totalPrice.toFixed(2)}</span></div>`;
    els.orderDetailBody.innerHTML = html;
    els.orderDetailModal.classList.remove('hidden');
  }

  function editOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    if (currentOrder.length > 0) {
      if (!confirm('You have items in your current order. Replace them with this saved order?')) return;
    }

    // Load order into active state
    tableNumber = order.table;
    els.activeTableNum.textContent = tableNumber;
    els.tableSection.classList.add('hidden');
    els.activeTableBanner.classList.remove('hidden');
    els.tableNumberInput.value = tableNumber;

    currentOrder = JSON.parse(JSON.stringify(order.items)); // Deep copy
    if (els.orderNote) els.orderNote.value = order.note || '';

    // Remove old order from history
    orders = orders.filter(o => o.id !== orderId);
    saveOrders();

    renderOrder();
    renderMenu();
    renderHistoryPreview();
    renderOrdersPage();
    renderHistoryPage();

    navigateTo('pageHome');
    els.orderModalOverlay.classList.remove('hidden');
    showToast('Order loaded for editing');
  }

  function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) return;
    orders = orders.filter(o => o.id !== orderId);
    saveOrders();
    renderHistoryPreview();
    renderOrdersPage();
    renderHistoryPage();
    showToast('Order deleted');
  }

  function clearAllOrders() {
    if (orders.length === 0) return showToast('No orders to clear');
    if (!confirm('Are you sure you want to clear all active orders?')) return;
    orders = [];
    saveOrders();
    renderHistoryPreview();
    renderOrdersPage();
    renderHistoryPage();
    showToast('All orders cleared');
  }

  function clearHistory() {
    if (orders.length === 0) return showToast('No history to clear');
    if (!confirm('Are you sure you want to clear the entire history?')) return;
    orders = [];
    saveOrders();
    renderHistoryPreview();
    renderOrdersPage();
    renderHistoryPage();
    showToast('Order history cleared');
  }

  // --- Menu Management ---
  function renderMenuManage() {
    els.menuManageGrid.innerHTML = menuItems.map((item) => {
      const desc = item.description ? `<div class="manage-card-desc">${item.description}</div>` : '';
      return `
      <div class="manage-card">
        <div class="manage-card-actions">
          <button class="manage-card-edit" data-edit-id="${item.id}" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="manage-card-delete" data-del-id="${item.id}" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          </button>
        </div>
        ${item.image
          ? `<img class="manage-card-img" src="${item.image}" alt="${item.name}" loading="lazy">`
          : `<div class="manage-card-placeholder">${EMOJI_MAP[item.category] || '🍴'}</div>`
        }
        <div class="manage-card-info">
          <div class="manage-card-name">${item.name}</div>
          <div class="manage-card-cat">${item.category}</div>
          ${desc}
          <div class="manage-card-price">RM ${item.price.toFixed(2)}</div>
        </div>
      </div>`;
    }).join('');
  }

  // --- Canvas Auto Crop 1:1 ---
  function autoCropSquare(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const size = 500;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          const minDim = Math.min(img.width, img.height);
          const startX = (img.width - minDim) / 2;
          const startY = (img.height - minDim) / 2;
          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, size, size);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // --- Add New Menu Item ---
  let pendingGallery = [];

  els.newItemImages.addEventListener('change', async (e) => {
    for (let file of e.target.files) {
      if (!file.type.startsWith('image/')) continue;
      const croppedData = await autoCropSquare(file);
      pendingGallery.push({ id: Date.now() + Math.random(), data: croppedData, isThumbnail: pendingGallery.length === 0 });
    }
    renderNewGallery();
    e.target.value = '';
  });

  function renderNewGallery() {
    els.newGalleryPreviews.innerHTML = pendingGallery.map((img, i) => `
      <div class="gallery-preview-item ${img.isThumbnail ? 'thumbnail' : ''}" onclick="setNewThumbnail(${i})">
        <img src="${img.data}" alt="Preview">
        <button class="gallery-preview-remove" onclick="removeNewGalleryImage(event, ${i})">×</button>
      </div>
    `).join('');
  }

  window.setNewThumbnail = (index) => {
    pendingGallery.forEach(img => img.isThumbnail = false);
    if (pendingGallery[index]) pendingGallery[index].isThumbnail = true;
    renderNewGallery();
  };

  window.removeNewGalleryImage = (e, index) => {
    e.stopPropagation();
    const wasThumb = pendingGallery[index].isThumbnail;
    pendingGallery.splice(index, 1);
    if (wasThumb && pendingGallery.length > 0) pendingGallery[0].isThumbnail = true;
    renderNewGallery();
  };

  let pendingModifierGroups = [];
  function renderNewModifierGroups() {
    const listEl = document.getElementById('newModifierGroupsList');
    if (!listEl) return;
    listEl.innerHTML = pendingModifierGroups.map((group, gIdx) => `
      <div style="background:var(--bg-card); padding:12px; border:1px solid var(--border); border-radius:var(--radius-md);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <strong>${group.name}</strong> 
            <span style="font-size:0.75rem; color:var(--text-secondary); background:var(--bg-secondary); padding:2px 6px; border-radius:12px; margin-left:6px;">${group.type === 'radio' ? 'Single Choice' : 'Multiple Choice'}</span>
          </div>
          <button type="button" onclick="removeNewGroup(${gIdx})" style="color:var(--danger); background:none; border:none; cursor:pointer; font-size:1.2rem;">&times;</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
          ${group.options.map((opt, oIdx) => `
            <div class="modifier-list-item">
              <span>${opt.name} <span class="text-muted" style="margin-left:4px;">(+RM ${opt.price.toFixed(2)})</span></span>
              <button type="button" class="btn-remove-sm" onclick="removeNewGroupOption(${gIdx}, ${oIdx})">&times;</button>
            </div>
          `).join('')}
        </div>
        <div style="display:flex; gap:8px;">
          <input type="text" id="newOptName_${gIdx}" placeholder="Option name" style="flex:1; padding:6px; font-size:0.9rem; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg-primary); color:var(--text-primary);">
          <input type="number" id="newOptPrice_${gIdx}" placeholder="+RM 0" style="width:70px; padding:6px; font-size:0.9rem; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg-primary); color:var(--text-primary);" step="0.01">
          <button type="button" onclick="addNewGroupOption(${gIdx})" class="btn-accent" style="padding:0 12px; font-size:0.85rem; border-radius:var(--radius-sm);">Add Option</button>
        </div>
      </div>
    `).join('');
  }

  window.removeNewGroup = (gIdx) => {
    pendingModifierGroups.splice(gIdx, 1);
    renderNewModifierGroups();
  };

  window.removeNewGroupOption = (gIdx, oIdx) => {
    pendingModifierGroups[gIdx].options.splice(oIdx, 1);
    renderNewModifierGroups();
  };

  window.addNewGroupOption = (gIdx) => {
    const nameInput = document.getElementById(`newOptName_${gIdx}`);
    const priceInput = document.getElementById(`newOptPrice_${gIdx}`);
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value) || 0;
    if (!name) return showToast('Please enter an option name');

    pendingModifierGroups[gIdx].options.push({ name, price });
    renderNewModifierGroups();
  };

  function openAddItemModal() {
    els.newItemName.value = '';
    els.newItemPrice.value = '';
    els.newItemCategory.value = 'Wraps';
    els.newItemDesc.value = '';
    const newGroupName = document.getElementById('newGroupName');
    if (newGroupName) newGroupName.value = '';
    pendingGallery = [];
    pendingModifierGroups = [];
    renderNewGallery();
    renderNewModifierGroups();
    if (els.newItemIsHero) els.newItemIsHero.checked = false;
    if (els.newItemHeroText) els.newItemHeroText.value = '';
    if (els.newItemHeroTextGroup) els.newItemHeroTextGroup.style.display = 'none';
    els.addItemModal.classList.remove('hidden');
    setTimeout(() => els.newItemName.focus(), 300);
  }

  function confirmAddItem() {
    const name = els.newItemName.value.trim();
    const price = parseFloat(els.newItemPrice.value);
    const category = els.newItemCategory.value;
    const description = els.newItemDesc.value.trim();

    if (!name) { showToast('⚠️ Please enter item name'); return; }
    if (isNaN(price) || price <= 0) { showToast('⚠️ Please enter a valid price'); return; }

    const thumbImg = pendingGallery.find(g => g.isThumbnail);
    const newItem = {
      id: nextMenuId++,
      name, price, category, description,
      modifierGroups: JSON.parse(JSON.stringify(pendingModifierGroups)),
      image: thumbImg ? thumbImg.data : null,
      gallery: pendingGallery.map(g => g.data),
      isHero: els.newItemIsHero ? els.newItemIsHero.checked : false,
      heroText: els.newItemHeroText ? els.newItemHeroText.value.trim() : ''
    };

    menuItems.push(newItem);
    saveMenu();
    saveNextId();

    renderMenu();
    renderHeroSlider();
    renderMenuManage();
    els.addItemModal.classList.add('hidden');
    showToast('✅ Item added!');
  }

  // --- Edit Menu Item ---
  let editPendingGallery = [];

  els.editItemImages.addEventListener('change', async (e) => {
    for (let file of e.target.files) {
      if (!file.type.startsWith('image/')) continue;
      const croppedData = await autoCropSquare(file);
      editPendingGallery.push({ id: Date.now() + Math.random(), data: croppedData, isThumbnail: editPendingGallery.length === 0 });
    }
    renderEditGallery();
    e.target.value = '';
  });

  function renderEditGallery() {
    els.editGalleryPreviews.innerHTML = editPendingGallery.map((img, i) => `
      <div class="gallery-preview-item ${img.isThumbnail ? 'thumbnail' : ''}" onclick="setEditThumbnail(${i})">
        <img src="${img.data}" alt="Preview">
        <button class="gallery-preview-remove" onclick="removeEditGalleryImage(event, ${i})">×</button>
      </div>
    `).join('');
  }

  window.setEditThumbnail = (index) => {
    editPendingGallery.forEach(img => img.isThumbnail = false);
    if (editPendingGallery[index]) editPendingGallery[index].isThumbnail = true;
    renderEditGallery();
  };

  window.removeEditGalleryImage = (e, index) => {
    e.stopPropagation();
    const wasThumb = editPendingGallery[index].isThumbnail;
    editPendingGallery.splice(index, 1);
    if (wasThumb && editPendingGallery.length > 0) editPendingGallery[0].isThumbnail = true;
    renderEditGallery();
  };

  let editPendingModifierGroups = [];

  function renderEditModifierGroups() {
    const listEl = document.getElementById('editModifierGroupsList');
    if (!listEl) return;
    listEl.innerHTML = editPendingModifierGroups.map((group, gIdx) => `
      <div style="background:var(--bg-card); padding:12px; border:1px solid var(--border); border-radius:var(--radius-md);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <strong>${group.name}</strong> 
            <span style="font-size:0.75rem; color:var(--text-secondary); background:var(--bg-secondary); padding:2px 6px; border-radius:12px; margin-left:6px;">${group.type === 'radio' ? 'Single Choice' : 'Multiple Choice'}</span>
          </div>
          <button type="button" onclick="removeEditGroup(${gIdx})" style="color:var(--danger); background:none; border:none; cursor:pointer; font-size:1.2rem;">&times;</button>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
          ${group.options.map((opt, oIdx) => `
            <div class="modifier-list-item">
              <span>${opt.name} <span class="text-muted" style="margin-left:4px;">(+RM ${opt.price.toFixed(2)})</span></span>
              <button type="button" class="btn-remove-sm" onclick="removeEditGroupOption(${gIdx}, ${oIdx})">&times;</button>
            </div>
          `).join('')}
        </div>
        <div style="display:flex; gap:8px;">
          <input type="text" id="editOptName_${gIdx}" placeholder="Option name" style="flex:1; padding:6px; font-size:0.9rem; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg-primary); color:var(--text-primary);">
          <input type="number" id="editOptPrice_${gIdx}" placeholder="+RM 0" style="width:70px; padding:6px; font-size:0.9rem; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg-primary); color:var(--text-primary);" step="0.01">
          <button type="button" onclick="addEditGroupOption(${gIdx})" class="btn-accent" style="padding:0 12px; font-size:0.85rem; border-radius:var(--radius-sm);">Add Option</button>
        </div>
      </div>
    `).join('');
  }

  window.removeEditGroup = (gIdx) => {
    editPendingModifierGroups.splice(gIdx, 1);
    renderEditModifierGroups();
  };

  window.removeEditGroupOption = (gIdx, oIdx) => {
    editPendingModifierGroups[gIdx].options.splice(oIdx, 1);
    renderEditModifierGroups();
  };

  window.addEditGroupOption = (gIdx) => {
    const nameInput = document.getElementById(`editOptName_${gIdx}`);
    const priceInput = document.getElementById(`editOptPrice_${gIdx}`);
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value) || 0;
    if (!name) return showToast('Please enter an option name');

    editPendingModifierGroups[gIdx].options.push({ name, price });
    renderEditModifierGroups();
  };

  function openEditItemModal(id) {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;

    els.editItemId.value = id;
    els.editItemName.value = item.name;
    els.editItemPrice.value = item.price;
    els.editItemCategory.value = item.category;
    els.editItemDesc.value = item.description || '';

    editPendingGallery = [];
    if (item.gallery && item.gallery.length > 0) {
      editPendingGallery = item.gallery.map((g, i) => ({ id: i, data: g, isThumbnail: g === item.image }));
    } else if (item.image) {
      editPendingGallery.push({ id: 0, data: item.image, isThumbnail: true });
    }
    renderEditGallery();

    editPendingModifierGroups = item.modifierGroups ? JSON.parse(JSON.stringify(item.modifierGroups)) : [];
    const editGroupName = document.getElementById('editGroupName');
    if (editGroupName) editGroupName.value = '';
    renderEditModifierGroups();

    if (els.editItemIsHero) {
      els.editItemIsHero.checked = !!item.isHero;
      if (els.editItemHeroTextGroup) els.editItemHeroTextGroup.style.display = item.isHero ? 'flex' : 'none';
    }
    if (els.editItemHeroText) els.editItemHeroText.value = item.heroText || '';

    els.editItemModal.classList.remove('hidden');
    setTimeout(() => els.editItemName.focus(), 300);
  }

  function confirmEditItem() {
    const id = parseInt(els.editItemId.value);
    const name = els.editItemName.value.trim();
    const price = parseFloat(els.editItemPrice.value);
    const category = els.editItemCategory.value;
    const description = els.editItemDesc.value.trim();

    if (!name) { showToast('⚠️ Please enter item name'); return; }
    if (isNaN(price) || price <= 0) { showToast('⚠️ Please enter a valid price'); return; }

    const item = menuItems.find((m) => m.id === id);
    if (!item) return;

    item.name = name;
    item.price = price;
    item.category = category;
    item.description = description;
    item.modifierGroups = JSON.parse(JSON.stringify(editPendingModifierGroups));

    const thumbImg = editPendingGallery.find(g => g.isThumbnail);
    item.image = thumbImg ? thumbImg.data : null;
    item.gallery = editPendingGallery.map(g => g.data);
    item.isHero = els.editItemIsHero ? els.editItemIsHero.checked : false;
    item.heroText = els.editItemHeroText ? els.editItemHeroText.value.trim() : '';

    // Also update price in current order if present
    const orderItemsToUpdate = currentOrder.filter((o) => o.id === id);
    orderItemsToUpdate.forEach((o) => {
      o.name = name;
      o.price = price + (o.modifiers ? o.modifiers.reduce((s, m) => s + m.price, 0) : 0);
    });

    saveMenu();
    renderMenu();
    renderHeroSlider();
    renderOrder();
    renderMenuManage();
    els.editItemModal.classList.add('hidden');
    showToast('✅ Item updated!');
  }

  function deleteMenuItem(id) {
    menuItems = menuItems.filter((m) => m.id !== id);
    currentOrder = currentOrder.filter((o) => o.id !== id);
    saveMenu();
    renderMenu();
    renderHeroSlider();
    renderOrder();
    renderMenuManage();
    showToast('Item removed');
  }

  // --- Table Management ---
  function saveTablePresets() {
    localStorage.setItem('waiter_table_presets', JSON.stringify(tablePresets));
  }

  function renderTablePresets() {
    if (!els.tableGridPresets) return;
    let html = '';
    Object.keys(tablePresets).forEach((group) => {
      tablePresets[group].forEach((table) => {
        html += `<button class="table-btn" data-table="${table}">${table}</button>`;
      });
    });
    els.tableGridPresets.innerHTML = html || '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">No tables added yet. Add them in Management.</div>';

    // Bind clicks to the newly created table buttons
    els.tableGridPresets.querySelectorAll('.table-btn').forEach(btn => {
      btn.onclick = () => {
        setTable(btn.dataset.table);
      };
    });
  }

  function renderTableManageList() {
    if (!els.tableManageList) return;
    let html = '';
    for (const [group, tables] of Object.entries(tablePresets)) {
      if (tables && tables.length > 0) {
        html += `
          <div class="table-manage-group" style="margin-bottom: 20px;">
            <h4 style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">${group} Tables</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
              ${tables.map(t => `
                <div style="background: var(--bg-primary); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between;">
                  <span style="font-size: 0.85rem; font-weight: 600;">${t}</span>
                  <button class="btn-delete-table-sm" data-group="${group}" data-table="${t}" style="background: transparent; border: none; color: var(--danger); cursor: pointer; display: flex; align-items: center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
    }
    els.tableManageList.innerHTML = html || '<div style="text-align: center; color: var(--text-muted);">No tables found</div>';
  }

  function addTableToPresets(val, specificGroup = null) {
    if (!val) return;
    val = val.trim().toUpperCase();

    let added = false;
    let group = specificGroup;

    if (!group) {
      const prefix = val.charAt(0);
      group = tablePresets[prefix] ? prefix : 'Others';
    }

    if (!tablePresets[group].includes(val)) {
      tablePresets[group].push(val);
      // Sort if numeric-ish
      tablePresets[group].sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
      added = true;
    }

    if (added) {
      saveTablePresets();
      renderTablePresets();
      renderTableManageList();
      showToast(`Table ${val} added to ${group}`);
    }
    return added;
  }

  function deleteTable(group, val) {
    if (tablePresets[group]) {
      const idx = tablePresets[group].indexOf(val);
      if (idx !== -1) {
        tablePresets[group].splice(idx, 1);
        saveTablePresets();
        renderTablePresets();
        renderTableManageList();
        showToast(`Table ${val} removed`);
      }
    }
  }



  // --- Navigation ---
  function navigateTo(pageId, updateHash = true) {
    $$('.page').forEach((p) => p.classList.remove('active'));
    const target = $(`#${pageId}`);
    if (target) target.classList.add('active');

    $$('.nav-btn, .drawer-item').forEach((b) => b.classList.remove('active'));
    $$(`[data-page="${pageId}"]`).forEach(el => el.classList.add('active'));

    if (pageId === 'pageOrders') renderOrdersPage();
    if (pageId === 'pageTables') renderTableManageList();
    if (pageId === 'pageMenu') renderMenuManage();
    if (pageId === 'pageHistory') renderHistoryPage();

    if (pageId === 'pageAbout' || pageId === 'pagePrivacy' || pageId === 'pageTerms') {
      if (els.bottomNav) els.bottomNav.classList.add('hidden');
    } else {
      if (els.bottomNav) els.bottomNav.classList.remove('hidden');
    }

    if (updateHash) {
      window.location.hash = pageId;
    }

    closeDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Expose to window for inline onclicks
  window.navigateTo = navigateTo;

  function toggleDrawer() {
    els.drawerOverlay.classList.toggle('hidden');
  }

  function closeDrawer() {
    if (els.drawerOverlay) els.drawerOverlay.classList.add('hidden');
  }

  // --- Table Number ---
  function setTable(val) {
    const tableVal = val || (els.customTableInput ? els.customTableInput.value.trim() : '');
    if (!tableVal) {
      showToast('⚠️ Please enter or select a table number');
      return;
    }

    tableNumber = tableVal.toUpperCase();
    localStorage.setItem('waiter_table_number', tableNumber);

    // Update Banner
    if (els.activeTableBanner) {
      els.activeTableBanner.classList.remove('hidden');
      const tableIdEl = els.activeTableBanner.querySelector('.table-id');
      if (tableIdEl) tableIdEl.textContent = tableNumber;
    }

    // Hide selection button
    if (els.tableSection) els.tableSection.classList.add('hidden');

    // Close Modal
    if (els.tableSelectModal) els.tableSelectModal.classList.add('hidden');
    if (els.customTableInput) els.customTableInput.value = '';

    showToast(`Table ${tableNumber} Set`);
  }

  function changeTable() {
    tableNumber = '';
    localStorage.removeItem('waiter_table_number');
    if (els.activeTableBanner) els.activeTableBanner.classList.add('hidden');
    if (els.tableSection) {
      els.tableSection.classList.remove('hidden');
      // If we are changing, open the modal automatically
      if (els.tableSelectModal) els.tableSelectModal.classList.remove('hidden');
    }
    showToast('Table cleared');
  }

  // --- Toast ---
  function showToast(msg) {
    els.toastMsg.textContent = msg;
    els.toast.classList.remove('hidden');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => els.toast.classList.add('hidden'), 2200);
  }

  // --- Haptic ---
  function hapticFeedback() {
    if (navigator.vibrate) navigator.vibrate(15);
  }

  function openItemDetail(id) {
    const item = menuItems.find(m => m.id === id);
    if (!item) return;

    let galleryHtml = '';
    let dotsHtml = '';

    const images = item.gallery && item.gallery.length > 0 ? item.gallery : (item.image ? [item.image] : []);

    if (images.length > 0) {
      images.forEach((imgSrc, idx) => {
        galleryHtml += `<img src="${imgSrc}" alt="${item.name}">`;
        dotsHtml += `<div class="item-detail-dot ${idx === 0 ? 'active' : ''}"></div>`;
      });
    } else {
      galleryHtml = `<div class="placeholder">${EMOJI_MAP[item.category] || '🍴'}</div>`;
    }

    els.itemDetailGallery.innerHTML = galleryHtml;
    els.itemDetailDots.innerHTML = dotsHtml;
    els.itemDetailCategory.textContent = item.category;
    els.itemDetailName.textContent = item.name;
    els.itemDetailDesc.textContent = item.description || 'No description available.';
    els.itemDetailPrice.textContent = `RM ${item.price.toFixed(2)}`;

    // Carousel scroll listener to update dots
    els.itemDetailGallery.onscroll = () => {
      const scrollPos = els.itemDetailGallery.scrollLeft;
      const width = els.itemDetailGallery.offsetWidth;
      const activeIdx = Math.round(scrollPos / width);
      const dots = els.itemDetailDots.querySelectorAll('.item-detail-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    };

    els.itemDetailAddBtn.onclick = () => {
      addToOrder(item.id);
      els.itemDetailOverlay.classList.add('hidden');
    };

    els.itemDetailOverlay.classList.remove('hidden');
  }

  function closeItemDetail() {
    els.itemDetailOverlay.classList.add('hidden');
  }

  // --- Event Binding ---
  function bindEvents() {
    // Admin login
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (adminLoginBtn) {
      adminLoginBtn.addEventListener('click', toggleAdminLogin);
    }

    if (document.getElementById('closeAdminModal')) {
      document.getElementById('closeAdminModal').addEventListener('click', () => els.adminLoginModal.classList.add('hidden'));
      document.getElementById('cancelAdminBtn').addEventListener('click', () => els.adminLoginModal.classList.add('hidden'));
      document.getElementById('confirmAdminBtn').addEventListener('click', confirmAdminPin);
      els.adminPinInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirmAdminPin(); });
    }

    // Nav
    $$('.nav-btn, .drawer-item').forEach((btn) => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.page));
    });

    els.menuToggleBtn.addEventListener('click', toggleDrawer);
    els.drawerOverlay.addEventListener('click', (e) => {
      if (e.target === els.drawerOverlay) closeDrawer();
    });

    // Search Interaction
    if (els.searchToggleBtn) {
      els.searchToggleBtn.onclick = () => {
        els.searchWrap.classList.add('search-active');
        setTimeout(() => els.menuSearchInput.focus(), 100);
      };
    }

    if (els.searchCloseBtn) {
      els.searchCloseBtn.onclick = () => {
        els.searchWrap.classList.remove('search-active');
        els.menuSearchInput.value = '';
        renderMenu();
      };
    }

    if (els.menuSearchInput) {
      els.menuSearchInput.oninput = () => renderMenu();
    }

    // Table Selection Modal
    if (els.openTableModalBtn) {
      els.openTableModalBtn.onclick = () => {
        els.tableSelectModal.classList.remove('hidden');
        renderTablePresets();
      };
    }

    if (els.closeTableModal) {
      els.closeTableModal.onclick = () => {
        els.tableSelectModal.classList.add('hidden');
      };
    }

    if (els.confirmTableBtn) {
      els.confirmTableBtn.onclick = () => setTable();
    }

    if (els.customTableInput) {
      els.customTableInput.onkeydown = (e) => {
        if (e.key === 'Enter') setTable();
      };
    }

    if (els.activeTableBanner) {
      els.activeTableBanner.onclick = changeTable;
    }

    // Table management page
    els.manageAddTableBtn.addEventListener('click', () => {
      const val = els.manageTableInput.value;
      const group = els.manageTableGroup.value;
      if (addTableToPresets(val, group)) {
        els.manageTableInput.value = '';
      } else {
        showToast('Table already exists or invalid');
      }
    });

    els.tableManageList.addEventListener('click', (e) => {
      const delBtn = e.target.closest('.btn-delete-table-sm');
      if (delBtn) {
        deleteTable(delBtn.dataset.group, delBtn.dataset.table);
      }
    });

    // Category tabs
    const categoryTabsContainer = document.getElementById('categoryTabs');
    if (categoryTabsContainer) {
      categoryTabsContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.cat-tab');
        if (tab) {
          activeCategory = tab.dataset.category;
          renderMenu();
        }
      });
    }

    // Floating Cart & Bottom Sheet
    if (els.floatingCartBtn) {
      els.floatingCartBtn.addEventListener('click', () => {
        els.orderModalOverlay.classList.remove('hidden');
      });
    }
    if (els.orderModalOverlay) {
      els.orderModalOverlay.addEventListener('click', (e) => {
        if (e.target === els.orderModalOverlay) {
          els.orderModalOverlay.classList.add('hidden');
        }
      });
    }
    if (els.closeOrderModal) {
      els.closeOrderModal.addEventListener('click', () => {
        els.orderModalOverlay.classList.add('hidden');
      });
    }

    // Menu grid clicks (delegated)
    els.menuGrid.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.menu-card-add');
      if (addBtn) { addToOrder(parseInt(addBtn.dataset.id)); return; }
      const card = e.target.closest('.menu-card');
      if (card) openItemDetail(parseInt(card.dataset.id));
    });

    // Order item actions (delegated)
    els.orderItems.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (btn) {
        if (btn.dataset.action === 'edit-addons') {
          openEditAddonModal(btn.dataset.cartId);
        } else {
          changeQty(btn.dataset.cartId, btn.dataset.action);
        }
      }
    });

    // Category Management
    if (els.manageCategoriesBtn) {
      els.manageCategoriesBtn.onclick = () => {
        renderManageCategories();
        els.manageCategoriesModal.classList.remove('hidden');
      };
    }
    if (els.closeCategoriesModal) {
      els.closeCategoriesModal.onclick = () => els.manageCategoriesModal.classList.add('hidden');
    }
    if (els.addNewCategoryBtn) {
      els.addNewCategoryBtn.onclick = addNewCategory;
    }
    if (els.addCatAddonBtn) {
      els.addCatAddonBtn.onclick = addCategoryAddon;
    }
    if (els.closeCatAddonsModal) {
      els.closeCatAddonsModal.onclick = () => els.categoryAddonsModal.classList.add('hidden');
    }
    if (els.closeCatAddonsBtn) {
      els.closeCatAddonsBtn.onclick = () => els.categoryAddonsModal.classList.add('hidden');
    }

    // New Item Addons (Simple List)
    if (els.addNewAddonBtn) {
      els.addNewAddonBtn.onclick = () => {
        const name = els.newAddonName.value.trim();
        const price = parseFloat(els.newAddonPrice.value) || 0;
        if(!name) return showToast('Enter addon name');
        // Logic to add to pending modifiers for new item
        // This would need a separate list for NEW item pending modifiers
      };
    }

    // Edit Item Addons
    const addEditGroupBtn = document.getElementById('addEditGroupBtn');
    if (addEditGroupBtn) {
      addEditGroupBtn.onclick = () => {
        const name = document.getElementById('editGroupName').value.trim();
        const type = document.getElementById('editGroupType').value;
        if (!name) return showToast('Enter group name');
        editPendingModifierGroups.push({ name, type, options: [] });
        document.getElementById('editGroupName').value = '';
        renderEditModifierGroups();
      };
    }

    // Save order
    $('#saveOrderBtn').addEventListener('click', saveOrder);

    // Item detail overlay (customer UX)
    if (els.itemDetailOverlay) {
      els.itemDetailOverlay.addEventListener('click', (e) => {
        if (e.target === els.itemDetailOverlay) closeItemDetail();
      });
    }
    if (els.itemDetailAddBtn) {
      els.itemDetailAddBtn.addEventListener('click', () => {
        const id = activeDetailItemId;
        closeItemDetail();
        if (id !== null) addToOrder(id);
      });
    }

    // Add item modal
    const addItemBtn = $('#addItemBtn');
    if (addItemBtn) addItemBtn.addEventListener('click', openAddItemModal);
    const addMenuItemFullBtn = $('#addMenuItemFull');
    if (addMenuItemFullBtn) addMenuItemFullBtn.addEventListener('click', openAddItemModal);
    $('#closeAddItemModal').addEventListener('click', () => els.addItemModal.classList.add('hidden'));
    $('#cancelAddItem').addEventListener('click', () => els.addItemModal.classList.add('hidden'));
    $('#confirmAddItem').addEventListener('click', confirmAddItem);

    const addNewGroupBtn = document.getElementById('addNewGroupBtn');
    if (addNewGroupBtn) {
      addNewGroupBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('newGroupName');
        const typeSelect = document.getElementById('newGroupType');
        const name = nameInput.value.trim();
        const type = typeSelect.value;
        if (!name) return showToast('Please enter a group name');

        pendingModifierGroups.push({ name, type, options: [] });
        nameInput.value = '';
        renderNewModifierGroups();
      });
    }

    const editNewGroupBtn = document.getElementById('editNewGroupBtn');
    if (editNewGroupBtn) {
      editNewGroupBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('editGroupName');
        const typeSelect = document.getElementById('editGroupType');
        const name = nameInput.value.trim();
        const type = typeSelect.value;
        if (!name) return showToast('Please enter a group name');

        editPendingModifierGroups.push({ name, type, options: [] });
        nameInput.value = '';
        renderEditModifierGroups();
      });
    }



    // (Image upload logic moved to top-level event listeners)

    // History cards (delegated)
    document.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('[data-action="edit-saved-order"], [data-action="delete-saved-order"]');
      if (actionBtn) {
        e.preventDefault();
        e.stopPropagation();
        const orderId = parseInt(actionBtn.dataset.orderId);
        if (actionBtn.dataset.action === 'edit-saved-order') {
          editOrder(orderId);
        } else {
          deleteOrder(orderId);
        }
        return;
      }

      const card = e.target.closest('.history-card');
      if (card) {
        showOrderDetail(parseInt(card.dataset.orderId));
      }
    });

    // Clear All / History Buttons
    const clearAllBtn = $('#clearAllOrdersBtn');
    if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllOrders);

    const clearHistBtn = $('#clearHistoryBtn');
    if (clearHistBtn) clearHistBtn.addEventListener('click', clearHistory);

    // View all history
    const viewAllBtn = $('#viewAllHistoryBtn');
    if (viewAllBtn) viewAllBtn.addEventListener('click', () => navigateTo('pageHistory'));

    // Order detail modal close
    $('#closeOrderDetail').addEventListener('click', () => els.orderDetailModal.classList.add('hidden'));
    $('#closeOrderDetailBtn').addEventListener('click', () => els.orderDetailModal.classList.add('hidden'));

    // Close modals on backdrop
    els.addItemModal.addEventListener('click', (e) => {
      if (e.target === els.addItemModal) els.addItemModal.classList.add('hidden');
    });
    els.orderDetailModal.addEventListener('click', (e) => {
      if (e.target === els.orderDetailModal) els.orderDetailModal.classList.add('hidden');
    });

    // Menu manage edit + delete (delegated)
    els.menuManageGrid.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.manage-card-edit');
      if (editBtn) { openEditItemModal(parseInt(editBtn.dataset.editId)); return; }
      const delBtn = e.target.closest('.manage-card-delete');
      if (delBtn) deleteMenuItem(parseInt(delBtn.dataset.delId));
    });

    // Edit item modal
    $('#closeEditItemModal').addEventListener('click', () => els.editItemModal.classList.add('hidden'));
    $('#cancelEditItem').addEventListener('click', () => els.editItemModal.classList.add('hidden'));
    $('#confirmEditItem').addEventListener('click', confirmEditItem);
    
    // Hero Toggles
    if (els.newItemIsHero) {
      els.newItemIsHero.onchange = (e) => {
        if (els.newItemHeroTextGroup) els.newItemHeroTextGroup.style.display = e.target.checked ? 'flex' : 'none';
      };
    }
    if (els.editItemIsHero) {
      els.editItemIsHero.onchange = (e) => {
        if (els.editItemHeroTextGroup) els.editItemHeroTextGroup.style.display = e.target.checked ? 'flex' : 'none';
      };
    }

    els.editItemModal.addEventListener('click', (e) => {
      if (e.target === els.editItemModal) els.editItemModal.classList.add('hidden');
    });

    // (Edit image upload logic moved to top-level event listeners)

    // Addon modal
    $('#closeAddonModal').addEventListener('click', () => els.addonModal.classList.add('hidden'));
    $('#cancelAddonBtn').addEventListener('click', () => els.addonModal.classList.add('hidden'));
    $('#confirmAddonBtn').addEventListener('click', confirmAddons);
    els.addonModal.addEventListener('click', (e) => {
      if (e.target === els.addonModal) els.addonModal.classList.add('hidden');
    });

    // Sidebar toggle (simple)
    $('#menuToggleBtn').addEventListener('click', () => showToast('Menu: use bottom nav'));
  }

  // --- Service Worker ---
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => { });
    }
  }

  // --- Boot ---
  document.addEventListener('DOMContentLoaded', init);
})();
