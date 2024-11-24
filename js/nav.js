// nav.js
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".navbar a");

  // Ensure the navbar is not visible on page load
  navbar.classList.remove("active");

  // Toggle dropdown visibility
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });

  // Close the dropdown when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
    });
  });
});
