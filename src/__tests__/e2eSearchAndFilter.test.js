// variables for add profile
const NEW_PROFILE_BTN = "#new-profile-btn";
const NEW_MODAL = '#new-modal';
const NEW_MODAL_TITLE = '#new-modal-title';
const NEW_MODAL_TAG = '#new-modal-tag';
const NEW_MODAL_EXP_DATE = '#new-modal-exp_date';
const NEW_MODAL_SERIAL_NUM = '#new-modal-serial_num';
const NEW_MODAL_NOTE = '#new-modal-note';
const CREATE_PROFILE_BTN = '#createProfile';
const ANIMATION_TIME = 500;
const SEARCH_BAR = '#search-bar'
describe('Basic user flow for Website', () => {
    // First, visit the website
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/src/');
      await page.evaluate(() => {
        localStorage.clear();
      });
      await page.reload();
    });
  
    // Next, check to make sure that add button is loaded
    it('Initial Home Page - add button present', async () => {
      console.log('add profile button');
      const add_button = await page.$('#new-profile-btn');
      const add_button_is_null = add_button == null;
      expect(add_button_is_null).toBe(false);
    });
  
    // check to make sure users can add item with multi tags
    it('Test add items with multi tags', async () => {
        //add 1st item
        await page.click(NEW_PROFILE_BTN);
        await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

        await page.type(NEW_MODAL_TITLE, 'fridge');
        await page.type(NEW_MODAL_TAG, 'kitchen, food, large');
        await page.type(NEW_MODAL_EXP_DATE, '01012023');
        await page.type(NEW_MODAL_NOTE, 'This is a test');
        await page.click(CREATE_PROFILE_BTN);
        // wait for modal closing animation to end
        await page.waitForSelector('#new-modal', {visible: false})
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

        //add 2nd item
        await page.click(NEW_PROFILE_BTN);
        await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

        await page.type(NEW_MODAL_TITLE, 'mini fridge');
        await page.type(NEW_MODAL_TAG, 'bedroom, food, medium');
        await page.type(NEW_MODAL_EXP_DATE, '01022023');
        await page.click(CREATE_PROFILE_BTN);
        // wait for modal closing animation to end
        await page.waitForSelector('#new-modal', {visible: false})
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

        //add 3rd item
        await page.click(NEW_PROFILE_BTN);
        await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

        await page.type(NEW_MODAL_TITLE, 'washer');
        await page.type(NEW_MODAL_TAG, 'laundry, large');
        await page.type(NEW_MODAL_EXP_DATE, '01022023');
        await page.click(CREATE_PROFILE_BTN);
        // wait for modal closing animation to end
        await page.waitForSelector('#new-modal', {visible: false})
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

        //add 4th item
        await page.click(NEW_PROFILE_BTN);
        await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

        await page.type(NEW_MODAL_TITLE, 'dryer');
        await page.type(NEW_MODAL_TAG, 'large, laundry');
        await page.type(NEW_MODAL_EXP_DATE, '01022023');
        await page.click(CREATE_PROFILE_BTN);
        // wait for modal closing animation to end
        await page.waitForSelector('#new-modal', {visible: false})
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

        //add 5th item
        await page.click(NEW_PROFILE_BTN);
        await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

        await page.type(NEW_MODAL_TITLE, 'air purifier');
        await page.type(NEW_MODAL_TAG, 'bedroom, small');
        await page.type(NEW_MODAL_EXP_DATE, '01022023');
        await page.click(CREATE_PROFILE_BTN);
        // wait for modal closing animation to end
        await page.waitForSelector('#new-modal', {visible: false})
        await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

        //check 5 profile cards with info
        let profile_grid = await page.$('#grid');
        let all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(6);
    }, 100000);

    it('test tag functionality', async () => {
        //check total 4 tag selector buttons
        const tag_section = await page.$('#tag-btn-div');
        let all_tag_button = await tag_section.$$('button');
        expect(all_tag_button.length).toBe(8);

        //click single tag filtering
        await all_tag_button[1].click();
        let profile_grid = await page.$('#grid');
        let all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(3);
        await all_tag_button[1].click();

        await all_tag_button[2].click();
        profile_grid = await page.$('#grid');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(2);
        await all_tag_button[2].click();

        await all_tag_button[3].click();
        profile_grid = await page.$('#grid');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(4);
        await all_tag_button[3].click();

        await all_tag_button[4].click();
        profile_grid = await page.$('#grid');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(3);
        await all_tag_button[4].click();

        await all_tag_button[5].click();
        profile_grid = await page.$('#grid');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(3);
        await all_tag_button[5].click();

        await all_tag_button[6].click();
        profile_grid = await page.$('#grid');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(2);
        await all_tag_button[6].click();

        await all_tag_button[7].click();
        profile_grid = await page.$('#grid');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(2);
        await all_tag_button[7].click();

        //check multi tag selection
        await all_tag_button[3].click();
        await all_tag_button[5].click();
        profile_grid = await page.$('#grid');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(2);
        await all_tag_button[3].click();
        await all_tag_button[5].click();
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(6);
        await all_tag_button[0].click();
        all_profile_card = await profile_grid.$$('.card');
        // check if the number of tag is still 8
        expect(all_tag_button.length).toBe(8);
        // check if click all tag will unselect all other tag
        expect(all_profile_card.length).toBe(6);
    }, 10000);

    it('test search', async () => {
        //Search exist item name
        await page.type(SEARCH_BAR, 'er');
        let profile_grid = await page.$('#grid');
        let all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(4);

        // //filter after search
        const tag_section = await page.$('#tag-btn-div');
        let all_tag_button = await tag_section.$$('button');
        await all_tag_button[1].click();
        profile_grid = await page.$('#grid');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(2);
        let search_bar = await page.$('#search-bar');
        await search_bar.click({clickCount: 2});
        await search_bar.press('Backspace');
        profile_grid = await page.$('#grid');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(6);

        // search after filter (disable filter after search)
        await all_tag_button[2].click(); // only air purifer under this tag
        await page.type(SEARCH_BAR, 'fridge');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(3);
        await search_bar.click({clickCount: 2});
        await search_bar.press('Backspace');
        all_profile_card = await profile_grid.$$('.card');
        expect(all_profile_card.length).toBe(6);
    },10000);
});