/* ----- Menu tab switching ----- */
function showTab(name) {
  // Hide all menu sections
  document.querySelectorAll('.menu-section').forEach(function(section) {
    section.classList.remove('active');
  });

  // Deactivate all buttons
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  // Show the selected panel
  const panel = document.getElementById('tab-' + name);
  if (panel) {
    panel.classList.add('active');
  }

  // Activate the correct button (more reliable matching)
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    const btnText = btn.textContent.toLowerCase();
    if (btnText.includes(name)) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    }
  });
}

/* ----- Active nav link on scroll ----- */
var sections = document.querySelectorAll('section[id]');

/* ----- Mobile nav toggle ----- */
var navToggle = document.querySelector('.nav-toggle');
var navLinks  = document.querySelector('.nav-links');
var isNavOpen = false;

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    isNavOpen = !isNavOpen;

    if (isNavOpen) {
      navLinks.style.display       = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position      = 'absolute';
      navLinks.style.top           = '64px';
      navLinks.style.left          = '0';
      navLinks.style.right         = '0';
      navLinks.style.background    = '#ffffff';
      navLinks.style.padding       = '16px 20px';
      navLinks.style.borderBottom  = '2px solid #FFBF3F';
      navLinks.style.zIndex        = '99';
      navLinks.style.gap           = '16px';
    } else {
      navLinks.style.display = 'none';
    }
  });

  /* Close menu when any nav link is clicked */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      isNavOpen = false;
      navLinks.style.display = 'none';
    });
  });
}
var navAnchors = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  var scrollPos = window.scrollY + 120;
  var found = false;

  sections.forEach(function(section) {
    if (
      !found &&
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      navAnchors.forEach(function(a) {
        a.classList.remove('active-link');
        a.style.color = '';
      });
      var match = document.querySelector('.nav-links a[href="#' + section.id + '"]');
      if (match) {
        match.classList.add('active-link');
        found = true;
      }
    }
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink(); // run once on page load

/* ----- Deal card tap to expand (mobile) ----- */
document.querySelectorAll('.deal-card').forEach(function(card) {
  card.addEventListener('click', function() {
    /* Only toggle on mobile */
    if (window.innerWidth <= 768) {
      var isOpen = card.classList.contains('open');
      /* Close all others first */
      document.querySelectorAll('.deal-card').forEach(function(c) {
        c.classList.remove('open');
      });
      /* Toggle clicked one */
      if (!isOpen) {
        card.classList.add('open');
      }
    }
  });
});

/* ----- Gallery Lightbox ----- */
var galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
var lightbox      = document.getElementById('lightbox');
var lbImg         = document.getElementById('lbImg');
var lbCaption     = document.getElementById('lbCaption');
var lbClose       = document.getElementById('lbClose');
var lbPrev        = document.getElementById('lbPrev');
var lbNext        = document.getElementById('lbNext');
var currentIndex  = 0;

function openLightbox(index) {
  currentIndex = index;
  var img = galleryImages[index];
  lbImg.src        = img.src;
  lbImg.alt        = img.alt;
  lbCaption.textContent = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  openLightbox(currentIndex);
}

/* Click on each gallery image to open */
galleryImages.forEach(function(img, i) {
  img.addEventListener('click', function() { openLightbox(i); });
});

/* Controls */
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

/* Click outside image to close */
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) closeLightbox();
});

/* Keyboard: Escape, Left, Right arrow keys */
document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});
