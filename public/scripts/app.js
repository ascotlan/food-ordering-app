// Client facing scripts here

/***********************************************************/
//Set copyright year

const yearEl = document.querySelector(".year");
yearEl.textContent = new Date().getFullYear();

/***********************************************************/
//Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //In the viewport
    root: null,
    threshold: 0, //0 means out of the viewport, 1 means fully in the viewport
    rootMargin: "-80px", //exact height of sticky header used as offset margin
  }
);
obs.observe(sectionHeroEl);


