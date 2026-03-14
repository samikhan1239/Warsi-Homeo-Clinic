"use client"

import { useState } from "react"

export default function MedicalChat() {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const sendMessage = async () => {

    if (!message.trim()) return

    const userMsg = { role: "user", text: message }

    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    speechSynthesis.cancel()

    const res = await fetch("/api/medical-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    })

    const data = await res.json()

    const botMsg = {
      role: "assistant",
      text: data.reply
    }

    setMessages(prev => [...prev, botMsg])
    setLoading(false)

    speak(data.reply)

    setMessage("")
  }

  const speak = (text) => {

    speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)

    speech.lang = "en-US"
    speech.rate = 1
    speech.pitch = 1

    speech.onstart = () => setSpeaking(true)
    speech.onend = () => setSpeaking(false)

    speechSynthesis.speak(speech)
  }

  const stopVoice = () => {
    speechSynthesis.cancel()
    setSpeaking(false)
  }

  return (
    <div className="h-screen flex flex-col bg-[#F6FBF7]">

      {/* Header */}

      <div className="bg-white border-b px-6 py-4 flex items-center gap-3 shadow-sm">

        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
          AI
        </div>

        <div>
          <h1 className="font-semibold text-gray-800">
            Medical AI Assistant
          </h1>
          <p className="text-xs text-gray-500">
            Ask about symptoms, diseases, or remedies
          </p>
        </div>

      </div>


      {/* Chat Area */}

      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl w-full mx-auto">

        {messages.length === 0 && (
          <div className="text-center mt-20 text-gray-500">

            <div className="text-4xl mb-4">🩺</div>

            <p className="text-lg font-medium">
              How can I help with your health today?
            </p>

            <p className="text-sm mt-2">
              Describe symptoms like headache, fever, stomach pain, etc.
            </p>

          </div>
        )}


        {messages.map((msg, i) => (

          <div
            key={i}
            className={`flex mb-4 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >

            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mr-2 text-sm">
                AI
              </div>
            )}

            <div
              className={`px-4 py-3 rounded-2xl max-w-md text-sm leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-white border text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

          </div>

        ))}


        {loading && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            AI is analyzing ...
          </div>
        )}

      </div>


      {/* Input Area */}

      <div className="border-t bg-white px-4 py-4">

        <div className="max-w-3xl mx-auto flex gap-2">

          <input
            className="flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Describe your symptoms..."
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            onKeyDown={(e)=> e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl text-sm font-medium"
          >
            Ask
          </button>

          {speaking && (
            <button
              onClick={stopVoice}
              className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-xl text-sm"
            >
              Stop
            </button>
          )}

        </div>

        {speaking && (
          <p className="text-xs text-green-600 mt-2 text-center">
            🔊 AI Assistant speaking...
          </p>
        )}

      </div>

    </div>
  )
}