import { Task } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';
import { HomePage } from '../ui';

/**
 * Task: Navigate to the DemoQA Home Page
 */
export const NavigateToHomePage = () =>
  Task.where('#actor navigates to the DemoQA home page',
    Navigate.to(HomePage.URL)
  );
