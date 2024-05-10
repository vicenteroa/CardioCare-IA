it('Titulos Correctos', () => {
  const page = cy.visit('http://localhost:4321')

  page.get('title').should('have.text', 'CardioCareIA')
})
