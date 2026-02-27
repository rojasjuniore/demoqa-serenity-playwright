import { Task } from '@serenity-js/core';
import { Click, Enter, Navigate, Scroll } from '@serenity-js/web';
import { PracticeFormPage } from '../ui';

export interface PracticeFormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
}

/**
 * Task: Fill the Practice Form with provided data
 */
export const FillPracticeForm = (data: PracticeFormData) =>
  Task.where('#actor fills the Practice Form',
    Navigate.to(PracticeFormPage.URL),
    Enter.theValue(data.firstName).into(PracticeFormPage.firstNameInput),
    Enter.theValue(data.lastName).into(PracticeFormPage.lastNameInput),
    Enter.theValue(data.email).into(PracticeFormPage.emailInput),
    Click.on(data.gender === 'Male' 
      ? PracticeFormPage.maleGenderRadio 
      : PracticeFormPage.femaleGenderRadio),
    Enter.theValue(data.mobile).into(PracticeFormPage.mobileInput),
    Scroll.to(PracticeFormPage.submitButton),
    Click.on(PracticeFormPage.submitButton)
  );
