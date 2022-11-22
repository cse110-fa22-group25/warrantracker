import {
  SELECTED_PROFILE,
  TAG_MAP,
  create_tag_btn,
  save_profile_to_storage,
  INFO_MODAL_INSTANCE,
  CONFIRM_CANCEL_MODIFY_INSTANCE,
  delete_profile,
  rm_dupe_tags,
  search_tag
} from "./home.js";
/**
 * This file contains the definitions for some routines for some single-use
 * setup functions for stuff such as actionlisteners.
 */

/**
 * Sets up action listeners for info modal.
 */
export function setup_modify() {
  const title = document.querySelector("#info-modal-input-title");
  const tag = document.querySelector("#info-modal-input-tag"); // haven't implement yet
  const exp_date = document.querySelector("#info-modal-input-exp_date");
  const serial_num = document.querySelector("#info-modal-input-serial_num");
  const note = document.querySelector("#info-modal-input-note");

  // Cancel unsaved changes modal setup
  const confirm_cancel_btn = document
    .querySelector("#info-modal")
    .querySelector(".btn-close");
  confirm_cancel_btn.addEventListener("click", () => {
    // Show confirm cancel modal if there was an unsaved change
    INFO_MODAL_INSTANCE.hide();
    if (
      title.value !== SELECTED_PROFILE.title ||
      exp_date.value !== SELECTED_PROFILE.exp_date ||
      serial_num.value !== SELECTED_PROFILE.serial_num ||
      note.value !== SELECTED_PROFILE.note ||
      tag.value !== SELECTED_PROFILE.tag
    ) {
      CONFIRM_CANCEL_MODIFY_INSTANCE.show();
    }
  });

  // Define behavior for modify button, update current profile and write to storage
  const mod_button = document.querySelector("#modify-profile");
  mod_button.addEventListener("click", () => {
    const req_card = document.getElementById(SELECTED_PROFILE.id);
    const card_title = req_card.querySelector(".card-title");
    card_title.innerHTML = title.value;
    const card_text = req_card.querySelector(".card-text");
    card_text.innerHTML = note.value;

    // Decrease tag count for previous tag by 1
    TAG_MAP.set(SELECTED_PROFILE.tag, TAG_MAP.get(SELECTED_PROFILE.tag) - 1);
    // if no other profiles use this tag, remove it from map
    if (TAG_MAP.get(SELECTED_PROFILE.tag) === 0) {
      TAG_MAP.delete(SELECTED_PROFILE.tag);
    }
    // update the profile's tag value with user input
    tag.value = rm_dupe_tags(tag.value);
    SELECTED_PROFILE.tag = tag.value;
    // update tag count
    TAG_MAP.set(tag.value, TAG_MAP.get(tag.value) + 1 || 1);
    // recreate filter btns
    create_tag_btn();

    // handle other properties changing
    SELECTED_PROFILE.title = title.value;
    SELECTED_PROFILE.exp_date = exp_date.value;
    SELECTED_PROFILE.serial_num = serial_num.value;
    SELECTED_PROFILE.note = note.value;
    save_profile_to_storage();
    INFO_MODAL_INSTANCE.hide();
  });
}

/**
 * Set up action listeners for profile deletion
 * Delete button is part of info modal.
 */
export function setup_delete() {
  const confirm_delete_modal = document.querySelector("#confirm-delete-modal");

  const confirm_delete_btn = confirm_delete_modal
    .getElementsByClassName("modal-footer")[0]
    .getElementsByClassName("btn btn-danger")[0];
  confirm_delete_btn.addEventListener("click", () => {
    delete_profile(SELECTED_PROFILE);
  });
}

/**
 * Add action listeners for tag edit boxes in create/info modals
 */
export function setup_tag_recommend() {
  // set up listener for new_modal
  const new_modal_tag = document.querySelector("#new-modal-tag");
  new_modal_tag.addEventListener("input", () => {
    handle_tag_input_change(new_modal_tag, "new");
  });

  // set up listener for info_modal
  const info_modal_tag = document.querySelector("#info-modal-input-tag");
  info_modal_tag.addEventListener("input", () => {
    handle_tag_input_change(info_modal_tag, "info");
  });
}

/**
 * Update tag suggestion list that appears in new profile/info modal
 * @param {HTMLInputElement} tag_input HTML input element currently being edited by user
 * @param {string} type New modal 'new' or info modal 'info'
 */
function handle_tag_input_change(tag_input, type) {
  // find all matched tag names
  const match_list = search_tag(tag_input.value);
  const tag_html_list = document.querySelector(
    type === "new" ? "#new-modal-tag-list" : "#info-modal-tag-list"
  );
  // clear the html <li></li>
  tag_html_list.innerHTML = ``;

  // update html <li></li>
  match_list.forEach((tag_name) => {
    const curr_li = document.createElement("li");
    curr_li.innerHTML = `<a class="dropdown-item" href="#">${tag_name}</a>`;
    tag_html_list.appendChild(curr_li);
    curr_li.addEventListener("click", () => {
      // If multiple tags in text field, don't erase previous tags
      const last_idx = tag_input.value.lastIndexOf(",");
      if (last_idx !== -1) {
        tag_input.value = tag_input.value.substring(0, last_idx + 1) + tag_name;
      } else {
        tag_input.value = tag_name;
      }
    });
  });
}
