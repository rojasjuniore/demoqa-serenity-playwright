import { Question } from '@serenity-js/core';
import { Text, isVisible } from '@serenity-js/web';
import { AlertsPage } from '../ui';

/**
 * Questions about alert handling results
 */
export class AlertQuestions {
  /**
   * Question: What is the confirm result text?
   */
  static confirmResultText = () =>
    Text.of(AlertsPage.confirmResult);

  /**
   * Question: Is the confirm result visible?
   */
  static isConfirmResultVisible = () =>
    isVisible(AlertsPage.confirmResult);

  /**
   * Question: Did user select OK on confirm alert?
   */
  static didUserConfirmAlert = () =>
    Question.about('user confirmed the alert', async actor => {
      const text = await actor.answer(Text.of(AlertsPage.confirmResult));
      return text.includes('Ok');
    });
}
