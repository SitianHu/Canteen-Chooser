const canteens = [
  {
    name: "学一",
    location: "山下",
    intro: "我是不起眼的老大哥，但我有家的味道！",
    openTime: "06:30 - 20:00",
    stalls: ["麻辣烫", "面点", "米饭套餐", "水果摊"]
  },
  {
    name: "学二",
    location: "山下",
    intro: "我有最接地气的价格和风景～",
    openTime: "07:00 - 20:30",
    stalls: ["川菜窗口", "炸鸡汉堡", "小炒窗口", "盖饭区"]
  },
  {
    name: "会议楼食堂",
    location: "山下",
    intro: "确定不来看看落地窗外小神仙湖的黑天鹅吗？",
    openTime: "08:00 - 19:30",
    stalls: ["面条", "汤粉", "家常菜", "水吧"]
  },
  {
    name: "逸夫食堂",
    location: "山下",
    intro: "排队吃面和饺子的人绕地球三圈（勾引）",
    openTime: "06:45 - 20:00",
    stalls: ["水饺", "刀削面", "卷饼", "饮料区"]
  },
  {
    name: "骊轩",
    location: "山下",
    intro: "渴望一顿商务精致餐吗？别犹豫了来吧！",
    openTime: "10:30 - 19:00",
    stalls: ["西餐", "精致中餐", "寿司", "甜品"]
  },
  {
    name: "学勤麦麦",
    location: "山上",
    intro: "想念垃圾食品带来的快乐吗？13.9块穷鬼套餐谁不爱！",
    openTime: "10:00 - 21:00",
    stalls: ["麦当劳", "炸鸡", "薯条", "奶茶"]
  },
  {
    name: "思廷食堂",
    location: "山上",
    intro: "我在山上用牛肉粉蛋包饭煎饼果子诱惑你～",
    openTime: "07:30 - 20:30",
    stalls: ["牛肉粉", "蛋包饭", "煎饼果子", "简餐"]
  },
  {
    name: "香波食堂",
    location: "山上",
    intro: "我虽然在山上，但我是‘性价比战神’！",
    openTime: "07:00 - 19:30",
    stalls: ["米饭区", "面条", "铁板烧", "水果摊"]
  },
  {
    name: "东南西北风",
    location: "山上",
    intro: "不好意思我刚倒闭了！先等等新的供应商入驻吧",
    openTime: "暂停营业中",
    stalls: ["暂无档口"]
  }
];

const container = document.querySelector(".container");
const loadingScreen = document.getElementById("loading-screen");
const loadingText = document.getElementById("loading-text");
const grid = document.querySelector(".canteen-grid");
const dice = document.getElementById("dice");

const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const acceptBtn = document.getElementById("accept");
const repeatBtn = document.getElementById("repeat");
const skipBtn = document.getElementById("skip");
const closeModal = document.getElementById("close-modal");

canteens.forEach(c => {
  const box = document.createElement("div");
  box.className = "canteen-box";
  box.textContent = c.name;

  box.addEventListener("click", () => {
    modalText.innerHTML = `
      <strong>${c.name}</strong><br>
      📍 位置：${c.location}<br>
      🕐 营业时间：${c.openTime}<br>
      🍽️ 档口：${c.stalls.join("，")}<br><br>
      🌟 ${c.intro}
    `;
    modal.classList.remove("hidden");
  });

  grid.appendChild(box);
});

function typeWriter(text, i = 0) {
  if (i < text.length) {
    loadingText.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 50);
  } else {
    setTimeout(() => {
      loadingScreen.style.display = "none";
      container.classList.remove("hidden");
    }, 500);
  }
}

window.onload = () => {
  typeWriter("干饭星人您好，今天的任务是——在众多食堂中选出真命天饭！🍚");
};

let tried = [];
let last = null;

function showModal(canteen) {
  modalText.innerHTML = `
    <strong>今天就吃「${canteen.name}」吧！</strong><br>
    📍 位置：${canteen.location}<br>
    🕐 营业时间：${canteen.openTime}<br>
    🍽️ 档口：${canteen.stalls.join("，")}<br><br>
    🌟 ${canteen.intro}
  `;
  modal.classList.remove("hidden");
}

function getRandomCanteen(filterFn) {
  const pool = canteens.filter(c => !tried.includes(c.name) && (!filterFn || filterFn(c)));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

dice.addEventListener("click", () => {
  dice.classList.add("shake");
  setTimeout(() => dice.classList.remove("shake"), 600);

  const pick = getRandomCanteen();
  if (!pick) {
    modalText.innerHTML = "九大干饭圣地都转了一圈...<br>要不，点个外卖吧？🍔";
    modal.classList.remove("hidden");
    return;
  }
  last = pick;
  tried.push(pick.name);
  showModal(pick);
});

acceptBtn.addEventListener("click", () => {
  alert(`你选择了 ${last.name}，干饭不迟疑！🚀`);
  modal.classList.add("hidden");
  tried = [];
});

repeatBtn.addEventListener("click", () => {
  const pick = getRandomCanteen(c => c.name !== last.name);
  if (!pick) {
    modalText.innerHTML = "都吃过啦～真的没得选了～";
  } else {
    last = pick;
    tried.push(pick.name);
    showModal(pick);
  }
});

skipBtn.addEventListener("click", () => {
  const pick = getRandomCanteen(c => c.location !== last.location);
  if (!pick) {
    modalText.innerHTML = "远的食堂也吃遍啦～考虑点外卖吧？🥡";
  } else {
    last = pick;
    tried.push(pick.name);
    showModal(pick);
  }
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
