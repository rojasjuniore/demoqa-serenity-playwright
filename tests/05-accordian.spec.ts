import { describe, it } from '@serenity-js/playwright-test';
import { Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb } from '@serenity-js/web';

// URL directa al Accordian
const ACCORDIAN_URL = 'https://demoqa.com/accordian';

const WaitForAccordianPage = () =>
  Interaction.where(the`#actor waits for accordian page to load`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.waitForLoadState('domcontentloaded');
    // Wait for accordion to be visible using the card class
    await nativePage.waitForSelector('.accordion', { state: 'visible', timeout: 15000 });
  });

const VerifySection1IsExpanded = () =>
  Interaction.where(the`#actor verifies Section 1 is expanded`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    // The first card should be expanded and show content about Lorem Ipsum
    const firstCardContent = await nativePage.locator('.accordion .card:first-child .collapse.show').first();
    await firstCardContent.waitFor({ state: 'visible', timeout: 5000 });
    
    const text = await firstCardContent.textContent();
    if (!text || !text.includes('Lorem Ipsum')) {
      throw new Error('Section 1 content should contain Lorem Ipsum text');
    }
  });

const ExpandAndVerifySection = (sectionIndex: number) =>
  Interaction.where(the`#actor expands and verifies section ${sectionIndex}`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    // Get the card heading (0-indexed)
    const cardHeading = await nativePage.locator(`.accordion .card:nth-child(${sectionIndex}) .card-header`);
    
    // Click to expand
    await cardHeading.click();
    
    // Wait for collapse to show
    await nativePage.waitForTimeout(500);
    
    // Verify content is visible
    const cardContent = await nativePage.locator(`.accordion .card:nth-child(${sectionIndex}) .collapse`);
    const text = await cardContent.textContent();
    
    if (!text || text.trim().length === 0) {
      throw new Error(`Section ${sectionIndex} content is empty`);
    }
  });

describe('Caso 5: Section Widgets - Accordion', () => {

  it('El acordeon Section 1 esta expandido por defecto con contenido', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(ACCORDIAN_URL),
      WaitForAccordianPage(),
      VerifySection1IsExpanded()
    );
  });

  it('Al hacer clic en Section 2, se expande y muestra contenido', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(ACCORDIAN_URL),
      WaitForAccordianPage(),
      ExpandAndVerifySection(2)
    );
  });

  it('Al hacer clic en Section 3, se expande y muestra contenido', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(ACCORDIAN_URL),
      WaitForAccordianPage(),
      ExpandAndVerifySection(3)
    );
  });

});
