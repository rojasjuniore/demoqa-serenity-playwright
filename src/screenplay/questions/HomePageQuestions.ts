import { Question } from '@serenity-js/core';
import { Text, isVisible, CssClasses, Attribute } from '@serenity-js/web';
import { HomePage } from '../ui';

/**
 * Questions about the Home Page state
 */
export class HomePageQuestions {
  /**
   * Question: Is the page logo visible?
   */
  static isLogoVisible = () =>
    isVisible(HomePage.pageTitle);

  /**
   * Question: How many main cards are displayed?
   */
  static numberOfMainCards = () =>
    Question.about('the number of main cards', async actor => {
      const cards = await actor.answer(HomePage.mainCards);
      return cards.length;
    });

  /**
   * Question: Is the Elements card visible?
   */
  static isElementsCardVisible = () =>
    isVisible(HomePage.elementsCard);

  /**
   * Question: Is the Forms card visible?
   */
  static isFormsCardVisible = () =>
    isVisible(HomePage.formsCard);

  /**
   * Question: Is the Alerts card visible?
   */
  static isAlertsCardVisible = () =>
    isVisible(HomePage.alertsCard);

  /**
   * Question: Is the Widgets card visible?
   */
  static isWidgetsCardVisible = () =>
    isVisible(HomePage.widgetsCard);

  /**
   * Question: Is the Interactions card visible?
   */
  static isInteractionsCardVisible = () =>
    isVisible(HomePage.interactionsCard);

  /**
   * Question: Is the Book Store card visible?
   */
  static isBookStoreCardVisible = () =>
    isVisible(HomePage.bookStoreCard);
}
