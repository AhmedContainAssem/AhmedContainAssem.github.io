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

    // ========================================
    // 7. Arabic / English Translation System
    // ========================================
    const translations = {
        en: {
            // Nav
            'nav-services': 'Services',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            // Hero
            'hero-hello': "Hello, I'm ",
            'hero-desc': 'Building high-performance web applications and crafting engaging tech content. Let\'s create something extraordinary together.',
            'hero-cta-work': 'View My Work',
            'hero-cta-talk': "Let's Talk",
            // Services
            'title-services': 'My Services',
            'service-fs-title': 'Full Stack Dev',
            'service-fs-desc': 'Developing modern, secure, and responsive web systems using Python, JavaScript, HTML, CSS, and WordPress.',
            'service-cc-title': 'Content Creation',
            'service-cc-desc': 'Creating educational English lessons, self-improvement podcasts, and creative developer content.',
            'service-ux-title': 'UI/UX Engineering',
            'service-ux-desc': 'Designing interactive, gorgeous interfaces with a sharp focus on user experience, speed, and clean layouts.',
            // Projects
            'title-projects': 'Featured Projects',
            'proj-web-title': 'Custom Web Solutions',
            'proj-web-desc': 'Tailored web systems, interactive applications, and custom WordPress websites developed for speed, accessibility, and clean code.',
            'proj-web-source': 'Source',
            'proj-web-demo': 'Demo',
            'proj-podcast-title': 'Self-Improvement Podcast',
            'proj-podcast-desc': 'Audio series and episodes designed to boost mindfulness, focus, and general self-improvement to build a better version of yourself.',
            'proj-podcast-link': 'Spotify Channel',
            'proj-edu-title': 'English Teaching Hub',
            'proj-edu-desc': 'High-quality video tutorials, grammar simplified breakdowns, vocabulary cards, and guides targeting ESL learners on YouTube.',
            'proj-edu-link': 'YouTube Channel',
            // Contact
            'title-contact': 'Get In Touch',
            'contact-subtitle': "Let's collaborate on your next project",
            'contact-desc': 'I am currently available for freelance opportunities, full-time engineering roles, and media/content partnerships.',
            'contact-location': 'Mansoura, Egypt',
            'contact-submit': 'Send Message',
            // Footer
            'footer-text': '© 2026 Ahmed Assem. All Rights Reserved.',
            // Placeholders
            'form-name': 'Your Name',
            'form-email': 'Your Email',
            'form-message': 'Your Message',
        },
        ar: {
            // Nav
            'nav-services': 'خدماتي',
            'nav-projects': 'المشاريع',
            'nav-contact': 'تواصل معي',
            // Hero
            'hero-hello': 'مرحبًا، أنا ',
            'hero-desc': 'أبني تطبيقات ويب عالية الأداء وأصنع محتوى تقني جذّاب. دعنا نصنع شيئًا استثنائيًا معًا.',
            'hero-cta-work': 'شاهد أعمالي',
            'hero-cta-talk': 'تواصل معي',
            // Services
            'title-services': 'خدماتي',
            'service-fs-title': 'تطوير ويب متكامل',
            'service-fs-desc': 'تطوير أنظمة ويب حديثة وآمنة ومتجاوبة باستخدام Python و JavaScript و HTML و CSS و WordPress.',
            'service-cc-title': 'صناعة المحتوى',
            'service-cc-desc': 'إنشاء دروس تعليمية للغة الإنجليزية، وبودكاست لتطوير الذات، ومحتوى إبداعي للمطوّرين.',
            'service-ux-title': 'هندسة واجهات المستخدم',
            'service-ux-desc': 'تصميم واجهات تفاعلية ومذهلة مع تركيز حاد على تجربة المستخدم والسرعة والتنسيق النظيف.',
            // Projects
            'title-projects': 'مشاريع مميّزة',
            'proj-web-title': 'حلول ويب مخصّصة',
            'proj-web-desc': 'أنظمة ويب مخصّصة، تطبيقات تفاعلية، ومواقع WordPress مبنية للسرعة وسهولة الوصول والكود النظيف.',
            'proj-web-source': 'الكود',
            'proj-web-demo': 'عرض حي',
            'proj-podcast-title': 'بودكاست تطوير الذات',
            'proj-podcast-desc': 'سلسلة حلقات صوتية مصمّمة لتعزيز الوعي والتركيز وتطوير الذات لبناء نسخة أفضل من نفسك.',
            'proj-podcast-link': 'قناة سبوتيفاي',
            'proj-edu-title': 'منصة تعليم الإنجليزية',
            'proj-edu-desc': 'دروس فيديو عالية الجودة، شروحات قواعد مبسّطة، بطاقات مفردات وأدلّة لمتعلّمي الإنجليزية على يوتيوب.',
            'proj-edu-link': 'قناة يوتيوب',
            // Contact
            'title-contact': 'تواصل معي',
            'contact-subtitle': 'لنتعاون في مشروعك القادم',
            'contact-desc': 'أنا متاح حاليًا لفرص العمل الحر، والوظائف الهندسية بدوام كامل، وشراكات الإعلام والمحتوى.',
            'contact-location': 'المنصورة، مصر',
            'contact-submit': 'إرسال الرسالة',
            // Footer
            'footer-text': '© 2026 أحمد عاصم. جميع الحقوق محفوظة.',
            // Placeholders
            'form-name': 'اسمك',
            'form-email': 'بريدك الإلكتروني',
            'form-message': 'رسالتك',
        }
    };

    const typewriterTexts = {
        en: ["Full Stack Developer", "English Teacher", "Self-Improvement Podcaster", "Content Creator"],
        ar: ["مطوّر ويب متكامل", "مُعلّم لغة إنجليزية", "بودكاستر تطوير الذات", "صانع محتوى"]
    };

    let currentLang = 'en';
    const langBtn = document.getElementById('langBtn');
    const langText = document.getElementById('langText');

    function applyTranslations(lang) {
        const dict = translations[lang];
        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.textContent = dict[key];
            }
        });
        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.placeholder = dict[key];
            }
        });
    }

    function setLanguage(lang) {
        currentLang = lang;
        const htmlEl = document.documentElement;

        // Smooth transition: fade out, swap, fade in
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0';

        setTimeout(() => {
            // Set direction and lang attribute
            htmlEl.setAttribute('lang', lang);
            htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

            // Apply translations
            applyTranslations(lang);

            // Update toggle button label
            if (langText) {
                langText.textContent = lang === 'ar' ? 'EN' : 'AR';
            }

            // Restart typewriter with correct language
            occupations.length = 0;
            typewriterTexts[lang].forEach(t => occupations.push(t));
            occupationIndex = 0;
            charIndex = 0;
            isDeleting = false;
            if (typewriterElement) {
                typewriterElement.textContent = '';
            }

            // Update submit button text during form submission state
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.textContent = translations[lang]['contact-submit'];
            }

            // Fade back in
            document.body.style.opacity = '1';
        }, 300);
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    }
});
