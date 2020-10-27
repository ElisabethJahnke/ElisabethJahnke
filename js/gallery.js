function createGalleryItem(gallery, data) {
    var gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    var hrefs = ["#".concat(data[0]), "#_"];

    hrefs.forEach(function(ref) {
        var thumbnail = document.createElement("a");
        thumbnail.setAttribute("href", ref);
        var picture = document.createElement("picture");

        var source = document.createElement("source");
        source.setAttribute("type", "image/webp");
        source.setAttribute("data-srcset", data[0].concat(".webp"));
        source.classList.add("lazy");
        picture.appendChild(source);
        source = document.createElement("source");
        source.setAttribute("type", "image/png");
        source.setAttribute("data-srcset", data[0].concat(".png"));
        source.classList.add("lazy");
        picture.appendChild(source);
        var image = document.createElement("img");
        image.setAttribute("data-srcset", data[0].concat(".png"));
        image.classList.add("lazy");
        image.setAttribute("alt", data[1]);
        picture.appendChild(image);
        thumbnail.appendChild(picture);
        gridItem.appendChild(thumbnail);

        if(ref == hrefs[1]) {
            thumbnail.classList.add("overlay");
            thumbnail.id = data[0];
        } else {
            var caption = document.createElement("div");
            caption.classList.add("caption");
            var p = document.createElement("p");
            p.innerText = data[1];
            caption.appendChild(p);
            thumbnail.appendChild(caption);
        }
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
/*
document.addEventListener("DOMContentLoaded", function() {
    setupGalleryDOM();
})
*/ // --> done in lazyload