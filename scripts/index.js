let timer = document.querySelector("p");
let timerContain = document.querySelector(".counter");
let progress = document.querySelector(".prog");
let inputs = document.querySelectorAll("input");
var audio = new Audio("alarm.mp3");
let counter = false;
let seconds = 0;
let totSeconds = 0;
inputs.forEach((e) => {
  e.addEventListener("change", () => {
    if (e.value < 0) {
      e.value = "0";
    }
    if (!counter) {
      timer.innerHTML = secondsToHMS(
        +inputs[2].value + +inputs[1].value * 60 + +inputs[0].value * 60 * 60
      );
    }
  });
  e.addEventListener("wheel", (event) => {
    const delta = Math.sign(event.deltaY);
    if (+e.value - delta != -1) {
      e.value = +e.value - delta;
      if (!counter) {
        timer.innerHTML = secondsToHMS(
          +inputs[2].value + +inputs[1].value * 60 + +inputs[0].value * 60 * 60
        );
      }
    }
  });
});

function secondsToHMS(seconds) {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = (seconds % 3600) % 60;

  let formattedHrs = hrs.toString().padStart(2, "0");
  let formattedMins = mins.toString().padStart(2, "0");
  let formattedSecs = secs.toString().padStart(2, "0");

  return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
}
let timeEnd = () => {
  clearInterval(counter);
  counter = false;
  audio.play();
  timerContain.style.animationName = "grow";
  timer.style.color = "#fff700";
};
document.querySelectorAll("button")[0].onclick = () => {
  seconds =
    +inputs[2].value + +inputs[1].value * 60 + +inputs[0].value * 60 * 60;
  totSeconds = seconds;
  if (seconds === 0) {
    return;
  }
  counter = setInterval(function () {
    timer.innerHTML = secondsToHMS(seconds);
    progress.style.height = `${(seconds / totSeconds) * 100}%`;
    seconds--;
    if (seconds === -1) {
      timeEnd();
    }
  }, 1000);
  inputs.forEach((ele) => {
    ele.value = "00";
  });
};
document.querySelectorAll("button")[1].onclick = (eve) => {
  if (seconds <= 0) return;
  if (eve.target.innerHTML === "Pause") {
    clearInterval(counter);
    document.querySelectorAll("button")[1].innerHTML = "Continue";
    document.querySelectorAll("button")[1].style.color = "#68ffcd";
  } else {
    document.querySelectorAll("button")[1].innerHTML = "Pause";
    document.querySelectorAll("button")[1].style.color = "#fff";
    counter = setInterval(function () {
      timer.innerHTML = secondsToHMS(seconds);
      seconds--;
      if (seconds === -1) {
        timeEnd();
      }
    }, 1000);
  }
};
document.querySelectorAll("button")[2].onclick = () => {
  clearInterval(counter);
  inputs.forEach((ele) => {
    ele.value = "00";
  });
  timer.innerHTML = "00:00:00";
  audio.pause();
  progress.style.height = "100%";
  timerContain.style.removeProperty("animation-name");
  timer.style.color = "#fff";
};
