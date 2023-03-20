const SHARED = {
  HEADING_CAPTION: 'Declarations',
};

const CONFIDENTIALITY = {
  ...SHARED,
  PAGE_TITLE: 'Confidentiality',
};

const ANTI_BRIBERY = {
  ...SHARED,
  PAGE_TITLE: 'Anti-bribery and corruption',
  EXPANDABLE: {
    INTRO: 'Definition of terms in this declaration',
    TABLE: {
      HEADERS: {
        TERM: 'Term',
        DEFINITION: 'Definition',
      },
      BODY: [
        {
          TERM: 'Consortium Party or Agent',
          DEFINITION: ['Is a consortium party or Agent named in section 8 of this Application.'],
        },
        {
          TERM: 'Controlled',
          DEFINITION: [
            'Means in relation to a body corporate (Company “A”), the power of a person (“P”) to secure (a) by means of the holding of shares or the possession of voting power in relation to that or any other body corporate;',
            "or (b) as a result of any powers conferred by the articles of association or other document or arrangement regulating that or any other body corporate, that the affairs of Company A are conducted in accordance with P's wishes;",
          ],
        },
        {
          TERM: 'Corrupt Activity',
          DEFINITION: [
            'Means any activity with reference to a person (including without limitation the offering of any payment, reward or other advantage to any public official or other person), which is (a) found by a court in a competent jurisdiction (after all available rights of appeal have been exhausted) to have rendered the export contract illegal, void, voidable or unenforceable under its governing law;',
            'or (b) other than under duress, has been admitted by that person (which shall include, for the avoidance of doubt, admissions of activity made under a deferred prosecution agreement in England, civil forfeiture order or similar administrative settlement in another jurisdiction);',
            'or (c) is found by a court or competent authority in any competent jurisdiction (after all available rights of appeal have been exhausted) outside the United Kingdom to constitute an offence under any applicable law (except by virtue of changes to that law having retrospective effect);',
            'or (d) is found by a court or competent authority in the United Kingdom (after all available rights of appeal have been exhausted) to constitute a Relevant Offence and which activity in respect of paragraphs (a), (b) and (c) above corresponds to a Relevant Offence provided that, where for the purposes of paragraph (b) above, any such activity is admitted by an Excluded Person, such activity shall not, for the purposes of this policy, constitute “Corrupt Activity” if such activity was not, at the time it was engaged in, unlawful under the laws or regulations of the country in which it took place;',
          ],
        },
        {
          TERM: 'Directors',
          DEFINITION: ["Means in relation to a company all the members of that company's board of directors (including non-executive directors);"],
        },
        {
          TERM: 'Excluded Person',
          DEFINITION: [
            'Means (a) where such activity is engaged in prior to 1 July 2011, (i) a person other than a national of the United Kingdom (as defined in s.109(4) of the Anti-terrorism, Crime and Security Act 2001); or (ii) a body incorporated under the laws of a country other than the United Kingdom;',
            'and where such activity is engaged in on or after that date, a person or body of a type not listed in s.12(4) of the Bribery Act 2010;',
          ],
        },
        {
          TERM: 'Group Company',
          DEFINITION: [
            'Means a company (in any jurisdiction) which is Controlled by the Applicant or which controls the Applicant or which is Controlled by a company which controls the Applicant.',
          ],
        },
        {
          TERM: 'Involved Group Company',
          DEFINITION: [
            'Means a Group Company which (a) having made the reasonable enquiries referred to in paragraph 8(ii) of section 14 of this Proposal, has had, or is intended to have, at the date of this Proposal, any material part in the negotiation or obtaining of the export contract;',
            '(b) employs personnel providing head office, legal, compliance, audit and/ or similar functions.',
          ],
        },
        {
          TERM: 'Potential Corrupt Activity',
          DEFINITION: [
            'Means activity which could, subject to the occurrence of subsequent events referred to in (a), (c) and (d) of the definition of “Corrupt Activity” in this section 14, amount to Corrupt Activity;',
          ],
        },
        {
          TERM: 'Relevant Offence',
          DEFINITION: [
            'Means, in relation to acts committed or events occurring before 1st July 2011, an offence under the Prevention of Corruption Acts 1889 to 1916 as amended by Part 12 of the Anti-terrorism Crime and Security Act 2001 and/ or an offence of conspiracy to corrupt under the Criminal Law Act 1977 or under common law, or, in relation to acts committed or events occurring on or after 1st July 2011, an offence under sections 1, 2, 6, or 7 of the Bribery Act 2010 (as from time to time amended or re-enacted).',
          ],
        },
        {
          TERM: 'Senior Officer',
          DEFINITION: [
            'Means in relation to: (a) a body corporate, a Director or senior executive of the body corporate;',
            '(b) a partnership, a partner in the partnership;',
            'and (c) a limited liability partnership (LLP) all members or, if applicable, all those members appointed or entitled to manage the LLP',
          ],
        },
      ],
    },
  },
};

export default {
  CONFIDENTIALITY,
  ANTI_BRIBERY,
};
