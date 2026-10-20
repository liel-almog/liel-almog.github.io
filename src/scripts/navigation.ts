/** Enhance one header; without JavaScript its navigation stays visible. */
export function setupNavigation(header: HTMLElement) {
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const navigation = header.querySelector<HTMLElement>('nav');
  if (!toggle || !navigation) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    toggle.title = open ? 'Close navigation menu' : 'Open navigation menu';
    navigation.toggleAttribute('data-collapsed', !open);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false);
  });
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(max-width: 900px)').addEventListener('change', () => setOpen(false));

  toggle.hidden = false;
  navigation.dataset.enhanced = '';
  setOpen(false);
  header.dataset.enhanced = '';
}
