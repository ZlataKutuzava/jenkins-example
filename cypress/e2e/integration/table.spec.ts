describe("Table test", function () {
  beforeEach("Open URL with the Web Tables", function () {
    cy.visit("/" + "/webtables");
  });

  it("Check that Cantrell has Department", function () {
    cy.findByText("Cantrell")
      .parent()
      .within(() => {
        cy.getByClass("rt-td")
          .eq(5)
          .then((element) => {
            expect(element.text()).to.equal("Compliance");
          });
      });
  });
  it("Log the First Name from the first row in the table", function () {
    cy.getByClass("rt-tbody").within(() => {
      cy.getByClass("rt-td")
        .eq(0)
        .then(function (element) {
          let firstCellValue = element.text();
          cy.log(firstCellValue);
        });
    });
  });
});
