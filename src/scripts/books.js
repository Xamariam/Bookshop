
let itemsPerPage = 6;
let category = 'Architecture'


function showBooks(data) {
  const booksEl = document.querySelector(".books");
  booksEl.innerHTML = ''

  data.items.forEach((book) => {
    const bookEl = document.createElement("div");
    bookEl.classList.add("book-card");
    bookEl.innerHTML = `<img class="book-image" src="${
      book.volumeInfo.imageLinks.thumbnail
    }" alt="book cover"></img>
        <div class="book-discription">
          <p class="autor">${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : ' '}</p>
          <h2 class="book-title">${book.volumeInfo.title}</h2>
          <div class="rating-str">
              <p class="rating">${
                book.volumeInfo.maturityRating === "NOT_MATURE"
                  ? " "
                  : book.volumeInfo.maturityRating
              }</p>
          </div>
          <p class="discription">${
            book.volumeInfo.description || " "
          }</p>
          ${
            book.saleInfo.saleability === "FOR_SALE" ? (
              `<p class="price">
              ${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}
              </p>`
            ) : (
             `<p class="price"></p>`
            )
          }
         
          <button class="buy-now">buy now</button>
        </div>`;

        const buyButton = bookEl.querySelector('.buy-now') 
        buyButton.addEventListener('click', clickOnBuyNow)

    booksEl.appendChild(bookEl);
  });
}

async function getBooks() {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=%22subject:${category}%22&key=AIzaSyAa69uBL7SjAEjaKHMSluEfCWXufpRhxus&printType=books&startIndex=0&maxResults=${itemsPerPage}&langRestrict=en`
  );

  const data = await response.json()
  showBooks(data)
}

getBooks()

const categories = document.querySelectorAll('.menu-navigation_item')

categories.forEach((category) => {
    category.addEventListener('click', showBooksByCategory)
})

console.log(categories);

function showBooksByCategory() {
    const activeCategoty = document.querySelector('.active_item')
    activeCategoty.classList.remove('active_item')
    this.classList.add('active_item');

    category = this.dataset.name
    itemsPerPage = 6;
    getBooks()
}

const loadMoreButton = document.querySelector('.load-more-button')

loadMoreButton.addEventListener('click', loadMoreBooks)
console.log(loadMoreButton);
function loadMoreBooks() {
    console.log('click');
    itemsPerPage += 6;
    getBooks()
}


// shop bag
const shopBag = document.querySelector('.shop-bag')

let shopBagItems = localStorage.getItem('shopBagItems') ||  0;

if (shopBagItems > 0) {
    shopBag.style.opacity = 1;
    shopBag.textContent = shopBagItems
}

function clickOnBuyNow() {
    if (this.classList.contains('buy-now_active')) {
        deleteItemFromShopBag()
        this.textContent = 'buy now'
        this.classList.remove('buy-now_active')
    } else {
        addItemInShopBag()
        this.textContent = 'in the cart'
        this.classList.add('buy-now_active')
    }
    console.log('update', shopBagItems);
    localStorage.setItem('shopBagItems', shopBagItems)
}

function addItemInShopBag() {
    if (shopBagItems === 0) {
        shopBag.style.opacity = 1;
    }

    shopBagItems++;
    shopBag.textContent = shopBagItems
}

function deleteItemFromShopBag() {
    shopBagItems--;

    if (shopBagItems === 0) {
        shopBag.style.opacity = 0;
    }
    shopBag.textContent = shopBagItems
}