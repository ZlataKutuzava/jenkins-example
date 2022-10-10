describe("Verify sub-menu elements using find", function () {
  before("Load data from fixtures", function () {
    cy.fixture("leftMenu.json").then(function (data) {
      this.data = data;
    });
  });

  it("Navigate to the page", function () {
    cy.visit("/");
    cy.title().should("equal", "ToolsQA");
    cy.getByClass("category-cards").find(".card ").last().click();
    cy.getByClass("main-header").should(
      "have.text",
      this.data.bookStore.bookStore
    );
    cy.getByClass("accordion")
      .find(".element-group")
      .last()
      .find(".header-text")
      .should("have.text", this.data.bookStoreApp);

    cy.getByClass("accordion")
      .find(".element-group")
      .last()
      .find("ul > li")
      .should("have.length", 4)
      .first()
      .should("have.text", this.data.bookStore.login)
      .next()
      .should("have.text", this.data.bookStore.bookStore)
      .next()
      .should("have.text", this.data.bookStore.profile)
      .next()
      .should("have.text", this.data.bookStore.bookStoreAPI);
  });

  it("Check current URL", function () {
    cy.url().should("eq", Cypress.config("baseUrl") + "/books");
  });
});
