(function () {
  'use strict';

  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  var sidebar = document.getElementById('sidebar');
  var sidebarClose = document.getElementById('sidebar-close');
  var themeToggle = document.getElementById('theme-toggle');
  var themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // Sidebar toggle (for tablet/mobile)
  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('open');
    var overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', closeSidebar);
    }
    overlay.classList.add('active');
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    var overlay = document.querySelector('.sidebar-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  // Add sidebar trigger for tablet/mobile: clicking nav brand or a dedicated button
  // We use the nav brand click to also open sidebar on mobile
  var navBrand = document.querySelector('.nav-brand');
  if (navBrand) {
    navBrand.addEventListener('click', function (e) {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        if (sidebar && sidebar.classList.contains('open')) {
          closeSidebar();
        } else if (sidebar) {
          openSidebar();
        }
      }
    });
  }

  // Close nav links when clicking outside
  document.addEventListener('click', function (e) {
    if (navLinks && navLinks.classList.contains('open')) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    }
  });

  // Dark mode
  function getPreferredTheme() {
    var stored = localStorage.getItem('dana-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dana-theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    }
  }

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('dana-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Highlight active nav link
  var currentPath = window.location.pathname;
  var links = document.querySelectorAll('.nav-link');
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href && currentPath.indexOf(href) === 0 && href !== '/') {
      links[i].classList.add('active');
    } else if (href === '/' && (currentPath === '/' || currentPath === '/dana/' || currentPath === '/dana')) {
      links[i].classList.add('active');
    }
  }

  // Wealth table sorting
  var wealthTables = document.querySelectorAll('.wealth-table');
  for (var t = 0; t < wealthTables.length; t++) {
    (function (table) {
      var headers = table.querySelectorAll('th');
      for (var h = 0; h < headers.length; h++) {
        (function (header, colIndex) {
          header.addEventListener('click', function () {
            var tbody = table.querySelector('tbody');
            if (!tbody) return;
            var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
            var isAsc = header.classList.contains('sort-asc');

            // Clear all sort indicators
            var allTh = table.querySelectorAll('th');
            for (var j = 0; j < allTh.length; j++) {
              allTh[j].classList.remove('sort-asc', 'sort-desc');
            }

            rows.sort(function (a, b) {
              var aVal = a.cells[colIndex] ? a.cells[colIndex].textContent.trim() : '';
              var bVal = b.cells[colIndex] ? b.cells[colIndex].textContent.trim() : '';
              var aNum = parseFloat(aVal.replace(/[^0-9.-]/g, ''));
              var bNum = parseFloat(bVal.replace(/[^0-9.-]/g, ''));

              if (!isNaN(aNum) && !isNaN(bNum)) {
                return isAsc ? bNum - aNum : aNum - bNum;
              }
              return isAsc ? bVal.localeCompare(aVal, 'zh') : aVal.localeCompare(bVal, 'zh');
            });

            header.classList.add(isAsc ? 'sort-desc' : 'sort-asc');
            for (var r = 0; r < rows.length; r++) {
              tbody.appendChild(rows[r]);
            }
          });
        })(header, h);
      }
    })(wealthTables[t]);
  }
})();
