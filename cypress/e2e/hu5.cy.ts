/* Seguridad – Evitar mal uso de plataforma e información - HU5 */

/*
Checklist ✅
➡️ Creacion de la pagina de terminos y condiciones en la pagina del chat

➡️ Detallar Términos y Condiciones

➡️ Verificación de Palabras Inapropiadas

➡️ Límite de caracteres

➡️ Estilo Visual de Error

*/
const testimonioGenerado =
  'Hace casi dos décadas un weon, cuando tenía 50 años, iba saliendo de la cafetería del trabajo con mi café matinal cuando sentí un dolor repentino en el medio del pecho. Supuse que era acidez estomacal y seguí caminando. Me detuve frente al escritorio de un amigo para conversar y me sentí muy mareado. Me dijo que estaba muy pálido y me ofreció llamar a nuestro número para casos de emergencia. Le dije que no hacía falta y decidí caminar hacia mi escritorio, que estaba al final de un largo pasillo. Cuando me acerqué a mi escritorio, sentía tanta debilidad en las piernas que tuve que sostenerme de las paredes del cubículo. Todavía no había nadie en el área. Me sentí un poco mejor, así que caminé hasta mi camioneta y me fui a casa manejando.'

const testimonioGenerado2 =
  'Hace casi dos décadas un, cuando tenía 50 años, iba saliendo de la cafetería del trabajo con mi café matinal cuando sentí un dolor repentino en el medio del pecho. Supuse que era acidez estomacal y seguí caminando. Me detuve frente al escritorio de un amigo para conversar y me sentí muy mareado Mierda. Me dijo que estaba muy pálido y me ofreció llamar a nuestro número para casos de emergencia. Le dije que no hacía falta y decidí caminar hacia mi escritorio, que estaba al final de un largo pasillo. Cuando me acerqué a mi escritorio, sentía tanta debilidad en las piernas que tuve que sostenerme de las paredes del cubículo. Todavía no había nadie en el área. Me sentí un poco mejor, así que caminé hasta mi camioneta y me fui a casa manejando.'

const testimonioGenerado3 =
  'Hace casi dos décadas un weon, cuando tenía 50 años, iba saliendo de la cafetería del trabajo con mi café matinal cuando sentí un dolor repentino en el medio del pecho. Supuse que era acidez estomacal y seguí caminando. Me detuve frente al escritorio de un amigo para conversar y me sentí muy mareado. Me dijo que estaba muy pálido y me ofreció llamar a nuestro número para casos de emergencia. Le dije que no hacía falta y decidí caminar hacia mi escritorio, que estaba al final de un largo pasillo. Cuando me acerqué a mi escritorio, sentía tanta debilidad en las piernas que tuve que sostenerme de las paredes del cubículo. Todavía no había nadie en el área. Me sentí un poco mejor, así que caminé hasta mi camioneta y me fui a casa manejando traga sables.'

const testimonioMax =
  'Mi nombre es Dr. Juan Pérez, y he sido médico de familia durante más de 20 años. Cada día, me despierto con la esperanza de hacer una diferencia en la vida de mis pacientes. La medicina no es solo una profesión para mí, es una vocación.Recuerdo a un paciente, Carlos, que vino a mi consultorio con síntomas de fatiga crónica. A través de pruebas exhaustivas y un cuidadoso análisis de sus síntomas, pudimos diagnosticar una afección tiroidea rara. Carlos estaba aliviado de tener finalmente una respuesta a sus problemas de salud. Con el tratamiento adecuado, pudo retomar su vida normal.Este es solo uno de los muchos casos que me recuerdan por qué elegí ser médico. Aunque los días pueden ser largos y las decisiones difíciles, la recompensa de ver a un paciente recuperarse y vivir su vida al máximo es inigualable.La medicina está en constante evolución, y me esfuerzo por mantenerme al día con las últimas investigaciones y tratamientos. Creo firmemente en la importancia de la atención preventiva y trabajo con mis pacientes para ayudarles a mantener un estilo de vida saludable.Ser médico es un honor y un privilegio. Aprecio la confianza que mis pacientes depositan en mí y me esfuerzo por brindar la mejor atención posible. A pesar de los desafíos, no cambiaría mi carrera por nada en el mundo.'

describe('HU5: Seguridad y Evitar mal uso de la plataforma', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:4321/register')
  })
  it('Verifica que existe la pagina Terminos y condicones', () => {
    cy.get('.checkbox-label > a').click()
    cy.url().should('include', '/TermsOfServices')
    cy.wait(2000)
  })
  it('Verifica que el checkbox de Términos y Condiciones impide el registro si no está marcado', () => {
    cy.get('#buttonSub').should('be.disabled')
    cy.wait(2000)
  })
  it('Verifica que el checkbox de Términos y Condiciones impide el registro si tiene rellenado las credenciales', () => {
    cy.get('#name').type('prueba')
    cy.get('#Rut').type('11111111-1')
    cy.get('#email').type('prueba_1@prueba.com')
    cy.get('#password').type('contraseña_123')
    cy.get('#buttonSub').should('be.disabled')
    cy.wait(2000)
  })
  it('Verifica detección limite minimo caracter en el testimonio', () => {
    cy.visit('http://localhost:4321/signin')
    cy.get('input[name=email]').type('prueba@correo.com')
    cy.get('input[name=password]').type('prueba_24')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
    cy.get('[data-astro-source-loc="78:18"]').click()
    cy.get('[data-astro-source-loc="91:18"]').click()
    cy.get('[data-astro-source-loc="104:18"]').click()
    cy.get('#testimonio').type('hola')
    cy.get('#enviar').click()
    cy.get('.toastify').should('be.visible')
  })
  it('Verifica detección limite maximo caracter en el testimonio', () => {
    cy.visit('http://localhost:4321/signin')
    cy.get('input[name=email]').type('prueba@correo.com')
    cy.get('input[name=password]').type('prueba_24')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
    cy.get('[data-astro-source-loc="78:18"]').click()
    cy.get('[data-astro-source-loc="91:18"]').click()
    cy.get('[data-astro-source-loc="104:18"]').click()
    cy.get('#testimonio').type(testimonioMax)
    cy.get('#enviar').click()
    cy.get('.toastify').should('be.visible')
  })
  it('CASO 1: Verifica detección de palabras inapropiadas en el usuario', () => {
    cy.visit('http://localhost:4321/signin')
    cy.get('input[name=email]').type('prueba@correo.com')
    cy.get('input[name=password]').type('prueba_24')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
    cy.get('[data-astro-source-loc="78:18"]').click()
    cy.get('[data-astro-source-loc="91:18"]').click()
    cy.get('[data-astro-source-loc="104:18"]').click()
    cy.get('#testimonio').type(testimonioGenerado)
    cy.get('#enviar').click()
    cy.get('#error-message').should('be.visible')
  })
  it('CASO 2: Verifica detección de palabras inapropiadas en el usuario', () => {
    cy.visit('http://localhost:4321/signin')
    cy.get('input[name=email]').type('prueba@correo.com')
    cy.get('input[name=password]').type('prueba_24')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
    cy.get('[data-astro-source-loc="78:18"]').click()
    cy.get('[data-astro-source-loc="91:18"]').click()
    cy.get('[data-astro-source-loc="104:18"]').click()
    cy.get('#testimonio').type(testimonioGenerado2)
    cy.get('#enviar').click()
    cy.get('#error-message').should('be.visible')
  })
  it('CASO 3: Verifica detección de palabras inapropiadas en el usuario', () => {
    cy.visit('http://localhost:4321/signin')
    cy.get('input[name=email]').type('prueba@correo.com')
    cy.get('input[name=password]').type('prueba_24')
    cy.get('button[type=submit]').click()
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
    cy.get('[data-astro-source-loc="78:18"]').click()
    cy.get('[data-astro-source-loc="91:18"]').click()
    cy.get('[data-astro-source-loc="104:18"]').click()
    cy.get('#testimonio').type(testimonioGenerado3)
    cy.get('#enviar').click()
    cy.get('#error-message').should('be.visible')
  })
})
