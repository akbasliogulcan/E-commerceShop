import { removeFromCart } from "./cart.js";
import { saveToLocalStorage, getFromLocalStorage } from "./helper.js";

// Ui elemanlarının tutulduğu obje
const elements = {
  menuIcon: document.querySelector("#menu-icon"),
  menu: document.querySelector(".navbar"),
  productList: document.querySelector("#product-list"),
  cartContainer: document.querySelector("#cart-items"),

};

//ürününü kartlarını render eden fonksiyon
const renderProducts = (products, addToCartFunction) => {

  const productsHtml = products.map(
    (product) => ` <div class="product">
         
                <img
                  src="${product.image}"
                  alt="product-image"
                  class="product-image"
                />
            
                <div class="product-info">
                  <h2 class="product-title">${product.title}</h2>
                  <p class="product-price">$${product.price}</p>
                  <a class="add-to-cart" data-id='${product.id}' >Add to cart</a>
        
                </div>
              </div>`
  )
    .join();

  //oluşturulan htmli arayüze aktar
  //   Bu kod satırı, elements.productList adlı bir HTML öğesinin innerHTML özelliğini productsHtml değişkeninin içeriğiyle günceller.Yani:
  // productsHtml değişkeninde HTML kodu varsa, bu kod elements.productList içine eklenir.Önceki içerik tamamen silinir ve yerine yeni HTML kodu gelir.
  elements.productList.innerHTML = productsHtml;

  // Classı add-to-cart olan elemanlara eriş   .Bunu burada yazmamızın nedeni add to cart ın  renderProducts içinde olması .
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  // querySelectorAll metodu erişilen elemanları bir dizi şeklinde döndürdüğünden bu elemana direkt addEventListener ekleyemeyiz.
  // Bunun için dizi içerisindeki elemanlara teker teker erişmemiz gerek

  for (let i = 0; i < addToCartButtons.length; i++) {
    // Dizinin içerisindeki butonlara teker teker eriş
    const addToCartButton = addToCartButtons[i];

    // Erişilen elemana bir click olayı ekle
    addToCartButton.addEventListener("click", addToCartFunction);
  }

};

//sepetteki ürünleri renderlayan fonksiyon
const renderCartItems = (cart) => {
  elements.cartContainer.innerHTML = cart
    .map(
      (item) => `       <div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />

              <div class="cart-item-info">
                <h2 class="cart-title">${item.title}</h2>
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  class="cart-item-quantity"
                  data-id='${item.id}'
                />
              </div>
              <h2 class="cart-item-price">$${item.price}</h2>
              <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
            </div>`
    )
    .join("");

  //remove butonlara eriş
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  //remove buttonlara olay izleyici ekle
  for (let i = 0; i < removeButtons.length; i++) {
    //remove butonlara eriş
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", (removeFromCart) => { }   //removeFromCart fonksiyonu burada çağrılacak
    );
  }
};

export { elements, renderProducts, renderCartItems };


