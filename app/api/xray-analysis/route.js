import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req) {
  try {

    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
      return Response.json({ error: "No X-ray uploaded" }, { status: 400 })
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
You are an AI radiology assistant.

Analyze this chest X-ray image.

Return STRICT JSON in this format:

{
 "diagnosis":"normal | pneumonia | possible pneumonia",
 "confidence":"0-100%",
 "summary":"short explanation",
 "recommendations":[
   "medical advice 1",
   "medical advice 2"
 ]
}

Rules:
- If lungs appear clear → diagnosis = normal
- If infection or lung opacity visible → pneumonia
- If uncertain → possible pneumonia
- Use simple medical language
- Do not include markdown
`
      }
    ])

    let text = result.response.text()

    text = text.replace(/```json|```/g,"")

    let parsed

    try {
      parsed = JSON.parse(text)
    } catch {

      parsed = {
        summary: text,
        findings: [],
        recommendations: [],
        urgency: "low"
      }

    }

    return Response.json(parsed)

  } catch (error) {

    console.error(error)

    return Response.json({
      summary: "Unable to analyze the X-ray",
      findings: [],
      recommendations: [],
      urgency: "unknown"
    })

  }
}