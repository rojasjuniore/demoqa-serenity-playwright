import { Question } from '@serenity-js/core';
import { Text, isVisible, CssClasses } from '@serenity-js/web';
import { AccordianPage } from '../ui';

/**
 * Questions about the Accordian state
 */
export class AccordianQuestions {
  /**
   * Question: Is Section 1 content visible?
   */
  static isSection1ContentVisible = () =>
    isVisible(AccordianPage.section1Content);

  /**
   * Question: Is Section 2 content visible?
   */
  static isSection2ContentVisible = () =>
    isVisible(AccordianPage.section2Content);

  /**
   * Question: Is Section 3 content visible?
   */
  static isSection3ContentVisible = () =>
    isVisible(AccordianPage.section3Content);

  /**
   * Question: What is the text content of Section 2?
   */
  static section2ContentText = () =>
    Text.of(AccordianPage.section2Content);

  /**
   * Question: Does section content exist and is not empty?
   */
  static sectionHasContent = (sectionNumber: 1 | 2 | 3) => {
    const contentElement = sectionNumber === 1 
      ? AccordianPage.section1Content 
      : sectionNumber === 2 
        ? AccordianPage.section2Content 
        : AccordianPage.section3Content;
    
    return Question.about(`section ${sectionNumber} has content`, async actor => {
      const text = await actor.answer(Text.of(contentElement));
      return text.length > 0;
    });
  };
}
