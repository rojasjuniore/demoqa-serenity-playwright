import { By, PageElement, PageElements } from '@serenity-js/web';

/**
 * Page Elements for the DemoQA Home Page
 */
export class HomePage {
  static readonly URL = 'https://demoqa.com';

  static readonly pageTitle = PageElement.located(By.css('header img[src*="Toolsqa"]'))
    .describedAs('DemoQA logo');

  static readonly mainCards = PageElements.located(By.css('.card'))
    .describedAs('main menu cards');

  static readonly elementsCard = PageElement.located(By.xpath("//div[contains(@class,'card')]//h5[text()='Elements']"))
    .describedAs('Elements card');

  static readonly formsCard = PageElement.located(By.xpath("//div[contains(@class,'card')]//h5[text()='Forms']"))
    .describedAs('Forms card');

  static readonly alertsCard = PageElement.located(By.xpath("//div[contains(@class,'card')]//h5[contains(text(),'Alerts')]"))
    .describedAs('Alerts, Frame & Windows card');

  static readonly widgetsCard = PageElement.located(By.xpath("//div[contains(@class,'card')]//h5[text()='Widgets']"))
    .describedAs('Widgets card');

  static readonly interactionsCard = PageElement.located(By.xpath("//div[contains(@class,'card')]//h5[text()='Interactions']"))
    .describedAs('Interactions card');

  static readonly bookStoreCard = PageElement.located(By.xpath("//div[contains(@class,'card')]//h5[contains(text(),'Book Store')]"))
    .describedAs('Book Store Application card');
}
