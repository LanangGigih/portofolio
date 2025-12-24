import { supabase } from './supabase.js'
document.addEventListener("DOMContentLoaded", async () => {
    const skillsContainer = document.querySelector("#skills-container");

    if (!skillsContainer) return;

    const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching skills:", error);
        return;
    }

    skillsContainer.innerHTML = "";

    data.forEach(skill => {

        // Cek apakah ada icon_url (gambar)
        const iconElement = skill.icon_url && skill.icon_url.trim() !== ""
            ? `<img src="${skill.icon_url}" alt="${skill.name}" class="skill-img" />`
            : `<i class="${skill.icon}"></i>`;

        skillsContainer.innerHTML += `
            <div class="service-card">
                ${iconElement}
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
            </div>
        `;
    });
});
