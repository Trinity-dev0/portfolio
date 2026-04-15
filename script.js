window.setLanguage = async function (lang) {
  try {
    let url = `i18n/${lang}.json`;

    if (window.location.protocol === 'file:') {
      url = `https://raw.githubusercontent.com/Trinity-dev0/portfolio/main/i18n/${lang}.json`;
      console.warn("Running on file:// protocol. Fetching language data from GitHub to prevent CORS blockade.");
    }

    const response = await fetch(url + '?t=' + new Date().getTime());
    if (!response.ok) throw new Error('Network response was not ok');

    const translations = await response.json();
    window.currentTranslations = translations;

    localStorage.setItem('appLang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.innerHTML = translations[key];
      }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const key = el.getAttribute('data-i18n-attr');
      if (translations[key]) {
        el.setAttribute('placeholder', translations[key]);
      }
    });

    const btnEn = document.getElementById('btn-en');
    const btnPt = document.getElementById('btn-pt');

    if (btnEn && btnPt) {
      btnEn.classList.remove('lang-active', 'text-gray-900', 'font-bold');
      btnPt.classList.remove('lang-active', 'text-gray-900', 'font-bold');

      if (lang === 'en') {
        btnEn.classList.add('lang-active', 'text-gray-900', 'font-bold');
      } else {
        btnPt.classList.add('lang-active', 'text-gray-900', 'font-bold');
      }
    }
  } catch (error) {
    console.error('Error loading language file:', error);
    alert('Oops! The language file could not be loaded. Please ensure you are viewing this via a server network (like Live Server or GitHub Pages).');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('appLang') || 'en';
  window.setLanguage(savedLang);

  const restrictedLinks = document.querySelectorAll('.restricted-project-link');

  restrictedLinks.forEach(restrictedLink => {
    restrictedLink.addEventListener('click', (e) => {
      e.preventDefault();

      if (document.getElementById('restricted-toast')) return;

      const toast = document.createElement('div');
      toast.id = 'restricted-toast';
      toast.className = 'fixed bottom-5 right-5 sm:bottom-10 sm:right-10 bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0 z-50';

      const toastText = window.currentTranslations
        ? window.currentTranslations['toast.restricted']
        : 'Project restricted. The link is not publicly available.';

      toast.innerHTML = `
        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 shrink-0">
          <i class="fas fa-lock text-sm text-gray-300"></i>
        </div>
        <div class="text-sm font-medium pr-2">
          ${toastText}
        </div>
      `;

      document.body.appendChild(toast);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          toast.classList.remove('translate-y-4', 'opacity-0');
        });
      });

      setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, 3500);
    });
  });
});
