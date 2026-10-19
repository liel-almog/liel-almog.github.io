/** Enhance static architecture descriptions with selectable component details. */
export function setupArchitectureDiagram(diagram: HTMLElement) {
  const nodes = Array.from(diagram.querySelectorAll<HTMLButtonElement>('[data-architecture-node]'));
  const detail = diagram.querySelector<HTMLElement>('[data-architecture-detail]');
  const title = diagram.querySelector<HTMLElement>('[data-detail-title]');
  const copy = diagram.querySelector<HTMLElement>('[data-detail-copy]');
  if (!nodes.length || !detail || !title || !copy) return;

  const select = (selected: HTMLButtonElement) => {
    nodes.forEach((node) => node.setAttribute('aria-pressed', String(node === selected)));
    title.textContent = selected.dataset.title ?? '';
    copy.textContent = selected.dataset.detail ?? '';
  };

  nodes.forEach((node) => {
    node.disabled = false;
    node.addEventListener('click', () => select(node));
    node.addEventListener('focus', () => select(node));
  });
  select(nodes[0]);
  diagram.querySelectorAll<HTMLElement>('[data-architecture-fallback]').forEach((description) => {
    description.hidden = true;
  });
  detail.hidden = false;
}
