/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navMenu) {
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("show-menu");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navMenu.classList.remove("show-menu");
    }
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on nav__link, remove menu
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== DOM CONTENT LOADED ====================*/
document.addEventListener("DOMContentLoaded", () => {
  /*===== ENHANCED CONTACT FORM =====*/
  const form = document.getElementById("contact-form");
  const inputs = document.querySelectorAll(".contact__input");
  const confirmation = document.getElementById("confirmation");
  const submitBtn = document.getElementById("submit-btn");
  const buttonText = submitBtn?.querySelector(".button__text");
  const buttonLoading = submitBtn?.querySelector(".button__loading");

  // Form validation
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);

    if (!errorElement) return true;

    let isValid = true;
    let errorMessage = "";

    // Clear previous error
    errorElement.textContent = "";
    field.classList.remove("contact__input--error");

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      isValid = false;
      errorMessage = `${
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      } is required`;
    }

    // Email validation
    if (fieldName === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
    }

    // Message length validation
    if (fieldName === "message" && value && value.length < 10) {
      isValid = false;
      errorMessage = "Message must be at least 10 characters long";
    }

    if (!isValid) {
      errorElement.textContent = errorMessage;
      field.classList.add("contact__input--error");
    }

    return isValid;
  }

  // Real-time validation
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      // Clear error on input
      input.classList.remove("contact__input--error");
      const errorElement = document.getElementById(`${input.name}-error`);
      if (errorElement) errorElement.textContent = "";
    });
  });

  // Form submission
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validate all fields
      const allValid = Array.from(inputs).every((input) =>
        validateField(input)
      );
      if (!allValid) {
        // Focus first invalid field
        const firstInvalid = Array.from(inputs).find((input) =>
          input.classList.contains("contact__input--error")
        );
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Show loading state
      if (submitBtn && buttonText && buttonLoading) {
        submitBtn.disabled = true;
        buttonText.style.display = "none";
        buttonLoading.style.display = "inline-flex";
      }

      try {
        // Get form data
        const formData = new FormData(form);

        // Check if we're using Formspree (alternative to Netlify Forms)
        const contactSink = "netlify"; // This would come from env in production

        if (contactSink === "formspree") {
          // Submit to Formspree
          const formspreeId = "your_formspree_id"; // This would come from env
          const response = await fetch(
            `https://formspree.io/f/${formspreeId}`,
            {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Form submission failed");
          }
        } else {
          // For Netlify Forms, the form will submit normally
          // We'll just show success message
        }

        // Show success message
        if (confirmation) {
          confirmation.style.display = "block";
          confirmation.scrollIntoView({ behavior: "smooth", block: "center" });

          setTimeout(() => {
            confirmation.style.display = "none";
          }, 5000);
        }

        // Clear form
        form.reset();

        // Reset button state
        if (submitBtn && buttonText && buttonLoading) {
          submitBtn.disabled = false;
          buttonText.style.display = "inline";
          buttonLoading.style.display = "none";
        }
      } catch (error) {
        console.error("Form submission error:", error);

        // Show error message
        const errorMessage = document.createElement("div");
        errorMessage.className = "contact__error contact__error--global";
        errorMessage.textContent = "Failed to send message. Please try again.";
        errorMessage.style.display = "block";
        errorMessage.style.textAlign = "center";
        errorMessage.style.marginTop = "1rem";
        errorMessage.style.color = "#e74c3c";

        form.appendChild(errorMessage);

        setTimeout(() => {
          errorMessage.remove();
        }, 5000);

        // Reset button state
        if (submitBtn && buttonText && buttonLoading) {
          submitBtn.disabled = false;
          buttonText.style.display = "inline";
          buttonLoading.style.display = "none";
        }
      }
    });
  }
});
