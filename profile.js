(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const menu = document.querySelector('.menu-toggle');
  const links = document.querySelector('#site-menu');
  const applyTheme = theme => {
    root.dataset.theme = theme;
    toggle.textContent = theme === 'light' ? '\u263e' : '\u263c';
    toggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  };
  try { applyTheme(localStorage.getItem('portfolio-theme') || 'dark'); } catch { applyTheme('dark'); }
  toggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  });
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  });
  const page = location.pathname.split('/').pop() || 'index.html';
  links.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === page) link.setAttribute('aria-current', 'page');
  });
})();
