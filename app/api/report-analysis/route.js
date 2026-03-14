import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req) {
  try {

    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    })

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64,
          mimeType: file.type
        }
      },
      {
        
text: `
Analyze this medical report.

Return STRICT JSON in this format:

{
 "summary": "short summary",
 "tests":[
   {
     "name":"Test Name",
     "value":"Patient Value",
     "normalRange":"Normal Range",
     "status":"normal|high|low|borderline"
   }
 ],
 "advice":["tip1","tip2"],
 "nextSteps":["step1","step2"]
}

Rules:
- Include only important or abnormal tests
- Provide the normal medical range for each test
- Status must be normal, high, low, or borderline
- Use simple language
`
      }
    ])

    let text = result.response.text()

    text = text.replace(/```json|```/g,"")

    let parsed

    try{
      parsed = JSON.parse(text)
    }catch{

      parsed = {
        summary: text,
        tests: [],
        advice: [],
        nextSteps: []
      }

    }

    return Response.json(parsed)

  } catch (error) {

    console.error(error)

    return Response.json({
      summary:"Unable to analyze the report",
      tests:[],
      advice:[],
      nextSteps:[]
    })

  }
}