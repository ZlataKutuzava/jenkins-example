describe("as", () => {
  it("usage as for intercept", () => {
    cy.visit("https://jsonplaceholder.typicode.com");
    cy.intercept({
      path: "/posts",
    }).as("posts");
    cy.contains("100 posts").parent().children().first().click();
    cy.wait("@posts").then((responseObject) => {
      cy.log(JSON.stringify(responseObject));
      console.log(responseObject);
      expect(responseObject.response?.body).to.have.length(100);
    });
  });

  it("mocking with intercept test", () => {
    cy.visit("https://jsonplaceholder.typicode.com");
    cy.intercept("GET", "/posts", { totalPost: 5 }).as("totalPosts");
    cy.contains("GET").next().contains("/posts").first().click();
    cy.wait("@totalPosts");
  });

  it("fixture", () => {
    cy.visit("https://jsonplaceholder.typicode.com");
    cy.intercept("GET", "/posts", { fixture: "createuser.json" }).as(
      "fixtureMock"
    );
    cy.get('a[href="/posts"]').first().click();
    cy.wait("@fixtureMock");
  });
});
