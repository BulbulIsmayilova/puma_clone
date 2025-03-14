import { Product } from "../services/api.js";
import { getVariant } from "../utils/get-variants.js";

const swiperSlide = document.getElementById("swiper-slide");
const swiperSlidesec = document.getElementById("swiper-slidesec");
const infoSection = document.getElementById("InfoSection");
const boyone = document.getElementById("boyone");
const boytwo = document.getElementById("boytwo");
const holidaySection = document.getElementById("holidaySection");
const GirlSection = document.getElementById("GirlSection");
const speedcatinfo = document.getElementById("speedcatinfo");
const swiperSlidethird = document.getElementById("swiper-slidethird");
const qrSection = document.getElementById("qrSection");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");

let width = window.innerWidth;
let boyWidth = boyone.offsetWidth;
let catWidth = speedcatinfo.offsetWidth;
let imgitem1Width = img1.offsetWidth;
let imgitem2Width = img2.offsetWidth;
let imgitem3Width = img3.offsetWidth;
let imgitem4Width = img4.offsetWidth;

window.addEventListener("resize", function () {
  width = window.innerWidth;
  boyWidth = boyone.offsetWidth;
  catWidth = speedcatinfo.offsetWidth;
  imgitem1Width = img1.offsetWidth;
  imgitem2Width = img2.offsetWidth;
  imgitem3Width = img3.offsetWidth;
  imgitem4Width = img4.offsetWidth;

  heightSectionInfo();
});

function heightSectionInfo() {
  boyone.style.backgroundImage = "url('/src/assets/boyonebig.avif')";
  boytwo.style.backgroundImage = "url('/src/assets/twoonebig.avif')";
  if (width < 540) {
    infoSection.style.height = `${width}px`;
    qrSection.style.height = `${width}px`;
    infoSection.style.backgroundImage =
      "url('/src/assets/InfoSectionbgmob.avif')";
    qrSection.style.backgroundImage = "url('/src/assets/QrSectionmob.avif')";
    holidaySection.style.backgroundImage = "none";
    GirlSection.style.backgroundImage = "none";
  } else if (width >= 540 && width < 854) {
    qrSection.style.height = `auto`;
    infoSection.style.backgroundImage = "url('/src/assets/InfoSecmin540.avif')";
    holidaySection.style.backgroundImage =
      "url('/src/assets/Holidaysecdes.avif')";
    qrSection.style.backgroundImage = "url('/src/assets/QrSection854.avif')";
    GirlSection.style.backgroundImage = "url('/src/assets/GirlSec854.avif')";
  } else if (width >= 854 && width < 1280) {
    infoSection.style.backgroundImage =
      "url('/src/assets/InfoSecmin1280.avif')";
    holidaySection.style.backgroundImage =
      "url('/src/assets/Holidaysecbig.avif')";
    GirlSection.style.backgroundImage = "url('/src/assets/GirlSec1280.avif')";
    qrSection.style.backgroundImage = "url('/src/assets/QrSection1280.avif')";
  } else {
    infoSection.style.backgroundImage =
      "url('/src/assets/InfoSection1920.avif')";
    holidaySection.style.backgroundImage =
      "url('/src/assets/Holidaysecbig.avif')";
    GirlSection.style.backgroundImage = "url('/src/assets/GirlSec1920.avif')";
    qrSection.style.backgroundImage = "url('/src/assets/QRSection1440.avif')";
  }

  boyone.style.height = `${boyWidth}px`;
  boytwo.style.height = `${boyWidth}px`;
  img1.style.height = `${imgitem1Width}px`;
  img2.style.height = `${imgitem2Width}px`;
  img3.style.height = `${imgitem3Width}px`;
  img4.style.height = `${imgitem4Width}px`;
}
heightSectionInfo();

const getShoesSliderProduct = async () => {
  let filter = {
    categories: "678b93ded404128cd2ec4da3",
  };

  let response = await Product.list(filter);
  showSlideItem(response);
};
getShoesSliderProduct();

const getSecondShoesSliderProduct = async () => {
  let filter = {
    categories: "678bcc572a6db21c1e6ff56d",
  };

  let response = await Product.list(filter);
  showSecondSlideItem(response);
};
getSecondShoesSliderProduct();

const getClothingSliderProduct = async () => {
  let filter = {
    categories: "678baa61ad4057f5cea994d0",
  };

  let response = await Product.list(filter);
  showThirdSlideItem(response);
};
getClothingSliderProduct();

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

let PRODUCTS = [];

function showSlideItem(data) {
  PRODUCTS = data.products;
  let variant = [];

  PRODUCTS.forEach((item) => {
    let kod = getVariant(item);
    variant.push(...kod);
  });
  variant = variant.slice(0, 10);
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

    if (item.images.length > 0) {
      return (swiperSlide.innerHTML += `
        <div class="swiper-slide">
        <a href="detail.htm?product_slug=${item.productSlug}&slug=${
        item.slug
      }" class=" block cursor-pointer">
                   <div class="max-w-[238px] sm:max-w-[310px] bl:max-w-[436px] w-full">
                     <img src="${
                       item.images[0]?.url
                     }" class="w-full h-full object-cover flex bl:hidden " alt="" />
                     <img src="${
                       item.images[0]?.url
                     }" class="w-full h-full object-cover hidden bl:flex" alt="" />
                   </div>
                   <div class="pt-4 text-left sl:flex sl:justify-between">
                     <div>
                      <h3 class="text-[14px] leading-5"> <b>${
                        item.productTitle
                      }</b></h3>
                      <span class="text-[14px] sm:text-[14px]  leading-6 text-[#676d75d9]">${
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
                   </a></div>
  `);
    }
  });
}
function showSecondSlideItem(data) {
  PRODUCTS = data.products;
  let variant = [];

  PRODUCTS.forEach((item) => {
    let kod = getVariant(item);
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

    swiperSlidesec.innerHTML += `
    <div class="swiper-slide">
    <a href="detail.htm?product_slug=${item.productSlug}&slug=${
      item.slug
    }" class="block cursor-pointer">
   <div class="max-w-[238px] sm:max-w-[310px] bl:max-w-[436px] w-full">
                     <img src="${
                       item.images[0]?.url
                     }" class="w-full h-full object-cover flex bl:hidden " alt="" />
                     <img src="${
                       item.images[0]?.url
                     }" class="w-full h-full object-cover hidden bl:flex" alt="" />
                  </div>
                  <div class="pt-4 text-left sl:flex sl:justify-between">
                    <div>
                      <h3 class="text-[14px] leading-5  "> <b>${
                        item.productTitle
                      }</b></h3>
                      <span class="text-[14px] sm:text-[16px]  leading-6 text-[#676d75d9]">${
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
                  </a>
                  </div>
 `;
  });
}

function showThirdSlideItem(data) {
  PRODUCTS = data.products;
  let variant = [];

  PRODUCTS.forEach((item) => {
    let kod = getVariant(item);
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
    swiperSlidethird.innerHTML += `
    <div class="swiper-slide">
    <a href="detail.htm?product_slug=${
      item.productSlug
    }&slug=${item.slug}" class="block cursor-pointer">
   <div class="max-w-[238px] sm:max-w-[310px] bl:max-w-[436px] w-full">
                      <img src="${
                        item.images[0]?.url
                      }" class="w-full h-full object-cover flex bl:hidden " alt="" />
                     <img src="${
                       item.images[0]?.url
                     }" class="w-full h-full object-cover hidden bl:flex" alt="" />
                  </div>
                  <div class="pt-4 text-left sl:flex sl:justify-between">
                    <div>
                      <h3 class="text-[14px] leading-5"> <b>${
                        item.productTitle
                      }</b></h3>
                      <span class="text-[14px] sm:text-[16px]  leading-6 text-[#676d75d9]">${
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
                  </a>
                  </div>
 `;
  });
}
