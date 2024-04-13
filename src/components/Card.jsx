import React, { useState } from 'react'
import '../components/Card.css' // Asegúrate de tener tu archivo CSS para los estilos

const Tarjeta = ({ titulo, info }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="tarjeta" onClick={() => setVisible(!visible)}>
      <h2 className='tit-1'>{titulo}</h2>
      {visible && (
        <div className="info-container">
          <p>{info}</p>
        </div>
      )}
    </div>
  )
}

export default Tarjeta
