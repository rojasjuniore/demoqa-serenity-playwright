import { By, PageElement, PageElements } from '@serenity-js/web';

/**
 * Page Elements for the Book Store Application section
 */
export class BookStorePage {
  static readonly URL = 'https://demoqa.com/books';

  static readonly bookStoreMenuItem = PageElement.located(By.xpath("//span[text()='Book Store']"))
    .describedAs('Book Store menu item');

  static readonly searchInput = PageElement.located(By.id('searchBox'))
    .describedAs('Search input field');

  static readonly bookRows = PageElements.located(By.css('.rt-tr-group'))
    .describedAs('Book rows in the table');

  static readonly bookTitles = PageElements.located(By.css('.mr-2 a'))
    .describedAs('Book titles');

  static readonly noRowsMessage = PageElement.located(By.css('.rt-noData'))
    .describedAs('No rows found message');
}
