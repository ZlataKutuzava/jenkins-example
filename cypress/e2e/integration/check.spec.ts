export{};
/// <reference types="cypress" />

const uniqueNumber = Date.now();
const firstName = `Zlata ${uniqueNumber}`;
const lastName = `Kutuzava ${uniqueNumber}`;
const userEmail = `email@email.com`;
const mobileNumber = "" + (Math.floor(Math.random() * 9000000000) + 1000000000);
const userMonth = `March`;
const userYear = `1997`;
const userAddress = `Minsk ${uniqueNumber}`;
let name:string;


describe("Fill in the Student Registration Form", function () {
  
  it("Form Layout", () => {
    cy.visit("https://demoqa.com/automation-practice-form");
    cy.get("h5").should("have.text", "Student Registration Form");
    cy.getByClass("practice-form-wrapper").screenshot("Form");
    cy.getById("userName-wrapper").screenshot("Name");
    cy.getById("userEmail-wrapper").screenshot("Email");
    cy.getById("genterWrapper").screenshot("Gender");
    cy.getById("userNumber-wrapper").screenshot("Mobile");
    cy.getById("dateOfBirth-wrapper").screenshot("Date of Birth");
    cy.getById("subjectsWrapper").screenshot("Subjects");
    cy.getById("hobbiesWrapper").screenshot("Hobbies");
  });

  it("Submit a Student", () => {
    cy.getById("firstName").type(firstName);
    cy.getById("lastName").type(lastName);
    cy.getById("userEmail").type(userEmail);
    cy.getByClass("custom-radio").contains("Female").click().end();
    cy.getById("userNumber-wrapper").type(mobileNumber);
    cy.log(mobileNumber);
    cy.getById("dateOfBirthInput").click();
    cy.get(".react-datepicker__month-select").select(userMonth);
    cy.get(".react-datepicker__year-select").select(userYear);
    cy.get('[aria-label="Choose Monday, March 3rd, 1997"]').click();

    cy.getById("currentAddress")
      .type(userAddress)
      .invoke("val")
      .should("eq", userAddress);
      cy.log(userAddress);

    cy.contains("Submit").click();
    cy.getByClass("modal-content").should("be.visible");
    cy.getById("example-modal-sizes-title-lg").should(
      "have.text",
      "Thanks for submitting the form"
    );

    cy.contains("Student Name")
      .next()
      .should("have.text", `${firstName} ${lastName}`);
    cy.contains("Student Email").next().should("have.text", `${userEmail}`);
    cy.get("tr")
      .contains("Gender")
      .next()
      .then(function ($el) {
        let gender = $el.text();
        expect(gender).to.equal(`Female`);
      });

    cy.get("tr").contains("Mobile").next().should("have.text", mobileNumber);

    cy.get("tr")
      .contains("Date of Birth")
      .next()
      .then(function ($el) {
        let DoB = $el.text();
        expect(DoB).to.include(`${userMonth},${userYear}`);
      });

    cy.get("tr").contains("Address").next().should("have.text", userAddress);
  });
});
