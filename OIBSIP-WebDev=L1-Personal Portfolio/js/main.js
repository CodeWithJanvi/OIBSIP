// portfolio script by lumbhani janvi
// everything is inside one function so nothing leaks to the global scope
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* boot screen: oasis infobyte task 2 (level 1) */
  const boot = document.getElementById('boot'), log = document.getElementById('bootLog'), bar = boot.querySelector('.b-bar span');
  const bootLines = ['> task: personal portfolio', '[x] profile / hero section', '[x] about me section', '[x] skills section', '[x] projects section', '[x] contact section', '[x] smooth scroll navigation', '[x] consistent branding', '[x] fully responsive', '> launching portfolio...'];
  const queue = []; let bootDone = false;
  const finish = () => { if (bootDone) return; bootDone = true; boot.classList.add('done'); document.body.classList.add('ready'); queue.splice(0).forEach(f => setTimeout(f, 300)); };
  const afterBoot = fn => (reduce || bootDone) ? fn() : queue.push(fn);
  if (reduce) { boot.remove(); bootDone = true; document.body.classList.add('ready'); }
  else {
    let n = 0;
    (function next() {
      if (bootDone) return;
      if (n < bootLines.length) { log.textContent += bootLines[n++] + '\n'; bar.style.width = (n / bootLines.length * 100) + '%'; setTimeout(next, 210); }
      else setTimeout(finish, 500);
    })();
    boot.querySelector('.b-skip').addEventListener('click', finish);
    setTimeout(finish, 5000);
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  /* theme toggle */
  document.querySelector('.theme-btn').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* contact form */
  // paste your free web3forms access key here (see readme). leave '' to open gmail instead.
  const WEB3FORMS_KEY = '';
  const TO = 'lumbhanijanvi59@gmail.com';
  const form = document.getElementById('mailForm'), msg = document.getElementById('formMsg');
  const say = (t, cls = '') => { msg.textContent = t; msg.className = 'note ' + cls; };
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const f = new FormData(form);
    const subject = 'Portfolio message from ' + f.get('name');
    const body = `${f.get('msg')}\n\nFrom: ${f.get('name')} (${f.get('email')})`;
    if (!WEB3FORMS_KEY) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${TO}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank', 'noopener');
      say('Gmail opened in a new tab. Press Send there to deliver it.', 'ok');
      return;
    }
    say('Sending...');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, name: f.get('name'), email: f.get('email'), message: f.get('msg'), botcheck: f.get('botcheck') })
      });
      const data = await res.json();
      if (data.success) { form.reset(); say('Message sent. Thank you, I will reply soon.', 'ok'); }
      else say('Could not send. Please email ' + TO + ' directly.', 'err');
    } catch (err) { say('Network error. Please email ' + TO + ' directly.', 'err'); }
  });
  document.getElementById('copyMail').addEventListener('click', async e => {
    try { await navigator.clipboard.writeText(TO); e.target.textContent = 'Copied!'; }
    catch (err) { const r = document.createRange(); r.selectNodeContents(document.getElementById('mailText')); getSelection().removeAllRanges(); getSelection().addRange(r); e.target.textContent = 'Press Ctrl+C'; }
    setTimeout(() => e.target.textContent = 'Copy email', 2000);
  });

  /* mobile menu */
  const burger = document.querySelector('.burger'), menu = document.querySelector('.nav nav');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

  /* typing roles */
  const roles = ['responsive websites', 'clean UI with Bootstrap', 'dynamic sites with PHP', 'interactive JavaScript apps', 'fast, accessible pages'];
  const typed = document.getElementById('typed');
  let r = 0, i = 0, del = false;
  afterBoot(function type() {
    if (reduce) { typed.textContent = roles[0]; return; }
    const word = roles[r];
    typed.textContent = word.slice(0, del ? --i : ++i);
    let delay = del ? 35 : 80;
    if (!del && i === word.length) { del = true; delay = 1400; }
    else if (del && i === 0) { del = false; r = (r + 1) % roles.length; delay = 400; }
    setTimeout(type, delay);
  });

  /* code editor typing */
  const code = [
    ['c', '// developer.js\n'],
    ['k', 'const '], ['p', 'developer'], ['', ' = {\n'],
    ['', '  name: '], ['s', '"Lumbhani Janvi"'], ['', ',\n'],
    ['', '  role: '], ['s', '"Web Developer"'], ['', ',\n'],
    ['', '  company: '], ['s', '"Webcare Infoway"'], ['', ',\n'],
    ['', '  student: '], ['s', '"BCA"'], ['', ',\n'],
    ['', '  stack: ['], ['s', '"HTML"'], ['', ', '], ['s', '"CSS"'], ['', ', '], ['s', '"JS"'], ['', ', '], ['s', '"Bootstrap"'], ['', ', '], ['s', '"PHP"'], ['', '],\n'],
    ['', '  openToWork: '], ['n', 'true'], ['', ',\n'],
    ['', '  coffee: '], ['n', '"always"'], ['', '\n};\n\n'],
    ['p', 'developer'], ['', '.'], ['k', 'build'], ['', '('], ['s', '"something great"'], ['', ');']
  ];
  const out = document.getElementById('code');
  if (reduce) {
    out.innerHTML = code.map(([c, t]) => `<span class="${c}">${t}</span>`).join('');
  } else {
    let seg = 0, ch = 0, span = null;
    afterBoot(function write() {
      if (seg >= code.length) return;
      if (ch === 0) { span = document.createElement('span'); span.className = code[seg][0]; out.appendChild(span); }
      span.textContent += code[seg][1][ch++];
      if (ch >= code[seg][1].length) { seg++; ch = 0; }
      setTimeout(write, 28);
    });
  }

  /* reveal on scroll + skill meters */
  document.querySelectorAll('.skill h3').forEach(h => { const s = document.createElement('span'); s.className = 'pct'; s.textContent = reduce ? '' : '0%'; h.appendChild(s); });
  function countUp(el, to) {
    if (reduce) { el.textContent = to + '%'; return; }
    const t0 = performance.now();
    (function step(t) { const k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + '%'; if (k < 1) requestAnimationFrame(step); })(t0);
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    const lvl = e.target.dataset.level;
    if (lvl) { e.target.querySelector('.meter span').style.width = lvl + '%'; countUp(e.target.querySelector('.pct'), +lvl); }
    io.unobserve(e.target);
  }), { threshold: .2 });
  document.querySelectorAll('.reveal, .title').forEach((el, n) => { el.style.transitionDelay = (n % 3) * 90 + 'ms'; io.observe(el); });

  /* scroll progress ring + top bar */
  const ring = document.querySelector('.scroll-ring'), ringBar = ring.querySelector('.bar2'), ringTxt = ring.querySelector('span'), topbar = document.querySelector('.topbar');
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 0;
    ringBar.style.strokeDashoffset = 100 - p; ringTxt.textContent = Math.round(p) + '%'; topbar.style.width = p + '%';
  }
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
  ring.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* cursor glow */
  const glow = document.querySelector('.glow');
  if (!reduce) {
    let gx = innerWidth / 2, gy = innerHeight / 3, tx = gx, ty = gy;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    (function g() { gx += (tx - gx) * .08; gy += (ty - gy) * .08; glow.style.transform = `translate(${gx - 210}px,${gy - 210}px)`; requestAnimationFrame(g); })();
  }

  /* footer terminal + clock */
  const termOut = document.getElementById('termOut'), P = 'janvi@portfolio:~$ ';
  const script = [['s', P], ['', 'whoami\n'], ['p', 'lumbhani-janvi\n'], ['s', P], ['', 'cat skills.txt\n'], ['p', 'HTML  CSS  JS  Bootstrap  PHP\n'], ['s', P], ['', 'git commit -m "thanks for visiting"\n'], ['c', '[main] 1 file changed, 100% motivation\n'], ['s', P]];
  const cursor = '<span class="caret">|</span>';
  function runTerm() {
    if (reduce) { termOut.innerHTML = script.map(([c, t]) => `<span class="${c}">${t}</span>`).join('') + cursor; return; }
    let seg = 0, ch = 0, span = null;
    (function w() {
      if (seg >= script.length) { termOut.insertAdjacentHTML('beforeend', cursor); return; }
      if (ch === 0) { span = document.createElement('span'); span.className = script[seg][0]; termOut.appendChild(span); }
      span.textContent += script[seg][1][ch++];
      const done = ch >= script[seg][1].length; if (done) { seg++; ch = 0; }
      setTimeout(w, done ? 350 : 35);
    })();
  }
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { runTerm(); o.disconnect(); } }, { threshold: .3 }).observe(document.querySelector('.term'));
  const clock = document.getElementById('clock');
  const tick = () => clock.textContent = new Date().toLocaleTimeString([], { hour12: false });
  tick(); setInterval(tick, 1000);

  /* active nav link */
  const links = [...document.querySelectorAll('.nav nav a')];
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section').forEach(s => spy.observe(s));

  /* 3d tilt on project cards */
  if (!reduce) document.querySelectorAll('.card').forEach(c => {
    c.addEventListener('mousemove', e => {
      c.style.transitionDelay = '0ms';
      const b = c.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
      c.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });

  /* background: floating code symbols + connecting lines */
  const cv = document.getElementById('bg'), ctx = cv.getContext('2d');
  let W, H, pts = [], mouse = { x: -999, y: -999 };
  const glyphs = ['{ }', '</>', '( )', '[ ]', '=>', '&&', '01', ';'];
  function size() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    pts = Array.from({ length: Math.min(45, Math.floor(W / 28)) }, () => ({
      x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      g: glyphs[Math.floor(Math.random() * glyphs.length)]
    }));
  }
  addEventListener('resize', size); size();
  addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  function draw() {
    const L = document.documentElement.dataset.theme === 'light';
    ctx.clearRect(0, 0, W, H);
    ctx.font = '14px JetBrains Mono, monospace';
    pts.forEach((p, a) => {
      p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
      ctx.fillStyle = L ? 'rgba(106,71,245,.4)' : 'rgba(124,92,255,.35)'; ctx.fillText(p.g, p.x, p.y);
      for (let b = a + 1; b < pts.length; b++) {
        const q = pts[b], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) { ctx.strokeStyle = `rgba(${L ? '10,143,176' : '34,211,238'},${(L ? .2 : .12) * (1 - d / 130)})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
      const m = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (m < 160) { ctx.strokeStyle = `rgba(${L ? '209,38,155' : '255,110,199'},${.3 * (1 - m / 160)})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
    });
    requestAnimationFrame(draw);
  }
  if (reduce) { cv.style.display = 'none'; } else draw();
})();
