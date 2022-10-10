import exp = require("constants");

describe("Use req.reply()", () => {
  it("empty response", () => {
    cy.intercept("GET", "/users", (req) => {
      req.reply({
        statusCode: 200,
        body: [],
        delay: 1000,
      });
    }).as("emptyBodySuccess");

    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.get('a[href="/users"]').click();
    cy.wait("@emptyBodySuccess");
  });

  it("return fixture in the response", () => {
    cy.intercept("GET", "/users", (req) => {
      req.reply({
        fixture: "example.json",
      });
    }).as("fakeBody");
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.get('a[href="/users"]').click();
    cy.wait("@fakeBody");
  });

  it("dinamic stub of the status code", () => {
    let dinamicStatusCodeStub = 404;
    cy.intercept("GET", "/posts", (req) => {
      req.reply({
        statusCode: dinamicStatusCodeStub,
      });
    }).as("statusCode");

    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.get('a[href="/posts"]').first().click();
    cy.wait("@statusCode").then((interception) => {
      expect(interception.response?.statusCode).to.equal(404);
      expect(interception.response?.body).to.be.empty;
      dinamicStatusCodeStub = 503;
    });

    cy.go("back");
    cy.get('a[href="/posts"]').first().click();
    cy.wait("@statusCode").then((interception) => {
      expect(interception.response?.statusCode).to.equal(503);
      expect(interception.response?.body).to.be.empty;
    });
  });

  // it.only("can mock the index.html itself", () => {
  //   const mock = `
  //   <head>
  //     <script>document.domain = 'localhost';
  //     var Cypress = window.Cypress = parent.Cypress;
  //     Cypress.action('app:window:before:load', window);
  //     </script>
  //   </head>
  //   <p>hi there</p>
  //   `
  //   cy.intercept("/index.html", mock)
  //   cy.visit("index.html")
  // })
});
