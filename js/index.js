fetch("https://breakingbadapi.com/api/characters")
  .then((res) => res.json())
  .then((json) => {
    let selection = document.querySelector("#dropdown");
    selection.addEventListener("change", () => {
      const container = document.querySelector(".container");
      container.innerHTML = "";

      json.forEach((character) => {
        let { name, birthday, nickname, portrayed, status, img, category } = character; // Destructured character to help readability when passing arguments for createCard()

        if ( selection.value == "breaking-bad" && category.includes("Breaking Bad")) {
          createCard(name, birthday, nickname, portrayed, status, img);
        } else if (selection.value == "better-call-saul" && category.includes("Better Call Saul")) {
          createCard(name, birthday, nickname, portrayed, status, img);
        } else if (selection.value == "select-category") {
          createCard(name, birthday, nickname, portrayed, status, img);
        }
      });
    });

    json.forEach((character) => { // Renders all characters from both Breaking Bad and Better Call Saul
      let { name, birthday, nickname, portrayed, status, img } = character;
      createCard(name, birthday, nickname, portrayed, status, img);
    });
  });

/*
Created a function to prevent DRY code which takes the destructured object variables as parameters
This would actually be placed in its own seperate JS file to then be imported into this one -
however ran into "Cannot use import statement outside a module" and for context have just kept it in this file instead
*/

function createCard(characterName, characterBirthday, characterNickname, characterPortrayed, characterStatus, imgSrc) {
  let regex = /\s/g;
  let characterClassName = characterName.replace(regex, "-");

  const container = document.querySelector(".container");

  const characterCard = document.createElement("section");
  characterCard.classList.add(
    "character-card",
    characterClassName.toLowerCase()
  );
  const img = document.createElement("img");
  const name = document.createElement("h3");
  name.className = "name";
  const birthday = document.createElement("p");
  birthday.className = "birthday";
  const nickname = document.createElement("p");
  nickname.className = "nickname";
  const portrayed = document.createElement("p");
  portrayed.className = "portrayed";
  const status = document.createElement("p");
  status.className = "status";

  name.innerHTML = `<strong>${characterName}</strong>`.toUpperCase();
  birthday.innerHTML = `<strong>Birthday:</strong> ${characterBirthday}`;
  nickname.innerHTML = `<strong>Nickname:</strong> ${characterNickname}`;
  portrayed.innerHTML = `<strong>Portrayed:</strong> ${characterPortrayed}`;
  status.innerHTML = `<strong>Status:</strong> ${characterStatus}`;
  img.src = imgSrc;
  img.alt = `An image of the character ${characterName} portrayed by ${characterPortrayed}`;

  if (characterStatus == "Deceased") {
    status.style.backgroundColor = "red";
    characterCard.style.borderColor = "red";
  } else if (characterStatus == "Presumed dead") {
    status.style.backgroundColor = "orange";
    status.style.color = "black";
    characterCard.style.borderColor = "orange";
  }

  characterCard.append(img, name, birthday, nickname, portrayed, status);
  container.append(characterCard);
}
