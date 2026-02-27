import { By, PageElement } from '@serenity-js/web';

/**
 * Page Elements for the Practice Form section
 */
export class PracticeFormPage {
  static readonly URL = 'https://demoqa.com/automation-practice-form';

  static readonly practiceFormMenuItem = PageElement.located(By.xpath("//span[text()='Practice Form']"))
    .describedAs('Practice Form menu item');

  static readonly firstNameInput = PageElement.located(By.id('firstName'))
    .describedAs('First Name input');

  static readonly lastNameInput = PageElement.located(By.id('lastName'))
    .describedAs('Last Name input');

  static readonly emailInput = PageElement.located(By.id('userEmail'))
    .describedAs('Email input');

  static readonly maleGenderRadio = PageElement.located(By.css('label[for="gender-radio-1"]'))
    .describedAs('Male gender radio button');

  static readonly femaleGenderRadio = PageElement.located(By.css('label[for="gender-radio-2"]'))
    .describedAs('Female gender radio button');

  static readonly mobileInput = PageElement.located(By.id('userNumber'))
    .describedAs('Mobile number input');

  static readonly submitButton = PageElement.located(By.id('submit'))
    .describedAs('Submit button');

  static readonly confirmationModal = PageElement.located(By.css('.modal-content'))
    .describedAs('Confirmation modal');

  static readonly modalTitle = PageElement.located(By.id('example-modal-sizes-title-lg'))
    .describedAs('Modal title');

  static readonly closeModalButton = PageElement.located(By.id('closeLargeModal'))
    .describedAs('Close modal button');
}
