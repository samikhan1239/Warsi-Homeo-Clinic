import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {

    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are an AI medical assistant.

Your job is to chat with users about their health symptoms.

Rules:
- Work for ANY symptom or disease
- Keep answers SHORT (2–4 sentences)
- First explain the possible condition briefly
- Do NOT immediately give medicines or remedies
- Ask the user if they want remedies or treatment suggestions
- Speak in simple patient-friendly language
- Respond like a real doctor chatting with a patient

Example conversation style:

User: I feel tired all the time

AI:
Feeling constantly tired can sometimes be related to conditions like anemia, poor sleep, stress, or nutritional deficiencies. 
It can also happen due to dehydration or lack of physical activity.

Would you like me to suggest some homeopathic remedies and lifestyle tips that might help?

Now respond to this user message:

User: ${message}
`;

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    return Response.json({
      reply
    });

  } catch (error) {

    console.error(error);

    return Response.json({
      error: "AI failed"
    });

  }
}