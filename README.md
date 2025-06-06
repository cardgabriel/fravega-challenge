# Fravega Challenge

## 🚀 Stack Tecnológico

**Frontend:** Next.js 15 (App Router) + React 19 + TypeScript + SCSS Modules  
**Estado:** TanStack Query v5 + Axios  
**Calidad:** ESLint + Prettier + Husky
**Testing:** Jest + Testing Library

## 📦 Instalación y Comandos

```bash
# Instalar y configurar
git clone git@github.com:cardgabriel/fravega-challenge.git
npm install
npm run prepare

# Desarrollo
npm run dev              # Servidor con Turbopack
npm run build           # Build producción
npm run start           # Servidor producción

# Calidad
npm run lint            # Verificar errores
npm run lint:fix        # Corregir automáticamente
npm run format          # Formatear código
npm run type-check      # Verificar tipos

# Testing
npm test                # Tests en modo watch
npm run test:ci         # Tests con coverage
```

## 🏗️ Estructura

```
├── app/                    # Aplicación (App Router)
│   ├── _lib/              # Configuraciones y utilidades
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout raíz
│   ├── page.tsx           # Página principal
│   └── providers.tsx      # Providers React
├── __tests__/             # Tests
├── .husky/                # Git hooks
└── public/                # Archivos estáticos
```

## ⚙️ Configuración

**Variables de entorno** (`.env.local`):

```env
NEXT_PUBLIC_API_URL=https://tu-api.com
```

**Cliente HTTP:** Preconfigurado en `app/_lib/axiosClient.ts` con timeout 10s y headers JSON.

**Git Hooks:** Pre-commit (formateo/linting) y pre-push (tests/build).

## 🧪 Características

- **Desarrollo ultra-rápido** con Turbopack
- **Type safety** completo con TypeScript
- **Gestión de estado** optimizada con TanStack Query
- **Estilos encapsulados** con SCSS Modules
- **Testing completo** con coverage automático
- **Calidad automática** con ESLint, Prettier y git hooks
- **DevTools** de React Query incluidas
- **Convenciones:** PascalCase (componentes), camelCase (utilidades), SCSS Modules.

Abre [http://localhost:3000](http://localhost:3000) después de `npm run dev` para comenzar.

---

_Proyecto publico - Fravega Challenge_
