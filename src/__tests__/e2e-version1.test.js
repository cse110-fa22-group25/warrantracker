// variables for add profile
const NEW_PROFILE_BTN = "#new-profile-btn";
const NEW_MODAL = '#new-modal';
const NEW_MODAL_TITLE = '#new-modal-title';
const NEW_MODAL_TAG = '#new-modal-tag';
const NEW_MODAL_EXP_DATE = '#new-modal-exp_date';
const NEW_MODAL_SERIAL_NUM = '#new-modal-serial_num';
const NEW_MODAL_NOTE = '#new-modal-note';
const CREATE_PROFILE_BTN = '#createProfile';
const ANIMATION_TIME = 300;

//variables for modify profile
const MODIFY_PROFILE_BTN = '#modify-profile';
const INFO_MODAL_TAG = '#info-modal-input-tag';

//variables for delete profile
const INFO_MODAL = '#info-modal';
const CONFIRM_DELETE_MODAL = '#confirm-delete-modal';

describe('Basic user flow for Website', () => {
  jest.setTimeout(100000);
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

  // add several profiles
  it('Test add functionality', async () => {
    console.log('Checking to make sure user can add several profiles');
    // first add
    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

    await page.type(NEW_MODAL_TITLE, 'title1');
    await page.type(NEW_MODAL_TAG, 'tag1');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.type(NEW_MODAL_NOTE, 'This is a test');
    await page.click(CREATE_PROFILE_BTN);
    // wait for modal closing animation to end
    await page.waitForSelector('#new-modal', {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

    // second add
    // wait for previous modal closing animatino
    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector('#new-modal', {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

    await page.type(NEW_MODAL_TITLE, 'name2 - no tag');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.click(CREATE_PROFILE_BTN);
    // wait for modal closing animation to end
    await page.waitForSelector('#new-modal', {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

    // third add
    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

    await page.type(NEW_MODAL_TITLE, 'name3');
    await page.type(NEW_MODAL_TAG, 'tag2');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.click(CREATE_PROFILE_BTN);
    // wait for modal closing animation to end
    await page.waitForSelector('#new-modal', {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

    // fourth add
    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

    await page.type(NEW_MODAL_TITLE, 'name 4');
    await page.type(NEW_MODAL_TAG, 'tag3');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.click(CREATE_PROFILE_BTN);
    // wait for modal closing animation to end
    await page.waitForSelector('#new-modal', {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

    // fifth add
    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

    await page.type(NEW_MODAL_TITLE, 'name5');
    await page.type(NEW_MODAL_TAG, 'tag1');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.type(NEW_MODAL_SERIAL_NUM, '69420')
    await page.click(CREATE_PROFILE_BTN);
    // wait for modal closing animation to end
    await page.waitForSelector('#new-modal', {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

    //check 5 profile cards with info
    let profile_grid = await page.$('#grid');
    let all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(6);
  }, 50000);

  it('Test tag functionality', async () => {
    //check total 4 tag selector buttons
    const tag_section = await page.$('#tag-btn-div');
    let all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(4);

    //click on tags to check amount of box correct
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
    expect(all_profile_card.length).toBe(2);
    await all_tag_button[3].click();

    // ensure localstorage is correct, DO NOT TEST ID, ID IS RANDOM EVERY TIME
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(5);

    /*
    THE ORDERING MAY CHANGE, EDIT TEST ORDERING IF ADD IMPLEMENTATION
    CHANGES AFFECT THIS TEST
    */
    expect(ls[0].title).toEqual('name5');
    expect(ls[0].tag).toEqual('tag1');
    expect(ls[0].exp_date).toEqual('2022-11-13');
    expect(ls[0].serial_num).toEqual('69420');
    expect(ls[0].note).toEqual('');

    expect(ls[1].title).toEqual('name 4');
    expect(ls[1].tag).toEqual('tag3');
    expect(ls[1].exp_date).toEqual('2022-11-13');
    expect(ls[1].serial_num).toEqual('');
    expect(ls[1].note).toEqual('');

    expect(ls[2].title).toEqual('name3');
    expect(ls[2].tag).toEqual('tag2');
    expect(ls[2].exp_date).toEqual('2022-11-13');
    expect(ls[2].serial_num).toEqual('');
    expect(ls[2].note).toEqual('');

    expect(ls[3].title).toEqual('name2 - no tag');
    expect(ls[3].tag).toEqual('');
    expect(ls[3].exp_date).toEqual('2022-11-13');
    expect(ls[3].serial_num).toEqual('');
    expect(ls[3].note).toEqual('');

    expect(ls[4].title).toEqual('title1');
    expect(ls[4].tag).toEqual('tag1');
    expect(ls[4].exp_date).toEqual('2022-11-13');
    expect(ls[4].serial_num).toEqual('');
    expect(ls[4].note).toEqual('This is a test');
    // [{"id":237104159327,"title":"name5","tag":"tag1","exp_date":"2022-11-13","serial_num":"","note":""},{"id":1193226186527,"title":"name 4","tag":"tag3","exp_date":"2022-11-13","serial_num":"","note":""},{"id":1429733691996,"title":"name3","tag":"tag2","exp_date":"2022-11-13","serial_num":"","note":""},{"id":1343810509623,"title":"name2 - no tag","tag":"","exp_date":"2022-11-13","serial_num":"","note":""},{"id":645242524600,"title":"title1","tag":"tag1","exp_date":"2022-11-13","serial_num":"","note":"This is a test"}]
  }, 10000);
  
  it('Test modify functionality', async () => {
    //modify name and tags and check

    //change tag2 to tag2, tag4
    let tag_section = await page.$('#tag-btn-div');
    let all_tag_button = await tag_section.$$('button');
    await all_tag_button[3].click();
    let profile_grid = await page.$('#grid');
    let all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    await page.type(INFO_MODAL_TAG, ',tag4');
    await page.click(MODIFY_PROFILE_BTN);
    await page.waitForSelector(INFO_MODAL, {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    tag_section = await page.$('#tag-btn-div');
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(5);
    await all_tag_button[3].click();
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
    await all_tag_button[3].click();
    await all_tag_button[4].click();
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
    
    //change tag2, tag4 into tag4
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    //let tag_field = await page.$(NEW_MODAL_TAG);
    await page.evaluate(() => {
      const example = document.getElementById('info-modal-input-tag');
      example.value = '';
    });
    await page.type(INFO_MODAL_TAG, 'tag4');
    await page.click(MODIFY_PROFILE_BTN);
    await page.waitForSelector(INFO_MODAL, {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    tag_section = await page.$('#tag-btn-div');
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(4);
    await all_tag_button[3].click();
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
    
    //undo everything
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.evaluate(() => {
      const example = document.getElementById('info-modal-input-tag');
      example.value = '';
    });
    await page.type(INFO_MODAL_TAG, 'tag2');
    await page.click(MODIFY_PROFILE_BTN);
    await page.waitForSelector(INFO_MODAL, {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    expect(all_tag_button.length).toBe(4);
  }, 10000);
  

  it ('Tests delete', async () => {
 //delete section (delete all profiles)
    //delete first card from tag1
    let tag_section = await page.$('#tag-btn-div');
    let all_tag_button = await tag_section.$$('button');
    let profile_grid = await page.$('#grid');

    await all_tag_button[1].click();
    profile_grid = await page.$('#grid');
    let all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    let path_to_delete_button = await page.$('#info-modal');
    let info_buttons = await path_to_delete_button.$$('button');
    let delete_button = info_buttons[1];
    await delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    let confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
    tag_section = await page.$('#tag-btn-div');
    await all_tag_button[1].click();

    //delete first one from tag2, check tag2 disappear
    all_tag_button = await tag_section.$$('button');
    await all_tag_button[3].click();
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    path_to_delete_button = await page.$('#info-modal');
    info_buttons = await path_to_delete_button.$$('button');
    delete_button = info_buttons[1];
    await delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    profile_grid = await page.$('#grid');
    tag_section = await page.$('#tag-btn-div');
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(3);

    //delete first one from all (tag) and only 1 tag left
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    path_to_delete_button = await page.$('#info-modal');
    info_buttons = await path_to_delete_button.$$('button');
    delete_button = info_buttons[1];
    await delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(3);
    tag_section = await page.$('#tag-btn-div');
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(2);
    await all_tag_button[1].click();
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
    await all_tag_button[1].click();

    //delete first one from all (tag) and only 1 tag left
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    path_to_delete_button = await page.$('#info-modal');
    info_buttons = await path_to_delete_button.$$('button');
    delete_button = info_buttons[1];
    await delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
    tag_section = await page.$('#tag-btn-div');
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(2);
    await all_tag_button[1].click();
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
    await all_tag_button[1].click();
    
    //delete last profile, check no tag and local storage empty
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    path_to_delete_button = await page.$('#info-modal');
    info_buttons = await path_to_delete_button.$$('button');
    delete_button = info_buttons[1];
    await delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(1);
    tag_section = await page.$('#tag-btn-div');
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(1);
    
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(0);
  }, 50000);

   //check that profile cards are still present after website is re-loaded
   it("Reload webpage", async () => {

    //add one profile for the test
    await page.click(NEW_PROFILE_BTN);
    await page.waitForSelector(NEW_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish

    await page.type(NEW_MODAL_TITLE, 'title1');
    await page.type(NEW_MODAL_TAG, 'tag1');
    await page.type(NEW_MODAL_EXP_DATE, '11132022');
    await page.type(NEW_MODAL_NOTE, 'This is a test');
    await page.click(CREATE_PROFILE_BTN);

    // wait for modal closing animation to end
    await page.waitForSelector('#new-modal', {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});

    //reload page
    console.log("Checking profiles cards are still there after website is re-loaded");
    await page.reload();

    //get cards and local storage
    const profile_grid = await page.$('#grid');
    let all_profile_card = await profile_grid.$$('.card');
    let local_contents = await JSON.parse(await page.evaluate( () => localStorage.getItem('profiles')));

    //ensure local storage and the number of cards on the page are equal 
    expect(local_contents.length + 1).toBe(all_profile_card.length);

  }, 50000);
});

