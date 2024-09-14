const loadPHone = async(searchText="12", isShowAll) =>{
       const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
       const data = await res.json();
       const phones = data.data
       // console.log(phones);
       displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
       const phoneContainer = document.getElementById("phone-Container")
       /* Clear Phone Container Cards Before Adding New Cards */ 
       phoneContainer.textContent = "";
       // console.log(phones.length)

       /* Display Show All BUtton If There are more then 12 */
       const showButtonContainer = document.getElementById("Show-ALl-Container");
       if(phones.length > 12 && !isShowAll){
              showButtonContainer.classList.remove("hidden")
       }
       else{
              showButtonContainer.classList.add("hidden")
       }
       // console.log("is show all", isShowAll)
       /* Display Only First 12 Phone If Not Show All */
       if(!isShowAll){
              phones = phones.slice(0,12)
       }
       phones.forEach(phone =>{
              // console.log(phone)
              const phoneCard = document.createElement("div")
              phoneCard.classList = "card bg-gray-100 w-72 pt-5 shadow-xl";
              phoneCard.innerHTML = `
              <figure>
              <img
                src="${phone.image}" />
              </figure>
              <div class="card-body">
                     <h2 class="card-title">${phone.phone_name}</h2>
                     <p>If a dog chews shoes whose shoes does he choose?</p>
                     <div class="card-actions justify-center mt-2">
                     <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                     </div>
              </div>
              `;
              phoneContainer.appendChild(phoneCard)
       })
       /* Hide Loading Spinner */
       toggleSpinner(false)
}

const handleShowDetails = async (id) =>{
       // console.log("click", id)
       /* Load Single Phone  Data */
       const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
       const data = await res.json()
       const phone = data.data;

       showPhoneDetails(phone)
}
const showPhoneDetails = (phone) =>{
       console.log(phone);
       const phoneName = document.getElementById("show-detail-phone-Name")
       phoneName.innerText = phone.name;
       const showDetailsContainer = document.getElementById("show-details-container")
       showDetailsContainer.innerHTML = `
              <div class="flex justify-center py-5">
              <img class="" src="${phone.image}">
              </div>
              <p><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
              <p><span class="font-bold">Display: </span>${phone.mainFeatures.displaySize
              }</p>
              <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory
              }</p>
              <p><span class="font-bold">Resele: </span>${phone.releaseDate}</p>
       `
       /* Show The Model */
       Show_Details_Model.showModal();
}

// Handle Search Button
const handleSearch = (isShowAll) =>{
       toggleSpinner(true)
       const searchField = document.getElementById("Search-Field")
       const searchText = searchField.value;
       loadPHone(searchText, isShowAll)
}
const toggleSpinner = (isLoading) =>{
       const loadingSpinner = document.getElementById("Loading-Spinner")
       if(isLoading){
              loadingSpinner.classList.remove("hidden")
       }
       else{
              loadingSpinner.classList.add("hidden")
       }
}
/* Handle Show All */
const handleShowAll = () =>{
       handleSearch(true)
}
loadPHone()