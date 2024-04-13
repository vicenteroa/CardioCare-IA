import React, { useState, useEffect } from 'react'
import './estilos.css' // Importa tu archivo de estilos

const imagenes = [
  {
    url: 'https://www.texasheart.org/wp-content/uploads/2021/07/thi-heart-animation.gif',
    alt: 'Imagen 1'
  },
  {
    url: 'https://7dmc.ae/wp-content/uploads/2020/12/FAQ_7DMC_Puls-Cardiac-Test.jpg',
    alt: 'Imagen 2'
  },
  {
    url: 'https://medizinonline.com/wp-content/uploads/2023/03/iStock-1210336572-1920x1080.jpg',
    alt: 'Imagen 3'
  }
]

const Carrusel = () => {
  const [indiceActual, setIndiceActual] = useState(0)
  const [mostrarTitulo, setMostrarTitulo] = useState(false)

  useEffect(() => {
    // Establecer un tiempo de espera antes de mostrar el título
    const timeout = setTimeout(() => {
      setMostrarTitulo(true)
    }, 500)

    // Limpiar el timeout al desmontar el componente
    return () => clearTimeout(timeout)
  }, [])

  const siguienteImagen = () => {
    setIndiceActual((indiceActual + 1) % imagenes.length)
  }

  const imagenAnterior = () => {
    const nuevoIndice = indiceActual - 1
    setIndiceActual(nuevoIndice < 1 ? imagenes.length - 1 : nuevoIndice)
  }

  return (
    <div className="carrusel">
      <div className="titulo-container">
        {mostrarTitulo && (
          <h1 className="titulo-fade-in absolute text-9xl font-bold text-center text-white">
            CARDIOCARE IA
          </h1>
        )}
      </div>
           <div className='deg'></div>
      <div className="imagen-container">
        <button className="boton-anterior" onClick={imagenAnterior}></button>
        <img src={imagenes[indiceActual].url} alt={imagenes[indiceActual].alt} className='imagenes' />

        <button className="boton-siguiente" onClick={siguienteImagen}></button>
      </div>
    </div>
  )
}

export default Carrusel
