/**

* Template Name: Dewi - v4.7.0

* Template URL: https://bootstrapmade.com/dewi-free-multi-purpose-html-template/

* Author: BootstrapMade.com

* License: https://bootstrapmade.com/license/

*/

function predictNextEvent(bumpMonth = false) {
    const weekday = 6, // Saturday.
          nth = 3, // Third Saturday of the month - Repair Cafe.
          date = new Date(); // Current date in user browser.

    let count = 0, // Iteration counter.
        idate = new Date(date.getFullYear(), date.getMonth(), 1); // End result Date.

    if (bumpMonth)
      idate.setMonth(idate.getMonth() + 1);

    while (true) {
      if (idate.getDay() === weekday)
        if (++count === nth)
          break;

      idate.setDate(idate.getDate() + 1);
    }

    idate.setHours(10, 0, 0, 0); // Set the time to 10am.

    return idate;
};

function dateOrdinal(n) {
    var s = ["th", "st", "nd", "rd"];
    var v = n%100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
}

function countdownTo() {
  const countDownDate = predictNextEvent();

  let countdownInterval;

  const updatePage = () => {
    const now = new Date().getTime();
    let distance = countDownDate - now;
        nextEvt = undefined;

    /*
    if ((now.getDate() === countDownDate.getDate()) && (now.getHours() < 14) && (now.getHours() >= 10)) {

    document.querySelectorAll(".nextEventDate").forEach((e, _i) => {
      e.innerHTML = "our next session is now! Pop along!";
     return;
    })

    document.querySelectorAll(".nextEventScroller").forEach((e, _i) => {
      e.innerHTML = "our next session is now! Pop along!";
      return;
    })
    }; */

    if (Math.sign(distance) === -1) {
      nextEvt = predictNextEvent(true);
      distance = predictNextEvent(true) - now;
    } else {
      nextEvt = predictNextEvent();
      distance = predictNextEvent() - now;
    };

    const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7)),
          days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)),
          hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let countdownString = "";

    if (weeks > 0)
      countdownString += `${weeks} week${weeks > 1 ? 's' : ''}, `;

    if (days > 0)
      countdownString += `${days} day${days > 1 ? 's' : ''}, `;

    countdownString += `${hours} hour${hours > 1 ? 's' : ''}`;

    const monthLong = nextEvt.toLocaleString(undefined, { month: "long" });

    document.querySelectorAll(".nextEventDate").forEach((e, _i) => {
      if (nextEvt.getMonth() == 11 && now.getHours() >= 13) {
        e.innerHTML = "We have finished our sessions for 2024. please check back next year (2025)."
        return;
      }

      e.innerHTML = "Our next session is on " + dateOrdinal(nextEvt.getDate()) +  " " + monthLong + ", from 10am to 1pm (in " + countdownString + ")." ;
    })

    document.querySelectorAll(".nextEventScroller").forEach((e, _i) => {
      if (nextEvt.getMonth() == 11 && now.getHours() >= 13) {
        e.innerHTML = "We have finished our sessions for 2024. please check back next year (2025)."
        return;
      }

      e.innerHTML = "Our next session is on " + dateOrdinal(nextEvt.getDate()) +  " " + monthLong + ", from 10am to 1pm.";
    })
  };

  updatePage();
  countdownInterval = setInterval(updatePage, 1000);
}

(function() {

  "use strict";



  /**

   * Easy selector helper function

   */

  const select = (el, all = false) => {

    el = el.trim()

    if (all) {

      return [...document.querySelectorAll(el)]

    } else {

      return document.querySelector(el)

    }

  }



  /**

   * Easy event listener function

   */

  const on = (type, el, listener, all = false) => {

    let selectEl = select(el, all)

    if (selectEl) {

      if (all) {

        selectEl.forEach(e => e.addEventListener(type, listener))

      } else {

        selectEl.addEventListener(type, listener)

      }

    }

  }



  /**

   * Easy on scroll event listener 

   */

  const onscroll = (el, listener) => {

    el.addEventListener('scroll', listener)

  }



  /**

   * Navbar links active state on scroll

   */

  let navbarlinks = select('#navbar .scrollto', true)

  const navbarlinksActive = () => {

    let position = window.scrollY + 200

    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return

      let section = select(navbarlink.hash)

      if (!section) return

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {

        navbarlink.classList.add('active')

      } else {

        navbarlink.classList.remove('active')

      }

    })

  }

  window.addEventListener('load', navbarlinksActive)

  onscroll(document, navbarlinksActive)



  /**

   * Scrolls to an element with header offset

   */

  const scrollto = (el) => {

    let header = select('#header')

    let offset = header.offsetHeight



    if (!header.classList.contains('header-scrolled')) {

      offset -= 20

    }



    let elementPos = select(el).offsetTop

    window.scrollTo({

      top: elementPos - offset,

      behavior: 'smooth'

    })

  }



  /**

   * Toggle .header-scrolled class to #header when page is scrolled

   */

  let selectHeader = select('#header')

  if (selectHeader) {

    const headerScrolled = () => {

      if (window.scrollY > 100) {

        selectHeader.classList.add('header-scrolled')

      } else {

        selectHeader.classList.remove('header-scrolled')

      }

    }

    window.addEventListener('load', headerScrolled)

    onscroll(document, headerScrolled)

  }



  /**

   * Back to top button

   */

  let backtotop = select('.back-to-top')

  if (backtotop) {

    const toggleBacktotop = () => {

      if (window.scrollY > 100) {

        backtotop.classList.add('active')

      } else {

        backtotop.classList.remove('active')

      }

    }

    window.addEventListener('load', toggleBacktotop)

    onscroll(document, toggleBacktotop)

  }



  /**

   * Mobile nav toggle

   */

  on('click', '.mobile-nav-toggle', function(e) {

    select('#navbar').classList.toggle('navbar-mobile')

    this.classList.toggle('bi-list')

    this.classList.toggle('bi-x')

  })



  /**

   * Mobile nav dropdowns activate

   */

  on('click', '.navbar .dropdown > a', function(e) {

    if (select('#navbar').classList.contains('navbar-mobile')) {

      e.preventDefault()

      this.nextElementSibling.classList.toggle('dropdown-active')

    }

  }, true)



  /**

   * Scrool with ofset on links with a class name .scrollto

   */

  on('click', '.scrollto', function(e) {

    if (select(this.hash)) {

      e.preventDefault()



      let navbar = select('#navbar')

      if (navbar.classList.contains('navbar-mobile')) {

        navbar.classList.remove('navbar-mobile')

        let navbarToggle = select('.mobile-nav-toggle')

        navbarToggle.classList.toggle('bi-list')

        navbarToggle.classList.toggle('bi-x')

      }

      scrollto(this.hash)

    }

  }, true)



  /**

   * Scroll with ofset on page load with hash links in the url

   */

  window.addEventListener('load', () => {

    if (window.location.hash) {

      if (select(window.location.hash)) {

        scrollto(window.location.hash)

      }

    }

  });



  /**

   * Preloader

   */

  let preloader = select('#preloader');

  if (preloader) {

    window.addEventListener('load', () => {

      preloader.remove()

    });

  }



  /**

   * Initiate glightbox 

   */

  const glightbox = GLightbox({

    selector: '.glightbox'

  });



  /**

   * Testimonials slider

   */

  new Swiper('.testimonials-slider', {

    speed: 600,

    loop: true,

    autoplay: {

      delay: 5000,

      disableOnInteraction: false

    },

    slidesPerView: 'auto',

    pagination: {

      el: '.swiper-pagination',

      type: 'bullets',

      clickable: true

    }

  });



  function getCurrentScroll() {

    return window.pageYOffset || document.documentElement.scrollTop;

  }



  /**

   * Porfolio isotope and filter

   */

  window.addEventListener('load', () => {



    let portfolioContainer = select('.portfolio-container');



    if (portfolioContainer) {

      let portfolioIsotope = new Isotope(portfolioContainer, {

        itemSelector: '.portfolio-item'

      });



      let portfolioFilters = select('#portfolio-flters li', true);



      on('click', '#portfolio-flters li', function(e) {

        e.preventDefault();

        portfolioFilters.forEach(function(el) {

          el.classList.remove('filter-active');

        });

        this.classList.add('filter-active');



        portfolioIsotope.arrange({

          filter: this.getAttribute('data-filter')

        });

        portfolioIsotope.on('arrangeComplete', function() {

          AOS.refresh()

        });



      }, true);

    }



  });



  /**

   * Initiate portfolio lightbox 

   */

  const portfolioLightbox = GLightbox({

    selector: '.portfolio-lightbox'

  });



  /**

   * Portfolio details slider

   */

  new Swiper('.portfolio-details-slider', {

    speed: 400,

    loop: true,

    autoplay: {

      delay: 5000,

      disableOnInteraction: false

    },

    pagination: {

      el: '.swiper-pagination',

      type: 'bullets',

      clickable: true

    }

  });



  /**

   * Animation on scroll

   */

  window.addEventListener('load', () => {

    AOS.init({

      duration: 1000,

      easing: "ease-in-out",

      once: true,

      mirror: false

    });

  });



})()
