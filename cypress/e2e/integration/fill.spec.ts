describe('Explore fill plugin', () => {
    it('Fill in the text fields', () => {
        cy.visit('https://demoqa.com/automation-practice-form');
        cy.getById("userForm").within(() => {
            cy.get('#firstName').fill('Fistname');
            cy.get('#lastName').fill('Lastname');
            cy.get('#userEmail').fill('email@mail.com');
        });
    });
});