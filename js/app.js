const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0,
  yValue = 0;
let rotateDegree = 0;

//NOTES:
// speedx is the name of a custom data attribute, which could be defined in the HTML code like this: data-speedx="0.032"
// dataset is a property of the el variable that allows access to all the custom data attributes of the HTML element, prefixed with data-.
function reload(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;
    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `perspective(2300px) translateZ(${
      zValue * speedz
    }px ) rotateY(${rotateDegree * rotateSpeed}deg)
        translateX(calc(-50% + ${-xValue * speedx}px)) 
        translateY(calc(-50% + ${yValue * speedy}px )) 
        `;
  });
}
reload(0);
window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;
  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
  reload(e.clientX);
  console.log(rotateDegree);
});

//GSAP Animation
