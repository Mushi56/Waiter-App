// admin.js
document.addEventListener('DOMContentLoaded', () => {
  // Theme consistency initialization
  const initTheme = () => {
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('wh_theme') || 'auto';
    const applyTheme = (theme) => {
      if (theme === 'auto') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', isDark ? 'dark' : 'light');
      } else {
        html.setAttribute('data-theme', theme);
      }
    };
    applyTheme(currentTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem('wh_theme') === 'auto') {
        applyTheme('auto');
      }
    });
  };
  initTheme();

  // Navigation Logic
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.page-section');

  function activateSection(targetId) {
    const targetNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
    if (!targetNav) return;
    
    // Remove active from all nav items
    navItems.forEach(nav => nav.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active'));
    
    // Add active to target
    targetNav.classList.add('active');
    document.getElementById(targetId).classList.add('active');
    
    // On mobile, close sidebar after clicking
    const sidebar = document.querySelector('.admin-sidebar');
    if(sidebar) sidebar.classList.remove('open');
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      window.location.hash = targetId; // Update hash for deep linking
      activateSection(targetId);
    });
  });

  // Handle initial load hash
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(initialHash)) {
    activateSection(initialHash);
  }
  
  // Mobile Hamburger Toggle
  const hamburger = document.getElementById('adminHamburger');
  const sidebar = document.querySelector('.admin-sidebar');
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Load and save receipt settings
  const receiptHeaderLogo = document.getElementById('receiptHeaderLogo');
  const receiptHeaderAddress = document.getElementById('receiptHeaderAddress');
  const receiptHeaderPhone = document.getElementById('receiptHeaderPhone');
  const receiptTaxRate = document.getElementById('receiptTaxRate');
  const receiptFooterMessage1 = document.getElementById('receiptFooterMessage1');
  const receiptFooterMessage2 = document.getElementById('receiptFooterMessage2');
  const saveReceiptBtn = document.getElementById('saveReceiptConfigBtn');

  if (saveReceiptBtn) {
    const savedConfig = JSON.parse(localStorage.getItem('receiptConfig')) || {
      logo: 'WAITER APP',
      address: '123 Food Street, Tasty City',
      phone: '012-3456789',
      taxRate: 0,
      footer1: 'THANK YOU FOR DINING WITH US!',
      footer2: 'Please pay at the cashier counter.'
    };

    receiptHeaderLogo.value = savedConfig.logo;
    receiptHeaderAddress.value = savedConfig.address;
    receiptHeaderPhone.value = savedConfig.phone;
    receiptTaxRate.value = savedConfig.taxRate;
    receiptFooterMessage1.value = savedConfig.footer1;
    receiptFooterMessage2.value = savedConfig.footer2;

    saveReceiptBtn.addEventListener('click', () => {
      const config = {
        logo: receiptHeaderLogo.value.trim() || 'WAITER APP',
        address: receiptHeaderAddress.value.trim() || '123 Food Street, Tasty City',
        phone: receiptHeaderPhone.value.trim() || '012-3456789',
        taxRate: parseFloat(receiptTaxRate.value) || 0,
        footer1: receiptFooterMessage1.value.trim() || 'THANK YOU FOR DINING WITH US!',
        footer2: receiptFooterMessage2.value.trim() || 'Please pay at the cashier counter.'
      };
      localStorage.setItem('receiptConfig', JSON.stringify(config));
      alert('Receipt configuration saved successfully!');
    });
  }

  // Chart.js Mock Data
  initCharts();
});

function initCharts() {
  // Revenue Chart
  const ctxRev = document.getElementById('revenueChart');
  if (ctxRev) {
    new Chart(ctxRev, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue (RM)',
          data: [2100, 3200, 2800, 4100, 5200, 6800, 5900],
          borderColor: '#FFB800',
          backgroundColor: 'rgba(255, 184, 0, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Category Chart
  const ctxCat = document.getElementById('categoryChart');
  if (ctxCat) {
    new Chart(ctxCat, {
      type: 'doughnut',
      data: {
        labels: ['Burgers', 'Main Course', 'Pasta', 'Beverages'],
        datasets: [{
          data: [35, 25, 20, 20],
          backgroundColor: ['#FFB800', '#e67e22', '#3498db', '#2ecc71'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { color: '#a0a6b1' } } },
        cutout: '70%'
      }
    });
  }
}
