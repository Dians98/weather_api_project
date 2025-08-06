window.addEventListener("load", () => {
    const loader = document.querySelector(".loader-wrapper");
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 2000); // minimum 800ms affichage du loader
  });
  