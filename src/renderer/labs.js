const inputBox = document.getElementById("input-box");
const dropdownContent = document.querySelector(".dropdown-content");
const totalAmountElement = document.querySelector('.totalAmount');
const availableKeywords = [
    'Blood',
    'Complete Blood Count',
    'Complete Urine Examination',
    'Lipid Profile',
    'Vitamin D - 25',
    'Liver Function Test',
    'Thyroid Profile',
    'Renal Profile',
    'HbA1c'
];

inputBox.onkeyup = function () {
    let input = inputBox.value.toLowerCase().trim();
    let result = availableKeywords.filter((keyword) =>{
        return keyword.toLowerCase().includes(input);
    });
    if (result.length > 0) {
      const filteredProducts = listProducts.filter(product =>
         result.includes(product.name)
     );
     addDataToHTML(filteredProducts);
      dropdownContent.innerHTML = '';
   }else {
      addDataToHTML(listProducts);
  }
};
let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");
let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".icon-cart span");
let paymentButton = document.querySelector('.checkOut');


let listProducts = [];
let carts =[];

iconCart.addEventListener("click",() => {
   body.classList.toggle("showCart")
})
closeCart.addEventListener("click",() =>{
   body.classList.toggle("showCart")
})
const addDataToHTML = () => {
   listProductHTML.innerHTML = '';
   if(listProducts.length > 0){
      listProducts.forEach(product => {
         let newProduct = document.createElement('div');
         newProduct.classList.add('item');
         newProduct.dataset.id = product.id;
         newProduct.innerHTML = `
         <img src="${product.image}" alt="blood">
         <div class="text"><h2>${product.name}</h2>
          <div class="P"><p><b>&#8377 ${product.price}</b></p>
          <p class="discount">(&#8377 ${product.discount})</p>
         <p id="Save">Save 20%</p></div>
         <button class="addCart">Add To Cart</button>
         `;
         listProductHTML.appendChild(newProduct);
      })
   }
}
listProductHTML.addEventListener('click', (event) => {
   let positionClick = event.target;
   if(positionClick.classList.contains('addCart')){
      let product_id = positionClick.closest('.item').dataset.id;
      addToCart(product_id);
   }
})
const addToCart = (product_id) => {
   let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
   if(carts.length <=0){
      carts = [{
         product_id: product_id,
         quantity: 1
      }]
   }else if( positionThisProductInCart  < 0){
      carts.push({
         product_id: product_id,
         quantity: 1
      });
   }else{
      carts[positionThisProductInCart].quantity++;
   }
   addCartToHTML();
   addCartToMemory();
}
const addCartToMemory = () => {
   localStorage.setItem('cart', JSON.stringify(carts));
}
const addCartToHTML = () => {
   listCartHTML.innerHTML = '';
   let totalQuantity = 0;
   let totalPrice = 0;
   if(carts.length > 0){
      carts.forEach(cart => {
         totalQuantity = totalQuantity+cart.quantity;
         let newCart = document.createElement('div');
         newCart.classList.add('Item');
         newCart.dataset.id = cart.product_id;
         let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
         let info = listProducts[positionProduct];
         let subtotal = cart.quantity * info.price;
         totalPrice += subtotal;
         newCart.innerHTML = `
         <div class="image">
                    <img src="${info.image}" alt="blood">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">
                    &#8377 ${info.price}
                </div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>
                `;
                listCartHTML.appendChild(newCart);
      })
   }
   iconCartSpan.innerText = totalQuantity;
   const totalAmountElement = document.querySelector('.totalAmount');
   totalAmountElement.innerText = `Total Amount: ₹ ${totalPrice}`;

}
listCartHTML.addEventListener('click',(event) => {
   let positionClick = event.target;
   if(positionClick.classList.contains('minus')|| positionClick.classList.contains('plus')){
      let product_id = positionClick.parentElement.parentElement.dataset.id;
      let type = 'minus';
      if(positionClick.classList.contains('plus')){
         type = 'plus';
   }
   changeQuantity(product_id , type);
   }
})
const changeQuantity = (product_id , type) => {
   let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
   if(positionItemInCart >= 0){
      switch (type) {
         case 'plus':
            carts[positionItemInCart].quantity = carts[positionItemInCart].quantity+1;
            break;
         default:
            let valueChange = carts[positionItemInCart].quantity-1;
            if(valueChange > 0){
               carts[positionItemInCart].quantity = valueChange;
            }else{
               carts.splice(positionItemInCart,1);
            }
            break;
      }
   }
   addCartToMemory();
   addCartToHTML();
};
paymentButton.addEventListener('click', () => {
        alert('Payment successful');
        carts = [];
        saveCartToMemory();
        addCartToHTML();
      })



const initApp = () => {
   fetch("../../data/products.json")
   .then(response => response.json())
   .then(data => {
      listProducts = data;
      addDataToHTML();
      if(localStorage.getItem('cart')){
         carts = JSON.parse(localStorage.getItem('cart'));
         addCartToHTML();
      }
   })
}
initApp();