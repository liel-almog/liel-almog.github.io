/** Keep every project readable until JavaScript enables the tab interface. */
export function setupProjectTabs(explorer: HTMLElement) {
  const tablist = explorer.querySelector<HTMLElement>('[data-project-tablist]');
  const tabs = Array.from(explorer.querySelectorAll<HTMLButtonElement>('[data-project-tab]'));
  const panels = Array.from(explorer.querySelectorAll<HTMLElement>('[data-project-panel]'));
  if (!tablist || !tabs.length || tabs.length !== panels.length) return;

  const activate = (index: number, focus = false) => {
    tabs.forEach((tab, current) => {
      const selected = current === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[current].hidden = !selected;
    });
    if (focus) tabs[index].focus();
  };

  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', (event) => {
      const vertical = tablist.getAttribute('aria-orientation') === 'vertical';
      let next: number;
      if (event.key === (vertical ? 'ArrowDown' : 'ArrowRight')) next = (index + 1) % tabs.length;
      else if (event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')) next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(next, true);
    });
  });

  const mobile = window.matchMedia('(max-width: 900px)');
  const setOrientation = () => tablist.setAttribute('aria-orientation', mobile.matches ? 'vertical' : 'horizontal');
  setOrientation();
  mobile.addEventListener('change', setOrientation);
  tablist.setAttribute('role', 'tablist');
  activate(0);
  tablist.hidden = false;
}
