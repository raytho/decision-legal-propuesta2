const whatsappNumber = '525589161502';

// Las tarjetas de áreas viven como HTML estático en index.html para que sean
// visibles sin JavaScript. Aquí solo se conserva la lista que alimenta el
// selector del formulario, y debe mantenerse alineada con #serviceGrid.
const serviceAreas = [
  'Inmobiliario',
  'Corporativo',
  'Contractual',
  'Agrario',
  'Comercio exterior',
  'Gestorías'
];

const whatsappUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const syncThemeToggle = (themeToggle, themeToggleIcon) => {
  const isDark = document.documentElement.classList.contains('dark-theme');
  themeToggle.setAttribute('aria-checked', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  themeToggleIcon.textContent = isDark ? '☀' : '☾';
};

const initThemeSwitch = () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleIcon = themeToggle ? themeToggle.querySelector('span') : null;

  if (!themeToggle || !themeToggleIcon) return;

  syncThemeToggle(themeToggle, themeToggleIcon);

  // El tema no se guarda entre visitas: el oscuro es el predeterminado y
  // viene en la clase del <html>, así que al recargar siempre se vuelve a él.
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');
    syncThemeToggle(themeToggle, themeToggleIcon);
  });
};

const initMobileNav = () => {
  const navToggle = document.getElementById('navToggle');
  const navPanel = document.getElementById('navPanel');

  if (!navToggle || !navPanel) return;

  const setOpen = (isOpen) => {
    navPanel.dataset.open = String(isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  };

  navToggle.addEventListener('click', () => {
    setOpen(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  // Los enlaces son anclas internas: el panel debe cerrarse al navegar.
  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || navToggle.getAttribute('aria-expanded') !== 'true') return;

    setOpen(false);
    navToggle.focus();
  });
};

const initWhatsAppForm = () => {
  const form = document.getElementById('whatsappForm');

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    const text = [
      'Hola Decisión Legal, me gustaría recibir orientación para proteger mi tranquilidad patrimonial.',
      `Nombre: ${nombre}`,
      telefono ? `Teléfono: ${telefono}` : '',
      `Servicio: ${servicio}`,
      `Mensaje: ${mensaje}`
    ].filter(Boolean).join('\n');

    window.open(whatsappUrl(text), '_blank', 'noopener');
  });
};

const initServiceSelect = () => {
  const serviceSelect = document.getElementById('servicio');

  if (!serviceSelect) return;

  serviceSelect.innerHTML = [...serviceAreas, 'Consulta general']
    .map((title) => `<option>${title}</option>`)
    .join('');
};

const initWhatsAppLinks = () => {
  document.querySelectorAll('[data-whatsapp-message]').forEach((link) => {
    link.href = whatsappUrl(link.dataset.whatsappMessage);
  });
};

const initCurrentYear = () => {
  const currentYear = document.getElementById('currentYear');

  if (!currentYear) return;

  currentYear.textContent = String(new Date().getFullYear());
};

document.addEventListener('DOMContentLoaded', () => {
  initServiceSelect();
  initWhatsAppLinks();
  initThemeSwitch();
  initMobileNav();
  initWhatsAppForm();
  initCurrentYear();
});
