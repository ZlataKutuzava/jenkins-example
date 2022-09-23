import { recurse } from "cypress-recurse";
import 'cypress-network-idle';

describe("waits for API", () => {

  it("makes a request until the server returns any status EXCEPT 200 OK", () => {

    recurse(
      () => cy.request("https://jsonplaceholder.typicode.com/"),
      ({ isOkStatusCode }) => {
        return !isOkStatusCode
      },
      {
        limit: 5, //only make up to 5 attempts
        delay: 500, // ms between attempts
        log: "COMPLETED",
      }
    );
  });
});


