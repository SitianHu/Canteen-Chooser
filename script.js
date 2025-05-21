const canteens = [
    { name: "学一", location: "山下", intro: "我是不起眼的老大哥，但我有家的味道！" },
    { name: "学二", location: "山下", intro: "我有最接地气的价格和风景～" },
    { name: "会议楼食堂", location: "山下", intro: "确定不来看看落地窗外小神仙湖的黑天鹅吗？" },
    { name: "逸夫食堂", location: "山下", intro: "排队吃面和饺子的人绕地球三圈（勾引）" },
    { name: "骊轩", location: "山下", intro: "渴望一顿商务精致餐吗？别犹豫了来吧！" },
    { name: "学勤麦麦", location: "山上", intro: "想念垃圾食品带来的快乐吗？13.9块穷鬼套餐谁不爱！" },
    { name: "思廷食堂", location: "山上", intro: "我在山上用牛肉粉蛋包饭煎饼果子诱惑你～" },
    { name: "香波食堂", location: "山上", intro: "我虽然在山上，但我是‘性价比战神’！" },
    { name: "东南西北风", location: "山上", intro: "不好意思我刚倒闭了！先等等新的供应商入驻吧" }
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
    modalText.textContent = `今天就吃「${canteen.name}」吧！\n${canteen.intro}`;
    modal.classList.remove("hidden");
  }
  
  function getRandomCanteen(filterFn) {
    const pool = canteens.filter(c => !tried.includes(c.name) && (!filterFn || filterFn(c)));
    if (pool.length === 0) return null;
    const rand = pool[Math.floor(Math.random() * pool.length)];
    return rand;
  }
  
  dice.addEventListener("click", () => {
    dice.classList.add("shake");
    setTimeout(() => dice.classList.remove("shake"), 600);
  
    const pick = getRandomCanteen();
    if (!pick) {
      modalText.textContent = "九大干饭圣地都转了一圈...\n要不，点个外卖吧？🍔";
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
      modalText.textContent = "都吃过啦～真的没得选了～";
    } else {
      last = pick;
      tried.push(pick.name);
      showModal(pick);
    }
  });
  
  skipBtn.addEventListener("click", () => {
    const pick = getRandomCanteen(c => c.location !== last.location);
    if (!pick) {
      modalText.textContent = "远的食堂也吃遍啦～考虑点外卖吧？🥡";
    } else {
      last = pick;
      tried.push(pick.name);
      showModal(pick);
    }
  });
  
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  