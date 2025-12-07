document.addEventListener("DOMContentLoaded", async () => {
    const { data, error } = await supabase
        .from("projects")
        .select("*");

    if (error) {
        console.error("Supabase Error:", error);
        return;
    }

    const container = document.querySelector(".projects-grid");
    container.innerHTML = ""; // kosongkan dulu

    data.forEach(project => {
        container.innerHTML += `
            <div class="project-card">
                <img src="${project.image_url}" class="project-img">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button class="project-btn">Lihat Detail</button>
            </div>
        `;
    });
});
