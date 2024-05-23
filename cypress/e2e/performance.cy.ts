describe('Medición de rendimiento', () => {
  it('Mide el tiempo de carga de la página', () => {
    cy.visit('http://localhost:4321') // Reemplaza 'https://www.ejemplo.com' con la URL de la página que deseas medir
    cy.window().then((win) => {
      const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart
      cy.log(`El tiempo de carga de la página es: ${loadTime} milisegundos`)
      cy.pause()
    })
  })
})
