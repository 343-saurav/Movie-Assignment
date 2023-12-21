var data = [];
var dataf = [];
fetchFavourites();
fetchdata();

async function fetchdata() {
  const response = await fetch("http://localhost:3000/movies");
  data = await response.json();
  for (let i = 0; i < data.length; i++) {
    document.getElementById("cards").innerHTML += `
             <div class="card" style="width:400px">
                <img id="img1" class="card-img-top" src="${data[i].posterPath}" alt="Card image">
                <div class="card-body">
                  <h4 class="card-title">Movie Title : ${data[i].title}</h4>
                  <p class="card-text">Movie Release : ${data[i].releaseDate}.</p>
                  <a href="#" id="${data[i].id}" onclick="Addfavourite(this.id)" class="btn btn-primary">Add Favourite</a>
                </div>
              </div>
        `;
  }
}

async function Addfavourite(id) {
  // var item=data.find(item=> item.id===id);
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      var item = data[i];
    }
  }
  console.log(item);
  // alert(item.movieCode);
  if (dataf.find((temp) => temp.movieCode === item.movieCode) != null) {
    alert("Movie already exist");
  } else {
    const response = await fetch("http://localhost:3000/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieCode: item.movieCode,
        title: item.title,
        releaseDate: item.releaseDate,
        posterPath: item.posterPath,
      }),
    });
    fetchFavourites();
  }
}
async function fetchFavourites() {
  const response1 = await fetch("http://localhost:3000/favourites");
  dataf = await response1.json();
  for (let i = 0; i < dataf.length; i++) {
    document.getElementById("fav-cards").innerHTML += `
             <div class="card" style="width:400px">
                <img id="img1" class="card-img-top" src="${dataf[i].posterPath}" alt="Card image">
                <div class="card-body">
                  <h4 class="card-title">Movie Title : ${dataf[i].title}</h4>
                  <p class="card-text">Movie Release : ${dataf[i].releaseDate}.</p>
                  <button id="${dataf[i].id}" class="btn btn-primary" onClick="deleteFavourite(this.id)">Delete Favourite</button>
                  
                </div>
              </div>
        `;
  }
}
async function deleteFavourite(id) {
  alert(id);
  //     fetch('http://localhost:3000/favourites/'+id,{
  //         method: 'DELETE',
  //     })
  // .then(res => res.text())
  // .then(res => console.log(res))
  // }
  const response = await fetch("http://localhost:3000/favourites/" + id, {
    method: "DELETE",
    //   ,
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
  });
  // console.log(response);
  const data = await response.text();
  alert(data);
  // alert(json.stringify(data));
  // console.log(data);
  //
}
