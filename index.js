document.addEventListener("DOMContentLoaded", () => {
  const filterContainer = document.querySelector(".gallery-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const searchBar = document.getElementById("search-bar");

  // Filter items based on selected filter
  filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item")) {
      filterContainer.querySelector(".active").classList.remove("active");
      event.target.classList.add("active");

      const filterValue = event.target.getAttribute("data-filter");
      reorderGalleryItems(filterValue);
    }
  });

  // Filter items based on search input
  searchBar.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    reorderGalleryItems(searchTerm);
  });

  // Reorder gallery items based on filter or search term
  function reorderGalleryItems(filterValue) {
    const visibleItems = [];
    galleryItems.forEach((item) => {
      if (item.classList.contains(filterValue) || filterValue === 'all' || item.querySelector("img").alt.toLowerCase().includes(filterValue)) {
        visibleItems.push(item);
      }
    });

    // Reorder visible items
    visibleItems.sort((a, b) => {
      const altTextA = a.querySelector("img").alt.toLowerCase();
      const altTextB = b.querySelector("img").alt.toLowerCase();
      return altTextA.localeCompare(altTextB);
    });

    // Update the DOM with the reordered items
    const galleryRow = document.querySelector(".row");
    galleryRow.innerHTML = "";
    visibleItems.forEach((item) => {
      galleryRow.appendChild(item);
    });
  }
});