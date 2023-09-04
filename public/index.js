window.onload = loadCat;

async function loadCat() {
  const h1 = document.createElement('h1');
  const img = document.createElement('img');

  h1.textContent = "Cat";

  getCatPic()
  .then(catPic => {
    img.setAttribute('src', catPic);
  });

  document.body.appendChild(h1);
  document.body.appendChild(img);
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
