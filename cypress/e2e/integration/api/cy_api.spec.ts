import { should } from "chai";

describe("Use cy-api plugin", () => {
  const url = "http://jsonplaceholder.typicode.com";
  it("Load all the todos using GET", () => {
    cy.api({
      method: "GET",
      url: `${url}/todos`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.length(200);
    });
  });

  it("Add a todo item using POST", () => {
    cy.api({
      method: "POST",
      url: `${url}/todos`,
      body: {
        title: "New todo item",
        completed: true,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("id", 201);
    });
  });

  it("Update item with id=1", () => {
    cy.api({
      method: "PATCH",
      url: `${url}/todos/1`,
      body: {
        completed: true,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("completed", true);
    });
  });

  it("Update using PUT", () => {
    let putBody = {
      completed: true,
    };
    let expectedBody = {
      completed: true,
      id: 1,
    };
    cy.api({
      method: "PUT",
      url: `${url}/todos/1`,
      body: putBody,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.contain(expectedBody);
      cy.wrap(response.body).should("be.an", "object");
    });
  });

  it("Delete todo item", () => {
    cy.api({
      method: "DELETE",
      url: `${url}/todos/1`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.empty;
    });
  });
});
