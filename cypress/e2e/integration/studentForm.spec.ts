describe("Fill the Student form", function () {
  const mobileNumber =
    "" + (Math.floor(Math.random() * 9000000000) + 1000000000);
  beforeEach("Load the test data", function () {
    cy.fixture("example.json").then((userData) => {
      this.userData = userData;
      cy.log(this.userData.firstName);
    });
  });

  it("Open main application page", function () {
    cy.visit("/" + "/automation-practice-form");
  });

  it("Fill in the Form", function () {
    cy.fillRequiredFieldsForm(
      this.userData.firstName,
      this.userData.lastName,
      this.userData.gender,
      mobileNumber
    );
  });

  it("Veiry the Form input", function () {
    cy.getById("example-modal-sizes-title-lg").should(
      "have.text",
      "Thanks for submitting the form"
    );
    cy.getByClass("table-responsive")
      .find("table")
      .within(() => {
        cy.findByText("Student Name")
          .next()
          .should(
            "have.text",
            `${this.userData.firstName} ${this.userData.lastName}`
          );
        cy.findByText("Gender")
          .next()
          .should("have.text", this.userData.gender);
        cy.findByText("Mobile").next().should("have.text", mobileNumber);
      });
  });
});
