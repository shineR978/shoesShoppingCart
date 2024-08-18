// 購物車橘色圖示
const cartCounter = document.querySelector(".cart__counter");

// 購物車總共物品
const cartDOM = document.querySelector(".cart__items");

// 購物車數量 0
const totalCount = document.querySelector("#total__counter");

// 購物車總成本 價格
const totalCost = document.querySelector(".total__cost");

// 購物車內 Check Out btn
const checkOutBtn = document.querySelector(".check_out_btn");

// 購物車新增btn
const addToCartBtn = document.querySelectorAll(".btn__add__to__cart");

// 購物車初始為 陣列 0
let cartItems = JSON.parse(localStorage.getItem("cart___items")) || [];

//  DOMContentLoaded 文檔被完全加載和解析完成後觸發。
document.addEventListener("DOMContentLoaded", loadData);

// 購物車內 Check Out btn
checkOutBtn.addEventListener("click", () => {
  // Check Out btn 點擊清除
  clearCartItems();
});

// 購物車橘色圖示
cartCounter.addEventListener("click", () => {
  // 點擊有 active 這樣可以顯示或隱藏購物車的內容
  cartDOM.classList.toggle("active");
});

// Add To Cart 監聽 被點擊btn的商品要做的事情
addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let parentElement = btn.parentElement;
    // 查看物件 console.log(parentElement.querySelector(".prodoct__price").innerText);
    const product = {
      // 取得商品資訊
      id: parentElement.querySelector("#product_id").value,
      name: parentElement.querySelector(".product__name").innerText,
      image: parentElement.querySelector("#image").getAttribute("src"),
      price: parentElement
        .querySelector(".product__price")
        // replace $ 符號替換為空字符串回傳價格。這在處理顯示價格等信息時非常有用。
        .innerText.replace("$", ""),
      // 商品數量
      quantity: 1,
    };

    // 監聽 點擊 Add To Cart 的商品資訊過濾
    let isInCart =
      // 過濾點擊 Add To Cart 項目的 id 與 product.id 相同
      // 並檢查這些項目的數量是否大於 0。如果大於 0，表示 cartItems 中已經存在該商品。
      cartItems.filter((item) => item.id === product.id).length > 0;

    // 比較購物車內的商品是否重複
    if (!isInCart) {
      // insertAdjacentHTML 將商品資訊新增到 DOM 中
      addItemToTheDOM(product);
    } else {
      // 產品已經購物車中
      alert("Prosuct alreday In the Cart");
      return;
    }

    // insertAdjacentHTML DOM 中 去互動 + - x 的功能
    const cartDOMItems = document.querySelectorAll(".cart__item");

    // 目前購物車的所有 HTML 內的問品 insertAdjacentHTML
    cartDOMItems.forEach((indivdualItem) => {
      // indivdualItem >>各別項目 取得新增的物品name id = 商品name id
      if (indivdualItem.querySelector("#porduct__id").value === product.id) {
        //  function increaseItem >>增加項目 + btn功能
        increaseItem(indivdualItem, product);
        //  function decreaseItem >>減少項目 - btn功能
        decreaseItem(indivdualItem, product);
        //  function decreaseItem >>刪除項目 x btn功能
        removeItem(indivdualItem, product);
      }
    });

    // 將 監聽 過濾 的商品新增至購物車
    cartItems.push(product);
    // 購物車圖示的變化 calculateTotal 計算總計
    calculateTotal();
    // 儲存本地瀏覽器購物車的紀錄
    saveToLocalStorage();
  });
});

// 儲存本地瀏覽器購物車的紀錄
function saveToLocalStorage() {
  // 將本地的購物車存放紀錄 回傳JSON陣列
  localStorage.setItem("cart___items", JSON.stringify(cartItems));
}

// insertAdjacentHTML 將商品資訊新增到 DOM 中
function addItemToTheDOM(product) {
  // 指定的 HTML 插入到 DOM 樹中的指定位置
  cartDOM.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="cart__item">
             
              <input type="hidden" name="" id="porduct__id" value="${product.id}"/>
              <img src="${product.image}" alt="" id="product__" />
              <h4 id="product__name">${product.name}</h4>
             
              
              <a  class="btn__small" action="decrease">&minus;</a>
              <h4 class="product__quantity">${product.quantity}</h4>
              
              
              <a  class="btn__small" action="increase">&plus;</a>
              <span class="product__price">${product.price}</span>
              
              <a  class="btn__small btn__remove" action="remove">&times;</a>
              
                
            </div>`
  );
}

// 購物車圖示的變化 calculateTotal>>計算總計
function calculateTotal() {
  let total = 0;
  // 執行購物車內的每個物品
  cartItems.forEach((item) => {
    //購物車的 數量跟價格
    total += item.quantity * item.price;
  });

  // 購物車總價格 = 更新加入新物品的價格
  totalCost.innerText = total;
  // 購物車數量  =  被加入購物車的物品的長度
  totalCount.innerText = cartItems.length;
  // console.log(cartItems.length);
}

// increaseItem >>增加項目 購物車內的 + btn功能
function increaseItem(indivdualItem, porduct) {
  indivdualItem
    // insertAdjacentHTML 偵測到是被點擊購物車內的 + >>action='increase'
    .querySelector("[ action='increase']")
    .addEventListener("click", () => {
      // 觸發被點擊的購物車內物品 +btn  將被執行內部被選取的屬性
      cartItems.forEach((cartItem) => {
        // 購物車name id = 商品name id
        if (cartItem.id === porduct.id) {
          // 被被執行購物車裡面的 價格及增加對應的 HTML 元素 (insertAdjacentHTML)
          indivdualItem.querySelector(".product__quantity").innerText =
            //增加insertAdjacentHTML DOM數量
            ++cartItem.quantity;
          // 執行function calculateTotal>>計算總計 Total Amout
          calculateTotal();
          // 儲存本地瀏覽器購物車的紀錄
          saveToLocalStorage();
        }
      });
    });
}

// decreaseItem >>減少項目 購物車內的 - btn功能
function decreaseItem(indivdualItem, porduct) {
  indivdualItem
    // insertAdjacentHTML 偵測到是被點擊購物車內的 + >>action='increase'
    .querySelector("[ action='decrease']")
    .addEventListener("click", () => {
      // 觸發被點擊的購物車內物品 +btn  將被執行內部被選取的屬性
      cartItems.forEach((cartItem) => {
        // 購物車name id = 商品name id
        if (cartItem.id === porduct.id) {
          // 如果 -btn 數量大於1
          if (cartItem.quantity > 1) {
            // 被被執行購物車裡面的 價格及刪除對應的 HTML 元素數量 (insertAdjacentHTML)
            indivdualItem.querySelector(".product__quantity").innerText =
              //減少數量
              --cartItem.quantity;
          } else {
            // 使用 filter 方法過濾掉與指定產品 ID 相同的商品
            cartItem = cartItems.filter((newElements) => {
              // 只保留 購物車的沒被移除的物品
              newElements.id !== porduct.id;
            });
            // 物品移除購物車 (insertAdjacentHTML)
            indivdualItem.remove();
          }

          // 執行function calculateTotal>>計算總計 Total Amout
          calculateTotal();
          // 儲存本地瀏覽器購物車的紀錄
          saveToLocalStorage();
        }
      });
    });
}

// removeItem >>刪除項目 購物車內的 x btn功能
function removeItem(indivdualItem, porduct) {
  indivdualItem
    // insertAdjacentHTML 偵測到是被點擊購物車內的 + >>action='increase'
    .querySelector("[ action='remove']")
    .addEventListener("click", () => {
      // 觸發被點擊的購物車內物品 x btn  將被執行內部被選取的屬性
      cartItems = cartItems.filter((cartItem) => cartItem.id !== porduct.id);
      // 移除購物車點擊 x btn 的物品
      indivdualItem.remove();
      // 執行function calculateTotal>>計算總計 Total Amout
      calculateTotal();
      // 儲存本地瀏覽器購物車的紀錄
      saveToLocalStorage();
    });
}
// 尋找紀錄之前瀏覽器離開後的本地資料
function loadData() {
  if (cartItems.length > 0) {
    cartItems.forEach((porduct) => {
      // insertAdjacentHTML 新增的DOM
      addItemToTheDOM(porduct);

      // insertAdjacentHTML DOM 取得 div 物品/數量/價格
      const cartDOMItems = document.querySelectorAll(".cart__item");

      // 目前購物車的所有 DOM 取得 div 元素 內的物品 (insertAdjacentHTML)
      cartDOMItems.forEach((indivdualItem) => {
        // indivdualItem >>各別項目 取得新增的物品name id = 商品name id
        if (indivdualItem.querySelector("#porduct__id").value === porduct.id) {
          //  >>取得本地紀錄 增加的數量 + btn功能
          increaseItem(indivdualItem, porduct);
          //  取得本地紀錄 減少的數量 - btn功能
          decreaseItem(indivdualItem, porduct);
          //  取得本地紀錄 刪除的數量 x btn功能
          removeItem(indivdualItem, porduct);
        }
      });
    });
    // 執行function calculateTotal>>計算總計 Total Amout
    calculateTotal();
    // 儲存本地瀏覽器購物車的紀錄
    saveToLocalStorage();
  }
}

// Check Out btn 點擊清除
function clearCartItems() {
  localStorage.clear();
  cartItems = [];

  document.querySelectorAll(".cart__items").forEach((item) => {
    item.querySelectorAll(".cart__item").forEach((node) => {
      node.remove();
    });
  });
  // 執行function calculateTotal>>計算總計 Total Amout
  calculateTotal();
}
