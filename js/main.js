// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // Mark active nav link based on current page
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(path)) {
      link.classList.add('active');
    }
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Simple contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent!';
      btn.disabled = true;
      btn.style.background = '#2a6e3a';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        contactForm.reset();
      }, 4000);
    });
  }
});

// Shared header HTML injector
function injectHeader(activePage) {
  const nav = [
    { label: 'Services', href: 'services.html', dropdown: [
      { label: 'Full-Service Accounting', href: 'full-service-accounting.html' },
      { label: 'Corporate Tax Returns', href: 'corporate-tax-returns.html' },
      { label: 'Personal Tax Returns', href: 'personal-tax-returns.html' },
      { label: 'Financial Statements', href: 'financial-statements.html' },
      { label: 'Full-Service Payroll', href: 'payroll-services.html' },
      { label: 'QuickBooks Pro Training', href: 'quickbooks-training.html' },
      { label: 'Not-For-Profit Accounting', href: 'not-for-profit.html' },
      { label: 'Tax Preparation & Management', href: 'tax-prep-management.html' },
      { label: 'Property Management Accounting', href: 'property-management-accounting.html' },
    ]},
    { label: 'Resources', href: 'resources.html' },
    { label: 'Reviews', href: 'reviews.html' },
    { label: 'About Us', href: 'about.html' },
    { label: 'Contact', href: 'contact.html' },
  ];

  const dropdowns = nav.map(item => {
    if (item.dropdown) {
      const links = item.dropdown.map(d => `<a href="${d.href}">${d.label}</a>`).join('');
      return `<div class="dropdown"><a class="nav-link${activePage === item.href ? ' active' : ''}" href="${item.href}">${item.label} &#9662;</a><div class="dropdown-menu">${links}</div></div>`;
    }
    return `<a class="nav-link${activePage === item.href ? ' active' : ''}" href="${item.href}">${item.label}</a>`;
  }).join('');

  return `
  <div class="announcement-bar">
    <strong>Jefferson City location has moved!</strong> Visit us at 3401 W. Truman Blvd Suite 201 &mdash; <a href="contact.html">See All Locations</a>
  </div>
  <header>
    <div class="header-inner">
      <a href="index.html" class="logo">
        <span class="logo-name">Estes &amp; Associates LLC</span>
        <span class="logo-tag">Professional Accounting &bull; Jefferson City, MO</span>
      </a>
      <nav>${dropdowns}</nav>
      <div class="header-cta">
        <a href="tel:5737614100" class="phone-link">(573) 761-4100</a>
        <a href="https://onvio.us/clientcenter/company/45EAE334CCD0427CAFFAB596BC0B95DD" target="_blank" rel="noopener" class="btn btn-portal">Client Portal</a>
        <button class="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
  <nav id="mobile-nav" style="display:none;background:var(--navy);padding:16px 24px;">
    ${nav.map(item => `<a href="${item.href}" style="display:block;color:white;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-weight:600;">${item.label}</a>`).join('')}
    <a href="contact.html" style="display:block;margin-top:18px;" class="btn btn-primary">Free Consultation</a>
  </nav>`;
}
