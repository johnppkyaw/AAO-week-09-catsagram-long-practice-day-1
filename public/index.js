window.onload = loadCat;

async function loadCat() {
  const h1 = document.createElement('h1');
  const img = document.createElement('img');
  const popularityScore = document.createElement('p');

  //div container for upvote and downvote buttons
  const divClicks = document.createElement('div');
  const upVote = document.createElement('button');
  const downVote = document.createElement('button');

  //div container for comment label and input, and submit button
  const divComment = document.createElement('div');
  const commentLabel = document.createElement('label');
  const commentField = document.createElement('input');
  const submit = document.createElement('button');

  const commentDisplay = document.createElement('div');

  let currentScore = 0;

  getCatPic()
  .then(catPic => {
    img.setAttribute('src', catPic);
  });

  h1.textContent = "Catstagram";
  h1.style.padding = "20px";

  popularityScore.textContent = `Popularity Score: ${currentScore}`;

  divClicks.setAttribute("id", "vote");
  upVote.textContent = "Upvote";
  downVote.textContent = "Downvote";
  divClicks.appendChild(upVote);
  divClicks.appendChild(downVote);

  divComment.setAttribute("id", "comment-section");
  commentLabel.textContent = "Comment:";
  commentLabel.setAttribute("for", "comment")
  commentField.setAttribute("type", "text");
  commentField.setAttribute("name", "comment");
  commentField.setAttribute("id", "comment");
  commentField.setAttribute("placeholder", "Add a comment...");
  submit.textContent = "Submit";
  divComment.appendChild(commentLabel);
  divComment.appendChild(commentField);
  divComment.appendChild(submit);

  commentDisplay.setAttribute("id", "comment-display");

  document.body.appendChild(h1);
  document.body.appendChild(img);
  document.body.appendChild(popularityScore);
  document.body.appendChild(divClicks);
  document.body.appendChild(divComment);
  document.body.appendChild(commentDisplay);
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
