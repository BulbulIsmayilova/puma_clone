import { Category, Product } from "../services/api.js";
import { getVariant } from "../utils/get-variants.js";
const filterBtn = document.getElementById("filterBtn");
const lengthProduct = document.getElementById("lengthProduct")
const paginationBtn = document.getElementById("paginationBtn")

let swiper = null;
let DATA = [];
let sizes = [];

let maxPage = 0

let view = null;

let minPrice = 0;
let maxPrice = 10000;

let filter = {
  page : 1
};

function updateView() {
  if (window.innerWidth < 640) {
    view = 2;
  } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
    view = 3;
  } else {
    view = 4;
  }
  showswiperSlideshoes(DATA);
}

window.addEventListener("DOMContentLoaded", updateView);
window.addEventListener("resize", updateView);

window.changeView = (i) => {
  view = i;
  showswiperSlideshoes(DATA);
};

const productContainer = document.getElementById("productContainer");

const getShoesCategory = async () => {
  let params = new URLSearchParams(location.search);

  let categoryName = params.get("category");

  let response = await Category.categories();

  let category = response.find(
    (item) => item.slug.toLowerCase() === categoryName.toLowerCase()
  );

  filter.categories = category._id;

  if (category._id) {
    let s = await Product.getSizes(category._id);
    sizes = s;
    showFilterSizeContainer();
  }

  let products = await Product.list(filter);

  paginationBtn.disabled = false

  maxPage = Math.ceil(products.total / products.limit)

  if(filter.page === maxPage){
    paginationBtn.classList.add("hidden")
  }else if(filter.page !== maxPage && paginationBtn.classList.contains("hidden")){
    paginationBtn.classList.remove("hidden")
  }

  let PARENTID = [];

  PARENTID = response.filter((item) => item.parentId === null);

  const CategoryTitle = document.getElementById("CategoryTitle");

  PARENTID.map(
    (item) =>
      (CategoryTitle.innerHTML = ` <h1
  class="text-[24px] bl:text-[28px] sl:text-[32px] uppercase leading-8 sl:py-4"
>
  <b>${item.name}'s Classic Shoes and Sneakers</b>
</h1>`)
  );
  DATA.push(...products.products)
  showswiperSlideshoes(DATA);
};

setTimeout(getShoesCategory, 1000);

function showInnerSlider(data, index) {
  swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
    },
  });

  const swiperSlideshoes = document.getElementById(`swiper-slideshoes${index}`);

  data.map(
    (item) =>
      (swiperSlideshoes.innerHTML += `
                              <div class="swiper-slide">
                                <div class="w-full my-4">
                                  <img src="${item.url}" class="w-full h-full object-cover " alt="" />
                                </div>
                              </div> 
          `)
  );
}

paginationBtn.addEventListener("click", function(){
  let page = filter.page

  page += 1

  filter.page = page

  paginationBtn.disabled = true
  getShoesCategory()
})

function showswiperSlideshoes(data) {
  productContainer.innerHTML = "";
  let PRODUCTS = [];

  PRODUCTS = data;
  let variant = [];

  PRODUCTS.forEach((item) => {
    let kod = getVariant(item);
    variant.push(...kod);
  });

  let price = 0;

  lengthProduct.innerText = variant.length

  variant.map((item, index) => {
    if (item.discount) {
      if (item.discountType === "percentage") {
        price = item.price - (item.price * item.discount) / 100;
      } else {
        price = item.price - item.discount;
      }
    } else {
      price = item.price;
    }

    productContainer.innerHTML += `
       <div class='${
         view === 1
           ? "w-full"
           : view === 2
           ? "w-6/12"
           : view === 3
           ? "w-4/12"
           : "w-3/12"
       } px-2 mt-8'> 
          <a href="detail.htm?product_slug=${item.productSlug}&slug=${
      item.slug
    }">
              <div>
                <div class="swiper mySwiper">
                  <div id="swiper-slideshoes${
                    index + 1
                  }" class="swiper-wrapper">
  
                  </div>
                  <div class="swiper-scrollbar !static"></div>
                </div>
              </div>
              <div>
                  <div class="pt-4 text-left sm:flex sm:justify-between sm:items-start ">
                    <div>
                      <h3 class="text-[14px] leading-5  "> <b>${
                        item.productTitle
                      }</b></h3>
                      <span class="text-[16px] sm:text-[16px]  leading-6 text-[#676d75d9]">${
                        item.productCategory
                      }</span>
                    </div>
                    <div>
                      <h4 class="text-[14px] hl:text-[16px] text-[#BA2B20] ${
                        item.discount ? "flex" : "hidden"
                      }"><b>$${price}.00</b></h4>
                      <h4 class="text-[14px] hl:text-[16px] text-[#8C8C8C] ${
                        item.discount ? "flex" : "hidden"
                      }"><a class="line-through">$${item.price}.00</a></h4>
                      <h4 class="text-[14px] hl:text-[16px] leading-6 pt-3 sl:pt-0 ${
                        item.discount ? "hidden" : "flex"
                      } "> <b>$${item.price}.00</b></h4>
                    </div>
                  </div>
              </div>
            </a>
          </div> 
            `;
    showInnerSlider(item.images, index + 1);
  });
}

const FilterContainer = document.getElementById("FilterContainer");
const FilterBar = document.getElementById("FilterBar");

window.toggleFilterAccordion = function () {
  FilterContainer.classList.toggle("side-act");
  FilterBar.classList.toggle("side-act");
};

const FilterSizeContainer = document.getElementById("FilterSizeContainer");

function showFilterSizeContainer() {
  FilterSizeContainer.innerHTML = "";
  sizes.map(
    (item, i) =>
      (FilterSizeContainer.innerHTML += `<div class="w-3/12 pr-1 pt-1">
            <button onclick="changeProduct('size', '${item}', '${i}')" class="border border-[#CCCCCC] w-full text-[14px] text-[#191919] p-2">
               <span class="uppercase">${item}</span>
            </button>
          </div>`)
  );
}

const filteraccordionContent = document.querySelectorAll(
  ".filteraccordion-content"
);
const accordionIcon = document.querySelectorAll(".accordionIcon");

window.toggleFilterİnsideAccordion = (i) => {
  filteraccordionContent[i].classList.toggle("filteraccordion-active");
  accordionIcon[i].classList.toggle("accordion-icon-active");
  accordionIcon[i].classList.toggle("accordion-icon");
};

window.changeProduct = (type, value = "", index = 0) => {
  let input;

  if (type === "min") {
    input = document.getElementById("minPriceValue");

    minPrice = input.value;
  } else if (type === "max") {
    input = document.getElementById("maxPriceValue");

    maxPrice = input.value;
  } else if (type === "size") {

    const sizeBtns = FilterSizeContainer.querySelectorAll("button")
    for (let i = 0; i < sizeBtns.length; i++) {
      sizeBtns[i].classList.remove("active-size")
    }
    sizeBtns[index].classList.add("active-size")
    filter["specs.size"] = value;
  }

  filter.price = `[${minPrice || 0},${maxPrice || 10000}]`;
};

filterBtn.addEventListener("click", function () {
  getShoesCategory();
  toggleFilterAccordion();
});
