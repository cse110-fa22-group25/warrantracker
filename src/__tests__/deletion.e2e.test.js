describe('Deletion Test', () => {
    // Open webpage in server
    beforeAll(async () => {
      await page.goto("http://127.0.0.1:5500/src/index.html"); 
      await page.evaluate(() => {
        localStorage.setItem('token', 'example-token');
      });
    });

    // Check if local storage is empty
    it('Local Storage Test - expected empty', async () => {
        const profile_list = await page.evaluate(() =>  Object.assign({}, window.localStorage.getItem('profiles')));
        expect(profile_list).toBe('[]');
    },1000);

    // Add item to site
    it('Add Profile to page', async () => {
        const add_button = await page.$('#new-profile-btn');
        await add_button.evaluate(ab => ab.click());
        let title_field = await page.$('#new-modal-title');
        await title_field.type('name1');
        let tag_field = await page.$('#new-modal-tag');
        await tag_field.type('tag1');
        let expire_field = await page.$('#info-modal-input-exp_date');
        await expire_field.type('11132022');
        let serial_field = await page.$('#info-modal-input-serial_num');
        await serial_field.type('abcd1234');
        let note_field = await page.$('#new-modal-note');
        await note_field.type('This is a test');
        const save_button = await page.$('#createProfile');
        await save_button.evaluate(sb => sb.click());
      });

    // Check if local storage was updated
    it('Local Storage Test - expected 1', async () => {
        const profile_list = await page.evaluate(() =>  Object.assign({}, window.localStorage.getItem('profiles')));
        expect(profile_list).toBe('[]');
    },1000);
});