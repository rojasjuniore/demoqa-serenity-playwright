import { describe, it } from '@serenity-js/playwright-test';
import { Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb } from '@serenity-js/web';
import { AccordianPage } from '../src/screenplay/ui';

const WaitForAccordianPage = () =>
  Interaction.where(the`#actor waits for accordian page to load`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.waitForLoadState('networkidle');
    await nativePage.waitForSelector('#section1Heading', { state: 'visible', timeout: 10000 });
  });

const VerifySection1IsExpanded = () =>
  Interaction.where(the`#actor verifies Section 1 is expanded`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    // Section 1 content should be visible by default
    const content = await nativePage.locator('#section1Content');
    const isVisible = await content.isVisible();
    if (!isVisible) {
      throw new Error('Section 1 content should be visible by default');
    }
  });

const ExpandAndVerifySection = (sectionNumber: number) =>
  Interaction.where(the`#actor expands and verifies section ${sectionNumber}`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    const headingId = `#section${sectionNumber}Heading`;
    const contentId = `#section${sectionNumber}Content`;
    
    // Click to expand
    await nativePage.click(headingId);
    
    // Wait for content to become visible
    await nativePage.waitForSelector(contentId, { state: 'visible', timeout: 5000 });
    
    // Verify content has text
    const text = await nativePage.textContent(contentId);
    if (!text || text.trim().length === 0) {
      throw new Error(`Section ${sectionNumber} content is empty`);
    }
  });

describe('Caso 5: Section Widgets - Accordion', () => {

  it('El acordeon Section 1 esta expandido por defecto con contenido', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(AccordianPage.URL),
      WaitForAccordianPage(),
      VerifySection1IsExpanded()
    );
  });

  it('Al hacer clic en Section 2, se expande y muestra contenido', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(AccordianPage.URL),
      WaitForAccordianPage(),
      ExpandAndVerifySection(2)
    );
  });

  it('Al hacer clic en Section 3, se expande y muestra contenido', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(AccordianPage.URL),
      WaitForAccordianPage(),
      ExpandAndVerifySection(3)
    );
  });

});
