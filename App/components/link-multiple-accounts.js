// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
import React, {createContext, useState} from 'react';
import firebase from "firebase/app";
import "firebase/auth";

const auth = firebase.auth();

const MyUserDataRepo = function() {};

// I have no fucking idea what this is.
MyUserDataRepo.prototype.merge = function(data1, data2) 
{
  // TODO(you): How you implement this is specific to your application!
  return {
    ...data1,
    ...data2,
  };
};

MyUserDataRepo.prototype.set = function(user, data) 
{
  // TODO(you): How you implement this is specific to your application!
};

MyUserDataRepo.prototype.delete = function(user) {
  // TODO(you): How you implement this is specific to your application!
};

MyUserDataRepo.prototype.get = function(user) {
  // TODO(you): How you implement this is specific to your application!
  return {};
};

// Ideally students will use their school-created GMail accounts. 
function getProviders() {
  // [START auth_get_providers]
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  // [END auth_get_providers]
}

function simpleLink(credential) {
  // [START auth_simple_link]
  auth.currentUser.linkWithCredential(credential)
    .then((usercred) => {
      var user = usercred.user;
      console.log("Account linking success", user);
    }).catch((error) => {
      console.log("Account linking error", error);
    });
  // [END auth_simple_link]
}

// Probably preferred for desktop/laptop users. 
function linkWithPopup() {
  var provider = new firebase.auth.GoogleAuthProvider();

  // [START auth_link_with_popup]
  auth.currentUser.linkWithPopup(provider).then((result) => {
    // Accounts successfully linked.
    var credential = result.credential;
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    // ...
  });
  // [END auth_link_with_popup]
}

// Use redirect to open a new window; this is preferred for mobile users.
function linkWithRedirect() {
  var provider = new firebase.auth.GoogleAuthProvider();

  // [START auth_link_with_redirect]
  auth.currentUser.linkWithRedirect(provider);
  // [END auth_link_with_redirect]

  // [START auth_get_redirect_result]
  auth.getRedirectResult().then((result) => {
    if (result.credential) {
      // Accounts successfully linked.
      var credential = result.credential;
      var token = credential.accessToken;
    }
    var user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    var email = error.email;
    var credential = error.credential;
  });
  // [END auth_get_redirect_result]
}

function mergeAccounts(newCredential) {
  // [START auth_merge_accounts]
  // The implementation of how you store your user data depends on your application
  var repo = new MyUserDataRepo();

  // Get reference to the currently signed-in user
  var prevUser = auth.currentUser;

  // Get the data which you will want to merge. This should be done now
  // while the app is still signed in as this user.
  var prevUserData = repo.get(prevUser);

  // Delete the user's data now, we will restore it if the merge fails
  repo.delete(prevUser);

  // Sign in user with the account you want to link to
  auth.signInWithCredential(newCredential).then((result) => {
    console.log("Sign In Success", result);
    var currentUser = result.user;
    var currentUserData = repo.get(currentUser);

    // Merge prevUser and currentUser data stored in Firebase.
    // Note: How you handle this is specific to your application
    var mergedData = repo.merge(prevUserData, currentUserData);

    return prevUser.linkWithCredential(result.credential)
      .then((linkResult) => {
        // Sign in with the newly linked credential
        return auth.signInWithCredential(linkResult.credential);
      })
      .then((signInResult) => {
        // Save the merged data to the new user
        repo.set(signInResult.user, mergedData);
      });
  }).catch((error) => {
    // If there are errors we want to undo the data merge/deletion
    console.log("Sign In Error", error);
    repo.set(prevUser, prevUserData);
  });
  // [END auth_merge_accounts]
}

// For testing I guess.
function makeEmailCredential() {
  var email = "sdpteam21@gmail.com";
  var password = "Team21Slaps.";

  // [START auth_make_email_credential]
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  // [END auth_make_email_credential]
}

function unlink(providerId) {
  var user = auth.currentUser;

  // [START auth_unlink_provider]
  user.unlink(providerId).then(() => {
    // Auth provider unlinked from account
    // ...
  }).catch((error) => {
    // An error happened
    // ...
  });
  // [END auth_unlink_provider]
}