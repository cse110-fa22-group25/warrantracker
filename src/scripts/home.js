// home.js

/** Global Variables */
let profile_list = []; // store all profile object
let grid; // the html element which is the parent for all profile cards
let new_profile_btn; // the first element in the grid (the card with a "+" sign);
let info_modal; // the modal showing up when clicking a profile card
let new_profile_modal; // the modal showing up when clicking the new-profile-btn
let new_profile_form;
let new_modal_instance; // bootstrap modal instance for newPorifleModal;
let info_modal_instance; // boostrap modal instance for inforModal;
const modify_on = false;
// add more below

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize page after load -- test change
 */
function init() {
  // select needed html elements
  grid = document.querySelector('#grid');
  new_profile_btn = document.querySelector("#new-profile-btn");
  info_modal = document.querySelector("#info-modal");
  new_profile_modal = document.querySelector("#new-modal");
  new_profile_form = document.querySelector('#new-modal-form');
  new_modal_instance = new window.bootstrap.Modal(new_profile_modal);
  info_modal_instance = new window.bootstrap.Modal(info_modal);

  // get existing profiles from localStorage
  // generate card component and display them
  const stored_profiles = get_profile_from_storage();
  if (stored_profiles) {
    profile_list.push(...stored_profiles);
    add_profiles_to_doc(stored_profiles);
  }

  // add more opeartions below

  // add event listeners below
  // handle when user click save-btn in new profile modal
  new_profile_form.addEventListener("submit", create_profile);
}

/**
 * Construct a new Profile Object using the pass-in arguments
 * @constructor
 * @param {string} title - the name of the product
 * @param {string} tag - the tag of the product
 * @param {string} exp_date - the expiration date of the product
 * @param {string} serial_num - the serial number of the product
 * @param {string} note - the additional notes for the product
 */
function Profile(title, tag, exp_date, serial_num, note) {
  this.title = title;
  this.tag = tag;
  this.exp_date = exp_date;
  this.serial_num = serial_num;
  this.note = note;
}

/**
 * Retreat the existing profile_list in localStorage.
 * Return the parsed array in which there are profile
 * object. If nothing in the localStorage, return nothing.
 * @returns {Profile[]} an array contains profile objects or nothing
 */
function get_profile_from_storage() {
  const profiles = localStorage.getItem("profiles");
  if (!profiles) return;
  return JSON.parse(profiles);
}

/**
 * save the profile_list to the localStorage
 */
function save_profile_to_storage() {
  localStorage.setItem("profiles", JSON.stringify(profile_list));
}

/**
 * Create bootstrap card component to display the
 * stored profile_list in the localStorage
 * @param {Profile[]} profiles an array contains profile objects
 */
function add_profiles_to_doc(profiles) {
  profiles.forEach((profile) => {
    const curr_col = create_card(profile);
    grid.append(curr_col);
  });
}

/**
 * Event handler for clicking the save btn in new_profile_modal
 * 1. select needed html elements in new_profile_modal
 * 2. create a new Profile object
 * 3. save the profile to localStorage
 * 4. create a card component on the main page
 * 5. clear input value in the new_profile_modal
 */
function create_profile() {
  // select needed html elements in new_profile_modal
  const title = new_profile_modal.querySelector("#new-modal-title");
  const tag = new_profile_modal.querySelector("#new-modal-tag"); // haven't implement yet
  const exp_date = new_profile_modal.querySelector("#new-modal-exp_date");
  const serial_num = new_profile_modal.querySelector("#new-modal-serial_num");
  const note = new_profile_modal.querySelector("#new-modal-note");

  // create a new profile object
  const new_profile = new Profile(
    title.value,
    null,
    exp_date.value,
    serial_num.value,
    note.value
  );

  // save newProfile to localStorage
  profile_list = [new_profile, ...profile_list];
  save_profile_to_storage();

  // create a card component to display
  const curr_col = create_card(new_profile);
  grid.insertBefore(curr_col, new_profile_btn.nextSibling);

  // clear input value of the form
  title.value = "";
  exp_date.value = "";
  exp_date.value = "";
  serial_num.value = "";
  note.value = "";
  // tag.value = "bedroom1";

  // hide bootstrap modal
  new_modal_instance.hide();
}

/**
 * Create a bootstrap card component on the main page
 * 1. creat needed elements (refer to examples/profileCardTemplate.html)
 *    note that the card only contains a title and addition note for now, need to modify
 * 2. construct the card components using appendChild()
 * 3. add an event listener to the card_wrapper
 *    (when user clicks that card, the handler need to update
 *     info_modal to display the corresponding info)
 * 4. return the newly created card_wrapper
 * @param {Profile} profile -  an Profile object
 * @returns {HTMLDivElement} card wrapper
 */
function create_card(profile) {
  const card_wrapper = document.createElement("div");
  card_wrapper.setAttribute("class", "col-sm-6 col-lg-4 p-2");

  const card = document.createElement("div");
  card.setAttribute("type", "button");
  card.setAttribute("data-bs-toggle", "modal");
  card.setAttribute("data-bs-target", "#info-modal");
  card.setAttribute("class", "card");

  const card_body = document.createElement("div");
  card_body.setAttribute("class", "card-body");

  const card_title = document.createElement("h5");
  card_title.innerHTML = `${profile.title}`;
  card_title.setAttribute("class", "card-title");

  const card_text = document.createElement("p");
  card_text.setAttribute("class", "card-text");
  card_text.innerHTML = `${profile.note}`;

  // can add some btn or other needed elements here

  // construct the Card Components here
  card_body.appendChild(card_title);
  card_body.appendChild(card_text);
  card.appendChild(card_body);
  card_wrapper.appendChild(card);

  // add a event listener to the component
  // when clicking, update the info modal with its info
  card_wrapper.addEventListener("click", () => {
    update_info_modal(profile);
  });
  return card_wrapper;
}

/**
 * update info_modal with corresponding profile info
 * 1. hide all the input element (<input>, <textarea>)
 * 2. select the elements we need to update in the info_modal
 * 3. change its value (innerHTML) to the corresponding param
 *    in the passed-in profile object
 * 4. add event listener to the modify and delete button, which should
 *    change the displayed info to a input box so that user
 *    can modify them.
 *
 * @param {Profile} profile an Profile object
 */
function update_info_modal(profile) {
  const title = document.querySelector("#info_modal-input-title");
  const tag = document.querySelector("#info_modal-input-tag"); // haven't implement yet
  const exp_date = document.querySelector("#info_modal-input-exp_date");
  const serial_num = document.querySelector("#info_modal-input-serial_num");
  const note = document.querySelector("#info_modal-input-note");

  title.value = profile.title;
  exp_date.value = profile.exp_date;
  serial_num.value = profile.serial_num;
  note.value = profile.note;

  const mod_button = document.querySelector("#modify-profile");
  const del_button = document.querySelector("#delete-profile");
  const cancel_button = document.querySelector("#cancel-profile");

  mod_button.addEventListener("click", function () {

  })
  // tag.value = profile.tag;
}

/**
 * Change the info_modal to editing mode. Change the corresponding
 * elements to <input></input> element; set the value of that input
 * with the corresponding profile.param
 *
 * 1. select the elements we need to update in the info_modal
 * 2. hide these elements
 * 3. show the input elements and update their value with profile.param
 * 4. add event listener to the save button and cancel button
 *    when clicking save or cancel btn, modal need to be changed back
 *    to the display mode (no input boxes)
 *
 * @param {Profile} profile an Profile object
 */
function change_info_modal_edit_mode(profile) {
  const title = document.querySelector("#info_modal-input-title");
  // let tag = document.querySelector("#info_modal-input-tag"); // haven't implement yet
  const exp_date = document.querySelector("#info_modal-input-exp_date");
  const serial_num = document.querySelector("#info_modal-input-serial_num");
  const note = document.querySelector("#info_modal-input-note");
  const s_button = document.querySelector("#modify-profile");
  const c_button = document.querySelector()

  title.value = profile.title;
  title.disabled = false;
  exp_date.value = profile.exp_date;
  exp_date.disabled = false;
  serial_num.value = profile.serial_num;
  serial_num.disabled = false;
  note.value = profile.note;
  note.disabled = false;
}

/**
 * Change the info_modal to display mode. Remove/hide (depends on your
 * implementation) <input> elements; create/display the non-input elements
 * (like <p></p> or others you choose to use)
 *
 * 1. select the input elements we need to update in the info_modal
 * 2. hide these elements
 * 3. show the non-input elements and update their value with profile.param
 * 4. add event listener to the modify button, which should
 *    change the displayed info to a input box so that user
 *    can modify them.
 * 5. add event listener to the delete button (should pop up a notification)
 *
 * @param {Profile} profile an Profile object
 */
function change_info_modal_display_mode(profile) {}

/**
 * Delete the passed-in profile. Need to delete
 * the corresponding card component, profile object, etc.
 *
 * 1. remove the profile from profile_list
 * 2. save the new profile_list to localStorage
 * 3. remove corresponding card component
 *
 * @param {Profile} profile an Profile object
 */
function delete_profile(profile) {}

/**
 * display all the cards with the same tag on main page
 *
 * 1. for each profile in profile_list, check if it has
 *    such a tag. if it has, add this profile object to a
 *    temp list.
 * 2. remove all card components in grid
 * 3. call add_profiles_to_doc(profiles) to display the
 *    profile we just added to the temp list
 *
 * @param {String} tag an tag
 */
function sort_by_tag(tag) {}

/**
 * Search the card by keyword. Display all the cards matching
 * that keyword (or sentence).
 *
 * 1. for each profile in profile_list, check all the params if
 *    there are strings matches the keyword. If there is, add the
 *    profile to a temp list
 * 2. remove all card components in grid
 * 3. call add_profiles_to_doc(profiles) to display the
 *    profile we just added to the temp list
 *
 * @param {String} keyWord a string
 */
function search(key_word) {}

export {
  create_profile,
  create_card,
  update_info_modal,
  change_info_modal_display_mode,
  change_info_modal_edit_mode,
  delete_profile,
  sort_by_tag,
  search,
  Profile
};
