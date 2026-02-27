import { Task } from '@serenity-js/core';
import { Click, Navigate } from '@serenity-js/web';
import { ModalDialog, AcceptAlert } from '@serenity-js/web';
import { AlertsPage } from '../ui';

/**
 * Task: Trigger and accept a simple alert
 */
export const TriggerSimpleAlert = () =>
  Task.where('#actor triggers a simple alert',
    Navigate.to(AlertsPage.URL),
    Click.on(AlertsPage.simpleAlertButton)
  );

/**
 * Task: Accept the current alert dialog
 */
export const AcceptAlertDialog = () =>
  Task.where('#actor accepts the alert',
    AcceptAlert()
  );

/**
 * Task: Trigger confirm alert and accept it
 */
export const TriggerAndAcceptConfirmAlert = () =>
  Task.where('#actor triggers and accepts confirm alert',
    Click.on(AlertsPage.confirmAlertButton),
    AcceptAlert()
  );
