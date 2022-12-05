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

describe('Load Page Test', () => {
    // Open webpage in server
    beforeAll(async () => {
      await page.goto("http://127.0.0.1:5500/src/index.html"); 
    });

    // Check if site is properly loaded
    it('Initial Home Page - add button present', async () => {
      const add_button = await page.$('#new-profile-btn');
      const add_button_is_null = add_button == null;
      expect(add_button_is_null).toBe(false);
    });

    //Check if local storage is empty
    it('Local Storage Test - expected null', async () => {
        let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
        expect(ls).toBe(null);
    },10000);
  });

describe('Single Deletion Test', () => {
    // Add item to site
    it('Add Profile to page', async () => {
      await page.click(NEW_PROFILE_BTN);
      await page.waitForSelector(NEW_MODAL, {visible: true}); // Wait for the modal to be visible
      await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // Wait for animation to finish
      await page.type(NEW_MODAL_TITLE, 'title1');
      await page.type(NEW_MODAL_TAG, 'tag1');
      await page.type(NEW_MODAL_EXP_DATE, '11132022');
      await page.type(NEW_MODAL_NOTE, 'This is a test');
      await page.click(CREATE_PROFILE_BTN);
      await page.waitForSelector(NEW_MODAL, {visible: false})
      await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // Guarantees proper fade time
    });

  // Check if local storage was updated
  it('Local Storage Test - expected one', async () => {
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(1);
  },10000);
  
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
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true}); //Should open deletion confirmation box
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    let cancel_btn = await page.$('#close-deletion-btn')
    await cancel_btn.evaluate(cb => cb.click());
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // Hit "cancel" on deletion confirmation box
    await page.waitForSelector(INFO_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    temp_path = await page.$('.modal-header')
    let close_btn = await temp_path.$('.btn-close')
    await close_btn.evaluate(clb => clb.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
  });

  // Check if local storage was retained
  it('Local Storage Test - expected one again', async () => {
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(1);
  },10000);

  // Test single deletion
  it('Profile Deletion', async () => {
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
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true}); //Should open deletion confirmation box
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    let del_btn = await page.$('#delbtn')
    await del_btn.evaluate(db => db.click()); // Hit "confirm" on deletion confirmation box
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
  });

  // Check if local storage was cleared
  it('Local Storage Test - expected cleared', async () => {
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(0); // Expect empty array instead of null value
  },10000);
});

describe('Multi Deletion Test', () => {
  // Add multiple items to site
  it('Add 3 Profiles to page', async () => {
    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); 
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    await page.type(NEW_MODAL_TITLE, 'title1');
    await page.type(NEW_MODAL_TAG, 'tag1');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.type(NEW_MODAL_NOTE, 'This is a test');
    await page.click(CREATE_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // Profile 1 is added

    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); 
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    await page.type(NEW_MODAL_TITLE, 'title2');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.click(CREATE_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // Profile 2 is added

    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); 
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    await page.type(NEW_MODAL_TITLE, 'title3');
    await page.type(NEW_MODAL_TAG, 'tag4');
    await page.type(NEW_MODAL_EXP_DATE, '11132002');
    await page.click(CREATE_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // Profile 3 is added
  });

  // Check if local storage was properly initialized
  it('Local Storage Test - expected 3', async () => {
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(3); 
    expect(ls[1].title).toBe('title2');
  },10000);

  // Test specific deletion
  it('Specific Deletion', async () => {
    let profile_grid = await page.$('#grid');
    let all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[2].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); 
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    let temp_path = await page.$('#info-modal-form')
    let delete_btn = await temp_path.$('button')
    await delete_btn.evaluate(db => db.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true}); //Should open deletion confirmation box
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    let del_btn = await page.$('#delbtn')
    await del_btn.evaluate(db => db.click()); // Hit "confirm" on deletion confirmation box
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
  });

  // Check if selected profile was properly removed
  it('Local Storage Test - expected 2', async () => {
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(2); 
    expect(ls[1].title).toBe('title1');
  },10000);

  // Test total removal
  it('Full Deletion', async () => {
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
    let del_btn = await page.$('#delbtn')
    await del_btn.evaluate(db => db.click()); 
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // Removed leftover 1

    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); 
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    temp_path = await page.$('#info-modal-form')
    delete_btn = await temp_path.$('button')
    await delete_btn.evaluate(db => db.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true}); 
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    del_btn = await page.$('#delbtn')
    await del_btn.evaluate(db => db.click()); 
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // Removed leftover 2
  });

  // Check if all profiles were removed
  it('Local Storage Test - expected empty', async () => {
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(0); 
  },10000);
});

describe('Reload + Deletion Test', () => {
   // Add item to site
   it('Add Test Profile', async () => {
    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); 
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.type(NEW_MODAL_TITLE, 'title1');
    await page.type(NEW_MODAL_TAG, 'tag1');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.type(NEW_MODAL_NOTE, 'This is a test');
    await page.click(CREATE_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); 
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(1); 
  });

  // Test reload before delete
  it('Reload before deletion', async () => {
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
    await page.reload(); // Reload page before pressing delete
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(1); 
  });

  // Test reload during delete
  it('Reload during deletion', async () => {
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
    let del_btn = await page.$('#delbtn')
    await del_btn.evaluate(db => db.click()); 
    await page.reload(); // Reload page just after pressing delete
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(0); 
  });

  // Test reload during delete
  it('Reload after deletion', async () => {
    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); 
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.type(NEW_MODAL_TITLE, 'title1');
    await page.type(NEW_MODAL_TAG, 'tag1');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.type(NEW_MODAL_NOTE, 'This is a test');
    await page.click(CREATE_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // Re-add test profile

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
    let del_btn = await page.$('#delbtn')
    await del_btn.evaluate(db => db.click()); 
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(0); 

    await page.reload(); // Reload after deletion
    ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(0); 
  });
});