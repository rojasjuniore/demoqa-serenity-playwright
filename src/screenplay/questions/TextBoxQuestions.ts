import { Question } from '@serenity-js/core';
import { Text, isVisible } from '@serenity-js/web';
import { TextBoxPage } from '../ui';

/**
 * Questions about the Text Box form output
 */
export class TextBoxQuestions {
  /**
   * Question: Is the output container visible?
   */
  static isOutputVisible = () =>
    isVisible(TextBoxPage.outputContainer);

  /**
   * Question: What is the displayed output name?
   */
  static outputName = () =>
    Text.of(TextBoxPage.outputName);

  /**
   * Question: What is the displayed output email?
   */
  static outputEmail = () =>
    Text.of(TextBoxPage.outputEmail);

  /**
   * Question: Does output contain the expected name?
   */
  static outputContainsName = (name: string) =>
    Question.about(`output contains name "${name}"`, async actor => {
      const text = await actor.answer(Text.of(TextBoxPage.outputName));
      return text.includes(name);
    });

  /**
   * Question: Does output contain the expected email?
   */
  static outputContainsEmail = (email: string) =>
    Question.about(`output contains email "${email}"`, async actor => {
      const text = await actor.answer(Text.of(TextBoxPage.outputEmail));
      return text.includes(email);
    });
}
