/* Registro de información de testimonios en base de datos – HU8 */
/*
Checklist ✅
➡️ Permitir que usuarios compartan sus testimonios en la plataforma y se almacenen correctamente en la BBDD
➡️ Integrar técnicas de encriptación para proteger la confidencialidad de los testimonios de los usuarios.
*/
describe('HU8: Registro de información de testimonios en base de datos', () => {
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
  /* OTROS TEST :  */
})

function signinAuth (email:string, password:string):void {
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)
  cy.get('button[type=submit]').click()
}
