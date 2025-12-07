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
        skillsContainer.innerHTML += `
            <div class="service-card">
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
            </div>
        `;
    });
});
