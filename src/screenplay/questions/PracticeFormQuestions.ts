import { Question } from '@serenity-js/core';
import { Text, isVisible } from '@serenity-js/web';
import { PracticeFormPage } from '../ui';

/**
 * Questions about the Practice Form submission
 */
export class PracticeFormQuestions {
  /**
   * Question: Is the confirmation modal visible?
   */
  static isModalVisible = () =>
    isVisible(PracticeFormPage.confirmationModal);

  /**
   * Question: What is the modal title text?
   */
  static modalTitle = () =>
    Text.of(PracticeFormPage.modalTitle);

  /**
   * Question: Does the modal title indicate success?
   */
  static isSubmissionSuccessful = () =>
    Question.about('form submission is successful', async actor => {
      const title = await actor.answer(Text.of(PracticeFormPage.modalTitle));
      return title.includes('Thanks for submitting the form');
    });
}
