describe('Testimonio Test 🧑‍⚕️', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4321')
    cy.get('[href="signin"]').click()
    cy.viewport(1920, 1080)
  })
  /* Test 1: Verificación de inicio de sesión */
  it('Verificación de inicio sesión exitoso ', () => {
    signinAuth('prueba@correo.com', 'prueba_24')
    cy.contains('Iniciando sesion por favor espere...').should('be.visible')
    cy.get(':nth-child(10) > .h-full > .space-y-2 > [data-astro-source-loc="19:14"] > .flex').should('be.visible')
    cy.log('Inicio de sesión exitoso ✅')
    cy.pause()
  })
  /* Test 2: Verificación de preguntas no respondidas */

  /* Test 3: Verificación de testimonio sin preguntas respondidas */

  /* Test 4: Verificación de minimo caracter */

  /* Test 5: Verificación de maximo caracter */

  /* Test 6: Verificación de testimonio valido */

  /* Test 7: Verificación de testimonio con garabatos */

  /* Test 8: Verificación de boton enviar sin respuestas */
})

function signinAuth (email:string, password:string):void {
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)
  cy.get('button[type=submit]').click()
}
