import { Question } from '@serenity-js/core';
import { Text, isVisible } from '@serenity-js/web';
import { BookStorePage } from '../ui';

/**
 * Questions about the Book Store search results
 */
export class BookStoreQuestions {
  /**
   * Question: Is the search input visible?
   */
  static isSearchInputVisible = () =>
    isVisible(BookStorePage.searchInput);

  /**
   * Question: Are there book results displayed?
   */
  static hasBookResults = () =>
    Question.about('there are book results', async actor => {
      const titles = await actor.answer(BookStorePage.bookTitles);
      return titles.length > 0;
    });

  /**
   * Question: Get the list of visible book titles
   */
  static visibleBookTitles = () =>
    Question.about('visible book titles', async actor => {
      const titles = await actor.answer(BookStorePage.bookTitles);
      const titleTexts: string[] = [];
      for (const title of titles) {
        const text = await title.text();
        if (text && text.trim().length > 0) {
          titleTexts.push(text.trim());
        }
      }
      return titleTexts;
    });

  /**
   * Question: Do search results contain the search term?
   */
  static resultsContainTerm = (term: string) =>
    Question.about(`results contain "${term}"`, async actor => {
      const titles = await actor.answer(BookStoreQuestions.visibleBookTitles());
      return titles.some(title => 
        title.toLowerCase().includes(term.toLowerCase())
      );
    });
}
