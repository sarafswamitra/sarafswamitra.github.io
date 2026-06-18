document.addEventListener('DOMContentLoaded', () => {
    /* ==================== SCROLL HEADER ==================== */
    const header = document.getElementById('header');
    
    function scrollHeader() {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }
    window.addEventListener('scroll', scrollHeader);
    scrollHeader(); // Init on load


    /* ==================== MOBILE MENU ==================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    // Menu Show
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Menu Hide
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Hide Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });


    /* ==================== THEME TOGGLE ==================== */
    const themeButton = document.getElementById('theme-toggle');
    const iconTheme = 'fa-sun';
    const darkThemeClass = 'dark-theme';
    const lightThemeClass = 'light-theme';

    // Check saved theme
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    // Determine current theme
    const getCurrentTheme = () => document.body.classList.contains(lightThemeClass) ? 'light' : 'dark';
    const getCurrentIcon = () => themeButton.querySelector('i').classList.contains(iconTheme) ? 'sun' : 'moon';

    // Apply saved theme
    if (selectedTheme) {
        document.body.classList.remove(darkThemeClass, lightThemeClass);
        document.body.classList.add(selectedTheme === 'light' ? lightThemeClass : darkThemeClass);
        
        const iconElement = themeButton.querySelector('i');
        iconElement.className = selectedIcon === 'sun' ? `fa-solid ${iconTheme}` : 'fa-solid fa-moon';
    }

    // Toggle theme manually
    themeButton.addEventListener('click', () => {
        const iconElement = themeButton.querySelector('i');
        
        if (document.body.classList.contains(lightThemeClass)) {
            document.body.classList.replace(lightThemeClass, darkThemeClass);
            iconElement.className = 'fa-solid fa-moon';
        } else {
            document.body.classList.replace(darkThemeClass, lightThemeClass);
            iconElement.className = `fa-solid ${iconTheme}`;
        }
        
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });


    /* ==================== HERO TYPING ANIMATION ==================== */
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = JSON.parse(typingElement.getAttribute('data-words'));
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let delay = 200;

        function type() {
            const currentWord = words[wordIdx];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
                delay = 80;
            } else {
                typingElement.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
                delay = 150;
            }

            if (!isDeleting && charIdx === currentWord.length) {
                // Pause at complete word
                delay = 2000;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                delay = 500;
            }

            setTimeout(type, delay);
        }

        setTimeout(type, 1000);
    }


    /* ==================== WORK EXPERIENCE TABS ==================== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.experience-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSelector = btn.getAttribute('data-target');
            const targetContent = document.querySelector(targetSelector);

            // Deactivate other tabs
            tabButtons.forEach(t => t.classList.remove('active-tab'));
            tabContents.forEach(c => c.classList.remove('active-content'));

            // Activate current tab
            btn.classList.add('active-tab');
            if (targetContent) {
                targetContent.classList.add('active-content');
            }
        });
    });


    /* ==================== PROJECT FILTER ==================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Toggle active filter button class
            filterButtons.forEach(f => f.classList.remove('active-filter'));
            btn.classList.add('active-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset card transition styles
                card.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease';

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    /* ==================== CERTIFICATES LIGHTBOX MODAL ==================== */
    const certModal = document.getElementById('cert-modal');
    const certModalClose = document.getElementById('modal-close');
    const certButtons = document.querySelectorAll('.cert-view-btn');
    
    // Modal Element references
    const modalTitle = document.getElementById('modal-cert-title');
    const modalIssuer = document.getElementById('modal-cert-issuer');
    const modalDate = document.getElementById('modal-cert-date');
    const modalId = document.getElementById('modal-cert-id');

    certButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.cert-card');
            
            // Extract metadata from card dataset
            const title = card.getAttribute('data-cert-title');
            const issuer = card.getAttribute('data-cert-issuer');
            const date = card.getAttribute('data-cert-date');
            const id = card.getAttribute('data-cert-id');

            // Inject into modal elements
            if (modalTitle) modalTitle.textContent = title;
            if (modalIssuer) modalIssuer.textContent = issuer;
            if (modalDate) modalDate.textContent = date;
            if (modalId) modalId.textContent = id;

            // Open modal
            if (certModal) {
                certModal.classList.add('active-modal');
                document.body.style.overflow = 'hidden'; // Lock page scroll
            }
        });
    });

    // Close Modal
    function closeModal() {
        if (certModal) {
            certModal.classList.remove('active-modal');
            document.body.style.overflow = ''; // Unlock page scroll
        }
    }

    if (certModalClose) {
        certModalClose.addEventListener('click', closeModal);
    }

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                closeModal();
            }
        });
    }


    /* ==================== LIVE GITHUB SUB-SYSTEM ==================== */
    const username = 'sarafswamitra';
    const avatarEl = document.getElementById('github-avatar');
    const nameEl = document.getElementById('github-name');
    const loginEl = document.getElementById('github-user-login');
    const reposCountEl = document.getElementById('github-repos-count');
    const followersEl = document.getElementById('github-followers-count');
    const starsEl = document.getElementById('github-stars-count');
    const reposGrid = document.getElementById('github-repos-grid');

    // Color mapper for GitHub repository programming languages
    function getLangColor(lang) {
        const colors = {
            'Python': '#3572A5',
            'HCL': '#844FBA',
            'Terraform': '#844FBA',
            'Shell': '#89e051',
            'TypeScript': '#3178c6',
            'JavaScript': '#f1e05a',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Go': '#00ADD8'
        };
        return colors[lang] || '#8b949e';
    }

    // Dynamic mock fallback if API rate limits (unauthenticated limits: 60/hr)
    const mockProfile = {
        avatar_url: 'https://github.com/sarafswamitra.png',
        name: 'Swamitra Saraf',
        login: 'sarafswamitra',
        public_repos: 12,
        followers: 18,
        stars: 15
    };

    const mockRepos = [
        {
            name: 'gitops-aws-eks-pipeline',
            description: 'Automated GitOps pipeline for provisioning AWS EKS clusters with Nginx Ingress Controllers using Terraform and GitHub Actions.',
            language: 'HCL',
            stargazers_count: 5,
            forks_count: 2,
            html_url: 'https://github.com/sarafswamitra'
        },
        {
            name: 'multi-tier-secure-vpc',
            description: 'Production-grade AWS VPC infrastructure featuring public/private subnets, Security Groups, NACLs, Bastion Host, and ASG configuration.',
            language: 'HCL',
            stargazers_count: 4,
            forks_count: 1,
            html_url: 'https://github.com/sarafswamitra'
        },
        {
            name: 'automated-data-pipeline',
            description: 'Pipeline tasks leveraging Python scripts and shell scripting routines for automated system audits and containerized Docker tests.',
            language: 'Python',
            stargazers_count: 3,
            forks_count: 0,
            html_url: 'https://github.com/sarafswamitra'
        },
        {
            name: 'devops-config-templates',
            description: 'Reusable workflow templates, Dockerfiles, and Jenkinsfiles supporting automated software releases.',
            language: 'Shell',
            stargazers_count: 3,
            forks_count: 1,
            html_url: 'https://github.com/sarafswamitra'
        }
    ];

    function renderProfile(data) {
        if (avatarEl) avatarEl.src = data.avatar_url;
        if (nameEl) nameEl.textContent = data.name || 'Swamitra Saraf';
        if (loginEl) loginEl.textContent = `@${data.login}`;
        if (reposCountEl) reposCountEl.textContent = data.public_repos;
        if (followersEl) followersEl.textContent = data.followers;
    }

    function renderRepos(repos) {
        if (!reposGrid) return;
        reposGrid.innerHTML = '';
        
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'github-repo-card';
            card.innerHTML = `
                <div class="github-repo-title">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                        ${repo.name} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.7rem; color:var(--text-color-light);"></i>
                    </a>
                </div>
                <p class="github-repo-desc">${repo.description || 'No description available.'}</p>
                <div class="github-repo-meta">
                    <span class="github-repo-lang">
                        <span class="lang-dot" style="background-color: ${getLangColor(repo.language)}"></span>
                        ${repo.language || 'Plain Text'}
                    </span>
                    <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                </div>
            `;
            reposGrid.appendChild(card);
        });
    }

    async function fetchGitHubData() {
        try {
            // Fetch Profile
            const profileRes = await fetch(`https://api.github.com/users/${username}`);
            if (!profileRes.ok) throw new Error('API Rate Limited or User not found');
            const profileData = await profileRes.json();
            
            // Fetch Repos
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
            if (!reposRes.ok) throw new Error('API Rate Limited');
            const reposData = await reposRes.json();

            // Filter out forks and calculate stars
            const publicRepos = reposData.filter(repo => !repo.fork);
            const totalStars = publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

            // Update DOM with API Data
            renderProfile(profileData);
            if (starsEl) starsEl.textContent = totalStars;

            // Sort by stars descending, then take top 4
            const sortedRepos = publicRepos
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 4);
            
            renderRepos(sortedRepos.length > 0 ? sortedRepos : mockRepos.slice(0, sortedRepos.length || 4));
        } catch (error) {
            console.warn('GitHub API Fetch failed. Using mock portfolio data.', error.message);
            // Render Fallbacks
            renderProfile(mockProfile);
            if (starsEl) starsEl.textContent = mockProfile.stars;
            renderRepos(mockRepos);
        }
    }

    fetchGitHubData();


    /* ==================== SCROLL REVEAL ANIMATION ==================== */
    const revealElements = [
        '.hero-data', '.hero-visual',
        '.section-title', '.section-subtitle',
        '.about-details', '.education-timeline',
        '.experience-tabs-container',
        '.project-filters', '.project-card',
        '.github-container',
        '.cert-card',
        '.contact-info', '.contact-form'
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });

    const activeRevealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    activeRevealElements.forEach(el => {
        revealOnScroll.observe(el);
    });


    /* ==================== SCROLL SPY ACTIVE NAV LINK ==================== */
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);
    scrollActive(); // Run once on load


    /* ==================== CONTACT FORM (EmailJS) ==================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Configure your EmailJS keys here:
            const serviceID = 'YOUR_EMAILJS_SERVICE_ID'; // e.g. 'service_gmail'
            const templateID = 'YOUR_EMAILJS_TEMPLATE_ID'; // e.g. 'template_contact'
            const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';   // e.g. 'user_XXXXXXXXXXXXX'

            formStatus.className = 'form-status sending';
            formStatus.textContent = 'Sending message...';
            formSubmitBtn.disabled = true;

            // If keys are not configured, simulate successful send with a guide message
            if (publicKey.startsWith('YOUR') || serviceID.startsWith('YOUR')) {
                setTimeout(() => {
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = '<strong>Demo Mode:</strong> Message simulated! To receive actual emails, configure your EmailJS keys in <code>script.js</code>.';
                    contactForm.reset();
                    formSubmitBtn.disabled = false;
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 8000);
                }, 1500);
                return;
            }

            // Initialize EmailJS
            emailjs.init({
                publicKey: publicKey,
            });

            // Send form
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Message sent successfully! ✓';
                    contactForm.reset();
                    formSubmitBtn.disabled = false;
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, (error) => {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Failed to send message. Please check your EmailJS configurations.';
                    console.error('EmailJS Error:', error);
                    formSubmitBtn.disabled = false;
                });
        });
    }
});
