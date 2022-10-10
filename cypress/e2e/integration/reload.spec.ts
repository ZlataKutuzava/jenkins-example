import { find } from "cypress/types/lodash";

describe("reload page", () => {
  it("page reload test", () => {
    cy.visit("https://www.freshworks.com/");
    cy.contains("Customers").click();
    cy.reload();
    cy.contains("Customers").should("be.visible");
    cy.reload({ timeout: 5000 }).contains("Customers").should("be.visible");
  });

  it("Drop down with select feature", () => {
    cy.visit("https://demoqa.com/select-menu");
    cy.getById("withOptGroup").click().contains("A root option").click();
    cy.getById("withOptGroup").children().should("contain", "A root option");

    cy.getById("selectOne").click().contains("Ms.").click();
    cy.getById("selectOne").children().should("contain", "Ms.");
  });

  it("Google Search", () => {
    cy.visit("https://www.google.ru/");
    cy.get("[name='q']").type("Cypress");
    cy.get('ul[role="listbox"] > div ul').contains("cypress hill").click();
  });

  it("Cypress Search", () => {
    cy.visit("https://sharelane.com/cgi-bin/main.py");
    cy.get("form input[type='text']").type("tom sawyer").next().click();
    cy.get('[href*="add_to_cart"]')
      .parent()
      .should("have.text", "The Adventures of Tom Sawyer ");
  });

  it("mouse over feature", () => {
    cy.visit("https://www.spicejet.com/");
    cy.contains("Add-ons").trigger("mouseover");
    cy.contains("Friends and Family").click();
  });

  it("Add to Cart Test", () => {
    cy.visit("http://automationpractice.com/index.php");
    cy.get('[class="product-container"]')
      .first()
      .trigger("mouseover")
      .within(() => {
        cy.get(".ajax_add_to_cart_button").click();
      });

    cy.get("span.cross").click();
    cy.get(".cart_block").should("be.hidden").invoke("show");
    cy.get("#button_order_cart").click();
    cy.url().should("include", "controller=order");
  });

  it("Category page. Checkbox", () => {
    cy.visit("http://automationpractice.com/index.php");
    cy.get("a[title='Women']").click();
    cy.get(".checkbox").check().parent().should("have.class", "checked");
    cy.getByClass("checked")
      .children()
      .uncheck()
      .parent()
      .should("not.have.class", "checked");
  });

  it.only("Snap Deal", () => {
    cy.visit("https://www.snapdeal.com/");
    cy.get("input#inputValEnter").type("Laptop");
    cy.get("button.searchformButton").click();
    cy.get("[data-displayname='Brand'] > .filter-content > .filter-inner > :nth-child(n) > input[type='checkbox']").check({force: true});
  });


});
