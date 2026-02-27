import { describe, it } from '@serenity-js/playwright-test';
import { Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb } from '@serenity-js/web';
import { PracticeFormPage } from '../src/screenplay/ui';

const testData = {
  firstName: 'Maria',
  lastName: 'Garcia',
  email: 'maria.garcia@example.com',
  mobile: '3001234567'
};

const FillAndSubmitPracticeForm = () =>
  Interaction.where(the`#actor fills and submits the practice form`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.waitForLoadState('domcontentloaded');
    
    // Fill required fields
    await nativePage.fill('#firstName', testData.firstName);
    await nativePage.fill('#lastName', testData.lastName);
    await nativePage.fill('#userEmail', testData.email);
    
    // Select gender
    await nativePage.click('label[for="gender-radio-1"]');
    
    // Fill mobile
    await nativePage.fill('#userNumber', testData.mobile);
    
    // Scroll and submit
    await nativePage.locator('#submit').scrollIntoViewIfNeeded();
    await nativePage.click('#submit');
    
    // Wait for modal
    await nativePage.waitForSelector('.modal-content', { state: 'visible', timeout: 10000 });
  });

const VerifyModalShowsSuccess = () =>
  Interaction.where(the`#actor verifies modal shows success message`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    const modalTitle = await nativePage.textContent('#example-modal-sizes-title-lg');
    if (!modalTitle.includes('Thanks for submitting the form')) {
      throw new Error(`Expected success message but got "${modalTitle}"`);
    }
  });

describe('Caso 3: Section Forms - Practice Form', () => {

  it('El formulario Practice Form acepta datos y muestra confirmacion', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(PracticeFormPage.URL),
      FillAndSubmitPracticeForm()
    );
  });

  it('El modal de confirmacion muestra mensaje de exito', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(PracticeFormPage.URL),
      FillAndSubmitPracticeForm(),
      VerifyModalShowsSuccess()
    );
  });

});
