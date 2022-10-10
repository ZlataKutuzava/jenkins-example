import { emit } from "process";

describe("Fill in the form using xpath", () => {
const fullName = 'Full Name';
const userEmail = 'name@example.com';
const currentAddress = 'Current Address';
  it("Fill the form", () => {
    cy.visit("https://demoqa.com/text-box");

    cy.getById('userForm').within(() => {
      cy.xpath("//input[@id='userName']").type(fullName);
        cy.xpath("//input[@id='userEmail']").type(userEmail);
        cy.xpath("//textarea[@id='currentAddress']").type(currentAddress);
        cy.xpath("//button[@id='submit']").click();
    
    });
        
    cy.xpath("//*[@id='output']").within(() => {
        cy.xpath("//p[@id='name']").then(el => {
           expect(el.text()).to.include(`Name:${fullName}`);
        });
        cy.xpath("//p[@id='email']").then(el => {
          expect(el.text()).to.include(`Email:${userEmail}`);
       });
       cy.xpath("//p[@id='currentAddress']").then(el => {
        expect(el.text()).to.include(`Current Address :${currentAddress}`);
     });
    });
  });
});