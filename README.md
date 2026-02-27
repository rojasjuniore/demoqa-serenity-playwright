# DemoQA Automation Tests

## Descripcion

Proyecto de automatizacion de pruebas para el sitio [DemoQA](https://demoqa.com) utilizando:

- **Playwright** - Framework de automatizacion de navegadores
- **TypeScript** - Lenguaje de programacion tipado
- **Serenity/JS** - Framework de reportes y patron Screenplay

## Patron de Diseno: Screenplay

Este proyecto implementa el patron **Screenplay** de Serenity/JS, que organiza el codigo en:

### Estructura del Proyecto

```
demoqa-serenity-playwright/
├── src/
│   └── screenplay/
│       ├── ui/                    # Page Elements (localizadores)
│       │   ├── HomePage.ts
│       │   ├── TextBoxPage.ts
│       │   ├── PracticeFormPage.ts
│       │   ├── AlertsPage.ts
│       │   ├── AccordianPage.ts
│       │   ├── DroppablePage.ts
│       │   └── BookStorePage.ts
│       ├── tasks/                 # Acciones que realiza el actor
│       │   ├── NavigateToHomePage.ts
│       │   ├── FillTextBoxForm.ts
│       │   ├── FillPracticeForm.ts
│       │   ├── HandleAlert.ts
│       │   ├── ExpandAccordian.ts
│       │   ├── DragAndDrop.ts
│       │   └── SearchBooks.ts
│       └── questions/             # Verificaciones/Assertions
│           ├── HomePageQuestions.ts
│           ├── TextBoxQuestions.ts
│           ├── PracticeFormQuestions.ts
│           ├── AlertQuestions.ts
│           ├── AccordianQuestions.ts
│           ├── DroppableQuestions.ts
│           └── BookStoreQuestions.ts
├── tests/                         # Especificaciones de prueba
│   ├── 01-home-page.spec.ts
│   ├── 02-text-box.spec.ts
│   ├── 03-practice-form.spec.ts
│   ├── 04-alerts.spec.ts
│   ├── 05-accordian.spec.ts
│   ├── 06-drag-and-drop.spec.ts
│   └── 07-book-store.spec.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── serenity.properties
```

### Conceptos del Patron Screenplay

| Concepto | Descripcion | Ubicacion |
|----------|-------------|-----------|
| **Actors** | Usuarios que interactuan con el sistema | Proporcionados por `@serenity-js/playwright-test` |
| **Abilities** | Capacidades del actor (ej. navegar web) | `BrowseTheWeb` de Serenity/JS |
| **Tasks** | Acciones de alto nivel (ej. llenar formulario) | `src/screenplay/tasks/` |
| **Questions** | Verificaciones sobre el estado del sistema | `src/screenplay/questions/` |
| **Interactions** | Acciones atomicas (click, type, etc.) | Proporcionadas por Serenity/JS |
| **Page Elements** | Localizadores de elementos UI | `src/screenplay/ui/` |

## Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x

## Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd demoqa-serenity-playwright

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install chromium
```

## Ejecucion de Pruebas

### Ejecutar todas las pruebas (headless)

```bash
npm test
```

Este comando:
1. Limpia reportes anteriores
2. Ejecuta todas las pruebas
3. Genera el reporte de Serenity/JS

### Ejecutar pruebas con navegador visible

```bash
npm run test:headed
```

### Ejecutar pruebas en modo debug

```bash
npm run test:debug
```

### Ejecutar un caso especifico

```bash
# Solo el caso 1 (Home Page)
npx playwright test 01-home-page.spec.ts

# Solo el caso de Text Box
npx playwright test 02-text-box.spec.ts
```

## Reportes

### Generar Reporte Serenity/JS

El reporte se genera automaticamente al ejecutar `npm test`. Para ver el reporte:

```bash
# El reporte HTML se encuentra en:
open target/site/serenity/index.html
```

### Reporte de Playwright

```bash
# Ver reporte HTML de Playwright
npx playwright show-report
```

## Casos de Prueba Implementados

### Caso 1: Navegar a la Pagina Principal
- Verifica que la pagina carga sin errores
- Confirma que todas las secciones del menu principal estan visibles:
  - Elements
  - Forms
  - Alerts, Frame & Windows
  - Widgets
  - Interactions
  - Book Store Application

### Caso 2: Section Elements - Text Box
- Llena el formulario con nombre y email
- Verifica que los datos ingresados se reflejan en el output

### Caso 3: Section Forms - Practice Form
- Completa todos los campos obligatorios del formulario
- Verifica que aparece el modal de confirmacion exitosa

### Caso 4: Section Alerts, Frame & Windows
- Dispara una alerta simple y la acepta
- Dispara una alerta de confirmacion y valida el resultado

### Caso 5: Section Widgets - Accordion
- Verifica que Section 1 esta expandida por defecto
- Expande Section 2 y verifica contenido
- Expande Section 3 y verifica contenido

### Caso 6: Section Interactions - Drag and Drop
- Arrastra el elemento draggable al area droppable
- Verifica que el texto cambia a "Dropped!"

### Caso 7: Book Store Application - Busqueda
- Busca el termino "Git" en el Book Store
- Verifica que los resultados contienen el termino buscado

## Configuracion

### playwright.config.ts

- **Browser:** Chromium (Desktop Chrome)
- **Base URL:** https://demoqa.com
- **Timeout:** 60 segundos por test
- **Headless:** true (por defecto)
- **Screenshots:** Solo en fallos
- **Videos:** Solo en fallos
- **Traces:** En primer reintento

### serenity.properties

Configuracion para el reporte de Serenity/JS.

## Autor

QA Engineer - Assessment Omni.pro

## Licencia

MIT
