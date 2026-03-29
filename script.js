const supabaseUrl = "https://jpjkcydbzihdmhkpufvk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwamtjeWRiemloZG1oa3B1ZnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMDkyNjgsImV4cCI6MjA4OTY4NTI2OH0.4xuOSToTgQWdLFBTh2gkTMMWlVNbX3c5kSMr8Fi1bB4";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);




/* =========================
   AUTH UI
========================= */
function updateUI(session) {
  const loggedOut = document.getElementById("loggedOut");
  const loggedIn = document.getElementById("loggedIn");
  const emailEl = document.getElementById("userEmail");

  if (session) {
    if (loggedOut) loggedOut.style.display = "none";
    if (loggedIn) loggedIn.style.display = "block";

    if (emailEl) {
      emailEl.innerText = "Logged in as " + session.user.email;
    }
  } else {
    if (loggedOut) loggedOut.style.display = "block";
    if (loggedIn) loggedIn.style.display = "none";
  }
}

/* =========================
   ON LOAD
========================= */
document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await supabaseClient.auth.getSession();
  updateUI(data.session);

  renderBooks(readBooks, true);
});

/* =========================
   AUTH LISTENER
========================= */
supabaseClient.auth.onAuthStateChange((event, session) => {
  updateUI(session);
});

/* =========================
   BOOK DATA
========================= */
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

/* =========================
   UI ELEMENTS
========================= */
const readTab = document.getElementById("readTab");
const wantTab = document.getElementById("wantTab");
const subtext = document.getElementById("subtext");
const booksContainer = document.getElementById("books");

/* =========================
   RENDER
========================= */
function renderBooks(list, isRead) {
  booksContainer.innerHTML = "";

  const phone = "916263970229";

  list.forEach(book => {
    const card = document.createElement("div");
    card.className = "card";

    const badges = [];

    if (book.format) badges.push(`<span class="badge">${book.format}</span>`);
    if (book.language) badges.push(`<span class="badge">${book.language}</span>`);

    const message = isRead
      ? `Hey, can I borrow "${book.name}"?`
      : `Hey, I have "${book.name}" that you want to read.`;

    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    const ctaText = isRead ? "Ask me for this" : "I have this";

    card.innerHTML = `
      <h3>${book.name}</h3>
      <p>${book.author}</p>
      <div class="badge-group">${badges.join("")}</div>
      <a href="${whatsappLink}" target="_blank" class="cta">
        <i class="fa-brands fa-whatsapp"></i> ${ctaText}
      </a>
    `;

    booksContainer.appendChild(card);
  });
}

/* =========================
   TABS
========================= */
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

/* =========================
   EVENTS
========================= */
readTab.addEventListener("click", showRead);
wantTab.addEventListener("click", showWant);

/* CTA */
document.getElementById("ctaBtn").onclick = function () {
  window.open(
    "https://wa.me/91XXXXXXXXXX?text=Hey%2C%20I%27d%20like%20to%20create%20my%20reading%20profile.",
    "_blank"
  );
};

/* =========================
   MAGIC LINK LOGIN
========================= */
document.getElementById("magicBtn").onclick = async function () {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter your email");
    return;
  }

  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin
    }
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Magic link sent! Check your email.");
  }
};