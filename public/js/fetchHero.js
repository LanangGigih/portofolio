import { supabase } from './supabase.js'
document.addEventListener("DOMContentLoaded", async () => {

    const { data, error } = await supabase
        .from("hero")
        .select("*")
        .single();  // karena hanya 1 row

    if (error) {
        console.error("Error fetching hero:", error);
        return;
    }

    // DOM elements
    const heroHeadline = document.getElementById("hero-headline");
    const heroDesc = document.getElementById("hero-description");
    const heroImg = document.getElementById("hero-image");

    heroHeadline.textContent = data.headline;
    heroDesc.textContent = data.description;
    heroImg.src = data.image_url;
});
