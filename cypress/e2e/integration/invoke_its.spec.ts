describe("Expand accordeons using invoke", function () {
  before("Navigate to the accordeons", function () {
    cy.visit("/" + "/accordian");
  });

  it("Expand accordeons", function () {
    cy.getById("accordianContainer").within(() => {
      cy.getByClass("accordion")
        .children()
        .each(($item, index, $accordeon) => {
          cy.wrap($item).find(".collapse").invoke("show");
        });

      cy.getByClass("card-body").filter(":visible").should("have.length", 3);
    });
  });

  it("Hover", function () {
    cy.getByClass("left-pannel").findByText("Tool Tips").click();
    cy.getById("toolTipButton").trigger("mouseover");
    cy.getByClass("tooltip-inner")
      .should("be.visible")
      .and("have.prop", "textContent", "You hovered over the Button");
  });

  it("Sub Menu", function () {
     cy.getByClass("left-pannel").findByText("Menu").click();
     cy.get("ul#nav").find('li').its('length').should('equal', 8);
  });

  it.only("Progress Bar", function () {
    cy.getByClass("left-pannel").findByText("Progress Bar").click();
    cy.findByRole("progressbar").should('have.text', '0%');
    cy.getById('startStopButton').click();
  
    cy.waitUntil(() => cy.get("[role='progressbar']").invoke('text').then((text) => text = '100%'))
    cy.findByRole("progressbar").should('have.text', '100%');
    });
 });
