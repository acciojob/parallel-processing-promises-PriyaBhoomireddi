document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const btn = document.getElementById("download-images-button");

  const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
  ];

  btn.addEventListener("click", () => {
    const imagePromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
      });
    });

    // Clear previous images
    output.innerHTML = '';

    Promise.all(imagePromises)
      .then((loadedImages) => {
        loadedImages.forEach((img) => output.appendChild(img));
      })
      .catch((error) => {
        output.textContent = error.message;
      });
  });
});
