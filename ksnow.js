
/*-------------Hamburger Menu-------------*/

function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("active");
}
document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("nav-menu").classList.remove("active");
    });
});
// Close menu when a link is clicked (mobile only)
document.querySelectorAll('#nav-me a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById("nav-me").classList.remove("active");
  });
});



/*----------snow effect---------------*/
const snowfallContainer = document.querySelector('.snowfall');
const snowflakeCount = 100;

for (let i = 0; i < snowflakeCount; i++) {
    const flake = document.createElement('div');
    flake.classList.add('snowflake');

    flake.style.left = `${Math.random() * 100}vw`;
    flake.style.animationDelay = `${Math.random() * 5}s`;
    const size = Math.random() * 5 + 3;
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;

    snowfallContainer.appendChild(flake);
}
/*--------------------home texting----------------*/
var typed = new Typed("#typed-text", {
strings: ["Machine Learning Enthusiast","Machine Learning Researcher","AI Explorer", "Data Science Learner"],
typeSpeed: 50,
backSpeed: 30,
backDelay: 1500,
loop: true
});
/*----------certificate galleryt--------------
const scrollContainer = document.getElementById("imageScroller");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

nextBtn.addEventListener("click", () => {
    scrollContainer.scrollLeft += 300;
});

backBtn.addEventListener("click", () => {
    scrollContainer.scrollLeft -= 300;
});*/
/*------------about me------------*/

var tablinks=document.getElementsByClassName('tab-links');
var tabcontents=document.getElementsByClassName('tab-contents');
function opentab(tab,ids){
    for(i of tablinks){
        i.classList.remove('active-link');
    }
    for(j of tabcontents){
        j.classList.remove('active-tab')
    }
    document.getElementById(ids).classList.add('active-link');
    document.getElementById(tab).classList.add('active-tab');
}


/*-----------projects section--------------*/

let projIndex = 0;
const slider = document.getElementById("projectScroller");

function slideProjects(dir) {
    const card = slider.querySelector(".project-slide");
    if (!card) return; // guard

    const cardWidth = card.offsetWidth + 20; // includes margin
    const totalCards = slider.children.length;

    const visible = window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 2 : 3;
    const maxSlide = totalCards - visible;

    projIndex += dir;
    if (projIndex < 0) projIndex = 0;
    if (projIndex > maxSlide) projIndex = maxSlide;

    slider.style.transform = `translateX(-${projIndex * cardWidth}px)`;
}

const scroll = document.getElementById("projectScroller");
const PbackBtn = document.getElementById("PbackBtn");
const PnextBtn = document.getElementById("PnextBtn");

scroll.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scroll.scrollLeft += evt.deltaY;
});

PnextBtn.addEventListener("click", () => {
    scroll.scrollLeft += 300;
});

PbackBtn.addEventListener("click", () => {
    scroll.scrollLeft -= 300;
});

/*----------contact form------------*/


// JavaScript
const scriptURL = 'https://script.google.com/macros/s/AKfycbwOMzCwUUUdVUNBwhTDTDQCgS3Cr1vbThqrYaLB8UXOfnsCStGcj5NzVqtTvn7U786o/exec';
const form = document.forms['submit-to-google-sheet'];
const btn = document.getElementById("submit-btn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  btn.classList.add("loading");

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      console.log('Success!', response);
      btn.classList.remove("loading");
      btn.classList.add("success");

      // Reset form
      form.reset();

      // Reset button
      setTimeout(() => {
        btn.classList.remove("success");
      }, 2000);
    })
    .catch(error => {
      console.error('Error!', error.message);
      btn.classList.remove("loading");
      alert("Submission failed. Please try again.");
    });
});



