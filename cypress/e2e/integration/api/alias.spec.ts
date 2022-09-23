describe("API testing with alias", () => {
  beforeEach(() => {
    cy.request("/users?page=2").as("users");
  });

  it("validate header info", () => {
    cy.get("@users")
      .its("headers")
      .its("content-type")
      .should("include", "application/json; charset=utf-8");
  });

  it('validate response status', () => {
    cy.get('@users').its('status').should('equal', 200);
  });

  it('validate total pages in body', ()=> {
    cy.get('@users').its('body').should('have.property', 'total_pages', 2);
  });

  it('validate the user info in data json array', () => {
    cy.get('@users').its('body').then((response) => {
      expect(response.data[0]).has.property('email', 'michael.lawson@reqres.in');
    })
  });
});
