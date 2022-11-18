import { selected_profile, TAG_MAP, create_tag_btn, save_profile_to_storage, info_modal_instance, confirm_cancel_modify_instance, delete_profile } from './home.js'
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
  const confirm_cancel_btn = document.querySelector("#info-modal").querySelector(".btn-close")
  confirm_cancel_btn.addEventListener('click', () => {
    // Show confirm cancel modal if there was an unsaved change
    info_modal_instance.hide();
    if ((title.value !== selected_profile.title) || (exp_date.value !== selected_profile.exp_date) ||
      (serial_num.value !== selected_profile.serial_num) || (note.value !== selected_profile.note) || (tag.value !== selected_profile.tag)) {
      confirm_cancel_modify_instance.show();
    }
  });

  // Define behavior for modify button, update current profile and write to storage
  const mod_button = document.querySelector("#modify-profile");
  mod_button.addEventListener("click", () => {
    const req_card = document.getElementById(selected_profile.id);
    const card_title = req_card.querySelector(".card-title")
    card_title.innerHTML = title.value;
    const card_text = req_card.querySelector(".card-text");
    card_text.innerHTML = note.value;

    // handle tag changing
    TAG_MAP.set(selected_profile.tag, TAG_MAP.get(selected_profile.tag) - 1);
    if (TAG_MAP.get(selected_profile.tag) === 0) {
      TAG_MAP.delete(selected_profile.tag);
    }
    selected_profile.tag = tag.value;
    TAG_MAP.set(tag.value, TAG_MAP.get(tag.value) + 1 || 1);
    const tag_html_list = document.querySelector("#tag-btn-div");
    create_tag_btn();

    // handle other properties changing
    selected_profile.title = title.value;
    // profile.tag = tag.value;
    selected_profile.exp_date = exp_date.value;
    selected_profile.serial_num = serial_num.value;
    selected_profile.note = note.value;
    save_profile_to_storage();
    info_modal_instance.hide();
  });
}

/**
 * Set up action listeners for profile deletion
 * Delete button is part of info modal.
 */
export function setup_delete() {
  const confirm_delete_modal = document.querySelector("#confirm-delete-modal");

  const confirm_delete_btn = confirm_delete_modal.getElementsByClassName('modal-footer')[0].getElementsByClassName('btn btn-danger')[0];
  confirm_delete_btn.addEventListener('click', () => {
    delete_profile(selected_profile);
  });
}

/**
 * Add action listeners for tag edit boxes in create/info modals
 * @param {function} search_tag Search tag function, might remove from params later
 */
export function setup_tag_recommend(search_tag) {
  // set up listener for new_modal
  const new_modal_tag = document.querySelector('#new-modal-tag');
  new_modal_tag.addEventListener('input', () => {
    handle_tag_input_change(search_tag, new_modal_tag, 'new');
  });

  // set up listener for info_modal
  const info_modal_tag = document.querySelector('#info-modal-input-tag');
  info_modal_tag.addEventListener('input', () => {
    handle_tag_input_change(search_tag, info_modal_tag, 'info');
  });
}

/**
 * Update tag suggestion list that appears in new profile/info modal
 * @param {function} search_tag Search tag function, might remove from params later
 * @param {HTMLInputElement} tag_input HTML input element currently being edited by user
 * @param {String} type New modal 'new' or info modal 'info'
 */
function handle_tag_input_change(search_tag, tag_input, type) {
  // find all matched tag names
  const match_list = search_tag(tag_input.value);
  console.log(match_list)
  const tag_html_list = document.querySelector(type === 'new' ? '#new-modal-tag-list' : '#info-modal-tag-list');
  // clear the html <li></li>
  tag_html_list.innerHTML = ``;

  // update html <li></li>
  match_list.forEach((tag_name) => {
    const curr_li = document.createElement('li');
    curr_li.innerHTML = `<a class="dropdown-item" href="#">${tag_name}</a>`
    tag_html_list.appendChild(curr_li);
    curr_li.addEventListener('click', () => {
      tag_input.value = tag_name;
    })
  })
}
