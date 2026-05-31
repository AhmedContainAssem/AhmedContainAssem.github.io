document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.navigation a');

    if (menuBtn && navigation) {
        menuBtn.addEventListener('click', () => {
            navigation.classList.toggle('active');
            // Toggle hamburger icon between bars and times (close)
            const icon = menuBtn.querySelector('i');
            if (navigation.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navigation.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const occupations = [
        "Full Stack Developer",
        "English Teacher",
        "Self-Improvement Podcaster",
        "Content Creator"
    ];
    let occupationIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = occupations[occupationIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deleting
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // standard typing
        }

        // Handle word completions
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            occupationIndex = (occupationIndex + 1) % occupations.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typewriterElement) {
        setTimeout(type, 1000);
    }

    // 4. Contact Form Submission (Web3Forms Integration)
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending Message...';
            }

            const formData = {
                access_key: "befd50e1-6d86-4ef2-a8d7-6bf3bd226b7c",
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value,
                subject: `New Message from ${nameInput.value} on Portfolio`
            };

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    alert(`Thank you, ${nameInput.value}! Your message has been sent successfully.`);
                    contactForm.reset();
                } else {
                    console.log(response);
                    alert(json.message || "Something went wrong. Please try again.");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Form submission failed. Please check your internet connection.");
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            });
        });
    }

    // 5. Scroll Reveal Animation using Intersection Observer
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .contact-wrapper, .section-title');
    
    // Add transition style inline or in css
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Navigation Link Active Highlighting on Scroll (Scrollspy)
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset for nav height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});
