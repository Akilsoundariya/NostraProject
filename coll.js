var offerBar = document.querySelector(".offer_tag")
var closeOffer = document.getElementById("closeOffer")

if(closeOffer){
    closeOffer.addEventListener("click", function(){
        offerBar.style.display="none"
    })
}

// ── 2. MOBILE SIDEBAR MENU ──────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const closeSidebar = document.getElementById('closeSidebar');
const overlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    mobileSidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSidebarFn() {
    mobileSidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

if (menuToggle) menuToggle.addEventListener('click', openSidebar);
if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarFn);
if (overlay) overlay.addEventListener('click', closeSidebarFn);


// ── 3. HERO SLIDER ──────────────────────────
const sliderContainer = document.querySelector('.hero__slider-container');
const images = document.querySelectorAll('.hero__img');
const leftBtn = document.getElementById('slider-left-activate');
const rightBtn = document.getElementById('slider-right-activate');

if (sliderContainer && images.length > 0) {
    let current = 0;

    function goToSlide(index) {
        // wrap around
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        current = index;
        sliderContainer.style.marginLeft = `-${current * 100}vw`;
    }

    if (rightBtn) rightBtn.addEventListener('click', () => goToSlide(current + 1));
    if (leftBtn) leftBtn.addEventListener('click', () => goToSlide(current - 1));

    // auto-play every 4 seconds
    setInterval(() => goToSlide(current + 1), 4000);
}


// ── 4. MOST WANTED — LIKE BUTTON ────────────
const likeButtons = document.querySelectorAll('.like_btn');

likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        const isLiked = icon.classList.contains('fa-solid');

        if (isLiked) {
            // unlike
            icon.classList.remove('fa-solid', 'liked');
            icon.classList.add('fa-regular');
        } else {
            // like
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid', 'liked');
        }
    });
});


// ── COLLECTION FILTER ────────────────────

const filterChecks = document.querySelectorAll('.filter-check');
const allProducts = document.querySelectorAll('.product');
const noResults = document.getElementById('noResults');

function applyFilters() {

    let visibleCount = 0;

    // collect checked values
    const checkedValues = Array.from(filterChecks)
        .filter(cb => cb.checked)
        .map(cb => cb.dataset.category);

    allProducts.forEach(product => {

        const category = product.dataset.category;
        const arrival = product.dataset.arrival;
        const color = product.dataset.color;

        const matchCategory =
            checkedValues.filter(v => !["Black","White","Red","Blue","Yellow","new","old"].includes(v))
            .length === 0 ||
            checkedValues.includes(category);

        const matchColor =
            checkedValues.filter(v => ["Black","White","Red","Blue","Yellow"].includes(v))
            .length === 0 ||
            checkedValues.includes(color);

        const matchArrival =
            checkedValues.filter(v => ["new","old"].includes(v))
            .length === 0 ||
            checkedValues.includes(arrival);

        if (matchCategory && matchColor && matchArrival) {
            product.style.display = "";
            visibleCount++;
        } else {
            product.style.display = "none";
        }

    });

    if (noResults) {
        noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
}

// listeners
filterChecks.forEach(cb => cb.addEventListener("change", applyFilters));

// run once on load
applyFilters();

// ── 6. SEARCH BAR ─────────────────────
const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();

        let visibleCount = 0;

        allProducts.forEach(product => {
            const name = product.querySelector('h3') ? product.querySelector('h3').textContent.toLowerCase() : '';
            if (name.includes(query)) {
                product.style.display = '';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });
}
