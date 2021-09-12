export const $ = (query: string, context: Document | HTMLElement = document) =>
  context.querySelectorAll(query);
export const is = Object.is;
export const isNot = <T>(v1: T, v2: T) => !is(v1, v2);
export type GenericFunction<R = any> = (...args: any[]) => R;
export type BiFunction<A1, A2, R> = (arg1: A1, arg2: A2) => R;
export const not =
  <F extends Function>(f: F) =>
  (...args: any[]) =>
    !f(...args);
export const types = {
  object: 'object',
  string: 'string',
  function: 'function',
  boolean: 'boolean',
  number: 'number',
} as const;
export const type = <T>(v: T) => typeof v;
export const curry =
  <A1, A2, R, F extends BiFunction<A1, A2, R>>(f: F) =>
  (arg1: A1) =>
  (arg2: A2) =>
    f(arg1, arg2);
export const stringToObject = (value: string) => {
  const isArray = Boolean(~value.indexOf('['));
  const isString = !isArray && Boolean(~value.indexOf("'"));
  return isString
    ? value.replace(/'/g, '')
    : JSON.parse(isArray ? value.replace(/'/g, '"') : value);
};
export const and = (b1: boolean, b2: boolean) => b1 && b2;
export type Indexable<T = any> = { [key: string | symbol]: T };
export const deepCompare = <O extends Indexable>(o1: O, o2: O): boolean => {
  const o1Keys = Object.keys(o1);
  const o2Keys = Object.keys(o2);
  if (isNot(o1Keys.length, o2Keys.length)) return false;
  let result = true;
  for (const key of o1Keys) {
    const val1 = o1[key];
    const val2 = o2[key];
    result =
      result && and(is(type(val1), types.object), is(type(val2), types.object))
        ? deepCompare(val1, val2)
        : is(val1, val2);
    if (is(result, false)) return result;
  }
  return result;
};
export const pipe =
  (...fs: GenericFunction[]) =>
  (...args: any[]) =>
    fs.reduce(
      (F, f) => () => [f(...[].concat(F()))],
      () => args
    )()[0];
export const Once = <R = any, T = Object>() => {
  let isRun = false,
    result: R;
  return (_: T, __: string | symbol, descriptor: PropertyDescriptor) => {
    const f = descriptor.value;
    descriptor.value = (...args: any[]) => {
      if (!isRun) {
        result = f(...args);
        isRun = true;
      }
      return result;
    };
    return descriptor;
  };
};
export const onCond = (cond: boolean, f: GenericFunction) =>
  (cond && ((...args: any[]) => f(...args))) || (() => null);
import { customAlphabet } from 'nanoid';
const alphabet = '1234567890abcdefghijklmnopqrstuvwxyz';
export const getUUID = () => `state-${customAlphabet(alphabet, 18)()}`;
export const validate = (str: string) => /^state-[a-z0-9-]{18}$/.test(str);
