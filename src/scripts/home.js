// home.js

/**
 * Global Variables
 */
let profileList = []; // store all profile object
let grid; // the html element which is the parent for all profile cards
let newProfileBtn; // the first element in the grid (the card with a "+" sign);
let infoModal; // the modal showing up when clicking a profile card
let newProfileModal; // the modal showing up when clicking the new-profile-btn
// add more below

window.addEventListener('DOMContentLoaded', init);

/**
 * Initialize page after load -- test change
 */
function init() {
  // select needed html elements
  grid = document.querySelector('#grid');
  newProfileBtn = document.querySelector("#new-profile-btn");
  infoModal = document.querySelector("#infoModal");
  newProfileModal = document.querySelector("#newProfileModal");

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
  newProfileModal
    .querySelector("#createProfile")
    .addEventListener("click", createProfile);
}

/**
 * Construct a new Profile Object using the pass-in arguments
 *
 * @param title the name of the product
 * @param tag the tag of the product
 * @param expDate the expiration date of the product
 * @param serialNum the serial number of the product
 * @param note the additional notes for the product
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
 *
 * @return an array contains profile objects or nothing
 */
function getProfileFromStorage() {
  let profiles = localStorage.getItem("profiles");
  if (!profiles) return;
  return JSON.parse(profiles);
}

/**
 * save the profileList to the localStorage
 */
function saveProfileToStoratge() {
  localStorage.setItem("profiles", JSON.stringify(profileList));
}

/**
 * Create bootstrap card component to display the
 * stored profileList in the localStorage
 *
 * @param profiles an array contains profile objects
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
  let title = newProfileModal.querySelector("#newProfileModal-title");
  let tag = null; // haven't implement yet
  let expDate = newProfileModal.querySelector("#newProfileModal-expDate");
  let serialNum = newProfileModal.querySelector("#newProfileModal-serialNum");
  let note = newProfileModal.querySelector("#newProfileModal-note");

  // create a new profile object
  let newProfile = new Profile(
    title.value,
    tag,
    expDate.value,
    serialNum.value,
    note.value
  );

  // save newProfile to localStorage
  profileList = [newProfile, ...profileList];
  saveProfileToStoratge();

  // create a card component to display
  let currCol = createCard(newProfile);
  grid.insertBefore(currCol, newProfileBtn.nextSibling);

  // clear input value of the form
  title.value = "";
  expDate.value = "";
  expDate.value = "";
  serialNum.value = "";
  note.value = "";
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
 *
 * @param profile an Profile object
 */
function createCard(profile) {
  let cardWrapper = document.createElement("div");
  cardWrapper.setAttribute("class", "col-sm-6 col-xl-4 p-2");

  let card = document.createElement("div");
  card.setAttribute("type", "button");
  card.setAttribute("data-bs-toggle", "modal");
  card.setAttribute("data-bs-target", "#infoModal");
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
 * @param profile an Profile object
 */
function updateInfoModal(profile) {}

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
 * @param profile an Profile object
 */
function changeInfoModalToEditMode(profile) {}

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
 * @param profile an Profile object
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
 * @param profile an Profile object
 */
function deleteProfile(profile) {}

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
 * @param tag an tag
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
 * @param keyWord a string
 */
function search(keyWord) {}
