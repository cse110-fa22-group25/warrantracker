const Puppeteer  = require("puppeteer");
import {Profile} from '../../scripts/Profile.js';

let test_profile = new Profile(0, "profile title", "test tag", "02282001", "test serialNumber", "additional notes");
 
describe('Test Info Modal', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500/src/');
    });
    jest.setTimeout(100000);
    test('Card size initially should be 1', async () => {
        const numCards = await page.$$eval('#grid .card', (cards) => {
          return cards.length;
        });
        // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
        expect(numCards).toBe(1);
    });

    test("the new modal form should pop up after clicking button", async() =>{
        // Before testing info model, we want to save the modal to the grid first
        const NEW_MODAL_BUTTON = await page.$('#new-profile-btn div')
        await NEW_MODAL_BUTTON.click();

        // filling out info
        await page.waitForTimeout(500);
        // const NEW_MODAL_FORM = await page.$('#new-modal-form')
        let title_field = await page.$('#new-modal-title');
        // await title_field.press('Space');
        await title_field.press('Backspace');
        await title_field.type(test_profile.title);
        let content = await (await title_field.getProperty('value')).jsonValue();
        expect(content).toBe(test_profile.title);
        await page.waitForTimeout(500);

        let tag_field = await page.$('#new-modal-tag');
        await tag_field.press('Backspace');
        await tag_field.type(test_profile.tag);
        content = await (await tag_field.getProperty('value')).jsonValue();
        expect(content).toBe(test_profile.tag);
        await page.waitForTimeout(500);

        let expire_field = await page.$('#new-modal-exp_date');
        await expire_field.press('Backspace');
        await expire_field.type(test_profile.exp_date);
        content = await (await expire_field.getProperty('value')).jsonValue();
        expect(content.replace(/-/g, "").slice(4)+content.replace("/-", "").slice(0,4)).toBe(test_profile.exp_date);
        await page.waitForTimeout(500);

        let serial_field = await page.$('#new-modal-serial_num');
        await serial_field.press('Backspace');
        await serial_field.type(test_profile.serial_num);
        content = await (await serial_field.getProperty('value')).jsonValue();
        expect(content).toBe(test_profile.serial_num);
        await page.waitForTimeout(500);

        let note_field = await page.$('#new-modal-note');
        await note_field.press('Backspace');
        await note_field.type(test_profile.note);
        content = await (await note_field.getProperty('value')).jsonValue();
        expect(content).toBe(test_profile.note);
        await page.waitForTimeout(500);

        let save_button = await page.$('#createProfile');
        await save_button.click();
        await page.waitForTimeout(500);
    });

    test("testing number of cards and tags after new modal form", async() =>{
        // checking grid children numbers
        const GRID = await page.$('#grid');
        const cards = await GRID.$$('.card');
        expect(cards.length).toBe(2);

        // checking tag children numbers
        const tag_grid = await page.$('#tag-btn-div')
        const tags = await tag_grid.$$('button');
        expect(tags.length).toBe(2);
    });

    test("testing content of info modal form", async () => {
        // open up the info modal form
        const GRID = await page.$('#grid');
        const cards = await GRID.$$('.card');
        await cards[cards.length-1].click();
        // await page.waitForTimeout(500);
 
        const info_title = await page.$("#info-modal-input-title");
        const title_text = await (await info_title.getProperty('value')).jsonValue();
        expect(title_text).toBe(test_profile.title);
        
        const info_tag = await page.$("#info-modal-input-tag");
        const tag_text = await (await info_tag.getProperty('value')).jsonValue();
        expect(tag_text).toBe(test_profile.tag);
        
        const info_exp_date = await page.$("#info-modal-input-exp_date");
        const exp_date = await (await info_exp_date.getProperty('value')).jsonValue();
        const exp_date_text = exp_date.replace(/-/g, "").slice(4)+exp_date.replace("/-", "").slice(0,4);
        expect(exp_date_text).toBe(test_profile.exp_date);

        const info_serial_num = await page.$("#info-modal-input-serial_num");
        const serial_num_text = await (await info_serial_num.getProperty('value')).jsonValue();
        expect(serial_num_text).toBe(test_profile.serial_num);

        const info_note = await page.$("#info-modal-input-note");
        const note_text = await (await info_note.getProperty('value')).jsonValue();
        expect(note_text).toBe(test_profile.note);
     });
 
 });
  