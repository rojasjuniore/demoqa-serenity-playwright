import { describe, it } from '@serenity-js/playwright-test';
import { Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb } from '@serenity-js/web';
import { BookStorePage } from '../src/screenplay/ui';

const searchTerm = 'Git';

const WaitForBookStore = () =>
  Interaction.where(the`#actor waits for book store to load`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.waitForLoadState('domcontentloaded');
    await nativePage.waitForSelector('#searchBox', { state: 'visible', timeout: 10000 });
  });

const SearchForBooks = (term: string) =>
  Interaction.where(the`#actor searches for "${term}"`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    await nativePage.fill('#searchBox', term);
    await nativePage.waitForTimeout(1000); // Wait for filter to apply
  });

const VerifySearchResults = (term: string) =>
  Interaction.where(the`#actor verifies search results contain "${term}"`, async actor => {
    const page = await BrowseTheWeb.as(actor).currentPage();
    const nativePage = await (page as any).nativePage();
    
    // Get all book titles
    const titles = await nativePage.locator('.mr-2 a').allTextContents();
    
    if (titles.length === 0) {
      throw new Error('No books found in search results');
    }
    
    const hasMatch = titles.some(title => 
      title.toLowerCase().includes(term.toLowerCase())
    );
    
    if (!hasMatch) {
      throw new Error(`No books containing "${term}" found. Found: ${titles.join(', ')}`);
    }
  });

describe('Caso 7: Book Store Application - Busqueda de Libros', () => {

  it('El campo de busqueda esta visible en Book Store', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(BookStorePage.URL),
      WaitForBookStore()
    );
  });

  it('La busqueda con termino "Git" muestra resultados', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(BookStorePage.URL),
      WaitForBookStore(),
      SearchForBooks(searchTerm)
    );
  });

  it('Los resultados de busqueda contienen el termino buscado', async ({ actor }) => {
    await actor.attemptsTo(
      Navigate.to(BookStorePage.URL),
      WaitForBookStore(),
      SearchForBooks(searchTerm),
      VerifySearchResults(searchTerm)
    );
  });

});
