document.addEventListener("DOMContentLoaded", async () => {
    const { data, error } = await supabase
        .from("about_me")
        .select("*")
        .single(); // karena cuma 1 data

    if (error) {
        console.error("Supabase About Error:", error);
        return;
    }

    // Masukkan data ke elemen HTML
    document.querySelector(".about-photo img").src = data.photo_url;
    document.querySelector(".about-text h3").textContent = `Hello, I'm ${data.name}`;

    // Paragraf
    const paragraphs = document.querySelectorAll(".about-text p");
    paragraphs[0].textContent = data.description1;
    paragraphs[1].textContent = data.description2;
    paragraphs[2].textContent = data.description3;

    // Quote
    document.querySelector("blockquote").textContent = `"${data.quote}"`;

    // CV link
    document.querySelector(".about-buttons .btn").href = data.cv_url;
});
