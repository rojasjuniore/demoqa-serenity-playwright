import { describe, it } from '@serenity-js/playwright-test';
import { Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb } from '@serenity-js/web';
import { AlertsPage } from '../src/screenplay/ui';

const TriggerAndAcceptSimpleAlert = () =>
  Interaction.where(the`#actor triggers and accepts simple alert`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.waitForLoadState('domcontentloaded');
    
    // Set up dialog handler before clicking
    nativePage.once('dialog', async (dialog: any) => {
      await dialog.accept();
    });
    
    // Click the alert button
    await nativePage.click('#alertButton');
    
    // Small wait to ensure dialog was handled
    await nativePage.waitForTimeout(500);
  });

const TriggerAndAcceptConfirmAlert = () =>
  Interaction.where(the`#actor triggers and accepts confirm alert`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.waitForLoadState('domcontentloaded');
    
    // Set up dialog handler before clicking
    nativePage.once('dialog', async (dialog: any) => {
      await dialog.accept();
    });
    
    // Click the confirm button
    await nativePage.click('#confirmButton');
    
    // Wait for result to appear
    await nativePage.waitForSelector('#confirmResult', { state: 'visible', timeout: 5000 });
  });

const VerifyConfirmResult = () =>
  Interaction.where(the`#actor verifies confirm result shows Ok`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    const result = await nativePage.textContent('#confirmResult');
    if (!result.includes('Ok')) {
      throw new Error(`Expected result to contain "Ok" but got "${result}"`);
    }
  });

describe('Caso 4: Section Alerts, Frame & Windows', () => {

  it('La alerta simple aparece y puede ser aceptada', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(AlertsPage.URL),
      TriggerAndAcceptSimpleAlert()
    );
  });

  it('La alerta de confirmacion puede ser aceptada y muestra resultado', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(AlertsPage.URL),
      TriggerAndAcceptConfirmAlert(),
      VerifyConfirmResult()
    );
  });

});
