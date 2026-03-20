export const siteConfig = {
  companyName: 'Seed Planning Co., Ltd.',
  email: 'medb3@seedplanning.co.jp',
  phone: '+81-3-3835-9211',
  address: '4F, 3-19-11 Yushima, Bunkyo-ku, Tokyo, Japan',
  linkedin: 'https://www.linkedin.com/company/seedplanning/',
  formEndpoint: '',
  requestCategories: [
    'Recruit',
    'Feasibility',
    'HCP research',
    'Patient research',
    'Qualitative research',
    'Quantitative research',
    'Rare disease research',
    'Moderator request',
    'Report request',
    'Specific topic request',
    'Other'
  ]
};

export const navigation = [
  { slug: 'home', label: 'Home', href: 'index.html' },
  { slug: 'how', label: 'How we work', href: 'how-we-work.html' },
  { slug: 'rare', label: 'Rare disease', href: 'rare-disease.html' },
  { slug: 'facts', label: 'Japan fact sheets', href: 'japan-fact-sheets.html' },
  { slug: 'about', label: 'About team', href: 'about-team.html' },
  { slug: 'contact', label: 'Contact us', href: 'contact.html' }
];

export const whySeedPanels = [
  {
    id: '01',
    label: 'What makes us different',
    body: [
      'Japan expertise with a healthcare focus, grounded in 40+ years of research and consulting.',
      'Fully bilingual execution across fieldwork, analysis, and deliverables.',
      'Rare disease reach, including sensitive patient journeys and specialist stakeholders.',
      'Ethics and operational rigor aligned with established industry expectations.'
    ]
  },
  {
    id: '02',
    label: 'Quality, ethics, and security',
    body: [
      'Participant respect, clear consent language, and privacy-aware handling are built into the operating model.',
      'Scope, timing, and risk are surfaced early so global teams can plan with fewer surprises.',
      'Healthcare research processes are designed to balance recruitment practicality with compliance and reputation.',
      'Security-minded delivery is supported by quality checks and established professional standards.'
    ]
  },
  {
    id: '03',
    label: 'Proof & partner voice',
    body: [
      'Long-standing collaborations with global healthcare and life-science teams.',
      'Client feedback consistently highlights clarity, responsiveness, and in-market judgment.',
      'Practical “do / don’t” guidance that helps teams avoid preventable friction in Japan.',
      'A partner model built to translate nuance into decisions, not just deck slides.'
    ]
  }
];

export const workAccordions = [
  {
    key: 'workflow',
    title: 'End-to-end workflow',
    type: 'list',
    items: [
      'Study design & alignment',
      'Recruitment & feasibility',
      'Fieldwork (IDI / FGD / online)',
      'Translation / interpretation (if needed)',
      'Analysis & reporting'
    ]
  },
  {
    key: 'scope',
    title: 'Transparency in scope changes',
    type: 'text',
    text: 'Explain how changes after a certain point are handled, why they matter operationally, and what trade-offs global teams should expect. This is one of the ways trust is built.'
  },
  {
    key: 'timeline',
    title: 'Typical timeline',
    type: 'timeline',
    image: 'assets/img/typical_timeline.png',
    note: 'Timelines vary by target profile, access route, and translation need, but the flow shown here gives a practical planning baseline.'
  }
];

export const voices = [
  { name: 'Partner A', quote: 'I wanted to express my gratitude and say thank you for an excellent few days of research!' },
  { name: 'Partner B', quote: 'The team stayed practical and transparent, which helped us make confident decisions under pressure.' },
  { name: 'Partner C', quote: 'Their local judgment and responsiveness made collaboration smooth from kickoff to final reporting.' }
];

export const factSheets = [
  { slug: 'incentives-scheduling-realities', title: 'Incentives & scheduling realities', topic: 'Healthcare system', summary: 'What global teams often underestimate, and how to plan ethically.', tags: ['Insurance', 'Scheduling', 'Incentives'], image: 'assets/img/scheduling.png', pdf: 'assets/docs/tips-healthcare-mr-japan.pdf', intro: 'A quick checklist for planning incentives and timelines in Japan.', keyPoints: ['Plan incentives ethically and consistently across segments.', 'Allow buffer time for scheduling, rescheduling, and confirmation.', 'Be clear about participation requirements and burden.'], questions: ['What is the target profile and availability constraint?', 'Are there facility access requirements, hospital approvals, or site rules to consider?', 'What are the “no-go” hours and national holidays to avoid?'], related: ['recruitment-feasibility-japan', 'patient-centric-qualitative-research', 'reimbursement-pricing-japan'] },
  { slug: 'recruitment-feasibility-japan', title: 'Recruitment feasibility in Japan', topic: 'HCP research', summary: 'What realistic timelines, access routes, and screening logic look like in the Japanese market.', tags: ['Culture', 'Recruitment', 'HCP'], image: 'assets/img/seed_consultation.png', pdf: 'assets/docs/conduct-physician-research-japan.pdf', intro: 'A grounded view of access, practical recruitment routes, and what should be clarified before fieldwork starts.', keyPoints: ['Feasibility improves when target definitions reflect real-world practice settings and physician time constraints.', 'Recruitment plans should separate ideal profiles from what is operationally reachable.', 'Bilingual screening and careful expectation-setting reduce friction later.'], questions: ['What target attributes are truly essential versus nice-to-have?', 'Will site access, hospital rules, or intermediary approvals affect recruitment routes?', 'What early signals would trigger a revised scope or timeline?'], related: ['incentives-scheduling-realities', 'oncology-dynamics-japan', 'patient-recruitment-strategies'] },
  { slug: 'patient-centric-qualitative-research', title: 'Patient-centric qualitative research in Japan', topic: 'Patient research', summary: 'How to design respectful, burden-aware qualitative studies for sensitive journeys.', tags: ['Consent', 'Patient journey', 'Qualitative'], image: 'assets/img/patient_care.png', pdf: 'assets/docs/patient-centered-research-japan.pdf', intro: 'Participant-first design matters especially when lived experience, symptom burden, or family involvement shape the interview environment.', keyPoints: ['Language, pacing, and burden should be tailored to the target condition and setting.', 'Recruitment and consent flows need to respect privacy expectations and emotional load.', 'Moderation should leave space for nuance rather than over-structuring the conversation.'], questions: ['What support, reimbursement, or scheduling flexibility will participants realistically need?', 'How will privacy and re-contact expectations be explained in plain language?', 'What adaptation is needed if caregivers or family members are involved?'], related: ['patient-recruitment-strategies', 'incentives-scheduling-realities', 'annual-health-checkup-system'] },
  { slug: 'reimbursement-pricing-japan', title: 'Drug reimbursement and pricing basics', topic: 'Healthcare system', summary: 'Structure, stakeholders, and what global teams need to align on early.', tags: ['Market access', 'Pricing', 'Policy'], image: 'assets/img/seed_discussion.png', pdf: 'assets/docs/reimbursement-pricing-japan.pdf', intro: 'A practical orientation to how reimbursement and pricing logic shapes stakeholder behavior and market planning in Japan.', keyPoints: ['Stakeholder expectations differ from market to market and should not be assumed to translate directly.', 'Pricing and reimbursement context can change the interview guide, target mix, and interpretation of answers.', 'Early alignment helps avoid asking the wrong strategic questions later.'], questions: ['Which stakeholder views are essential for the current decision?', 'What internal assumptions are being carried over from other markets?', 'How will reimbursement context affect the way findings are used?'], related: ['japan-vs-us-environment', 'japan-market-brief', 'incentives-scheduling-realities'] },
  { slug: 'annual-health-checkup-system', title: 'Annual health check-up system overview', topic: 'Healthcare system', summary: 'Why annual check-ups matter and how this system shapes healthcare behaviors and data.', tags: ['Check-ups', 'Preventive care', 'System'], image: 'assets/img/notetaking.png', pdf: 'assets/docs/annual-health-checkup-system-japan.pdf', intro: 'A useful primer for global teams that need context on routine screening culture and how it can influence pathways and perceptions.', keyPoints: ['Preventive check-up structures can influence patient awareness and physician discussion timing.', 'Research questions often need to reflect how routine screening actually fits into care flow.', 'System context prevents overgeneralizing from other markets.'], questions: ['How might routine check-up culture influence awareness, diagnosis, or treatment triggers?', 'Which assumptions from other markets need to be pressure-tested?', 'What secondary stakeholders may become more relevant because of the local system?'], related: ['japan-vs-us-environment', 'patient-centric-qualitative-research', 'incentives-scheduling-realities'] },
  { slug: 'oncology-dynamics-japan', title: 'Understanding oncology dynamics in Japan', topic: 'HCP research', summary: 'Practical signals around prescribing, stakeholders, and treatment environment.', tags: ['Oncology', 'Stakeholders', 'Treatment flow'], image: 'assets/img/seed_discussion.png', pdf: 'assets/docs/oncology-dynamics-japan.pdf', intro: 'An orientation to treatment context, hierarchy, and why oncology research often needs careful stakeholder framing in Japan.', keyPoints: ['Institutional context can shape who influences decisions and how openly trade-offs are discussed.', 'Therapy-area nuance matters for both recruitment and interpretation.', 'Interview design should reflect real treatment flow and role boundaries.'], questions: ['Which oncology stakeholders truly shape the decision we want to understand?', 'How do site type and institutional norms affect openness or access?', 'What language will feel clinically credible and locally grounded?'], related: ['prescribing-behaviors-psychology', 'recruitment-feasibility-japan', 'japan-market-brief'] },
  { slug: 'prescribing-behaviors-psychology', title: 'Prescribing behaviors & psychology', topic: 'HCP research', summary: 'How physician mindsets, hierarchy, and context influence treatment decisions.', tags: ['Psychology', 'Prescribing', 'Clinical nuance'], image: 'assets/img/seed_consultation.png', pdf: 'assets/docs/physician-prescribing-behavior-japan.pdf', intro: 'A lens on why clinical decision-making patterns can look familiar on the surface but differ in meaning once local context is understood.', keyPoints: ['Behavioral drivers are often shaped by hierarchy, consensus culture, and institutional practice.', 'Research design should separate what physicians say from what the environment makes feasible.', 'Interpretation quality depends on understanding context, not only transcript content.'], questions: ['What hidden assumptions do we have about independence in decision-making?', 'How will institutional norms affect the answers we hear?', 'What examples or probes can reveal the gap between stated and actual behavior?'], related: ['oncology-dynamics-japan', 'japan-vs-us-environment', 'recruitment-feasibility-japan'] },
  { slug: 'patient-recruitment-strategies', title: 'Optimizing patient recruitment in the Japanese market', topic: 'Patient research', summary: 'A paradigm shift from severity labels to pharmacotherapy-based screening.', tags: ['Recruitment', 'Screening', 'Rare disease'], image: 'assets/img/patient_care.png', pdf: 'assets/docs/patient-recruitment-japanese-market.pdf', intro: 'Practical recruitment thinking for teams that need the right people, not just a nominal sample count.', keyPoints: ['Screening logic should match treatment reality rather than rely on imported labels alone.', 'Rare or sensitive populations need careful communication and expectation-setting.', 'Operational feasibility is strongest when study burden and value exchange are clearly balanced.'], questions: ['What screening logic will identify the right experience most credibly?', 'How much burden is realistic for the requested participant profile?', 'What backup routes exist if initial recruitment assumptions do not hold?'], related: ['patient-centric-qualitative-research', 'recruitment-feasibility-japan', 'incentives-scheduling-realities'] },
  { slug: 'japan-market-brief', title: 'Japan market brief', topic: 'Compliance', summary: 'Structural, cultural, and operational complexities global teams should anticipate.', tags: ['Market brief', 'Operations', 'Japan'], image: 'assets/img/seed_consultation.png', pdf: 'assets/docs/market-brief-japan-pharma.pdf', intro: 'A high-level briefing for teams that need quick orientation before shaping scope, timelines, or stakeholder expectations.', keyPoints: ['Not every global process assumption will land cleanly in Japan.', 'Operational nuance matters as much as terminology or translation.', 'Early local interpretation can reduce rework and prevent avoidable friction.'], questions: ['Which parts of our current plan assume a market structure that may not exist locally?', 'Where do we most need local interpretation before committing budget or timelines?', 'What internal stakeholders need a clearer Japan-specific frame?'], related: ['japan-vs-us-environment', 'reimbursement-pricing-japan', 'recruitment-feasibility-japan'] },
  { slug: 'japan-vs-us-environment', title: 'Japan vs US pharmaceutical environment', topic: 'Healthcare system', summary: 'Key differences in prescribing, reimbursement, and market access expectations.', tags: ['Comparison', 'US vs Japan', 'Market access'], image: 'assets/img/scheduling.png', pdf: 'assets/docs/japan-vs-us-pharma-environment.pdf', intro: 'A comparison-oriented primer that helps global teams challenge unconscious default assumptions from the US market.', keyPoints: ['Structural differences change both the questions worth asking and the meaning of the answers.', 'Market access logic, prescribing flow, and system incentives are not interchangeable.', 'Comparison is most useful when it sharpens local planning, not when it forces equivalence.'], questions: ['Which US assumptions are we treating as universal?', 'Where might the local environment change the commercial or clinical interpretation of findings?', 'How should our interview guide adapt if we are using the US as the default reference point?'], related: ['reimbursement-pricing-japan', 'annual-health-checkup-system', 'japan-market-brief'] }
];

export const reportSummaries = [
  { slug: 'incentives-scheduling-realities', title: 'Report summary #001', subtitle: 'Incentives & scheduling realities', description: 'A practical checklist for ethical honoraria, scheduling buffers, and the hidden coordination steps global teams often miss.', image: 'assets/img/scheduling.png' },
  { slug: 'recruitment-feasibility-japan', title: 'Report summary #002', subtitle: 'Recruitment feasibility in Japan', description: 'A grounded perspective on access, target realism, and how to structure early feasibility conversations before fieldwork starts.', image: 'assets/img/seed_consultation.png' },
  { slug: 'patient-centric-qualitative-research', title: 'Report summary #003', subtitle: 'Patient-centric qualitative research', description: 'Design principles for respectful, burden-aware qualitative work when patient experience and sensitivity are central to the study.', image: 'assets/img/patient_care.png' },
  { slug: 'japan-market-brief', title: 'Report summary #004', subtitle: 'Japan market brief', description: 'A concise orientation to the structural, cultural, and operational dynamics that shape healthcare research execution in Japan.', image: 'assets/img/seed_discussion.png' }
];

export const teamMembers = [
  { name: 'Yoshi Honda', role: 'Senior Director, Research & Operations', image: 'assets/img/team-yoshi.jpg', bio: 'Bridges international client needs and local execution across recruitment, fieldwork, and final delivery.', tags: ['Operations', 'Client lead', 'Execution'] },
  { name: 'Team Member', role: 'Senior PM', image: 'assets/img/team-senior-pm-1.jpg', bio: 'Supports study flow, coordination, and quality checkpoints from kickoff to close-out.', tags: ['Project management', 'Timeline control', 'Quality'] },
  { name: 'Team Member', role: 'Senior PM', image: 'assets/img/team-senior-pm-2.jpg', bio: 'Helps translate client objectives into practical research operations and stakeholder-ready output.', tags: ['Client service', 'Fieldwork', 'Reporting'] },
  { name: 'Research Team', role: 'Cross-functional support', image: 'assets/img/goteam.png', bio: 'Research, operations, and coordination functions working together across healthcare and life-science projects.', tags: ['Bilingual support', 'Coordination', 'Research'] }
];

export const moderators = [
  { name: 'Moderator A', language: 'JP / EN', strengths: 'Clinical nuance, patient sensitivity', therapy: 'Oncology, Rare disease' },
  { name: 'Moderator B', language: 'JP', strengths: 'HCP depth interviews', therapy: 'Cardio, Metabolic' },
  { name: 'Moderator C', language: 'JP / EN', strengths: 'Ad boards, complex stakeholders', therapy: 'Neuro, Immunology' }
];
