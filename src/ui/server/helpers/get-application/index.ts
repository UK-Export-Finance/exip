import api from '../../api';

const getApplication = async (referenceNumber: number) => {
  try {
    const application = await api.keystone.application.get(referenceNumber);

    // check that the application exists and has core structure.
    if (!application || !application.policyAndExport || !application.policyAndExport.id) {
      return false;
    }

    return application;
  } catch (err) {
    console.error('Error getting application ', { err });

    return err;
  }
};

export default getApplication;
