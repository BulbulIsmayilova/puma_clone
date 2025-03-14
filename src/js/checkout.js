import { Order } from "../services/api.js"

const accordionCard = document.querySelector('.accordion-card')
const carticon2 = document.querySelector('.cart-icon2')
const contain = document.getElementById("contain")

const getData = async () => {
  const token = localStorage.getItem("token")

  let result = await Order.list(token)

  console.log(result)
  show(result)
}
getData()

const show = (data) => {
  data.map(item => {
    contain.innerHTML += `
      <div
                      class="rounded-sm flex bl:flex-wrap gap-3 bl:gap-0 justify-between p-3 zl:p-4 bl:p-5"
                    >
                      <div class="w-4/12 md:w-3/12 sl:w-4/12">
                        <img
                          src="/src/assets/shoppingItem.avif"
                          class="w-full hl:min-w-[128px] hl:min-h-[128px] zl:h-[192px] zl:w-[192px]"
                          alt=""
                        />
                      </div>
                      <div class="w-8/12 bl:w-6/12 md:w-7/12 sl:w-6/12 md:pl-4">
                        <div class="flex flex-col gap-3">
                          <div class="flex flex-col">
                            <h3
                              class="text-[16px] zl:text-[20px] sl:text-[18px] lg:text-[20px]"
                            >
                              <b>Speedcat OG</b>
                            </h3>
                            <span
                              class="text-[#70767E] text-[14px] sm:text-[16px]"
                              >Sneakers</span
                            >
                          </div>
                          <div class="flex flex-col leading-4 hl:leading-5">
                            <p
                              class="text-[#838383] text-[12px] hl:text-[14px]"
                            >
                              <span>Color:</span>
                              <span class="text-[#323232]"
                                >Dark Myrtle-PUMA White</span
                              >
                            </p>
                            <p
                              class="text-[#838383] text-[12px] hl:text-[14px]"
                            >
                              <span>Size:</span>
                              <span class="text-[#323232]"
                                >Womens 9 / Mens 7.5</span
                              >
                            </p>
                            <p
                              class="text-[#838383] text-[12px] hl:text-[14px]"
                            >
                              <span>Style Number:</span>
                              <span class="text-[#323232]">398846_12</span>
                            </p>
                          </div>
                          <div
                            class="flex flex-col gap-4 pb-3 bl:hidden hl:flex-row hl:justify-between hl:items-center hl:pt-6"
                          >
                            <div class="hl:order-1">
                              <p
                                class="text-[16px] sl:text-[18px] lg:text-[20px]"
                              >
                                <b>$100.00</b>
                              </p>
                            </div>
                            <div class="flex gap-3 pl-3">
                              <button onclick="showSizeContainer()">
                                <img src="/src/assets/edit.svg" alt="" />
                              </button>
                              <button onclick="showDeleteBar()">
                                <img src="/src/assets/trash.svg" alt="" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="hidden bl:flex w-2/12 flex-col gap-4 pb-3">
                        <div>
                          <p class="text-[16px] bl:pl-3 sl:pl-0 lg:pl-3">
                            <b>$100.00</b>
                          </p>
                        </div>
                        <div class="flex gap-3 pl-3">
                          <button onclick="showSizeContainer()">
                            <img src="/src/assets/edit.svg" alt="" />
                          </button>
                          <button onclick="showDeleteBar()">
                            <img src="/src/assets/trash.svg" alt="" />
                          </button>
                        </div>
                      </div>
                    </div>
    `
  })
}

const toggleAccordionCard = () => {
    accordionCard.classList.toggle('accordion-card')
    accordionCard.classList.toggle("cart-accordion")
    carticon2.classList.toggle("accordion-icon-active")
};

const cartAccordion = document.querySelector(".cart-accordion");
const cartIcon = document.querySelector(".cart-icon");

const toggleCartAccordion = () => {
  cartAccordion.classList.toggle("accordion-active");
  cartIcon.classList.toggle("accordion-icon-active");
};