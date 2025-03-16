(function () {
  "use strict";

  // ======= Sticky Header
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    const sticky = ud_header.offsetTop;
    const logo = document.querySelector(".navbar-brand img");

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    // === logo change
    if (ud_header.classList.contains("sticky") && logo) {
      logo.src = "assets/images/logo/logo-2.svg";
    } else if (logo) {
      logo.src = "assets/images/logo/logo.svg";
    }

    // Show or hide the back-to-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  // Offcanvas Menu Toggle
  const navbarToggler = document.querySelector(".navbar-toggler");
  
  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      navbarToggler.classList.toggle("active");
    });
  }

  // Handle offcanvas close event
  const offcanvas = document.querySelector('.offcanvas');
  if (offcanvas) {
    offcanvas.addEventListener('hidden.bs.offcanvas', function () {
      if (navbarToggler) {
        navbarToggler.classList.remove("active");
      }
      document.body.classList.remove('offcanvas-open');
    });

    // Fix for offcanvas visibility when header is sticky
    document.addEventListener('shown.bs.offcanvas', function () {
      const header = document.querySelector('.ud-header');
      if (header && header.classList.contains('sticky')) {
        offcanvas.style.top = header.offsetHeight + 'px';
      }
      document.body.classList.add('offcanvas-open');
    });
  }

  // Close offcanvas when clicking on menu items
  document.querySelectorAll(".offcanvas-body .nav-item a").forEach((item) => {
    item.addEventListener("click", () => {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    });
  });

  // ===== submenu
  const submenuButton = document.querySelectorAll(".nav-item-has-children");
  submenuButton.forEach((elem) => {
    elem.querySelector("a").addEventListener("click", () => {
      elem.querySelector(".ud-submenu").classList.toggle("show");
    });
  });

  // ===== wow js
  if (typeof WOW === "function") {
    new WOW().init();
  }

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      scrollTo(document.documentElement);
    });
  }

  // Initialize Bootstrap components
  document.addEventListener('DOMContentLoaded', function () {
    // Function to clean up duplicate offcanvas elements
    function cleanupOffcanvas() {
      // Ensure only one offcanvas header exists
      const offcanvasHeaders = document.querySelectorAll('.offcanvas-header');
      if (offcanvasHeaders.length > 1) {
        // Keep only the one with single-header class
        offcanvasHeaders.forEach(header => {
          if (!header.classList.contains('single-header')) {
            header.remove();
          }
        });
      }
      
      // Ensure only one close button exists
      const closeButtons = document.querySelectorAll('.offcanvas .btn-close');
      if (closeButtons.length > 1) {
        for (let i = 1; i < closeButtons.length; i++) {
          closeButtons[i].remove();
        }
      }
    }
    
    // Clean up any duplicate elements
    cleanupOffcanvas();
    
    // Initialize all offcanvas elements only once
    const offcanvasElements = document.querySelectorAll('.offcanvas');
    offcanvasElements.forEach(function(offcanvasEl) {
      // Only initialize if not already initialized
      if (!offcanvasEl.classList.contains('initialized')) {
        new bootstrap.Offcanvas(offcanvasEl);
        offcanvasEl.classList.add('initialized');
      }
    });
    
    // Add event listener to clean up after offcanvas is shown
    document.addEventListener('shown.bs.offcanvas', function() {
      cleanupOffcanvas();
    });
  });
})();
