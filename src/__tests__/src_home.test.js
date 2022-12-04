/**
 * @jest-environment jsdom
 */

import { Profile, create_card, search, parse_profile_tags, rm_dupe_tags } from '../scripts/home';

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

describe('Test createCard()', () => {
  const new_card = create_card(test_profile);
  test('elements', () => {
    expect(new_card.querySelector('.card')).not.toBeNull();
    expect(new_card.querySelector('.card-body')).not.toBeNull();
    expect(new_card.querySelector('.card-title')).not.toBeNull();
    expect(new_card.querySelector('.card-text')).not.toBeNull();
  });

  test('attributes', () => {
    expect(new_card.getAttribute('class')).toBe("col-sm-6 col-lg-4 col-xl-3 p-2");

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

describe('Test parsing tags and removing duplicate tags', () => {

  //create a new profile with multiple tags with extra whitespace
  let test_profile_2 = new Profile(1, "title2", "tag2      ,  tag3", "expDate45", "serialNum", "note2");

  //create a new profile with duplicate tags 
  let test_profile_3 = new Profile(2, "title3", "tag2,     tag3,     tag2", "expDate55", "serialNum4", "note3");

  test('testing parse_profile_tags()', () => {

    //parsing tags for both test profiles
    const profile_2_parsed_tags = parse_profile_tags(test_profile_2);
    const profile_1_parsed_tags = parse_profile_tags(test_profile);

    //checking to make sure profiles were parse correctly
    expect(profile_2_parsed_tags).toStrictEqual([ 'tag2', 'tag3' ]);
    expect(profile_1_parsed_tags).toStrictEqual(['tag2']);
  });

  test('testing rm_dupe_tags()', () => {

    //removing potential duplicate from test profiles 2 and 3
    const profile_2_tag_list = rm_dupe_tags(test_profile_2.tag);
    const profile_3_tag_list = rm_dupe_tags(test_profile_3.tag);

    
    //checking to make sure duplicates were removed from profiles 2 and 3
    expect(profile_3_tag_list).toStrictEqual("tag2,tag3");
    expect(profile_2_tag_list).toStrictEqual("tag2,tag3");
  });

});
