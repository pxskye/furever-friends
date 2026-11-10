const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    users.forEach(user => {
        const isVisible =
            user.Age.toLowerCase().includes(value) ||
            user.Gender.toLowerCase().includes(value) ||
            user.Breed.toLowerCase().includes(value)
            user.Name.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    });
});

fetch("dogs-info.json")
    .then(res => res.json())
    .then(data => {
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const age = card.querySelector("[data-age]");
            const gender = card.querySelector("[data-gender]");
            const breed = card.querySelector("[data-breed]");
            const name = card.querySelector("[data-name]");
            const image = card.querySelector("[data-image]"); // Assuming you have an <img data-image=""> in your template

            age.textContent = user.Age;
            gender.textContent = user.Gender;
            breed.textContent = user.Breed;
            name.textContent = user.Name;

            // Set the src attribute of the image element
            if (user.imageUrl) {
                image.src = user.imageUrl;
                image.alt = `${user.Breed} - ${user.Age} - ${user.Name} (${user.Gender})`; // Add alt text for accessibility
            } else {
                // Optionally handle cases where imageUrl is missing
                image.style.display = 'none'; // Hide the image element if no URL
            }

            userCardContainer.append(card);
            return { Age: user.Age, Gender: user.Gender, Breed: user.Breed, Name: user.Name, Img: user.imageUrl, element: card };
        });
    });
