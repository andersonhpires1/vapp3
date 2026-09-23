import { DEFAULT_ROTA99_LOGO_DARK, DEFAULT_ROTA99_LOGO_LIGHT, DEFAULT_ROTA99_ICON } from './defaultSalonAssets';

export function getSalonLogo(name?: string, variant: 'light' | 'dark' | 'icon' = 'dark'): string {
  const n = (name || '').toLowerCase();
  if (n.includes('rota') || n.includes('barbearia') || !name) {
    if (variant === 'light') return DEFAULT_ROTA99_LOGO_LIGHT;
    if (variant === 'icon') return DEFAULT_ROTA99_ICON;
    return DEFAULT_ROTA99_LOGO_DARK;
  }
  return DEFAULT_ROTA99_LOGO_DARK;
}
