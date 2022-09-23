describe("Update a user", () => {
  beforeEach("Precondition", () => {
    cy.fixture("createuser.json").then(function (dataJSON) {
      this.dataJSON = dataJSON;
    });
  });

  let accessToken =
    "8e03babc56e3a4e27bd9a56d6d5d967decd0dadc54e32ab9a19b85b30402e676";
  let randomText = "";
  let testEmail = "";

  let pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 10; i++) {
    randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
    testEmail = randomText + "@gmail.com";
  }

  it("create user test", function () {
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public-api/users/",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: {
        name: this.dataJSON.name,
        email: testEmail,
        gender: this.dataJSON.gender,
        status: this.dataJSON.status,
      },
    }).then(function (response) {
      let userID = JSON.stringify(response.body.data.id);

      cy.log(userID);
      expect(response.status).eq(200);
      expect(response.body.data).has.property("name", this.dataJSON.name);
      expect(response.body.data).has.property("email", testEmail);
      expect(response.body.data).has.property("gender", this.dataJSON.gender);
      expect(response.body.data).has.property("status", this.dataJSON.status);

      cy.request({
        method: "PUT",
        url: "https://gorest.co.in/public-api/users/" + userID,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          id: userID,
          name: this.dataJSON.name,
          email: testEmail,
          gender: "Male",
          status: "Inactive",
        },
      }).then(function (response) {
        cy.log(userID);
        expect(response.status).eq(200);
        expect(response.body.data).has.property("name", this.dataJSON.name);
        expect(response.body.data).has.property("email", testEmail);
        expect(response.body.data).has.property("gender", "male");
        expect(response.body.data).has.property("status", "inactive");

      }).then((response) => {
        cy.log(JSON.stringify(response.body.data));

        cy.request({
            method: "DELETE",
            url: "https://gorest.co.in/public-api/users/" + userID,
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            body: {
              id: userID,
              name: this.dataJSON.name,
              email: testEmail,
              gender: "Male",
              status: "Inactive",
            },
          }).then(function (response) {
            expect(response.status).eq(200);
           
          })
      });
    });
  });
});
