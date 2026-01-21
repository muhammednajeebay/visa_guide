document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    setupMobileMenu();
});

async function fetchData() {
    try {
        const response = await fetch('/static/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderApp(data);
        setupScrollAnimations();
        
        // Hide Loader with slight delay for smoothness
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
        }, 800);
        
    } catch (error) {
        console.error('Error fetching data:', error);
        document.querySelector('.loading-text').textContent = "Error Loading Content";
    }
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe containers for staggered children
    document.querySelectorAll('.services-grid, .destinations-grid, .why-grid, .how-steps, .testimonials-grid').forEach(grid => {
        observer.observe(grid);
        // Add delay indices to children
        Array.from(grid.children).forEach((child, index) => {
            child.classList.add('stagger-item');
            child.style.setProperty('--delay', index);
        });
    });

    // Observe individual elements that aren't in grids
    document.querySelectorAll('.hero-content, .section-header, .about-content, .about-stats-grid').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function renderApp(data) {
    if (data.hero) renderHero(data.hero);
    if (data.about) renderAbout(data.about);
    if (data.services) renderServices(data.services);
    if (data.destinations) renderDestinations(data.destinations);
    if (data.whyChooseUs) renderWhyChooseUs(data.whyChooseUs);
    if (data.howItWorks) renderHowItWorks(data.howItWorks);
    if (data.testimonials) renderTestimonials(data.testimonials);
    if (data.faq) renderFAQ(data.faq);
    if (data.contact) renderContact(data.contact);
    if (data.footer) renderFooter(data.footer);

    // Setup navbar links based on sections
    renderNavbarLinks(); // Or use data.footer.quickLinks if preferred
}

/* --- Render Functions --- */

function renderNavbarLinks() {
    const linksContainer = document.getElementById('nav-links');
    const sections = ['About', 'Services', 'Destinations', 'FAQ', 'Contact'];
    
    // Clear existing
    linksContainer.innerHTML = '';
    
    sections.forEach(sec => {
        const a = document.createElement('a');
        a.href = `#${sec.toLowerCase()}`;
        a.textContent = sec;
        linksContainer.appendChild(a);
    });
}

function renderHero(hero) {
    const heroSection = document.getElementById('hero');
    heroSection.innerHTML = `
        <div class="container hero-container">
            <div class="hero-content fade-in">
                <h1>${hero.title}</h1>
                <p class="hero-subtitle">${hero.subtitle}</p>
                <div class="hero-highlights">
                   ${hero.highlights.slice(0, 2).map(h => `<span class="badge">✓ ${h}</span>`).join('')}
                </div>
                <div class="hero-actions">
                    <button class="btn-primary">${hero.ctaText}</button>
                    ${hero.highlights[3] ? `<button class="btn-outline">Learn More</button>` : ''}
                </div>
            </div>
            <!-- Illustration placeholder - using CSS background or separate container -->
        </div>
    `;
    
    // Trigger simple animation class
    setTimeout(() => {
        heroSection.querySelector('.hero-content').classList.add('visible');
    }, 100);
}

function renderAbout(about) {
    const container = document.getElementById('about-container');
    
    // Stats HTML
    const statsHtml = about.stats.map(stat => `
        <div class="stat-card">
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="about-content">
            <h2>${about.heading}</h2>
            ${about.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="about-stats-grid">
            ${statsHtml}
        </div>
    `;
}

function renderServices(services) {
    const header = document.getElementById('services-header');
    header.innerHTML = `
        <h2>${services.heading}</h2>
        <p>${services.description}</p>
    `;

    const grid = document.getElementById('services-grid');
    grid.innerHTML = services.items.map(item => `
        <div class="service-card">
            <div class="icon-placeholder">✈️</div> <!-- Placeholder icon -->
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="#" class="learn-more">${item.cta || 'Learn More'} →</a>
        </div>
    `).join('');
}

function renderDestinations(dest) {
    document.getElementById('destinations-header').innerHTML = `
        <h2>${dest.heading}</h2>
        <p>${dest.description}</p>
    `;
    
    document.getElementById('destinations-grid').innerHTML = dest.items.map(item => `
        <div class="destination-card">
            <div class="flag-img-container">
                <img src="https://flagcdn.com/w160/${item.flag}.png" alt="${item.name} Flag" class="flag-img">
            </div>
            <span class="country-name">${item.name}</span>
        </div>
    `).join('');

    document.getElementById('destinations-note').textContent = dest.note;
}

function renderWhyChooseUs(why) {
    document.getElementById('why-header').innerHTML = `
        <h2>${why.heading}</h2>
    `;
    
    document.getElementById('why-grid').innerHTML = why.reasons.map(r => `
        <div class="reason-item">
            <div class="check-icon">✓</div>
            <div>
                <h4>${r.title}</h4>
                <p>${r.description}</p>
            </div>
        </div>
    `).join('');
}

function renderHowItWorks(how) {
    document.getElementById('how-header').innerHTML = `<h2>${how.heading}</h2><p>${how.description}</p>`;
    
    document.getElementById('how-steps').innerHTML = how.steps.map(step => `
        <div class="step-card">
            <div class="step-number">${step.step}</div>
            <h4>${step.title}</h4>
            <p>${step.description}</p>
        </div>
    `).join('');
}

function renderTestimonials(testimonials) {
    document.getElementById('testimonials-header').innerHTML = `<h2>${testimonials.heading}</h2>`;
    
    document.getElementById('testimonials-grid').innerHTML = testimonials.items.map(t => `
        <div class="testimonial-card">
            <div class="stars">${'★'.repeat(t.rating)}</div>
            <p class="quote">"${t.text}"</p>
            <div class="client-info">
                <strong>${t.name}</strong>
                <span>${t.location}</span>
            </div>
        </div>
    `).join('');
}

function renderFAQ(faq) {
    document.getElementById('faq-header').innerHTML = `
        <h2>${faq.heading}</h2>
        <p>${faq.description}</p>
    `;
    
    const list = document.getElementById('faq-list');
    list.innerHTML = faq.items.map((item, index) => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFaq(this)">
                <span>${item.question}</span>
                <span class="toggle-icon">+</span>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');
}

function renderContact(contact) {
    const formWrapper = document.getElementById('contact-form-wrapper');
    const infoWrapper = document.getElementById('contact-info-wrapper');
    
    // Contact Info
    infoWrapper.innerHTML = `
        <h2>${contact.heading}</h2>
        <p>${contact.description}</p>
        <div class="contact-methods">
            ${contact.info.map(i => `
                <div class="method-item">
                    <strong>${i.title}:</strong> ${i.content}
                </div>
            `).join('')}
        </div>
        <div class="cta-box">
            <h3>${contact.ctaTitle}</h3>
            <p>${contact.ctaDescription}</p>
            <button class="btn-primary mt-4">${contact.ctaButton}</button>
        </div>
    `;
    
    // Form
    formWrapper.innerHTML = `
        <form class="contact-form">
            <div class="form-group">
                <input type="text" placeholder="Your Name" required>
            </div>
            <div class="form-group">
                <input type="email" placeholder="Email Address" required>
            </div>
            <div class="form-group">
                <select>
                    <option>Select Visa Type</option>
                    <option>Tourist</option>
                    <option>Business</option>
                    <option>Student</option>
                </select>
            </div>
            <div class="form-group">
                <textarea rows="4" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" class="btn-primary w-100">${contact.form.submitText}</button>
        </form>
    `;
}

function renderFooter(footer) {
    const footerEl = document.getElementById('footer');
    footerEl.innerHTML = `
        <div class="container footer-grid">
            <div class="footer-brand">
                <h3>${footer.brand}</h3>
                <p>${footer.description}</p>
            </div>
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>${footer.quickLinks.map(l => `<li><a href="${l.href}">${l.name}</a></li>`).join('')}</ul>
            </div>
            <div class="footer-services">
                <h4>Services</h4>
                <ul>${footer.services.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
            <div class="footer-contact">
                <h4>Contact</h4>
                <ul>${footer.contact.map(c => `<li>${c}</li>`).join('')}</ul>
            </div>
        </div>
        <div class="footer-bottom text-center">
            <p>${footer.copyright}</p>
        </div>
    `;
}

/* --- Interaction Logic --- */

function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple visual toggle for hamburger
        hamburger.classList.toggle('open'); 
    });
}

// Global scope for onclick
window.toggleFaq = function(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.toggle-icon');
    
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.textContent = '+';
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.textContent = '-';
    }
};
