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
  // First, visit the website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/src/');
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
  }, 10000);

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
  }, 5000);
  
  it('Test modify functionality', async () => {
    //modify name and tags and check
    let tag_section = await page.$('#tag-btn-div');
    let all_tag_button = await tag_section.$$('button');
    await all_tag_button[3].click();
    let profile_grid = await page.$('#grid');
    let all_profile_card = await profile_grid.$$('.card');
    console.log("before click");
    await all_profile_card[1].click();

    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    console.log("before type");
    await page.type(INFO_MODAL_TAG, ',tag4');
    await page.click(MODIFY_PROFILE_BTN);
    await page.waitForSelector(INFO_MODAL, {visible: false})
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    // console.log(tag_section);
    tag_section = await page.$('#tag-btn-div');
    all_tag_button = await tag_section.$$('button');
    // console.log(all_tag_button);
    expect(all_tag_button.length).toBe(5);
    // console.log("first click test");
    await all_tag_button[3].click();
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
    await all_tag_button[3].click();
    // console.log("second click test");
    await all_tag_button[4].click();
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
    await all_tag_button[4].click();


    //delete section (delete all profiles)
  }, 10000);
  

  it ('Tests delete', async () => {
 //delete section (delete all profiles)
    //delete first card from tag1
    const tag_section = await page.$('#tag-btn-div');
    let all_tag_button = await tag_section.$$('button');
    all_tag_button = await tag_section.$$('button');
    let profile_grid = await page.$('#grid');


    await all_tag_button[1].click();
    profile_grid = await page.$('#grid');
    let all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    let path_to_delete_button = await page.$('#info-modal-form');
    let delete_button = await path_to_delete_button.$('button');
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
    await all_tag_button[1].click();

    //delete first one from tag2, check tag2 disappear
    all_tag_button = await tag_section.$$('button');
    await all_tag_button[3].click();
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    path_to_delete_button = await page.$('#info-modal-form');
    delete_button = await path_to_delete_button.$('button');
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
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(3);

    //delete first one from all (tag) and only 1 tag left
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[1].click();
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    path_to_delete_button = await page.$('#info-modal-form');
    delete_button = await path_to_delete_button.$('button');
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
    path_to_delete_button = await page.$('#info-modal-form');
    delete_button = await path_to_delete_button.$('button');
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
    path_to_delete_button = await page.$('#info-modal-form');
    delete_button = await path_to_delete_button.$('button');
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
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(1);
    
    let ls = await JSON.parse(await page.evaluate(() => localStorage.getItem('profiles')));
    expect(ls.length).toEqual(0);
  }, 10000);

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

  }, 10000);



      // //modify name and tags and check
/*
  //delete those profile    
  it('Test delete functionality', async () => {
    //delete and check amount in each tag correct
    const tag_section = await page.$('#tag-btn-div');
    const all_tag_button = await tag_section.$$('button');
    await all_tag_button[1].click();
    console.log("can click tag");
    let profile_grid = await page.$('#grid');
    console.log(profile_grid);
    let all_profile_card = await profile_grid.$$('button');
    console.log(all_profile_card);
    console.log(all_profile_card[0]);
    console.log(all_profile_card[1]);
    await all_profile_card[1].click();
    console.log("click card");
    await page.waitForSelector(INFO_MODAL, {visible: true}); // wait for the modal to be visible
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);}); // wait for animation to finish
    console.log("info appear");
    let path_to_delete_button = await page.$('#info-modal-form');
    let delete_button = await path_to_delete_button.$('button');
    await delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(INFO_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: true});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    console.log("till here");
    let confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    await page.waitForSelector(CONFIRM_DELETE_MODAL, {visible: false});
    await new Promise((resolve) => {setTimeout(resolve, ANIMATION_TIME);});
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);
 /*
    await all_tag_button[3].click();
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    await all_profile_card[0].click();
    path_to_delete_button = await page.$('#info-modal-form');
    delete_button = await path_to_delete_button.$('button');
    await delete_button.evaluate(curr_button => curr_button.click());
    confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    //because go back to all tag as one tag is gone by deletion
    expect(all_profile_card.length).toBe(4);
    tag_section = await page.$('#tag-btn-div');
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(3);
    await all_profile_card[0].click();
    path_to_delete_button = await page.$('#info-modal-form');
    delete_button = await path_to_delete_button.$('button');
    await delete_button.evaluate(curr_button => curr_button.click());
    confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(3);

    await all_profile_card[0].click();
    path_to_delete_button = await page.$('#info-modal-form');
    delete_button = await path_to_delete_button.$('button');
    await delete_button.evaluate(curr_button => curr_button.click());
    confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(2);

    await all_profile_card[0].click();
    path_to_delete_button = await page.$('#info-modal-form');
    delete_button = await path_to_delete_button.$('button');
    await delete_button.evaluate(curr_button => curr_button.click());
    confirm_delete_button = await page.$('#delbtn');
    await confirm_delete_button.evaluate(curr_button => curr_button.click());
    profile_grid = await page.$('#grid');
    all_profile_card = await profile_grid.$$('.card');
    expect(all_profile_card.length).toBe(1);
    tag_section = await page.$('#tag-btn-div');
    all_tag_button = await tag_section.$$('button');
    expect(all_tag_button.length).toBe(1); 
  }, 30000);
    

*/

/*

// Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    for (let i = 0; i < prodItems.length; i++) {
      console.log(`Checking product item ${i+1}/${prodItems.length}`);
      // Grab the .data property of <product-items> to grab all of the json data stored inside
      data = await prodItems[i].getProperty('data');
      // Convert that property to JSON
      plainValue = await data.jsonValue();
      allArePopulated = true;
      // Make sure the title, price, and image are populated in the JSON
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.price.length == 0) { allArePopulated = false; }
      if (plainValue.image.length == 0) { allArePopulated = false; }
      // Expect allArePopulated to still be true
      expect(allArePopulated).toBe(true);
    }
  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    const prodItem = await page.$$('product-item');
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    const shadow = await prodItem[0].getProperty('shadowRoot');
    const button = await shadow.waitForSelector('button');
    // Once you have the button, you can click it and check the innerText property of the button.
    await button.click();
    const text = await button.getProperty('innerText');
    // Once you have the innerText property, use innerText.jsonValue() to get the text value of it
    const textVal = await text.jsonValue();
    expect(textVal).toBe("Remove from Cart");
    await button.click();
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    const prodItems = await page.$$('product-item');
    // get the shadowRoot and query select the button inside, and click on it.
    for (let i = 0; i < prodItems.length; i++) {
      const shadow = await prodItems[i].getProperty('shadowRoot');
      const button = await shadow.waitForSelector('button');
      await button.click();
    }
    // Check to see if the innerText of #cart-count is 20
    const count = await page.$('#cart-count');
    const text = await count.getProperty('innerText');
    const textVal = await text.jsonValue();
    expect(textVal).toBe('20');
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    await page.reload();
    const prodItems = await page.$$('product-item');
    // get the shadowRoot and query select the button inside, and click on it.
    for (let i = 0; i < prodItems.length; i++) {
      const shadow = await prodItems[i].getProperty('shadowRoot');
      const button = await shadow.waitForSelector('button');
      const btext = await button.getProperty('innerText');
      const btextVal = await btext.jsonValue();
      expect(btextVal).toBe("Remove from Cart");
    }
    // element to make sure that all of their buttons say "Remove from Cart".
    const count = await page.$('#cart-count');
    const text = await count.getProperty('innerText');
    const textVal = await text.jsonValue();
    expect(textVal).toBe('20');
    // Also check to make sure that #cart-count is still 20
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
    const storageContent = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cart'));
    });
    expect(storageContent).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    const prodItems = await page.$$('product-item');
    // get the shadowRoot and query select the button inside, and click on it.
    for (let i = 0; i < prodItems.length; i++) {
      const shadow = await prodItems[i].getProperty('shadowRoot');
      const button = await shadow.waitForSelector('button');
      await button.click();
    }
    // Once you have, check to make sure that #cart-count is now 0
    const count = await page.$('#cart-count');
    const text = await count.getProperty('innerText');
    const textVal = await text.jsonValue();
    expect(textVal).toBe('0');
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    await page.reload();
    const prodItems = await page.$$('product-item');
    // get the shadowRoot and query select the button inside, and click on it.
    for (let i = 0; i < prodItems.length; i++) {
      const shadow = await prodItems[i].getProperty('shadowRoot');
      const button = await shadow.waitForSelector('button');
      const btext = await button.getProperty('innerText');
      const btextVal = await btext.jsonValue();
      expect(btextVal).toBe("Add to Cart");
    }
    
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0
    const count = await page.$('#cart-count');
    const text = await count.getProperty('innerText');
    const textVal = await text.jsonValue();
    expect(textVal).toBe('0');
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
    const storageContent = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('cart'));
    });
    expect(storageContent).toEqual([]);
  });
  */
});

