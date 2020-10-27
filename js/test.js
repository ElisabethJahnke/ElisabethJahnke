/*
<div class="grid-item">
                <a href="./images/Illustration/200904_pumpkin-everything_large@2x.png" title="pumpkin everything">
                        <picture class="lazy" data-src="./images/Illustration/200904_pumpkin-everything">
                        </picture>
                        <div class="caption">
                                <p>"pumpkin everything"</p>
                        </div>
                </a>
        </div>




<a href="#img-id">
  <img src="image-thumbnail.png" alt="Thumbnail">
</a>

<!-- The full screen image, hidden by default  -->
<a href="#_" class="overlay" id="img-id">
  <img src="image-fullscreen.png" alt="Fullscreen">
</a>
*/


function createGalleryItem(gallery, data) {
    // grid item
    var gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    var hrefs = ["#".concat(data[0]), "#_"];

    hrefs.forEach(function(ref) {
        var thumbnail = document.createElement("a");
        thumbnail.setAttribute("href", ref);
        var picture = document.createElement("picture");

        if(ref == hrefs[1]) {
            thumbnail.classList.add("overlay");
            thumbnail.id = data[0];
        } else {
            picture.classList.add("lazy");
        }
        var caption = document.createElement("div");
        caption.classList.add("caption");
        var p = document.createElement("p");
        p.innerText = data[1];
        caption.appendChild(p);
        var source = document.createElement("source");
        source.setAttribute("type", "image/webp");
        source.setAttribute("srcset", data[0].concat(".webp"));
        picture.appendChild(source);
        source = document.createElement("source");
        source.setAttribute("type", "image/png");
        source.setAttribute("srcset", data[0].concat(".png"));
        picture.appendChild(source);
        var image = document.createElement("img");
        image.setAttribute("srcset", data[0].concat(".png"));
        image.setAttribute("src", data[0].concat(".png"));
        image.setAttribute("alt", data[1]);
        picture.appendChild(image);
        thumbnail.appendChild(picture);
        gridItem.appendChild(thumbnail);
    });
    gallery.appendChild(gridItem);
}

 function setupGalleryDOM() {
     // look for gallery element
    const gallery = document.querySelector('.gallery');

    // remove js needed span
    gallery.removeChild(document.querySelector("#jsneeded"));
    
    // for each path in the pictureSet variable (external js file)
    pictureSet.forEach(function(data) {
        createGalleryItem(gallery, data);
    });

    // init colcade
    var colcade = new Colcade( '.grid', {
        columns: '.grid-col',
        items: '.grid-item'
    });
}

// do if DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    setupGalleryDOM();
})