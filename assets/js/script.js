// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Dark Mode toggle
const darkToggle = document.getElementById("darkModeToggle");

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Smooth scroll (optional improvement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const data = new FormData(form);
      const action = form.action;
  
      status.textContent = "Sending message...";
      status.classList.remove("error");
      status.classList.remove("success");
  
      try {
        const response = await fetch(action, {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        });
  
        if (response.ok) {
          status.textContent = "Thanks! Your message has been sent.";
          status.classList.add("success");
          form.reset();
        } else {
          const result = await response.json();
          if (result.errors) {
            status.textContent = result.errors.map(error => error.message).join(", ");
          } else {
            status.textContent = "Oops! Something went wrong.";
          }
          status.classList.add("error");
        }
      } catch (error) {
        status.textContent = "Network error. Please try again.";
        status.classList.add("error");
      }
    });
  });
  