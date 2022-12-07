/**
 * @jest-environment jsdom
 */


import {Profile, init, create_profile, get_profile_from_storage, update_info_modal, profile_list, delete_profile} from '../scripts/home';
const puppeteer = require('puppeteer');

describe('Test modify profile', () => {
    localStorage.clear()
    let test_profile = new Profile(0, "title1", "tag1", "expDate1", "serialNum1", "note1");

    //check values before modifying
    test('Before Modify', () => {
        expect(test_profile.title).toBe("title1");
        expect(test_profile.tag).toBe("tag1");
        expect(test_profile.exp_date).toBe("expDate1");
        expect(test_profile.serial_num).toBe("serialNum1");
        expect(test_profile.note).toBe("note1");
    });

    //tests after modifications
    test('After Modify', async () => {
        //modify values
        test_profile.title = "title2"
        test_profile.tag = "tag2"
        test_profile.exp_date = "expDate2"
        test_profile.serial_num = "serialNum2"
        test_profile.note = "note2"

        expect(test_profile.title).toBe("title2");
        expect(test_profile.tag).toBe("tag2");
        expect(test_profile.exp_date).toBe("expDate2");
        expect(test_profile.serial_num).toBe("serialNum2");
        expect(test_profile.note).toBe("note2");
        
    });
});