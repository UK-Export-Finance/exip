import { Currency } from '../types';

export const EUR = {
  name: 'Euros',
  isoCode: 'EUR',
};

export const HKD = {
  name: 'Hong Kong Dollars',
  isoCode: 'HKD',
};

export const JPY = {
  name: 'Japanese Yen',
  isoCode: 'JPY',
};

export const GBP = {
  name: 'UK Sterling',
  isoCode: 'GBP',
};

export const USD = {
  name: 'US Dollars',
  isoCode: 'USD',
};

const mockCurrencies = [EUR, HKD, JPY, GBP, USD] as Array<Currency>;

export default mockCurrencies;
