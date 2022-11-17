import { Application, ApplicationFlat } from '../../types';

const flattenApplicationData = (application: Application): ApplicationFlat => ({
  ...application,
  ...application.eligibility,
  buyerCountry: application.eligibility.buyerCountry.isoCode,
});

export default flattenApplicationData;
