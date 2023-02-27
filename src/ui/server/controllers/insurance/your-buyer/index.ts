import { PAGES } from '../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import isPopulatedArray from '../../../helpers/is-populated-array';
import mapCountries from '../../../helpers/mappings/map-countries';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../types';

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = FIELD_IDS.INSURANCE;

const { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER } = COMPANY_OR_ORGANISATION;

export const PAGE_VARIABLES = {
  FIELDS: {
    NAME: {
      ID: NAME,
      ...FIELDS.COMPANY_OR_ORGANISATION[NAME],
    },
    ADDRESS: {
      ID: ADDRESS,
      ...FIELDS.COMPANY_OR_ORGANISATION[ADDRESS],
    },
    COUNTRY: {
      ID: COUNTRY,
      ...FIELDS.COMPANY_OR_ORGANISATION[COUNTRY],
    },
    REGISTRATION_NUMBER: {
      ID: REGISTRATION_NUMBER,
      ...FIELDS.COMPANY_OR_ORGANISATION[REGISTRATION_NUMBER],
    },
  },
};

export const TEMPLATE = TEMPLATES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;

export const get = async (req: Request, res: Response) => {
  try {
    const countries = await api.keystone.countries.getAll();

    if (!isPopulatedArray(countries)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const mappedCountries = mapCountries(countries);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
        BACK_LINK: req.headers.referer,
      }),
      ...PAGE_VARIABLES,
      countries: mappedCountries,
    });
  } catch (err) {
    console.error('Error getting insurance - your buyer - buyers company or organisation ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const validationErrors = generateValidationErrors(req.body);

    if (validationErrors) {
      const countries = await api.keystone.countries.getAll();

      if (!isPopulatedArray(countries)) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }

      const mappedCountries = mapCountries(countries);

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        submittedValues: req.body,
        countries: mappedCountries,
        validationErrors,
      });
    }

    return res.redirect('/needs_to_redirect_at_do_you_need_broker');
  } catch (err) {
    console.error('Error posting insurance - your buyer - buyers company or organisation ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
