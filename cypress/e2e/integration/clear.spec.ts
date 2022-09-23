describe("Update the last table row", function () {
  before("Open the table", function () {
    cy.visit("/" + "/webtables");
    cy.fixture("example.json").then((data) => {
      this.data = data;
    });
  });

  it("Update table row", function () {
    cy.updateTableRow(
      "Alden",
      this.data.firstName,
      this.data.lastName,
      this.data.email,
      this.data.age
    );

    cy.findAllByText(this.data.firstName)
      .should("have.text", this.data.firstName)
      .next()
      .should("have.text", this.data.lastName)
      .next()
      .should("have.text", this.data.age)
      .next()
      .should("have.text", this.data.email);
  });
});
