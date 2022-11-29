const NEW_PROFILE_BTN = "#new-profile-btn";
const NEW_MODAL = '#new-modal';
const NEW_MODAL_TITLE = '#new-modal-title';
const NEW_MODAL_TAG = '#new-modal-tag';
const NEW_MODAL_EXP_DATE = '#new-modal-exp_date';
const NEW_MODAL_SERIAL_NUM = '#new-modal-serial_num';
const NEW_MODAL_NOTE = '#new-modal-note';
const CREATE_PROFILE_BTN = '#createProfile';
const INFO_MODAL = '#info-modal';
const CONFIRM_DELETE_MODAL = '#confirm-delete-modal';
const ANIMATION_TIME = 300;

describe('Deletion Test', () => {
    // Open webpage in server
    beforeAll(async () => {
      await page.goto("http://127.0.0.1:5500/src/index.html"); 
    });

    it('Initial Home Page - add button present', async () => {
      console.log('add profile button');
      const add_button = await page.$('#new-profile-btn');
      const add_button_is_null = add_button == null;
      expect(add_button_is_null).toBe(false);
    });

    //Check if local storage is empty
    it('Local Storage Test - expected empty', async () => {
        let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
        expect(ls).toBe(null);
    },1000);

    // Add item to site
    it('Add Profile to page', async () => {
      await page.click(NEW_PROFILE_BTN);
      await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
      await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
      await page.type(NEW_MODAL_TITLE, 'title1');
      await page.type(NEW_MODAL_TAG, 'tag1');
      await page.type(NEW_MODAL_EXP_DATE, '11132022');
      await page.type(NEW_MODAL_NOTE, 'This is a test');
      await page.click(CREATE_PROFILE_BTN);
      await page.waitForSelector(NEW_MODAL, {visible: false})
      await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    });

  // Check if local storage was updated
  it('Local Storage Test - expected one', async () => {
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(1);
  },1000);
  
  // Test empty delete
  it('Empty Deletion', async () => {
    let profile_grid = await page.$('#grid');
    let all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); 
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    let temp_path = await page.$('#info-modal-form')
    let delete_btn = await temp_path.$('button')
    await delete_btn.evaluate(db => db.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    let cancel_btn = await page.$('#close-deletion-btn')
    await cancel_btn.evaluate(cb => cb.click());
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(INFO_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    temp_path = await page.$('#info-modal-form')
    let close_btn = await temp_path.$('button')
  });
});