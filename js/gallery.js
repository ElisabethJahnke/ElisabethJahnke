function createGalleryPictureItem(gallery, data) {
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

        gridItem.appendChild(thumbnail);
    });
    gallery.appendChild(gridItem);
}

function createGalleryVideoItem(gallery, data) {
    var gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    /*
    <video autoplay muted loop playsinline width="610" height="254" poster="one-does-not-simply.jpg">
        <source data-src="one-does-not-simply.webm" type="video/webm">
        <source data-src="one-does-not-simply.mp4" type="video/mp4">
    </video>
    */
    var srcWEBM = document.createElement("source");
    srcWEBM.setAttribute("type", "video/webm");
    srcWEBM.setAttribute("data-src", data[0].concat(".webm"));
    var srcMP4 = document.createElement("source");
    srcMP4.setAttribute("type", "video/mp4");
    srcMP4.setAttribute("data-src", data[0].concat(".mp4"));
    var video = document.createElement("video");
    video.classList.add("lazy");
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.setAttribute("playsinline", "");
    //video.setAttribute("data-poster", data[2]);
    video.setAttribute("poster", data[2]);
    video.appendChild(srcWEBM);
    video.appendChild(srcMP4); 
    
    var caption = document.createElement("div");
    caption.classList.add("caption");
    var p = document.createElement("p");
    p.innerText = data[1];
    caption.appendChild(p);

    gridItem.appendChild(video);
    gridItem.appendChild(caption);
    gallery.appendChild(gridItem);
}

function setupGalleryDOM() {
     // look for gallery element
    const gallery = document.querySelector('.gallery');

    // remove js needed span
    gallery.removeChild(document.querySelector("#jsneeded"));
    
    // for each path in the dataSet variable (external js file)
    
    if(galleryType == "images") {
        dataSet.forEach(function(data) {
            createGalleryPictureItem(gallery, data);
        });
    } else if(galleryType == "videos") {
        dataSet.forEach(function(data) {
            createGalleryVideoItem(gallery, data);
        });
    }

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