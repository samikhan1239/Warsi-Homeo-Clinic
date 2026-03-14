"use client"

import { useState } from "react"

export default function ReportAnalyzer() {

  const [file,setFile] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [activeTab,setActiveTab] = useState("overview")

  const [data,setData] = useState({
    summary:"",
    tests:[],
    advice:[],
    nextSteps:[]
  })


  const handleUpload = async () => {

    if(!file){
      setError("Please upload a medical report")
      return
    }

    setError("")
    setLoading(true)

    try{

      const formData = new FormData()
      formData.append("file",file)

      const res = await fetch("/api/report-analysis",{
        method:"POST",
        body:formData
      })

      const result = await res.json()

      setData({
        summary: result.summary || "",
        tests: result.tests || [],
        advice: result.advice || [],
        nextSteps: result.nextSteps || []
      })

    }
    catch(err){
      setError("Failed to analyze report")
    }

    setLoading(false)

  }


  const statusColor = (status) => {

    if(status === "high" || status === "low")
      return "text-red-600 font-semibold"

    if(status === "borderline")
      return "text-yellow-600 font-semibold"

    return "text-green-600 font-semibold"
  }


  return (

    <div className="min-h-screen bg-[#F5FAF7]">


      {/* HEADER */}

      <div className="bg-white border-b px-8 py-5 flex justify-between">

        <div>

          <h1 className="text-xl font-semibold text-gray-800">
            AI Medical Report Analyzer
          </h1>

          <p className="text-sm text-gray-500">
            Upload your medical report to get AI insights
          </p>

        </div>

        <div className="text-sm text-gray-400">
          Secure • Private • AI Powered
        </div>

      </div>



      <div className="max-w-5xl mx-auto p-8">


        {/* UPLOAD SECTION */}

        <div className="bg-white border rounded-xl p-8 shadow-sm">

          <h2 className="text-lg font-semibold mb-4">
            Upload Medical Report
          </h2>

          <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center">

            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e)=>setFile(e.target.files[0])}
            />

            {file && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {file.name}
              </p>
            )}

          </div>

          {error && (
            <p className="text-red-500 mt-3 text-sm">
              {error}
            </p>
          )}

          <button
            onClick={handleUpload}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Analyze Report
          </button>

        </div>



        {/* LOADER */}

        {loading && (

          <div className="mt-10 flex flex-col items-center">

            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>

            <p className="text-gray-600 mt-4">
              AI is analyzing your medical report...
            </p>

          </div>

        )}



        {/* DASHBOARD */}

        {!loading && data.summary && (

          <div className="mt-10">


            {/* TABS */}

            <div className="flex gap-4 border-b pb-3">

              <button
                onClick={()=>setActiveTab("overview")}
                className={`px-4 py-2 rounded ${
                  activeTab==="overview"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
                }`}
              >
                Overview
              </button>

              <button
                onClick={()=>setActiveTab("tests")}
                className={`px-4 py-2 rounded ${
                  activeTab==="tests"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
                }`}
              >
                Test Results
              </button>

              <button
                onClick={()=>setActiveTab("advice")}
                className={`px-4 py-2 rounded ${
                  activeTab==="advice"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
                }`}
              >
                Advice
              </button>

              <button
                onClick={()=>setActiveTab("next")}
                className={`px-4 py-2 rounded ${
                  activeTab==="next"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
                }`}
              >
                Next Steps
              </button>

            </div>



            {/* OVERVIEW */}

            {activeTab==="overview" && (

              <div className="bg-white border rounded-lg p-6 mt-6">

                <h3 className="font-semibold mb-3">
                  Health Summary
                </h3>

                <p className="text-gray-700">
                  {data.summary}
                </p>

              </div>

            )}



            {/* TEST RESULTS */}

            {activeTab==="tests" && (

              <div className="bg-white border rounded-lg p-6 mt-6">

                <h3 className="font-semibold mb-4">
                  Lab Test Results
                </h3>

<table className="w-full border">

<thead className="bg-gray-100">

<tr>
<th className="p-3 text-left">Test</th>
<th className="p-3 text-left">Your Value</th>
<th className="p-3 text-left">Normal Range</th>
<th className="p-3 text-left">Status</th>
</tr>

</thead>

<tbody>

{data.tests.length === 0 && (
<tr>
<td className="p-3 text-gray-500">
No abnormal tests detected
</td>
</tr>
)}

{data.tests.map((test,index)=>(
<tr key={index} className="border">

<td className="p-3">{test.name}</td>

<td className="p-3">{test.value}</td>

<td className="p-3 text-gray-600">
{test.normalRange || "-"}
</td>

<td className={`p-3 ${statusColor(test.status)}`}>
{test.status}
</td>

</tr>
))}

</tbody>

</table>
              </div>

            )}



            {/* ADVICE */}

            {activeTab==="advice" && (

              <div className="bg-white border rounded-lg p-6 mt-6">

                <h3 className="font-semibold mb-4">
                  Lifestyle Advice
                </h3>

                <ul className="list-disc pl-5 space-y-2">

                  {data.advice.length === 0 && (
                    <p className="text-gray-500">
                      No advice available
                    </p>
                  )}

                  {data.advice.map((item,index)=>(
                    <li key={index}>{item}</li>
                  ))}

                </ul>

              </div>

            )}



            {/* NEXT STEPS */}

            {activeTab==="next" && (

              <div className="bg-white border rounded-lg p-6 mt-6">

                <h3 className="font-semibold mb-4">
                  Recommended Next Steps
                </h3>

                <ul className="list-disc pl-5 space-y-2">

                  {data.nextSteps.length === 0 && (
                    <p className="text-gray-500">
                      No recommendations available
                    </p>
                  )}

                  {data.nextSteps.map((step,index)=>(
                    <li key={index}>{step}</li>
                  ))}

                </ul>

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  )

}