/** Progressive enhancement: content stays visible if motion or JS is unavailable. */
export function setupMotion() {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const toggle = document.querySelector<HTMLButtonElement>('.motion-toggle');
  const label = toggle?.querySelector<HTMLElement>('[data-motion-label]');
  const map = document.querySelector<HTMLElement>('[data-system-map]');
  const animations = new Set<Animation>();
  let paused = preference.matches;
  let observer: IntersectionObserver | undefined;

  const targets = Array.from(document.querySelectorAll<HTMLElement>(
    'main section:not(#top) h2, main section:not(#top) > div > p, #intro-video > div > *, #experience ol > li, #expertise article, [data-project-tabs], #contact > div > div',
  ));
  // Avoid animating both a heading and its parent, or hiding content already on screen.
  const revealTargets = targets.filter((target) =>
    !targets.some((parent) => parent !== target && parent.contains(target)) &&
    target.getBoundingClientRect().top >= window.innerHeight,
  );
  const reveal = () => {
    observer?.disconnect();
    animations.forEach((animation) => animation.cancel());
    animations.clear();
    revealTargets.forEach((target) => target.classList.remove('reveal-pending'));
    if (paused) return;
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        const animation = entry.target.animate([
          { opacity: 0, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 650, delay: Math.min(index * 45, 135), easing: 'ease-out', fill: 'backwards' });
        entry.target.classList.remove('reveal-pending');
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
        observer?.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    revealTargets.forEach((target) => {
      if (target.getBoundingClientRect().top < window.innerHeight) return;
      target.classList.add('reveal-pending');
      observer?.observe(target);
    });
  };

  const update = () => {
    root.classList.toggle('motion-paused', paused);
    toggle?.setAttribute('aria-pressed', String(paused));
    if (label) label.textContent = paused ? 'Enable motion' : 'Pause motion';
    if (paused) {
      map?.style.removeProperty('--tilt-x');
      map?.style.removeProperty('--tilt-y');
    }
    reveal();
  };
  toggle?.addEventListener('click', () => { paused = !paused; update(); });
  preference.addEventListener('change', () => { paused = preference.matches; update(); });
  if (toggle) toggle.hidden = false;
  update();

  let pointerFrame = 0;
  map?.addEventListener('pointermove', (event) => {
    if (paused || preference.matches || !finePointer.matches) return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const rect = map.getBoundingClientRect();
      map.style.setProperty('--tilt-x', `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 12}deg`);
      map.style.setProperty('--tilt-y', `${(event.clientX - rect.left - rect.width / 2) / rect.width * 12}deg`);
    });
  });
  map?.addEventListener('pointerleave', () => {
    cancelAnimationFrame(pointerFrame);
    map.style.removeProperty('--tilt-x');
    map.style.removeProperty('--tilt-y');
  });

  const progress = document.querySelector<HTMLElement>('.reading-progress');
  let scrollFrame = 0;
  const updateProgress = () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      const distance = root.scrollHeight - window.innerHeight;
      progress?.style.setProperty('--progress', String(distance > 0 ? window.scrollY / distance : 0));
    });
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}
