interface CompanyResponse {
  id: string | null;
  applicationId: string | null;
}

interface ConnectId {
  id: string;
}

interface ConnectObj {
  connect: ConnectId;
}

interface SicCodes {
  code: string;
  exporterCompany: ConnectObj;
  application: ConnectObj;
}

/**
 * maps sic codes from response and adds to an array to add to the database
 * @param {CompanyResponse} company
 * @param {Array} sicCodes
 * @returns {Array} sicCodesToAdd
 */
const mapSicCodes = (company: CompanyResponse, sicCodes?: Array<string>) => {
  const sicCodesToAdd = [] as Array<SicCodes>;

  if (!sicCodes || !sicCodes.length) {
    return sicCodesToAdd;
  }

  sicCodes.forEach((code) => {
    const codeToAdd = {
      code,
      exporterCompany: {
        connect: {
          id: company.id,
        },
      },
      application: {
        connect: {
          id: company.applicationId,
        },
      },
    } as SicCodes;

    sicCodesToAdd.push(codeToAdd);
  });

  return sicCodesToAdd;
};

export { mapSicCodes, CompanyResponse, SicCodes };
