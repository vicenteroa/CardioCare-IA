import { GoogleGenerativeAI } from '@google/generative-ai'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
const key =
  import.meta.env.MODE === 'development'
    ? import.meta.env.PUBLIC_APIKEYGEMINI_DEVELOPMENT
    : import.meta.env.PROD.APIKEYGEMINI_PRODUCTION

const AiWithText = () => {
  const [search, setSearch] = useState('')
  const [aiResponse, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const generativeAI = new GoogleGenerativeAI(key)
  const generativeModel = generativeAI.getGenerativeModel({ model: 'gemini-pro' })

  const fetchTextInsights = async (userInput) => {
    setLoading(true)
    setResponse('')

    const prompt = `Eres Care IA tu misión es dar orientación saludable a pacientes con sus síntomas: ${userInput}`
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
    <div>
      <p>Gemini api: {key}</p>
      {loading && !aiResponse ? (
        <p style={{ margin: '30px 0' }}>Cargando ...</p>
      ) : (
        <div style={{ margin: '30px 0' }}>
          <ReactMarkdown>{aiResponse}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export default AiWithText
