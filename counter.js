const counterList = document.getElementById("counterList");
const inputNum = document.getElementById("inputNum");
const resetButton = document.getElementById("resetButton");
let flag = false;
let counterNum = 1;
let myTimer = [];
let resetTimer;

function addCounter(e) {
  if (e.keyCode == "13" && inputNum.value < 61 && inputNum.value > 0) {
    let cnt = document.createElement("li");
    let start = Date.now();
    let timerName, end, now, temp;

    cnt.innerText = "Timer " + counterNum + " : " + inputNum.value;
    counterList.appendChild(cnt);
    inputNum.value = "";
    timerName = "Timer " + counterNum + " : ";
    counterNum++;

    myTimer.push(
      setInterval(() => {
        end = Date.now();
        now = Math.floor((end - start) / 1000);

        if (
          cnt.innerText.substring(cnt.innerText.indexOf(":") + 2) === "0" &&
          now > 0
        ) {
          cnt.remove();
        } else {
          if (now > 0) {
            temp =
              parseInt(
                cnt.innerText.substring(cnt.innerText.indexOf(":") + 2)
              ) - now;
            cnt.innerText = timerName + temp;
            start = Date.now();
          }
        }
      }, 100)
    );
  }
}

function resetAllCounter() {
  let lis = document.getElementById("counterList").getElementsByTagName("li");
  let prev = Date.now();
  let aft, resetTime;

  for (let i = 0; i < myTimer.length; i++) {
    clearInterval(myTimer[i]);
  }

  myTimer = [];

  for (let i = 0; i < lis.length; i++) {
    lis[i].innerText =
      lis[i].innerText.substring(0, lis[i].innerText.indexOf(":") + 2) + "0";
  }

  resetTimer = setInterval(() => {
    aft = Date.now();
    resetTime = Math.floor((aft - prev) / 1000);
    if (resetTime > 0) {
      counterList.innerHTML = "";
      resetFunc();
    }
  }, 100);
}

function resetFunc() {
  clearInterval(resetTimer);
}

inputNum.addEventListener("keydown", addCounter);
resetButton.addEventListener("click", resetAllCounter);
