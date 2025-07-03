document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle SVG icons
            mobileMenuButton.querySelectorAll('svg').forEach(icon => icon.classList.toggle('hidden'));
        });
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const statusDiv = document.getElementById('form-status');
            statusDiv.innerHTML = '<p class="text-yellow-400">Sending...</p>';

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
            };

            try {
                // The backend server should be running on localhost:3000
                const response = await fetch('http://localhost:3000/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    statusDiv.innerHTML = '<p class="text-green-400">Message sent successfully!</p>';
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to send message.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                statusDiv.innerHTML = `<p class="text-red-400">Error: ${error.message} Make sure the backend server is running.</p>`;
            }
        });
    }
});