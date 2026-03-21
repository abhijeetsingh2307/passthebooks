const readBooks = [
  { name: "The Alchemist", author: "Paulo Coelho", format: "Paperback", language: "English" },
  { name: "Brida", author: "Paulo Coelho", format: "Paperback", language: "English" },
  { name: "You Can Win", author: "Shiv Khera", format: "Paperback", language: "English" },
  { name: "Rich Dad Poor Dad", author: "Robert Kiyosaki", format: "Paperback", language: "English" },
  { name: "Don't Believe Everything You Think", author: "Joseph Nguyen", format: "Paperback", language: "English" },
  { name: "Half Girlfriend", author: "Chetan Bhagat", format: "Paperback", language: "English" },
  { name: "After Dark", author: "Haruki Murakami", format: "Paperback", language: "English" },
  { name: "How to Finish Everything You Start", author: "Jan Yager", format: "Paperback", language: "English" },
  { name: "The Kite Runner", author: "Khaled Hosseini", format: "Paperback", language: "English" },
  { name: "Make Your Bed", author: "William H. McRaven", format: "Paperback", language: "English" },
  { name: "Ikigai", author: "Héctor García & Francesc Miralles", format: "Paperback", language: "English" },

  { name: "2 States", author: "Chetan Bhagat", format: "Softcover", language: "English" },
  { name: "As a Man Thinketh", author: "James Allen", format: "Softcover", language: "English" },

  { name: "100 Selected Poems", author: "Emily Dickinson", format: "Hardcover", language: "English" },

  { name: "Gunahon Ka Devta", author: "Dharamvir Bharati", format: "Paperback", language: "Hindi" },
  { name: "October Junction", author: "Divya Prakash Dubey", format: "Paperback", language: "Hindi" },
  { name: "Musafir Cafe", author: "Divya Prakash Dubey", format: "Paperback", language: "Hindi" }
];

const wantBooks = [
  { name: "The Diary of a CEO", author: "Steven Bartlett", language: "English" },
  { name: "12 Rules for Life", author: "Jordan Peterson", language: "English" },
  { name: "The Mind-Gut Connection", author: "Emeran Mayer", language: "English" }
];

const readTab = document.getElementById("readTab");
const wantTab = document.getElementById("wantTab");
const subtext = document.getElementById("subtext");
const booksContainer = document.getElementById("books");

function renderBooks(list, isRead) {
  booksContainer.innerHTML = "";

  const phone = "916263970229"; // 👈 replace with your number

  list.forEach(book => {
    const card = document.createElement("div");
    card.className = "card";

    const badges = [];

    if (book.format) {
      badges.push(`<span class="badge">${book.format}</span>`);
    }

    if (book.language) {
      badges.push(`<span class="badge">${book.language}</span>`);
    }

    // 👇 Dynamic message
    const message = isRead
      ? `Hey, can I borrow "${book.name}"?`
      : `Hey, I have "${book.name}" that you want to read.`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;

    const ctaText = isRead ? "Ask me for this" : "I have this";

    card.innerHTML = `
      <h3>${book.name}</h3>
      <p>${book.author}</p>

      <div class="badge-group">
        ${badges.join("")}
      </div>

     <a href="${whatsappLink}" target="_blank" class="cta">
  <i class="fa-brands fa-whatsapp"></i>
  ${ctaText}
</a>
    `;

    booksContainer.appendChild(card);
  });
}

function showRead() {
  readTab.classList.add("active");
  wantTab.classList.remove("active");

  subtext.innerText = "Some of these are on my shelf. If you want one, just ask.";
  renderBooks(readBooks, true);
}

function showWant() {
  wantTab.classList.add("active");
  readTab.classList.remove("active");

  subtext.innerText = "If you have any of these, I would love to borrow them.";
  renderBooks(wantBooks, false);
}

/* Events */
readTab.addEventListener("click", showRead);
wantTab.addEventListener("click", showWant);

/* Initial load */
renderBooks(readBooks, true);

document.getElementById("ctaBtn").onclick = function () {
  window.open(
    "https://wa.me/91XXXXXXXXXX?text=Hey%2C%20I%27d%20like%20to%20create%20my%20reading%20profile.",
    "_blank"
  );
};