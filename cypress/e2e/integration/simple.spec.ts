function mockLocation(latitude: number, longitude: number, language: string) {
  return {
  onBeforeLoad(win: any) {
  cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((cb, err) => {
  if (latitude && longitude) {
  return cb({ coords: { latitude, longitude } });
  }
  throw err({ code: 1 });
  });

  }
  };
  }
  describe('Mock Geo Location', () => {
  it('Geo Location Test', () => {
  cy.visit("https://whatmylocation.com/", mockLocation(51.1642,10.4541, 'en-CA'));

  cy.log(""+navigator.geolocation.getCurrentPosition);
  cy.log(""+navigator.language);
  });

  })


