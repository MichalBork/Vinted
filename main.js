
const clearInput = () => {
    const input = document.getElementsByTagName("input")[0];
    input.value = "";
}

const clearBtn = document.getElementById("clear-btn");


const productList = document.querySelector('.product-list');

function fetchAndCreateProducts() {
    const url = window.location.origin;

    const params = new URLSearchParams(window.location.search);
    // Wykonujemy żądanie GET za pomocą funkcji fetch
    fetch(url + '?' + params.toString())
        .then(response => {
            if (!response.ok) {
                throw new Error(`Wystąpił błąd: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            if (data.items.length === 0) {

                return;
            }

            data.items.forEach(productData => {
                const product = createProduct(productData);
                productContainer.appendChild(product);
            });
        })
        .catch(error => {
            console.error('Błąd podczas pobierania danych JSON:', error);
        });
}

fetchAndCreateProducts();

const productContainer = document.querySelector('.content');

function createProduct(productData) {
    const product = document.createElement('div');
    product.classList.add('product');

    const coverImage = document.createElement('img');
    coverImage.src = productData.photo.url;
    coverImage.alt = productData.title;
    product.appendChild(coverImage);

    const productName = document.createElement('h2');
    productName.textContent = productData.title;
    product.appendChild(productName);

    const priceAndLikes = document.createElement('div');
    priceAndLikes.classList.add('price-likes');

    const fixedPrice = parseInt(productData.price).toFixed(2);
    priceAndLikes.innerHTML = `Cena: ${fixedPrice} ${productData.currency}<br>Polubienia: ${productData.favourite_count}`;
    product.appendChild(priceAndLikes);


    const productLinkAsButton = document.createElement('a');
    productLinkAsButton.classList.add('button-link');
    productLinkAsButton.href = productData.url;
    productLinkAsButton.textContent = 'Zobacz produkt';
    productLinkAsButton.target = '_blank'; // Otwórz link w nowej karcie

    product.appendChild(productLinkAsButton);

    return product;
}


let jsonData = [
    {"Wybierz rozmiar": "0"},
    {"XS": "1395"},
    {"S": "1396"},
    {"M ": "1397"},
    {"L ": "1398"},
    {"XL ": "1399"},
    {"XXL": "1400"},

];

let selectBox = document.getElementById('selectBox');

// Funkcja dodająca opcje do selecta
function populateSelect(data, selectBox,) {
    data.forEach(item => {
        let key = Object.keys(item)[0];
        let option = document.createElement('option');
        option.value = item[key];
        option.textContent = key;
        selectBox.appendChild(option);
    });
}

let colorBox = document.getElementById('colorBox');

// Wywołanie funkcji z danymi JSON
populateSelect(jsonData, selectBox,);


// Skrypt JavaScript
let minPrice = document.getElementById('minPrice');
let maxPrice = document.getElementById('maxPrice');
let rangeSlider1 = document.getElementById('rangeSlider1');
let rangeSlider2 = document.getElementById('rangeSlider2');

// Funkcja do aktualizacji suwaka
function updateSlider(min, max) {
    rangeSlider1.value = min;
    rangeSlider2.value = max;
}

// Funkcja do aktualizacji pól tekstowych
function updateInput(min, max) {
    minPrice.value = min;
    maxPrice.value = max;
}

// Obsługa zdarzeń dla pól tekstowych
minPrice.addEventListener('input', () => {
    updateSlider(minPrice.value, maxPrice.value);
});

maxPrice.addEventListener('input', () => {
    updateSlider(minPrice.value, maxPrice.value);
});

// Obsługa zdarzeń dla suwaków
rangeSlider1.addEventListener('input', () => {
    updateInput(rangeSlider1.value, rangeSlider2.value);
});

rangeSlider2.addEventListener('input', () => {
    updateInput(rangeSlider1.value, rangeSlider2.value);
});
const colorSelect = [
    {"Wybierz kolor": "0"},
    {
        "Czarny": "1"
    },
    {
        "Biały": "12"
    },
    {
        "Niebieski": "9"
    },
    {
        "Szary": "3"
    },
    {
        "Jasnoniebieski": "26"
    },
    {
        "Granatowy": "27"
    },
    {
        "Wielobarwny": "15"
    },
    {
        "Beżowy": "4"
    },
    {
        "Czerwony": "7"
    },
    {
        "Brązowy": "2"
    },
    {
        "Pudrowy róż": "24"
    },
    {
        "Różowy": "5"
    },
    {
        "Kremowy": "20"
    },
    {
        "Khaki": "16"
    },
    {
        "Zielony": "10"
    },
    {
        "Burgundowy": "23"
    },
    {
        "Żółty": "8"
    },
    {
        "Turkus": "17"
    },
    {
        "Fioletowy": "6"
    },
    {
        "Ciemnozielony": "28"
    },
    {
        "Pomarańczowy": "11"
    },
    {
        "Liliowy": "25"
    },
    {
        "Koralowy": "22"
    },
    {
        "Srebrny": "13"
    },
    {
        "Morelowy": "21"
    },
    {
        "Musztardowy": "29"
    },
    {
        "Miętowy": "30"
    },
    {
        "Złoty": "14"
    }
]
populateSelect(colorSelect, colorBox,);


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('productName');

    // Wypełnianie formularza wartościami z URL
    const color = urlParams.get('color');
    const size = urlParams.get('size');
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');

    if (productName) {
        document.getElementById('productNameHidden').value = productName;
        document.getElementById('productName').value = productName;
    }
    if (color) document.getElementById('colorBox').value = color;
    if (size) document.getElementById('selectBox').value = size;
    if (minPrice) {
        document.getElementById('minPrice').value = minPrice;
        document.getElementById('rangeSlider1').value = minPrice;
    }
    if (maxPrice) {
        document.getElementById('maxPrice').value = maxPrice;
        document.getElementById('rangeSlider2').value = maxPrice;
    }

    // Synchronizacja suwaków z polami tekstowymi
    document.getElementById('rangeSlider1').addEventListener('input', () => {
        document.getElementById('minPrice').value = document.getElementById('rangeSlider1').value;
    });

    document.getElementById('rangeSlider2').addEventListener('input', () => {
        document.getElementById('maxPrice').value = document.getElementById('rangeSlider2').value;
    });

    document.getElementById('minPrice').addEventListener('input', () => {
        document.getElementById('rangeSlider1').value = document.getElementById('minPrice').value;
    });

    document.getElementById('maxPrice').addEventListener('input', () => {
        document.getElementById('rangeSlider2').value = document.getElementById('maxPrice').value;
    });

});

const sortByPriceAscBtn = document.getElementById('sortByPriceAsc');
const sortByPriceDescBtn = document.getElementById('sortByPriceDesc');
const sortByLikesBtn = document.getElementById('sortByLikes');

sortByPriceAscBtn.addEventListener('click', (event) => {
    event.preventDefault()
    sortProducts('priceAsc');
});
sortByPriceDescBtn.addEventListener('click', (event) => {
    event.preventDefault()
    sortProducts('priceDesc');
});

sortByLikesBtn.addEventListener('click', (event) => {
    event.preventDefault()
    sortProducts('likes');
});

function sortProducts(criteria) {
    const products = Array.from(document.querySelectorAll('.product'));
    const sortedProducts = products.sort((a, b) => {
        const aData = getProductData(a);
        const bData = getProductData(b);

        if (criteria === 'priceAsc') {
            return aData.price - bData.price;
        } else if (criteria === 'priceDesc') {
            return bData.price - aData.price ;
        } else if (criteria === 'likes') {
            return bData.likes - aData.likes;
        }

        return 0;
    });

    // Clear existing content
    productContainer.innerHTML = '';

    // Append sorted products
    sortedProducts.forEach(product => {
        productContainer.appendChild(product);
    });
}

function getProductData(productElement) {
    const priceElement = productElement.querySelector('.price-likes');
    const content = priceElement.textContent;

    const likesIndex = content.indexOf('Polubienia: ');
    if (likesIndex !== -1) {
        const priceString = content.substring(0, likesIndex).trim();
        const likesString = content.substring(likesIndex + 12).trim();

        const price = parseFloat(priceString.split(' ')[1]);
        const likes = parseInt(likesString);

        return { price, likes };
    }

    return { price: 0, likes: 0 };
}