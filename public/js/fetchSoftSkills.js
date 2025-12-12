document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector("#soft-skills-container");
    if (!container) return;

    const { data, error } = await supabase
        .from("soft_skills")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching soft skills:", error);
        return;
    }

    container.innerHTML = "";

    const isUrl = (s) => {
        if (!s) return false;
        return /^(https?:\/\/|data:|\/)/i.test(s);
    };

    data.forEach(skill => {
        const card = document.createElement("div");
        card.className = "soft-card";

        if (isUrl(skill.icon)) {
            const img = document.createElement("img");
            img.className = "skill-img";
            img.src = skill.icon;
            img.alt = skill.name;

            img.onerror = () => {
                img.remove();
                const fallback = document.createElement("i");
                fallback.className = "fa-solid fa-circle-question skill-i-fallback";
                fallback.setAttribute("aria-hidden", "true");
                card.insertBefore(fallback, card.firstChild);
            };

            card.appendChild(img);
        } else {
            const i = document.createElement("i");
            i.className = skill.icon + " skill-i";
            i.setAttribute("aria-hidden", "true");
            card.appendChild(i);
        }

        const h3 = document.createElement("h3");
        h3.textContent = skill.name || "Untitled";
        card.appendChild(h3);

        const p = document.createElement("p");
        p.textContent = skill.description || "";
        card.appendChild(p);

        container.appendChild(card);
    });

    // tombol scroll
    const left = document.querySelector('.soft-left-btn');
    const right = document.querySelector('.soft-right-btn');
    const softCards = document.querySelector('.soft-skill-cards');

   if (left && right && softCards) {
    left.onclick = () => {
        pauseAutoScroll();
        softCards.scrollBy({ left: -330, behavior: 'smooth' });
    };

    right.onclick = () => {
        pauseAutoScroll();
        softCards.scrollBy({ left: 330, behavior: 'smooth' });
    };
}


    let autoScrollPaused = false;
let resumeTimeout;

// Fungsi pause auto-scroll
function pauseAutoScroll() {
    autoScrollPaused = true;
    if (resumeTimeout) clearTimeout(resumeTimeout);

    resumeTimeout = setTimeout(() => {
        autoScrollPaused = false;
    }, 1200); // jeda 1.2 detik sebelum auto-scroll jalan lagi
}

// ===== AUTO SCROLL INFINITE LOOP =====
function startAutoScrollLoop() {
    const scrollContainer = document.querySelector(".soft-skill-cards");
    if (!scrollContainer) return;

    let speed = 1.5; // semakin kecil = semakin halus
    let autoScroll;

    function scrollStep() {
      if (!autoScrollPaused) {
    scrollContainer.scrollLeft += speed;
}


        // Jika sudah lewat separuh (setelah clone), langsung geser balik setara,
        // jadi tidak ada hentakan. 
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
        }

        autoScroll = requestAnimationFrame(scrollStep);
    }

    autoScroll = requestAnimationFrame(scrollStep);

    // Pause kalau user hover
    scrollContainer.addEventListener("mouseenter", () => {
        cancelAnimationFrame(autoScroll);
    });

    // Lanjut lagi ketika mouse keluar
    scrollContainer.addEventListener("mouseleave", () => {
        autoScroll = requestAnimationFrame(scrollStep);
    });
}

// Duplicate semua card supaya bisa looping mulus
function duplicateCardsForLoop() {
    const container = document.querySelector(".soft-skill-cards");
    if (!container) return;

    const cards = Array.from(container.children);

    // Duplikasi 1x
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add("clone");
        container.appendChild(clone);
    });
}

duplicateCardsForLoop();

startAutoScrollLoop();

    // ===== Scroll Reveal Animation =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".soft-card").forEach(card => observer.observe(card));
});
