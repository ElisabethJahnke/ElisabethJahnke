document.addEventListener("DOMContentLoaded", function() {   
    var lazyloadImages;
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");

      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var picture = entry.target;
            var path = picture.dataset.src;

            //data-src --> src  #################################################################################################################
            
            picture.classList.remove("lazy");
            imageObserver.unobserve(picture);
          }
        });
      });
  
      lazyloadImages.forEach(function(picture) {
        imageObserver.observe(picture);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(picture) {
              if(picture.offsetTop < (window.innerHeight + scrollTop)) {
                var path = picture.dataset.src;

                //data-src --> src  #################################################################################################################

                picture.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  })
