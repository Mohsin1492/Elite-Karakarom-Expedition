// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

const toggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

toggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});


function openWhatsApp() {
    let phoneNumber = "923441186392";
    let url = "https://wa.me/" + phoneNumber;
    window.open(url, "_blank");
}


// Contact us form

 document.getElementById("contactForm").addEventListener("submit", function (e) {
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
      .then((res) => res.text())
      .then((data) => {
        if (data.trim() === "success") {
          responseBox.style.display = "block";
          responseBox.style.backgroundColor = "#d4edda";
          responseBox.style.color = "#155724";
          responseBox.style.border = "1px solid #c3e6cb";
          responseBox.textContent = "✅ Message sent successfully! We'll get back to you soon.";
          document.getElementById("contactForm").reset();
        } else {
          responseBox.style.display = "block";
          responseBox.style.backgroundColor = "#f8d7da";
          responseBox.style.color = "#721c24";
          responseBox.style.border = "1px solid #f5c6cb";
          responseBox.textContent = "❌ Something went wrong. Please try again or contact us directly.";
        }

        btn.disabled = false;
        btn.textContent = "SEND MESSAGE";
      })
      .catch(() => {
        responseBox.style.display = "block";
        responseBox.style.backgroundColor = "#f8d7da";
        responseBox.style.color = "#721c24";
        responseBox.style.border = "1px solid #f5c6cb";
        responseBox.textContent = "❌ Network error. Please check your connection and try again.";

        btn.disabled = false;
        btn.textContent = "SEND MESSAGE";
      });
  });