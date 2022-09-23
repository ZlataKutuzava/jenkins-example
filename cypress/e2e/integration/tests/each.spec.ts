const now = new Date();
const washingMachinePageTests = cyView(devices);

  describe("Practice with each command", () => {
beforeEach(() => {
  cy.visit("https://cosmocode.io/automation-practice-webtable/");
});


    it("Debug the link", () => {
      cy.get("#masthead p.main-title a").debug().should("have.attr", "href");
    });
  
    it("stops when it sees Belarus in the Country column", () => {
      cy.contains("Belarus")
        .parent()
        .prev()
        .within(() => cy.get("input").check());
    });
  
    it("Debug after checking the checkbox", () => {
      cy.get('input[ type="checkbox"]').first().check().debug().should('be.checked');
    });
  
    it('Debug after click', () => {
      cy.visit('https://cosmocode.io/automation-practice/');
      cy.get('#firstname').debug().type('Fthrth');
    });
  
    it('log browser info', () => {
      cy.log( Cypress.browser.displayName)
  });  
  
  it('Use custom command', () => {
    cy.screenshotViewportInBrowser(now.toISOString().substring(0, 10));
  });
  });