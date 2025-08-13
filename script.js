// Simple client-side form validation and feedback for the order form

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    formMessage.textContent = '';
    formMessage.style.color = '';

    // Basic validation (HTML5 validation handles most)
    if (!form.checkValidity()) {
      formMessage.textContent = 'Please fill out all required fields correctly.';
      formMessage.style.color = 'red';
      return;
    }

    // Submit form data using fetch to Formspree (temporary email service)
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        formMessage.textContent = 'Thank you! Your order has been submitted.';
        formMessage.style.color = 'green';
        form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          formMessage.textContent = data.errors.map(error => error.message).join(', ');
        } else {
          formMessage.textContent = 'Oops! There was a problem submitting your order.';
        }
        formMessage.style.color = 'red';
      }
    } catch (error) {
      formMessage.textContent = 'Oops! There was a problem submitting your order.';
      formMessage.style.color = 'red';
    }
  });
});
