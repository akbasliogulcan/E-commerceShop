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




//Sepetteki ürğn miktarını  sepet ikonuna render eden fonksiyon
const updateCartIcon = (cart) => {
          //sepet ikonuna eriş
          const cartIcon = document.querySelector('#cart-icon')

          //sepetteki toplam ürün miktarına eriş 
          const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

          //sepet ikonu yanında toplam ürün miktarını render et
          cartIcon.setAttribute("data-quantitiy", totalQuantity)
};

//sepetteki toplam fiyatı hesaplayan fonksiyon
const calculateCartTotal = (cart) => {
          return cart.reduce(
                    (total, product) => total + product.price * product.quantity,
                    0
          );
};


//sepetteki ürünleri renderlayan fonksiyon
const displayCartTotal = (cart) => {
          //toplam ürün fiyatını hesaplayan fonk.çalıştır
          const total = calculateCartTotal(cart);
          //Sepetteki toplam ürün miktarını render et (ekrana bastır) 
          elements.cartTotal.textContent = `Total: $ ${total.toFixed(2)}`;  //toFixed(2) virgülden sonrasını kısaltır


};

export { saveToLocalStorage, getFromLocalStorage, updateCartIcon, calculateCartTotal, displayCartTotal };