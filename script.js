// Meri Zindagi Hai Tu | script.js

document.body.style.overflow = 'hidden';

// ── PRELOADER ────────────────────────────────
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  tl.to('.preloader-urdu', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3
  })
  .to('.preloader-title', {
    opacity: 1, duration: 0.9, ease: 'power2.out'
  }, '-=0.3')
  .to('.preloader-sub', {
    opacity: 1, duration: 0.7, ease: 'power2.out'
  }, '-=0.4')
  .to('#preloader-content', {
    duration: 0, delay: 1.1
  })
  .to('#preloader-content', {
    y: -80, opacity: 0, duration: 0.7, ease: 'power2.in'
  })
  .to('#preloader', {
    yPercent: -100, duration: 1.0, ease: 'power2.inOut',
    onComplete: () => {
      document.getElementById('preloader').style.display = 'none';
      document.body.style.overflow = '';
      revealHero();
      initAudio();
      showAudioPlayer();
    }
  }, '-=0.1');
});

// ── HERO ENTRANCE ────────────────────────────
function revealHero() {
  gsap.to('.hero-tag', { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power2.out' });
  gsap.to('.hero-title-urdu', { opacity: 1, y: 0, duration: 0.7, delay: 0.25, ease: 'power2.out' });
  gsap.to('.hero-title-en', { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' });
  gsap.to('.hero-tagline', { opacity: 1, y: 0, duration: 0.7, delay: 0.55, ease: 'power2.out' });
  gsap.to('.hero-meta', { opacity: 1, y: 0, duration: 0.6, delay: 0.7, ease: 'power2.out' });
  gsap.to('.hero-buttons', { opacity: 1, y: 0, duration: 0.6, delay: 0.85, ease: 'power2.out' });
  gsap.to('.scroll-indicator', { opacity: 1, duration: 0.8, delay: 1.2, ease: 'power2.out' });
}

// ── HERO BG IMAGE CROSSFADE ──────────────────
let imgIndex = 0;
const imgs = document.querySelectorAll('.hero-img');
setInterval(() => {
  imgs[imgIndex].style.opacity = '0';
  imgIndex = (imgIndex + 1) % imgs.length;
  imgs[imgIndex].style.opacity = '1';
}, 5000);

// ── AUDIO ────────────────────────────────────
const audio = document.getElementById('ost-audio');
let isPlaying = false;
const btn = document.getElementById('audio-toggle');
const progress = document.getElementById('audio-progress');

function initAudio() {
  audio.volume = 0.45;
  audio.play().then(() => {
    isPlaying = true;
    btn.textContent = '❚❚';
    startProgressBar();
  }).catch(() => {
    isPlaying = false;
    btn.textContent = '▶';
  });
}

function toggleAudio() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    btn.textContent = '▶';
  } else {
    audio.play();
    isPlaying = true;
    btn.textContent = '❚❚';
    startProgressBar();
  }
}

function startProgressBar() {
  function step() {
    if (!audio.paused && audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progress.style.width = pct + '%';
    }
    if (isPlaying) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function showAudioPlayer() {
  setTimeout(() => {
    const player = document.getElementById('audio-player');
    player.classList.add('visible');
  }, 800);
}

// ── NAVBAR SCROLL ────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── MOBILE MENU ──────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

// ── SCROLL REVEAL ────────────────────────────
const revealElements = document.querySelectorAll(
  '.section-header, .story-text, .story-visual, .gallery-item, .ost-text, .ost-visual, .watch-card, .footer-inner'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// Stagger cast cards
const castObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Make the grid container visible immediately
      entry.target.classList.add('visible');
      // Stagger the individual cards
      const cards = entry.target.querySelectorAll('.cast-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 100);
      });
      castObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const castGrid = document.querySelector('.cast-grid');
if (castGrid) {
  castGrid.classList.add('reveal');
  castGrid.querySelectorAll('.cast-card').forEach(c => c.classList.add('reveal'));
  castObserver.observe(castGrid);
}

// ── GSAP SCROLL TRIGGERS ─────────────────────
gsap.registerPlugin(ScrollTrigger);

gsap.from('.story-highlight', {
  scrollTrigger: { trigger: '.story-highlight', start: 'top 80%' },
  x: -30, opacity: 0, duration: 0.9, ease: 'power2.out'
});

gsap.from('.detail-item', {
  scrollTrigger: { trigger: '.story-details', start: 'top 85%' },
  y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
});

gsap.from('.badge', {
  scrollTrigger: { trigger: '.ost-badges', start: 'top 85%' },
  scale: 0.8, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)'
});

gsap.from('.watch-card', {
  scrollTrigger: { trigger: '.watch-cards', start: 'top 85%' },
  y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
});

// Vinyl pause when not in view
ScrollTrigger.create({
  trigger: '#ost',
  start: 'top bottom',
  end: 'bottom top',
  onLeave: () => {
    const vinyl = document.getElementById('vinyl');
    if (vinyl) vinyl.style.animationPlayState = 'paused';
  },
  onEnter: () => {
    const vinyl = document.getElementById('vinyl');
    if (vinyl) vinyl.style.animationPlayState = 'running';
  },
  onEnterBack: () => {
    const vinyl = document.getElementById('vinyl');
    if (vinyl) vinyl.style.animationPlayState = 'running';
  }
});

// Parallax hero bg
gsap.to('.hero-bg', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 100,
  ease: 'none'
});

// ── SMOOTH SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── DIRECTIONAL BUTTON HOVER ──────────────────
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .ost-btn').forEach(btn => {
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  
  // Wrap existing content to keep it above the fill
  const content = btn.innerHTML;
  btn.innerHTML = `<span style="position: relative; z-index: 1; pointer-events: none;">${content}</span>`;
  
  // Add the fill element
  const fill = document.createElement('span');
  
  // Determine fill color based on button class
  let fillColor = 'var(--gold-light)';
  let endScale = 1.6;
  if (btn.classList.contains('btn-secondary')) {
    fillColor = 'rgba(201,168,76,0.1)';
  } else if (btn.classList.contains('nav-cta')) {
    fillColor = 'var(--gold)';
  } else if (btn.classList.contains('spotify')) {
    fillColor = '#1ed760';
  } else if (btn.classList.contains('youtube')) {
    fillColor = '#ff3333';
  }
  
  Object.assign(fill.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '300px',
    height: '300px',
    background: fillColor,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '0',
    transform: 'translate(-50%, -50%) scale(0)'
  });
  
  btn.appendChild(fill);
  
  btn.addEventListener('mouseenter', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.set(fill, { x: x, y: y, scale: 0 });
    gsap.to(fill, { scale: endScale, duration: 0.5, ease: 'power2.out' });
  });

  btn.addEventListener('mouseleave', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(fill, { x: x, y: y, scale: 0, duration: 0.5, ease: 'power2.out' });
  });
});
