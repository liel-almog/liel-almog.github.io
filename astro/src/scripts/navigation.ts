/** Enhance one header; without JavaScript its navigation stays visible. */
export function setupNavigation(header: HTMLElement) {
  const toggle = header.querySelector<HTMLButtonElement>('.menu-toggle');
  const navigation = header.querySelector<HTMLElement>('nav');
  if (!toggle || !navigation) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
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
  header.dataset.enhanced = '';
}
