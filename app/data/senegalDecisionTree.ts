export interface SurveyNode {
  question: string;
  helperText?: string;
  options: string[];
  next: (answer: string, answers: Record<string, string>) => string | null;
  domain: string;
}

export const senegalDecisionTree: Record<string, SurveyNode> = {
  // ─── ENTRY CONTROLS ────────────────────────────────────
  Q1: {
    domain: 'Entry Controls',
    question:
      'Are inspections of imported food products conducted using a formal risk-based approach — for example, varying inspection intensity by product category, country of origin, or past compliance history?',
    helperText:
      'This may include targeting based on risk profiles, scanning systems, or inspection history. We understand Senegal uses the ORBUS/DPI system for pre-arrival declarations.',
    options: ['Yes, formally structured', 'Partially / varies by product', 'No, uniform inspection', 'Not sure'],
    next: (answer: string) =>
      answer === 'Yes, formally structured' || answer === 'Partially / varies by product' ? 'Q1a' : 'Q2',
  },

  Q1a: {
    domain: 'Entry Controls',
    question:
      'When a shipment fails inspection, does this trigger increased inspection frequency for future shipments of the same product, origin, or importer?',
    helperText:
      'This is sometimes called an "escalation mechanism" — a formal consequence that raises scrutiny after a failure.',
    options: ['Yes, formally', 'Informally / at inspector discretion', 'No'],
    next: () => 'Q2',
  },

  // ─── IMPORTER OBLIGATIONS ──────────────────────────────
  Q2: {
    domain: 'Importer Obligations',
    question:
      'Are commercial food importers required to be registered or licensed with a competent authority in Senegal before they can import?',
    options: ['Yes, for all food imports', 'Only for certain food categories', 'No registration required'],
    next: (answer: string) =>
      answer === 'Yes, for all food imports' || answer === 'Only for certain food categories' ? 'Q2a' : 'Q3',
  },

  Q2a: {
    domain: 'Importer Obligations',
    question:
      'As part of their obligations, are importers expected to verify or approve the food safety practices of their foreign suppliers before importing?',
    helperText:
      'For example, the U.S. requires a Foreign Supplier Verification Program (FSVP). Some countries require importers to maintain supplier audit records.',
    options: ['Yes, formally required', 'Encouraged but not mandatory', 'No such requirement'],
    next: () => 'Q3',
  },

  // ─── ANIMAL PRODUCTS ───────────────────────────────────
  Q3: {
    domain: 'Animal Products',
    question:
      'For foods of animal origin (meat, dairy, eggs, fish), is market access limited to approved exporting countries or approved foreign establishments?',
    options: ['Yes, both country and establishment must be approved', 'Country only', 'No formal listing system', 'Depends on product'],
    next: (answer: string) =>
      answer === 'Yes, both country and establishment must be approved' || answer === 'Depends on product' ? 'Q3a' : 'Q4',
  },

  Q3a: {
    domain: 'Animal Products',
    question:
      'Are foreign inspection systems ever recognized as equivalent — allowing simplified access for animal-origin foods from approved countries?',
    helperText:
      'Equivalence recognition means accepting that another country\'s inspection system provides the same level of protection, even if procedures differ.',
    options: ['Yes, formal equivalence agreements exist', 'Under discussion / in development', 'No'],
    next: () => 'Q4',
  },

  // ─── STANDARDS & RESIDUES ──────────────────────────────
  Q4: {
    domain: 'Standards & Limits',
    question:
      'Are numeric maximum residue limits (MRLs) for pesticides or contaminants actively enforced through laboratory sampling of imported foods?',
    helperText:
      'We understand laboratory capacity in Senegal is developing. This question asks whether MRL enforcement is routine, selective, or aspirational.',
    options: ['Yes, routinely sampled and tested', 'Yes, but selectively / limited by lab capacity', 'MRLs exist but enforcement is rare', 'No formal MRL enforcement'],
    next: (answer: string) =>
      answer === 'Yes, routinely sampled and tested' || answer === 'Yes, but selectively / limited by lab capacity' ? 'Q4a' : 'Q5',
  },

  Q4a: {
    domain: 'Standards & Limits',
    question:
      'When no specific MRL exists for a substance in Senegal\'s regulations, is there a default limit applied (for example, a uniform default like 0.01 ppm)?',
    options: ['Yes, a default limit applies', 'Codex MRLs are used as reference', 'No default — only substances with explicit MRLs are enforced', 'Not sure'],
    next: () => 'Q5',
  },

  // ─── PLANT HEALTH ──────────────────────────────────────
  Q5: {
    domain: 'Plant Health',
    question:
      'For plant and plant product imports, is a phytosanitary certificate from the exporting country\'s plant protection organization always required?',
    options: ['Yes, for all plant products', 'Only for specific commodities', 'No'],
    next: (answer: string) =>
      answer === 'Yes, for all plant products' || answer === 'Only for specific commodities' ? 'Q5a' : 'Q6',
  },

  Q5a: {
    domain: 'Plant Health',
    question:
      'Is a formal pest risk analysis required before a new plant commodity or origin can gain market access to Senegal?',
    helperText:
      'Some countries require multi-year scientific assessments before permitting new plant imports. Others rely on regional standards (e.g., WAEMU/ECOWAS harmonization).',
    options: ['Yes, national PRA required', 'Regional (WAEMU/ECOWAS) standard applies', 'No formal PRA process', 'Not sure'],
    next: () => 'Q6',
  },

  // ─── DIGITIZATION & CERTIFICATES ───────────────────────
  Q6: {
    domain: 'Digitization',
    question:
      'Beyond the ORBUS/DPI system for customs declarations, are electronic official certificates (veterinary, phytosanitary) accepted as legally valid for food import clearance?',
    helperText:
      'We know Senegal uses ORBUS for trade documentation. This question focuses on whether paper certificates can be fully replaced by electronic ones.',
    options: ['Yes, electronic certificates fully accepted', 'Accepted alongside paper originals', 'Paper originals still required', 'Not sure'],
    next: () => 'Q7',
  },

  // ─── COORDINATION & CLEARANCE ──────────────────────────
  Q7: {
    domain: 'Coordination',
    question:
      'Is customs release of food shipments formally contingent on clearance by the food safety or SPS authority — or can customs release goods independently?',
    helperText:
      'In some countries, customs and SPS authorities operate independently. In others, goods cannot be released until the SPS authority signs off.',
    options: ['Yes, SPS clearance required before customs release', 'No, customs can release independently', 'Depends on port or product category'],
    next: () => 'Q8',
  },

  // ─── PROHIBITIONS & SPECIAL REQUIREMENTS ───────────────
  Q8: {
    domain: 'Prohibitions',
    question:
      'Are there specific food categories or substances that are absolutely prohibited from import into Senegal — beyond standard safety requirements?',
    helperText:
      'For example: specific animal products, GMO foods, products containing certain additives, or items restricted for religious/cultural reasons.',
    options: ['Yes', 'No', 'Not sure'],
    next: (answer: string) => answer === 'Yes' ? 'Q8a' : 'Q9',
  },

  Q8a: {
    domain: 'Prohibitions',
    question:
      'Do any of these prohibitions relate to religious or cultural requirements (such as halal certification) that function as enforceable import conditions?',
    options: ['Yes, halal or similar requirements enforced', 'Cultural preferences exist but not formally enforced', 'No'],
    next: () => 'Q9',
  },

  // ─── TRANSPARENCY & COOPERATION ────────────────────────
  Q9: {
    domain: 'Transparency',
    question:
      'Is there a publicly accessible database or reference where importers can look up current SPS import requirements by product and origin for Senegal?',
    helperText:
      'Examples from other countries include Australia\'s BICON, Canada\'s AIRS, or the EU\'s TRACES system.',
    options: ['Yes, publicly available online', 'Available but not easily accessible', 'No centralized public reference', 'Not sure'],
    next: () => 'Q10',
  },

  // ─── OPEN-ENDED FINAL QUESTION ─────────────────────────
  Q10: {
    domain: 'Cooperation',
    question:
      'From your perspective, what SPS requirement or process most affects the speed or predictability of food imports into Senegal today? What practical change would most benefit traders while preserving safety?',
    helperText:
      'This is an open question — your perspective helps identify where cooperation can have the greatest practical impact.',
    options: ['Submit response'],
    next: () => null,
  },
};

export const domainColors: Record<string, string> = {
  'Entry Controls': '#1E88E5',
  'Importer Obligations': '#00897B',
  'Animal Products': '#5C6BC0',
  'Standards & Limits': '#F9A825',
  'Plant Health': '#2E7D32',
  'Digitization': '#0D1B2A',
  'Coordination': '#78909C',
  'Prohibitions': '#C62828',
  'Transparency': '#1565C0',
  'Cooperation': '#00695C',
};
