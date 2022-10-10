
describe("RESR API CRUD operations in one it block", () => {
  let userID: string;

  const accessToken = 'Bearer 8e03babc56e3a4e27bd9a56d6d5d967decd0dadc54e32ab9a19b85b30402e676';
  it("CRUD the user", () => {
    cy.fixture("createuser.json")
      .then((fixture) => {
        cy.api({
          method: "POST",
          url: "https://gorest.co.in/public/v2/users",
          headers: {
            authorization: accessToken,
          },
          body: fixture,
        });
      })
      .then(function (postMethodResponse) {
        expect(postMethodResponse.status).to.equal(201);
         userID = JSON.stringify(postMethodResponse.body.id);

        cy.api({
          method: "PATCH",
          url: `https://gorest.co.in/public/v2/users/${userID}`,
          headers: {
            authorization: accessToken,
          },
          body: { status: "inactive" },
        })
          .its("body")
          .should("have.property", "status", "inactive");

        cy.api({
          method: "DELETE",
          url: `https://gorest.co.in/public/v2/users/${userID}`,
          headers: {
            authorization: accessToken,
          },
        }).then((response) => {
          expect(response.status).to.equal(204);
          expect(response.body).to.be.empty;
        });
      });
  });
});
