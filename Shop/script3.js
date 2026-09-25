const products = [
    {
        id: 1,
        name: "Smart Watch",
        price: 350000,
        category: "electronics",
        categoryName: "Elektronika",
        emoji: "⌚"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 420000,
        category: "electronics",
        categoryName: "Elektronika",
        emoji: "🎧"
    },
    {
        id: 3,
        name: "Classic T-Shirt",
        price: 150000,
        category: "fashion",
        categoryName: "Kiyim",
        emoji: "👕"
    },
    {
        id: 4,
        name: "Sneakers",
        price: 480000,
        category: "fashion",
        categoryName: "Kiyim",
        emoji: "👟"
    },
    {
        id: 5,
        name: "Backpack",
        price: 270000,
        category: "accessories",
        categoryName: "Aksessuar",
        emoji: "🎒"
    },
    {
        id: 6,
        name: "Sunglasses",
        price: 180000,
        category: "accessories",
        categoryName: "Aksessuar",
        emoji: "🕶️"
    },
    {
        id: 7,
        name: "Smartphone",
        price: 3200000,
        category: "electronics",
        categoryName: "Elektronika",
        emoji: "📱"
    },
    {
        id: 8,
        name: "Cap",
        price: 90000,
        category: "fashion",
        categoryName: "Kiyim",
        emoji: "🧢"
    }
];

let cart = JSON.parse(localStorage.getItem("shopCart")) || [];

const productsList = document.getElementById("productsList");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const emptyMessage = document.getElementById("emptyMessage");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const clearCart = document.getElementById("clearCart");

function formatPrice(price) {
    return price.toLocaleString("uz-UZ") + " so'm";
}

function showProducts() {
    const search = searchInput.value.toLowerCase().trim();
    const category = categorySelect.value;

    const filtered = products.filter(function(product) {
        const matchesSearch = product.name.toLowerCase().includes(search);
        const matchesCategory =
            category === "all" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    productsList.innerHTML = "";

    if (filtered.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    filtered.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <span class="category">${product.categoryName}</span>
            <h3>${product.name}</h3>
            <div class="price">${formatPrice(product.price)}</div>
            <button class="add-btn">Savatga qo'shish 🛒</button>
        `;

        card.querySelector(".add-btn").addEventListener("click", function() {
            addToCart(product.id);
        });

        productsList.appendChild(card);
    });
}

function addToCart(id) {
    const product = products.find(function(item) {
        return item.id === id;
    });

    cart.push(product);
    saveCart();
    updateCartCount();
    alert(product.name + " savatga qo'shildi! 🛒");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    showCart();
    updateCartCount();
}

function showCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p style='padding:20px 0'>Savat bo'sh 🛒</p>";
        cartTotal.textContent = "0 so'm";
        return;
    }

    let total = 0;

    cart.forEach(function(product, index) {
        total += product.price;

        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <div class="cart-item-emoji">${product.emoji}</div>
            <div class="cart-item-info">
                <strong>${product.name}</strong>
                <p>${formatPrice(product.price)}</p>
            </div>
            <button class="remove-btn">O'chirish</button>
        `;

        item.querySelector(".remove-btn").addEventListener("click", function() {
            removeFromCart(index);
        });

        cartItems.appendChild(item);
    });

    cartTotal.textContent = formatPrice(total);
}

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function saveCart() {
    localStorage.setItem("shopCart", JSON.stringify(cart));
}

searchInput.addEventListener("input", showProducts);
categorySelect.addEventListener("change", showProducts);

cartBtn.addEventListener("click", function() {
    showCart();
    cartModal.style.display = "block";
});

closeCart.addEventListener("click", function() {
    cartModal.style.display = "none";
});

cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

clearCart.addEventListener("click", function() {
    if (cart.length === 0) return;

    if (confirm("Savatni tozalamoqchimisiz?")) {
        cart = [];
        saveCart();
        showCart();
        updateCartCount();
    }
});

showProducts();
updateCartCount();
