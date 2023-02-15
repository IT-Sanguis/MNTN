window.addEventListener("scroll", function(evt) {
  document.documentElement.style.setProperty('--scrollTop', `${this.scrollY}px`)
});
