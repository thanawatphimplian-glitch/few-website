const animeData = [
    {
        title: "Fullmetal Alchemist: Brotherhood",
        genres: ["Action", "Fantasy"],
        rating: 9.1,
        year: 2009,
        description: "สองพี่น้องออกตามหาศิลาอาถรรพ์เพื่อฟื้นร่างกายที่สูญเสียไป",
        fullDescription: "หลังจากความพยายามในการชุบชีวิตมารดาด้วยวิชาแปรธาตุล้มเหลว สองพี่น้อง เอ็ดเวิร์ด และ อัลฟองเซ เอลริค ต้องสูญเสียร่างกายไปบางส่วน ทั้งคู่จึงออกเดินทางตามหา 'ศิลาอาถรรพ์' เพื่อฟื้นคืนร่างกายเดิม แต่กลับต้องเข้าไปพัวพันกับสมคบคิดระดับชาติ",
        image: "Object/FULLMETAL.jpg",
        banner: "Object/FULLMETAL_BANNER.jpg"
    },
    {
        title: "Spy x Family",
        genres: ["Comedy", "Action"],
        rating: 8.6,
        year: 2022,
        description: "สายลับ นักฆ่า และเด็กที่อ่านใจได้ มาเป็นครอบครัวปลอมๆ",
        fullDescription: "สุดยอดสายลับโค้ดเนม 'สนธยา' ได้รับภารกิจสร้างครอบครัวปลอมๆ เพื่อเข้าถึงตัวเป้าหมาย โดยไม่รู้เลยว่าภรรยาปลอมๆ ของเขาเป็นนักฆ่าสาวฝีมือดี และลูกสาวที่รับเลี้ยงดันเป็นผู้มีความสามารถในการอ่านใจคนได้!",
        image: "Object/SPYXFAMILY.jpg",
        banner: "Object/SPYXFAMILY_BANNER.jpg"
    },
    {
        title: "Frieren: Beyond Journey's End",
        genres: ["Fantasy"],
        rating: 9.3,
        year: 2023,
        description: "เอลฟ์ผู้เป็นนักเวทย์เรียนรู้ความหมายของชีวิตหลังการผจญภัยสิ้นสุด",
        fullDescription: "เรื่องราวหลังจากปาร์ตี้ผู้กล้าเอาชนะจอมมารได้สำเร็จ เอลฟ์นักเวทย์อย่าง 'ฟรีเรน' ที่มีอายุขัยเกือบเป็นอมตะ ต้องเผชิญกับการจากไปของเพื่อนร่วมเดินทาง เธอจึงเริ่มออกเดินทางครั้งใหม่เพื่อทำความเข้าใจมนุษย์และความหมายของช่วงเวลา",
        image: "Object/FRIEREN.jpg",
        banner: "Object/FRIEREN_BANNER.jpg"
    },
    {
        title: "Kaguya-sama: Love Is War",
        genres: ["Comedy", "Romance"],
        rating: 8.7,
        year: 2019,
        description: "สงครามประสาทความรักของสองอัจฉริยะประจำห้องเรียน",
        fullDescription: "การประชันชิงเชิงของประธานและรองประธานนักเรียนแห่งโรงเรียนชูจิอินที่ต่างฝ่ายต่างมีใจให้กัน แต่ด้วยทิฐิและศักดิ์ศรี ทำให้ทั้งคู่ต่างวางอุบายให้อีกฝ่ายเป็นคนสารภาพรักก่อนให้ได้!",
        image: "Object/KAGUYASAMA.jpg",
        banner: "Object/KAGUYASAMA_BANNER.jpg"
    },
    {
        title: "Steins;Gate",
        genres: ["Sci-Fi"],
        rating: 9.1,
        year: 2011,
        description: "นักวิทยาศาสตร์สติเฟื่องที่ค้นพบวิธีการส่งข้อความย้อนเวลา",
        fullDescription: "โอคาเบะ รินทาโร่ นักวิทยาศาสตร์สติเฟื่องที่บังเอิญดัดแปลงไมโครเวฟให้สามารถส่งข้อความย้อนกลับไปในอดีตได้ แต่นำไปสู่การเปลี่ยนแปลงเส้นทางเวลาและโศกนาฏกรรมที่เขาต้องหาทางแก้ไข",
        image: "Object/STEINGATE.jpg",
        banner: "Object/STEINGATE_BANNER.jpg"
    }
];

const listElement = document.getElementById("anime-list");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll("#filters button");

const modal = document.getElementById("anime-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalYear = document.getElementById("modal-year");
const modalGenreTag = document.getElementById("modal-genre-tag");
const modalDesc = document.getElementById("modal-desc");
const closeModalBtn = document.querySelector(".close-btn");

let currentGenre = "all";

const heroSlideContainer = document.getElementById("hero-slide-container");
const heroDotsContainer = document.getElementById("hero-dots");
const heroPrevBtn = document.getElementById("hero-prev");
const heroNextBtn = document.getElementById("hero-next");

let currentSlideIndex = 0;
let slideInterval;

function initHeroCarousel() {
    heroSlideContainer.innerHTML = "";
    heroDotsContainer.innerHTML = "";

    animeData.forEach((anime, index) => {
        const slide = document.createElement("div");
        slide.className = `hero-slide ${index === 0 ? "active" : ""}`;
        slide.innerHTML = `
            <img class="hero-slide-img" src="${anime.banner || anime.image}" alt="${anime.title}">
            <div class="hero-slide-overlay"></div>
            <div class="hero-slide-info">
                <h2>${anime.title}</h2>
                <p>${anime.description}</p>
                <button class="hero-btn-detail">ℹ รายละเอียดเพิ่มเติม</button>
            </div>
        `;

        slide.querySelector(".hero-btn-detail").addEventListener("click", () => {
            openModal(anime);
        });

        heroSlideContainer.appendChild(slide);

        const dot = document.createElement("div");
        dot.className = `dot ${index === 0 ? "active" : ""}`;
        dot.addEventListener("click", () => goToSlide(index));
        heroDotsContainer.appendChild(dot);
    });

    startAutoSlide();
}

function showSlide(index) {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".dot");

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    currentSlideIndex = (index + animeData.length) % animeData.length;

    slides[currentSlideIndex].classList.add("active");
    dots[currentSlideIndex].classList.add("active");
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

heroNextBtn.addEventListener("click", () => { nextSlide(); resetAutoSlide(); });
heroPrevBtn.addEventListener("click", () => { prevSlide(); resetAutoSlide(); });

function showAnime(list) {
    listElement.innerHTML = "";

    if (list.length === 0) {
        listElement.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #a3a3a3; padding: 40px; font-size: 1.1rem;">ไม่พบอนิเมะในหมวดหมู่นี้</p>`;
        return;
    }

    list.forEach(function(anime) {
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${anime.image}" alt="${anime.title}">
            </div>
        `;

        card.addEventListener("click", function() {
            openModal(anime);
        });

        listElement.appendChild(card);
    });
}

function openModal(anime) {
    modalImg.src = anime.banner || anime.image;
    modalTitle.textContent = anime.title;
    modalYear.textContent = anime.year;
    modalGenreTag.textContent = anime.genres[0] || "ทั่วไป";
    modalDesc.textContent = anime.fullDescription;
    
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", function(e) {
    if (e.target === modal) closeModal();
});

function updateList() {
    const keyword = searchInput.value.toLowerCase().trim();

    const filtered = animeData.filter(function(anime) {
        const matchGenre = (currentGenre.toLowerCase() === "all") || 
            anime.genres.some(g => g.toLowerCase() === currentGenre.toLowerCase());

        const matchSearch = (keyword === "") || anime.title.toLowerCase().includes(keyword);

        return matchGenre && matchSearch;
    });

    showAnime(filtered);
}

searchInput.addEventListener("input", updateList);

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        currentGenre = button.dataset.genre;
        updateList();
    });
});

initHeroCarousel();
showAnime(animeData);