window.onload = loadCat;

async function loadCat() {
  const [h1, newPic, img, popularityScore] = createElement('h1', 'button', 'img', 'p');

  //div container for upvote and downvote buttons
  const [divClicks, upVote, downVote] = createElement('div', 'button', 'button');

  //div container for comment label and input, and submit button
  const [divComment, commentLabel, commentField, submit] = createElement('div', 'label', 'input', 'button');

  const commentDisplay = document.createElement('div');

  getCatPic()
  .then(catPic => {
    img.setAttribute('src', catPic);
  });

  h1.textContent = "Catstagram";
  newPic.textContent = "Get A New Cat Image";
  upVote.textContent = "Upvote";
  downVote.textContent = "Downvote";
  submit.textContent = "Submit";
  popularityScore.textContent = "Popularity Score: 0";
  commentLabel.textContent = "Comment:";

  h1.style.padding = "20px";

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

  upVote.addEventListener("click", changeScore);
  downVote.addEventListener("click", changeScore);
  submit.addEventListener("click", addComment);
  newPic.addEventListener("click", getNewImage);

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

function createElement(...elements) {
  elements.forEach((element, index) => {
    elements[index] = document.createElement(element);
  })
  return elements;
}

function getCatPic() {
  try {
    const response = fetch("https://api.thecatapi.com/v1/images/search")
    .then(res => res.json())
    .then(resBody => resBody[0].url);
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

function changeScore(e) {
  const scoreNode = document.querySelector("#score");
  let currScore = Number(scoreNode.textContent.split(": ")[1]);
  if (e.target.textContent === "Upvote") {
    currScore++;
    scoreNode.textContent = `Popularity Score: ${currScore}`;
  } else if (e.target.textContent === "Downvote" && currScore > 0) {
    currScore--;
    scoreNode.textContent = `Popularity Score: ${currScore}`;
  }
}

function addComment(e) {
  const inputNode = document.querySelector("#comment");
  const displayNode = document.querySelector("#comment-display");
  const comment = inputNode.value;
  const commentDiv = document.createElement('div');
  commentDiv.textContent = comment;
  displayNode.appendChild(commentDiv);

  console.log(comment);
}

function getNewImage(e) {
  const img = document.querySelector('img');
  const scoreNode = document.querySelector("#score");
  const displayNode = document.querySelector("#comment-display");

  getCatPic()
  .then(catPic => {
    img.setAttribute('src', catPic);
  });

  scoreNode.textContent = "Popularity Score: 0";
  displayNode.textContent = "";
}
