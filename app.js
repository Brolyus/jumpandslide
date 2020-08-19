document.addEventListener("DOMContentLoaded", () => {
  const prince = document.querySelector(".character");
  let bottom = 0;
  let gravity = 0.9;
  let isJumping = false;
  let isGoingLeft = false;
  let isGoingRight = false;
  let left = 0;
  let leftTimerId;
  let rightTimerId;

  function jump() {
    if (isJumping) return;
    changeCharacterPosition(true)
    let timerUpId = setInterval(function () {
      if (bottom > 250) {
        clearInterval(timerUpId);
        let timerDownId = setInterval(function () {
          if (bottom <= 0) {
            changeCharacterPosition(true)
            clearInterval(timerDownId);
            isJumping = false;            
          }
          bottom -= 5;
          prince.style.bottom = bottom + "px";
        }, 20);
      }
      isJumping = true;
      bottom += 30;
      bottom = bottom * gravity;
      prince.style.bottom = bottom + "px";
    }, 20);
  }

  function slideLeft() {
    if (isJumping) {
      changeCharacterPosition(false)
    }
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    if (isGoingLeft) return;
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      left -= 5;
      prince.style.left = left + "px";
    }, 20);
  }
  function slideRight() {
    if (isJumping) {
      changeCharacterPosition(false)
    }
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    if (isGoingRight) return;
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      left += 5;
      prince.style.left = left + "px";
    }, 20);
  }

  function stop() {
    changeCharacterPosition(true)
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    isGoingLeft = false;
    isGoingRight = false;
  }

  function changeCharacterPosition(isVertical) {
      if(isVertical){
        prince.classList.remove("character-slide");
        prince.classList.add("character");
      } else {
        prince.classList.add("character-slide");
        prince.classList.remove("character");
      }
  }

  // assign functions to keycodes
  function control(e) {
    if (e.keyCode === 38) {
      // if we press up
      jump();
    } else if (e.keyCode === 37) {
      // if we press left
      slideLeft();
    } else if (e.keyCode === 39) {
      slideRight();
    } else if (e.keyCode === 40) {
      stop();
    }
  }
  document.addEventListener("keydown", control);
});
