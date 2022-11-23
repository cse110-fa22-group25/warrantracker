// Get functions to test
import { Profile, delete_profile } from '../scripts/home';

/**
 * Tests deletion of empty profile - should return null
 */
describe('Test empty deletion', () => {
    let test_profile = new Profile(0, "title", "tag", "expDate", "serialNum", "note");
    test('Before Deletion', () => {
        expect(test_profile.title).toBe("title");
        expect(test_profile.tag).toBe("tag");
        expect(test_profile.exp_date).toBe("expDate");
        expect(test_profile.serial_num).toBe("serialNum");
        expect(test_profile.note).toBe("note");
    });
    const retVal = delete_profile();
    test('Empty Deletion', () => {
        expect(test_profile.title).toBe("title");
        expect(test_profile.tag).toBe("tag");
        expect(test_profile.exp_date).toBe("expDate");
        expect(test_profile.serial_num).toBe("serialNum");
        expect(test_profile.note).toBe("note");
        expect(retVal).toBe(undefined);
    });
    localStorage.clear();
})