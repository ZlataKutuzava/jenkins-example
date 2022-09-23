describe("reload page", () => {
    it("page reload test", () => {
      cy.visit("https://www.epam.com/");
      cy.getByClass('title-slider__title').should('contain.text', 'Engineering the Future');
    });
});