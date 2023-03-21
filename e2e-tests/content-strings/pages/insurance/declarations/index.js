const SHARED = {
  HEADING_CAPTION: 'Declarations',
};

const CONFIDENTIALITY = {
  ...SHARED,
  PAGE_TITLE: 'Confidentiality',
  INTRO: "By submitting this application (also known as a 'proposal') you agree that:",
  LIST: [
    {
      text: '(unless otherwise agreed) this Proposal, its attachments and all discussions and correspondence relating to it are confidential and will not be disclosed to any third party except:',
      children: [
        {
          text: 'by you, on a confidential basis to your bank, broker, lawyers, other professional advisers, or auditors, in each case for the purpose for which each of them has been engaged by you;',
        },
        {
          text: 'by us in accordance with applicable law (including the provisions of the Export and Investment Guarantees Act 1991) or our obligations to Parliament as a Government Department;',
        },
        {
          text: 'by us if we decide that we are required to disclose it in accordance under the Freedom of Information Act2000 or the Environmental Information Regulations 2004; or',
        },
        {
          text: 'by us:',
          children: [
            {
              text: 'to our lawyers and other professional advisers, auditors, other Government Departments and reinsurers (including other export credit agencies) on a confidential basis in connection with our consideration of this application or the issue or reinsurance of any policy; and',
            },
            {
              text: 'to third party service providers (such as IT contractors) in order to enable them to provide services to us and on the basis that the information must be held securely and in confidence;',
            },
          ],
        },
      ],
    },
    {
      text: '(unless otherwise agreed) information we hold about you (but not including details of any contract that we enter into with you or for your benefit or information about any of your export contracts, other than the export market involved) may be shared on a confidential basis between any Government Departments and/or other public sector bodies that are involved in supporting trade and investment to assist them in discharging their functions; and',
    },
    {
      text: 'if we ask you to agree to our disclosing information to anyone not mentioned in paragraph (1)(b) to (d) above, you will not unreasonably delay or withhold your agreement to this.',
    },
  ],
};

const ANTI_BRIBERY = {
  ...SHARED,
  PAGE_TITLE: 'Anti-bribery and corruption',
};

export default {
  CONFIDENTIALITY,
  ANTI_BRIBERY,
};
