import { describe, it } from '@serenity-js/playwright-test';
import { Ensure, includes } from '@serenity-js/assertions';
import { Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb, Text } from '@serenity-js/web';
import { TextBoxPage } from '../src/screenplay/ui';

const testData = {
  fullName: 'Juan Perez',
  email: 'juan.perez@example.com'
};

const FillAndSubmitTextBoxForm = (name: string, email: string) =>
  Interaction.where(the`#actor fills and submits the text box form`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.waitForLoadState('domcontentloaded');
    
    // Fill form fields
    await nativePage.fill('#userName', name);
    await nativePage.fill('#userEmail', email);
    
    // Scroll and click submit
    await nativePage.locator('#submit').scrollIntoViewIfNeeded();
    await nativePage.click('#submit');
    
    // Wait for output to appear
    await nativePage.waitForSelector('#output', { state: 'visible', timeout: 5000 });
  });

const VerifyOutputContains = (expectedText: string) =>
  Interaction.where(the`#actor verifies output contains "${expectedText}"`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    const output = await nativePage.textContent('#output');
    if (!output.includes(expectedText)) {
      throw new Error(`Expected output to contain "${expectedText}" but got "${output}"`);
    }
  });

describe('Caso 2: Section Elements - Text Box', () => {

  it('El formulario Text Box acepta datos y muestra el resultado', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(TextBoxPage.URL),
      FillAndSubmitTextBoxForm(testData.fullName, testData.email)
    );
  });

  it('El nombre ingresado se refleja en el resultado', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(TextBoxPage.URL),
      FillAndSubmitTextBoxForm(testData.fullName, testData.email),
      VerifyOutputContains(testData.fullName)
    );
  });

  it('El correo ingresado se refleja en el resultado', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(TextBoxPage.URL),
      FillAndSubmitTextBoxForm(testData.fullName, testData.email),
      VerifyOutputContains(testData.email)
    );
  });

});
