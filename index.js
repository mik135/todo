const list = document.getElementById("list");
const input = document.querySelector(".inputToDo");
const darkToggle = document.querySelector(".darkToggle");
const body = document.querySelector("body");
const bg = document.querySelector(".bg_light");
const mobBg = document.querySelector(".mobile_light");
let taskCount = 0;

input.addEventListener("keypress", (e) => {
  if (e.key == "Enter" || e.keycode == 13) {
    if (input.value.trim() == "") {
      alert("Oops! Try adding a task");
    } else if (list.childElementCount == 5) {
      alert("Maximum tasks Reached! Finish what you've started");
    } else {
      const item = document.createElement("div");
      item.classList.add("inputDiv", "item");
      const it = document.createElement("div");
      it.classList.add("it");
      const radio = document.createElement("div");
      radio.classList.add("radioToDo");
      const check = document.createElement("img");
      check.src = "images/icon-check.svg";
      check.style.color = "transparent";
      radio.appendChild(check);
      const p = document.createElement("p");
      p.textContent = input.value;
      localStorage.setItem(`task ${taskCount++}`, input.value);
      it.appendChild(radio);
      it.appendChild(p);
      const img = document.createElement("img");
      img.src = "images/icon-cross.svg";
      img.classList.add("clear");
      item.appendChild(it);
      item.appendChild(img);
      list.appendChild(item);
      input.value = "";
      input.focus();
    }

    const clear = document.querySelectorAll(".clear");
    const count = document.querySelector(".count");

    count.textContent = list.childElementCount;

    clear.forEach((cl) => {
      cl.addEventListener("click", () => {
        list.removeChild(cl.parentNode);
         
        count.textContent -= 1;
      });
    });

    const mainStuff = document.querySelectorAll(".item");

    mainStuff.forEach((i) => {
      i.addEventListener("mouseover", () => {
        clear.forEach((cl) => {
          if (cl.parentNode == i) {
            cl.style.display = "block";
          }
        });
      });

      i.addEventListener("mouseout", () => {
        clear.forEach((cl) => {
          cl.style.display = "none";
        });
      });
    });

    const clearComplete = document.querySelector("#clear_complete");

    clearComplete.addEventListener("click", () => {
      //Todo Clear all completed tasks
    });
  }
  const radioToDo = document.querySelectorAll(".radioToDo");

  radioToDo.forEach((radio) => {
    radio.addEventListener("click", () => {
      radio.classList.toggle("radioCheck");
      const next = radio.nextElementSibling;
      next.classList.toggle("checked");
    });
  });
});

darkToggle.addEventListener("click", (e) => {
  body.classList.toggle("dark");
  // Change Background Image
  // TODO - Change the image of the toogle
  if (e.target.src.includes("images/icon-moon.svg")) {
    e.target.src = "images/icon-sun.svg";
  } else {
    e.target.src = "images/icon-moon.svg";
  }

  if(window.visualViewport.width > 500) {
    if (bg.src.includes("bg-desktop-light")) {
      bg.src = "images/bg-desktop-dark.jpg";
    } else {
      bg.src = "images/bg-desktop-light.jpg";
    }
  } else if (window.visualViewport.width <= 500) {
    console.log("below");
    if (mobBg.src.includes("bg-mobile-light")) {
      mobBg.src = "images/bg-mobile-dark.jpg";
    } else {
      mobBg.src = "images/bg-mobile-light.jpg";
    }
  }
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("radioToDo")) {
    e.target.addEventListener("click", () => {
      e.target.classList.toggle("radioCheck");
      const next = e.target.nextElementSibling;
      next.classList.toggle("checked");
    });
  }
});
