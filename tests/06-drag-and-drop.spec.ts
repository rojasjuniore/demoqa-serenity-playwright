import { describe, it } from '@serenity-js/playwright-test';
import { Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb } from '@serenity-js/web';
import { DroppablePage } from '../src/screenplay/ui';

const PerformDragAndDrop = () =>
  Interaction.where(the`#actor performs drag and drop`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.waitForLoadState('domcontentloaded');
    
    // Wait for elements
    await nativePage.waitForSelector('#draggable', { state: 'visible' });
    await nativePage.waitForSelector('#droppable', { state: 'visible' });
    
    // Get source and target
    const source = nativePage.locator('#draggable');
    const target = nativePage.locator('#simpleDropContainer #droppable');
    
    // Perform drag and drop
    await source.dragTo(target);
    
    // Wait a bit for the drop to register
    await nativePage.waitForTimeout(500);
  });

const VerifyDroppedText = () =>
  Interaction.where(the`#actor verifies text changed to Dropped!`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    const text = await nativePage.textContent('#simpleDropContainer #droppable');
    if (!text.includes('Dropped!')) {
      throw new Error(`Expected "Dropped!" but got "${text}"`);
    }
  });

describe('Caso 6: Section Interactions - Drag and Drop', () => {

  it('El elemento puede ser arrastrado al area destino', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(DroppablePage.URL),
      PerformDragAndDrop(),
      VerifyDroppedText()
    );
  });

  it('El area destino cambia su texto a "Dropped!" despues del drag and drop', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(DroppablePage.URL),
      PerformDragAndDrop(),
      VerifyDroppedText()
    );
  });

});
