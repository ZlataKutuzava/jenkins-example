describe("API Cypress commands", () => {
  it("Intercept a static response", () => {
    const response = {
      id: 1,
      email: "george.bluth@reqres.in",
      first_name: "George",
      last_name: "Bluth",
      avatar: "https://reqres.in/img/faces/1-image.jpg",
    };
    cy.visit("https://reqres.in");
    cy.intercept("GET", "/api/users?page=2", response).as("oneUser");
    cy.get(".endpoints ul li").first().click();
    cy.wait("@oneUser");
  });

  it("Intercept response from the fixture", () => {
    cy.visit("https://reqres.in");
    cy.intercept("GET", "/api/users?delay=3", { fixture: "users.json" }).as(
      "manyUsers"
    );
    cy.get('ul li a[href="/api/users?delay=3"]').last().click();
    cy.wait("@manyUsers");
  });

  it("Intercept network error", () => {
    const statusCode = 503;
    cy.visit("https://reqres.in");
    cy.intercept("GET", "/api/users?delay=3", {
      statusCode: statusCode,
      body: {
        message: "Failed by the network timeout",
      },
    }).as("error");
    cy.get('ul li a[href="/api/users?delay=3"]').last().click();
    cy.wait("@error");
    cy.get('[data-key="response-code"]').should("have.text", statusCode);
  });
});

describe.only("Intercept table", () => {
 it('Display one book', () => {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo");
    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      {
        statusCode: 200,
        body: [{
          book_name: "Learn Appium Automation with Java",
          isbn: "RS218",
          aisle: "111",
        }],
      }
    ).as('oneBook');
    cy.get('button[routerlink="/library"]').click();
    cy.wait('@oneBook');
    cy.get('h2').next().should('have.text', 'Oops only 1 Book available');
 });

 it('Display more than one book', () => {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo");
    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      {
        statusCode: 200,
        body: [ {
            "book_name": "RobotFramework",
            "isbn": "121856",
            "aisle": "992053"
        },
        {
            "book_name": "Learn Appium Automation with Java",
            "isbn": "RS895",
            "aisle": "2721"
        },],
      }
    ).as('books');
    cy.get('button[routerlink="/library"]').click();
    cy.wait('@books');
 });
});
