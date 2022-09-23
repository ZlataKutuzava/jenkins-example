describe("Get API for Rest", () => {
  it("GET API Test for Flask - MotorBike", () => {
    cy.request(
      "https://flask-rest-api-demo.herokuapp.com/product/motorbike"
    ).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.product[0]).has.property("price", 599.99);
      expect(response.body.product[0]).has.property("product", "motorbike");
    });
  });

  it("GET API Test for Flask - Users", () => {
    cy.request("https://flask-rest-api-demo.herokuapp.com/users").then(
      (response) => {
        expect(response.status).equal(200);
        expect(response.body.users[4]).has.property("username", "test_5");
        expect(response.body.users[2]).has.property("id", 3);
        expect(response.body.users).has.length(5);
        expect(response.body.users[0]).not.have.property("priec");
      }
    );
  });

  it("GET API Test for Reqres - Users", () => {
    cy.request("https://reqres.in/api/users?page=2").then(
      (response) => {
        expect(response.status).equal(200);
        expect(response.body.data[0]).has.property("first_name", "Michael");
        expect(response.body.data[0]).has.property("last_name", "Lawson");
        expect(response.body.data).has.length(6);
      }
    );
  });
});
