const slides = document.querySelectorAll(".slide");
let current = 0;

let interval = setInterval(nextSlide, 3000);

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function changeSlide(dir) {
  clearInterval(interval);

  current += dir;

  if (current < 0) current = slides.length - 1;
  if (current >= slides.length) current = 0;

  showSlide(current);

  interval = setInterval(nextSlide, 3000);
}

/* DONJA FULLSCREEN GALERIJA */
const galleryImages = [
  "slike/Ostalo/1.jpg",
  "slike/Ostalo/2.jpg",
  "slike/Ostalo/3.jpg", 
  "slike/Ostalo/4.JPG", 
  "slike/Ostalo/5.jpg", 
  "slike/Ostalo/6.jpg",
  "slike/Ostalo/7.jpg", 
  "slike/Ostalo/8.jpg",
  "slike/Ostalo/9.jpg", 
  "slike/Ostalo/10.jpg",
  "slike/Ostalo/11.JPG",
  "slike/Ostalo/12.jpg" 
];

let galleryCurrent = 0;

function openGallery(index){
  galleryCurrent = index;

  document.getElementById("gallery").style.display = "flex";

  document.getElementById("galleryImage").src =
    galleryImages[index];
}

function closeGallery(){
  document.getElementById("gallery").style.display = "none";
}

function galleryChange(dir){
  galleryCurrent += dir;

  if(galleryCurrent < 0){
    galleryCurrent = galleryImages.length - 1;
  }

  if(galleryCurrent >= galleryImages.length){
    galleryCurrent = 0;
  }

  document.getElementById("galleryImage").src =
    galleryImages[galleryCurrent];
}

/* FORM */
const form = document.getElementById("kontaktForm");
const status = document.getElementById("status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "Šalje se...";

    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xlgawkyd", {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        status.textContent = "Poruka uspešno poslata ✔";
        form.reset();
      } else {
        status.textContent = "Greška pri slanju.";
      }

    } catch (err) {
      status.textContent = "Greška u konekciji.";
    }
  });
}