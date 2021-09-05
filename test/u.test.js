import U from '../src/u';

describe('Utility Test Suite', () => {
  it('should be defined', () => {
    expect(U).toBeDefined();
  });

  it('should return the type of variable', () => {
    const bool = true;
    const obj = {};
    const func = () => null;
    const str = 'str';
    expect(U.type(bool)).toBe(U.types.boolean);
    expect(U.type(obj)).toBe(U.types.object);
    expect(U.type(func)).toBe(U.types.function);
    expect(U.type(str)).toBe(U.types.string);
  })

  it('should curry functions', () => {
    const add = (a, b) => a + b;
    const curriedAdd = U.curry(add);
    const increment = curriedAdd(1);
    expect(U.type(increment)).toBe(U.types.function);
    expect(increment(2)).toBe(3);
  });

  it('should find if it is equal', () => {
    const value = 3;
    const expected = 3;
    expect(U.is(value, expected)).toBe(true);
  });

  it('should find if it is not equal', () => {
    const value = 3;
    const expected = 3;
    expect(U.isNot(value, expected)).toBe(false);
  });

  it('should invert a function', () => {
    const isTrue = v => v === true;
    const isFalse = U.not(isTrue);
    const isLess = (x, y) => x < y;
    expect(isFalse(isLess(3, 2))).toBe(true);
  });

  it('should convert a string to object', () => {
    const message = "'Do not enter!'";
    const array = "['@@Array', 84352]";
    const number = '84301';
    expect(U.stringToObject(message)).toBe('Do not enter!');
    expect(U.stringToObject(array)).toStrictEqual(['@@Array', 84352]);
    expect(U.stringToObject(number)).toBe(84301);
  });

  it('should and two values', () => {
    expect(U.and(true, false)).toBe(false);
    expect(U.and(true, true)).toBe(true);
  });

  it('should compare two objects with deep comparison', () => {
    const o1 = {
      id: 19275,
      info: {
        type: '@@NativeObject'
      }
    };
    const o2 = {
      id: 19275,
      info: {
        type: '@@NativeObject'
      }
    };
    const o3 = {
      id: 84012,
      info: {
        type: '@@NativeObject'
      }
    };
    expect(U.deepCompare(o1, o2)).toBe(true);
    expect(U.deepCompare(o1, o3)).toBe(false);
  })
});