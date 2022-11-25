/**
 * @jest-environment jsdom
 */


import { Profile, update_info_modal } from '../scripts/home';



describe('Test modify profile', () => {
    let test_profile = new Profile(0, "title1", "tag1", "expDate1", "serialNum1", "note1");
    test('Before Modify', () => {
        expect(test_profile.title).toBe("title1");
        expect(test_profile.tag).toBe("tag1");
        expect(test_profile.exp_date).toBe("expDate1");
        expect(test_profile.serial_num).toBe("serialNum1");
        expect(test_profile.note).toBe("note1");
    });
    
    const mod_profile = update_info_modal(test_profile);

    test('After Modify', () => {

    });
});