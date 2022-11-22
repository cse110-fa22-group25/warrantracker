import { PROFILE_LIST } from "./home.js"

/**
 * Retreat the existing profile_list in localStorage.
 * Return the parsed array in which there are profile
 * object. If nothing in the localStorage, return nothing.
 * @returns {Profile[]} an array contains profile objects or nothing
 */
export function get_profile_from_storage() {
  const profiles = localStorage.getItem("profiles");
  if (!profiles) return;
  return JSON.parse(profiles);
}

/**
 * save the profile_list to the localStorage
 */
export function save_profile_to_storage() {
  localStorage.setItem("profiles", JSON.stringify(PROFILE_LIST));
}
