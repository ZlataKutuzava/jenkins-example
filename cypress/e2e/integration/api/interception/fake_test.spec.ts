describe("Intercept Method from Udemy", () => {
  it("Mock the response", () => {
    cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty", //listen if this call was made to the browser
      },
      {
        statusCode: 200,
        body: [{
          book_name: "RobotFramework",
          isbn: "984353",
          aisle: "982053",
        }],
      }
    ).as('bookRetrievals');

cy.get('button[routerlink="/library"]').click();
cy.wait('@bookRetrievals').should(({request, response}) => {
    cy.get('tr').should('have.length', response?.body.length + 1);
});
cy.get('p').should('have.text', 'Oops only 1 Book available');
  });


});
