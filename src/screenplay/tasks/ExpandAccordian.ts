import { Task } from '@serenity-js/core';
import { Click, Navigate } from '@serenity-js/web';
import { AccordianPage } from '../ui';

/**
 * Task: Navigate to Accordian page
 */
export const NavigateToAccordian = () =>
  Task.where('#actor navigates to the Accordian page',
    Navigate.to(AccordianPage.URL)
  );

/**
 * Task: Expand Section 2 of the accordian
 */
export const ExpandSection2 = () =>
  Task.where('#actor expands Section 2 of the accordian',
    Click.on(AccordianPage.section2Heading)
  );

/**
 * Task: Expand Section 3 of the accordian
 */
export const ExpandSection3 = () =>
  Task.where('#actor expands Section 3 of the accordian',
    Click.on(AccordianPage.section3Heading)
  );
