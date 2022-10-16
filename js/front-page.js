import { cities } from "./data.js";

// address suggestions
const address = document.querySelector(".address");
const addressLogo = document.createElement("i");
addressLogo.classList.add("fa-solid");
addressLogo.classList.add("fa-location-dot");
const addressList = document.querySelector(".address-suggestions");

address.addEventListener("keyup", (e) => {
  if (address.value == "") {
    addressList.style.visibility = "hidden";
    console.log("asd");
  } else {
    addressList.style.visibility = "visible";
  }

  let allSuggestions = document.querySelectorAll(".address-suggestion");
  allSuggestions.forEach((suggestion) => {
    suggestion.remove();
  });

  for (let i of cities) {
    if (
      i.toLowerCase().startsWith(address.value.toLowerCase()) &&
      address.value != ""
    ) {
      const container = document.createElement("li");
      container.classList.add("address-suggestion");

      const addressLogo = document.createElement("i");
      addressLogo.classList.add("fa-solid");
      addressLogo.classList.add("fa-location-dot");
      addressLogo.classList.add("suggestion-logo");

      let item = document.createElement("p");
      item.classList.add("address-suggestion-text");
      let word = i.substring(0, address.value.length);
      word += i.substring(address.value.length);
      item.textContent = word;

      container.append(addressLogo);
      container.append(item);
      addressList.append(container);
    }
  }
  // console.log(addressList.childElementCount);
  if (addressList.childElementCount < 5 && addressList.childElementCount > 0) {
    addressList.style.height = addressList.childElementCount * 75 + "px";
    console.log(addressList.childElementCount * 75);
  } else {
    addressList.style.height = 375 + "px";
  }
});
