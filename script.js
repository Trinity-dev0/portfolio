document.addEventListener('DOMContentLoaded', () => {
  const restrictedLinks = document.querySelectorAll('.restricted-project-link');

  restrictedLinks.forEach(restrictedLink => {
    restrictedLink.addEventListener('click', (e) => {
      e.preventDefault();

      if (document.getElementById('restricted-toast')) return;

      const toast = document.createElement('div');
      toast.id = 'restricted-toast';
      toast.className = 'fixed bottom-5 right-5 sm:bottom-10 sm:right-10 bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0 z-50';

      toast.innerHTML = `
        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 shrink-0">
          <i class="fas fa-lock text-sm text-gray-300"></i>
        </div>
        <div class="text-sm font-medium pr-2">
          Project restricted. The link is not publicly available.
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
