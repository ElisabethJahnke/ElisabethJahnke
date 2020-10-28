var videoPlayers = document.querySelectorAll(".loaded");
var observerThrottleTimeout;

function queryAllPlayers() {
    //videoPlayers = document.querySelectorAll(".loaded");
    

    if(observerThrottleTimeout) {
        clearTimeout(observerThrottleTimeout);
    }

    observerThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        videoPlayers.forEach(function(player) {
            var bounding = player.getBoundingClientRect();
            
            if (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            ) {
                // play
                player.autoplay = true;
                player.play();
            } else {
                // pause
                player.removeAttribute("autoplay");
                player.pause();
            }
        });
        /*
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", queryAllPlayers);
        }
        */
    }, 250);
}

document.addEventListener("scroll", queryAllPlayers);
  