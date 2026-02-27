import { By, PageElement } from '@serenity-js/web';

/**
 * Page Elements for the Accordian section
 */
export class AccordianPage {
  static readonly URL = 'https://demoqa.com/accordian';

  static readonly accordianMenuItem = PageElement.located(By.xpath("//span[text()='Accordian']"))
    .describedAs('Accordian menu item');

  static readonly section1Heading = PageElement.located(By.id('section1Heading'))
    .describedAs('Section 1 heading - What is Lorem Ipsum?');

  static readonly section1Content = PageElement.located(By.id('section1Content'))
    .describedAs('Section 1 content');

  static readonly section2Heading = PageElement.located(By.id('section2Heading'))
    .describedAs('Section 2 heading - Where does it come from?');

  static readonly section2Content = PageElement.located(By.id('section2Content'))
    .describedAs('Section 2 content');

  static readonly section3Heading = PageElement.located(By.id('section3Heading'))
    .describedAs('Section 3 heading - Why do we use it?');

  static readonly section3Content = PageElement.located(By.id('section3Content'))
    .describedAs('Section 3 content');
}
