// contact-app.js - Contact Page Dynamic Content

document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    if (typeof portfolioData === 'undefined') {
        console.error('Portfolio data not found. Please ensure data.js is loaded.');
        return;
    }

    populateHeader();
    populateContactInfo();
    populateFooter();

    document.title = `Contact - ${portfolioData.personal.name}`;
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Populate Header with active Contact link
function populateHeader() {
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
        brandName.textContent = portfolioData.personal.name;
    }

    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const contactNav = [
            { href: 'index.html#about', text: 'About' },
            { href: 'index.html#timeline', text: 'Experience' },
            { href: 'skills.html', text: 'Skills' },
            { href: 'projects.html', text: 'Projects' },
            { href: 'contact.html', text: 'Contact', active: true }
        ];

        contactNav.forEach(link => {
            const navLink = document.createElement('a');
            navLink.href = link.href;
            navLink.className = link.active ? 'nav-link active' : 'nav-link';
            navLink.textContent = link.text;
            navLinks.appendChild(navLink);
        });
    }
}

// Populate Contact Information with all requested details
function populateContactInfo() {
    const contactGrid = document.querySelector('.contact-grid');
    const actionButtons = document.querySelector('.action-buttons');
    
    if (!contactGrid || !actionButtons) return;

    // Get email from contact object or personal object (fallback)
    const email = portfolioData.contact?.email || portfolioData.personal?.email || 'shailendrakumarnirmal65@gmail.com';
    const location = portfolioData.contact?.location || portfolioData.personal?.location || 'Bengaluru, Karnataka, IN';

    // Contact information with all requested details
    const contactInfo = [
        {
            icon: 'fas fa-envelope',
            title: 'Email',
            description: 'Drop me a line anytime',
            value: email,
            link: `mailto:${email}`,
            linkText: 'Send Email',
            linkIcon: 'fas fa-paper-plane'
        },
        {
            icon: 'fas fa-phone',
            title: 'Phone',
            description: 'Call me for immediate response',
            value: '+91 8840265502',
            link: 'tel:+918840265502',
            linkText: '+91 8840265502',
            linkIcon: 'fas fa-phone-alt'
        },
        {
            icon: 'fab fa-whatsapp',
            title: 'WhatsApp',
            description: 'Quick messages and calls',
            value: '+91 7524091205',
            link: 'https://wa.me/917524091205',
            linkText: '+91 7524091205',
            linkIcon: 'fab fa-whatsapp',
            external: true
        },
        {
            icon: 'fab fa-linkedin',
            title: 'LinkedIn',
            description: "Let's connect professionally",
            value: 'Professional Network',
            link: getLinkedInUrl(),
            linkText: 'Connect',
            linkIcon: 'fab fa-linkedin',
            external: true
        },
        {
            icon: 'fas fa-map-marker-alt',
            title: 'Location',
            description: 'Currently based in',
            value: location,
            link: '#',
            linkText: location,
            linkIcon: 'fas fa-location-dot',
            static: true
        }
    ];

    // Create contact cards
    contactInfo.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        contactCard.setAttribute('data-aos', 'fade-up');
        contactCard.setAttribute('data-aos-delay', index * 100);

        const staticClass = contact.static ? 'static-link' : '';
        const target = contact.external ? 'target="_blank" rel="noopener noreferrer"' : '';

        contactCard.innerHTML = `
            <div class="contact-icon">
                <i class="${contact.icon}"></i>
            </div>
            <h3>${contact.title}</h3>
            <p class="contact-info">${contact.description}</p>
            <a href="${contact.link}" class="contact-link ${staticClass}" ${target}>
                <i class="${contact.linkIcon}"></i>
                ${contact.linkText}
            </a>
        `;

        contactGrid.appendChild(contactCard);
    });

    // Create quick action buttons
    const quickActions = [
        {
            text: 'Email Me',
            icon: 'fas fa-envelope',
            link: `mailto:${email}`,
            primary: true
        },
        {
            text: 'WhatsApp',
            icon: 'fab fa-whatsapp',
            link: 'https://wa.me/917524091205',
            external: true
        },
        {
            text: 'Call Now',
            icon: 'fas fa-phone',
            link: 'tel:+918840265502'
        }
    ];

    quickActions.forEach(action => {
        const actionBtn = document.createElement('a');
        actionBtn.href = action.link;
        actionBtn.className = `action-btn ${action.primary ? 'primary' : ''}`;
        if (action.external) {
            actionBtn.target = '_blank';
            actionBtn.rel = 'noopener noreferrer';
        }

        actionBtn.innerHTML = `
            <i class="${action.icon}"></i>
            ${action.text}
        `;

        actionButtons.appendChild(actionBtn);
    });
}

// Helper function to get LinkedIn URL
function getLinkedInUrl() {
    // First try to find LinkedIn in the social array
    if (portfolioData.social) {
        const linkedInSocial = portfolioData.social.find(social => 
            social.label === 'LinkedIn' || 
            social.icon === 'fab fa-linkedin' ||
            social.url.includes('linkedin.com')
        );
        if (linkedInSocial) {
            return linkedInSocial.url;
        }
    }
    
    // Fallback to a default LinkedIn URL (you should update this)
    return 'https://linkedin.com/in/shailendra-kumar';
}

// Populate Footer (same as other pages)
function populateFooter() {
    const socialLinks = document.querySelector('footer .social-links');
    if (socialLinks) {
        portfolioData.social.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', social.label);

            const icon = document.createElement('i');
            icon.className = social.icon;
            link.appendChild(icon);

            socialLinks.appendChild(link);
        });
    }

    const footerName = document.getElementById('footer-name');
    if (footerName) {
        footerName.textContent = portfolioData.personal.name;
    }
}