import React, { useState, useEffect } from 'react'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

const MODEL_NAME = 'gemini-1.5-pro-latest'
const API_KEY = '' /* La apikey generada  */

const ChatWithGemini = () => {
  const [conversation, setConversation] = useState([])
  const [userMessage, setUserMessage] = useState('')
  const [chat, setChat] = useState(null)

  const handleSendMessage = async () => {
    if (!userMessage || !chat) return

    const newMessage = {
      role: 'user',
      parts: [{ text: userMessage }],
    }

    setConversation([...conversation, newMessage])

    const result = await chat.sendMessage(userMessage)
    const response = result.response

    const newBotMessage = {
      role: 'model',
      parts: [{ text: response.text() }],
    }

    setConversation([...conversation, newBotMessage])
    setUserMessage('')
  }

  useEffect(() => {
    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({ model: MODEL_NAME })

    const generationConfig = {
      temperature: 1,
      topK: 64,
      topP: 0.95,
      maxOutputTokens: 8192,
    }
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ]
    const chatInstance = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: 'user',
          parts: [{ text: 'Hola' }],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'Hola! 👋 \n\nPara poder ayudarte, necesito que me cuentes un poco sobre tus síntomas. ¿Qué has estado experimentando?  Cuanto más detallado seas, mejor podré recomendarte un especialista.',
            },
          ],
        },
        {
          role: 'user',
          parts: [{ text: 'Siento un dolor en el pecho que me molesta y me cuesta respirar' }],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'Entiendo, eso suena preocupante. 😔 \n\nEl dolor en el pecho y la dificultad para respirar pueden ser síntomas de varias condiciones, por lo que es importante obtener un diagnóstico preciso. \n\nPara poder recomendarte al especialista adecuado, necesito hacerte algunas preguntas más:\n\n* **¿Puedes describir el dolor en el pecho?** ¿Es agudo, punzante, opresivo o quemante? \n* **¿Dónde se localiza el dolor?** ¿En el centro del pecho, a un lado, en la espalda?\n* **¿Cuándo comenzó el dolor?** ¿Ha sido gradual o repentino?\n* **¿Hay algo que empeore o mejore el dolor?** Por ejemplo, ¿respirar profundamente, toser o cambiar de posición?\n* **¿Tienes otros síntomas además del dolor en el pecho y la dificultad para respirar?** Por ejemplo, ¿sudoración, náuseas, mareos, palpitaciones?\n\nMientras más detalles me puedas dar, mejor podré ayudarte a encontrar al especialista adecuado.',
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              text: 'Mi dolor ha sido gradual es punzate el dolor no puedo respirar profundamente y siento mareos constantes',
            },
          ],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'Gracias por la información adicional. \n\nCon los síntomas que describes, especialmente el dolor punzante que empeora al respirar profundamente y los mareos, es importante que consultes a un médico lo antes posible. \n\nDada la naturaleza de tus síntomas, te recomendaría buscar a un **cardiólogo**.  Ellos son especialistas en el corazón y el sistema cardiovascular y podrán realizar las pruebas necesarias para determinar la causa de tu dolor en el pecho y la dificultad para respirar.\n\nAquí te dejo algunas opciones de cardiólogos en Chile:\n\n* **Dr. [Nombre del cardiólogo], Clínica [Nombre de la clínica]** - Especializado en [área de especialización] con experiencia en [tipo de experiencia]. \n* **Dr. [Nombre del cardiólogo], Clínica [Nombre de la clínica]** - Especializado en [área de especialización] con experiencia en [tipo de experiencia]. \n\nTe recomiendo que investigues un poco sobre estos médicos y sus clínicas para ver cuál se ajusta mejor a tus necesidades y ubicación.\n\n**Es importante mencionar que esta información no sustituye una consulta médica.**  Por favor, busca atención médica de inmediato para obtener un diagnóstico preciso y un plan de tratamiento adecuado.',
            },
          ],
        },
      ],
    })

    setChat(chatInstance)

    return () => chatInstance.close()
  }, [])

  return (
    <div>
      <h2>Chat con Gemini</h2>
      <div className="chat-history">
        {conversation.map((message) => (
          <div key={message.role} className={`message ${message.role}`}>
            {message.parts[0].text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  )
}

export default ChatWithGemini
