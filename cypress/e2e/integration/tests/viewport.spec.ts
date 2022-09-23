/// <reference types="cypress" />
describe("Layout on different devices", function () {
  const dimensions: Cypress.ViewportPreset[] = ["ipad-mini", "iphone-8","macbook-16", "samsung-s10" ];

  it("Verify category cards on different layouts", function () {
    cy.fixture("viewport.json").then(function (device) {
      this.device = device;
      cy.log(this.device.ipad)
    });

    cy.visit('/');
    dimensions.forEach((dimension) => {
      cy.viewport(dimension).getByClass("category-cards").screenshot(dimension).reload();
    })
    
  });
});