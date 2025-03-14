import { Category, Product, Tag } from "../services/api.js";
import { getVariant } from "../utils/get-variants.js";

const header = document.querySelector("header");
const footer = document.querySelector("footer");
const signinContainer = document.getElementById("signinContainer");

const searchContainer = document.getElementById("searchContainer");
const lgContainer = document.getElementById("lgContainer");
const sideContainer = document.getElementById("sideContainer");
const checkoutFooter = document.getElementById("checkoutFooter");
const checkoutHeader = document.getElementById("checkoutHeader");

let categoryData = []

const getCategoryData = async () => {
  let response = await Category.list()
  categoryData = response
  
  showCategorySide(response)
  showTrendingcategory(response)
  
}
getCategoryData()

const getTag = async () => {
  let response = await Tag.listTag()
  showlink(response)
}
getTag()

function showSideContainer() {
  if(!sideContainer){
    return
  }

  sideContainer.innerHTML += `<div
        id="sidebar"
        class="flex flex-col w-full h-screen bg-white overflow-y-auto"
      >
        <div class="wrapper">
          <div class="flex items-center justify-between">
            <div class="flex justify-between items-center gap-6">
              <button onclick="showSideBar()">
                <img src="/src/assets/xmark.svg" alt="" />
              </button>
              <button onclick="showSearchBar()">
                <img src="/src/assets/search copy.svg" alt="" />
              </button>
            </div>
            <div>
              <a href="/src/index.htm">
                <img src="/src/assets/logo copy.svg" alt="" />
              </a>
            </div>
            <div class="flex justify-between items-center gap-6">
              <img src="/src/assets/user copy.svg" alt="" />
              <img src="/src/assets/shopping copy.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="border-b border-[#E5E7EB] w-full"></div>
        <div class="wrapper">
          <div class="flex flex-col gap-6 max-w-[432px] mx-auto">
            <ul id="SideCategory" class="flex flex-col"></ul>

            <ul class="flex flex-col">
              <li
                class="border-b border-[#E5E7EB] w-full text-[#181818d9] text-[16px] py-2 leading-6"
              >
                <a>My Account</a>
              </li>
              <li
                class="border-b border-[#E5E7EB] w-full text-[#181818d9] text-[16px] py-2 leading-6"
              >
                <a>Initiate Return</a>
              </li>
              <li
                class="border-b border-[#E5E7EB] w-full text-[#181818d9] text-[16px] py-2 leading-6"
              >
                <a>Order Status</a>
              </li>
              <li
                class="border-b border-[#E5E7EB] w-full text-[#181818d9] text-[16px] py-2 leading-6"
              >
                <a>Contact Us</a>
              </li>
              <li class="w-full text-[#181818d9] text-[16px] py-1 leading-6">
                <a>Wishlist</a>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-2 mt-4 mb-12 max-w-[432px] mx-auto">
            <button
              class="border border-[#191919d9] rounded-[0.125rem] py-1.5 bg-[#191919] text-white text-[16px] leading-6 uppercase"
            >
              <b>Login</b>
            </button>
            <button
              class="border border-[#A1A8AF] rounded-[0.125rem] py-1.5 uppercase text-[16px] leading-6"
            >
              Join us
            </button>
          </div>
        </div>
        <div
          id="secondSideContainer"
          class="fixed invisible -z-1 bottom-0 right-0 left-0 top-[70px] duration-300 opacity-0"
        >
          <div
            id="secondSidebar"
            class="sidebar flex flex-col w-full h-screen bg-white overflow-y-auto"
          >
            <div>fkld;sm</div>
          </div>
        </div>
      </div>`;
}

showSideContainer()

const secondSideContainer = document.getElementById("secondSideContainer");
const secondSidebar = document.getElementById("secondSidebar");

 window.showSecondBar = function() {
  secondSideContainer.classList.toggle("secondside-act");
  secondSidebar.classList.toggle("secondside-act");
}

function showlgContainer() {

  if(!lgContainer){
    return
  }
  lgContainer.innerHTML += `<div
        id="lgBar"
        onmouseenter="showHover('${null}', false)"
        onmouseleave="showHover('${null}', false)"
        class="min-h-[50%] bg-white shadow-xl overflow-y-auto"
      >
        <div class="wrapper">
          <div class="flex justify-between items-start">
            <div class="w-2/12 lg:pt-2">
              <ul id="link"></ul>
            </div>
            <div class="w-10/12">
              <div class="flex gap-6" id="categoryitemchildren"></div>
            </div>
          </div>
        </div>
      </div>
  `;
}
showlgContainer();
const categoryitemchildren = document.getElementById("categoryitemchildren");

function showcategoryitemchildren(data) {
  if(!categoryitemchildren){
    return
  }
  let kod = "";
  data.children.map((item) => {
    let children = "";
    item.children.map(
      (element) =>
        (children += `<li class="text-[16px] text-[#6C6C6C] hover hover:text-[#181818d9] leading-6"><a href="shoes.htm?category=${element.slug}">${element.name}</a></li>`)
    );
    kod += `<div class="w-3/12">
      <p class="border-b-2 border-[#1C1C1C] text-[18px] leading-10 hover hover:text-[#8a7350d9]"><b><a href="shoes.htm?category=${item.slug}">${item.name}</a></b></p>
      <ul class="pt-3">
        ${children}
      </ul>
      </div>`;
  });
  categoryitemchildren.innerHTML = kod;
}

const link = document.getElementById("link");

function showlink(data) {
  if(!link){
    return
  }
  let kod = "";

  data.map(
    (item) =>
      (kod += `<li class="text-[#6C6C6C] py-[2px] text-[18px] hover hover:text-[#8a7350d9]"><a><b><button>${item.name}</button></b></a></li>`)
  );

  link.innerHTML = kod;}


const lgBar = document.getElementById("lgBar");

window.showHover = function (id = null, salam) {
  let data = null
  if(id){
    data = categoryData.find(item => item._id === id)
     if(data?.children && id){
      showcategoryitemchildren(data)
    }
  }

 if(id && !data?.children && salam){
  return
 }

  if (lgContainer.classList.contains("side-act")) {
    lgContainer.classList.remove("side-act");
    lgBar.classList.remove("side-act");
  } else {
    lgContainer.classList.add("side-act");
    lgBar.classList.add("side-act");
  }
};

function showsearchContainer() {
  if (!searchContainer) {
    return
  }
  searchContainer.innerHTML += `<div id="searchbar" class="h-screen bg-white overflow-y-auto">
        <div class="bg-[#F6F7F8] sticky inset-0">
          <div class="wrapper">
            <div class="flex gap-2 my-2 sl:items-center sl:gap-6">
              <button onclick="showSearchBar()" class="sl:hidden">
                <img src="/src/assets/left.svg" alt="" />
              </button>
              <div
                class="flex justify-between items-center bg-white w-full p-4 rounded-sm border border-[#676D75] checked:border checked:border-[#8C9198]"
              >
                <input
                  onblur="searchProducts()"
                  id="searchInp"
                  type="text"
                  placeholder="SEARCH PUMA.COM"
                  class="w-full outline-none font-sans"
                />
                <img src="/src/assets/search copy.svg" alt="" />
              </div>
              <button onclick="showSearchBar()" class="hidden sl:flex">
                <img src="/src/assets/xmark.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div class="wrapper">
          <div class="sl:flex sl:justify-between">
            <div class="flex flex-col gap-4 sl:w-5/12">
              <div>
                <h2 class="uppercase text-[20px]"><b>Trending searches</b></h2>
              </div>
              <div>
                <ul id="trendingcategory"></ul>
              </div>
            </div>

            <div class="py-6 sl:w-7/12 sl:py-0">
              <div class="pb-4">
                <h2 class="uppercase text-[20px]"><b>Recently viewed</b></h2>
              </div>
              <div class="flex flex-wrap" id="recentlyitem"></div>
            </div>
          </div>
        </div>
      </div>`;
}

showsearchContainer();


window.searchProducts = async () => {
  let value = document.getElementById("searchInp")
  if(!value){
    return
  }
  value = value?.value
  let obj = {
    search : value.length ? value : undefined
  }

  if(!obj.search) {
    delete obj.search
    obj.categories = "678b97d315ce927f7e1bd787"
  }

  let result = await Product.list(obj)

  if(!result.products.length === 0) return
  showrecentlyitem(result.products)
}

window.searchProducts()

const trendingcategory = document.getElementById("trendingcategory");

function showTrendingcategory(data) {
  if (!trendingcategory) {
    return
  }

  let kod = "";
  data.map(
    (item) => (kod += `<a href="${item.children ? `shoes.htm?category=${item.slug}` : 'index.htm'} "><li class="text-[#676D75] py-2"><b>${item.name}</b></li></a>`)
  );
  trendingcategory.innerHTML = kod;
}

const recentlyitem = document.getElementById("recentlyitem");
function showrecentlyitem(data) {
  if(!recentlyitem){
    return
  }

  recentlyitem.innerHTML = ''

  let kod = "";
  let kod1 = []
  let variant = [];

  data.forEach((item) => {
    kod1 = getVariant(item);
    variant.push(...kod1);
  });

  
  variant.map(
    (item) => { 
      // console.log(item)

      let price= 0

    if (item.discount) {
      if (item.discountType === "percentage") {
        price = item.price - (item.price * item.discount) / 100;
      } else {
        price = item.price - item.discount;
      }
    } else {
      price = item.price;
    }

  
      ( kod += `<div class="w-full zl:w-6/12 mb-4">
        <a href="detail.htm?product_slug=${item.productSlug}&slug=${item.slug}" class="block cursor-pointer">
                     <div class="flex items-center ">
                       <div class="w-[100px] h-[100px]">
                             <img
                              src="${item.images[0].url}"
                               alt=""
                              class="w-[100px] h-[100px]"/>
                      </div>
                      <div class="flex flex-col gap-2">
                        <div>
                          <h6><b>${item.productTitle}</b></h6>
                          <span class="text-[16px] text-[#676D75]">${item.productCategory}</span>
                        </div>
                          <div class="flex gap-2 items-center">
                          <h4 class="text-[14px] hl:text-[16px] text-[#BA2B20] ${item.discount ? "flex" :"hidden" }"><b>$${price}.00</b></h4>
                          <h4 class="text-[14px] hl:text-[16px] text-[#8C8C8C] ${item.discount ? "flex" :"hidden" }"><a class="line-through">$${item.price}.00</a></h4>
                          <h4 class="text-[14px] hl:text-[16px] leading-6 pt-3 sl:pt-0 ${item.discount ? "hidden" : "flex"} "> <b>$${
                            item.price
                          }.00</b></h4> 
                          </div>
                      </div>
                 </div>
                 </a>
      </div>`)


  }
  
  );
  recentlyitem.innerHTML = kod;
}

const searchbar = document.getElementById("searchbar");

window.showSearchBar = function() {
  searchContainer.classList.toggle("side-act");
  searchbar.classList.toggle("side-act");
}


function showsigninContainer() {
  const token = localStorage.getItem("token")
  if(!signinContainer){
    return
  }
  signinContainer.innerHTML += `<div id="signinBar" class="bg-white max-h-[365px] rounded-sm relative">
        <div class="absolute border-b-[10px] border-b-[#fff] border-r-[10px] border-l-[10px] border-r-transparent  border-l-transparent -top-[10px] right-10">
        </div>
        <div class=" flex flex-col px-4 py-6">
          <div>
            <ul class="w-full flex flex-col justify-start items-start text-[#181818]">
            ${!token ? `<li class="border-b-2 border-[#E7E8E8] w-full py-2 text-[16px]"><a href="/src/login.htm">My Account</a></li>`: `<li class="border-b-2 border-[#E7E8E8] w-full py-2 text-[16px]"><a href="/src/account.htm">My Account</a></li>`}
              <li class="border-b-2 border-[#E7E8E8] w-full py-2 text-[16px]"><a href="">Initiate Return</a></li>
              <li class="border-b-2 border-[#E7E8E8] w-full py-2 text-[16px]"><a href="">Order Status</a></li>
              <li class="border-b-2 border-[#E7E8E8] w-full py-2 text-[16px]"><a href="">Contact Us</a></li>
              <li class="py-2 text-[16px]"><a href="">Whislist</a></li>
            </ul>
          </div>
          <div class="flex flex-col gap-2">
            ${!token ? `<button class="border border-[#191919] uppercase text-[16px] py-2 rounded-sm bg-[#191919] text-white"><a href="/src/login.htm" class="w-full inline-block"><b>Login</b></a></button>
            <button class="border border-[#A1A8AF] uppercase text-[16px] py-2 rounded-sm"><a href="/src/login.htm"><b>Join us</b></a></button>` : `<button onclick="logout()" class="border border-[#191919] uppercase text-[16px] py-2 rounded-sm bg-[#191919] text-white"><b>Logout</b></button>`}
          </div>
        </div>
                           </div>
  `;
  window.logout = function () {
    localStorage.removeItem("token")
     window.location.href = '/src/index.htm'
    // location.reload()
  }
}
showsigninContainer();

const signinBar = document.getElementById("signinBar");

window.showSign = function() {
  const token = localStorage.getItem("token")
  
  let width = window.innerWidth

  if(width < 1024 && !token){
    window.location.href = '/src/login.htm'
    return
  }else if (width < 1024 && token){
    window.location.href = '/src/account.htm'
    return
  }
  signinContainer.classList.toggle("side-act");
  signinBar.classList.toggle("side-act");
}

function showHeader() {
  if(checkoutHeader){
    return
  }
  header.innerHTML += `<nav class="bg-black text-white">
        <div class="wrapper md:!py-0">
          <div class="flex items-center justify-between">
            <div class="flex justify-between items-center gap-6 md:hidden">
              <button onclick="showSideBar()">
                <img src="/src/assets/bar.svg" alt="" />
              </button>
              <button onclick="showSearchBar()">
                <img src="/src/assets/search.svg" alt="" />
              </button>
            </div>
            <div
              class="md:order-[-1] md:items-center md:flex md:justify-between md:gap-6"
            >
              <a href="/src/index.htm">
                <img src="/src/assets/logo.svg" alt="" />
              </a>
              <div>
                <ul class="hidden md:flex" id="SideCategoryDes"></ul>
              </div>
            </div>
            <div class="flex justify-between items-center gap-1">
              <button
                onclick="showSearchBar()"
                class="hidden md:flex lg:border lg:border-[#676D75] lg:gap-3 lg:rounded-[3px] lg:py-2 lg:px-5 lg:hover:border lg:hover:border-[#fff]"
              >
                <img src="/src/assets/search.svg" alt="" />
                <p class="hidden lg:flex uppercase"><b>Search</b></p>
              </button>
              <a href="wishlist.htm"
                class="hidden md:flex border border-transparent hover:border-[#191919d9] hover:bg-[#c7c9ca6a] w-[50px] h-[50px] rounded-full justify-center items-center duration-300"
              >
                <img src="/src/assets/heart.svg" alt="" />
              </a>
              <button onclick="showSign()"
                class="md:order-[1] border border-transparent hover:border-[#191919d9] hover:bg-[#c7c9ca6a] flex justify-center items-center w-[50px] h-[50px] rounded-full duration-300"
              >
                <img src="/src/assets/user.svg" alt="" />
              </button>
              <button
                onclick="clickShopBtn()"
                class="border border-transparent hover:border-[#191919d9] hover:bg-[#c7c9ca6a] flex justify-center items-center w-[50px] h-[50px] rounded-full duration-300"
              >
                <img src="/src/assets/shopping.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
      </nav>`;
}

showHeader();

window.clickShopBtn = () => {
  let token = localStorage.getItem("token")

  if(token){
    location.href = '/src/shopping.htm'
  }else{
    location.href = '/src/login.htm'
  }
}

const SideCategory = document.getElementById("SideCategory");
const SideCategoryDes = document.getElementById("SideCategoryDes");

function showCategorySide(data) {
  
  if(!SideCategory || !data) {
    return
  }
  let kod = "";
  data.map(
    (item, index) =>
      (kod += `<a href="shoes.htm?category=${item.slug}"><li onclick="showSecondBar()"  onmouseenter="showHover('${item._id}', true)" onmouseleave="showHover('${item._id }', true)" class="flex justify-between hover:border-b-2 hover:border-[#8a7350d9]  ${
        index === 6 && "border-none"
      } items-center border-b border-[#E5E7EB] md:border-none py-8">
             <button >
                <p class=" border-transparent border-b-2 md:hover:border-[#8a7350d9] font-bold text-[20px] leading-6 md:px-3 md:text-[16px] md:text-white"> <b>${item.name}</b></p>
            </button>
                 <button class="md:hidden">
                <span><img src="/src/assets/right.svg" alt=""></span>
                </button>
              </li><a>`)
  );
  SideCategory.innerHTML = kod;
  SideCategoryDes.innerHTML = kod;
}
showCategorySide();

window.showSideBar = function() {
  // sidebar.classList.toggle("side-act");
  sideContainer.classList.toggle("side-act");
}

function showFooter() {
  if(checkoutHeader){
    return
  }
  footer.innerHTML += `<div class="wrapper">
        <div class="py-2">
          <div
            class="flex flex-col gap-4 border-b border-[#999999] py-4 sl:hidden"
          >
            <div class="flex flex-col">
              <button
                onclick="toggleAccordion(0)"
                class="flex justify-between items-center text-white w-full"
              >
                <p class="text-[18px] uppercase"><b>Support</b></p>
                <img src="/src/assets/down.svg" alt="" class="accordion-icon" />
              </button>
              <div class="accordion-content flex justify-between items-center">
                <div>
                  <ul class="flex flex-col text-white gap-2 text-[16px]">
                    <li class="hover hover:text-white">
                      <a href="">Contact Us</a>
                    </li>
                    <li><a href="">FAQ</a></li>
                    <li><a href="">Shipping and Delivery</a></li>
                    <li><a href="">Return Policy</a></li>
                    <li><a href="">Terms & Conditions</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Promotion Exclusions</a></li>
                    <li><a href="">Do Not Sell or Share My Information</a></li>
                    <li><a href="">Transparency in Supply Chain</a></li>
                  </ul>
                </div>
                <div>
                  <ul class="flex flex-col text-white gap-2">
                    <li><a href="">NYC Flagship Store</a></li>
                    <li><a href="">Las Vegas Flagship Store</a></li>
                    <li><a href="">Store Locator</a></li>
                    <li><a href="">Buy a Gift Card</a></li>
                    <li><a href="">Gift Card Balance</a></li>
                    <li><a href="">Service Discount</a></li>
                    <li><a href="">Student Discount</a></li>
                    <li><a href="">Refer a Friend</a></li>
                    <li><a href="">Cookie Settings</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <button
                onclick="toggleAccordion(1)"
                class="flex justify-between items-center w-full text-white"
              >
                <p class="text-[18px] uppercase"><b>About</b></p>
                <img src="/src/assets/down.svg" alt="" class="accordion-icon" />
              </button>
              <div class="accordion-content">
                <ul class="flex flex-col text-white gap-2">
                  <li><a href="">Company</a></li>
                  <li><a href="">Corporate News</a></li>
                  <li><a href="">Press Center</a></li>
                  <li><a href="">#REFORM</a></li>
                  <li><a href="">Investors</a></li>
                  <li><a href="">Sustainability</a></li>
                  <li><a href="">Careers</a></li>
                </ul>
              </div>
            </div>
            <div>
              <button
                onclick="toggleAccordion(2)"
                class="flex justify-between items-center w-full text-white"
              >
                <p class="text-[18px] uppercase"><b>Stay up to date</b></p>
                <img src="/src/assets/down.svg" alt="" class="accordion-icon" />
              </button>
              <div class="accordion-content">
                <ul class="flex flex-col text-white gap-2">
                  <li><a href="">Sign Up for Email</a></li>
                </ul>
              </div>
            </div>
            <div>
              <button
                onclick="toggleAccordion(3)"
                class="flex justify-between items-center text-white w-full"
              >
                <p class="text-[18px] uppercase"><b>explore</b></p>
                <img src="/src/assets/down.svg" alt="" class="accordion-icon" />
              </button>
              <div class="accordion-content">
                <div class="flex gap-8">
                  <div
                    class="border border-white rounded-md flex flex-col justify-center items-center p-4"
                  >
                    <img src="/src/assets/logo.svg" alt="" />
                    <span class="uppercase text-white text-[10px]">App</span>
                  </div>
                  <div
                    class="border border-white rounded-md flex flex-col justify-center items-center p-4"
                  >
                    <img src="/src/assets/logo.svg" alt="" />
                    <span class="uppercase text-white text-[10px]">Trac</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="hidden sl:flex justify-between border-b border-[#999999] py-6"
          >
            <div class="w-7/12 flex justify-between">
              <div class="flex flex-col gap-4">
                <div class="text-white">
                  <p class="text-[18px] uppercase"><b>Support</b></p>
                </div>
                <div class="flex gap-16">
                  <div>
                    <ul class="flex flex-col text-[#DFE0E1] gap-2">
                      <li class="hover hover:text-white">
                        <a href="">Contact Us</a>
                      </li>
                      <li class="hover hover:text-white"><a href="">FAQ</a></li>
                      <li class="hover hover:text-white">
                        <a href="">Shipping and Delivery</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Return Policy</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Terms & Conditions</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Privacy Policy</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Promotion Exclusions</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Do Not Sell or Share My Information</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Transparency in Supply Chain</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul class="flex flex-col text-[#DFE0E1] gap-2">
                      <li class="hover hover:text-white">
                        <a href="">NYC Flagship Store</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Las Vegas Flagship Store</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Store Locator</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Buy a Gift Card</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Gift Card Balance</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Service Discount</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Student Discount</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Refer a Friend</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Cookie Settings</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <div class="text-white">
                  <p class="text-[18px] uppercase"><b>About</b></p>
                </div>
                <div class="flex justify-between">
                  <div>
                    <ul class="flex flex-col text-[#DFE0E1] gap-2">
                      <li class="hover hover:text-white">
                        <a href="">Company</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Corporate News</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Press Center</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">#REFORMy</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Investors</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Sustainability</a>
                      </li>
                      <li class="hover hover:text-white">
                        <a href="">Careers</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-4/12 flex justify-center">
              <div class="flex flex-col gap-4">
                <div class="text-white">
                  <p class="text-[18px] uppercase"><b>Stay up to date</b></p>
                </div>
                <div class="flex justify-between">
                  <div>
                    <ul class="flex flex-col text-[#DFE0E1] gap-2">
                      <li class="hover hover:text-white">
                        <a href="">Sign Up for Email</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="text-white">
                  <p class="text-[18px] uppercase"><b>Explore</b></p>
                </div>
                <div class="flex gap-2">
                  <div
                    class="border border-[#999999] hover:border hover:border-white rounded-md flex flex-col justify-center items-center p-4"
                  >
                    <img src="/src/assets/logo.svg" alt="" />
                    <span class="uppercase text-white text-[10px]">App</span>
                  </div>
                  <div
                    class="border border-[#999999] hover:border hover:border-white rounded-md flex flex-col justify-center items-center p-4"
                  >
                    <img src="/src/assets/logo.svg" alt="" />
                    <span class="uppercase text-white text-[10px]">Trac</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="py-6 flex flex-col sm:flex-row sm:justify-between">
            <div class="sm:w-6/12">
              <ul class="flex items-center gap-4 justify-between w-full">
                <li>
                  <button
                    class="border border-transparent hover:border-[#191919d9] hover:bg-[#c7c9ca6a] rounded-full duration-300 w-[50px] flex items-center justify-center h-[50px]"
                  >
                    <img src="/src/assets/youtube.svg" alt="" />
                  </button>
                </li>
                <li>
                  <button
                    class="border border-transparent hover:border-[#191919d9] hover:bg-[#c7c9ca6a] rounded-full duration-300 w-[50px] flex items-center justify-center h-[50px]"
                  >
                    <img src="/src/assets/twitter.svg" alt="" />
                  </button>
                </li>
                <li>
                  <button
                    class="border border-transparent hover:border-[#191919d9] hover:bg-[#c7c9ca6a] rounded-full duration-300 w-[50px] flex items-center justify-center h-[50px]"
                  >
                    <img src="/src/assets/pinterest.svg" alt="" />
                  </button>
                </li>
                <li>
                  <button
                    class="border border-transparent hover:border-[#191919d9] hover:bg-[#c7c9ca6a] rounded-full duration-300 w-[50px] flex items-center justify-center h-[50px]"
                  >
                    <img src="/src/assets/instagram.svg" alt="" />
                  </button>
                </li>
                <li>
                  <button
                    class="border border-transparent hover:border-[#191919d9] hover:bg-[#c7c9ca6a] rounded-full duration-300 w-[50px] flex items-center justify-center h-[50px]"
                  >
                    <img src="/src/assets/facebook.svg" alt="" />
                  </button>
                </li>
              </ul>
            </div>
            <div
              class="flex flex-col justify-end items-end text-[#a1a8afd9] py-6 sm:py-0 sm:w-6/12 sm:text-right"
            >
              <span class="text-[12px] uppercase"
                >© PUMA North America, Inc.</span
              >
              <span class="text-[12px] leading-4 uppercase underline"
                >Imprint and Legal Data</span
              >
              <span class="text-[12px] uppercase">Web ID: 577 055 593</span>
            </div>
          </div>
        </div>
      </div>
    `;
}

showFooter();

const accordionContent = document.querySelectorAll(".accordion-content");
const accordionIcon = document.querySelectorAll(".accordion-icon");

window.toggleAccordion = (i) => {
  if (accordionContent[i].classList.contains("accordion-active")) {
    accordionContent[i].classList.remove("accordion-active");
    accordionIcon[i].classList.remove("accordion-icon-active");
  } else {
    accordionContent[i].classList.add("accordion-active");
    accordionIcon[i].classList.add("accordion-icon-active");
  }
};


const SizeContainer = document.getElementById("SizeContainer")

window.showSizeContainers = () => {

  if(!SizeContainer){
    return
  }

  SizeContainer.innerHTML+=`<div id="SizeBar" class="bg-white max-w-[448px] w-full rounded-md">
        <div class="wrapper">
          <div class="px-4 py-2 md:p-0">
            <div class="mb-4">
              <div class="flex justify-between items-center pt-4">
                <span class="text-[#6D6D6D]">#400986_01</span>
                <span
                  ><button onclick="showSizeContainer()">
                    <img src="/src/assets/xmark.svg" alt="" /></button
                ></span>
              </div>
              <div class="flex flex-col gap-3 pt-2">
                <h2 class="text-[20px] bl:text-[28px] bl:leading-8">
                  <b>Speedcat OG Women's Sneakers</b>
                </h2>
                <h3><span>PUMA Black-PUMA White</span></h3>
              </div>
              <div class="flex gap-2 border-b border-[#E5E7EB] py-4">
                <div>
                  <img
                    src="/src/assets/minikkusimg.avif"
                    class="max-w-[75px] max-h-[75px] w-full h-full bl:max-h-[60px] bl:max-w-[60px]"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="/src/assets/minikkusimg.avif"
                    class="max-w-[75px] max-h-[75px] w-full h-full bl:max-h-[60px] bl:max-w-[60px]"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="/src/assets/minikkusimg.avif"
                    class="max-w-[75px] max-h-[75px] w-full h-full bl:max-h-[60px] bl:max-w-[60px]"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-1 hl:grid-cols-6">
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
              <div
                class="border border-[#E5E7EB] p-4 text-center max-w-[75px] max-h-[75px] h-full w-full bl:max-w-[60px] bl:max-h-[60px]"
              >
                <span>5.5</span>
              </div>
            </div>
            <div class="py-4">
              <button
                class="uppercase w-full text-white bg-[#181818] py-4 rounded-sm"
              >
                <b>Update item</b>
              </button>
            </div>
          </div>
        </div>
      </div>`
}
showSizeContainers()



const SizeBar = document.getElementById("SizeBar")

window.showSizeContainer = () => {
SizeContainer.classList.toggle("side-act")
SizeBar.classList.toggle("side-act")
}  


const deleteContainer = document.getElementById("deleteContainer")

function showdeleteContainer(){

  if(!deleteContainer){
    return
  }

  deleteContainer.innerHTML+=`<div
        id="deleteBar"
        class="bg-white rounded-md hl:max-w-[456px] hl:max-h-[384px] hl:mx-auto zl:max-w-[512px] zl:max-h-[355px]"
      >
        <div class="wrapper">
          <div class="flex flex-col gap-4 sm:gap-5 sm:py-2">
            <div class="flex justify-between items-center gap-2">
              <span class="text-[20px]"
                >Are you sure you want to remove this item?</span
              >
              <span class="flex pt-[5px]">
                <button onclick="showDeleteBar()">
                  <img src="/src/assets/xmark.svg" alt="" />
                </button>
              </span>
            </div>
    
            <div class="flex gap-4">
              <button onclick="deleteBasket()"
                class="border border-[#191919] bg-[#191919] rounded-sm py-2 text-white uppercase w-6/12"
              >
                <b>Remove</b>
              </button>
              <button onclick="showDeleteBar()"
                class="border border-[#191919] bg-[#191919] rounded-sm py-2 text-white uppercase w-6/12"
              >
                <b>Cancel</b>
              </button>
            </div>
          </div>
        </div>
      </div>`
}
showdeleteContainer()

const deleteBar= document.getElementById("deleteBar")

window.showDeleteBar = () => {
  deleteContainer.classList.toggle("side-act");
  deleteBar.classList.toggle("side-act")
} 