describe('check weather imformation', () => {
    it('get weather information for the cities', () => {
        cy.request({
            method: 'GET', 
            url: 'http://ip-api.com/json/24.48.0.1'
        }).then((response) => {
            const city = response.body.city;
            return city;
        }).then((city) => {
            cy.request({
                method: 'GET',
                url: 'http://ip-api.com/json/24.48.0.1?fields=status,message,country,countryCode,region,regionName,isp,org,as,quer,city&city=' + city    
            }).then((response) => {
                expect(response.status).equal(200);
                expect(response.body).has.property("country","Canada");
                expect(response.body).has.property("city", city);
            });
        });
    });
});