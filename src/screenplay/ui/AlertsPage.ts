import { By, PageElement } from '@serenity-js/web';

/**
 * Page Elements for the Alerts, Frame & Windows section
 */
export class AlertsPage {
  static readonly URL = 'https://demoqa.com/alerts';

  static readonly alertsMenuItem = PageElement.located(By.xpath("//span[text()='Alerts']"))
    .describedAs('Alerts menu item');

  static readonly browserWindowsMenuItem = PageElement.located(By.xpath("//span[text()='Browser Windows']"))
    .describedAs('Browser Windows menu item');

  static readonly simpleAlertButton = PageElement.located(By.id('alertButton'))
    .describedAs('Click Button to see alert');

  static readonly timerAlertButton = PageElement.located(By.id('timerAlertButton'))
    .describedAs('Timer alert button');

  static readonly confirmAlertButton = PageElement.located(By.id('confirmButton'))
    .describedAs('Confirm alert button');

  static readonly promptAlertButton = PageElement.located(By.id('promtButton'))
    .describedAs('Prompt alert button');

  static readonly confirmResult = PageElement.located(By.id('confirmResult'))
    .describedAs('Confirm result text');

  // Browser Windows section
  static readonly newTabButton = PageElement.located(By.id('tabButton'))
    .describedAs('New Tab button');

  static readonly newWindowButton = PageElement.located(By.id('windowButton'))
    .describedAs('New Window button');
}
