import React from 'react'
import Spline from '@splinetool/react-spline'
import './3d.css'

export default function App () {
  return (
    <div className='comp'>
      <div className='flex justify-end items-center'>
        <div className="mr-4"> {/* Agregamos un margen a la derecha para mover el contenido hacia la izquierda */}
          <h1>¿Qué son las <span className='text-red-600 text-9xl'>Enfermedades Cardiovasculares</span>?</h1>
          <p className='text-2xl left-3'>Las enfermedades cardiovasculares son una serie de trastornos que afectan el corazón y los vasos sanguíneos, y representan una de las principales causas de mortalidad en Chile. Estas enfermedades incluyen afecciones como la enfermedad coronaria, la hipertensión arterial, los accidentes cerebrovasculares y la insuficiencia cardíaca, entre otras.</p>
        </div>
        <div>
          {/* Aquí puedes agregar la animación de Spline */}
          <Spline scene="https://prod.spline.design/waKglDTG90a1ghsc/scene.splinecode" />
        </div>
      </div>
    </div>
  )
}
