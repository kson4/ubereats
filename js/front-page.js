import { cities } from "./data.js";

// address suggestions
const address = document.querySelector(".address");
const addressLogo = document.createElement("i");
addressLogo.classList.add("fa-solid");
addressLogo.classList.add("fa-location-dot");
const addressList = document.querySelector(".address-suggestions");
const key = "&apiKey=dbf5f4e5b664437a80b971c12ac03436";
let timeout = null;

address.addEventListener("keyup", (e) => {
  clearTimeout(timeout);

  let requestOptions = {
    method: "GET",
  };
  timeout = setTimeout(() => {
    let current = address.value;
    fetch(
      "https://api.geoapify.com/v1/geocode/autocomplete?text=" + current + key,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (address.value == "") {
          addressList.style.visibility = "hidden";
        } else {
          addressList.style.visibility = "visible";
        }

        let allSuggestions = document.querySelectorAll(".address-suggestion");
        allSuggestions.forEach((suggestion) => {
          suggestion.remove();
        });

        console.log(result);
        for (let i = 0; i < result.features.length; i++) {
          console.log(current + " " + result.features[i].properties.formatted);
          const container = document.createElement("li");
          container.classList.add("address-suggestion");

          const addressLogo = document.createElement("i");
          addressLogo.classList.add("fa-solid");
          addressLogo.classList.add("fa-location-dot");
          addressLogo.classList.add("suggestion-logo");

          let item = document.createElement("p");
          item.classList.add("address-suggestion-text");
          item.textContent =
            current + "\r\n" + result.features[i].properties.formatted;

          container.append(addressLogo);
          container.append(item);
          addressList.append(container);
        }
        if (
          addressList.childElementCount < 5 &&
          addressList.childElementCount > 0
        ) {
          addressList.style.height = addressList.childElementCount * 75 + "px";
        } else {
          addressList.style.height = 375 + "px";
        }
      })
      .catch((error) => console.log("error", error));
  }, 1000);
});
