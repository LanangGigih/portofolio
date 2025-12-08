document.addEventListener("DOMContentLoaded", async () => {
    const { data, error } = await supabase
        .from("projects")
        .select("*");

    if (error) {
        console.error("Supabase Error:", error);
        return;
    }

    const container = document.querySelector(".projects-grid");
    container.innerHTML = ""; 

    data.forEach(project => {
        container.innerHTML += `
            <div class="project-card">
                <img src="${project.image_url}" class="project-img">
                <h3>${project.title}</h3>
                <p>${project.description}</p>

                <a href="${project.detail_url}" 
                   class="project-btn"
                   target="_blank">
                    Lihat Detail
                </a>
            </div>
        `;
    });
});
