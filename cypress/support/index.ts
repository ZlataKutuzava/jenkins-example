import "./commands";
import "cypress-mochawesome-reporter/register";
import '@bahmutov/cy-api';
import 'cypress-xpath';

Cypress.on("uncaught:exception", () => false);

Cypress.Screenshot.defaults({
  overwrite: true,
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getByClass(value: string): Chainable<Element>;
      getById(value: string): Chainable<Element>;
      getByTestId(value: string): Chainable<Element>;
      checkLeftMenuItemText(
        orderNum: number,
        expectedText: string
      ): Chainable<Element>;
      clickSubmitButton(): void;
      updateTableRow(
        textFeomTableCell: string,
        fName: string,
        lName: string,
        email: string,
        age: string
      ): Chainable<Element>;
      fillRequiredFieldsForm(
        fName: string,
        lName: string,
        gender: string,
        phone: string
      ): void;
      login(login: string, password: string): void;
      searchProduct(product: string): void;
      screenshotViewportInBrowser(screenshotName: string): void;
      takeScreenshot(filename: string): void;
    }
  }
}

// Cypress.on('test:before:run', () => {
//   Cypress.automation('remote:debugger:protocol', {
//     command: 'Emulation.setLocaleOverride',
//     params: {
//       locale: 'en-CA'
//     }
//   });
// });
