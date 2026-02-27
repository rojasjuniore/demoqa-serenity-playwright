import { Task, Wait } from '@serenity-js/core';
import { Enter, Navigate, isVisible } from '@serenity-js/web';
import { BookStorePage } from '../ui';
import { Duration } from '@serenity-js/core';

/**
 * Task: Search for books in the Book Store
 */
export const SearchBooks = (searchTerm: string) =>
  Task.where(`#actor searches for books with term "${searchTerm}"`,
    Navigate.to(BookStorePage.URL),
    Enter.theValue(searchTerm).into(BookStorePage.searchInput)
  );
