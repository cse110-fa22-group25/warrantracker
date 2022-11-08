/**
 * @jest-environment jsdom
 */

const { Profile } = require('../scripts/home');

let tmp = new Profile("title1", "tag2", "expDate3", "serialNum", "note");

/**
 * Tests profile object constructor to see if an object with
 * correct fields is actually created
 */
describe('Test Profile creater', () => {
  test('fields', () => {
    expect(tmp.title).toBe("title1");
    expect(tmp.note).toBe("note")
  })
})
// TODO: my lab hrs about to start, add more unit tests
