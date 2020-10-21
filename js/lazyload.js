function masonryLayout() {
  // init colcade
  var colcade = new Colcade( '.grid', {
    columns: '.grid-col',
    items: '.grid-item'
});
}

function createPicture(picture, path) {
  // check vw
  var vw = window.innerWidth;
  var sizes;
  if (vw < 300) {
      sizes = "100vw";
  } else if (vw < 768) {
      sizes = "50vw";
  } else if (vw < 1200) {
      sizes = "33vw";
  } else {
      sizes = "25vw";
  }
  
  //var sizesext = ["_large", "_medium", "_small"];
  var typeext = ["webp", "png"];
  //sizesext.forEach(function(sext) {
  //    typeext.forEach(function(text) {
  //        var source = document.createElement("source");
  //        source.setAttribute("type", "image/".concat(text));
  //        
  //        if (sext == "_large") {
  //          source.setAttribute("media", "(min-width: 960px)");
  //          source.setAttribute("srcset", "".concat(path).concat(sext).concat(".").concat(text).concat(" 700w, ").concat(path).concat(sext).concat("@2x.")
  //                                        .concat(text).concat(" 1400w"));
  //        } else if (sext == "_medium") {
  //          source.setAttribute("media", "(min-width: 600px)");
  //          source.setAttribute("srcset", "".concat(path).concat(sext).concat(".").concat(text).concat(" 500w, ").concat(path).concat(sext).concat("@2x.")
  //                                        .concat(text).concat(" 1000w"));
  //        } else if (sext == "_small") {
  //          /*source.setAttribute("srcset", "".concat(path).concat(sext).concat(".").concat(text).concat(" 300w, ").concat(path).concat(sext).concat("@2x.")
  //                                        .concat(text).concat(" 600w, ").concat(path).concat(sext).concat("@3x.").concat(text).concat(" 900w"));*/
  //          source.setAttribute("srcset", "".concat(path).concat(sext).concat(".").concat(text).concat(" 300w, ").concat(path).concat(sext).concat("@2x.")
  //                                        .concat(text).concat(" 600w"));
  //        }
  //        source.setAttribute("sizes", sizes);
  //        picture.appendChild(source);
  //    });
  //});
  
  typeext.forEach(function(text) {
          var source = document.createElement("source");
          source.setAttribute("type", "image/".concat(text));
          source.setAttribute("srcset", "".concat(path).concat("_large@2x.").concat(text).concat(" 1400w"));
          source.setAttribute("sizes", sizes);
          picture.appendChild(source);
      });
  
  var image = document.createElement("img");
  image.setAttribute("srcset", "".concat(path).concat("_large@2x.png 1400w"));
  image.setAttribute("src", "".concat(path).concat("_large@2x.png"));
  image.setAttribute("alt", "Illustration");
  picture.appendChild(image);
}

document.addEventListener("DOMContentLoaded", function() {
    // JS Infobox
    var jsinfo = document.getElementsByClassName("jsinfo")[0];
    jsinfo.classList.add("hidden");

    masonryLayout();
    //var colcadegrid = document.getElementsByClassName(".grid")[0];
    new SimpleLightbox({elements: '.grid a'});
    
    var lazyloadImages;
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");

      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var picture = entry.target;
            var path = picture.dataset.src;

            createPicture(picture, path);
            
            picture.classList.remove("lazy");
            imageObserver.unobserve(picture);

            //updateLayout();
            //masonryLayout();
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

                createPicture(picture, path);

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
