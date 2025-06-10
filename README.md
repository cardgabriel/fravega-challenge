# Fravega - Challenge Técnico

Aplicación que usa la API de Github. Construida con Next.js 15 (App Router), TypeScript y React Query.

**[Deployment](https://fravega-challenge-git-main-cardgabriels-projects.vercel.app/users)**

---

## Technical Decisions

A continuación, se detallan las decisiones clave de arquitectura:

- **Framework (Next.js - App Router):** Se eligió por su ecosistema de desarrollo integrado (rutas, renderizado, optimización de imágenes) y el modelo de `Server Components`, que permite un renderizado más eficiente.
- **State Management (TanStack Query):** Se optó por React Query para gestionar el estado del servidor. Esta decisión desacopla el estado remoto de la UI, simplifica la lógica de fetching y caching, y proporciona hooks nativos para manejar estados (loading, error) y optimizar la performance (re-fetching, stale-while-revalidate).
- **Styling (SCSS Modules):** Se optó por SCSS Modules para un alcance de estilos local por defecto (scoped), evitando colisiones de CSS y permitiendo el uso de la sintaxis avanzada de SASS.
- **Code Quality (ESLint + Prettier + Husky):** Se configuró un pipeline de calidad estricto. Los git hooks (`pre-commit`) fuerzan el formateo y el análisis estático del código antes de cada commit, garantizando la consistencia y previniendo errores comunes.

---

## Core Features

- **Búsqueda de usuarios** con feedback de UI en tiempo real.
- **Página de detalle** de usuario.
- **Lista de favoritos** con persistencia en `localStorage`.
- **Sorting** en la lista de favoritos.
- **Diseño responsivo** adaptable a múltiples dispositivos.

---

## Testing

Se implementaron tests unitarios y de integración con **Jest** y **React Testing Library**. La estrategia de testing se centra en:

- Validar la lógica de negocio en hooks, servicices y utils.
- Asegurar que los componentes críticos se rendericen y se comporten como es esperado ante la interacción del usuario.

---

## 🛠️ Stack

- **Framework**: Next.js 15 (App Router and React 19)
- **Lenguaje**: TypeScript
- **Data Fetching**: TanStack Query v5
- **HTTP Client**: Axios
- **Estilos**: SCSS Modules
- **Testing**: Jest + React Testing Library
- **Calidad de Código**: ESLint, Prettier, Husky

---

## 🚀 Instalación y Uso

**Requisitos:** Node.js 20.x o superior.

1.  **Clonar y configurar el proyecto:**

    ```bash
    git clone git@github.com:cardgabriel/fravega-challenge.git
    cd tu-repositorio
    npm install
    ```

2.  **Variables de entorno:**
    Crea un archivo `.env.local` en la raíz y configura tu Github Token(solo en caso de que excedas el rate limit).

    ```env
    GITHUB_TOKEN=<TU_TOKEN>
    ```

3.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación se iniciará en `http://localhost:3000`.

### Comandos Disponibles

| Comando           | Descripción                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo con Turbopack. |
| `npm run build`   | Compila la aplicación para producción.          |
| `npm run start`   | Inicia un servidor de producción.               |
| `npm test`        | Ejecuta los tests en modo interactivo.          |
| `npm run test:ci` | Ejecuta los tests una vez y genera cobertura.   |
| `npm run lint`    | Analiza el código con ESLint.                   |
| `npm run format`  | Formatea todo el código con Prettier.           |
