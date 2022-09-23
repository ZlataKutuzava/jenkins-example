describe("cy.end, and, visit, get, contains, click, should, within", () => {
  it("end chain of commands", () => {
    cy.visit("https://demoqa.com/checkbox");
    cy.get('ol li button[title="Toggle"]').click();
    cy.get("ol li ol").within(() => {
      cy.contains("Desktop").click().end();
      cy.contains("Documents").click().end();
      cy.contains("Downloads").click();
    });
    cy.get("input[type='checkbox']").should('have.length', 4).and('be.checked');
  });
});
