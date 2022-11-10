/**
 * @jest-environment jsdom
 */

const { Profile, createCard } = require('../scripts/home');

let testProfile = new Profile("title1", "tag2", "expDate3", "serialNum", "note");

/**
 * Tests profile object constructor to see if an object with
 * correct fields is actually created
 */
describe('Test Profile constructor', () => {
  test('fields', () => {
    expect(testProfile.title).toBe("title1");
    expect(testProfile.note).toBe("note");
    expect(testProfile.expDate).toBe("expDate3");
    expect(testProfile.serialNum).toBe("serialNum");
    expect(testProfile.note).toBe("note");
  });

  test('create with null', () => {
    expect(new Profile("title1", null, "someDate", "1234abcd", "this is a note")).toEqual({
      title: "title1",
      tag: null,
      expDate: "someDate",
      serialNum: "1234abcd",
      note: "this is a note"
    });
  });
})
// TODO: my lab hrs about to start, add more unit tests

describe('Test createCard()', () => {
  const newCard = createCard(testProfile);
  test('elements', () => {
    expect(newCard.querySelector('.card')).not.toBeNull();
    expect(newCard.querySelector('.card-body')).not.toBeNull();
    expect(newCard.querySelector('.card-title')).not.toBeNull();
    expect(newCard.querySelector('.card-text')).not.toBeNull();
  });

  test('attributes', () => {
    expect(newCard.getAttribute('class')).toBe("col-sm-6 col-lg-4 p-2");

    const card = newCard.querySelector('div');
    const cardAttr = card.getAttributeNames();
    const ref = ['type', 'data-bs-toggle', 'data-bs-target', 'class'];
    cardAttr.forEach((attr, idx) => {
      expect(attr).toBe(ref[idx]);
    });
  });

  test('innerHTML', () => {
    const newCard = createCard(testProfile);
    expect(newCard.querySelector(".card-title").innerHTML).toBe(testProfile.title);
    expect(newCard.querySelector(".card-text").innerHTML).toBe(testProfile.note);
  });
});
