document.documentElement.classList.remove("no-js");

let mm = gsap.matchMedia();

const sidenavLink = document.querySelectorAll(".sidenav__link");
const linkScroll = document.querySelector("#linkScroll");
const sections = document.querySelectorAll(".js-nav");

let items = gsap.utils.toArray(".guide__content:not(.guide__content--reversed)");
let itemsReversed = gsap.utils.toArray(".guide__content--reversed");
let img = gsap.utils.toArray(".guide picture");

let i = 0;

//-------------------------------------------------------------
// window.addEventListener("scroll", function (evt) {
//   document.documentElement.style.setProperty("--scrollTop", `${this.scrollY}px`)
// });
//-------------------------------------------------------------

var burger = document.querySelector(".page-header__burger");
var nav = document.querySelector(".page-header__main-nav");

burger.addEventListener("click", function(evt) {
  evt.preventDefault();
  burger.classList.toggle("page-header__burger--open");
  nav.classList.toggle("main-nav--open");
});

//-------------------------------------------------------------

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);


ScrollTrigger.create({
  start: "top -80",
  end: 99999,
  toggleClass: { className: "page-header__nav-wrapper--scroll", targets: ".page-header__nav-wrapper" }
});


if (ScrollTrigger.isTouch !==1) {
mm.add("(min-width: 961px)", () => {

  ScrollSmoother.create({
    wrapper: ".wrapper",
    content: ".content",
    smooth: 1.5,
    effects: true
  });

//-------------------------------------------------------------
// Detect if a link's href goes to the current page


function getSamePageAnchor(link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false;
  }

  return link.hash;
}

// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false;
  if (elem) {
    if (e) e.preventDefault();
    gsap.to(window, { duration: 0.5, scrollTo: { y: elem, offsetY: 80 } });
  }
}

// If a link's href is within the current page, scroll to it instead
sidenavLink.forEach(a => {
  a.addEventListener("click", e => {
    scrollToHash(getSamePageAnchor(a), e);
  });
});


linkScroll.addEventListener("click", e => {
  scrollToHash(getSamePageAnchor(linkScroll), e);
});

// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);

//-------------------------------------------------------------
sections.forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: () => `+=${section.clientHeight + 200}`,
    toggleActions: "play reverse none reverse",
    toggleClass: { targets: sidenavLink[i], className: "sidenav__link--current" },
    // markers: true
  });
  i++;
});
//-------------------------------------------------------------

items.forEach((item) => {
  gsap.fromTo(item, { x: -300, opacity: 0 }, {
    x: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "center center",
      scrub: true,
      // markers: true
    }
  });
});


itemsReversed.forEach((item) => {
  gsap.fromTo(item, { x: 300, opacity: 0 }, {
    x: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "center center",
      scrub: true,
      // markers: true
    }
  });
});


img.forEach((item) => {
  gsap.fromTo(item, { opacity: 0 }, {
    opacity: 1,
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "center center",
      scrub: true,
      // markers: true
    }
  });
});
//-------------------------------------------------------------
});
}
