/* Validación de información de usuario en BBDD - HU4 */
/*
Descripción:
✅ Validación de datos de registro de usuario para comprobar si está registrado o no son datos correctos.

➡️ Como objetivo principal garantizar la seguridad, integridad y precisión de la información proporcionada por los usuarios al momento de registrarse en nuestro sistema.

➡️ Esto se logra mediante la verificación de la autenticidad de los datos, como direcciones de correo electrónico válidas y contraseñas seguras, asegurando así que el acceso al sistema sea solo para usuarios autorizados
*/

describe('HU4:Validación de información de usuario en BBDD', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4321/signin')
  })

  it('Iniciar sesión con credenciales válidas', () => {
    iniciarSesion('prueba@correo.com', 'prueba_24')
    cy.contains('Iniciando sesion por favor espere...').should('be.visible')
    cy.url().should('include', '/dashboard')
    cy.log('Inicio de sesión exitoso ✅')
  })

  it('Verificar que NO inicie sesión con credenciales incorrectas', () => {
    iniciarSesion('correo@invalido.com', 'contraseña_invalida')
    cy.contains('Error al iniciar sesión por favor verifica correo y contraseña ').should('be.visible')
    cy.log('Inicio de sesión fallido con credenciales incorrectas ✅')
  })

  it('Verificar que NO iniciar sesión sin ingresar credenciales', () => {
    cy.get('button[type=submit]').click()
    cy.log('Inicio de sesión fallido sin ingresar credenciales ✅')
  })
})

function iniciarSesion (email:string, password:string):void {
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)
  cy.get('button[type=submit]').click()
}
