"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();
  let storyStarClass;
  if (currentUser.favorites.some(favorite => {
    return favorite.storyId == story.storyId
  })) {
    storyStarClass = fullStar;
  } else {
    storyStarClass = emptyStar;
  }
  return $(`
      <li id="${story.storyId}">
      <span id="story-star-${story.storyId}" class="fa fa-star ${storyStarClass}"></span>
      <span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        </span>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
    // adds the toggleFavorite event listener to the story-star to change favorite state
    $(`#story-star-${story.storyId}`).on('click', function () {
      let $thisStar = $(`#story-star-${story.storyId}`)
      User.toggleFavorite(currentUser, story)
      // toggles the UI favorite star with the favorite state
      if (currentUser.favorites.some((favorite) => {
        return favorite.storyId == story.storyId
      })) {
        $thisStar.addClass("unchecked").removeClass("checked")
      }
      else {
        $thisStar.addClass("checked").removeClass("unchecked")
      }
    })
  }

  $allStoriesList.show();
}

let toggleStoryStar = function (story) {
  let $thisStar = $(`#story-star-${story.storyId}`)
  User.toggleFavorite(currentUser, story)
  // toggles the UI favorite star with the favorite state
  if (currentUser.favorites.some((favorite) => {
    return favorite.storyId == story.storyId
  })) {
    $thisStar.addClass("unchecked").removeClass("checked")
  }
  else {
    $thisStar.addClass("checked").removeClass("unchecked")
  }
}


$storyFormButton.on("click", async function (e) {
  e.preventDefault()
  let newStory = {
    author: currentUser.username,
    title: $('#story-title').val(),
    url: $('#story-url').val()
  }
  let addedStory = await StoryList.addStory(currentUser, newStory)
  let addedStoryObject = new Story(addedStory.data.story)

  let $newStory = generateStoryMarkup(addedStoryObject)
  $allStoriesList.prepend($newStory);
  $storyForm.hide()
  $allStoriesList.show()

});