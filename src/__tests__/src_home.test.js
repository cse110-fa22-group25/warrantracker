/**
 * @jest-environment jsdom
 */

import { Profile, create_card } from '../scripts/home';

let test_profile = new Profile(0, "title1", "tag2", "expDate3", "serialNum", "note");

/**
 * Tests profile object constructor to see if an object with
 * correct fields is actually created
 */
describe('Test Profile constructor', () => {
  test('fields', () => {
    expect(test_profile.title).toBe("title1");
    expect(test_profile.note).toBe("note");
    expect(test_profile.exp_date).toBe("expDate3");
    expect(test_profile.serial_num).toBe("serialNum");
    expect(test_profile.note).toBe("note");
  });

  test('create with null', () => {
    expect(new Profile(0, "title1", null, "someDate", "1234abcd", "this is a note")).toEqual({
      id: 0,
      title: "title1",
      tag: null,
      exp_date: "someDate",
      serial_num: "1234abcd",
      note: "this is a note"
    });
  });
})
// TODO: my lab hrs about to start, add more unit tests

describe('Test createCard()', () => {
  const new_card = create_card(test_profile);
  test('elements', () => {
    expect(new_card.querySelector('.card')).not.toBeNull();
    expect(new_card.querySelector('.card-body')).not.toBeNull();
    expect(new_card.querySelector('.card-title')).not.toBeNull();
    expect(new_card.querySelector('.card-text')).not.toBeNull();
  });

  test('attributes', () => {
    expect(new_card.getAttribute('class')).toBe("col-sm-6 col-lg-4 p-2");

    const card = new_card.querySelector('div');
    const card_attr = card.getAttributeNames();
    const ref = ['type', 'data-bs-toggle', 'data-bs-target', 'class'];
    card_attr.forEach((attr, idx) => {
      expect(attr).toBe(ref[idx]);
    });
  });

  test('innerHTML', () => {
    const new_card = create_card(test_profile);
    expect(new_card.querySelector(".card-title").innerHTML).toBe(test_profile.title);
    expect(new_card.querySelector(".card-text").innerHTML).toBe(test_profile.note);
  });
});
