import { PAGES } from '../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import mapCountries from '../../../helpers/mappings/map-countries';
import yourBuyerDetailsValidation from './validation';
import { Request, Response } from '../../../../types';

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = FIELD_IDS.INSURANCE;

const { NAME, ADDRESS, COUNTRY } = COMPANY_OR_ORGANISATION;

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
  },
};

export const TEMPLATE = TEMPLATES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;

export const get = async (req: Request, res: Response) => {
  const countries = await api.keystone.countries.getAll();

  if (!countries || !countries.length) {
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
};

export const post = async (req: Request, res: Response) => {
  const validationErrors = yourBuyerDetailsValidation(req.body);

  if (validationErrors) {
    const countries = await api.keystone.countries.getAll();

    if (!countries || !countries.length) {
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
};
