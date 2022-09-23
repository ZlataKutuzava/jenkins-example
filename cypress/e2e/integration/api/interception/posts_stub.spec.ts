describe("Posts JSON", () => {

  it("Signle post", () => {
    const projectURL =/https:\/\/jsonplaceholder\.typicode\.com\/\d+/;
    const postItem = (id: number) => ({
        "userId": 1,
        "id": id,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }); 
   
    cy.intercept('GET', `/posts/1`, req => {
        
        req.reply({
            postItem(this.data.id);
        })
    }).as("@post");

    cy.visit("https://jsonplaceholder.typicode.com/");
    cy.get('a[href="/posts/1"]').click();
    cy.wait("@post");
  });
});


    
