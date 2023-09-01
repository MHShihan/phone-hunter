const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones);
};

const displayPhone = (phones) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length >= 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-base-100 shadow-xl rounded-xl`;
    phoneCard.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
      alt="Shoes"
    />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick = "handelShowDetail('${phone.slug}') " class="btn btn-primary rounded-lg">Show Details</button>
      </div>
    </div>
    `;
    cardContainer.appendChild(phoneCard);
  });
  handleSpinner(false);
};
// loadPhone();

// Search Field
const handleSearch = () => {
  handleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
  console.log(searchText);
};

// Show Detail Handle
const handelShowDetail = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const phoneNamed = document.getElementById("show-detail-phone-name");
  phoneNamed.innerText = phone.name;
  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.classList = `text-center`;
  showDetailsContainer.innerHTML = `
    <div class ="flex justify-center"><img src = "${phone.image}"></img></div>
    <p class = "mt-2"><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
  `;
  // console.log(phone);
  show_details_modal.showModal();
};

const handleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
