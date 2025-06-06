# Guía de Desarrollo

Este documento describe las herramientas y configuraciones de desarrollo implementadas en este proyecto.

## 🛠️ Herramientas Configuradas

### ESLint

Configurado para mantener la calidad del código con reglas específicas para:

- TypeScript
- React
- Next.js
- Calidad general del código

**Comandos:**

```bash
npm run lint        # Verificar errores de linting
npm run lint:fix    # Corregir errores automáticamente
```

### Prettier

Formateador de código automático configurado con:

- Sin punto y coma
- Comillas simples
- Ancho máximo de línea: 100 caracteres
- Trailing commas en ES5

**Comandos:**

```bash
npm run format       # Formatear todo el código
npm run format:check # Verificar si el código está formateado
```

### Husky + Lint-staged

Configurado para ejecutar verificaciones automáticas en git hooks:

**Pre-commit:**

- Ejecuta `lint-staged` en archivos modificados
- Formatea código con Prettier
- Verifica código con ESLint
- Ejecuta verificación de tipos TypeScript

**Pre-push:**

- Ejecuta todos los tests
- Verifica que el build funciona correctamente

### Jest + Testing Library

Framework de testing configurado para:

- Componentes React
- TypeScript
- Módulos CSS/SCSS
- Coverage reports

**Comandos:**

```bash
npm test            # Ejecutar tests
npm run test:watch  # Ejecutar tests en modo watch
npm run test:ci     # Ejecutar tests para CI (con coverage)
```

### TanStack Query + Axios

- **Axios**: Cliente HTTP configurado con interceptores
- **TanStack Query**: Gestión de estado del servidor con cache automático
- **React Query Devtools**: Herramientas de desarrollo para debugging

### SCSS Modules

- Soporte completo para SCSS
- CSS Modules para estilos encapsulados
- Compilación automática con Next.js

## 📁 Estructura de Archivos

```
├── app/
│   ├── components/     # Componentes reutilizables
│   ├── hooks/         # Hooks personalizados
│   ├── lib/           # Utilidades y configuraciones
│   └── ...
├── __tests__/         # Tests
├── .husky/            # Git hooks
├── .vscode/           # Configuración de VS Code
├── jest.config.js     # Configuración de Jest
├── .prettierrc        # Configuración de Prettier
└── eslint.config.mjs  # Configuración de ESLint
```

## 🔧 Configuración de VS Code

El proyecto incluye configuraciones recomendadas para VS Code:

**Extensiones recomendadas:**

- ESLint
- Prettier
- TypeScript
- Jest
- Error Lens

**Características:**

- Formateo automático al guardar
- Fix automático de ESLint al guardar
- Organización automática de imports

## 🚀 Flujo de Desarrollo

1. **Desarrollo:**

   ```bash
   npm run dev  # Iniciar servidor de desarrollo
   ```

2. **Antes de commit:**

   - Los hooks de pre-commit se ejecutan automáticamente
   - Formateo y linting de archivos modificados
   - Verificación de tipos TypeScript

3. **Antes de push:**

   - Los hooks de pre-push se ejecutan automáticamente
   - Todos los tests deben pasar
   - El build debe ser exitoso

4. **Testing:**
   ```bash
   npm run test:watch  # Durante el desarrollo
   npm run test:ci     # Para verificación completa
   ```

## 🎯 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Build para producción
npm run start           # Servidor de producción

# Calidad de código
npm run lint            # Verificar linting
npm run lint:fix        # Corregir automáticamente
npm run format          # Formatear código
npm run type-check      # Verificar tipos TypeScript

# Testing
npm test                # Ejecutar tests
npm run test:watch      # Tests en modo watch
npm run test:ci         # Tests con coverage
```

## 📋 Checklist Pre-commit

Los siguientes checks se ejecutan automáticamente antes de cada commit:

- [ ] ✅ Código formateado con Prettier
- [ ] ✅ Sin errores de ESLint
- [ ] ✅ Verificación de tipos TypeScript
- [ ] ✅ Tests pasando (solo en pre-push)
- [ ] ✅ Build exitoso (solo en pre-push)

## 🛡️ Reglas de Calidad

### ESLint Rules Destacadas:

- `@typescript-eslint/no-unused-vars`: Variables no utilizadas
- `no-console`: Solo permite `console.warn` y `console.error`
- `prefer-const`: Preferir const sobre let
- `react/self-closing-comp`: Componentes auto-cerrados

### Prettier Config:

- Semi: false (sin punto y coma)
- Single Quote: true (comillas simples)
- Print Width: 100 (ancho máximo de línea)
- Trailing Comma: es5

## 🔍 Debugging

### React Query Devtools

Las herramientas de desarrollo están disponibles en modo desarrollo para inspeccionar:

- Queries activas
- Cache
- Estados de loading
- Errores

### Jest Coverage

```bash
npm run test:ci
```

Genera un reporte de coverage en `coverage/lcov-report/index.html`
