let userID: string;

describe("GraphQL", () => {
  const accessToken =
    "8e03babc56e3a4e27bd9a56d6d5d967decd0dadc54e32ab9a19b85b30402e676";
  it("CRUD requests", () => {
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/graphql",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: {
        query: `
        query {
            users {
              nodes {
                id
                name
                gender
              }
            }
          }
        `,
      },
    }).then((getResponse) => {
      expect(getResponse.status).to.equal(200);
      expect(getResponse.body).not.to.be.empty;
    });

    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/graphql",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: {
        query: `
      mutation {
            createUser(
              input: {
                name: "Zlata Kutuzava"
                email: "email@mail.com"
                gender: "female"
                status: "active"
              }
            ) {
              user {
                id
                name
                gender
                email
                status
              }
            }
          }
      `,
      },
    }).then((postResponse) => {
      expect(postResponse.status).to.equal(200);
       userID = JSON.stringify(postResponse.body.data.createUser.user.id);
      cy.log(userID);
      expect(postResponse.body.data.createUser.user.name).to.equal(
        "Zlata Kutuzava"
      );
      expect(postResponse.body.data.createUser.user.email).to.equal(
        "email@mail.com"
      );
      expect(postResponse.body.data.createUser.user.gender).to.equal("female");
      expect(postResponse.body.data.createUser.user.status).to.equal("active");

      cy.request({
        method: "POST",
        url: "https://gorest.co.in/public/v2/graphql",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          query: `
          mutation {
            updateUser(input: { id: ${userID}, name: "Zlata" }) {
              user {
                id
                name
              }
            }
          }
          
        `,
        },
      }).then((updateResponse) => {
        expect(updateResponse.status).to.equal(200);
        expect(updateResponse.body.data.updateUser.user.name).to.equal("Zlata");
      });

      cy.request({
        method: "POST",
        url: "https://gorest.co.in/public/v2/graphql",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          query: `
          mutation {
            deleteUser(input: { id: ${userID} }) {
              user {
                id
                name
                email
                gender
                status
              }
            }
          }          
        `,
        },
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.equal(200);
        expect(JSON.stringify(deleteResponse.body.data.deleteUser.user.id)).to.equal(userID);
        expect(deleteResponse.body.data.deleteUser.user.name).to.equal(
          "Zlata"
        );
        expect(deleteResponse.body.data.deleteUser.user.email).to.equal(
          "email@mail.com"
        );
        expect(deleteResponse.body.data.deleteUser.user.gender).to.equal(
          "female"
        );
        expect(deleteResponse.body.data.deleteUser.user.status).to.equal(
          "active"
        );
      });
    });
  });
});
