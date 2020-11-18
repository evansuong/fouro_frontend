// Users file for Creating, Reading, Updating, and Deleting Users
// and User Profile Management
import "firebase/firestore";
import "firebase/auth";
import Fire from "../firebase/config";
// Import timerCorrector to handle trivial timer warnings
import "../timerCorrector";

// Firestore
export const db = Fire.firestore();
export const users = db.collection("users");

/* TEST Firestore Function
export function addUser(username, first, last) {
  users.doc(username).set({
    first_name: first,
    last_name: last,
  });
} */

const UsersAPI = {
  createNewUser: function(username, first, last) {
    users.doc(username).set({
      first_name: first,
      last_name: last
    });
  },

  uploadUserProfilePicture() {

  },

  getUserProfile(userId) {

  },

  updateUserProfile(username, firstName, lastName) {

  }
}
 
const HugCountAPI = {
  getUserHugCount() {

  },

  getUserHugStreak() {

  },

  resetUserHugCount() {

  },

  increaseHugCount() {

  }
}