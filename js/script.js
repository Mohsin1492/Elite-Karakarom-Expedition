// ===============================
// ✅ GLOBAL SCRIPT (ALL PAGES SAFE)
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    console.log("JS Loaded");

    // ===============================
    // 📱 MOBILE MENU TOGGLE
    // ===============================
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navbar = document.getElementById("navbar");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks && navLinks.classList.toggle("active");
            navbar && navbar.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });
    }

    // ===============================
    // 📌 TABS (DETAILS / ITINERARY)
    // ===============================
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    if (buttons.length && contents.length) {
        buttons.forEach(button => {
            button.addEventListener("click", () => {

                // Remove active from all
                buttons.forEach(btn => btn.classList.remove("active"));
                contents.forEach(content => content.classList.remove("active"));

                // Activate clicked tab
                button.classList.add("active");

                const target = button.dataset.tab;
                const targetEl = document.getElementById(target);

                if (targetEl) {
                    targetEl.classList.add("active");
                }
            });
        });
    }

    // ===============================
    // 📩 CONTACT FORM
    // ===============================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const btn = document.getElementById("submitBtn");
            const responseBox = document.getElementById("form-response");

            btn.disabled = true;
            btn.textContent = "Sending...";
            responseBox.style.display = "none";

            const formData = new FormData(this);

            fetch("./php/send.php", {
                method: "POST",
                body: formData,
            })
                .then(res => res.text())
                .then(data => {

                    responseBox.style.display = "block";

                    if (data.trim() === "success") {
                        responseBox.style.backgroundColor = "#d4edda";
                        responseBox.style.color = "#155724";
                        responseBox.textContent = "✅ Message sent successfully!";
                        contactForm.reset();
                    } else {
                        responseBox.style.backgroundColor = "#f8d7da";
                        responseBox.style.color = "#721c24";
                        responseBox.textContent = "❌ Something went wrong.";
                    }

                    btn.disabled = false;
                    btn.textContent = "SEND MESSAGE";
                })
                .catch(() => {
                    responseBox.style.display = "block";
                    responseBox.style.backgroundColor = "#f8d7da";
                    responseBox.style.color = "#721c24";
                    responseBox.textContent = "❌ Network error.";

                    btn.disabled = false;
                    btn.textContent = "SEND MESSAGE";
                });
        });
    }

});


// ===============================
// 💬 WHATSAPP BUTTON (GLOBAL)
// ===============================
function openWhatsApp() {
    const phoneNumber = "923441186392";
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
}