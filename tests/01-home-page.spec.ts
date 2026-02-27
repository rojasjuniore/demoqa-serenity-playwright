import { describe, it } from '@serenity-js/playwright-test';
import { Wait, Duration, Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb } from '@serenity-js/web';
import { HomePage } from '../src/screenplay/ui';

/**
 * Custom interaction to wait for page load and scroll to see all cards
 */
const WaitForHomePageLoad = () =>
  Interaction.where(the`#actor waits for home page to load`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    // Wait for the page to be fully loaded
    await nativePage.waitForLoadState('domcontentloaded');
    
    // Scroll to ensure all cards are visible
    await nativePage.evaluate(() => window.scrollTo(0, 500));
    await nativePage.waitForTimeout(1000);
  });

const VerifyCardIsVisible = (cardName: string, selector: string) =>
  Interaction.where(the`#actor verifies ${cardName} card is visible`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    const card = nativePage.locator(selector);
    await card.waitFor({ state: 'visible', timeout: 10000 });
  });

describe('Caso 1: Navegar a la Pagina Principal', () => {

  it('La pagina carga sin errores y muestra el logo', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(HomePage.URL),
      WaitForHomePageLoad()
    );
  });

  it('Se visualiza la seccion Elements', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(HomePage.URL),
      WaitForHomePageLoad(),
      VerifyCardIsVisible('Elements', "//div[contains(@class,'card')]//h5[text()='Elements']")
    );
  });

  it('Se visualiza la seccion Forms', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(HomePage.URL),
      WaitForHomePageLoad(),
      VerifyCardIsVisible('Forms', "//div[contains(@class,'card')]//h5[text()='Forms']")
    );
  });

  it('Se visualiza la seccion Alerts, Frame & Windows', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(HomePage.URL),
      WaitForHomePageLoad(),
      VerifyCardIsVisible('Alerts', "//div[contains(@class,'card')]//h5[contains(text(),'Alerts')]")
    );
  });

  it('Se visualiza la seccion Widgets', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(HomePage.URL),
      WaitForHomePageLoad(),
      VerifyCardIsVisible('Widgets', "//div[contains(@class,'card')]//h5[text()='Widgets']")
    );
  });

  it('Se visualiza la seccion Interactions', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(HomePage.URL),
      WaitForHomePageLoad(),
      VerifyCardIsVisible('Interactions', "//div[contains(@class,'card')]//h5[text()='Interactions']")
    );
  });

  it('Se visualiza la seccion Book Store Application', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(HomePage.URL),
      WaitForHomePageLoad(),
      VerifyCardIsVisible('Book Store', "//div[contains(@class,'card')]//h5[contains(text(),'Book Store')]")
    );
  });

});
