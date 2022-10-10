describe("Left Navigation Menu", function () {
  before("Open left navigation menu", function () {
    cy.visit("/");
    cy.title().should("eq", "ToolsQA");
    cy.get("[class='card mt-4 top-card']")
      .eq(Math.floor(Math.random() * 5) + 1)
      .then(function (item) {
        let tabName = item.text();
        cy.log(tabName);
        cy.wrap(item).click();
        cy.getByClass("accordion")
          .children(".element-group")
          .as("leftMenuItems");
        cy.get("@leftMenuItems").contains(tabName).click();
        cy.get("@leftMenuItems")
          .get("[class='element-list collapse']")
          .should("have.length", 5);
        cy.fixture("leftMenu.json").then(function (itemName) {
          this.itemName = itemName;
        });
      });
  });

  it("Verify items in the left panel", function () {
    cy.get("@leftMenuItems").parent().screenshot("Left Menu");
    cy.get("@leftMenuItems").should("have.length", 6);
    cy.checkLeftMenuItemText(0, this.itemName.elements);
    cy.checkLeftMenuItemText(1, this.itemName.forms);
    cy.checkLeftMenuItemText(2, this.itemName.alertsFramesWindows);
    cy.checkLeftMenuItemText(3, this.itemName.widgets);
    cy.checkLeftMenuItemText(4, this.itemName.interactions);
    cy.checkLeftMenuItemText(5, this.itemName.bookStoreApp);
  });


});
