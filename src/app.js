// //alpine dropdown
// document.addEventListener("alpine:init", () => {
//   Alpine.data("dropdown", () => ({
//     open: false,

//     toggle() {
//       this.open = !this.open;
//     },
//   }));
// });

//alpine store
document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Roasted Robusta",
        img: "(1).webp",
        price: 50000,
        star: "⭐⭐⭐⭐⭐",
        quant: " / 250 gram",
      },
      {
        id: 2,
        name: "Greenbean Robusta",
        img: "(2).webp",
        price: 75000,
        star: "⭐⭐⭐☆☆",
        quant: " / kilogram",
      },
      {
        id: 3,
        name: "Eco Souvenir",
        img: "(3).webp",
        price: 100000,
        star: "⭐⭐⭐⭐☆",
        quant: " / bundle",
      },
    ],
    items2: [
      {
        id: 4,
        name: "Paket Ekowisata 1",
        img: "(4).webp",
        price: 1000000,
        star: "⭐⭐⭐⭐⭐",
        quant: " / 1 Day Trip",
      },
      {
        id: 5,
        name: "Paket Ekowisata 2",
        img: "(5).webp",
        price: 2000000,
        star: "⭐⭐⭐⭐☆",
        quant: " / 2 Day 1 Night",
      },
      {
        id: 6,
        name: "Donasi Bibit Pohon",
        img: "(6).webp",
        price: 100000,
        star: "⭐⭐⭐⭐⭐",
        quant: " / 5 pohon ditanam",
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah adakah barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang sudah ada di cart
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan  totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      //ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);
      //jika item lebih dari 1
      if (cartItem.quantity > 1) {
        //telusuri satu satu
        this.items = this.items.map((item) => {
          //jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        //jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

//Form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }

  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

//kirim data ketika tombol di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  // console.log(objData);
  window.open("http://wa.me/6281273891704?text=" + encodeURIComponent(message));
});

//format pesan WA
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  Phone: ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map(
  (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
)}
TOTAL: ${rupiah(obj.total)}
Terima Kasih.
  `;
};

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// Modal Box
// const itemDetailModal = document.querySelector("#products");
// const itemDetailButtons = document.querySelectorAll(".product");

// itemDetailButtons.forEach((btn) => {
//   btn.onclick = (e) => {
//     itemDetailModal.style.display = "flex";
//     e.preventDefault();
//   };
// });
