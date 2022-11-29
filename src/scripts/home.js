/**
 * Main file containing main functions of Warrantracker
 */

import { setup_modify, setup_delete, setup_tag_recommend, setup_search } from "./setup.js";
import { Profile } from "./Profile.js";
import { get_profile_from_storage, save_profile_to_storage } from "./storage.js";

/** Global Variables */
let PROFILE_LIST = []; // store all profile object
let GRID; // the html element which is the parent for all profile cards
let NEW_PROFILE_BTN; // the first element in the grid (the card with a "+" sign);
let INFO_MODAL; // the modal showing up when clicking a profile card
let NEW_PROFILE_MODAL; // the modal showing up when clicking the new-profile-btn
let NEW_PROFILE_FORM; // the html form in new-profile-modal
let NEW_MODAL_INSTANCE; // bootstrap modal instance for new_profile_modal;
let INFO_MODAL_INSTANCE; // bootstrap modal instance for infoModal;
let CONFIRM_CANCEL_MODAL; // html modal for confirming cancel modification
let CONFIRM_CANCEL_MODIFY_INSTANCE; // bootstrap modal instance for CONFIRM_CANCEL_MODAL
let SELECTED_PROFILE; // Profile selected for editing and deleting
const ID_SET = new Set(); // all id's in existence
const TAG_MAP = new Map(); // key: tag (String), value: count for the tag (Number)
let FIRST_LOAD = true; // boolean to check if it is the first time laoding
const ACTIVE_TAGS = new Set(); // active tags for filtering by multiple tags
let ACTIVE_PROFILES = []; // All profiles currently being shown
let SEARCH_PROFILES = []; // all profiles capable of being shown (search feature)

window.addEventListener("DOMContentLoaded", init);

/**
 * Initialize page after load -- test change
 */
function init() {
  // select needed html elements
  GRID = document.querySelector("#grid");
  NEW_PROFILE_BTN = document.querySelector("#new-profile-btn");
  INFO_MODAL = document.querySelector("#info-modal");
  NEW_PROFILE_MODAL = document.querySelector("#new-modal");
  NEW_PROFILE_FORM = document.querySelector("#new-modal-form");
  NEW_MODAL_INSTANCE = new window.bootstrap.Modal(NEW_PROFILE_MODAL);
  INFO_MODAL_INSTANCE = new window.bootstrap.Modal(INFO_MODAL);
  CONFIRM_CANCEL_MODAL = document.querySelector("#confirm-cancel-modify-modal");
  CONFIRM_CANCEL_MODIFY_INSTANCE = new window.bootstrap.Modal(
    CONFIRM_CANCEL_MODAL
  );

  // get existing profiles from localStorage
  // generate card component and display them
  const stored_profiles = get_profile_from_storage();
  if (stored_profiles) {
    PROFILE_LIST.push(...stored_profiles);
    add_profiles_to_doc(stored_profiles);
    FIRST_LOAD = false;
  }

  // Initialize search profiles to all
  SEARCH_PROFILES = PROFILE_LIST;

  // create tag filter btn
  create_tag_btn();

  // add event listeners below
  // handle when user click save-btn in new profile modal
  NEW_PROFILE_FORM.addEventListener("submit", create_profile);

  // Set up action listeners for modals.
  setup_delete();
  setup_modify();
  setup_search();
  setup_tag_recommend();
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
    GRID.appendChild(curr_col);

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
  const title = NEW_PROFILE_MODAL.querySelector("#new-modal-title");
  const tag = NEW_PROFILE_MODAL.querySelector("#new-modal-tag"); // haven't implement yet
  const exp_date = NEW_PROFILE_MODAL.querySelector("#new-modal-exp_date");
  const serial_num = NEW_PROFILE_MODAL.querySelector("#new-modal-serial_num");
  const note = NEW_PROFILE_MODAL.querySelector("#new-modal-note");

  let id; // generate unique ID for profile
  do {
    id = Math.floor(Math.random() * Date.now());
  } while (ID_SET.has(id));

  // create a new profile object
  const new_profile = new Profile(
    id,
    title.value,
    rm_dupe_tags(tag.value),
    exp_date.value,
    serial_num.value,
    note.value
  );

  // save newProfile to localStorage
  PROFILE_LIST = [new_profile, ...PROFILE_LIST];
  save_profile_to_storage();

  // create a card component to display
  const curr_col = create_card(new_profile);
  GRID.insertBefore(curr_col, NEW_PROFILE_BTN.nextSibling);

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
  NEW_MODAL_INSTANCE.hide();
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
    SELECTED_PROFILE = profile;
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
  PROFILE_LIST = PROFILE_LIST.filter(
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
 * @returns {string[]} array of tags that match the given tag
 */
export function search_tag(tag) {
  const match_list = [];
  // if we got multiple tag in input textbox,
  // ignore previous tags for searching
  if (tag.includes(',')) {
    const temp = tag.split(',');
    tag = temp[temp.length - 1].trim();
  }
  PROFILE_LIST.forEach((profile) => {
    let cur_profile_tag_list = parse_profile_tags(profile);
    cur_profile_tag_list.forEach((cur_tag) => {
      if (
        profile.tag &&
        !match_list.includes(cur_tag) &&
        cur_tag.includes(tag)
      ) {
        match_list.push(cur_tag);
      }
    });
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
    class="btn btn-light tag-btn"
    data-bs-toggle="button"
    id="all-btn"
  >
    All
  </button>
  `;
  const all_btn = document.querySelector("#all-btn"); // all-btn element
  // display all cards if user clicks all-btn
  all_btn.addEventListener("click", () => {
    handle_tag_btn_click("all");
  });

  // set up event listener for other tag-btn
  PROFILE_LIST.forEach((profile) => {
    const cur_profile_tag_list = parse_profile_tags(profile);
    cur_profile_tag_list.forEach((tag) => {
      if (tag && !is_visited.has(tag)) {
        // if encounter a new tag, create the html element for the btn
        const curr_tag_btn = document.createElement("button");
        curr_tag_btn.setAttribute("type", "button");
        curr_tag_btn.setAttribute("class", "btn btn-light m-1 tag-btn");
        curr_tag_btn.setAttribute("data-bs-toggle", "button");
        curr_tag_btn.setAttribute("id", tag);
        curr_tag_btn.innerHTML = `${tag}`;

        // event listener for the btn
        curr_tag_btn.addEventListener("click", () => {
          handle_tag_btn_click(tag);
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
 * @param {string} tag - the tag associated with the btn
 */
function handle_tag_btn_click(tag) {
  const tag_btn_div = document.querySelector("#tag-btn-div");
  // if tag is all, disable all other filters
  if (tag === "all") {
    ACTIVE_TAGS.clear();
  } else if (ACTIVE_TAGS.has(tag)) {
    // if tag was previously active, set as inactive
    ACTIVE_TAGS.delete(tag);
    // if no active tags, set "all" as active
    if (ACTIVE_TAGS.size === 0) {
      tag_btn_div.children[0].classList.add("active");
    }
  } else {
    // otherwise add tag as active
    ACTIVE_TAGS.add(tag);
  }

  // Remove "active" class from buttons of inactive tags
  for (
    let i = ACTIVE_TAGS.size === 0 ? 1 : 0;
    i < tag_btn_div.childElementCount;
    i++
  ) {
    if (!ACTIVE_TAGS.has(tag_btn_div.children[i].innerHTML)) {
      tag_btn_div.children[i].classList.remove("active");
    }
  }

  tag_filter();
  display_selected_profile(ACTIVE_PROFILES);
}

/**
 * Takes active tags and sets active_profiles to only matching profiles
 */
function tag_filter() {
  // display all profiles if all is active
  if (ACTIVE_TAGS.size === 0) {
    ACTIVE_PROFILES = SEARCH_PROFILES;
    return;
  }
  // display the matching profiles of active tags
  ACTIVE_PROFILES = []; // store all profiles with this tag
  for (let i = 0; i < SEARCH_PROFILES.length; i++) {
    const cur_profile_tag_set = new Set(parse_profile_tags(SEARCH_PROFILES[i]));
    ACTIVE_PROFILES.push(SEARCH_PROFILES[i]);
    // if one of the selected tags does not appear in profile, do not show profile
    for (const t of ACTIVE_TAGS) {
      if (!cur_profile_tag_set.has(t)) {
        ACTIVE_PROFILES.pop();
        break;
      }
    }
  }
}

/**
 * Given a profile, returns profile's tags as an array
 * @param {Profile} profile
 * @returns {string[]} Array of tags (strings) for the given profile
 */
function parse_profile_tags(profile) {
  const arr = profile.tag.split(",");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
  }
  return arr;
}

/**
 * Given a tag list string, returns a copy without duplicate tags
 * @param {string} tag_list original tag list with potential duplicates
 * @returns {string} original string without duplicates
 */
function rm_dupe_tags(tag_list) {
  const orig = tag_list.split(","); // tag_list
  const tags = new Set(); // tags already added to out
  tags.add("all");
  tags.add("All");
  const no_dupe = [];
  for (let i = 0; i < orig.length; i++) {
    orig[i] = orig[i].trim();
    if (!tags.has(orig[i])) {
      tags.add(orig[i]);
      no_dupe.push(orig[i]);
    }
  }
  return no_dupe.join(",");
}

/**
 * Given an array contains some Profile Object,
 * display all the profile cards in the grid
 * @param {Array} profiles
 */
function display_selected_profile(profiles) {
  // remove curr cards in grid
  GRID.innerHTML = `
    <div class="col-sm-6 col-lg-4 p-2" id="new-profile-btn">
      <div
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#new-modal"
        class="card"
      >
        <ion-icon class="position-absolute top-50 start-50 translate-middle" name="add-outline" id="plus-icon"></ion-icon>
      </div>
    </div>
  `;

  // add selected profiles
  profiles.forEach((profile) => {
    const curr_card_wrapper = create_card(profile);
    GRID.appendChild(curr_card_wrapper);
  });
}

/**
 * Search the card by keyword. Display all the cards matching
 * that keyword (or sentence).
 *
 * Given active_profiles, filters the array to only contain profiles
 * matching the search query
 *
 * @param {string} query a string
 */
function search(query) {
  // split search query into array of words
  SEARCH_PROFILES = PROFILE_LIST;
  const query_arr = query.toLowerCase().split(" ");
  if (query.length === 0) {
    SEARCH_PROFILES = PROFILE_LIST;
    display_selected_profile(SEARCH_PROFILES);
    return;
  }
  // algorithm: convert each profile into set of key words
  // each element of query_arr must be within that set for the profile to match
  const search_match = []; // list of profiles that match search

  search_clr(search_match, query_arr);

  ACTIVE_PROFILES = search_match;
  SEARCH_PROFILES = ACTIVE_PROFILES;
  display_selected_profile(SEARCH_PROFILES);
}

/**
 * Sets search_match to contain all profiles that match the query
 *
 * @param {Profile[]} search_match Output parameter for query-matching profiles
 * @param {*} query_arr Array of queries in search
 */
function search_clr(search_match, query_arr) {
  for (let i = 0; i < PROFILE_LIST.length; i++) {
    let keyword_set = ""
    const curr = PROFILE_LIST[i];
    search_match.push(curr);

    // split title and add title to keyword set
    curr.title.split(" ").forEach((word) => {
      keyword_set += word;
    });

    // add each tag to keyword set
    parse_profile_tags(curr).forEach((tag) => {
      tag.split(" ").forEach((tag_word) => {
        keyword_set += " " + tag_word.toLowerCase();
      });
    });

    // add serial numbers and notes into keyword set
    keyword_set += " " + curr.serial_num.toLowerCase();

    curr.note.split(" ").forEach((word) => {
      keyword_set += word.toLowerCase();
    });

    for (let j = 0; j < query_arr.length; j++) {
      if (keyword_set.indexOf(query_arr[j]) === -1) {
        search_match.pop();
        break;
      }
    }
  }
}

export {
  ACTIVE_TAGS,
  ACTIVE_PROFILES,
  PROFILE_LIST,
  SELECTED_PROFILE,
  INFO_MODAL_INSTANCE,
  CONFIRM_CANCEL_MODIFY_INSTANCE,
  TAG_MAP,
  handle_tag_btn_click,
  save_profile_to_storage,
  create_profile,
  create_card,
  update_info_modal,
  delete_profile,
  rm_dupe_tags,
  search,
  Profile,
  create_tag_btn
};
