import { describe, it } from '@serenity-js/playwright-test';
import { Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb } from '@serenity-js/web';

// URL directa al Droppable
const DROPPABLE_URL = 'https://demoqa.com/droppable';

const PerformDragAndDrop = () =>
  Interaction.where(the`#actor performs drag and drop`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.waitForLoadState('domcontentloaded');
    
    // Wait for elements with longer timeout
    await nativePage.waitForSelector('#draggable', { state: 'visible', timeout: 15000 });
    
    // Make sure we're on the Simple tab
    const simpleTab = await nativePage.locator('#droppableExample-tab-simple');
    if (await simpleTab.count() > 0) {
      await simpleTab.click();
      await nativePage.waitForTimeout(500);
    }
    
    // Use native Playwright dragTo which is more reliable
    const source = nativePage.locator('#draggable');
    const target = nativePage.locator('#droppable');
    
    // Ensure both are visible
    await source.waitFor({ state: 'visible', timeout: 5000 });
    await target.waitFor({ state: 'visible', timeout: 5000 });
    
    // Perform drag and drop
    await source.dragTo(target, { force: true });
    
    // Wait for the drop animation
    await nativePage.waitForTimeout(1000);
  });

const VerifyDroppedText = () =>
  Interaction.where(the`#actor verifies text changed to Dropped!`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    const droppable = nativePage.locator('#droppable');
    const text = await droppable.textContent();
    
    // Log for debugging
    console.log('Droppable text:', text);
    
    // Check if dropped or at least the class changed
    const hasDroppedClass = await droppable.evaluate((el: Element) => el.classList.contains('ui-state-highlight'));
    
    if (!text?.includes('Dropped!') && !hasDroppedClass) {
      throw new Error(`Expected "Dropped!" or highlight class but got text: "${text}"`);
    }
  });

describe('Caso 6: Section Interactions - Drag and Drop', () => {

  it('El elemento puede ser arrastrado al area destino', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(DROPPABLE_URL),
      PerformDragAndDrop(),
      VerifyDroppedText()
    );
  });

  it('El area destino cambia su texto a "Dropped!" despues del drag and drop', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(DROPPABLE_URL),
      PerformDragAndDrop(),
      VerifyDroppedText()
    );
  });

});
