import { setup_modify, setup_delete, setup_tag_recommend } from "./setup.js";
/**
 * Main file containing main functions of Warrantracker
 */
/** Global Variables */
let profile_list = []; // store all profile object
let grid; // the html element which is the parent for all profile cards
let new_profile_btn; // the first element in the grid (the card with a "+" sign);
let info_modal; // the modal showing up when clicking a profile card
let new_profile_modal; // the modal showing up when clicking the new-profile-btn
let new_profile_form;
let new_modal_instance; // bootstrap modal instance for new_profile_modal;
let info_modal_instance; // boostrap modal instance for infoModal;
let confirm_cancel_modal;
let confirm_cancel_modify_instance;
let selected_profile; // Profile selected for editing and deleting
const ID_SET = new Set(); // all id's in existence
const TAG_MAP = new Map();
let FIRST_LOAD = true;
let active_tags = new Set(); // active tags for filtering by multiple tags

window.addEventListener("DOMContentLoaded", init);

/**
 * Initialize page after load -- test change
 */
function init() {
  // select needed html elements
  grid = document.querySelector("#grid");
  new_profile_btn = document.querySelector("#new-profile-btn");
  info_modal = document.querySelector("#info-modal");
  new_profile_modal = document.querySelector("#new-modal");
  new_profile_form = document.querySelector("#new-modal-form");
  new_modal_instance = new window.bootstrap.Modal(new_profile_modal);
  info_modal_instance = new window.bootstrap.Modal(info_modal);
  confirm_cancel_modal = document.querySelector("#confirm-cancel-modify-modal");
  confirm_cancel_modify_instance = new window.bootstrap.Modal(
    confirm_cancel_modal
  );

  // get existing profiles from localStorage
  // generate card component and display them
  const stored_profiles = get_profile_from_storage();
  if (stored_profiles) {
    profile_list.push(...stored_profiles);
    add_profiles_to_doc(stored_profiles);
    FIRST_LOAD = false;
  }

  create_tag_btn();
  // add more opeartions if needed below

  // add event listeners below

  // handle when user click save-btn in new profile modal
  new_profile_form.addEventListener("submit", create_profile);

  // Set up action listeners for modals.
  setup_delete();
  setup_modify();
  setup_tag_recommend(search_tag);
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
function Profile(id, title, tag, exp_date, serial_num, note) {
  this.id = id;
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
 * Only call this function in init()
 * @param {Profile[]} profiles an array contains profile objects
 */
function add_profiles_to_doc(profiles) {
  ID_SET.clear();
  profiles.forEach((profile) => {
    const curr_col = create_card(profile);
    ID_SET.add(profile.id);
    grid.appendChild(curr_col);

    // set up TAG_MAP on first load using stored profile
    if (FIRST_LOAD && profile.tag) {
      TAG_MAP.set(profile.tag, TAG_MAP.get(profile.tag) + 1 || 1);
    }
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

  let id; // generate unique ID for profile
  do {
    id = Math.floor(Math.random() * Date.now());
  } while (ID_SET.has(id));

  // create a new profile object
  const new_profile = new Profile(
    id,
    title.value,
    tag.value,
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

  // if tag value not exist, create a new tag btn
  TAG_MAP.set(new_profile.tag, TAG_MAP.get(new_profile.tag) + 1 || 1);
  create_tag_btn();

  // clear input value of the form
  title.value = "";
  tag.value = "";
  exp_date.value = "";
  serial_num.value = "";
  note.value = "";

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
  card_wrapper.setAttribute("id", `${profile.id}`);

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
    selected_profile = profile;
  });
  return card_wrapper;
}

/**
 * Update info_modal with corresponding profile info
 * by changing each <input> value to the corresponding
 * value of the profile
 * @param {Profile} profile an Profile object
 */
function update_info_modal(profile) {
  if (!profile) return;

  const title = document.querySelector("#info-modal-input-title");
  const tag = document.querySelector("#info-modal-input-tag"); // haven't implement yet
  const exp_date = document.querySelector("#info-modal-input-exp_date");
  const serial_num = document.querySelector("#info-modal-input-serial_num");
  const note = document.querySelector("#info-modal-input-note");

  title.value = profile.title;
  tag.value = profile.tag;
  exp_date.value = profile.exp_date;
  serial_num.value = profile.serial_num;
  note.value = profile.note;
}

/**
 * Delete the passed-in profile. Need to delete
 * the corresponding card component, profile object
 * and associated tag
 * @param {Profile} profile - an Profile object
 */
function delete_profile(profile) {
  if (!profile) return;

  // Get the html card and remove the element
  const id = profile.id;
  const req_card = document.getElementById(id);
  req_card.remove();

  // Remove profile from list and save list
  profile_list = profile_list.filter(
    (curr_prof) => curr_prof.id !== profile.id
  );

  // decrease tag count by 1
  TAG_MAP.set(profile.tag, TAG_MAP.get(profile.tag) - 1);

  // remove the tag from map if its count is 0
  // re-create all the filter btns
  if (TAG_MAP.get(profile.tag) === 0) {
    TAG_MAP.delete(profile.tag);
    create_tag_btn();
  }

  // store updated profile list to storage
  save_profile_to_storage();
}

/**
 * Returns a subset of tag of elements that match the given input
 * @param {string} tag tag to search for in existing tags
 * @returns {Profile[]} array of tags that match the given tag
 */
export function search_tag(tag) {
  const match_list = [];
  profile_list.forEach((profile) => {
    let cur_profile_tag_list = profile.tag.split(",");
    cur_profile_tag_list.forEach((cur_tag) => {
      if (
        profile.tag &&
        !match_list.includes(cur_tag) &&
        profile.tag.includes(cur_tag)
      ) {
        match_list.push(cur_tag);
      }
    })
  });
  return match_list;
}

/**
 * Remove curr tag btn filters and re-create
 * all tag btn filters again
 */
function create_tag_btn() {
  const tag_html_list = document.querySelector("#tag-btn-div"); // div element store all tag btn element
  const is_visited = new Set(); // set of profile tags
  let previous_btn_active = "All"; // set default active btn to all-btn

  // find active btn
  for (const tag_btn of tag_html_list.children) {
    if (tag_btn.classList.contains("active")) {
      previous_btn_active = tag_btn.innerHTML.replace(/\s+/g, "");
    }
  }

  // remove all tag btn elements except for all-btn
  tag_html_list.innerHTML = `
  <button
    type="button"
    class="btn btn-light"
    data-bs-toggle="button"
    id="all-btn"
  >
    All
  </button>
  `;
  const all_btn = document.querySelector("#all-btn"); // all-btn element
  // display all cards if user clicks all-btn
  all_btn.addEventListener("click", () => {
    handle_tag_btn_click(all_btn, "all");
  });

  // set up event listener for other tag-btn
  profile_list.forEach((profile) => {
    let cur_profile_tag_list = profile.tag.split(",");
    cur_profile_tag_list.forEach((tag) => {
      if (tag && !is_visited.has(tag)) {
        // if encounter a new tag, create the html element for the btn
        const curr_tag_btn = document.createElement("button");
        curr_tag_btn.setAttribute("type", "button");
        curr_tag_btn.setAttribute("class", "btn btn-light");
        curr_tag_btn.setAttribute("data-bs-toggle", "button");
        curr_tag_btn.setAttribute("id", tag);
        curr_tag_btn.innerHTML = `${tag}`;

        // event listener for the btn
        curr_tag_btn.addEventListener("click", () => {
          handle_tag_btn_click(curr_tag_btn, tag);
        });
        // display the btn by actually adding it to html
        tag_html_list.append(curr_tag_btn);
        is_visited.add(tag);
      }
    });
  });

  // re-select the previous active btn
  let is_find = false;
  for (const tag_btn of tag_html_list.children) {
    if (tag_btn.innerHTML.replace(/\s+/g, "") === previous_btn_active) {
      tag_btn.click();
      is_find = true;
    }
  }
  // if curr btn is removed (this tag is deleted), automatically select all-btn
  if (!is_find) {
    all_btn.click();
  }
}

/**
 * Handle user-click on tag filters
 * @param {HTMLButtonElement} curr_tag_btn - Tag button clicked
 * @param {string} tag - the tag associated with the btn
 */
function handle_tag_btn_click(curr_tag_btn, tag) {
  console.log(tag);
  // Set all tag button filters as inactive except the curr_tag_btn (being clicked)
  // TODO: fix suggestions for tags
  const tag_btn_div = document.querySelector("#tag-btn-div");
  // if tag is all, disable all other filters
  if (tag === "all") {
    active_tags.clear();
  } else if (active_tags.has(tag)) {
    // if tag was previously active, set as inactive
    active_tags.delete(tag);
    // if no active tags, set all as true
    if (active_tags.size === 0) {
      tag_btn_div.children[0].classList.add("active");
    }
  } else {
    active_tags.add(tag);
  }

  let i = active_tags.size === 0 ? 1 : 0;
  for (; i < tag_btn_div.childElementCount; i++) {
    // Remove "active" class from buttons of inactive tags
    if (!active_tags.has(tag_btn_div.children[i].innerHTML)) {
      tag_btn_div.children[i].classList.remove("active");
    }
  }

  // if curr_tag_btn is active, display the selected cards
  const profile_list_tag = []; // store all profiles with this tag
  for (i = 0; i < profile_list.length; i++) {
    let cur_profile_tag_list = profile_list[i].tag.split(",");
    profile_list_tag.push(profile_list[i]);
    for (let t of active_tags) {
      if (cur_profile_tag_list.indexOf(t) === -1) {
        profile_list_tag.pop();
        break;
      }
    }
  }
  if (active_tags.size === 0) {
    display_selected_profile(profile_list);
  } else {
    display_selected_profile(profile_list_tag);
  }
}

/**
 * Given an array contains some Profile Object,
 * display all the profile cards in the grid
 * @param {Array} profiles
 */
function display_selected_profile(profiles) {
  // remove curr cards in grid
  grid.innerHTML = `
    <div class="col-sm-6 col-lg-4 p-2" id="new-profile-btn">
      <div
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#new-modal"
        class="card"
      >
        <h5 class="position-absolute top-50 start-50 translate-middle">
          +
        </h5>
      </div>
    </div>
  `;

  // add selected profiles
  profiles.forEach((profile) => {
    const curr_card_wrapper = create_card(profile);
    grid.appendChild(curr_card_wrapper);
  });
}

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
 * @param {string} keyWord a string
 */
function search(key_word) {}

export {
  selected_profile,
  info_modal_instance,
  confirm_cancel_modify_instance,
  save_profile_to_storage,
  create_profile,
  create_card,
  update_info_modal,
  delete_profile,
  search,
  Profile,
  TAG_MAP,
  create_tag_btn
};
