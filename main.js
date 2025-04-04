document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products");
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category-select");
    const sortSelect = document.getElementById("sort-select");

    // CSS Grid layout o'rnatamiz
    productsContainer.style.display = "grid";
    productsContainer.style.gridTemplateColumns = "repeat(10, 1fr)"; 
    productsContainer.style.gridGap = "10px"; 

    let allProducts = [];
    let filteredProducts = [];

    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            allProducts = products; 
            filteredProducts = allProducts; 
            renderProducts(filteredProducts); 
        })
        .catch(error => console.error("Xatolik yuz berdi:", error));

  
    function renderProducts(products) {
        productsContainer.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.style.textAlign = "center";
            productDiv.style.border = "2px solid #000";
            productDiv.style.borderRadius = "8px";
            productDiv.style.padding = "5px";
            productDiv.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
            productDiv.style.backgroundColor = "#f5f5f5";
            productDiv.style.overflow = "hidden";
            productDiv.style.display = "flex";
            productDiv.style.flexDirection = "column"; 
            productDiv.style.maxWidth = "120px";
            productDiv.style.margin = "0 auto"; 

            const imgElement = document.createElement("img");
            imgElement.src = product.image;
            imgElement.alt = product.title;
            imgElement.style.width = "90px";
            imgElement.style.height = "auto";
            imgElement.style.display = "block";
            imgElement.style.margin = "0 auto";
            imgElement.style.borderBottom = "1px solid #ddd";
            imgElement.style.paddingBottom = "5px"; 

            const productDetails = document.createElement("div");
            productDetails.style.paddingTop = "5px"; 
            productDetails.innerHTML = `
                <h3 style="font-size: 10px; margin: 5px 0;">${product.title}</h3>
                <p style="font-size: 10px; color: #333;">$${product.price}</p>
            `;

            productDiv.appendChild(imgElement);
            productDiv.appendChild(productDetails);
            productsContainer.appendChild(productDiv);
        });
    }

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = allProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
        filteredProducts = filtered; 
        renderProducts(filteredProducts);
    });

    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        
        if (selectedCategory === "all") {
            filteredProducts = allProducts;
        } else {
            filteredProducts = allProducts.filter(product => product.category.toLowerCase().includes(selectedCategory));
        }
        renderProducts(filteredProducts);
    });


    sortSelect.addEventListener("change", () => {
        const sortBy = sortSelect.value;

        if (sortBy === "price-asc") {
            filteredProducts.sort((a, b) => a.price - b.price); 
        } else if (sortBy === "price-desc") {
            filteredProducts.sort((a, b) => b.price - a.price); 
        } else if (sortBy === "name-asc") {
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title)); 
        } else if (sortBy === "name-desc") {
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title)); 
        }
        
        renderProducts(filteredProducts); 
    });
});
