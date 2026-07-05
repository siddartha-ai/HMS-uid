document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const inputBox = document.getElementById("input-box");
    const dropdownContent = document.querySelector(".dropdown-content");
    let products = []; 

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

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
               
                fetch("../../data/kidney.json")
             
            ]);
            const data = await Promise.all(responses.map(response => response.json()));
            products = data.flat(); 
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching the data', error);
        }
    };

    const displayProducts = (products) => {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const { id, name, price, discount, image } = product;
            const discountPercentage = Math.round(((discount - price) / discount) * 100);

            const productElement = document.createElement('div');
            productElement.classList.add('item');
            productElement.dataset.id = id; 
            productElement.innerHTML = `
                <img src="${image}" alt="${name}">
                <div class="text">
                    <h2>${name}</h2>
                    <div class="P">
                        <p><b>&#8377 ${price}</b></p>
                        <p class="discount">(&#8377 ${discount})</p>
                        <p id="Save">Save ${discountPercentage}%</p>
                    </div>
                    <button class="addCart" data-id="${id}">Add To Cart</button>
                </div>
            `;
            productContainer.appendChild(productElement);
        });
    };

    const filterProducts = (query) => {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        displayProducts(filteredProducts);
    };

    inputBox.onkeyup = function () {
        let input = inputBox.value.toLowerCase().trim();
        let result = availableKeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input);
        });
        displayDropdown(result);
        filterProducts(input); 
    };

    function displayDropdown(result) {
        if (result.length > 0) {
            const content = result.map((item) => {
                return "<li onclick='selectInput(this)'>" + item + "</li>";
            });
            dropdownContent.innerHTML = "<ul>" + content.join('') + "</ul>";
        } 
    }
    window.selectInput = function (list) { 
        inputBox.value = list.innerHTML;
        dropdownContent.innerHTML = '';
        filterProducts(list.innerHTML); 
    };

    fetchData();

    let iconCart = document.querySelector(".icon-cart");
    let closeCart = document.querySelector(".close");
    let body = document.querySelector("body");
    let listProductHTML = document.querySelector(".listProduct");
    let listCartHTML = document.querySelector(".listCart");
    let iconCartSpan = document.querySelector(".icon-cart span");

    let carts = JSON.parse(localStorage.getItem('cart')) || [];

    iconCart.addEventListener("click", () => {
        body.classList.toggle("showCart");
    });

    closeCart.addEventListener("click", () => {
        body.classList.toggle("showCart");
    });

    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('addCart')) {
            let product_id = positionClick.closest('.item').dataset.id;
            addToCart(product_id);
        }
    });

    const addToCart = (product_id) => {
        let product = products.find(p => p.id == product_id); 
        if (!product) return; 

        let existingProduct = carts.find(p => p.product_id == product_id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            carts.push({ product_id: product_id, quantity: 1 });
        }

        updateCart();
        saveCartToMemory();
    };

    const saveCartToMemory = () => {
        localStorage.setItem('cart', JSON.stringify(carts));
    };
    const totalAmountElement = document.querySelector('.totalAmount');
    const updateCart = () => {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        let totalPrice = 0;

        if (carts.length > 0) {
            carts.forEach(cart => {
                totalQuantity += cart.quantity;
                let product = products.find(p => p.id == cart.product_id);
                if (!product) return; 
                let subtotal = product.price * cart.quantity;
                totalPrice += subtotal;


                let cartItem = document.createElement('div');
                cartItem.classList.add('Item');
                cartItem.dataset.id = cart.product_id;
                cartItem.innerHTML = `
                    <div class="image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="name">
                        ${product.name}
                    </div>
                    <div class="totalPrice">
                        &#8377 ${product.price}
                    </div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                listCartHTML.appendChild(cartItem);
            });
        }
        iconCartSpan.innerText = totalQuantity;
        totalAmountElement.innerHTML = `Total Amount : ₹ ${totalPrice}`; 
    };

    listCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
            let product_id = positionClick.closest('.Item').dataset.id;
            let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
            changeQuantity(product_id, type);
        }
    });

    const changeQuantity = (product_id, type) => {
        let cartItem = carts.find(p => p.product_id == product_id);
        if (!cartItem) return; 

        if (type === 'plus') {
            cartItem.quantity++;
        } else {
            cartItem.quantity--;
            if (cartItem.quantity <= 0) {
                carts = carts.filter(p => p.product_id != product_id);
            }
        }

        saveCartToMemory();
        updateCart();
    };

    updateCart();
});
