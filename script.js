const products = [
  { id: 1, name: "Mouse Sem Fio Neo", price: 89.9, category: "Acessórios", tag: "Novo", icon: "🖱️" },
  { id: 2, name: "Teclado Mecânico Flow", price: 219.9, category: "Acessórios", tag: "Mais vendido", icon: "⌨️" },
  { id: 3, name: "Fone Bluetooth AirBeat", price: 179.9, category: "Áudio", tag: "Novo", icon: "🎵" },
  { id: 4, name: "Soundbar Home Plus", price: 549.9, category: "Áudio", tag: "Mais vendido", icon: "🔈" },
  { id: 5, name: "Lâmpada Smart Color", price: 69.9, category: "Casa", tag: "Novo", icon: "💡" },
  { id: 6, name: "Tomada Inteligente Wi-Fi", price: 99.9, category: "Casa", tag: "Mais vendido", icon: "🔌" },
  { id: 7, name: "Suporte Articulado para Celular", price: 59.9, category: "Acessórios", tag: "Novo", icon: "📱" },
  { id: 8, name: "Mini Projetor NovaVision", price: 799.9, category: "Casa", tag: "Mais vendido", icon: "📽️" },
];

const currencyBRL = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const navLinks = document.querySelectorAll(".nav-link");
const menuToggle = document.getElementById("menu-toggle");
const navLinksContainer = document.getElementById("nav-links");
const themeToggle = document.getElementById("theme-toggle");
const backToTop = document.getElementById("back-to-top");
const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("search-input");
const filterButtons = document.getElementById("filter-buttons");
const cartCount = document.getElementById("cart-count");
const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartItemsEl = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCart = document.getElementById("close-cart");
const clearCartBtn = document.getElementById("clear-cart");
const drawerOverlay = document.getElementById("drawer-overlay");
const faqItems = document.querySelectorAll(".faq-item");
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");

const CART_KEY = "novavida_cart";
const THEME_KEY = "novavida_theme";

let selectedCategory = "Todos";
let searchTerm = "";
let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

function renderProducts() {
  const filtered = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  productsGrid.innerHTML = "";

  if (!filtered.length) {
    productsGrid.innerHTML = `<p>Nenhum produto encontrado.</p>`;
    return;
  }

  filtered.forEach((product) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="placeholder-icon">${product.icon}</div>
      <h3>${product.name}</h3>
      <span class="product-tag">${product.tag}</span>
      <p class="price">${currencyBRL(product.price)}</p>
      <button class="btn btn-primary add-to-cart" data-name="${product.name}" data-price="${product.price}">
        Adicionar ao carrinho
      </button>
    `;
    productsGrid.appendChild(card);
  });
}

function updateCartUI() {
  cartCount.textContent = cart.length;
  cartItemsEl.innerHTML = "";

  if (!cart.length) {
    cartItemsEl.innerHTML = "<li>Seu carrinho está vazio.</li>";
    cartTotal.textContent = currencyBRL(0);
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>${currencyBRL(item.price)}</p>
      </div>
      <button class="remove-item" data-index="${index}">Remover</button>
    `;
    cartItemsEl.appendChild(li);
  });

  cartTotal.textContent = currencyBRL(total);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name, price: Number(price) });
  updateCartUI();
}

function openCart() {
  cartDrawer.classList.add("open");
  drawerOverlay.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  drawerOverlay.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  setTheme(saved);
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinksContainer.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    navLinksContainer.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { threshold: 0.45 }
);

document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 420);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(current);
});

document.addEventListener("click", (event) => {
  const btn = event.target.closest(".add-to-cart");
  if (!btn) return;

  addToCart(btn.dataset.name, btn.dataset.price);
});

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
drawerOverlay.addEventListener("click", closeCartDrawer);

cartItemsEl.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".remove-item");
  if (!removeBtn) return;

  const index = Number(removeBtn.dataset.index);
  cart.splice(index, 1);
  updateCartUI();
});

clearCartBtn.addEventListener("click", () => {
  cart = [];
  updateCartUI();
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  renderProducts();
});

filterButtons.addEventListener("click", (event) => {
  const btn = event.target.closest(".filter-btn");
  if (!btn) return;

  selectedCategory = btn.dataset.category;
  document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
  btn.classList.add("active");
  renderProducts();
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !message) {
    formFeedback.textContent = "Preencha todos os campos obrigatórios.";
    return;
  }

  if (!emailValid) {
    formFeedback.textContent = "Informe um e-mail válido.";
    return;
  }

  formFeedback.textContent = "Mensagem enviada (demo).";
  contactForm.reset();
});

initTheme();
renderProducts();
updateCartUI();
