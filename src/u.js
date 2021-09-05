const U = {
  $: (query, context = document) => context.querySelectorAll(query),
  curry: (f) =>
    U.isNot(U.type(f), U.types.function)
      ? f
      : (...args) => f.bind(null, ...args),
  is: Object.is,
  isNot: (v1, v2) => !U.is(v1, v2),
  not:
    (f) =>
    (...args) =>
      !f(...args),
  type: (v) => typeof v,
  stringToObject: (value) => {
    const isArray = Boolean(~value.indexOf('['));
    const isString = !isArray && Boolean(~value.indexOf("'"));
    return isString
      ? value.replace(/'/g, '')
      : JSON.parse(isArray ? value.replace(/'/g, '"') : value);
  },
  and: (bool1, bool2) => bool1 && bool2,
  deepCompare: (o1, o2) => {
    const o1Keys = Object.keys(o1);
    const o2Keys = Object.keys(o2);
    if (U.isNot(o1Keys.length, o2Keys.length)) return false;
    let result = true;
    for (const key of o1Keys) {
      const val1 = o1[key];
      const val2 = o2[key];
      result =
        result &&
        U.and(
          U.is(U.type(val1), U.types.object),
          U.is(U.type(val2), U.types.object)
        )
          ? U.deepCompare(val1, val2)
          : U.is(val1, val2);
      if (U.is(result, false)) return result;
    }
    return result;
  },
  types: {
    object: 'object',
    string: 'string',
    function: 'function',
    boolean: 'boolean',
    number: 'number'
  },
};

export default U;