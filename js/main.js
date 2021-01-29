function filterProjects(filter) {
    var gallery_items = document.getElementsByClassName("gallery-item");
    Array.from(gallery_items).forEach((item) => {
        if(filter == "All") {
            item.classList.remove("hidden");
        } else {
            var keywords = item.getAttribute("data-keywords").split(" ");
            if(keywords.includes(filter)){
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        }
    });
}

function filterProjectsBtn(filter) {
    var buttons = document.getElementsByClassName("btn");
    
    Array.from(buttons).forEach((btn) => {
        btn.classList.remove("selected");

        if (filter == btn.id) {
            btn.classList.add("selected");
        }
    });

    filterProjects(filter);
}

function filterProjectsSelect() {
    var value = document.getElementsByClassName("selector_mobile")[0].value;
    
    filterProjects(value);
}

window.addEventListener('scroll', disableScrollIndicators);

function disableScrollIndicators() {
    var scrollIndicators = document.querySelectorAll('.scroll-indicator');
    scrollIndicators.forEach(indicator => indicator.classList.add('hidden'));
    window.removeEventListener('scroll', disableScrollIndicators);
}