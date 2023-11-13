describe("empty spec", () => {
 beforeEach(() => {
  cy.intercept('GET', 'http://localhost:3001/avi/v1/orders', {
    statusCode: 200,
    fixutre: 'orders'
  })
  cy.visit('http://localhost:3000')
 })
 it('should display the home page with some orders' ,() =>{
  cy.get('h1')
  .should('contain', 'Burrito Builder')
 })
});
