describe("Shop", () => {
  before(() => {
    cy.login("lottie.kett@gmail.com", "12345");
  });

  it("Sign In", () => {
    cy.get('ul.myaccount-link-list li').its('length').should('eq', 5);
    cy.get('a[title="Home"]').click();
    cy.url().should('include', 'index.php');
    cy.searchProduct('Dress');
    cy.getByClass('lighter').should('contain', 'Dress');
  });
});
