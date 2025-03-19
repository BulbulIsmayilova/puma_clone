import { Cart, Order, Product } from "../services/api.js";
import { getVariant } from "../utils/get-variants.js";
const myList = document.getElementById("myList");
const listcount = document.getElementById("listcount");
const TotalPriceContainer = document.getElementById("TotalPriceContainer");
const shoppingContainer = document.getElementById("shoppingContainer");

let deleteId = null;

let swiper = new Swiper(".mySwiper", {
  slidesPerView: 2.1,
  spaceBetween: 10,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },
  breakpoints: {
    540: {
      slidesPerView: 2.4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2.3,
      spaceBetween: 8,
    },
    1024: {
      slidesPerView: 4.3,
      spaceBetween: 10,
    },
  },
});

const swiperSlideshopping = document.getElementById("swiper-slideshopping");

let BASKET = [];

const getData = async () => {
  let token = localStorage.getItem("token");

  if (!token) return;

  let result = await Cart.list(token);

  if(!result || !result.list) {
    return
  }

  BASKET = result.list;

  showMyList(result.list);
  showTotaPrice(result);

  listcount.innerHTML = "";
  listcount.innerText += `(${result.list.length})`;
};

getData();

const getShoppingSliderProduct = async () => {
  let filter = {
    categories: "6794c0f1b26964e0162746d9",
  };

  let response = await Product.list(filter);
  showWhislistitemBar(response);
};

const showMyList = (data) => {
  myList.innerHTML = "";
  if(!data || data.length === 0){
    myList.innerHTML+=`<div class="flex flex-col justify-center items-center py-40">
      <span><img class="min-w-[115px] max-h-[115px]" src="/src/assets/shoppingCar.svg"/></span>
      <h1 class="text-[28px] text-[#181818] text-center leading-7 tracking-wide pt-2 "><b class="w-full">Your Shopping Cart is Empty<b/></h1>
    </div>`
  }
  data.map((item) => {
    let variant = item.productId.variants.find((v) => v._id === item.variantId);

    let price = 0;
    if (variant.discount) {
      if (variant.discountType === "percentage") {
        price = variant.price - (variant.price * variant.discount) / 100;
      } else {
        price = variant.price - variant.discount;
      }
    } else {
      price = variant.price;
    }

    myList.innerHTML += `
      <div
              class="border mb-4 border-[#E5E7EB] rounded-sm flex bl:flex-wrap gap-3 bl:gap-0 justify-between p-3 zl:p-4 bl:p-5"
            >
              <div class="w-4/12 md:w-3/12">
                <img
                  src="${variant.images[0].url}"
                  class="w-full hl:min-w-[128px] hl:min-h-[128px] zl:h-[192px] zl:w-[192px]"
                  alt=""
                />
              </div>
              <div class="w-8/12 bl:w-6/12 md:w-7/12 md:pl-6">
                <div class="flex flex-col gap-3">
                  <div class="flex flex-col">
                    <h3
                      class="text-[16px] zl:text-[20px] sl:text-[18px] lg:text-[20px]"
                    >
                      <b>${item.productId.title}</b>
                    </h3>
                    
                  </div>
                  <div class="flex flex-col leading-4 hl:leading-5">
                    <p
                      class="text-[#838383] text-[12px] hl:text-[14px] bl:text-[16px] sl:text-[14px] lg:text-[16px]"
                    >
                      <span>Color:</span>
                      <span class="text-[#323232]">${variant.specs.color}</span>
                    </p>
                    <p
                      class="text-[#838383] text-[12px] hl:text-[14px] bl:text-[16px] sl:text-[14px] lg:text-[16px]"
                    >
                      <span>Size:</span>
                      <span class="text-[#323232]">${variant.specs.size}</span>
                    </p>
                  </div>
                  <div class="custom-select-wrapper hl:pt-2">
                    <div class="inline relative">
                      <select onchange="updateBasket('${item.variantId}', '${
      item.productId._id
    }')" name="" id="count${item.variantId}" class="custom-select relative">
                        <option value="1" ${
                          item.count == 1 ? "selected" : ""
                        }>1</option>
                        <option value="2" ${
                          item.count == 2 ? "selected" : ""
                        }>2</option>
                        <option value="3" ${
                          item.count == 3 ? "selected" : ""
                        }>3</option>
                        <option value="4" ${
                          item.count == 4 ? "selected" : ""
                        }>4</option>
                      </select>
                      <div
                        class="down absolute top-[50%] right-3 -translate-y-[50%]"
                      >
                        <img src="/src/assets/downabsolute.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex flex-col gap-4 pb-3 bl:hidden hl:flex-row hl:justify-between hl:items-center hl:pt-6"
                  >
                    <div class="hl:order-1">
                      <p
                        class="text-[14px] hl:text-[16px] zl:text-[20px] sl:text-[18px] lg:text-[20px]"
                      >
                        <h4 class="text-[14px] hl:text-[16px] text-[#BA2B20] ${
                          variant.discount ? "flex" : "hidden"
                        }"><b>$${price}.00</b></h4>
                          <h4 class="text-[14px] hl:text-[16px] text-[#8C8C8C] ${
                            variant.discount ? "flex" : "hidden"
                          }"><a class="line-through">$${
      variant.price
    }.00</a></h4>
                          <h4 class="text-[14px] hl:text-[16px] leading-6 pt-3 sl:pt-0 ${
                            variant.discount ? "hidden" : "flex"
                          } "> <b>$${item.price}.00</b></h4> 
                      </p>
                    </div>
                    <div class="flex gap-3 pl-3">
                      <button onclick="showSizeContainer()">
                        <img src="/src/assets/edit.svg" alt="" />
                      </button>
                      <button onclick="deleteCart('${item._id}')">
                        <img src="/src/assets/trash.svg" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hidden bl:flex w-2/12 flex-col gap-4 pb-3">
                <div>
                  <p
                    class="text-[14px] hl:text-[16px] zl:text-[20px] sl:text-[18px] lg:text-[20px]"
                  >
                       <h4 class="text-[14px] hl:text-[16px] text-[#BA2B20] ${
                         variant.discount ? "flex" : "hidden"
                       }"><b>$${price}.00</b></h4>
                          <h4 class="text-[14px] hl:text-[16px] text-[#8C8C8C] ${
                            variant.discount ? "flex" : "hidden"
                          }"><a class="line-through">$${
      variant.price
    }.00</a></h4>
                          <h4 class="text-[14px] hl:text-[16px] leading-6 pt-3 sl:pt-0 ${
                            variant.discount ? "hidden" : "flex"
                          } "> <b>$${item.price}.00</b></h4> 
                  </p>
                </div>
                <div class="flex gap-3 pl-3">
                  <button onclick="showSizeContainer()">
                    <img src="/src/assets/edit.svg" alt="" />
                  </button>
                  <button onclick="deleteCart('${item._id}')">
                    <img src="/src/assets/trash.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
    `;
  });
};

getShoppingSliderProduct();

let PRODUCTS = [];

function showWhislistitemBar(data) {
  PRODUCTS = data.products;
  let kod = [];
  let variant = [];

  PRODUCTS.forEach((item) => {
    kod = getVariant(item);
    variant.push(...kod);
  });

  variant.map((item) => {
    let price = 0;

    if (item.discount) {
      if (item.discountType === "percentage") {
        price = item.price - (item.price * item.discount) / 100;
      } else {
        price = item.price - item.discount;
      }
    } else {
      price = item.price;
    }

    swiperSlideshopping.innerHTML += `<a href="detail.htm?product_slug=${item.productSlug}&slug=${item.slug}">
          <div class="swiper-slide">
            <div class="w-full my-4">
              <img src="${
                item.images[0].url
              }" class="w-full h-full object-cover " alt="" />
            </div>
            <div class="pt-4 text-left">
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
          </div></a>
    
   `;
  });
}

function showTotaPrice(data) {
  TotalPriceContainer.innerHTML = `
    <div
                    class="border-y border-[#CCCCCC] mt-6 pt-1 pb-4 leading-6"
                  >
                    <div
                      class="flex justify-between items-center text-[#008625] uppercase text-[14px] ${
                        data.totalDiscount ? "flex" : "hidden"
                      }"
                    >
                      <h4><b>Your savings</b></h4>
                      <p><b>-$${data.totalDiscount}</b></p>
                    </div>
                    <div
                      class="flex justify-between items-center text-[#6C6C6C] uppercase text-[14px]"
                    >
                      <h4><b>Subtotal</b></h4>
                      <p><b>$${data.totalPrice}</b></p>
                    </div>
                    <div
                      class="flex justify-between items-center text-[#6C6C6C] uppercase text-[14px]"
                    >
                      <h4><b>Shipping costs</b></h4>
                      <p><b>FREE</b></p>
                    </div>
                    <div
                      class="flex justify-between items-center text-[#6C6C6C] uppercase text-[14px]"
                    >
                      <h4><b>Estimated sales tax</b></h4>
                      <p><b>_</b></p>
                    </div>
                  </div>
                  <div class="pt-2">
                    <div class="flex justify-between text-[20px]">
                      <h4 class="uppercase"><b>Estimated total</b></h4>
                      <p><b>$${data.totalPrice}</b></p>
                    </div>
                  </div>
  `;
}

window.deleteCart = (id) => {
  deleteId = id;
  showDeleteBar();
};

window.updateBasket = async (variantId, productId) => {
  const countVal = document.getElementById(`count${variantId}`);
  const token = localStorage.getItem("token");

  let obj = {
    list: {
      productId,
      variantId,
      count: countVal.value,
    },
  };

  let result = await Cart.update(obj, token);

  if (result) {
    location.reload();
  }
};

window.deleteBasket = async () => {
  const token = localStorage.getItem("token");

  let result = await Cart.deleteCart(deleteId, token);

  if (result) {
    showDeleteBar();
    getData();
  }
};

const cartAccordion = document.querySelector(".cart-accordion");
const cartIcon = document.querySelector(".cart-icon");

window.toggleCartAccordion = () => {
  cartAccordion.classList.toggle("accordion-active");
  cartIcon.classList.toggle("accordion-icon-active");
};


window.createOrder = async () => {
  let list = []

  BASKET.forEach(item => {
    list.push({
      count : item.count,
      productId : item.productId._id,
      variantId : item.variantId
    })
  })
  const token = localStorage.getItem("token")

  if(list.length === 0){
    return
  }

  let result = await Order.create({list}, token)
  
  if(!result){
    return
  }

  location.href = '/src/checkout.htm'
}