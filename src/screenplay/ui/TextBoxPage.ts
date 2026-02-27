import { By, PageElement } from '@serenity-js/web';

/**
 * Page Elements for the Text Box section
 */
export class TextBoxPage {
  static readonly URL = 'https://demoqa.com/text-box';

  static readonly textBoxMenuItem = PageElement.located(By.xpath("//span[text()='Text Box']"))
    .describedAs('Text Box menu item');

  static readonly fullNameInput = PageElement.located(By.id('userName'))
    .describedAs('Full Name input field');

  static readonly emailInput = PageElement.located(By.id('userEmail'))
    .describedAs('Email input field');

  static readonly currentAddressInput = PageElement.located(By.id('currentAddress'))
    .describedAs('Current Address input field');

  static readonly permanentAddressInput = PageElement.located(By.id('permanentAddress'))
    .describedAs('Permanent Address input field');

  static readonly submitButton = PageElement.located(By.id('submit'))
    .describedAs('Submit button');

  static readonly outputContainer = PageElement.located(By.id('output'))
    .describedAs('Output container');

  static readonly outputName = PageElement.located(By.id('name'))
    .describedAs('Output name');

  static readonly outputEmail = PageElement.located(By.id('email'))
    .describedAs('Output email');
}
