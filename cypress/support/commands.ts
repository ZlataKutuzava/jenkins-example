import '@testing-library/cypress/add-commands';
import 'cypress-wait-until';
import 'cypress-file-upload';
import 'cypress-fill-command'

Cypress.Commands.add("getByClass", (value: string): void => {
  cy.get(`.${value}`);
});

Cypress.Commands.add("getById", (value: string): void => {
  cy.get(`#${value}`);
});

Cypress.Commands.add("getByTestId", (value: string): void => {
  cy.get(`[data-testid*='${value}']`);
});

Cypress.Commands.add(
  "checkLeftMenuItemText",
  (orderNum: number, expectedText: string): void => {
    cy.get("@leftMenuItems")
      .eq(orderNum)
      .find(".header-text")
      .should("have.text", expectedText);
  }
);

Cypress.Commands.add('clickSubmitButton', (): void => {
  cy.get('[type="Submit"]').click();
});

Cypress.Commands.add('updateTableRow', (textFeomTableCell: string, fName: string, lName: string, email: string, age: string): void => {
  cy.findAllByText(textFeomTableCell).parent().findAllByTitle("Edit").click();
  cy.getById("registration-form-modal").should("be.visible");
  cy.getById("userForm").within(() => {
    cy.findByPlaceholderText("First Name").clear().type(fName);
    cy.findByPlaceholderText("Last Name").clear().type(lName);
    cy.getById("userEmail").clear().type(email);
    cy.findByPlaceholderText("Age").clear().type(age);
    cy.clickSubmitButton();
  });
});

Cypress.Commands.add('fillRequiredFieldsForm', (fName: string, lName: string, gender: string, phone: string): void => {
  cy.getById("userForm").within(() => {
    cy.getById("firstName").type(fName);
    cy.getById("lastName").type(lName);
    cy.getByClass("custom-radio").contains(gender).click();
    cy.findByPlaceholderText("Mobile Number").type(phone);
    cy.clickSubmitButton();
  });
});

Cypress.Commands.add('login', (login: string, password: string): void => {
  cy.visit('http://automationpractice.com/index.php');
  cy.getByClass('login').click();
  cy.url().should('include', '/index.php?controller=authentication&back=my-account');
  cy.getById("login_form").within(() => {
    cy.getById("email").type(login);
    cy.getById("passwd").type(password);
    cy.clickSubmitButton();
  });
});

Cypress.Commands.add('searchProduct', (product: string): void => {
  cy.getById('searchbox').within(() => {
    cy.get('#search_query_top').type(product);
    cy.clickSubmitButton();
  });
});

Cypress.Commands.add('screenshotViewportInBrowser', (screenshotName: string): void => {
  cy.screenshot(screenshotName, {clip: { x: 0, y: 0, width: Cypress.config('viewportWidth'), height: Cypress.config('viewportHeight') } });
cy.log(`Screenshot with the name ${screenshotName} was taken in browser ${Cypress.browser.displayName}`);
});

Cypress.on('window:before:load', window => {
  Object.defineProperty(window.navigator, 'language', { value: 'en-CA' }); 
});
