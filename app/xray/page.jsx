"use client"

import { useState } from "react"

export default function XrayAnalyzer() {

  const [file,setFile] = useState(null)
  const [preview,setPreview] = useState(null)
  const [data,setData] = useState(null)
  const [loading,setLoading] = useState(false)

  const handleUpload = (e) => {

    const selected = e.target.files[0]

    if(!selected) return

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setData(null)

  }

  const analyzeXray = async () => {

    if(!file) {
      alert("Please upload an X-ray first")
      return
    }

    const formData = new FormData()
    formData.append("file",file)

    try{

      setLoading(true)

      const res = await fetch("/api/xray-analysis",{
        method:"POST",
        body:formData
      })

      const result = await res.json()

      setData(result)

    }catch(err){

      console.error(err)
      alert("Failed to analyze X-ray")

    }

    setLoading(false)

  }

  const diagnosisColor = (d) => {

    if(d === "normal") return "text-green-600 bg-green-100"
    if(d === "pneumonia") return "text-red-600 bg-red-100"

    return "text-yellow-600 bg-yellow-100"

  }

  return (

    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        AI Chest X-ray Analyzer
      </h1>

      {/* Upload Card */}

      
<div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 max-w-xl mx-auto">

  {/* Header */}

  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-800">
      Upload Chest X-ray
    </h2>

    <p className="text-sm text-gray-500">
      Upload an X-ray image for AI pneumonia detection
    </p>
  </div>


  {/* Upload Area */}

  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-500 transition">

    <div className="text-center">

      <p className="text-gray-700 font-medium">
        Click to upload X-ray
      </p>

      <p className="text-xs text-gray-500 mt-1">
        PNG, JPG, JPEG supported
      </p>

    </div>

    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      className="hidden"
    />

  </label>


  {/* Preview */}

  {preview && (
    <div className="mt-6">

      <p className="text-sm text-gray-600 mb-2">
        Preview
      </p>

      <img
        src={preview}
        className="rounded-xl border max-h-80 w-full object-contain"
      />

    </div>
  )}


  {/* Button */}

  <button
    onClick={analyzeXray}
    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
  >
    Analyze X-ray
  </button>

</div>
      {/* Loader */}

     {loading && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center">

      <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-700 font-medium">
        AI is analyzing the X-ray...
      </p>

    </div>

  </div>
)}

      {/* Results */}

      {data && !loading && (

        <div className="mt-10 space-y-6">

          {/* Diagnosis */}

          <div className="bg-white p-6 rounded-xl shadow border">

            <h2 className="text-xl font-semibold mb-3">
              AI Diagnosis
            </h2>

            <span className={`px-4 py-2 rounded font-semibold ${diagnosisColor(data.diagnosis)}`}>
              {data.diagnosis?.toUpperCase()}
            </span>

            <p className="mt-3 text-gray-600">
              Confidence: {data.confidence}
            </p>

          </div>

          {/* Summary */}

          <div className="bg-white p-6 rounded-xl shadow border">

            <h2 className="text-xl font-semibold mb-3">
              Summary
            </h2>

            <p className="text-gray-700">
              {data.summary}
            </p>

          </div>

          {/* Recommendations */}

          <div className="bg-white p-6 rounded-xl shadow border">

            <h2 className="text-xl font-semibold mb-3">
              Recommendations
            </h2>

            <ul className="list-disc pl-6 space-y-2">

              {data?.recommendations?.map((rec,index)=>(
                <li key={index}>{rec}</li>
              ))}

            </ul>

          </div>

        </div>

      )}

    </div>

  )

}