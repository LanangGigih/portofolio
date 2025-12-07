document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // CEGAH GET URL

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Insert ke database Supabase
        const { error } = await supabase
            .from("messages")
            .insert([{ name, email, message }]);

        if (error) {
            console.error(error);
            alert("Gagal mengirim pesan.");
            return;
        }

        alert("Pesan berhasil dikirim!");
        form.reset();
    });
});
