// home.js

/** Global Variables */
let profileList = []; // store all profile object
let grid; // the html element which is the parent for all profile cards
let newProfileBtn; // the first element in the grid (the card with a "+" sign);
let infoModal; // the modal showing up when clicking a profile card
let newProfileModal; // the modal showing up when clicking the new-profile-btn
let newProfileForm;
let newModalInstance; // bootstrap modal instance for newPorifleModal;
let infoModalInstance; // boostrap modal instance for inforModal;
let selectedProfile; // Profile selected for editing and deleting
// add more below

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize page after load -- test change
 */
function init() {
  // select needed html elements
  grid = document.querySelector('#grid');
  newProfileBtn = document.querySelector("#new-profile-btn");
  infoModal = document.querySelector("#info-modal");
  newProfileModal = document.querySelector("#new-modal");
  newProfileForm = document.querySelector('#new-modal-form');
  newModalInstance = new window.bootstrap.Modal(newProfileModal);
  infoModalInstance = new window.bootstrap.Modal(infoModal);

  // get existing profiles from localStorage
  // generate card component and display them
  let storedProfiles = getProfileFromStorage();
  if (storedProfiles) {
    profileList.push(...storedProfiles);
    addProfilesToDocument(storedProfiles);
  }

  // add more opeartions below

  // add event listeners below
  // handle when user click save-btn in new profile modal
  newProfileForm.addEventListener("submit", createProfile);

  // Delete button and the event listner
  let confirmModal = document.querySelector("#confirm-modal");
  let deleteBtn = confirmModal.getElementsByClassName('modal-footer')[0].getElementsByClassName('btn btn-primary')[0];
  deleteBtn.addEventListener('click', ()=> {
    //if(confirm('You are about to delete profile for \n' + selectedProfile.title)){
    deleteProfile(selectedProfile);
    //}
  });

}

/**
 * Construct a new Profile Object using the pass-in arguments
 * @constructor
 * @param {string} title - the name of the product
 * @param {string} tag - the tag of the product
 * @param {string} expDate - the expiration date of the product
 * @param {string} serialNum - the serial number of the product
 * @param {string} note - the additional notes for the product
 */
function Profile(title, tag, expDate, serialNum, note) {
  this.title = title;
  this.tag = tag;
  this.expDate = expDate;
  this.serialNum = serialNum;
  this.note = note;
}

/**
 * Retreat the existing profileList in localStorage.
 * Return the parsed array in which there are profile
 * object. If nothing in the localStorage, return nothing.
 * @returns {Profile[]} an array contains profile objects or nothing
 */
function getProfileFromStorage() {
  let profiles = localStorage.getItem("profiles");
  if (!profiles) return;
  return JSON.parse(profiles);
}

/**
 * save the profileList to the localStorage
 */
function saveProfileToStorage() {
  localStorage.setItem("profiles", JSON.stringify(profileList));
}

/**
 * Create bootstrap card component to display the
 * stored profileList in the localStorage
 * @param {Profile[]} profiles an array contains profile objects
 */
function addProfilesToDocument(profiles) {
  profiles.forEach((profile) => {
    let currCol = createCard(profile);
    grid.append(currCol);
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
function createProfile() {
  // select needed html elements in newProfileModal
  let title = newProfileModal.querySelector("#new-modal-title");
  let tag = newProfileModal.querySelector("#new-modal-tag"); // haven't implement yet
  let expDate = newProfileModal.querySelector("#new-modal-expDate");
  let serialNum = newProfileModal.querySelector("#new-modal-serialNum");
  let note = newProfileModal.querySelector("#new-modal-note");

  // create a new profile object
  let newProfile = new Profile(
    title.value,
    null,
    expDate.value,
    serialNum.value,
    note.value
  );

  // save newProfile to localStorage
  profileList = [newProfile, ...profileList];
  saveProfileToStorage();

  // create a card component to display
  let currCol = createCard(newProfile);
  grid.insertBefore(currCol, newProfileBtn.nextSibling);

  // clear input value of the form
  title.value = "";
  expDate.value = "";
  expDate.value = "";
  serialNum.value = "";
  note.value = "";
  // tag.value = "bedroom1";

  // hide bootstrap modal
  newModalInstance.hide();
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
function createCard(profile) {
  let cardWrapper = document.createElement("div");
  cardWrapper.setAttribute("class", "col-sm-6 col-lg-4 p-2");
  cardWrapper.setAttribute("id", `${profile.title}`);

  let card = document.createElement("div");
  card.setAttribute("type", "button");
  card.setAttribute("data-bs-toggle", "modal");
  card.setAttribute("data-bs-target", "#info-modal");
  card.setAttribute("class", "card");

  let cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  let cardTitle = document.createElement("h5");
  cardTitle.innerHTML = `${profile.title}`;
  cardTitle.setAttribute("class", "card-title");

  let cardText = document.createElement("p");
  cardText.setAttribute("class", "card-text");
  cardText.innerHTML = `${profile.note}`;

  // can add some btn or other needed elements here

  // construct the Card Components here
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(cardBody);
  cardWrapper.appendChild(card);

  // add a event listener to the component
  // when clicking, update the info modal with its info
  cardWrapper.addEventListener("click", () => {
    updateInfoModal(profile);
    selectedProfile = profile;
  });
  return cardWrapper;
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
function updateInfoModal(profile) {
  let title = document.querySelector("#infoModal-input-title");
  let tag = document.querySelector("#infoModal-input-tag"); // haven't implement yet
  let expDate = document.querySelector("#infoModal-input-expDate");
  let serialNum = document.querySelector("#infoModal-input-serialNum");
  let note = document.querySelector("#infoModal-input-note");

  title.value = profile.title;
  expDate.value = profile.expDate;
  serialNum.value = profile.serialNum;
  note.value = profile.note;
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
function changeInfoModalToEditMode(profile) {

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
function changeInfoModalToDisplayMode(profile) {}

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
function deleteProfile(profile) {
  if(!profile) return;
 
  let name = profile.title;
  // Get the card and remove the element
  let reqCard = document.getElementById(name);
  reqCard.remove();
  // Remove profile from list and save list
  profileList = profileList.filter(currProf => currProf.title != profile.title);
  saveProfileToStorage();
}

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
function sortByTag(tag) {}

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
function search(keyWord) {}

module.exports = {
  createProfile,
  createCard,
  updateInfoModal,
  changeInfoModalToDisplayMode,
  changeInfoModalToEditMode,
  deleteProfile,
  sortByTag,
  search,
  Profile
};
