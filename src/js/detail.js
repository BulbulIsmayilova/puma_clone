import { Cart, Product } from "../services/api.js";
import { getVariant } from "../utils/get-variants.js";

const title_product = document.getElementById("title_product");
const pricecontainer = document.getElementById("pricecontainer");
const colorInfo = document.getElementById("colorInfo");
const ColorPictureContainer = document.getElementById("ColorPictureContainer");
const DescriptionInfo = document.getElementById("DescriptionInfo");
const scrollButton = document.getElementById("scrollButton");
const DetailInfo = document.getElementById("DetailInfo");
const main = document.querySelector("main");
const countValue = document.getElementById("countValue")


let variant = null;
let basket = []

let RESPONSE = null;
let Details = null;
let swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },
});

const swiperSlidedetail = document.getElementById("swiper-slidedetail");

window.goWhislist = () => {

  let wish = localStorage.getItem("wish") 

  if(!wish){
    wish = []
  }else{
    wish = JSON.parse(wish)
  }

  let obj = {
    ...variant,
    productId : RESPONSE._id,
    productTitle : RESPONSE.title
  }
  
  wish.push(obj)

  localStorage.setItem("wish", JSON.stringify(wish))
}

function showsliderdetail(data) {
  data.map(
    (item) =>
      (swiperSlidedetail.innerHTML += `<div class="w-full height-full swiper-slide">
        <div class="max-w-[750px] max-height-[750px]">
        <p></p>
        <img src="${item.url}" class="w-full h-full" alt="" />
        </div>
        </div>`)
  );
}

async function getData() {
  let params = new URLSearchParams(location.search);
  let product_slug = params.get("product_slug");
  let variant_slug = params.get("slug");
  let response = await Product.getBySlug(product_slug);
 
  if (!product_slug) {
    main.innerHTML = "salam";
    return;
  }

  let result = response.variants.find((item) => item.slug === variant_slug);  
  
  DescriptionInfo.innerText += `${response.description}`;

  Details = response.details;
  Details.map((item) => {
    DetailInfo.innerHTML += ` <li class="list-disc text-[#8A7351]">
                        <span class="text-black">${item}</span>
                      </li>`;
  });
  variant = result;
  RESPONSE = response;
  showsliderdetail(result.images);
  showgriddetail(result.images);

  showColorContainer(response, result);
  showsizeDetail(response, result);
  title_product.innerHTML = `<b>${response.title}</b>`;
  colorInfo.innerHTML = `<span class="capitalize">${variant.specs.color}</span>`;

  let price = 0;

  if (result.discount) {
    if (result.discountType === "percentage") {
      price = result.price - (result.price * result.discount) / 100;
    } else {
      price = result.price - result.discount;
    }
  } else {
    price = result.price;
  }

  pricecontainer.innerHTML = `
                    <span
                      ><b class="text-[20px] ${
                        result.discount ? "text-[#BA2B20]" : "text-black"
                      }  bl:text-[24px]"
                        >$${price}</b
                      ></span
                    >
                    <span class='${
                      result.discount ? "inline" : "hidden"
                    }'><b class="text-[16px] line-through">$${
    result.price
  }</b></span>`;

  getLikeProduct(response);
  getSecondSliderPro(response);
}
getData();

const getLikeProduct = async (product) => {
  
  let filter = {
    categories: [product.categories[0]._id],
  };

  let response = await Product.list(filter);

  showDetailSlider(response, "like");
};

const getSecondSliderPro = async (product) => {

  if (product.categories.length === 1) {
    return
  } 
  
  let filter = {
    categories: [product.categories[1]._id],
  };
  

  let response = await Product.list(filter);

  response.products = response.products.slice(0, 9);
  showDetailSlider(response);
};

scrollButton.addEventListener("click", function () {
  const targetSection = document.getElementById("targetsection");

  // Header'ın yüksekliğini al (örneğin 80px olabilir)
  const headerHeight = document.querySelector("header").offsetHeight;

  // Hedef bölüme kaydırma işlemini yap
  window.scrollTo({
    top: targetSection.offsetTop - headerHeight - 10, // Offset ekliyoruz
    behavior: "smooth", // Yavaşça kaydırma efekti
  });
});

const sizeDetail = document.getElementById("sizeDetail");

function showsizeDetail(response, result) {
  sizeDetail.innerHTML = "";

  let SIZE = response.specs[1].values.map((item) => item.key);

  let allVariant = response.variants.filter(
    (item) => item.specs.color === result.specs.color
  );

  SIZE.map((item) => {
    let variant = allVariant.find(
      (variant) => variant.specs.size === item && variant.stock > 0
    );

    sizeDetail.innerHTML += `
      <div class="border border-[#E5E7EB] min-w-[58px] min-h-[58px] ${
        item === result.specs.size ? "bg-black text-white" : ""
      } hl:min-w-[61px] hl:min-h-[61px] sl:min-h-[55px] sl:min-w-[55px] lg:min-h-[63px] lg:min-w-[63px] rounded-sm">
        <button 
          onclick="${variant ? `setSize('${variant.slug}')` : ""}"
          class="flex ${
            variant ? "cursor-pointer" : "bg-[#eee] text-[#8D8D8D]"
          } justify-center items-center w-full h-full uppercase"
          ${!variant ? "disabled" : ""}
        >
          ${item}
        </button>
      </div>
    `;
  });
}

window.setSize = (item) => {
  let params = new URLSearchParams(location.search);

  params.set("slug", item);

  history.pushState(null, "", `${location.pathname}?${params.toString()}`);
  location.reload();
};

function showColorContainer(response, variant) {
  let ColorContainer = response.specs[0].values.map((item) => item);

  ColorContainer.map((item) => {
    ColorPictureContainer.innerHTML += `
      <div 
        onclick="showVariant('${item.key}')"
        class="color-item ${
          variant.specs.color === item.key ? "border-[#50565E]" : " "
        } cursor-pointer border  max-w-[63px] max-h-[63px]" >
        <img src="${item.value}" class="w-full h-full" alt="" />
      </div>
    `;
  });
}

window.showVariant = (key) => {
  let checkVariant = RESPONSE.variants.find((item) => {
    return item.specs.color === key;
  });

  if (checkVariant) {
    let params = new URLSearchParams(location.search);

    let slug = params.get("slug");

    if (slug === checkVariant.slug) return;

    params.set("slug", checkVariant.slug);

    history.pushState(null, "", `${location.pathname}?${params.toString()}`);
    location.reload();
  } else {
    console.error("Variant bulunamadı!");
  }
};

const griddetail = document.querySelector(".griddetail");

function showgriddetail(data) {
  if (!data) {
    return;
  }
  data.map((item, index) => {
    griddetail.innerHTML += `
            <div 
                class="
                ${
                  index === 0
                    ? "col-start-1 sl:col-span-1 col-span-2"
                    : index % 2
                    ? "col-start-1 col-span-1 sl:col-start-2"
                    : "col-start-2 sl:col-start-1 col-span-1"
                }
                ">
                  <img src="${item.url}"  alt="" />
            </div>
        `;
  });
}

let swiper1 = new Swiper(".mySwiper1", {
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

const swiperSlideDetail = document.getElementById("swiper-slidedetail1");
const swiperSlideDetail2 = document.getElementById("swiper-slidedetail2");

function showDetailSlider(data, type = "") {
  let PRODUCT = [];
  let variant = [];
  let kod = [];
  PRODUCT = data.products;

  let tag = "";

  PRODUCT.forEach((item) => {
    kod = getVariant(item);
    variant.push(...kod);
  });

  variant.map(
    
    (item) =>
      {
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
        
        tag += `
        <div class="swiper-slide">
        <a href="detail.htm?product_slug=${item.productSlug}&slug=${item.slug}" class=" block cursor-pointer">
          <div class="w-full my-4">
            <img src="${item.images[0]?.url}" class="w-full h-full object-cover " alt="" />
          </div>
          <div class="pt-4 text-left">
            <div>
              <h3 class="text-[14px] leading-5  "> <b>${item.productTitle}</b></h3>
              <span class="text-[16px] sm:text-[16px]  leading-6 text-[#676d75d9]">${item.productCategory}</span>
            </div>
            <div>
                  <h4 class="text-[14px] hl:text-[16px] text-[#BA2B20] ${item.discount ? "flex" :"hidden" }"><b>$${price}.00</b></h4>
                          <h4 class="text-[14px] hl:text-[16px] text-[#8C8C8C] ${item.discount ? "flex" :"hidden" }"><a class="line-through">$${item.price}.00</a></h4>
                          <h4 class="text-[14px] hl:text-[16px] leading-6 pt-3 sl:pt-0 ${item.discount ? "hidden" : "flex"} "> <b>$${
                            item.price
                          }.00</b></h4> 
            </div>
          </div>
        </a>
        </div>
  
 `}
  );

  if (type.length > 0) {
    swiperSlideDetail.innerHTML = tag;
  } else {
    swiperSlideDetail2.innerHTML = tag;
  }
}


window.goBasket = async () => {
  const token = localStorage.getItem("token")

  if(!token){
    location.href = '/src/login.htm'
    return
  }

  let obj = {
    list: {
      productId: RESPONSE._id,
      variantId: variant._id,
      count: countValue.value
  }
  }

  await Cart.update(obj, token)
  

  location.href = '/src/shopping.htm'

}