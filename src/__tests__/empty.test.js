// /**
//  * add function for testing jest and jsdoc
//  * @param {Number} a
//  * @param {Number} b
//  * @returns a + b
//  */
// function add (a, b) {
//   return a + b
// }

/**
   * Doesn't really do much right now but it's just a test unit test
   */
describe('Test incrementing', () => {
  test('1 + 1 == 2', () => {
    expect(1 + 1).toBe(2)
  })
  test('2 + 2 == 4', () => {
    expect(2 + 2).toBe(4)
    expect(2 + 3).toBe(5)
  })
})
