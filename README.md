# DemoQA Automation Tests

Proyecto de automatización de pruebas para [DemoQA](https://demoqa.com) utilizando **Playwright**, **TypeScript** y **Serenity/JS** con el patrón de diseño **Screenplay**.

## Estado Actual

| Caso | Descripción | Tests | Estado |
|------|-------------|-------|--------|
| 1 | Home Page - Secciones visibles | 7 | ✅ Pasando |
| 2 | Text Box - Formulario | 3 | ✅ Pasando |
| 3 | Practice Form - Formulario completo | 2 | ✅ Pasando |
| 4 | Alerts - Manejo de alertas | 2 | ⚠️ En ajuste |
| 5 | Accordion - Expandir/contraer | 3 | ⚠️ En ajuste |
| 6 | Drag and Drop - Arrastrar y soltar | 2 | ⚠️ En ajuste |
| 7 | Book Store - Búsqueda de libros | 3 | ✅ Pasando |

**Total: 15/22 tests pasando (68%)**

---

## Patrón de Diseño: Screenplay

El patrón Screenplay organiza el código de automatización en capas claras y mantenibles:

### Conceptos Clave

```
┌─────────────────────────────────────────────────────────────┐
│                         ACTOR                                │
│         (Usuario que interactúa con el sistema)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         TASKS                                │
│     (Acciones de alto nivel que el actor realiza)           │
│     Ejemplo: "Llenar formulario", "Buscar libro"            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      INTERACTIONS                            │
│      (Acciones atómicas: click, type, navigate)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     PAGE ELEMENTS (UI)                       │
│         (Localizadores de elementos en la página)           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       QUESTIONS                              │
│       (Verificaciones sobre el estado del sistema)          │
│       Ejemplo: "¿El modal es visible?", "¿Qué texto hay?"   │
└─────────────────────────────────────────────────────────────┘
```

---

## Estructura del Proyecto

```
demoqa-serenity-playwright/
│
├── src/
│   └── screenplay/
│       │
│       ├── ui/                      # 📍 PAGE ELEMENTS
│       │   ├── HomePage.ts          # Localizadores de la página principal
│       │   ├── TextBoxPage.ts       # Localizadores del formulario Text Box
│       │   ├── PracticeFormPage.ts  # Localizadores del Practice Form
│       │   ├── AlertsPage.ts        # Localizadores de la sección Alerts
│       │   ├── AccordianPage.ts     # Localizadores del Accordion
│       │   ├── DroppablePage.ts     # Localizadores del Drag & Drop
│       │   ├── BookStorePage.ts     # Localizadores del Book Store
│       │   └── index.ts             # Exportaciones
│       │
│       ├── tasks/                   # 🎯 TASKS (Acciones)
│       │   ├── NavigateToHomePage.ts
│       │   ├── FillTextBoxForm.ts
│       │   ├── FillPracticeForm.ts
│       │   ├── HandleAlert.ts
│       │   ├── ExpandAccordian.ts
│       │   ├── DragAndDrop.ts
│       │   ├── SearchBooks.ts
│       │   └── index.ts
│       │
│       └── questions/               # ❓ QUESTIONS (Verificaciones)
│           ├── HomePageQuestions.ts
│           ├── TextBoxQuestions.ts
│           ├── PracticeFormQuestions.ts
│           ├── AlertQuestions.ts
│           ├── AccordianQuestions.ts
│           ├── DroppableQuestions.ts
│           ├── BookStoreQuestions.ts
│           └── index.ts
│
├── tests/                           # 🧪 ESPECIFICACIONES DE PRUEBA
│   ├── 01-home-page.spec.ts         # Caso 1: Navegación
│   ├── 02-text-box.spec.ts          # Caso 2: Text Box
│   ├── 03-practice-form.spec.ts     # Caso 3: Practice Form
│   ├── 04-alerts.spec.ts            # Caso 4: Alerts
│   ├── 05-accordian.spec.ts         # Caso 5: Accordion
│   ├── 06-drag-and-drop.spec.ts     # Caso 6: Drag & Drop
│   └── 07-book-store.spec.ts        # Caso 7: Book Store
│
├── playwright.config.ts             # Configuración de Playwright
├── tsconfig.json                    # Configuración de TypeScript
├── package.json                     # Dependencias
└── serenity.properties              # Configuración de Serenity
```

---

## Cómo Funciona el Código

### 1. Page Elements (UI) - Localizadores

Los Page Elements definen DÓNDE están los elementos en la página:

```typescript
// src/screenplay/ui/TextBoxPage.ts
import { By, PageElement } from '@serenity-js/web';

export class TextBoxPage {
  static readonly URL = 'https://demoqa.com/text-box';
  
  // Localizar el campo de nombre por ID
  static readonly fullNameInput = PageElement.located(By.id('userName'))
    .describedAs('Full Name input field');
  
  // Localizar el botón submit
  static readonly submitButton = PageElement.located(By.id('submit'))
    .describedAs('Submit button');
}
```

### 2. Tasks - Acciones del Usuario

Los Tasks definen QUÉ hace el usuario:

```typescript
// src/screenplay/tasks/FillTextBoxForm.ts
import { Task } from '@serenity-js/core';
import { Enter, Click, Scroll } from '@serenity-js/web';
import { TextBoxPage } from '../ui';

export const FillTextBoxForm = (name: string, email: string) =>
  Task.where('#actor fills the Text Box form',
    Enter.theValue(name).into(TextBoxPage.fullNameInput),
    Enter.theValue(email).into(TextBoxPage.emailInput),
    Scroll.to(TextBoxPage.submitButton),
    Click.on(TextBoxPage.submitButton)
  );
```

### 3. Questions - Verificaciones

Las Questions definen QUÉ verificamos:

```typescript
// src/screenplay/questions/TextBoxQuestions.ts
import { Question } from '@serenity-js/core';
import { Text, isVisible } from '@serenity-js/web';
import { TextBoxPage } from '../ui';

export class TextBoxQuestions {
  static outputContainsName = (name: string) =>
    Question.about(`output contains name "${name}"`, async actor => {
      const text = await actor.answer(Text.of(TextBoxPage.outputName));
      return text.includes(name);
    });
}
```

### 4. Test Specs - Especificaciones de Prueba

Los tests combinan todo usando el Actor:

```typescript
// tests/02-text-box.spec.ts
import { describe, it } from '@serenity-js/playwright-test';
import { Navigate } from '@serenity-js/web';
import { FillTextBoxForm } from '../src/screenplay/tasks';

describe('Caso 2: Text Box', () => {
  it('El formulario acepta datos y muestra resultado', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to('https://demoqa.com/text-box'),
      FillTextBoxForm('Juan Perez', 'juan@email.com')
    );
  });
});
```

### 5. Interactions Personalizadas

Para acciones complejas, creamos Interactions personalizadas:

```typescript
import { Interaction, the } from '@serenity-js/core';
import { BrowseTheWeb } from '@serenity-js/web';

const VerifyOutputContains = (expectedText: string) =>
  Interaction.where(the`#actor verifies output contains "${expectedText}"`, 
    async actor => {
      const page = await BrowseTheWeb.as(actor).currentPage();
      const nativePage = await (page as any).nativePage();
      
      const output = await nativePage.textContent('#output');
      if (!output.includes(expectedText)) {
        throw new Error(`Expected "${expectedText}" but got "${output}"`);
      }
    }
  );
```

---

## Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/rojasjuniore/demoqa-serenity-playwright.git
cd demoqa-serenity-playwright

# 2. Instalar dependencias
npm install

# 3. Instalar navegador Chromium
npx playwright install chromium
```

---

## Ejecución de Pruebas

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests con navegador visible
```bash
npm run test:headed
```

### Ejecutar un caso específico
```bash
# Solo Caso 1 - Home Page
npx playwright test tests/01-home-page.spec.ts

# Solo Caso 2 - Text Box
npx playwright test tests/02-text-box.spec.ts

# Solo Caso 7 - Book Store
npx playwright test tests/07-book-store.spec.ts
```

### Ejecutar en modo debug
```bash
npm run test:debug
```

### Ver reporte HTML
```bash
npx playwright show-report
```

---

## Dependencias Principales

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| @playwright/test | ^1.42.0 | Framework de automatización |
| @serenity-js/core | ^3.22.0 | Core de Serenity/JS |
| @serenity-js/playwright | ^3.22.0 | Integración con Playwright |
| @serenity-js/playwright-test | ^3.22.0 | Test runner |
| @serenity-js/web | ^3.22.0 | Interacciones web |
| @serenity-js/assertions | ^3.22.0 | Assertions |
| typescript | ^5.3.0 | TypeScript |

---

## Issues Conocidos

### Caso 4 - Alerts
- **Problema**: Conflicto con el handler de diálogos predeterminado de Playwright
- **Causa**: Playwright ya maneja automáticamente los diálogos
- **Workaround**: Usar `page.on('dialog')` antes de la acción

### Caso 5 - Accordion  
- **Problema**: Selectores CSS no coinciden con la estructura del DOM
- **Causa**: La página usa clases dinámicas
- **Workaround**: Usar selectores basados en texto o XPath

### Caso 6 - Drag and Drop
- **Problema**: El método `dragTo()` no funciona correctamente
- **Causa**: Posible protección anti-bot del sitio
- **Workaround**: Usar eventos de mouse manuales

---

## Autor

QA Engineer - Assessment Omni.pro CX Quality Assurance

## Licencia

MIT
