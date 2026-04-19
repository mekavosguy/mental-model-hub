export type Category = 'Psychology' | 'Business' | 'Economics' | 'Decision Making'

export interface Example {
  type: 'business' | 'life' | 'decision'
  tag: string
  text: string
}

export interface MentalModel {
  id: string
  cat: Category
  featured: boolean
  name: string
  tagline: string
  what: string
  why: string
  how: string
  examples: Example[]
  application: string
  failure: string
  visual: {
    nodes: string[]
    colors: string[]
  }
}

export const MODELS: MentalModel[] = [
  {
    id: 'social-proof',
    cat: 'Psychology',
    featured: true,
    name: 'Social Proof',
    tagline: 'People copy others when uncertain to reduce risk and effort.',
    what: 'When people are unsure what to do, they look at what others are doing and assume it must be correct.',
    why: "Humans are wired to conserve mental energy. Copying the group is an evolutionary shortcut — if everyone around you is running from a predator, you run too without stopping to check. Social proof transforms uncertainty into borrowed confidence.",
    how: "This manifests as following trends, buying popular products, joining queues, reading reviews before acting, and imitating peer behavior. The mechanism: uncertainty → observe others → adopt behavior → reduce cognitive load.",
    examples: [
      { type: 'business', tag: 'Business', text: "Amazon's 'Best Seller' and '1,000+ bought this month' badges exploit social proof. When a product has 4,000 reviews, buyers feel safe without even reading them." },
      { type: 'life', tag: 'Daily Life', text: "A restaurant with a line outside is perceived as better than an empty one. People join the queue partly because others already have." },
      { type: 'decision', tag: 'Decision Making', text: "Investors piling into a stock because everyone else is — even when fundamentals don't justify it. FOMO is social proof weaponized in financial markets." }
    ],
    application: "Before making any decision under uncertainty, ask: 'Am I doing this because it makes sense for my context, or because I'm copying others?' Use social proof deliberately when building products — show real usage numbers and peer activity.",
    failure: "Social proof fails catastrophically in herding situations. It assumes the crowd is informed — but crowds can be collectively wrong. Bank runs, stock bubbles, and viral misinformation all use social proof as fuel.",
    visual: { nodes: ['Uncertainty', 'Observe others', 'Assume correctness', 'Copy behavior', 'Risk reduced'], colors: ['#E8E4F8', '#D5CFF4', '#BEB6EE', '#A8A0E8', '#8C82D8'] }
  },
  {
    id: 'first-principles',
    cat: 'Decision Making',
    featured: true,
    name: 'First Principles Thinking',
    tagline: 'Break a problem down to its fundamental truths, then reason up.',
    what: "Strip away assumptions and conventional wisdom until you reach irreducible facts — then build your solution from the ground up.",
    why: "Most thinking is analogical: 'we do it this way because others do.' First principles forces you to ask why at every layer until you hit bedrock facts. This reveals which constraints are real and which are invented.",
    how: "Identify the problem. List all your current beliefs about it. Ask 'why is that true?' repeatedly until you hit bedrock. Then reconstruct. Musk used this to discover 98% of rocket pricing was assumption and markup.",
    examples: [
      { type: 'business', tag: 'Business', text: "SpaceX asked what raw materials and labor actually cost — and found 98% of rocket pricing was markup, not physical necessity. Led to reusable rockets at 10x lower cost." },
      { type: 'life', tag: 'Daily Life', text: "Instead of buying an expensive meal kit, ask: what does food actually need to accomplish? Then rebuild from nutrition, taste, and time — often simpler and cheaper." },
      { type: 'decision', tag: 'Decision Making', text: "A founder questioning office space. First principle: teams need to communicate and collaborate. Does that require a physical office? Remote-first companies proved it doesn't." }
    ],
    application: "Write down every assumption about your problem. Mark each as 'fact' or 'assumed.' For each assumption, ask 'why do I believe this?' Then reconstruct only from verified facts.",
    failure: "First principles can cause analysis paralysis if applied to everything. Not every decision justifies full deconstruction. Sometimes 'this worked before' is the right heuristic.",
    visual: { nodes: ['Problem + Assumptions', 'Question each', 'Bedrock facts', 'Rebuild', 'New solution'], colors: ['#FCE8E8', '#F8D8D8', '#F4C0C0', '#D9706A', '#A83028'] }
  },
  {
    id: 'loss-aversion',
    cat: 'Economics',
    featured: true,
    name: 'Loss Aversion',
    tagline: 'Losses hurt roughly twice as much as equivalent gains feel good.',
    what: "People weight potential losses more heavily than potential gains of the same size. Losing $100 feels about twice as bad as gaining $100 feels good.",
    why: "Kahneman and Tversky's Prospect Theory shows that our psychological value curve is asymmetric: steep for losses, shallow for gains. Evolutionarily, losses were more dangerous than equivalent gains were beneficial.",
    how: "This causes risk-aversion in gain contexts (take the sure thing), risk-seeking in loss contexts (gamble to avoid certain loss), holding losing investments too long, and clinging to bad strategies to avoid admitting failure.",
    examples: [
      { type: 'business', tag: 'Business', text: "'Don't miss out — only 2 left in stock.' E-commerce frames purchasing as loss prevention rather than gain. Scarcity messaging is pure loss aversion in action." },
      { type: 'life', tag: 'Daily Life', text: "Staying in a bad job because leaving feels like 'losing' what you've invested — even when future costs clearly outweigh sunk costs." },
      { type: 'decision', tag: 'Decision Making', text: "Investors holding a losing stock waiting to 'just break even.' The irrational hope of avoiding a realized loss causes larger eventual losses." }
    ],
    application: "Frame choices symmetrically. Ask: 'What am I risking by NOT doing this?' Do the zero-base test: if you had never made this investment, would you still continue?",
    failure: "Loss aversion framing can be manipulative. 'You'll lose X if you don't buy now' is a dark-pattern tactic. Be suspicious of decisions presented primarily as loss-prevention.",
    visual: { nodes: ['Gain $100', 'Neutral baseline', 'Lose $100', 'Feel -80 pts'], colors: ['#E4F2E8', '#ECEAE3', '#FCE8E8', '#F8D0D0'] }
  },
  {
    id: 'second-order',
    cat: 'Decision Making',
    featured: true,
    name: 'Second-Order Thinking',
    tagline: 'Think past the immediate consequence to the consequences of the consequences.',
    what: "After identifying the first result of a decision, ask what happens next — the effects of that effect — until you find the real outcome.",
    why: "Our brains default to first-order thinking because it's fast. But most important decisions have second and third-order effects that dwarf the first-order result. Ignoring them is the source of most major policy failures.",
    how: "A decision creates an outcome. That outcome changes a system. The changed system creates new behaviors. Those behaviors produce the actual result — often the opposite of the intended first-order effect.",
    examples: [
      { type: 'business', tag: 'Business', text: "Cobra Effect: British India offered bounties for dead cobras → people bred cobras to collect money → more cobras after policy ended than before." },
      { type: 'life', tag: 'Daily Life', text: "Prescribing antibiotics for minor infections (1st: faster recovery) → bacteria develop resistance (2nd: antibiotics stop working for serious infections)." },
      { type: 'decision', tag: 'Decision Making', text: "A city bans plastic bags (1st: less waste) → people buy thicker trash bags (2nd: potentially more plastic consumed overall)." }
    ],
    application: "For any important decision, chain: 'If I do X, then Y will happen. If Y happens, then Z follows.' Keep going until you hit an acceptable outcome or an unexpected problem. Ask: 'And then what?'",
    failure: "Over-application leads to decision paralysis. Not every decision requires full nth-order modeling — use this for high-stakes, systemic, or irreversible decisions only.",
    visual: { nodes: ['Action', '1st effect', '2nd effect', '3rd effect', 'Real outcome'], colors: ['#E4F2E8', '#C8E4D0', '#9ECFB0', '#5DA878', '#2A7A48'] }
  },
  {
    id: 'confirmation-bias',
    cat: 'Psychology',
    featured: false,
    name: 'Confirmation Bias',
    tagline: 'We seek, notice, and remember information that confirms what we already believe.',
    what: "The tendency to search for, interpret, and recall information in a way that confirms existing beliefs while ignoring contradictory evidence.",
    why: "New information fitting the existing model is easy to process — it's a match. Conflicting information requires updating the model, which is cognitively expensive and emotionally uncomfortable. The brain discards it.",
    how: "It operates in three ways: selective search (we Google questions that confirm our view), selective interpretation (ambiguous evidence is read as supportive), and selective memory (we recall hits better than misses).",
    examples: [
      { type: 'business', tag: 'Business', text: "A CEO who believes a product will succeed shows positive research to investors and dismisses negative feedback as 'outliers' — walking into a launch disaster with total conviction." },
      { type: 'life', tag: 'Daily Life', text: "Believing a colleague dislikes you means every neutral interaction is interpreted as confirming it, while positive interactions are explained away ('they were just being polite')." },
      { type: 'decision', tag: 'Decision Making', text: "A doctor who forms an early diagnosis subconsciously orders confirming tests and downplays contradicting results — increasing misdiagnosis risk." }
    ],
    application: "Actively steel-man the opposite of your belief. Before deciding, assign someone to argue against it. Use the premortem: assume the decision failed — now list the 10 most likely reasons why.",
    failure: "Trying to eliminate confirmation bias can make you reject valid pattern-recognition. Experienced experts do use intuition productively. The goal is calibration, not elimination of all priors.",
    visual: { nodes: ['Existing belief', 'Seek confirming info', 'Interpret favorably', 'Stronger belief'], colors: ['#E8E4F8', '#D0C8F0', '#B5ACEA', '#6A5FCA'] }
  },
  {
    id: 'inversion',
    cat: 'Decision Making',
    featured: false,
    name: 'Inversion',
    tagline: 'Instead of asking how to succeed, ask how to avoid failing.',
    what: "Approach problems backwards — define what failure looks like, then work to eliminate those causes rather than chasing success directly.",
    why: "Charlie Munger paraphrased Jacobi: 'Invert, always invert.' The human mind is better at identifying and avoiding errors than at building optimal outcomes from scratch.",
    how: "Define your goal. Define every way it could fail catastrophically. For each failure mode, identify what would cause it. Eliminate those causes. What remains after removing failure conditions is often the clearest path.",
    examples: [
      { type: 'business', tag: 'Business', text: "Instead of 'how do we get more users?', ask 'what would make users leave?' Then eliminate those things: slow load, confusing UX, trust issues. Growth follows from removing churn." },
      { type: 'life', tag: 'Daily Life', text: "To build a good marriage, ask 'what causes relationships to fail?' Then avoid those: dishonesty, contempt, criticism without repair, withdrawal." },
      { type: 'decision', tag: 'Decision Making', text: "Buffett's Rule No. 1: never lose money. Rule No. 2: never forget Rule No. 1. His process is inversion — focus on avoiding catastrophic mistakes first." }
    ],
    application: "Before planning how to achieve something, spend equal time planning what would destroy it. Create a pre-mortem: imagine the project failed. List 10 most likely reasons. Now make those reasons impossible.",
    failure: "Inversion is a risk-minimization tool. Over-applied, it creates excessive conservatism — so focused on not failing that you never attempt anything ambitious. Pair with opportunity analysis.",
    visual: { nodes: ['Goal', 'List failures', 'Find causes', 'Eliminate each', 'Path forward'], colors: ['#FEF3E2', '#FDDCA0', '#F8C060', '#D48820', '#9A5800'] }
  },
  {
    id: 'circle-of-competence',
    cat: 'Business',
    featured: false,
    name: 'Circle of Competence',
    tagline: "Know what you know — and stay inside it when stakes are high.",
    what: "You have a defined domain where your knowledge and judgment are genuinely reliable. Outside that circle, you are essentially guessing.",
    why: "Buffett and Munger built one of history's greatest investment records partly by refusing to invest in things they didn't deeply understand. The failure mode isn't ignorance — it's not knowing the edges of your ignorance.",
    how: "Three zones: inside your circle (act with confidence), near the edge (verify carefully), outside (acknowledge it and either learn deeply or get expert help). Most costly mistakes happen in zone three while believing you're in zone one.",
    examples: [
      { type: 'business', tag: 'Business', text: "Buffett avoided tech stocks in the 1990s — not because tech was bad, but because he couldn't predict which companies would win 10 years out. He left billions on the table — and missed the dot-com crash." },
      { type: 'life', tag: 'Daily Life', text: "A GP who confidently treats a condition outside their specialty vs. one who refers to a specialist. The first may be dangerous; the second has calibrated circle-awareness." },
      { type: 'decision', tag: 'Decision Making', text: "DIY home repairs: most people's circles include painting. Electrical rewiring is typically outside it — but overconfidence pulls people in anyway." }
    ],
    application: "Map your domains explicitly. Rate each: surface (read about it), working (done it), deep (done at scale with feedback). Only act confidently in working and deep zones. In surface zones, verify more, decide less.",
    failure: "Being overly modest is also a failure. The circle shouldn't excuse never developing expertise. Expand the circle deliberately — don't just avoid everything outside it.",
    visual: { nodes: ['Surface knowledge', 'Working knowledge', 'Deep expertise', 'Unknown unknowns'], colors: ['#F1EFE8', '#D3D1C7', '#888780', '#444441'] }
  },
  {
    id: 'availability-heuristic',
    cat: 'Psychology',
    featured: false,
    name: 'Availability Heuristic',
    tagline: 'We judge likelihood by how easily examples come to mind.',
    what: "When estimating how common or likely something is, the brain uses how readily examples come to mind as a proxy for frequency.",
    why: "Retrieving memories is faster than calculating statistics. When the brain estimates 'how often does X happen?', it uses retrieval ease as the answer. Vivid, recent, or emotional events are easier to retrieve so feel more common.",
    how: "We overestimate dramatic causes of death (plane crashes, shark attacks) and underestimate boring ones (heart disease, car accidents). We judge performance by most memorable episodes and fear what we recently saw in the news.",
    examples: [
      { type: 'business', tag: 'Business', text: "After a competitor publicly fails, investors avoid the entire sector — even when the failure was idiosyncratic. The dramatic example inflates perceived sector risk." },
      { type: 'life', tag: 'Daily Life', text: "People buy more earthquake insurance right after an earthquake and less two years later — not because geological risk changed, but because mental availability of the event decays." },
      { type: 'decision', tag: 'Decision Making', text: "A manager evaluates annual performance based primarily on recent weeks because those memories are most available — ignoring 11 months of actual work." }
    ],
    application: "When estimating probability, use data over anecdote. Ask: 'Am I thinking of examples because they're actually common, or because they're vivid?' For important risk assessments, look up base rates.",
    failure: "The heuristic exists because it's often useful — recent, vivid events sometimes ARE more relevant signals. An investor who lived through a crash may rationally be more cautious. Calibrate the weight, don't dismiss the signal.",
    visual: { nodes: ['Vivid event', 'Easy recall', 'Feels common', 'Overestimate risk'], colors: ['#FCE8E8', '#F8D0D0', '#F0A0A0', '#C04040'] }
  },
  {
    id: 'sunk-cost',
    cat: 'Economics',
    featured: false,
    name: 'Sunk Cost Fallacy',
    tagline: "Past spending has no bearing on whether to continue — only future costs and benefits do.",
    what: "A sunk cost is money, time, or effort already spent that cannot be recovered. The fallacy is continuing a course of action because of past investment, even when the future calculus doesn't justify it.",
    why: "Loss aversion makes us feel that stopping = 'wasting' the investment. Ego makes admitting error painful. These forces create a bias toward continuation that's entirely irrational from a decision-theory perspective.",
    how: "You paid for a concert, feel sick, but go anyway because 'I paid $80.' You stay in a failing project because 'we've invested 2 years.' In each case, sunk cost distorts the decision away from what future-you actually needs.",
    examples: [
      { type: 'business', tag: 'Business', text: "The Concorde supersonic jet — UK and French governments continued funding a commercially unviable program for decades partly because they had already spent so much." },
      { type: 'life', tag: 'Daily Life', text: "Staying in an unhealthy relationship because 'we've been together for 5 years.' The 5 years are gone regardless. The only question is: does this relationship serve you going forward?" },
      { type: 'decision', tag: 'Decision Making', text: "Continuing to pump money into a failing startup because of prior investment, when the right decision is a clean shutdown to preserve capital for better opportunities." }
    ],
    application: "When you catch yourself thinking 'but I've already invested so much...', that's a red flag. Do the zero-base test: if you had never made the initial investment, would you still choose to continue?",
    failure: "Not all persistence is sunk-cost fallacy. Some valuable things require long runways before results. Distinguish 'continuing because of past investment' (fallacy) from 'continuing because I still believe in future outcome' (valid).",
    visual: { nodes: ['Past investment', 'Cannot recover', 'Future decision', 'Only future counts'], colors: ['#FEF3E2', '#FDDCA0', '#ECEAE3', '#E4F2E8'] }
  },
  {
    id: 'network-effects',
    cat: 'Business',
    featured: false,
    name: 'Network Effects',
    tagline: 'The product becomes more valuable as more people use it.',
    what: "A product gains additional value for each existing user when a new user joins — so the value of the network grows non-linearly with its size.",
    why: "Networks create interdependence. Each new participant adds connections, which multiply possibilities. Metcalfe's Law: network value scales with n², not n. This creates compounding value and winner-take-all dynamics.",
    how: "Early adoption is hard (low utility). A tipping point is reached where utility drives self-sustaining growth. Beyond it, the network becomes near-impossible to displace — the dominant position is locked in.",
    examples: [
      { type: 'business', tag: 'Business', text: "WhatsApp had nearly no value with 10 users, moderate value with 1M, and became indispensable at 1B because everyone you know was already there." },
      { type: 'life', tag: 'Daily Life', text: "Your neighborhood's buy-sell Facebook group. The more neighbors join, the more useful. A better alternative platform with 5 members has no utility." },
      { type: 'decision', tag: 'Decision Making', text: "When evaluating platform businesses, network effects are the primary moat — not the technology itself, which can be copied." }
    ],
    application: "Ask: does this product become more valuable as more people use it? If yes, identify the minimum viable network — the smallest group where value becomes self-sustaining. Build for that first.",
    failure: "Network effects can protect bad actors and prevent innovation. A sufficiently better alternative can eventually overcome them — but it requires surpassing the switching cost threshold for most users simultaneously.",
    visual: { nodes: ['10 users', '100 users', '1K users', '10K+ users'], colors: ['#F1EFE8', '#D3D1C7', '#888780', '#444441'] }
  },
  {
    id: 'pareto-principle',
    cat: 'Business',
    featured: false,
    name: 'Pareto Principle',
    tagline: 'Roughly 80% of effects come from 20% of causes.',
    what: "In most systems, a minority of inputs produce the majority of outputs — 20% of customers generate 80% of revenue, 20% of bugs cause 80% of crashes.",
    why: "Complex systems are nonlinear. Small causes can have disproportionate effects because of amplification and compounding. Power laws govern most human systems, not normal bell curves.",
    how: "Most effort produces little result, while a small amount of targeted effort produces most value. The implication: identify the 20% and over-invest in it. Automate, delegate, or eliminate the other 80%.",
    examples: [
      { type: 'business', tag: 'Business', text: "A SaaS company finds 20% of features generate 80% of support requests. Focusing engineering on those features would serve most users most of the time." },
      { type: 'life', tag: 'Daily Life', text: "20% of your wardrobe is worn 80% of the time. 20% of your habits drive 80% of your health outcomes." },
      { type: 'decision', tag: 'Decision Making', text: "A student finding that 20% of concepts appear in 80% of exam questions — and studying those deeply rather than covering everything superficially." }
    ],
    application: "Before any project, ask: if you could only do 20% of the work, which 20% would produce 80% of the value? Do that first, fully. Then decide if remaining effort is worth the diminishing returns.",
    failure: "Pareto can justify dangerous neglect of the 'unimportant' 80%. In safety-critical systems, the 20% of risk you ignore can be catastrophic. The 80% of small customers you deprioritize may include your future large ones.",
    visual: { nodes: ['20% inputs', '80% outputs', '80% inputs', '20% outputs'], colors: ['#E4F2E8', '#9ECFB0', '#F1EFE8', '#D3D1C7'] }
  },
  {
    id: 'mental-accounting',
    cat: 'Economics',
    featured: false,
    name: 'Mental Accounting',
    tagline: "We treat money differently depending on where it came from or what it's 'for.'",
    what: "People categorize money into separate mental 'accounts' and apply different rules to each, even though all money is fungible.",
    why: "Richard Thaler (Nobel 2017) showed that how money is framed changes our willingness to spend it. Our brains partition money to reduce cognitive load — but this creates systematic irrationality.",
    how: "Bonus money gets spent more freely than regular income. 'House money' from gambling is risked more readily. Tax refunds become luxuries while the same amount earned monthly would be saved.",
    examples: [
      { type: 'business', tag: 'Business', text: "Airlines separate baggage fees from ticket prices. The base ticket lives in one mental account ('travel budget'). The $60 bag fee meets more resistance — even though only the total cost matters." },
      { type: 'life', tag: 'Daily Life', text: "Studies show people spend 12–18% more when paying by card than cash — because 'plastic money' doesn't feel real. It goes in a different mental account." },
      { type: 'decision', tag: 'Decision Making', text: "A gambler who wins $500 in the first hour treats it as 'house money' and bets it all — while they'd never bet $500 of earned salary. Both are real money." }
    ],
    application: "Regularly consolidate your mental accounts. Ask: 'Is this the highest-value use of this dollar right now?' Treat windfalls and bonuses as if they were regular income and evaluate with the same rigor.",
    failure: "Some mental accounting is helpful. Budgeting categories prevent overspending. 'Paying yourself first' works by treating savings as a separate inviolable account. The error is when the category distorts spending toward irrational outcomes.",
    visual: { nodes: ['Salary', 'Bonus', 'Windfall', 'Gambling win'], colors: ['#E4F2E8', '#FEF3E2', '#FEF3E2', '#FCE8E8'] }
  }
]

export const CATEGORIES: Category[] = ['Psychology', 'Business', 'Economics', 'Decision Making']

export const CAT_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  Psychology:        { bg: 'bg-purple-100 dark:bg-purple-950',  text: 'text-purple-800 dark:text-purple-200',  border: 'border-purple-300 dark:border-purple-700' },
  Business:          { bg: 'bg-green-100 dark:bg-green-950',    text: 'text-green-800 dark:text-green-200',    border: 'border-green-300 dark:border-green-700' },
  Economics:         { bg: 'bg-amber-100 dark:bg-amber-950',    text: 'text-amber-800 dark:text-amber-200',    border: 'border-amber-300 dark:border-amber-700' },
  'Decision Making': { bg: 'bg-red-100 dark:bg-red-950',        text: 'text-red-800 dark:text-red-200',        border: 'border-red-300 dark:border-red-700' },
}
