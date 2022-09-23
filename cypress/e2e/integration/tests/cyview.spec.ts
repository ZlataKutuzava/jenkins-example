const cyView = require("cy-view");
const devices = [
	{
		model: "macbook-15",
		width: 1440,
		height: 900
	},
	{
		model: "ipad-2",
		width: 768,
		height: 1024
	},
	{
		model: "iphone-6+",
		width: 414,
		height: 736
	}
];

const urls = ['https://github.com/', 'https://docs.cypress.io/']
const testOnDevices = cyView(devices);

testOnDevices(urls, () => {
    describe('Test on all viewports', () => {
        it('Open the page', () => {
            cy.log('log');
        });
    });
});
