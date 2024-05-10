/* eslint-disable @typescript-eslint/no-unused-vars */
// Obtén el formulario, el botón de envío y la casilla de verificación de términos y condiciones
const form = document.getElementById('register-form')
const button = document.getElementById('buttonSub')
const termsCheckbox = document.getElementById('terms')

// Deshabilita el botón de envío al inicio
button.disabled = true
button.style.cursor = 'not-allowed'

// Agrega un evento de cambio a la casilla de verificación
termsCheckbox.addEventListener('change', function () {
  if (this.checked) {
    button.disabled = false
    button.style.cursor = 'pointer'
  } else {
    button.disabled = true
    button.style.cursor = 'not-allowed'
  }
})
