/**
 * Ativos Oficiais Padrão da Barbearia Rota 99
 * SVGs vetoriais em Data URI de alta definição para garantir que o logo do cabeçalho
 * e o ícone do aplicativo carreguem instantaneamente em qualquer ambiente (Cloudflare, localhost, PWA).
 */

// Logo Horizontal para Fundo Escuro (Texto Branco e Ouro/Esmeralda com Tesoura e Navalha)
export const DEFAULT_ROTA99_LOGO_DARK = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 84" width="420" height="84" fill="none">
  <!-- Ícone da Tesoura e Pente Minimalista -->
  <g transform="translate(10, 16)">
    <circle cx="16" cy="16" r="14" fill="#10b981" fill-opacity="0.18" stroke="#10b981" stroke-width="2"/>
    <path d="M10 22 L22 10 M10 10 L22 22" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="11" cy="21" r="2.5" fill="#10b981"/>
    <circle cx="21" cy="21" r="2.5" fill="#10b981"/>
  </g>
  <!-- Tipografia BARBEARIA ROTA 99 -->
  <text x="54" y="36" fill="#FFFFFF" font-family="'Poppins', 'Segoe UI', system-ui, sans-serif" font-size="22" font-weight="900" letter-spacing="1.5">BARBEARIA</text>
  <text x="54" y="60" fill="#10b981" font-family="'Poppins', 'Segoe UI', system-ui, sans-serif" font-size="19" font-weight="900" letter-spacing="3.5">ROTA 99</text>
</svg>
`)}`;

// Logo Horizontal para Fundo Claro (Texto Escuro e Esmeralda)
export const DEFAULT_ROTA99_LOGO_LIGHT = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 84" width="420" height="84" fill="none">
  <!-- Ícone da Tesoura e Pente Minimalista -->
  <g transform="translate(10, 16)">
    <circle cx="16" cy="16" r="14" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2"/>
    <path d="M10 22 L22 10 M10 10 L22 22" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="11" cy="21" r="2.5" fill="#10b981"/>
    <circle cx="21" cy="21" r="2.5" fill="#10b981"/>
  </g>
  <!-- Tipografia BARBEARIA ROTA 99 -->
  <text x="54" y="36" fill="#0f172a" font-family="'Poppins', 'Segoe UI', system-ui, sans-serif" font-size="22" font-weight="900" letter-spacing="1.5">BARBEARIA</text>
  <text x="54" y="60" fill="#059669" font-family="'Poppins', 'Segoe UI', system-ui, sans-serif" font-size="19" font-weight="900" letter-spacing="3.5">ROTA 99</text>
</svg>
`)}`;

// Ícone Quadrado 1:1 Oficial do App (PWA Mobile e Favicon)
export const DEFAULT_ROTA99_ICON = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="128" fill="#151A1E"/>
  <rect x="24" y="24" width="464" height="464" rx="108" fill="none" stroke="#10b981" stroke-width="12" stroke-opacity="0.3"/>
  <g transform="translate(128, 100) scale(1.0)">
    <!-- Barber Pole / Razor / Scissors Motif -->
    <circle cx="128" cy="110" r="80" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="10"/>
    <path d="M80 158 L176 62 M80 62 L176 158" stroke="#10b981" stroke-width="14" stroke-linecap="round"/>
    <circle cx="85" cy="153" r="14" fill="#10b981"/>
    <circle cx="171" cy="153" r="14" fill="#10b981"/>
  </g>
  <text x="256" y="380" text-anchor="middle" fill="#FFFFFF" font-family="'Poppins', sans-serif" font-size="64" font-weight="900" letter-spacing="6">ROTA 99</text>
  <text x="256" y="420" text-anchor="middle" fill="#10b981" font-family="'Poppins', sans-serif" font-size="28" font-weight="800" letter-spacing="8">BARBEARIA</text>
</svg>
`)}`;
