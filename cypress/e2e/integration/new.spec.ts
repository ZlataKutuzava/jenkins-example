describe("Test Suite", function () {
  before(function () {
    cy.fixture("example.json").then(function (data) {
      this.data = data;
    });
  });

  it('Test Zlata', function() {
    cy.log(this.data.firstName);
    cy.log(this.data.lastName);
    cy.log(this.data.email);
  });
});
