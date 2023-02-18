let FullName = document.querySelector("#fullname");
let country = document.querySelector("#country");
let city = document.querySelector("#city");
let organization = document.querySelector("#organization");
let friend = document.querySelector("#friends");
let img = document.querySelector("#imgx");
let btn = document.querySelector("#found");
let searchbtn = document.querySelector("#searchtxt");
let form = document.getElementById("form");

btn.addEventListener("click", () => {
  let valuex = searchbtn.value;

  if (valuex == "") {
    return;
  } else {
    getData(valuex);
  }
  img.addEventListener("load", () => {
    form.classList.remove("hidden");
  });

  searchbtn.focus();
});

async function getData(npm) {
  let getUrl = await fetch(
    `https://codeforces.com/api/user.info?handles=${npm}`
  );
  let data = await getUrl.json();
  let maindata = await data.result[0];

  let getRavk = await fetch(
    `https://codeforces.com/api/user.rating?handle=${npm}`
  );
  let allrank = await getRavk.json();

  if (allrank.result == "") {
    document.getElementById("fullname").style.color = "black"; // none
  }

  if (data.status === "OK") {
    if (allrank.result.length !== 0) {
      let CurrentRank = allrank.result[allrank.result.length - 1].newRating;
      if (CurrentRank >= 0 && CurrentRank <= 1200) {
        document.getElementById("fullname").style.color = "#808080"; // new
      } else if (CurrentRank > 1200 && CurrentRank <= 1400) {
        document.getElementById("fullname").style.color = "#8fce00"; // 2
      } else if (CurrentRank > 1400 && CurrentRank <= 1600) {
        document.getElementById("fullname").style.color = "#ADD8E6"; //3
      } else if (CurrentRank > 1600 && CurrentRank <= 1900) {
        document.getElementById("fullname").style.color = "#6a329f"; //4
      } else if (CurrentRank > 1900 && CurrentRank <= 2100) {
        document.getElementById("fullname").style.color = "#FF88FF"; //5
      } else if (CurrentRank > 2100 && CurrentRank <= 2300) {
        document.getElementById("fullname").style.color = "#FFCC88"; //6
      } else if (CurrentRank > 2300 && CurrentRank <= 2400) {
        document.getElementById("fullname").style.color = "#FFBB55"; //7
      } else if (CurrentRank > 2400 && CurrentRank <= 2600) {
        document.getElementById("fullname").style.color = "#FF7777"; //8
      } else if (CurrentRank > 2600 && CurrentRank <= 3000) {
        document.getElementById("fullname").style.color = "#FF3333"; //9
      } else if (CurrentRank >= 3000) {
        document.getElementById("fullname").style.color = " #AA0000"; //10
      }
    }

    if (maindata.firstName === undefined) {
      maindata.firstName = "";
    }
    if (maindata.lastName === undefined) {
      maindata.lastName = "";
    }

    if (maindata.country === undefined) {
      maindata.country = "";
    }
    if (maindata.city === undefined) {
      maindata.city = "";
    }

    if (maindata.organization === undefined) {
      maindata.organization = "";
    }
    if (maindata.friendOfCount === undefined) {
      maindata.friendOfCount = "";
    }
    img.setAttribute("src", `${maindata.titlePhoto}`);
    FullName.textContent = `${maindata.firstName} ${maindata.lastName}`;
    country.textContent = `${maindata.country}`;
    city.textContent = `${maindata.city}`;
    organization.textContent = `${maindata.organization}`;
    friend.textContent = `${maindata.friendOfCount}`;
  }
}

searchbtn.focus();
