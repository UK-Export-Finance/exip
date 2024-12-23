import mapEsraClassification from './map-esra-classification';
import hasNoSupport from './has-no-support';
import hasNoOnlineSupport from './has-no-online-support';
import canGetAQuoteOnline from './can-get-a-quote-online';
import canApplyForInsuranceOnline from './can-apply-for-insurance-online';
import { CisCountry, MappedCisCountry } from '../../../types';

/**
 * mapCisCountry
 * Map a CIS country to cleaner structure
 * @param {CisCountry} CIS Country
 * @returns {MappedCisCountry} Mapped country
 */
export const mapCisCountry = (cisCountry: CisCountry): MappedCisCountry => {
  const { countryRatingDesc: countryRating, ESRAClassificationDesc, isoCode, marketName, shortTermCoverAvailabilityDesc: shortTermCover } = cisCountry;

  const esraClassification = mapEsraClassification(cisCountry.ESRAClassificationDesc);

  /**
   * Current business logic for "no support" (online or offline)
   * Is exactly the same for "get a quote" and "insurance application".
   * Therefore we can use hasNoSupport for both.
   */
  const noSupport = hasNoSupport({
    countryRating,
    esraClassification: ESRAClassificationDesc,
    shortTermCover,
  });

  const mapped: MappedCisCountry = {
    countryRating,
    esraClassification,
    isoCode,
    name: marketName,

    noOnlineSupport: hasNoOnlineSupport({
      countryRating,
      esraClassification: ESRAClassificationDesc,
      shortTermCover,
    }),

    canGetAQuoteOnline: canGetAQuoteOnline(cisCountry),

    cannotGetAQuote: noSupport,

    canApplyForInsuranceOnline: canApplyForInsuranceOnline(cisCountry),

    noInsuranceSupport: noSupport,
  };

  return mapped;
};

export default mapCisCountry;
