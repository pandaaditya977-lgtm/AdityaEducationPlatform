export interface AiDoubtResponse {
  answer: string;
  confidence: number;
  keyFormulas: string[];
  suggestedFollowUps: string[];
  recommendedChapterNote?: string;
}

export const solveDoubtWithAi = async (question: string, subject: string = 'General'): Promise<AiDoubtResponse> => {
  // Simulate intelligent response delay
  await new Promise(res => setTimeout(res, 800));

  const q = question.toLowerCase();
  
  if (q.includes('lenz') || q.includes('faraday') || q.includes('flux') || q.includes('induction') || subject.toLowerCase().includes('physics')) {
    return {
      answer: `### Conceptual Breakdown: Lenz's Law & Electromagnetic Induction\n\n1. **Core Principle**: According to Faraday-Lenz law, the induced electromotive force (EMF) is given by:\n$$\\mathcal{E} = -\\frac{d\\Phi_B}{dt}$$\nThe **negative sign** is the mathematical statement of Lenz's Law: *the polarity of the induced EMF is such that it produces a current whose magnetic field opposes the change which produces it.*\n\n2. **Why Energy Conservation Demands This**: If the induced field instead aided the magnet's motion, the magnet would accelerate perpetually without input of mechanical work, violating the First Law of Thermodynamics.\n\n3. **Practical Application**: When you drop a strong neodymium magnet through a copper tube, the falling magnet induces circular Eddy currents. These currents create a repelling magnetic pole above and attracting pole below, producing a noticeable braking drag force!`,
      confidence: 0.98,
      keyFormulas: ['\\mathcal{E} = -N \\frac{d\\Phi_B}{dt}', '\\Phi_B = \\vec{B} \\cdot \\vec{A} = BA\\cos(\\theta)', 'L = \\frac{\\mu_0 N^2 A}{l}'],
      suggestedFollowUps: [
        'How does Lenz Law explain eddy current braking in high-speed bullet trains?',
        'Can you solve a numerical problem with a rotating rod in a magnetic field?',
        'Escalate this doubt to Dr. Sarah Jenkins'
      ],
      recommendedChapterNote: 'Electromagnetic Induction & Faraday-Lenz Laws (Chapter 6)'
    };
  }

  if (q.includes('integral') || q.includes('king') || q.includes('calculus') || subject.toLowerCase().includes('math')) {
    return {
      answer: `### Mathematical Solution & Shortcut Analysis\n\n1. **King's Property of Definite Integrals**:\n$$\\int_{a}^{b} f(x) \\, dx = \\int_{a}^{b} f(a + b - x) \\, dx$$\n\n2. **How to Solve in 3 Steps**:\n- **Step 1**: Let the given integral be $I$.\n- **Step 2**: Replace every $x$ with $(a + b - x)$ to write an alternate equation for $I$.\n- **Step 3**: Add the two equations together: $2I = \\int_{a}^{b} [f(x) + f(a+b-x)] \\, dx$. In 90% of exam problems, the terms inside the bracket simplify to a constant (often $1$)!\n- **Final Answer**: $I = \\frac{b - a}{2}$.`,
      confidence: 0.99,
      keyFormulas: ['\\int_a^b f(x)dx = \\int_a^b f(a+b-x)dx', '\\int_{-a}^a f(x)dx = 0 \\quad \\text{if } f(-x) = -f(x)'],
      suggestedFollowUps: [
        'How do I apply this to \\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x} + \\sqrt{\\cos x}} dx?',
        'What is the Leibniz rule for differentiating an integral?',
        'Send question to Ananya Verma'
      ],
      recommendedChapterNote: 'Definite Integrals: King Rule & Reduction Formulas'
    };
  }

  return {
    answer: `### EduConnect AI Analysis for "${question}"\n\n1. **Foundational Concept**: When tackling this topic, first isolate the knowns, the boundary conditions, and the core governing equation.\n2. **Step-by-step Strategy**:\n   - Check dimensional consistency.\n   - Apply standard symmetry theorems to reduce algebraic complexity.\n   - Correlate with recent previous year questions (PYQs).\n3. **Recommendation**: Review the allotted chapter notes and attempt the 5-question mastery quiz to reinforce this concept.`,
    confidence: 0.94,
    keyFormulas: ['\\text{Core Concept Formula}'],
    suggestedFollowUps: [
      'Give me an illustrative example',
      'What are the common exam traps for this topic?',
      'Create a 5-question quiz for me on this subject'
    ],
    recommendedChapterNote: 'Check your digital notes library'
  };
};

export const generateStudyPlan = async (subject: string, weakTopics: string[]): Promise<string[]> => {
  await new Promise(res => setTimeout(res, 600));
  return [
    `Day 1: Concept Revision on ${weakTopics.join(', ') || subject} — re-read summary notes`,
    `Day 2: Watch 30-min targeted lecture and solve 5 foundational problems`,
    `Day 3: Attempt timed quiz series #1 (aim for >80% accuracy)`,
    `Day 4: Book 1-on-1 doubt session with your allotted verified tutor`,
    `Day 5: Practice high-yield Previous Year Questions (PYQs) under exam conditions`,
    `Day 6: Flashcard sprint & vertical EduShorts review`,
    `Day 7: Full chapter assessment & claim 100 bonus reward points`
  ];
};
