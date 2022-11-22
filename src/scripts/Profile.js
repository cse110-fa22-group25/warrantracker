/**
 * Profile Object Constructor
 * @constructor
 * @param {string} title - the name of the product
 * @param {string} tag - the tag of the product
 * @param {string} exp_date - the expiration date of the product
 * @param {string} serial_num - the serial number of the product
 * @param {string} note - the additional notes for the product
 */
export function Profile(id, title, tag, exp_date, serial_num, note) {
  this.id = id;
  this.title = title;
  this.tag = tag;
  this.exp_date = exp_date;
  this.serial_num = serial_num;
  this.note = note;
}
