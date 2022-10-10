describe("hub spot page feature", () => {
  it("handle hub spot login test", () => {
    cy.visit("https://app.hubspot.com/login", { failOnStatusCode: false });
    cy.get("#username").type("naveen@gmail.com");
    cy.get("#password").type("naveen@g123");
    cy.get("#loginBtn").click();
  });

  it("element get testing", () => {
    cy.visit("https://www.freshworks.com/");
    cy.contains("Customers").click();
    cy.url().should("include", "/customers/");
    cy.get("div.container h1")
      .should("be.visible")
      .and("have.length", 1)
      .and(
        "have.text",
        "Delightful customer experiences are the norm at Freshworks "
      );
    cy.get("div.footer-main li").should("have.length", 24);
    cy.get("div.footer-main li")
      .find('a[href*="footer"]')
      .its("length")
      .should("eq", 6);
  });

  it("Amazon Search App", () => {
    cy.visit("https://www.amazon.in/");
    cy.getById("nav-search-bar-form").within(() => {
        cy.getById('twotabsearchtextbox').type('Apple Mac Book Laptop');
    });
  });

  it.only('back-fwd test', () => {
    cy.visit("https://www.freshworks.com/");
    cy.contains("Customers").click().go('back').go('forward');


  });
});
