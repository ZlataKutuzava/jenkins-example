describe("File Upload", () => {
  it("Contact us", () => {
    cy.visit("http://automationpractice.com/index.php");
    cy.get('[title="Contact Us"]').click();
    cy.url().should("include", "/index.php?controller=contact");
    const yourFixturePath = "Email.png";
    cy.get("#fileUpload").attachFile(yourFixturePath);
  });

  it("Drag and drop", () => {
    cy.visit("https://css-tricks.com/examples/DragAndDropFileUploading/");
    const yourFixturePath = "Email.png";
    cy.get("#file").attachFile(yourFixturePath);
    cy.get("div.box__success").should("have.text", "Done! Upload more?");
  });

  it.only("multiple file upload", () => {
    cy.visit("https://davidwalsh.name/demo/multiple-file-upload.php");
    const yourFixturePath1 = "example.json";
    const yourFixturePath2 = "mail.png";
    const yourFixturePath3 = "viewport.json";
    cy.getById("filesToUpload").attachFile({filePath: yourFixturePath3, fileName: 'viewport.json'});
    cy.get("strong").last().should("have.text", "Files You Selected:");
  });
});
