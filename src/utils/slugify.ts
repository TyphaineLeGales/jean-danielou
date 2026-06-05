export const slugify = (str: String) => str
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/\.md$/, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');