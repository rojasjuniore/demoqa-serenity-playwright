import { Question } from '@serenity-js/core';
import { Text, CssClasses, isVisible } from '@serenity-js/web';
import { DroppablePage } from '../ui';

/**
 * Questions about the Drag and Drop result
 */
export class DroppableQuestions {
  /**
   * Question: What text does the droppable target show?
   */
  static droppableText = () =>
    Text.of(DroppablePage.droppableText);

  /**
   * Question: Has the drop been successful?
   */
  static wasDropSuccessful = () =>
    Question.about('drop was successful', async actor => {
      const text = await actor.answer(Text.of(DroppablePage.droppableText));
      return text.includes('Dropped!');
    });

  /**
   * Question: Is the droppable target visible?
   */
  static isDroppableVisible = () =>
    isVisible(DroppablePage.droppableTarget);
}
