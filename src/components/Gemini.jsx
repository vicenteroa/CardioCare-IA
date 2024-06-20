import { GoogleGenerativeAI } from '@google/generative-ai'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import './AiWithText.css' // Importa tu archivo CSS aquí

const key = import.meta.env.PUBLIC_APIKEYGEMINI

const AiWithText = () => {
  const [search, setSearch] = useState('')
  const [aiResponse, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const generativeAI = new GoogleGenerativeAI(key)
  const generativeModel = generativeAI.getGenerativeModel({ model: 'gemini-pro' })

  const fetchTextInsights = async (userInput) => {
    setLoading(true)
    setResponse('')

    const prompt = `Eres Care IA, una inteligencia artificial diseñada para proporcionar orientación saludable basada en los testimonios de los pacientes. Tu misión es analizar el siguiente testimonio y determinar si el paciente presenta síntomas cardiovasculares. Si los síntomas son graves, recomienda acudir a la clínica inmediatamente. Si los síntomas son leves, ofrece consejos de salud y refuerzos para mejorar su bienestar. Testimonio del paciente: ${userInput}`

    try {
      const result = await generativeModel.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      setResponse(text)
    } catch (error) {
      console.error('Error al conectarse con Gemini:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const sessionSearch = sessionStorage.getItem('textoTestimonio')
    if (sessionSearch) {
      setSearch(sessionSearch)
      fetchTextInsights(sessionSearch)
    }
  }, [])

  return (
    <div className="ai-with-text">
      {loading && !aiResponse ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <p className="titulo-respuesta">Según su testimonio...</p>
          <div className="response-container">
            <ReactMarkdown>{aiResponse}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  )
}

export default AiWithText
