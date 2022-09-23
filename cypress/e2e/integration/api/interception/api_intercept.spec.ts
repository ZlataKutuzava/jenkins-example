describe("intercept with cypress examples", () => {
  it("test api with simple intercept", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept({
      path: "/posts",
    }).as("posts");

    cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
    cy.wait("@posts").then((inter) => {
      cy.log(JSON.stringify(inter));
      console.log(JSON.stringify(inter));
      expect(inter.response.body).to.have.length(100);
    });
  });

  it("mocking with intercept test", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", { totalPosts: 5, name: "Zlata" }).as("posts");
    cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
    cy.wait("@posts");
  });

  it("mocking with intercept test with dinamic fixture", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", { fixture: "createuser.json" }).as("posts");
    cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
    cy.wait("@posts");
  });

  it("mocking with intercept test with the Server Error", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", { statusCode: 500 }).as("getServerFailure");
    cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
    cy.wait("@getServerFailure");
  });

  it("mocking with intercept test with 40x HTTP Error code", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", {
      headers: {
        accept: "application/json",
      },
      statusCode: 404,
      body: "404 Not Found!",
    }).as("clientSideError");

    cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
    cy.wait("@clientSideError");
  });

  it("mocking with intercept test with the Network Error", () => {
    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.intercept("GET", "/posts", { forceNetworkError: true }).as(
      "getNetworkFailure"
    );
    cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
    cy.wait("@getNetworkFailure").then((interception) => {
      expect(interception).has.property("error");
      expect(interception).has.property("state", "Errored");
    });
  });
});
