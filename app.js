// ===== Waiter Helper - App Logic =====
(function () {
  'use strict';

  // --- Default Menu ---
  const DEFAULT_MENU = [
    // Wraps
    { id: 1, name: 'Beef Tortilla', price: 18.90, category: 'Wraps', image: 'images/beef_tortilla.png', isHero: false, heroText: 'HOT DEAL', description: 'Juicy grilled beef strips wrapped in a soft flour tortilla with fresh greens and savory sauce.' },
    { id: 2, name: 'Chicken Tortilla', price: 14.90, category: 'Wraps', image: null, description: 'Tender seasoned chicken breast wrap with crisp vegetables and a signature dressing.' },
    { id: 3, name: 'Zinger Tortilla', price: 18.90, category: 'Wraps', image: null, description: 'Extra crunchy spicy chicken zinger fillet wrapped with fresh lettuce and mayo.' },
    // Burgers
    { id: 4, name: 'Burger Wagyu Truffle', price: 49.90, category: 'Burgers', image: 'images/burger_wagyu_truffle.png', isHero: true, heroText: 'BEST SELLER', description: 'Premium Wagyu beef patty infused with aromatic truffle oil and melted cheese.' },
    { id: 5, name: 'Grill Chicken Burger', price: 22.90, category: 'Burgers', image: null, description: 'Perfectly grilled chicken thigh fillet served with fresh toppings on a toasted bun.' },
    { id: 6, name: 'The Mac Daddy', price: 23.90, category: 'Burgers', image: null, description: 'A towering burger featuring a juicy beef patty topped with creamy mac and cheese.' },
    { id: 7, name: 'Triple B', price: 23.90, category: 'Burgers', image: null, description: 'Beef, Bacon, and Barbecue sauce—the ultimate savory burger experience.' },
    { id: 8, name: 'Triple Stack', price: 36.90, category: 'Burgers', image: null, description: 'Three layers of juicy patties and melted cheese for the biggest appetite.' },
    { id: 9, name: 'Zinger', price: 21.90, category: 'Burgers', image: null, description: 'Our signature spicy fried chicken fillet with fresh lettuce on a toasted sesame bun.' },
    // Main Course
    { id: 10, name: 'Angus Ribeye Steak', price: 79.00, category: 'Main Course', image: 'images/angus_ribeye_steak.png', isHero: false, heroText: 'PREMIUM', description: 'High-quality Angus ribeye grilled to perfection, served with black pepper sauce.' },
    { id: 11, name: 'Fried Chicken Chop', price: 22.90, category: 'Main Course', image: 'images/fried_chicken_chop.png', isHero: true, heroText: 'BEST SELLER', description: 'Crispy deep-fried breaded chicken chop served with coleslaw and fries.' },
    { id: 12, name: 'Grill Chicken Chop', price: 22.90, category: 'Main Course', image: 'images/grill_chicken_chop.png', description: 'Succulent grilled chicken thigh served with our special homemade gravy.' },
    { id: 13, name: 'Lamb Grilled', price: 36.90, category: 'Main Course', image: 'images/lamb_grilled.png', description: 'Tender grilled lamb chops seasoned with aromatic herbs and spices.' },
    { id: 14, name: 'Lamb Grilled 1KG', price: 109.90, category: 'Main Course', image: 'images/lamb_grilled.png', description: 'Massive platter of grilled lamb chops, perfect for sharing with family.' },
    { id: 15, name: 'Lamb Grilled 500g', price: 59.90, category: 'Main Course', image: 'images/lamb_grilled.png', description: 'A generous portion of our signature grilled lamb chops with sides.' },
    { id: 16, name: 'Mix Platter', price: 38.90, category: 'Main Course', image: 'images/mix_platter.png', description: 'The best of both worlds—a combination of grilled chicken and lamb chops.' },
    // Pasta
    { id: 17, name: 'Aglio Bolognaise', price: 18.90, category: 'Pasta', image: 'images/pasta_aglio_bolognaise.png', description: 'Classic Aglio Olio pasta topped with a rich, slow-cooked beef bolognaise.' },
    { id: 18, name: 'Aglio Olio', price: 15.90, category: 'Pasta', image: 'images/pasta_aglio_olio.png', description: 'Simple and delicious pasta tossed in olive oil, garlic, and chili flakes.' },
    { id: 19, name: 'Amatricana', price: 19.90, category: 'Pasta', image: 'images/pasta_amatricana.png', description: 'Pasta in a spicy tomato-based sauce with savory beef bits and onions.' },
    { id: 20, name: 'Beef Bolognaise', price: 19.90, category: 'Pasta', image: 'images/pasta_beef_bolognaise.png', description: 'Hearty pasta served with a traditional rich minced beef and tomato sauce.' },
    { id: 21, name: 'Carbonara', price: 19.90, category: 'Pasta', image: 'images/pasta_carbonara.png', description: 'Creamy pasta sauce with beef bacon bits, parmesan, and a hint of black pepper.' },
    { id: 22, name: 'Garlic Butter Cheese', price: 18.90, category: 'Pasta', image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400', description: 'Silky pasta tossed in fragrant garlic butter and topped with melted cheese.' },
    { id: 23, name: 'Garlic Butter Cream', price: 18.90, category: 'Pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', isHero: true, heroText: 'POPULAR', description: 'Rich and creamy garlic butter pasta that melts in your mouth.' },
    { id: 24, name: 'Mac and Cheese', price: 18.90, category: 'Pasta', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400', description: 'The ultimate comfort food—baked pasta in a thick, gooey cheese sauce.' },
    { id: 25, name: 'Marinara', price: 16.90, category: 'Pasta', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400', description: 'Fresh pasta tossed in a zesty tomato sauce with aromatic herbs.' },
    { id: 26, name: 'Tomato Cream', price: 18.90, category: 'Pasta', image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400', description: 'A perfect blend of tangy tomato and smooth cream sauce.' },
    // Rice
    { id: 27, name: 'Salted Egg Calamari Rice', price: 17.90, category: 'Rice', image: null, description: 'Crispy fried calamari rings served with fragrant white rice and rich salted egg sauce.' },
    { id: 28, name: 'Salted Egg Chicken Rice', price: 14.90, category: 'Rice', image: null, description: 'Fried chicken pieces tossed in creamy salted egg yolk sauce, served with steamed white rice.' },
    { id: 29, name: 'Salted Egg Prawn Rice', price: 21.90, category: 'Rice', image: null, description: 'Succulent prawns glazed in golden salted egg sauce, served with white rice.' },
    { id: 30, name: 'Salted Egg Zinger Rice', price: 19.90, category: 'Rice', image: null, description: 'Spicy zinger fillet with salted egg sauce, served with a portion of white rice.' },
    // Snacks
    { id: 31, name: 'Triple Cheasy Bacon Fries', price: 12.90, category: 'Snacks', image: 'images/french_fries.png', isHero: true, heroText: 'TOP CHOICE', description: 'Loaded golden fries topped with extra cheese sauce and crispy beef bacon bits.' },
    { id: 32, name: 'Cheesy Fries', price: 12.90, category: 'Snacks', image: null, description: 'Crispy fries drizzled with a generous amount of creamy cheese sauce.' },
    { id: 33, name: 'Chicken n Fries', price: 12.90, category: 'Snacks', image: null, description: 'A classic combination of crispy chicken pieces served with golden fries.' },
    { id: 34, name: 'Onion Rings', price: 9.90, category: 'Snacks', image: null, description: 'Sweet onions battered and fried until golden and extra crunchy.' },
    { id: 35, name: 'Plain Fries', price: 7.00, category: 'Snacks', image: null, description: 'Perfectly salted, crispy golden french fries.' },
    { id: 36, name: 'Sober Cheese Snack', price: 5.00, category: 'Snacks', image: null, description: 'A light and cheesy snack perfect for sharing.' },
    // Coffee
    { id: 37, name: 'Mocha', price: 12.00, category: 'Coffee', image: null, description: 'A rich blend of espresso, steamed milk, and decadent chocolate.' },
    { id: 38, name: 'Latte', price: 10.90, category: 'Coffee', image: null, description: 'Smooth espresso combined with perfectly steamed silky milk.' },
    { id: 39, name: 'Americano', price: 7.00, category: 'Coffee', image: null, description: 'A classic bold espresso shot diluted with hot water.' },
    // Non Coffee
    { id: 40, name: 'Chocolate', price: 12.00, category: 'Non Coffee', image: null, description: 'Creamy and rich cocoa drink served hot or iced.' },
    { id: 41, name: 'Matcha', price: 11.00, category: 'Non Coffee', image: null, description: 'Authentic Japanese green tea latte with a smooth, earthy flavor.' },
    { id: 42, name: 'Ice Peach Tea', price: 4.00, category: 'Non Coffee', image: null, description: 'Refreshing iced tea infused with sweet and fragrant peach flavor.' },
    { id: 43, name: 'Ice Passionfruit Tea', price: 4.00, category: 'Non Coffee', image: null, description: 'Zesty and tropical iced tea with real passionfruit notes.' },
    { id: 44, name: 'Ice Lemon Tea', price: 4.00, category: 'Non Coffee', image: null, description: 'The classic thirst-quencher—iced tea with a fresh citrus kick.' },
    // Mocktails
    { id: 45, name: 'Watermelon Blackcurrant', price: 6.90, category: 'Mocktails', image: null, description: 'A unique and refreshing mocktail blend of fruity watermelon and tart blackcurrant.' },
    { id: 46, name: 'Virgin Mojitos', price: 6.90, category: 'Mocktails', image: null, description: 'Refreshing lime and mint mocktail served chilled with soda.' },
    { id: 47, name: 'Tropical Sunrise', price: 6.90, category: 'Mocktails', image: null, description: 'A vibrant layered mocktail with citrus and exotic fruit flavors.' },
    { id: 48, name: 'TripleBerries', price: 6.90, category: 'Mocktails', image: null, description: 'A sweet and tangy berry explosion featuring three types of berries.' },
    { id: 49, name: 'Solero', price: 6.00, category: 'Mocktails', image: null, description: 'A nostalgic creamy lime mocktail inspired by the classic ice cream.' },
    // Desserts
    { id: 50, name: 'Tiramisu', price: 25.00, category: 'Desserts', image: null, description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone.' },
    { id: 51, name: 'Banofee Pie', price: 20.00, category: 'Desserts', image: null, description: 'Delicious dessert with layers of banana, cream, and buttery toffee.' },
    { id: 52, name: 'Biscoff Cheese Cake', price: 15.00, category: 'Desserts', image: null, description: 'Creamy cheesecake topped with a generous layer of crushed Biscoff cookies.' },
    { id: 53, name: 'Roti John Wagyu Truffle', price: 28.90, category: 'Main Course', image: 'images/roti_john_wagyu_truffle.png', isHero: true, heroText: 'NEW ARRIVAL', description: 'Premium baguette bread filled with minced Wagyu beef, eggs, and signature truffle sauce.' },
  ];

  let appCategories = JSON.parse(localStorage.getItem('waiter_categories')) || [
    { name: 'Main Course', emoji: '🥩', image: 'images/cat_main_course.png' },
    { name: 'Pasta', emoji: '🍝', image: 'images/cat_pasta.png' },
    { name: 'Burgers', emoji: '🍔', image: 'images/cat_burgers.png' },
    { name: 'Wraps', emoji: '🌯', image: 'images/cat_wraps.png' },
    { name: 'Rice', emoji: '🍚', image: 'images/cat_salted_egg.png' },
    { name: 'Snacks', emoji: '🍟', image: 'images/cat_snacks.png' },
    { name: 'Mocktails', emoji: '🍹', image: 'images/cat_mocktails.png' },
    { name: 'Coffee', emoji: '☕', image: 'images/cat_coffee.png' },
    { name: 'Non Coffee', emoji: '🧋', image: 'images/cat_non_coffee.png' },
    { name: 'Desserts', emoji: '🍰', image: 'images/cat_desserts.png' },
    { name: 'Add ons', emoji: '➕', image: 'images/cat_add_ons.png' }
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
          <div class="cat-manage-img-wrap" onclick="triggerCatImageUpload(${idx})">
            ${c.image ? `<img src="${c.image}" alt="${c.name}">` : `<span style="font-size:1.2rem;">${c.emoji}</span>`}
          </div>
          <strong>${c.name}</strong>
        </div>
        <div style="display:flex; gap: 8px; align-items:center;">
          <button type="button" class="btn-cat-addons" onclick="openCategoryAddons('${c.name}')">Add-ons</button>
          <button type="button" class="btn-cat-remove" onclick="removeCategory(${idx})" ${appCategories.length === 1 ? 'disabled' : ''}>&times;</button>
        </div>
      </div>
    `).join('');
    setupCategoryDragAndDrop();
  }

  let activeUploadCatIdx = null;
  window.triggerCatImageUpload = (idx) => {
    activeUploadCatIdx = idx;
    const input = document.getElementById('catImageInput');
    if (input) input.click();
  };

  const catImageInput = document.getElementById('catImageInput');
  if (catImageInput) {
    catImageInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (activeUploadCatIdx !== null) {
        const croppedData = await autoCropSquare(file);
        appCategories[activeUploadCatIdx].image = croppedData;
        saveCategories();
        renderManageCategories();
        renderMenu();
        showToast('Category image updated');
      }
      e.target.value = '';
    });
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
    els.categoryAddonsTitle.textContent = `${catName} Choices/Add-ons`;
    els.categoryAddonsSubtitle.textContent = `These choices will appear for ALL items in the ${catName} category.`;
    renderCategoryAddons();
    els.categoryAddonsModal.classList.remove('hidden');
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
    const nameInput = els.newCategoryName;
    const emojiInput = els.newCategoryEmoji;
    if (!nameInput || !emojiInput) return;
    
    const name = nameInput.value.trim();
    const emoji = emojiInput.value.trim() || '🍴';
    if (!name) return showToast('Please enter category name');
    if (appCategories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      return showToast('Category already exists');
    }
    appCategories.push({ name, emoji });
    nameInput.value = '';
    emojiInput.value = '';
    saveCategories();
    showToast('Category added');
  }

  function renderCategoryAddons() {
    const groups = ADDONS_DATA[currentAddonCategory] || [];
    if (groups.length === 0) {
      els.catModifierGroupsList.innerHTML = '<div style="text-align:center; padding:30px; color:var(--text-muted); font-size:0.85rem;">No category-wide choices yet. Create your first group below!</div>';
    } else {
      els.catModifierGroupsList.innerHTML = groups.map((group, gIdx) => {
        const optionsHtml = group.options.map((opt, oIdx) => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:var(--bg-primary); border-radius:var(--radius-sm); border:1px solid var(--border);">
            <div style="display:flex; flex-direction:column;">
              <span style="font-weight:600; font-size:0.85rem;">${opt.name}</span>
              <span class="accent" style="font-size:0.75rem; font-weight:700;">+ RM ${opt.price.toFixed(2)}</span>
            </div>
            <button onclick="removeCategoryOption(${gIdx}, ${oIdx})" style="background:rgba(239,68,68,0.1); color:var(--danger); border:none; border-radius:50%; width:24px; height:24px; cursor:pointer;">&times;</button>
          </div>
        `).join('');

        return `
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:var(--radius-md); padding:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div>
                <strong style="font-size:0.9rem; color:var(--text-primary);">${group.name}</strong>
                <span style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; margin-left:8px; border:1px solid var(--border); padding:2px 6px; border-radius:4px;">${group.type === 'radio' ? 'Single' : 'Multiple'}</span>
              </div>
              <button onclick="removeCategoryGroup(${gIdx})" style="color:var(--danger); background:none; border:none; font-size:0.75rem; font-weight:600; cursor:pointer;">Remove Group</button>
            </div>
            <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
              ${optionsHtml}
            </div>
            <div style="display:flex; gap:6px;">
              <input type="text" id="newOptName_${gIdx}" placeholder="Option name" style="flex:1; height:32px; font-size:0.8rem; padding:0 10px;">
              <input type="number" id="newOptPrice_${gIdx}" placeholder="0.00" step="0.01" style="width:70px; height:32px; font-size:0.8rem; padding:0 8px;">
              <button onclick="addCategoryOption(${gIdx})" class="btn-accent" style="height:32px; padding:0 12px; font-size:0.8rem;">Add</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  window.removeCategoryGroup = (gIdx) => {
    if (confirm('Delete this choice group and all its options?')) {
      ADDONS_DATA[currentAddonCategory].splice(gIdx, 1);
      saveCategories();
      renderCategoryAddons();
    }
  };

  window.addCategoryOption = (gIdx) => {
    const nameInput = document.getElementById(`newOptName_${gIdx}`);
    const priceInput = document.getElementById(`newOptPrice_${gIdx}`);
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value) || 0;
    
    if (!name) return showToast('Enter option name');
    
    ADDONS_DATA[currentAddonCategory][gIdx].options.push({ name, price });
    saveCategories();
    renderCategoryAddons();
  };

  window.removeCategoryOption = (gIdx, oIdx) => {
    ADDONS_DATA[currentAddonCategory][gIdx].options.splice(oIdx, 1);
    saveCategories();
    renderCategoryAddons();
  };

  function addCategoryGroup() {
    if (!currentAddonCategory) return;
    const name = els.catGroupName.value.trim();
    const type = els.catGroupType.value;
    if (!name) return showToast('Enter group name');

    if (!ADDONS_DATA[currentAddonCategory]) ADDONS_DATA[currentAddonCategory] = [];
    ADDONS_DATA[currentAddonCategory].push({ name, type, options: [] });
    
    els.catGroupName.value = '';
    saveCategories();
    renderCategoryAddons();
    showToast('Group created');
  }

  function addCategoryAddon() {
    // Legacy function - redirected or kept for compatibility
    addCategoryGroup();
  }

  function populateCategorySelects() {
    const opts = appCategories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    if (els.newItemCategory) els.newItemCategory.innerHTML = opts;
    if (els.editItemCategory) els.editItemCategory.innerHTML = opts;
  }

  // --- State ---
  let menuItems = [];
  let currentOrder = []; // { id, name, price, qty }
  let currentDineType = 'Dine-in';
  let orders = [];
  let tableNumber = '';
  let activeCategory = 'All';
  let nextMenuId = 100;
  let isAdmin = localStorage.getItem('wh_is_admin') === 'true';

  // --- DOM Refs ---
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    // Core Layout
    menuGrid: $('#menuGrid'),
    bottomNav: $('#bottomNav'),
    floatingCartBtn: $('#floatingCartBtn'),
    orderModalOverlay: $('#orderModalOverlay'),
    cartBadge: $('#cartBadge'),
    cartTotalBtn: $('#cartTotalBtn'),
    toast: $('#toast'),
    toastMsg: $('#toastMsg'),

    // Navigation & Drawer
    drawerOverlay: $('#drawerOverlay'),
    sideDrawer: $('#sideDrawer'),
    menuToggleBtn: $('#menuToggleBtn'),
    headerCartBtn: $('#headerCartBtn'),
    headerCartBadge: $('#headerCartBadge'),
    drawerItems: $$('.drawer-item'),
    searchWrap: $('#searchWrap'),
    searchToggleBtn: $('#searchToggleBtn'),
    searchCloseBtn: $('#searchCloseBtn'),
    menuSearchInput: $('#menuSearchInput'),

    // Item Detail Sheet (Customer)
    itemDetailOverlay: $('#itemDetailOverlay'),
    itemDetailGallery: $('#itemDetailGallery'),
    itemDetailDots: $('#itemDetailDots'),
    itemDetailCategory: $('#itemDetailCategory'),
    itemDetailName: $('#itemDetailName'),
    itemDetailDesc: $('#itemDetailDesc'),
    itemDetailPrice: $('#itemDetailPrice'),
    itemDetailAddBtn: $('#itemDetailAddBtn'),

    // Addon Modal (Customer)
    addonModal: $('#addonModal'),
    addonTitle: $('#addonTitle'),
    addonList: $('#addonList'),
    closeAddonModal: $('#closeAddonModal'),
    confirmAddonBtn: $('#confirmAddonBtn'),

    // Order & History
    orderItems: $('#orderItems'),
    totalItemsCount: $('#totalItemsCount'),
    totalAmount: $('#totalAmount'),
    orderDetailModal: $('#orderDetailModal'),
    orderDetailTitle: $('#orderDetailTitle'),
    orderDetailBody: $('#orderDetailBody'),
    closeOrderDetail: $('#closeOrderDetail'),
    closeOrderDetailBtn: $('#closeOrderDetailBtn'),
    historyPreviewList: $('#historyPreviewList'),
    ordersFullList: $('#ordersFullList'),
    historyFullList: $('#historyFullList'),
    viewAllHistoryBtn: $('#viewAllHistoryBtn'),
    clearAllOrdersBtn: $('#clearAllOrdersBtn'),
    clearHistoryBtn: $('#clearHistoryBtn'),

    // Table Management
    tableSection: $('#tableSection'),
    activeTableBanner: $('#activeTableBanner'),
    activeTableNum: $('#activeTableNum'),
    tableNumberInput: $('#customTableInput'), /* Corrected ID */
    tableSelectModal: $('#tableSelectModal'),
    tableGridPresets: $('#tableGridPresets'),
    customTableInput: $('#customTableInput'),
    confirmTableBtn: $('#confirmTableBtn'),
    closeTableModal: $('#closeTableModal'),
    openTableModalBtn: $('#openTableModalBtn'),
    tableManageList: $('#tableManageList'),
    manageTableGroup: $('#manageTableGroup'),
    manageTableInput: $('#manageTableInput'),
    manageAddTableBtn: $('#manageAddTableBtn'),

    // Menu Management (Admin)
    menuManageGrid: $('#menuManageGrid'),
    addItemModal: $('#addItemModal'),
    editItemModal: $('#editItemModal'),
    addMenuItemFull: $('#addMenuItemFull'),
    manageCategoriesBtn: $('#manageCategoriesBtn'),
    manageCategoriesModal: $('#manageCategoriesModal'),
    categoryAddonsModal: $('#categoryAddonsModal'),
    closeCategoriesModal: $('#closeCategoriesModal'),
    
    // Form Elements (Admin)
    newItemName: $('#newItemName'),
    newItemPrice: $('#newItemPrice'),
    newItemCategory: $('#newItemCategory'),
    newItemDesc: $('#newItemDesc'),
    newItemImages: $('#newItemImages'),
    newGalleryPreviews: $('#newGalleryPreviews'),
    editItemId: $('#editItemId'),
    editItemName: $('#editItemName'),
    editItemPrice: $('#editItemPrice'),
    editItemCategory: $('#editItemCategory'),
    editItemDesc: $('#editItemDesc'),
    editItemImages: $('#editItemImages'),
    editGalleryPreviews: $('#editGalleryPreviews'),
    newItemIsHero: $('#newItemIsHero'),
    newItemHeroText: $('#newItemHeroText'),
    newItemHeroTextGroup: $('#newItemHeroTextGroup'),
    editItemIsHero: $('#editItemIsHero'),
    editItemHeroText: $('#editItemHeroText'),
    editItemHeroTextGroup: $('#editItemHeroTextGroup'),

    // Hero Slider
    heroSection: $('#heroSection'),
    heroSlider: $('#heroSlider'),
    heroDots: $('#heroDots'),

    // Admin
    adminLoginModal: $('#adminLoginModal'),
    adminPinInput: $('#adminPinInput'),

    // Category Management
    categoriesList: $('#categoriesList'),
    newCategoryEmoji: $('#newCategoryEmoji'),
    newCategoryName: $('#newCategoryName'),
    addNewCategoryBtn: $('#addNewCategoryBtn'),

    // Category Addons / Choice Groups
    categoryAddonsTitle: $('#categoryAddonsTitle'),
    categoryAddonsSubtitle: $('#categoryAddonsSubtitle'),
    catModifierGroupsList: $('#catModifierGroupsList'),
    catGroupName: $('#catGroupName'),
    catGroupType: $('#catGroupType'),
    addCatGroupBtn: $('#addCatGroupBtn'),
    closeCatAddonsBtn: $('#closeCatAddonsBtn'),
    closeCatAddonsModal: $('#closeCatAddonsModal')
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
      const appliedTheme = isDark ? 'dark' : 'light';
      html.setAttribute('data-theme', appliedTheme);
      updateThemeColorMeta(appliedTheme);
    } else {
      html.setAttribute('data-theme', theme);
      updateThemeColorMeta(theme);
    }
  }

  function updateThemeColorMeta(theme) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    
    if (theme === 'dark') {
      meta.setAttribute('content', '#0A0C10');
    } else {
      meta.setAttribute('content', '#F9FAFB'); // Light theme background
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
  const MENU_VERSION = '9'; // Bumped for Category Images & Fixes

  function loadData() {
    const storedVersion = localStorage.getItem('wh_menu_version');
    const storedMenu = localStorage.getItem('wh_menu');

    // Reset menu if version changed (new menu data)
    if (storedVersion !== MENU_VERSION) {
      menuItems = [...DEFAULT_MENU];
      // Also reset categories to get the new images/order
      appCategories = [
        { name: 'Main Course', emoji: '🥩', image: 'images/cat_main_course.png' },
        { name: 'Pasta', emoji: '🍝', image: 'images/cat_pasta.png' },
        { name: 'Burgers', emoji: '🍔', image: 'images/cat_burgers.png' },
        { name: 'Wraps', emoji: '🌯', image: 'images/cat_wraps.png' },
        { name: 'Salted Egg', emoji: '🥚', image: 'images/cat_salted_egg.png' },
        { name: 'Snacks', emoji: '🍟', image: 'images/cat_snacks.png' },
        { name: 'Mocktails', emoji: '🍹', image: 'images/cat_mocktails.png' },
        { name: 'Coffee', emoji: '☕', image: 'images/cat_coffee.png' },
        { name: 'Non Coffee', emoji: '🧋', image: 'images/cat_non_coffee.png' },
        { name: 'Desserts', emoji: '🍰', image: 'images/cat_desserts.png' },
        { name: 'Add Ons', emoji: '➕', image: 'images/cat_add_ons.png' }
      ];
      saveMenu();
      saveCategories();
      localStorage.setItem('wh_menu_version', MENU_VERSION);
    } else {
      menuItems = storedMenu ? JSON.parse(storedMenu) : [...DEFAULT_MENU];
      if (!storedMenu) saveMenu();
      appCategories = JSON.parse(localStorage.getItem('waiter_categories')) || appCategories;
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
      let tabsHtml = `
        <button class="cat-tab ${activeCategory === 'All' ? 'active' : ''}" data-category="All">
          <div class="cat-circle">
            <div class="grid-icon">
              <div></div><div></div><div></div><div></div>
            </div>
          </div>
          <span class="cat-name">All</span>
        </button>`;
      appCategories.forEach(c => {
        tabsHtml += `
        <button class="cat-tab ${activeCategory === c.name ? 'active' : ''}" data-category="${c.name}">
          <div class="cat-circle">
            ${c.image ? `<img src="${c.image}" alt="${c.name}" loading="lazy">` : `<span>${c.emoji}</span>`}
          </div>
          <span class="cat-name">${c.name}</span>
        </button>`;
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
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
        <div class="hero-card-overlay">
          ${item.heroText ? `<div class="hero-badge">${item.heroText}</div>` : '<div class="hero-badge">PREMIUM</div>'}
          <h3>${item.name}</h3>
          <p class="hero-card-desc">${item.description || ''}</p>
          <div class="hero-card-price">RM ${item.price.toFixed(2)}</div>
          <div class="hero-cta">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
             ORDER NOW
          </div>
        </div>
        <div class="hero-card-img-wrap">
          <img src="${item.image || 'icons/icon-192.svg'}" alt="${item.name}" class="hero-card-img" loading="lazy">
        </div>
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
      if (els.headerCartBadge) els.headerCartBadge.classList.add('hidden');
      return;
    }

    if (els.floatingCartBtn) els.floatingCartBtn.classList.remove('hidden');
    if (els.headerCartBadge) els.headerCartBadge.classList.remove('hidden');

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
    if (els.headerCartBadge) {
      els.headerCartBadge.textContent = totalQty;
      els.headerCartBadge.classList.toggle('hidden', totalQty === 0);
    }
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
      showToast('⚠️ Please select a table first!');
      if (els.tableSelectModal) els.tableSelectModal.classList.remove('hidden');
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
      dineType: currentDineType,
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
          <div class="history-table">Table ${order.table} <span style="font-size:0.65rem; padding:2px 6px; border-radius:10px; background:rgba(255,255,255,0.05); margin-left:4px; border:1px solid rgba(255,255,255,0.1); color:var(--text-secondary);">${order.dineType || 'Dine-in'}</span></div>
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
    html += `<div class="detail-row"><span class="detail-label">Dine Option</span><span style="color:var(--accent); font-weight:700;">${order.dineType || 'Dine-in'}</span></div>`;
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
    if (els.activeTableNum) els.activeTableNum.textContent = tableNumber;
    
    // Also update the order modal badge if it exists
    const orderModalTableText = document.getElementById('orderModalTableText');
    if (orderModalTableText) orderModalTableText.textContent = `Table ${tableNumber}`;

    if (els.tableSection) els.tableSection.classList.add('hidden');
    if (els.activeTableBanner) els.activeTableBanner.classList.remove('hidden');
    if (els.tableNumberInput) els.tableNumberInput.value = tableNumber;

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
    if (els.orderModalOverlay) els.orderModalOverlay.classList.remove('hidden');
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
        <div style="display:flex; gap:8px; align-items:center;">
          <input type="text" id="newOptName_${gIdx}" placeholder="Option name" style="flex:1; padding:0 10px; font-size:0.85rem; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg-primary); color:var(--text-primary); height:36px; box-sizing:border-box;">
          <input type="number" id="newOptPrice_${gIdx}" placeholder="+RM 0" style="width:70px; padding:0 10px; font-size:0.85rem; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg-primary); color:var(--text-primary); height:36px; box-sizing:border-box;" step="0.01">
          <button type="button" onclick="addNewGroupOption(${gIdx})" class="btn-accent" style="padding:0 12px; font-size:0.8rem; border-radius:var(--radius-sm); height:36px; box-sizing:border-box; display:flex; align-items:center; justify-content:center;">Add Option</button>
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
        <div style="display:flex; gap:8px; align-items:center;">
          <input type="text" id="editOptName_${gIdx}" placeholder="Option name" style="flex:1; padding:0 10px; font-size:0.85rem; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg-primary); color:var(--text-primary); height:36px; box-sizing:border-box;">
          <input type="number" id="editOptPrice_${gIdx}" placeholder="+RM 0" style="width:70px; padding:0 10px; font-size:0.85rem; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--bg-primary); color:var(--text-primary); height:36px; box-sizing:border-box;" step="0.01">
          <button type="button" onclick="addEditGroupOption(${gIdx})" class="btn-accent" style="padding:0 12px; font-size:0.8rem; border-radius:var(--radius-sm); height:36px; box-sizing:border-box; display:flex; align-items:center; justify-content:center;">Add Option</button>
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

    // Update Banner (Hidden but updated for compatibility)
    if (els.activeTableBanner) {
      const tableIdEl = els.activeTableBanner.querySelector('.table-id') || document.getElementById('activeTableNum');
      if (tableIdEl) tableIdEl.textContent = tableNumber;
    }

    // Update the badge in the order modal
    const badgeText = document.getElementById('orderModalTableText');
    if (badgeText) badgeText.textContent = `Table ${tableNumber}`;

    // Close Modals
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
      btn.addEventListener('click', () => {
        if (btn.dataset.page) {
          navigateTo(btn.dataset.page);
        }
      });
    });

    els.menuToggleBtn.addEventListener('click', toggleDrawer);
    els.drawerOverlay.addEventListener('click', (e) => {
      if (e.target === els.drawerOverlay) closeDrawer();
    });

    // Search Interaction (In-Nav Transformation)
    if (els.searchToggleBtn) {
      els.searchToggleBtn.onclick = () => {
        els.bottomNav.classList.add('search-mode');
        setTimeout(() => els.menuSearchInput.focus(), 100);
      };
    }

    if (els.searchCloseBtn) {
      els.searchCloseBtn.onclick = () => {
        els.bottomNav.classList.remove('search-mode');
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
    if (els.addCatGroupBtn) {
      els.addCatGroupBtn.onclick = addCategoryGroup;
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

    // Dine Type Selector
    const dineBtns = $$('.dine-type-btn');
    dineBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dineBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDineType = btn.dataset.type;
      });
    });

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
    const closeAddon = () => {
      els.addonModal.classList.add('hidden');
      pendingAddonItem = null;
      editingCartItemId = null;
    };
    if (els.closeAddonModal) els.closeAddonModal.onclick = closeAddon;
    if (els.confirmAddonBtn) els.confirmAddonBtn.onclick = confirmAddons;
    
    if (els.addonModal) {
      els.addonModal.addEventListener('click', (e) => {
        if (e.target === els.addonModal) closeAddon();
      });
    }

    if (els.headerCartBtn) {
      els.headerCartBtn.onclick = () => {
        if (currentOrder.length > 0) {
          renderOrder();
          els.orderModalOverlay.classList.remove('hidden');
        } else {
          showToast('Cart is empty');
        }
      };
    }

    // Table Selector Badge in Order Modal
    const orderModalTableBadge = document.getElementById('orderModalTableBadge');
    if (orderModalTableBadge) {
      orderModalTableBadge.onclick = () => {
        if (els.tableSelectModal) els.tableSelectModal.classList.remove('hidden');
      };
    }

    // Category Management
    if (els.addNewCategoryBtn) {
      els.addNewCategoryBtn.onclick = addNewCategory;
    }
    if (els.addCatGroupBtn) {
      els.addCatGroupBtn.onclick = addCategoryGroup;
    }
    if (els.closeCatAddonsModal) {
      els.closeCatAddonsModal.onclick = () => els.categoryAddonsModal.classList.add('hidden');
    }
    if (els.closeCatAddonsBtn) {
      els.closeCatAddonsBtn.onclick = () => els.categoryAddonsModal.classList.add('hidden');
    }
    if (els.closeCategoriesModal) {
      els.closeCategoriesModal.onclick = () => els.manageCategoriesModal.classList.add('hidden');
    }
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
