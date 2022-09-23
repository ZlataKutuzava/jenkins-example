describe("get api user tests", function () {
  let accessToken =
    "8e03babc56e3a4e27bd9a56d6d5d967decd0dadc54e32ab9a19b85b30402e676";
  let randomText = "";
  let testEmail = "";

 beforeEach(() => {
  cy.fixture('createuser.json').then( function (dataJSON) {
    this.dataJSON = dataJSON;
    cy.log(this.dataJSON.name);
  });
 });
  

  it("get users",function () {
    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public-api/users/",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.meta.pagination.limit).equal(10);
    });
  });

  it("users get by id", function () {
    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public-api/users/50",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data).has.property(
        "name",
        "Baalagopaal Pillai"
      );
    });
  });

  it("create user test", function () {
    let pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 10; i++) {
      randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
      testEmail = randomText + "@gmail.com";
    }

    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public-api/users",
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
      cy.log(JSON.stringify(response.body));
      expect(response.status).eq(200);
      expect(response.body.data).has.property("name", this.dataJSON.name);
      expect(response.body.data).has.property("email", testEmail);
      expect(response.body.data).has.property("gender", this.dataJSON.gender);
      expect(response.body.data).has.property("status", this.dataJSON.status);
    });
  });
});
