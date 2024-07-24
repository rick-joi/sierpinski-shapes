import { useEffect } from "react";

//todo: figure out why horizontal overscroll is fixed even though this isn't being used any more (because it stopped all scrolling)
export default function usePreventOverscroll() {
  //
  useEffect(() => {
    preventOverScroll();
  }, []);
}

//todo: clean this function up
function preventOverScroll() {
  //
  let touch_x: number,
    touch_y: number,
    obj_x: EventTarget | Element | null, //todo: fix this type mess and all the as's (getComputedStyle doesn't work)
    obj_y: EventTarget | Element | null, //todo: fix this type mess and all the as's
    speed_x = 0,
    speed_y = 0,
    scrollanim: NodeJS.Timeout;

  document.addEventListener(
    "touchstart",
    function (e) {
      clearInterval(scrollanim);
      // Get Touch target
      obj_x = e.target;
      obj_y = e.target;
      // Get the target parent that is scrollable
      while (
        (window.getComputedStyle(obj_x as Element).overflowX != "auto" &&
          window.getComputedStyle(obj_x as Element).overflowX != "scroll") ||
        (obj_x as Element).parentNode == null
      ) {
        obj_x = (obj_x as Element).parentNode;
      }
      while (
        (window.getComputedStyle(obj_y as Element).overflowY != "auto" &&
          window.getComputedStyle(obj_y as Element).overflowY != "auto") ||
        (obj_y as Element).parentNode == null
      ) {
        obj_y = (obj_y as Element).parentNode;
      }
      // Get if no scrollable parents are present set null
      if ((obj_x as Element).parentNode == null) obj_x = null;
      if ((obj_y as Element).parentNode == null) obj_y = null;

      // Get the touch starting point
      const touch = e.touches[0];
      touch_x = touch.pageX;
      touch_y = touch.pageY;
    },
    { capture: false, passive: false }
  );

  document.addEventListener(
    "touchmove",
    function (e) {
      // Clear animation
      clearInterval(scrollanim);

      // Scroll according to movement
      const touch = e.touches[0];
      const xScrollDistance = (obj_x as Element).scrollLeft - (touch.pageX - touch_x);
      const yScrollDistance = (obj_y as Element).scrollTop - (touch.pageY - touch_y);

      // Prevent window scrolling
      if (xScrollDistance > yScrollDistance) {
        e.preventDefault();
      }

      (obj_x as Element).scrollLeft = xScrollDistance;
      (obj_y as Element).scrollTop = yScrollDistance;

      // Set speed speed
      speed_x = touch.pageX - touch_x;
      speed_y = touch.pageY - touch_y;

      // Set new positon
      touch_x = touch.pageX;
      touch_y = touch.pageY;
    },
    { capture: false, passive: false }
  );

  // Add a final animation as in iOS
  document.addEventListener(
    "touchend",
    function () {
      clearInterval(scrollanim);

      // Animate
      scrollanim = setInterval(function () {
        (obj_x as Element).scrollLeft = (obj_x as Element).scrollLeft - speed_x;
        (obj_y as Element).scrollTop = (obj_y as Element).scrollTop - speed_y;
        // Decelerate
        speed_x = speed_x * 0.9;
        speed_y = speed_y * 0.9;

        // Stop animation at the end
        if (speed_x < 1 && speed_x > -1 && speed_y < 1 && speed_y > -1) clearInterval(scrollanim);
      }, 15);
    },
    { capture: false, passive: false }
  );
}
