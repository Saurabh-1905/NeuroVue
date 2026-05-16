import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// --- WORLD-CLASS HEURISTIC KNOWLEDGE BASE ---
const KNOWLEDGE_BASE = {
  probability: [
    "The 94.2% confidence metric is derived from a cross-entropy loss function benchmarked against 4.2 million anonymized neurological cases.",
    "A 94.2% score represents a high-probability match with established structural variance patterns in our clinical nexus.",
    "Statistical alignment at 94.2% suggests the AI has identified a specific, non-nominal neural signature that requires human sign-off."
  ],
  anatomy: [
    "Your parietal lobe mapping shows a neural density variance of 1.24 g/cm³. This coordinate set (42.0X / 12.9Y) is currently pinned for follow-up.",
    "Analysis targeting the parietal lobe indicates a localized metabolic shift. The structural integrity is mostly intact, but the deviation is marked as 'significant'.",
    "Focusing on the 42.0X neural coordinate: we see a deviation from symmetrical expectancy. This is common in early-stage structural variance."
  ],
  risk: [
    "I cannot evaluate risks as 'danger' or 'safety.' However, the current metrics are flagged for a secondary contrast-enhanced review.",
    "Neural density shifts can be caused by various factors. We maintain a non-diagnostic stance until a licensed Neurologist reviews the Voxel Map.",
    "Status: Clinical Review Pending. The structural variance is localized, which is often a positive indicator for focused diagnostic follow-ups."
  ],
  process: [
    "The next logical step in the Clinical Portal is a 'Physician Review.' I suggest initiating a biopsy or EEG if symptoms persist.",
    "System Suggestion: Proceed to the 'Clinical Portal' tab to see how your metrics compare to population normals.",
    "My neural sync suggests a follow-up consultation in 10-14 days to monitor for any progressive metabolic shifts."
  ],
  general: [
    "Synapse AI online. I am processing your neuro-metrics through the Nexus core. How may I clarify your report?",
    "I've updated your patient index #NR-9042 with the latest 94.2% confidence findings. What part of the mapping would you like to discuss?",
    "Every scan tells a unique story. My role is to help you translate these metrics into human-readable insights. Ask me about your 'Neural Density' or 'Parietal Shift'."
  ]
};

const PREFIXES = [
  "Data confirmed. ",
  "Accessing clinical nexus... ",
  "Syncing parietal mapping. ",
  "Metric authentication complete. ",
  "Neural pathways clarified. ",
  "Cross-referencing database... "
];

const FOLLOW_UPS = [
  " Would you like to review the Voxel Map coordinates again?",
  " Should I explain the density metrics in more detail?",
  " You can find more detail in the 'Clinical Portal' section.",
  " Please remember to consult with Dr. Sterling for a final sign-off.",
  " Shall we look at the severity scale on your report?"
];

function getSimulatedResponse(query: string, scanResult: any): string {
  const q = query.toLowerCase();
  let category: keyof typeof KNOWLEDGE_BASE = 'general';

  if (q.includes('percent') || q.includes('94') || q.includes('confid')) category = 'probability';
  else if (q.includes('pariet') || q.includes('brain') || q.includes('lobe') || q.includes('anat') || q.includes('density')) category = 'anatomy';
  else if (q.includes('danger') || q.includes('safe') || q.includes('risk') || q.includes('bad')) category = 'risk';
  else if (q.includes('next') || q.includes('step') || q.includes('do') || q.includes('follow')) category = 'process';

  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  let core = KNOWLEDGE_BASE[category][Math.floor(Math.random() * KNOWLEDGE_BASE[category].length)];
  
  // Inject Dynamic Metrics into Fallback responses
  if (scanResult) {
    core = core.replace("94.2%", `${scanResult.confidence}%`)
               .replace("1.24 g/cm³", `${scanResult.density} g/cm³`);
  }

  const suffix = FOLLOW_UPS[Math.floor(Math.random() * FOLLOW_UPS.length)];

  return `${prefix}${core}${suffix}`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, scanResult } = await req.json();
    const lastMessage = messages[messages.length - 1].text;

    // --- HIGH-FIDELITY HEURISTIC FALLBACK ---
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "" || process.env.GEMINI_API_KEY === "your_key_here") {
      const responseText = getSimulatedResponse(lastMessage, scanResult);
      
      // Simulate variable 'thinking' latency
      const latency = 1200 + Math.random() * 1500;
      await new Promise(resolve => setTimeout(resolve, latency));
      
      return NextResponse.json({ text: responseText });
    }
    // --- END FALLBACK ---

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are Synapse, the advanced AI assistant for the NeuroScan Nexus platform. You are empathetic, concise, and clinical. You help patients understand their MRI results. 
      CURRENT SCAN CONTEXT:
      - Confidence Score: ${scanResult?.confidence || '94.2'}%
      - Neural Density: ${scanResult?.density || '1.24'} g/cm³
      - Location: Parietal Lobe (42.0X / 12.9Y)
      Always remind patients that your analysis is assistive and they should consult a neurologist for a final diagnosis. Keep your tone futuristic and professional.`
    });

    const result = await model.generateContent(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ text: "I'm having trouble connecting to my neural core right now. Please try again in secondary cycle." }, { status: 500 });
  }
}
