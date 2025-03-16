// Fix for offcanvas menu when navbar is sticky
document.addEventListener('DOMContentLoaded', function() {
  // Get the offcanvas element
  const offcanvasNavbar = document.getElementById('offcanvasNavbar');
  const navbarToggler = document.querySelector('.navbar-toggler');
  
  // Add event listener for when offcanvas is shown
  if (offcanvasNavbar) {
    offcanvasNavbar.addEventListener('show.bs.offcanvas', function () {
      document.body.classList.add('offcanvas-open');
      
      // Force the offcanvas to be at the top of the viewport
      offcanvasNavbar.style.top = '0';
      offcanvasNavbar.style.height = '100vh';
      offcanvasNavbar.style.position = 'fixed';
      
      // Ensure the close button is visible
      const closeBtn = offcanvasNavbar.querySelector('.custom-close-btn');
      if (closeBtn) {
        closeBtn.style.display = 'flex';
      }
    });
    
    // Add event listener for when offcanvas is hidden
    offcanvasNavbar.addEventListener('hide.bs.offcanvas', function () {
      document.body.classList.remove('offcanvas-open');
    });
    
    // Toggle active class on navbar toggler
    navbarToggler.addEventListener('click', function() {
      this.classList.toggle('active');
    });
    
    // Add click event to custom close button
    const customCloseBtn = offcanvasNavbar.querySelector('.custom-close-btn');
    if (customCloseBtn) {
      customCloseBtn.addEventListener('click', function() {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasNavbar);
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      });
    }
  }
  
  // Fix for offcanvas position when navbar is sticky
  const header = document.querySelector('.ud-header');
  if (header) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          const isSticky = header.classList.contains('sticky');
          if (isSticky && offcanvasNavbar) {
            offcanvasNavbar.style.top = '0';
            offcanvasNavbar.style.height = '100vh';
            offcanvasNavbar.style.position = 'fixed';
            
            // Ensure the close button is visible
            const closeBtn = offcanvasNavbar.querySelector('.custom-close-btn');
            if (closeBtn) {
              closeBtn.style.display = 'flex';
            }
          }
        }
      });
    });
    
    observer.observe(header, { attributes: true });
  }
  
  // Fix for Bootstrap's offcanvas backdrop
  const fixBackdrop = function() {
    const backdrop = document.querySelector('.offcanvas-backdrop');
    if (backdrop) {
      backdrop.style.position = 'fixed';
      backdrop.style.top = '0';
      backdrop.style.left = '0';
      backdrop.style.width = '100vw';
      backdrop.style.height = '100vh';
      backdrop.style.zIndex = '9998';
    }
  };
  
  // Watch for backdrop creation
  const bodyObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.classList && node.classList.contains('offcanvas-backdrop')) {
            fixBackdrop();
          }
        }
      }
    });
  });
  
  bodyObserver.observe(document.body, { childList: true });
}); 