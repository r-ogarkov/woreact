import { methods } from './methods';
import config from '../../../config/config';
import qs from 'query-string';
const { server: { api } } = config;

export type Methods = keyof typeof methods;

export const request = async (key: Methods, query?: Record<string, any>): Promise<any> => {
  const { url = '', method } = methods[key];
  const response = await fetch(qs.stringifyUrl({ url: `${api}${url}`, query }), { method });
  return await response.json();
}
