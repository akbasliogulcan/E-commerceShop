import { elements } from "./ui.js";

// Localstorage'a ekleme yapan fonksiyon
const saveToLocalStorage = (cart) => {
          // Dışarıdan verilen elemanı  JSON.stringify ile stringe çevir ve localstorage'a ekle
          localStorage.setItem("cart", JSON.stringify(cart));

};


// Localstorage'dan eleman alan fonksiyon (elemanları local storege da tutmak için )
//aşağıdaki kod parçası, localstorage'dan veri almak için kullanılır. Eğer localstorage'da cart adında bir eleman varsa bu elemanı alır ve JSON.parse ile js nesnesine çevirir. Eğer localstorage'da cart adında bir eleman yoksa boş bir dizi döndürür.
const getFromLocalStorage = () => {
          // LocalStorage'daki cart key'ine sahip elemanları localstorage'd
          // an al
          const strData = localStorage.getItem("cart");
          // Eğer localstorage'da veri varsa bunu JSON.parse ile dönüştür ve return et ama yoksa boş bir dizi return et
          return strData ? JSON.parse(strData) : [];
};


// //sepetteki toplam ürün adedini hesaplayan fonksiyon
// const calculateCartItems = (cart) => {

//           //dizideki ürün sayısını hesaplamalı

//           return cart.reduce((total, item) => total + item.quantity, 0);        

// };

//Sepetteki ürğn miktarını  sepet ikonuna render eden fonksiyon
const updateCartIcon = (cart) => {
          //sepet ikonuna eriş
          const cartIcon = document.querySelector('#cart-icon')

          //sepetteki toplam ürün miktarına eriş 
          const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

          //sepet ikonu yanında toplam ürün miktarını render et
          cartIcon.setAttribute("data-quantitiy", totalQuantity)
};



export { saveToLocalStorage, getFromLocalStorage, updateCartIcon };