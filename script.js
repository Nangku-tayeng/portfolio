<script>
  // Custom cursor
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
  });
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a,button,.portfolio-card,.skill-card,.value-card,.ongoing-item,.filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
  });

  // Scroll progress
  window.addEventListener('scroll', () => {
    const prog = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('scrollLine').style.width = prog + '%';
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Mobile nav
  function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('open');
  }

  // Portfolio filter
  function filterPortfolio(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.portfolio-card').forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.opacity = match ? '1' : '0.2';
      card.style.transform = match ? '' : 'scale(0.96)';
      card.style.pointerEvents = match ? 'auto' : 'none';
      card.style.transition = 'opacity 0.4s, transform 0.4s';
    });
  }

  // Form submit
  function handleFormSubmit(e) {
    e.preventDefault();
    const btn = e.target;
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = '#22c55e';
    btn.style.boxShadow = '0 4px 20px rgba(34,197,94,0.3)';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.style.boxShadow = '';
    }, 3000);
  }
</script>