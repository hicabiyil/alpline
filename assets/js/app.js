const preloader = document.querySelector("[data-preloader]");
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");

const hidePreloader = () => {
  preloader?.classList.add("is-hidden");
  window.setTimeout(() => preloader?.remove(), 500);
};

document.addEventListener("DOMContentLoaded", hidePreloader);
window.addEventListener("load", hidePreloader);
window.setTimeout(hidePreloader, 900);

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", Boolean(isOpen));
  header?.classList.toggle("nav-active", Boolean(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    header?.classList.remove("nav-active");
  });
});

const slides = [...document.querySelectorAll(".hero-slide")];
const currentSlide = document.querySelector("[data-current-slide]");
let activeSlide = 0;

if (slides.length > 1) {
  window.setInterval(() => {
    slides[activeSlide].classList.remove("is-active");
    activeSlide = (activeSlide + 1) % slides.length;
    slides[activeSlide].classList.add("is-active");
    if (currentSlide) {
      currentSlide.textContent = String(activeSlide + 1).padStart(2, "0");
    }
  }, 4800);
}

const gallery = document.querySelector("[data-gallery]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector("[data-lightbox-close]");

gallery?.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link || !lightbox || !lightboxImage) return;
  event.preventDefault();
  lightboxImage.src = link.href;
  lightboxImage.alt = link.querySelector("img")?.alt || "ALPLINE galeri görseli";
  lightbox.hidden = false;
  document.body.classList.add("nav-open");
});

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.classList.remove("nav-open");
};

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

const dealerData = {
  kayseri: {
    region: "Türkiye",
    name: "Harman Tarım",
    location: "Kayseri, Türkiye",
    address: "Anbar, Osman Kavuncu Blv. no:502 D:1c, 38030 Melikgazi/Kayseri",
    phone: "0530 549 8420",
    phoneHref: "tel:+905305498420",
  },
  krasnodar: {
    region: "Rusya",
    name: "Krasnodar",
    location: "Krasnodar, Rusya",
    address: "Bayi bilgisi netleştiğinde bu alana eklenecek.",
    phone: "Telefon bilgisi eklenecek",
    phoneHref: "#",
  },
};

const dealerButtons = [...document.querySelectorAll("[data-dealer-point]")];
const dealerPanel = document.querySelector("[data-dealer-panel]");

const setDealer = (id) => {
  const dealer = dealerData[id];
  if (!dealer || !dealerPanel) return;

  const region = dealerPanel.querySelector("[data-dealer-region]");
  const name = dealerPanel.querySelector("[data-dealer-name]");
  const location = dealerPanel.querySelector("[data-dealer-location]");
  const address = dealerPanel.querySelector("[data-dealer-address]");
  const phoneLink = dealerPanel.querySelector("[data-dealer-phone]");
  if (!region || !name || !location || !address || !phoneLink) return;

  region.textContent = dealer.region;
  name.textContent = dealer.name;
  location.textContent = dealer.location;
  address.textContent = dealer.address;

  phoneLink.textContent = dealer.phone;
  phoneLink.href = dealer.phoneHref;

  dealerButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.dealerPoint === id);
  });
};

window.setDealer = setDealer;

document.addEventListener("click", (event) => {
  const dealerButton = event.target.closest("[data-dealer-point]");
  if (!dealerButton) return;
  setDealer(dealerButton.dataset.dealerPoint);
});
