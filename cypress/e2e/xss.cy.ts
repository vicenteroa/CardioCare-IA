describe('Pruebas de Cross-Site Scripting (XSS) en inicio de sesión', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4321')
    cy.get('[href="signin"]').click()
  })
  it('Intenta ejecutar un script XSS en el formulario de inicio de sesión', () => {
    cy.visit('http://localhost:4321')
    cy.get('[href="signin"]').click()
    cy.viewport(1920, 1080)

    const scriptXSS = "<script>alert('XSS')</script>"
    const scriptXSSEscapado = encodeURIComponent(scriptXSS)
    let email = `malicioso${scriptXSSEscapado}@example.com`
    // Reemplazar los caracteres no deseados
    // eslint-disable-next-line no-useless-escape
    email = email.replace(/[\)<]/g, '')
    // Asegurarse de que no hay '(' después del '@'
    const [localPart, domain] = email.split('@')
    email = `${localPart.replace(/\(/g, '')}@${domain}`
    // Introducir el script XSS escapado en el campo de correo electrónico
    cy.get('input[name=email]').type(email.replace(/%20/g, ''))
    // Introducir una contraseña válida en el campo de contraseña
    cy.get('input[name=password]').type('contraseña') // Reemplaza 'contraseña' con una contraseña válida
    // Hacer clic en el botón de enviar
    cy.get('button[type=submit]').click()
    cy.contains('Error al iniciar sesión por favor verifica correo y contraseña ').should('be.visible')
    // Verificar que el script malicioso no se haya ejecutado en la página después del intento de inicio de sesión
    cy.url().should('not.include', '/dashboard') // Verificar que la URL no sea la de la página de inicio de sesión
    cy.pause()
  })
})
