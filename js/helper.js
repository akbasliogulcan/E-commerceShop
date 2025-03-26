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

export { saveToLocalStorage, getFromLocalStorage };