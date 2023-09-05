document.addEventListener("DOMContentLoaded", () => {
  const [h1, newPic, img, popularityScore] = createElement('h1', 'button', 'img', 'p');

  //div container for upvote and downvote buttons
  const [divClicks, upVote, downVote] = createElement('div', 'button', 'button');

  //div container for comment label and input, and submit button
  const [divComment, commentLabel, commentField, submit] = createElement('div', 'label', 'input', 'button');

  const commentDisplay = document.createElement('div');

  async function loadCat() {
    addTextContentToTheElements();

    h1.style.padding = "20px";

    reloadData();

    await setAttributesToTheElements();

    addEventListenerToTheButtons();

    appendChildToTheParents();
  }
  loadCat();

  //Helper functions

  //Creates Elements
  function createElement(...elements) {
    elements.forEach((element, index) => {
      elements[index] = document.createElement(element);
    })
    return elements;
  }

  //Adds textContent to the elements
  function addTextContentToTheElements() {
    h1.textContent = "Catstagram";
    newPic.textContent = "New Pic";
    upVote.textContent = "Upvote";
    downVote.textContent = "Downvote";
    submit.textContent = "Submit";
    popularityScore.textContent = "Popularity Score: 0";
    commentLabel.textContent = "Comment:";
  }

  //Sets attributes to the elements
  async function setAttributesToTheElements() {
    if (!img.src) {
      img.setAttribute('src', await getCatPic());
    };
    popularityScore.setAttribute("id", "score");
    newPic.setAttribute("id", "new-image");
    divClicks.setAttribute("id", "vote");
    divComment.setAttribute("id", "comment-section");
    commentLabel.setAttribute("for", "comment")
    commentField.setAttribute("type", "text");
    commentField.setAttribute("name", "comment");
    commentField.setAttribute("id", "comment");
    commentField.setAttribute("placeholder", "Add a comment...");
    commentDisplay.setAttribute("id", "comment-display");
    storeData(img.src, popularityScore.textContent, commentDisplay.innerHTML);
  }

  //Gets url of the random cat picture from the cat API
  async function getCatPic() {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search");
      const resBody = await response.json();
      return resBody[0].url;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  //Gets new cat images and resets popularity score and comments from previous the cat image
  async function getNewImage(e) {
    e.preventDefault();
    localStorage.clear();
    img.setAttribute('src', await getCatPic());
    popularityScore.textContent = "Popularity Score: 0";
    commentDisplay.textContent = "";
    storeData(img.src, popularityScore.textContent, commentDisplay.innerHTML);
  }

  //Add Event listeners to the buttons
  function addEventListenerToTheButtons() {
    upVote.addEventListener("click", changeScore);
    downVote.addEventListener("click", changeScore);
    submit.addEventListener("click", addComment);
    newPic.addEventListener("click", getNewImage);
  }

  //Appends Child to the parents
  function appendChildToTheParents() {
    document.body.appendChild(h1);
    document.body.appendChild(newPic);
    document.body.appendChild(img);
    document.body.appendChild(popularityScore);
    divClicks.appendChild(upVote);
    divClicks.appendChild(downVote);
    document.body.appendChild(divClicks);
    divComment.appendChild(commentLabel);
    divComment.appendChild(commentField);
    divComment.appendChild(submit);
    document.body.appendChild(divComment);
    document.body.appendChild(commentDisplay);
  }

  //Changes the popularity score based on Upvote and Downvote button
  function changeScore(e) {
    e.preventDefault();
    let currScore = Number(popularityScore.textContent.split(": ")[1]);
    if (e.target.textContent === "Upvote") {
      currScore++;
    } else if (e.target.textContent === "Downvote" && currScore > 0) {
      currScore--; //It won't go below 0;
    }
    popularityScore.textContent = `Popularity Score: ${currScore}`;
    storeData(img.src, popularityScore.textContent, commentDisplay.innerHTML);
  }

  //Adds comment submitted;
  function addComment(e) {
    e.preventDefault();
    const comment = commentField.value;
    if (comment) {
      const commentDiv = document.createElement('div');
      commentDiv.textContent = comment;
      commentDisplay.appendChild(commentDiv);
      commentField.value = "";
    }
    storeData(img.src, popularityScore.textContent, commentDisplay.innerHTML);
  }

  //Stores current score, image, and comments
  function storeData(...elements) {
    ["catImage", "score", "comments"].forEach((key, index) => {
      localStorage.setItem(key, elements[index]);
    })
  }

  //Loads any existing saved storage upon refreshing or reopening of the browser
  function reloadData() {
    const imageSaved = localStorage.getItem("catImage");
    if (imageSaved) {
      img.src = localStorage.getItem("catImage");
      popularityScore.textContent = localStorage.getItem("score");
      commentDisplay.innerHTML = localStorage.getItem("comments");
    }
  }
});
