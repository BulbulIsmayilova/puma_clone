import { Cart } from "../services/api.js";

const SizeContainer = document.getElementById("SizeContainer");
const SizeBar = document.getElementById("SizeBar");
const deleteContainer = document.getElementById("deleteContainer");
const deleteBar = document.getElementById("deleteBar");
const whislistSideContainer = document.getElementById("whislistSideContainer");
const whislistSideBar = document.getElementById("whislistSideBar");
const swiperSlidewhislist = document.getElementById("swiper-slidewhislist");
const contain = document.getElementById("contain");
const wishLength = document.getElementById("wishLength");
const cartContain = document.getElementById("cartContain");

window.showwhislistSideContainer = (id) => {
  whislistSideContainer.classList.toggle("side-act");
  whislistSideBar.classList.toggle("side-act");
  showCartList(id);
};

let wish = localStorage.getItem("wish");
let obj;

if (!wish) {
  wish = [];
} else {
  wish = JSON.parse(wish);
}
wishLength.innerText = `${wish.length} items`;

const showCartList = (id) => {
  obj = wish.find((item) => item._id === id);

  cartContain.innerHTML = "";

  cartContain.innerHTML += `
      <div
              class="flex gap-4 overflow-y-auto max-h-[95vh] h-full items-center py-4"
            >
              <div class="">
                <a href=""
                  ><img
                    src="${obj.images[0].url}"
                    class="max-w-[128px] max-h-[128px]"
                    alt=""
                /></a>
              </div>
              <div class="flex flex-col gap-2">
                <div>
                  <h2 class="text-[16px] leading-6">
                    <b>${obj.productTitle}</b>
                  </h2>
                  <p class="text-[12px] zl:text-[14px]">
                    <span class="text-[#7C7C7C]">Color: </span> 
                    ${obj.specs.color}
                  </p>
                  <p class="text-[12px] zl:text-[14px]">
                    <span class="text-[#7C7C7C]">Size: </span> 
                    ${obj.specs.size}
                  </p>
                  <p class="uppercase text-[14px] text-[#191919]">
                    <a href="">$ ${obj.price}</a>
                  </p>
                </div>
              </div>
            </div>
    `;
};

window.addToCard = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    location.href = "/src/login.htm";
    return;
  }

  let data = {
    list: {
      productId: obj.productId,
      variantId: obj._id,
      count: 1,
    },
  };

  let result = await Cart.update(data, token);

  if (result) {
    wish = wish.filter((item) => item._id !== obj._id);
    localStorage.setItem("wish", JSON.stringify(wish));
  }

  location.href = "/src/shopping.htm";
};

const show = () => {
  contain.innerHTML = "";
  if (wish.length === 0) return;

  wish.map((item) => {
    contain.innerHTML += `
      <div class="flex flex-col zl:max-w-[650px] bl:max-w-[958px]">
                <div
                  class="flex gap-4 items-center py-4 zl:gap-4 bl:gap-7 md:gap-1"
                >
                  <div class="zl:w-4/12">
                    <a href=""
                      ><img
                        src="${item.images[0].url}"
                        class="max-w-[128px] max-h-[128px] hl:max-w-[192px] hl:max-h-[192px] zl:max-w-[208px] zl:max-h-[208px] bl:max-w-[256px] bl:max-h-[256px]"
                        alt=""
                    /></a>
                  </div>
                  <div class="flex flex-col gap-2 zl:w-8/12">
                    <div>
                      <h2
                        class="text-[14px] hl:text-[16px] leading-3 hl:leading-5 zl:text-[20px]"
                      >
                        <b>${item.productTitle}</b>
                      </h2>
                      <p class="text-[12px] capitalize pt-2 zl:text-[14px] bl:text-[18px]">
                        ${item.specs.color}
                      </p>
                    </div>
                    <div class="flex flex-col">
                      <b class="uppercase text-[12px] zl:text-[14px]"
                        >Size: <span>${item.specs.size}</span></b
                      >
                      <b class="uppercase text-[12px] zl:text-[14px]"
                        >Price: <span> $${item.price}</span></b
                      >
                    </div>
                    <div class="flex gap-4 zl:pt-4">
                      <button
                        onclick="deleteWish('${item._id}')"
                        class="border border-transparent hover:border-[#D1D1D1] hover:bg-[#D1D1D1] p-3 rounded-[50%]"
                      >
                        <img src="/src/assets/trash.svg" alt="" />
                      </button>
                    </div>
                    <div class="pt-3 pb-4 hidden zl:flex w-full zl:pb-0">
                      <button
                        onclick="showwhislistSideContainer('${item._id}')"
                        class="w-full py-2 rounded-sm uppercase border border-[#191919] bg-[#191919] text-white"
                      >
                        <b>Add to Cart</b>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="pt-3 pb-4 zl:hidden">
                  <button
                    onclick="showwhislistSideContainer('${item._id}')"
                    class="w-full py-2 rounded-sm uppercase border border-[#191919] bg-[#191919] text-white"
                  >
                    <b>Add to Cart</b>
                  </button>
                </div>
              </div>
    `;
  });
};
show();

window.deleteWish = (id) => {
  wish = wish.filter((item) => item._id !== id);

  localStorage.setItem("wish", JSON.stringify(wish));
  wishLength.innerText = `${wish.length} items`;
  show();
};

let swiper = new Swiper(".mySwiper", {
  slidesPerView: 3.2,
  spaceBetween: 8,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
  },
});

function showWhislistitemBar() {
  Array.from({ length: 8 }).map(
    (item) =>
      (swiperSlidewhislist.innerHTML += `
        <div class="swiper-slide">
          <div class="max-w-[134px] w-full my-4">
            <img src="/src/assets/Slider1imgmob.avif" class="w-full h-full object-cover " alt="" />
          </div>
          <div class="pt-4 text-left">
            <div>
              <h3 class="text-[14px] leading-5  "> <b>PUMA x SQUID GAME Easy Rider</b></h3>
              <span class="text-[16px] sm:text-[16px]  leading-6 text-[#676d75d9]">Men's Sneakers</span>
            </div>
            <div>
            <h4 class="text-[14px] hl:text-[16px] text-[#BA2B20]"><b>$69.00</b></h4>
              <h4 class="text-[14px] hl:text-[16px] text-[#8C8C8C]"><a class="line-through">$75.00</a></h4>
               <h4 class="text-[14px] hl:text-[16px] leading-6 pt-3 sl:pt-0"> <b>$100.00</b></h4>
            </div>
          </div>
        </div>
  
 `)
  );
}

showWhislistitemBar();
