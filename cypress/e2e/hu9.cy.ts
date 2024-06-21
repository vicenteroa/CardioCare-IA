// Objetivos:
//
// Interpretación de testimonios: Implementar un sistema que pueda interpretar y analizar testimonios de manera eficiente y precisa.
// Generación de conclusiones: Desarrollar un algoritmo que pueda generar conclusiones significativas a partir de los testimonios analizados.
// Validación de conclusiones: Asegurar que las conclusiones generadas sean coherentes y relevantes para el contexto del testimonio analizado.
// Mejora continua: Establecer un proceso de retroalimentación y mejora continua para perfeccionar el análisis de testimonios y la generación de conclusiones a lo largo del tiempo.

import iniciarSesion from './functions/IniciarSesion.cy'
const texto =
  'Hace casi dos décadas, cuando tenía 50 años, iba saliendo de la cafetería del trabajo con mi café matinal cuando sentí un dolor repentino en el medio del pecho. Supuse que era acidez estomacal y seguí caminando. Me detuve frente al escritorio de un amigo para conversar y me sentí muy mareado. Me dijo que estaba muy pálido y me ofreció llamar a nuestro número para casos de emergencia. Le dije que no hacía falta y decidí caminar hacia mi escritorio, que estaba al final de un largo pasillo. Cuando me acerqué a mi escritorio, sentía tanta debilidad en las piernas que tuve que sostenerme de las paredes del cubículo. Todavía no había nadie en el área. Me sentí un poco mejor, así que caminé hasta mi camioneta y me fui a casa manejando.'

describe('HU9: Interpretación de testimonios', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4321/signin')
    cy.viewport(1920, 1080)
    iniciarSesion('prueba@correo.com', 'prueba_24')
  })
  it('Iniciar sesión con credenciales válidas', () => {
    cy.contains('Iniciando sesion por favor espere...').should('be.visible')
    cy.url().should('include', '/dashboard')
    cy.log('Inicio de sesión exitoso ✅')
  })
  it('Generacion de testimonios', () => {
    cy.contains('Iniciando sesion por favor espere...').should('be.visible')
    cy.url().should('include', '/dashboard')
    cy.get('[data-astro-source-loc="78:18"]').click()
    cy.get('[data-astro-source-loc="91:18"]').click()
    cy.get('[data-astro-source-loc="104:18"]').click()
    cy.get('#testimonio').type(texto)
    cy.get('#enviar').click()
    cy.url().should('include', '/IA')
    cy.wait(4000)
    cy.get('.response-container').should('be.visible')
  })
})
