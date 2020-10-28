function createGridItemDOM(lazy) {
  if(lazy.nodeName.toLowerCase() == "video") {
    //lazy.setAttribute("poster", lazy.dataset.poster);
    lazy.classList.add("loaded");
    
    videoPlayers = document.querySelectorAll(".loaded");

    for (var source in lazy.children) {
      var videoSource = lazy.children[source];
      if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
        videoSource.src = videoSource.dataset.src;
      }
    }

    lazy.load();
  } else {
    lazy.setAttribute("srcset", lazy.dataset.srcset);
  }

  if(lazy.nodeName.toLowerCase() == "img") {
    lazy.setAttribute("src", lazy.dataset.srcset);
  }
}

document.addEventListener("DOMContentLoaded", function() {
    setupGalleryDOM();   
    var lazyloadImages;
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");

      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var lazy = entry.target;

            createGridItemDOM(lazy);
            
            lazy.classList.remove("lazy");
            imageObserver.unobserve(lazy);
          }
        });
      });
  
      lazyloadImages.forEach(function(lazy) {
        imageObserver.observe(lazy);
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
          lazyloadImages.forEach(function(lazy) {
              if(lazy.offsetTop < (window.innerHeight + scrollTop)) {

                createGridItemDOM(lazy);

                lazy.classList.remove('lazy');
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
