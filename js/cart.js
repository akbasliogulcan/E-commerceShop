import { getFromLocalStorage, saveToLocalStorage, updateCartIcon, displayCartTotal } from "./helper.js";
import { renderCartItems } from "./ui.js";
let cart = getFromLocalStorage();



//sepete ürün ekleyen fonksiyon
const addToCart = (e, products) => {  //!10.

          // add-to-cart butonların tıklandığında butonları birbirinden ayırt etmek için bunlara data-id ile birer uniq id atadık.
          // Bu sayede bu butonların birbirinde farklı olmasını sağladık.

          // Tıklanılan elemanı  id'sine eriş //!.11
          const productId = +e.target.dataset.id; //+ işareti string olan id'yi number'a çevirir.


          // Id'si bilinen ürünü product dizisi içerisinden bul
          const product = products.find((product) => product.id === productId);

          //!12.
          //*ürün sepette var mı yoksa yeni mi ekleniyor kontrol eden kod.  
          if (product) {//ürün sepette var mı ?
                    //ürün sepette var mı?  varsa bul.
                    const exitingItem = cart.find((item) => item.id === productId);
                    if (exitingItem) {
                              //ürün sepette varsa sepettteki ürünün adetini 1 arttır.  //quantity sepetteki ürünün adeti demektir
                              exitingItem.quantity++;
                    }

                    else {//ÜRÜN YOKSA

                              //sepete eklenecek ürün için bir obje oluştur.
                              const cartItem = {
                                        id: product.id,
                                        title: product.title,
                                        price: product.price,
                                        image: product.image,
                                        quantity: 1,
                              };
                              //sepet dizisine oluşturulan elemanı ekle
                              cart.push(cartItem);

                              //sepetteki ürün miktarını renderla
                              updateCartIcon(cart);


                    }

          };

          //sepet dizisini local storage kaydet
          saveToLocalStorage(cart);
          // saveToLocalStorage(product) fonksiyonunu çağırdık ve bu fonksiyonun içine product objesini gönderdik.
          //  Bu fonksiyonun içinde ise localstorage'a ürün ekledik.
          //add to cart butonunun içeriğini güncelle
          e.target.innerText = "Added";

          // 3s sonra add to cart butonunun içeriğini tekrar eski haline getir.

          setTimeout(() => {   //!13.
                    e.target.innerText = "Add to cart";
          }, 2000);

};

//sepetten ürün kaldiran fonksiyon
const removeFromCart = (e) => {
          //tıklanılan butonun id'sine eriş
          const productId = parseInt(e.target.dataset.id);

          //tıklanılan elemanı sepetten kaldır.
          cart = cart.filter((item) => item.id !== productId);  //sepette kalmasını istediğimiz elemanlar

          //localStorage güncelle
          saveToLocalStorage(cart);

          //arayüzü renderla
          renderCartItems(cart);

          //sepetteki irin miktarını renderla
          updateCartIcon(cart);

          //sepetteki toplam  ürün  fiyatını renderla
          displayCartTotal(cart);


};

//sepetteki ürünlerin miktarını güncelleyen fonksiyon
const onQuantityChange = (e) => {

          //yeni miktara eriş 
          const newQuantity = parseInt(e.target.value);  //kutucuğun içi
          //güncellenecek elemanın id'sine eriş
          const productId = parseInt(e.target.dataset.id);

          //yeni miktar 0 dan büyükse güncellecenekc elemanın miktiranı güncelle .yani sepette ürünler 0 dan büyük olmak zorunda 
          if (newQuantity > 0) {



                    //güncellenecek  elamaı dizi içseriden bul
                    const updateItem = cart.find((item) => item.id === productId);

                    //güncellenecek elemanın miktarını güncelle
                    updateItem.quantity = newQuantity;

                    //localstorage güncelle
                    saveToLocalStorage(cart);
                    //sepetteki ürün miktarını renderla     
                    calculateCartItems(cart);

                    //sepetteki toplam  ürün  fiyatını renderla
                    displayCartTotal(cart);


          };

};


export { addToCart, removeFromCart, onQuantityChange };

//! yorum : addtocart fonskiyonunu main.js de renderProducts(products, (e) = addToCart(e, products);  }); şeklinde çağırıyoruz. Bu fonksiyonun içindeki e parametresi bizim tıkladığımız butonun kendisidir. Bu butonun data-id attribute'undan ürün id'sini alıyoruz. Bu id'yi kullanarak ürünü sepete ekliyoruz.
//! yorum : Bu fonksiyonu cart.js dosyasında yazmamızın sebebi ise bu fonksiyonun sadece sepet işlemleri ile ilgili olmasıdır. Bu fonksiyonun main.js dosyasında olması gereksiz olurdu.
//!const renderProducts = (products, addToCartFunction) => {}
// renderProducts(products, (e) => {
//           addToCart(e, products);});});


