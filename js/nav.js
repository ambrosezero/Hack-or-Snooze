"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


function navNewStoryClick(evt) {
  if (!currentUser) {
    alert("sign in to submit stories");
    return
  }
  console.debug('navNewStoryClick', evt);
  hidePageComponents();
  $storyForm.show();

}

$navStory.on('click', navNewStoryClick)

// $navRemoveStory.on('click', function (e) {
//   alert('click the story you wish to remove')
//   $allStoriesList.on('click', function (e) {
//     preventDefault()
//     console.log(e)
//   })
// })