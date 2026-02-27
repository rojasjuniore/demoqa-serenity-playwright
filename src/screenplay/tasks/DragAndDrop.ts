import { Task, Interaction, the } from '@serenity-js/core';
import { Navigate, BrowseTheWeb, PageElement, Page } from '@serenity-js/web';
import { DroppablePage } from '../ui';

/**
 * Custom Interaction: Perform drag and drop using Playwright's native method
 */
export const DragElementToTarget = (
  source: PageElement,
  target: PageElement
) => Interaction.where(the`#actor drags ${source} to ${target}`, async actor => {
  const page = await BrowseTheWeb.as(actor).currentPage();
  const playwrightPage = await (page as any).nativePage();
  
  const sourceLocator = playwrightPage.locator('#draggable');
  const targetLocator = playwrightPage.locator('#simpleDropContainer #droppable');
  
  await sourceLocator.dragTo(targetLocator);
});

/**
 * Task: Navigate to Droppable page and perform drag and drop
 */
export const PerformDragAndDrop = () =>
  Task.where('#actor performs drag and drop',
    Navigate.to(DroppablePage.URL),
    DragElementToTarget(DroppablePage.draggableElement, DroppablePage.droppableTarget)
  );
