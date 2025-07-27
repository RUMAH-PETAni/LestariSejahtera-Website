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
        price: 70000,
        star: "⭐⭐⭐☆☆",
        quant: " / kilogram",
      },
      {
        id: 3,
        name: "Eco Souvenirs",
        img: "(3).webp",
        price: 150000,
        star: "⭐⭐⭐⭐☆",
        quant: " / bundle",
      },
    ],
    items2: [
      {
        id: 4,
        name: "1 Day Trip",
        img: "(4).webp",
        price: 1000000,
        star: "⭐⭐⭐⭐⭐",
        quant: " / orang",
      },
      {
        id: 5,
        name: "2 Day 1 Night",
        img: "(5).webp",
        price: 2000000,
        star: "⭐⭐⭐⭐⭐",
        quant: " / orang",
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
// const checkoutButton = document.querySelector(".checkout-button");
// checkoutButton.disabled = true;

// const form = document.querySelector("#checkoutForm");

// form.addEventListener("keyup", function () {
//   for (let i = 0; i < form.elements.length; i++) {
//     if (form.elements[i].value.length !== 0) {
//       checkoutButton.classList.remove("disabled");
//       checkoutButton.classList.add("disabled");
//     } else {
//       return false;
//     }
//   }

//   checkoutButton.disabled = false;
//   checkoutButton.classList.remove("disabled");
// });

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
