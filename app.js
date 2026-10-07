const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    menuButton.focus();
  }
});
const form = document.querySelector('#inquiry');
if (form) {
  const topic = document.querySelector('#topic');
  const requested = new URLSearchParams(location.search).get('topic');
  if (['testing','hardware','project'].includes(requested)) topic.value = requested;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const subject = 'HellzGate inquiry: ' + topic.options[topic.selectedIndex].text;
    const body = document.querySelector('#message').value.trim();
    if (!body) { document.querySelector('#message').focus(); return; }
    location.href = 'mailto:Hellz@hellzgate.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.querySelector('#email-status').textContent = 'If your email app did not open, email Hellz@hellzgate.com directly. Nothing has been sent by this website.';
  });
}

// Preserve links to sections of the previous single-page website.
if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) {
  const routes = {what:'hellzgate.html#what',store:'hellzgate.html#store','espnow-beta':'hellzgate.html#espnow-beta',hotspot:'setup.html#hotspot',progress:'updates.html#progress',next:'updates.html#next',journey:'about.html',notify:'contact.html'};
  const destination = routes[location.hash.slice(1)];
  if (destination) location.replace(destination);
}
