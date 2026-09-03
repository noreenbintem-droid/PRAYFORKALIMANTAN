document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     TAHUN OTOMATIS
  ========================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================
     KONFIRMASI DONASI
  ========================= */

  const confirmButton =
    document.getElementById("confirmDonation");

  if (confirmButton) {

    confirmButton.addEventListener("click", function () {

      alert(
        "Terima kasih atas kepedulian Anda ❤️\n\n" +
        "Silakan pastikan bukti pembayaran sudah dipilih."
      );

    });

  }


  /* =========================
     FILE UPLOAD
  ========================= */

  const fileInput =
    document.querySelector(".upload-box input");

  const uploadBox =
    document.querySelector(".upload-box");

  if (fileInput && uploadBox) {

    fileInput.addEventListener("change", function () {

      if (fileInput.files.length > 0) {

        const fileName =
          fileInput.files[0].name;

        uploadBox.querySelector("strong")
          .textContent = "✓ Bukti pembayaran dipilih";

        uploadBox.querySelector("span")
          .textContent = fileName;

      }

    });

  }


  /* =========================
     ANIMASI SAAT SCROLL
  ========================= */

  const animatedElements =
    document.querySelectorAll(
      ".stat-box, .program-card, .update-card"
    );

  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  animatedElements.forEach(function (element) {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
      "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

  });


  /* =========================
     STYLE ANIMASI
  ========================= */

  const style =
    document.createElement("style");

  style.innerHTML = `
    .stat-box.show,
    .program-card.show,
    .update-card.show {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;

  document.head.appendChild(style);


  /* =========================
     SMOOTH BUTTON
  ========================= */

  document.querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

      link.addEventListener("click", function (event) {

        const targetId =
          link.getAttribute("href");

        const target =
          document.querySelector(targetId);

        if (target) {

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      });

    });

});