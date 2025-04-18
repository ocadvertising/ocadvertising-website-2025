window.toggleSearch = function () {
  const wrapper = document.getElementById("searchBox");
  wrapper.classList.toggle("open");
  const input = wrapper.querySelector("input");
  if (wrapper.classList.contains("open")) {
    setTimeout(() => input.focus(), 100);
  }
};

window.handleSearchEnter = function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = e.target.value.trim().toLowerCase();
    localStorage.setItem("searchQuery", query);

    if (window.location.pathname === "/") {
      window.applyFiltersAndSearch();

      const filterSection = document.querySelector(".filter");
      filterSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/";
    }
  }
};

window.applyFiltersAndSearch = function () {
  const filterSection = document.querySelector(".filter");
  const profileCards = document.querySelectorAll(".profile");
  if (!filterSection || profileCards.length < 2) return;

  const filters = new Set(JSON.parse(localStorage.getItem("filters") || "[]"));
  const query =
    document.getElementById("searchInput")?.value.toLowerCase() || "";

  document.querySelectorAll(".profile").forEach((card) => {
    const roles = card.dataset.roles.split("/");
    const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const matchesFilter = [...filters].every((f) => roles.includes(f));
    const matchesSearch = name.includes(query);
    const shouldShow = (filters.size === 0 || matchesFilter) && matchesSearch;
    card.classList.toggle("hidden", !shouldShow);
  });

  document.querySelectorAll(".filter button").forEach((btn) => {
    btn.classList.toggle("active", filters.has(btn.dataset.role));
  });
};

window.toggleFilter = function (role) {
  const filters = new Set(JSON.parse(localStorage.getItem("filters") || "[]"));
  filters.has(role) ? filters.delete(role) : filters.add(role);
  localStorage.setItem("filters", JSON.stringify([...filters]));
  window.applyFiltersAndSearch();
};

window.filterBySearch = function () {
  window.applyFiltersAndSearch();
};

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("keydown", window.handleSearchEnter);
  }

  const savedQuery = localStorage.getItem("searchQuery");

  // Always clear query on page load
  localStorage.removeItem("searchQuery");

  if (window.location.pathname !== "/") return;

  // Apply role filters
  const filters = JSON.parse(localStorage.getItem("filters") || "[]");
  filters.forEach((role) => window.toggleFilter(role));

  if (savedQuery && input) {
    input.value = savedQuery;
  }

  window.applyFiltersAndSearch();

  if (savedQuery) {
    document.querySelector(".filter")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});
