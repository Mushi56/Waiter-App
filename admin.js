// admin.js
document.addEventListener('DOMContentLoaded', () => {
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
