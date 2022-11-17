import { selected_profile, save_profile_to_storage, info_modal_instance, confirm_cancel_modify_instance, delete_profile } from './home.js'
/**
 * This file contains the definitions for some routines for some single-use
 * setup functions for stuff such as actionlisteners.
 */

/**
 * Sets up action listeners for info modal.
 */
function setup_modify() {
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
      (serial_num.value !== selected_profile.serial_num) || (note.value !== selected_profile.note)) {
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
function setup_delete() {
  const confirm_delete_modal = document.querySelector("#confirm-delete-modal");

  const confirm_delete_btn = confirm_delete_modal.getElementsByClassName('modal-footer')[0].getElementsByClassName('btn btn-danger')[0];
  confirm_delete_btn.addEventListener('click', () => {
    delete_profile(selected_profile);
  });
}

export {
  setup_modify,
  setup_delete
};
