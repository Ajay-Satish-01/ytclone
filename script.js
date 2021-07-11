let container = document.createElement("section");
container.setAttribute("class", "container");
let divcol = document.createElement("div");
divcol.setAttribute("class", "col-9");
divcol.id = "col";
let rowmain = document.getElementById("row");
let api = "AIzaSyD3p1YvuzOnUWZeK0gv6MM7bK4Vf6FUNfU";
let clientsecret = "rdgzya8fzQdgO2Zf3j7O7Ay0";
let clientid =
  "337027913020-6io0vd8q0nqdh4vrusd4ubvgtrc7g52f.apps.googleusercontent.com";
let searchbutton = document.getElementById("searchbutton");

searchbutton.addEventListener("click", searchfunction);
function searchfunction(e) {
  e.preventDefault();
  let searchtext = document.getElementById("value");
  let query = searchtext.value;
  console.log(query);
  fetchfunction(query);
}

const fetchfunction = async (searchkey) => {
  container.innerHTML = "";
  let title = document.createElement("h3");
  title.setAttribute("class", "text-center text-danger m-5");
  title.textContent = "You searched for '" + searchkey + "'";
  container.append(title);
  divcol.append(container);
  rowmain.append(divcol);
  document.body.append(rowmain);

  let fetching = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${searchkey}&type=video&key=${api}`
  );
  let datas = await fetching.json();

  rendercontainer(datas.items);
};
let row = document.createElement("div");
row.setAttribute("class", "row");
function rendercontainer(datas) {
  row.innerHTML = "";
  datas.map((data) => {
    let col = document.createElement("div");
    col.setAttribute("class", "col-12");

    let card = document.createElement("div");
    card.setAttribute("class", "card my-3");
    card.innerHTML = `
  <div class=" card-img-top img-fluid ratio ratio-16x9 h-100 w-100 ">
  <iframe src="https://www.youtube.com/embed/${data.id.videoId}?rel=0" class='w-100 h-100' title="YouTube video" allowfullscreen></iframe>
</div>
  <div class="card-body">
    <p class="card-text">${data.snippet.description}</p>
  </div>
`;
    col.append(card);
    row.append(col);
    container.append(row);
    divcol.append(container);
    rowmain.append(divcol);
    document.body.append(rowmain);
  });
}
