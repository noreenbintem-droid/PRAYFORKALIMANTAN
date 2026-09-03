document.addEventListener(
  "DOMContentLoaded",
  () => {

    /* ===============================
       ELEMENT
    =============================== */

    const amountButtons =
      document.querySelectorAll(
        ".amount-btn"
      );

    const customAmount =
      document.getElementById(
        "customAmount"
      );

    const selectedAmount =
      document.getElementById(
        "selectedAmount"
      );

    const donationForm =
      document.getElementById(
        "donationForm"
      );


    /* ===============================
       NOMINAL AWAL
    =============================== */

    let currentAmount = 25000;


    /* ===============================
       FORMAT RUPIAH
    =============================== */

    function formatRupiah(number) {

      return new Intl.NumberFormat(
        "id-ID"
      ).format(number);

    }


    /* ===============================
       UPDATE NOMINAL
    =============================== */

    function updateAmount(amount) {

      const numericAmount =
        Number(amount);

      if (
        !numericAmount ||
        numericAmount < 1000
      ) {
        return;
      }

      currentAmount =
        numericAmount;


      selectedAmount.textContent =
        `Rp${formatRupiah(
          currentAmount
        )}`;


      amountButtons.forEach(
        (button) => {

          const buttonAmount =
            Number(
              button.dataset.amount
            );

          button.classList.toggle(
            "active",
            buttonAmount ===
              currentAmount
          );

        }
      );

    }


    /* ===============================
       DEFAULT
    =============================== */

    updateAmount(
      currentAmount
    );


    /* ===============================
       TOMBOL NOMINAL
    =============================== */

    amountButtons.forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            customAmount.value =
              "";

            updateAmount(
              button.dataset.amount
            );

          }
        );

      }
    );


    /* ===============================
       NOMINAL MANUAL
    =============================== */

    customAmount.addEventListener(
      "input",
      () => {

        if (
          customAmount.value
        ) {

          updateAmount(
            customAmount.value
          );

        }

      }
    );


    /* ===============================
       SUBMIT FORM
    =============================== */

    donationForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const donorName =
          document
            .getElementById(
              "donorName"
            )
            .value
            .trim();


        const whatsapp =
          document
            .getElementById(
              "whatsapp"
            )
            .value
            .trim();


        const program =
          document
            .getElementById(
              "programSelect"
            )
            .value;


        /* VALIDASI */

        if (
          !donorName ||
          !whatsapp
        ) {

          alert(
            "Silakan lengkapi nama dan nomor WhatsApp terlebih dahulu."
          );

          return;

        }


        /*

          UNTUK SEKARANG BELUM ADA QRIS.

          Nanti bagian ini akan kita ganti
          dengan halaman pembayaran QRIS.

        */

        alert(

          "Data donasi siap diproses.\n\n" +

          "Nama: " +
          donorName +

          "\nProgram: " +
          program +

          "\nNominal: Rp" +
          formatRupiah(
            currentAmount
          ) +

          "\n\n" +

          "Tahap QRIS akan kita pasang setelah bagian ini selesai."

        );

      }
    );


    /* ===============================
       SMOOTH SCROLL
    =============================== */

    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(
        (link) => {

          link.addEventListener(
            "click",
            (event) => {

              const targetId =
                link.getAttribute(
                  "href"
                );


              if (
                !targetId ||
                targetId === "#"
              ) {
                return;
              }


              const target =
                document.querySelector(
                  targetId
                );


              if (!target) {
                return;
              }


              event.preventDefault();


              target.scrollIntoView(
                {
                  behavior: "smooth",
                  block: "start"
                }
              );

            }
          );

        }
      );

  }
);