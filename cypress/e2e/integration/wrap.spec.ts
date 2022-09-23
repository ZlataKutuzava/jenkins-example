describe("cy.wrap() command", () => {
  it("Find an element and Wrap previously yielded jQuery Objects", () => {
    cy.visit("https://console.asgardeo.io");
    cy.getById("usernameUserInput").then((username) => {
      cy.wrap(username).type("Username");
    });
  });

  it("Validate that the variable is equal to the expected value", () => {
    let signInButtonText = "Sign In";
    cy.wrap(signInButtonText).should("eq", "Sign In");
  });

  it("Validate that the object has a certain property", () => {
    const user = {
      name: "Zlata",
      age: "25",
      city: "Minsk",
    };
    cy.wrap(user).should("have.property", "age");
  });

  it("Validate that array contains item", () => {
    const array = [
      "WSO2 Enterprise Integratort",
      "WSO2 API Manager",
      "WSO2 Identity Server",
      "Choreo",
      "Asgardeo",
      "Ballerina",
    ];

    cy.wrap(array).should("contain", "Choreo");
  });

  it('cy.wrap with Promises', ()=> {
    const product = (pname: string, ms: number) => {
        console.log('Promise begin...')
        return new Promise(resolve => {
        setTimeout(() => {
        console.log('Promise finished...Product '+pname+' is returned...')
        resolve({ name: pname })
        }, ms)
        })
        }

        let productExpected = product('Asgardeo', 1000);
        cy.wrap(productExpected);
  });

});
