/// <reference types="cypress-network-idle" />
import 'cypress-network-idle';

describe('Network Idle', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://jsonplaceholder.typicode.com/', {
            fixture: 'posts.json'
        }).as('posts');
    });

    it('for N seconds', () => {
       const delayInMs = 1500;
       cy.visit(`https://jsonplaceholder.typicode.com/?delay=${delayInMs}`);
       cy.waitForNetworkIdle(2000);
       
       cy.get('header nav li', {timeout: 0}).should('have.length', 0);
    })
});