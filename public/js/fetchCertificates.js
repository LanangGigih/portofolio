document.addEventListener("DOMContentLoaded", async () => {
    const certContainer = document.querySelector(".certificates-grid");

    if (!certContainer) return;

    try {
        const { data, error } = await supabase
            .from("certificates")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            console.error("Error fetching certificates:", error);
            return;
        }

        certContainer.innerHTML = "";

        data.forEach(cert => {
           certContainer.innerHTML += `
    <div class="certificate-card">
        <img src="${cert.image_url}" alt="${cert.title}" class="certificate-img">
        <div class="certificate-title">${cert.title}</div>
    </div>
`;

        });

    } catch (e) {
        console.error("Unexpected error:", e);
    }
});
