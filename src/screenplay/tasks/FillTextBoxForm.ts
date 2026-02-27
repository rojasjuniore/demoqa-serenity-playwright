import { Task } from '@serenity-js/core';
import { Click, Enter, Navigate, Scroll } from '@serenity-js/web';
import { TextBoxPage } from '../ui';

export interface TextBoxData {
  fullName: string;
  email: string;
  currentAddress?: string;
  permanentAddress?: string;
}

/**
 * Task: Fill the Text Box form with provided data
 */
export const FillTextBoxForm = (data: TextBoxData) =>
  Task.where('#actor fills the Text Box form',
    Navigate.to(TextBoxPage.URL),
    Enter.theValue(data.fullName).into(TextBoxPage.fullNameInput),
    Enter.theValue(data.email).into(TextBoxPage.emailInput),
    ...(data.currentAddress 
      ? [Enter.theValue(data.currentAddress).into(TextBoxPage.currentAddressInput)] 
      : []),
    ...(data.permanentAddress 
      ? [Enter.theValue(data.permanentAddress).into(TextBoxPage.permanentAddressInput)] 
      : []),
    Scroll.to(TextBoxPage.submitButton),
    Click.on(TextBoxPage.submitButton)
  );
