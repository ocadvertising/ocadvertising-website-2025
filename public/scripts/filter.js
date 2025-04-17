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
    const filterSection = document.querySelector(".filter");
    filterSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

window.applyFiltersAndSearch = function () {
  const filters = new Set(JSON.parse(localStorage.getItem("filters") || "[]"));
  const query =
    document.getElementById("searchInput")?.value.toLowerCase() || "";

  document.querySelectorAll(".profile").forEach((card) => {
    const roles = card.dataset.roles.split("/");
    const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const matchesFilter = [...filters].every((f) => roles.includes(f));
    const matchesSearch = name.includes(query);
    card.style.display =
      (filters.size === 0 || matchesFilter) && matchesSearch ? "" : "none";
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

window.filterBySearch = function (query) {
  window.applyFiltersAndSearch();
};

window.addEventListener("DOMContentLoaded", () => {
  window.applyFiltersAndSearch();
});
