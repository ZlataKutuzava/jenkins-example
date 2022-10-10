describe('Check the menu using within', function() {

before('Load test data', function() {
    cy.fixture('leftMenu.json').then((data) => {
        this.data = data;
    });
});

it('Click on the main application page', function() {
    cy.visit('/');
    cy.getByClass('category-cards').within(() => {
        cy.contains(this.data.alertsFramesWindows).click();
    });
    cy.getByClass('accordion').within(() => {
        cy.getByClass('element-group').find('.element-list').not('.show').should('have.length', 5);
        cy.getByClass('element-group').filter(':contains("Alerts")').within(() => {
            cy.getByClass('element-list').find('ul > li').filter(':contains("Frames")').should('have.length', 2);
        });
    });
    
});


});