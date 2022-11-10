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
let modify_on = false;
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
  let stored_profiles = get_profile_from_storage();
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
 * Retreat the existing profileList in localStorage.
 * Return the parsed array in which there are profile
 * object. If nothing in the localStorage, return nothing.
 * @returns {Profile[]} an array contains profile objects or nothing
 */
function get_profile_from_storage() {
  let profiles = localStorage.getItem("profiles");
  if (!profiles) return;
  return JSON.parse(profiles);
}

/**
 * save the profileList to the localStorage
 */
function save_profile_to_storage() {
  localStorage.setItem("profiles", JSON.stringify(profile_list));
}

/**
 * Create bootstrap card component to display the
 * stored profileList in the localStorage
 * @param {Profile[]} profiles an array contains profile objects
 */
function add_profiles_to_doc(profiles) {
  profiles.forEach((profile) => {
    let curr_col = create_card(profile);
    grid.append(curr_col);
  });
}

/**
 * Event handler for clicking the save btn in newProfileModal
 * 1. select needed html elements in newProfileModal
 * 2. create a new Profile object
 * 3. save the profile to localStorage
 * 4. create a card component on the main page
 * 5. clear input value in the newProfileModal
 */
function create_profile() {
  // select needed html elements in newProfileModal
  let title = new_profile_modal.querySelector("#new-modal-title");
  let tag = new_profile_modal.querySelector("#new-modal-tag"); // haven't implement yet
  let exp_date = new_profile_modal.querySelector("#new-modal-exp_date");
  let serial_num = new_profile_modal.querySelector("#new-modal-serial_num");
  let note = new_profile_modal.querySelector("#new-modal-note");

  // create a new profile object
  let new_profile = new Profile(
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
  let curr_col = create_card(new_profile);
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
 * 3. add an event listener to the cardWrapper
 *    (when user clicks that card, the handler need to update
 *     infoModal to display the corresponding info)
 * 4. return the newly created cardWrapper
 * @param {Profile} profile -  an Profile object
 * @returns {HTMLDivElement} card wrapper
 */
function create_card(profile) {
  let card_wrapper = document.createElement("div");
  card_wrapper.setAttribute("class", "col-sm-6 col-lg-4 p-2");

  let card = document.createElement("div");
  card.setAttribute("type", "button");
  card.setAttribute("data-bs-toggle", "modal");
  card.setAttribute("data-bs-target", "#info-modal");
  card.setAttribute("class", "card");

  let card_body = document.createElement("div");
  card_body.setAttribute("class", "card-body");

  let card_title = document.createElement("h5");
  card_title.innerHTML = `${profile.title}`;
  card_title.setAttribute("class", "card-title");

  let card_text = document.createElement("p");
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
 * update infoModal with corresponding profile info
 * 1. hide all the input element (<input>, <textarea>)
 * 2. select the elements we need to update in the infoModal
 * 3. change its value (innerHTML) to the corresponding param
 *    in the passed-in profile object
 * 4. add event listener to the modify and delete button, which should
 *    change the displayed info to a input box so that user
 *    can modify them.
 *
 * @param {Profile} profile an Profile object
 */
function update_info_modal(profile) {
  let title = document.querySelector("#infoModal-input-title");
  let tag = document.querySelector("#infoModal-input-tag"); // haven't implement yet
  let exp_date = document.querySelector("#infoModal-input-exp_date");
  let serial_num = document.querySelector("#infoModal-input-serial_num");
  let note = document.querySelector("#infoModal-input-note");

  title.value = profile.title;
  exp_date.value = profile.exp_date;
  serial_num.value = profile.serial_num;
  note.value = profile.note;

  let mod_button = document.querySelector("#modify-profile");
  let del_button = document.querySelector("#delete-profile");
  let cancel_button = document.querySelector("#cancel-profile");

  mod_button.addEventListener("click", function () {

  })
  // tag.value = profile.tag;
}

/**
 * Change the infoModal to editing mode. Change the corresponding
 * elements to <input></input> element; set the value of that input
 * with the corresponding profile.param
 *
 * 1. select the elements we need to update in the infoModal
 * 2. hide these elements
 * 3. show the input elements and update their value with profile.param
 * 4. add event listener to the save button and cancel button
 *    when clicking save or cancel btn, modal need to be changed back
 *    to the display mode (no input boxes)
 *
 * @param {Profile} profile an Profile object
 */
function change_info_modal_edit_mode(profile) {
  let title = document.querySelector("#infoModal-input-title");
  // let tag = document.querySelector("#infoModal-input-tag"); // haven't implement yet
  let exp_date = document.querySelector("#infoModal-input-exp_date");
  let serial_num = document.querySelector("#infoModal-input-serial_num");
  let note = document.querySelector("#infoModal-input-note");
  let s_button = document.querySelector("#modify-profile");
  let c_button = document.querySelector()

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
 * Change the infoModal to display mode. Remove/hide (depends on your
 * implementation) <input> elements; create/display the non-input elements
 * (like <p></p> or others you choose to use)
 *
 * 1. select the input elements we need to update in the infoModal
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
 * 1. remove the profile from profileList
 * 2. save the new profileList to localStorage
 * 3. remove corresponding card component
 *
 * @param {Profile} profile an Profile object
 */
function delete_profile(profile) {}

/**
 * display all the cards with the same tag on main page
 *
 * 1. for each profile in profileList, check if it has
 *    such a tag. if it has, add this profile object to a
 *    temp list.
 * 2. remove all card components in grid
 * 3. call addProfilesToDocument(profiles) to display the
 *    profile we just added to the temp list
 *
 * @param {String} tag an tag
 */
function sort_by_tag(tag) {}

/**
 * Search the card by keyword. Display all the cards matching
 * that keyword (or sentence).
 *
 * 1. for each profile in profileList, check all the params if
 *    there are strings matches the keyword. If there is, add the
 *    profile to a temp list
 * 2. remove all card components in grid
 * 3. call addProfilesToDocument(profiles) to display the
 *    profile we just added to the temp list
 *
 * @param {String} keyWord a string
 */
function search(key_word) {}

module.exports = {
  create_profile: create_profile,
  create_card: create_card,
  update_info_modal: update_info_modal,
  change_info_modal_display_mode: change_info_modal_display_mode,
  change_info_modal_edit_mode: change_info_modal_edit_mode,
  delete_profile: delete_profile,
  ort_by_tag: sort_by_tag,
  search,
  Profile
};
