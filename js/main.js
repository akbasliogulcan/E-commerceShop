import fetchProducts from "./api.js";
import { addToCart } from "./cart.js";
import { getFromLocalStorage, updateCartIcon, displayCartTotal } from "./helper.js";
import { elements, renderCartItems, renderProducts } from "./ui.js";


elements.menuIcon.addEventListener("click", () => {
          elements.menu.classList.toggle("open-menu");
});

document.addEventListener("DOMContentLoaded", () => {

          // Bu projede  kullanıcı ana sayfada ise api'dan verileri almalı ve arayüzü renderlamalıyız 
          // ama eğer sepet sayfasında isek sepetteki ürünleri renderlamalıyız.Bu sebeple hangi sayfada olduğumuza karar vermeliyiz.

          // Localstorage'dan sepetteki ürünleri al
          const cart = getFromLocalStorage();



          // ? Hangi sayfadayız ?  
          //! 1.
          if (window.location.pathname.includes("/cart.html")) {
                    // * Sepet Sayfası İşlemleri
                    // const cart = getFromLocalStorage();
                    renderCartItems(cart);
                    // Sepetteki toplam ürün fiyatını renderla
                    displayCartTotal(cart);


          } else {
                    // * Ana Sayfa İşlemleri  (api ya istek atılmalı ve veriler çekilmeli (renderlanmalı))
                    fetchProducts().then((products) => {   //!2.
                              //aşağıdaki kod, bir ürün listesini render eden (renderProducts) bir fonksiyonu çağırıyor ve her ürüne tıklandığında addToCart fonksiyonunu çalıştıran bir olay işleyicisi (callback function) ekliyor.
                              renderProducts(products, (e) => {  //!3.
                                        addToCart(e, products);
                              });
                    })
                              .catch((err) => {
                                        console.log(`Error: ${err}`);
                              });
          }

          // Sepet ikonu yanıdaki miktarı render et
          updateCartIcon(cart);
});

