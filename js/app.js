(function () {
  "use strict";

  const SALE_SESSION_KEY = "pranita-sale-dismissed";
  const DEFAULT_SALE_TITLE = "Sale";
  const FEATHER_IMAGE_SRC = "assets/peacock-feather.png";

  const landing = document.getElementById("landing");
  const landingSale = document.getElementById("landing-sale");
  const landingSaleTitle = document.getElementById("landing-sale-title");
  const landingSaleMessage = document.getElementById("landing-sale-message");
  const catalog = document.getElementById("catalog");
  const landingCategories = document.getElementById("landing-categories");
  const sidebarCategories = document.getElementById("sidebar-categories");
  const productGrid = document.getElementById("product-grid");
  const catalogTitle = document.getElementById("catalog-title");
  const catalogEmpty = document.getElementById("catalog-empty");
  const contactName = document.getElementById("contact-name");
  const contactPhone = document.getElementById("contact-phone");
  const mobileContactName = document.getElementById("mobile-contact-name");
  const mobileContactPhone = document.getElementById("mobile-contact-phone");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const backHome = document.getElementById("back-home");
  const salePopup = document.getElementById("sale-popup");
  const saleTitle = document.getElementById("sale-title");
  const saleMessage = document.getElementById("sale-message");
  const saleClose = document.getElementById("sale-close");

  let activeCategoryId = null;

  function getCategoryById(id) {
    return CATALOG.categories.find(function (category) {
      return category.id === id;
    });
  }

  function itemsForCategory(categoryId) {
    return CATALOG.items.filter(function (item) {
      return item.categoryId === categoryId;
    });
  }

  function phoneHref(phone) {
    return "tel:" + String(phone).replace(/[^\d+]/g, "");
  }

  function renderContact() {
    const { name, phone } = CATALOG.contact;
    contactName.textContent = name;
    contactPhone.textContent = phone;
    contactPhone.href = phoneHref(phone);
    mobileContactName.textContent = name;
    mobileContactPhone.textContent = phone;
    mobileContactPhone.href = phoneHref(phone);
  }

  function renderLandingCategories() {
    landingCategories.innerHTML = "";
    CATALOG.categories.forEach(function (category) {
      const link = document.createElement("a");
      link.href = "#";
      link.className = "landing__category";
      link.textContent = category.label;
      link.dataset.categoryId = category.id;
      link.addEventListener("click", function (event) {
        event.preventDefault();
        openCatalog(category.id);
      });
      landingCategories.appendChild(link);
    });
  }

  function renderSidebarCategories() {
    sidebarCategories.innerHTML = "";
    CATALOG.categories.forEach(function (category) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "sidebar__link";
      button.textContent = category.label;
      button.dataset.categoryId = category.id;
      button.addEventListener("click", function () {
        selectCategory(category.id);
        closeMobileSidebar();
      });
      sidebarCategories.appendChild(button);
    });
  }

  function updateSidebarActive(categoryId) {
    sidebarCategories.querySelectorAll(".sidebar__link").forEach(function (link) {
      const isActive = link.dataset.categoryId === categoryId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function createProductCard(item) {
    const article = document.createElement("article");
    article.className = "product-card";

    const media = document.createElement("div");
    media.className = "product-card__media";

    const hasImage = Boolean(item.image && item.image.trim());

    if (hasImage) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.loading = "lazy";
      img.addEventListener("error", function () {
        media.innerHTML = "";
        media.appendChild(createPlaceholder(item));
      });
      media.appendChild(img);
    } else {
      media.appendChild(createPlaceholder(item));
    }

    const name = document.createElement("h2");
    name.className = "product-card__name";
    name.textContent = item.name;

    article.appendChild(media);
    article.appendChild(name);
    return article;
  }

  function createPlaceholder(item) {
    const placeholder = document.createElement("div");
    placeholder.className = "product-card__placeholder";
    const feather = document.createElement("img");
    feather.className = "product-card__placeholder-mark";
    feather.src = FEATHER_IMAGE_SRC;
    feather.alt = "";
    placeholder.appendChild(feather);
    const note = document.createElement("p");
    note.className = "product-card__placeholder-note";
    note.textContent = "Photo coming soon";
    placeholder.appendChild(note);
    placeholder.setAttribute("aria-label", item.name + " — photo coming soon");
    return placeholder;
  }

  function renderProducts(categoryId) {
    const category = getCategoryById(categoryId);
    const items = itemsForCategory(categoryId);

    catalogTitle.textContent = category ? category.label : "Collection";
    productGrid.innerHTML = "";

    if (items.length === 0) {
      catalogEmpty.hidden = false;
      return;
    }

    catalogEmpty.hidden = true;
    items.forEach(function (item) {
      productGrid.appendChild(createProductCard(item));
    });
  }

  function selectCategory(categoryId) {
    activeCategoryId = categoryId;
    updateSidebarActive(categoryId);
    renderProducts(categoryId);
  }

  function showView(view) {
    const showLanding = view === "landing";
    landing.hidden = !showLanding;
    catalog.hidden = showLanding;
    landing.classList.toggle("is-active", showLanding);
    catalog.classList.toggle("is-active", !showLanding);
  }

  function openCatalog(categoryId) {
    showView("catalog");
    selectCategory(categoryId);
    maybeShowSalePopup();
    window.scrollTo(0, 0);
  }

  function openLanding() {
    showView("landing");
    closeMobileSidebar();
    window.scrollTo(0, 0);
  }

  function openMobileSidebar() {
    catalog.classList.add("is-sidebar-open");
    menuToggle.setAttribute("aria-expanded", "true");
    sidebarBackdrop.hidden = false;
  }

  function closeMobileSidebar() {
    catalog.classList.remove("is-sidebar-open");
    menuToggle.setAttribute("aria-expanded", "false");
    sidebarBackdrop.hidden = true;
  }

  function toggleMobileSidebar() {
    if (catalog.classList.contains("is-sidebar-open")) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  }

  function isSaleActive() {
    return Boolean(CATALOG.sale && CATALOG.sale.active);
  }

  function renderLandingSale() {
    if (!isSaleActive()) {
      landingSale.hidden = true;
      return;
    }

    landingSaleTitle.textContent = CATALOG.sale.title || DEFAULT_SALE_TITLE;
    landingSaleMessage.textContent = CATALOG.sale.message || "";
    landingSale.hidden = false;
  }

  function maybeShowSalePopup() {
    if (!isSaleActive() || sessionStorage.getItem(SALE_SESSION_KEY) === "1") {
      salePopup.hidden = true;
      return;
    }

    saleTitle.textContent = CATALOG.sale.title || DEFAULT_SALE_TITLE;
    saleMessage.textContent = CATALOG.sale.message || "";
    salePopup.hidden = false;
  }

  function dismissSalePopup() {
    salePopup.hidden = true;
    sessionStorage.setItem(SALE_SESSION_KEY, "1");
  }

  function bindEvents() {
    backHome.addEventListener("click", openLanding);
    menuToggle.addEventListener("click", toggleMobileSidebar);
    sidebarBackdrop.addEventListener("click", closeMobileSidebar);
    saleClose.addEventListener("click", dismissSalePopup);
    salePopup.addEventListener("click", function (event) {
      if (event.target === salePopup) {
        dismissSalePopup();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        if (!salePopup.hidden) {
          dismissSalePopup();
        } else if (catalog.classList.contains("is-sidebar-open")) {
          closeMobileSidebar();
        }
      }
    });
  }

  function init() {
    if (typeof CATALOG === "undefined") {
      console.error("Pranita Collections: catalog.js failed to load.");
      return;
    }

    if (typeof Ornaments === "undefined") {
      console.error("Pranita Collections: ornaments.js failed to load.");
      return;
    }

    Ornaments.init();
    renderContact();
    renderLandingSale();
    renderLandingCategories();
    renderSidebarCategories();
    bindEvents();
    showView("landing");
  }

  init();
})();
