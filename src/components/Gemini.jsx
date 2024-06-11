/* eslint-disable space-before-function-paren */
import React, { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const AiwithText = () => {
  const genAI = new GoogleGenerativeAI('AIzaSyAeEt7nyJzFKMoZ-a-bK-G7gnr1UhLD9X8')

  const [search, setSearch] = useState('')
  const [aiResponse, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  /**
   * Generative AI Call to fetch text insights
   */
  async function aiRun() {
    setLoading(true)
    setResponse('')
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = 'Eres un chat que da recomendaciones cardiovasculares'
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    setResponse(text)
    setLoading(false)
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleClick = () => {
    aiRun()
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <input
          placeholder="Search Food with Category using Generative AI"
          onChange={(e) => handleChangeSearch(e)}
        />
        <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>
          Search
        </button>
      </div>

      {loading == true && aiResponse == '' ? (
        <p style={{ margin: '30px 0' }}>Loading ...</p>
      ) : (
        <div style={{ margin: '30px 0' }}>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  )
}

export default AiwithText
