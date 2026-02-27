import { By, PageElement } from '@serenity-js/web';

/**
 * Page Elements for the Droppable (Drag and Drop) section
 */
export class DroppablePage {
  static readonly URL = 'https://demoqa.com/droppable';

  static readonly droppableMenuItem = PageElement.located(By.xpath("//span[text()='Droppable']"))
    .describedAs('Droppable menu item');

  static readonly simpleTab = PageElement.located(By.id('droppableExample-tab-simple'))
    .describedAs('Simple tab');

  static readonly draggableElement = PageElement.located(By.id('draggable'))
    .describedAs('Draggable element');

  static readonly droppableTarget = PageElement.located(By.css('#simpleDropContainer #droppable'))
    .describedAs('Droppable target area');

  static readonly droppableText = PageElement.located(By.css('#simpleDropContainer #droppable p'))
    .describedAs('Droppable target text');
}
