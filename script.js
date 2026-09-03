/* =====================================================
   KALIMANTAN PEDULI
   SCRIPT DONASI
===================================================== */


/* =====================================================
   NOMOR WHATSAPP
===================================================== */

/*
  GANTI NOMOR INI NANTI DENGAN NOMOR WHATSAPP YAYASAN.

  Format:
  628xxxxxxxxxx

  Jangan menggunakan:
  +62
  spasi
  tanda -
*/

const WHATSAPP_NUMBER = "6280000000000";


/* =====================================================
   ELEMENT WEBSITE
===================================================== */

const form = document.getElementById("donationForm");

const payment = document.getElementById("paymentStep");

const formCard = document.getElementById("donasi-form");

const amount = document.getElementById("amount");

const summary = document.getElementById("summaryAmount");

const nameInput = document.getElementById("name");

const phoneInput = document.getElementById("phone");

const program = document.getElementById("programSelect");

const proof = document.getElementById("proof");

const fileName = document.getElementById("fileName");


/* =====================================================
   FORMAT RUPIAH
===================================================== */

const rupiah = (value) => {

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }
  )
  .format(Number(value))
  .replace("IDR", "Rp");

};


/* =====================================================
   NOMINAL DEFAULT
===================================================== */

const defaultAmountButton =
  document.querySelector(
    '.amounts button[data-amount="25000"]'
  );


if(defaultAmountButton){

  defaultAmountButton.classList.add("active");

}


/* =====================================================
   PILIH NOMINAL DONASI
===================================================== */

document
  .querySelectorAll(".amounts button")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        /*
          Hapus status aktif dari
          semua tombol.
        */

        document
          .querySelectorAll(".amounts button")
          .forEach((item) => {

            item.classList.remove("active");

          });


        /*
          Aktifkan tombol yang dipilih.
        */

        button.classList.add("active");


        /*
          Masukkan nominal
          ke input nominal.
        */

        amount.value = button.dataset.amount;

      }

    );

  });


/* =====================================================
   JIKA INPUT NOMINAL DIUBAH MANUAL
===================================================== */

amount.addEventListener(
  "input",
  () => {

    /*
      Kalau user mengetik nominal sendiri,
      hilangkan pilihan tombol sebelumnya.
    */

    document
      .querySelectorAll(".amounts button")
      .forEach((button) => {

        if(button.dataset.amount !== amount.value){

          button.classList.remove("active");

        }

      });


    /*
      Kalau nominal sama dengan salah satu tombol,
      aktifkan tombol tersebut.
    */

    const selected =
      document.querySelector(
        `.amounts button[data-amount="${amount.value}"]`
      );


    if(selected){

      selected.classList.add("active");

    }

  }
);


/* =====================================================
   SUBMIT FORM DONASI
===================================================== */

form.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    /*
      Validasi nominal.
    */

    if(Number(amount.value) < 1000){

      alert(
        "Nominal minimum donasi adalah Rp1.000."
      );

      return;

    }


    /*
      Pastikan nama diisi.
    */

    if(nameInput.value.trim() === ""){

      alert(
        "Silakan masukkan nama donatur."
      );

      nameInput.focus();

      return;

    }


    /*
      Pastikan nomor WhatsApp diisi.
    */

    if(phoneInput.value.trim() === ""){

      alert(
        "Silakan masukkan nomor WhatsApp."
      );

      phoneInput.focus();

      return;

    }


    /*
      Tampilkan nominal
      di halaman pembayaran.
    */

    summary.textContent =
      rupiah(amount.value);


    /*
      Sembunyikan form.
    */

    formCard.classList.add(
      "hidden"
    );


    /*
      Tampilkan pembayaran.
    */

    payment.classList.remove(
      "hidden"
    );


    /*
      Scroll otomatis ke
      bagian pembayaran.
    */

    setTimeout(
      () => {

        payment.scrollIntoView(
          {
            behavior:"smooth",
            block:"start"
          }
        );

      },
      50
    );

  }
);


/* =====================================================
   KEMBALI KE FORM
===================================================== */

document
  .getElementById("backToForm")
  .addEventListener(
    "click",
    () => {

      /*
        Sembunyikan halaman pembayaran.
      */

      payment.classList.add(
        "hidden"
      );


      /*
        Tampilkan kembali form.
      */

      formCard.classList.remove(
        "hidden"
      );


      /*
        Scroll kembali ke form.
      */

      setTimeout(
        () => {

          formCard.scrollIntoView(
            {
              behavior:"smooth",
              block:"start"
            }
          );

        },
        50
      );

    }
  );


/* =====================================================
   UPLOAD BUKTI PEMBAYARAN
===================================================== */

proof.addEventListener(
  "change",
  () => {

    if(proof.files.length > 0){

      fileName.textContent =
        proof.files[0].name;

    }else{

      fileName.textContent =
        "Pilih file bukti pembayaran";

    }

  }
);


/* =====================================================
   KONFIRMASI DONASI
===================================================== */

document
  .getElementById("confirmBtn")
  .addEventListener(
    "click",
    () => {

      /*
        Pastikan bukti pembayaran
        sudah dipilih.
      */

      if(!proof.files.length){

        alert(
          "Silakan upload bukti pembayaran terlebih dahulu."
        );

        return;

      }


      /*
        Buat pesan WhatsApp.
      */

      const message =

`Halo Kalimantan Peduli, saya ingin mengonfirmasi donasi.

Nama: ${nameInput.value}

WhatsApp: ${phoneInput.value}

Program: ${program.value}

Nominal: ${rupiah(amount.value)}

Bukti pembayaran: ${proof.files[0].name}

Terima kasih.`;


      /*
        Buka WhatsApp.
      */

      window.open(

        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,

        "_blank"

      );

    }
  );


/* =====================================================
   ANIMASI SCROLL SEDERHANA
===================================================== */

const sections =
  document.querySelectorAll(
    "section"
  );


/*
  Tambahkan class saat
  section terlihat.
*/

const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if(entry.isIntersecting){

            entry.target.classList.add(
              "visible"
            );

          }

        }
      );

    },
    {
      threshold:.08
    }
  );


sections.forEach(
  (section) => {

    observer.observe(
      section
    );

  }
);


/* =====================================================
   CEGAH LINK # BERLARI KE ATAS
===================================================== */

document
  .querySelectorAll('a[href="#"]')
  .forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

        }
      );

    }
  );


/* =====================================================
   SELESAI
===================================================== */

console.log(
  "Kalimantan Peduli berhasil dimuat."
);