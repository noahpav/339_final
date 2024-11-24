// List of images in the photos folder
const images = [
  "photos/img0.jpg",
  "photos/img1.jpg",
  "photos/img2.jpg",
  "photos/img3.jpg",
  "photos/img4.jpg",
];

let currentIndex = 0; // Track the currently displayed image

// Get DOM elements
const galleryImage = document.getElementById("galleryImage");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

// Show the previous image
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop backward
  updateImage();
});

// Show the next image
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length; // Loop forward
  updateImage();
});

// Update the displayed image
function updateImage() {
  galleryImage.src = images[currentIndex];
}
