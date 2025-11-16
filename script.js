// ===== Navigation Active State =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Update active nav link on scroll
    function updateActiveNav() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Smooth scroll to section on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // Set initial active state
    updateActiveNav();
});

// ===== Mobile Menu Toggle =====
function createMobileMenuButton() {
    if (window.innerWidth <= 768) {
        // Check if button doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1001;
                background: #2563eb;
                color: white;
                border: none;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            `;
            
            document.body.appendChild(menuBtn);
            
            const sidebar = document.querySelector('.sidebar');
            menuBtn.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
            
            // Close sidebar when clicking outside
            document.addEventListener('click', function(e) {
                if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    } else {
        // Remove mobile menu button if it exists
        const existingBtn = document.querySelector('.mobile-menu-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
    }
}

// Create mobile menu on load and resize
window.addEventListener('load', createMobileMenuButton);
window.addEventListener('resize', createMobileMenuButton);

// ===== Code Copy Functionality =====
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((block, index) => {
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.parentNode.insertBefore(wrapper, block.parentNode);
        wrapper.appendChild(block.parentNode);
        
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(37, 99, 235, 0.8);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s;
            z-index: 10;
        `;
        
        copyBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(37, 99, 235, 1)';
        });
        
        copyBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(37, 99, 235, 0.8)';
        });
        
        copyBtn.addEventListener('click', function() {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.textContent = 'Copied!';
                copyBtn.style.background = 'rgba(16, 185, 129, 0.8)';
                
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                    copyBtn.style.background = 'rgba(37, 99, 235, 0.8)';
                }, 2000);
            });
        });
        
        wrapper.appendChild(copyBtn);
    });
});

// ===== Search Functionality (Optional Enhancement) =====
function createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        padding: 1rem 2rem;
        border-bottom: 1px solid var(--border-color);
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        padding: 0.75rem;
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid #334155;
        border-radius: 6px;
        color: #f1f5f9;
        font-size: 0.875rem;
    `;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
    
    searchContainer.appendChild(searchInput);
    
    const sidebar = document.querySelector('.sidebar');
    const logo = sidebar.querySelector('.logo');
    logo.parentNode.insertBefore(searchContainer, logo.nextSibling);
}

// Uncomment to enable search:
// window.addEventListener('load', createSearchBox);

// ===== Progress Bar =====
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 280px;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #2563eb, #0ea5e9);
        transform-origin: left;
        transform: scaleX(0);
        z-index: 9999;
        transition: transform 0.1s;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height);
        progressBar.style.transform = `scaleX(${scrolled})`;
    });
    
    // Adjust for mobile
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            progressBar.style.left = '0';
        } else {
            progressBar.style.left = '280px';
        }
    });
}

window.addEventListener('load', createProgressBar);

// ===== Back to Top Button =====
function createBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    btn.addEventListener('mouseenter', function() {
        this.style.background = '#1d4ed8';
        this.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.background = '#2563eb';
        this.style.transform = 'scale(1)';
    });
    
    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(btn);
}

window.addEventListener('load', createBackToTop);

// ===== Print Optimization =====
window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections
    const details = document.querySelectorAll('details');
    details.forEach(detail => detail.setAttribute('open', ''));
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
    // Press 's' to focus search (if implemented)
    if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
        const searchInput = document.querySelector('.search-input');
        if (searchInput && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('active');
    }
});

// ===== Performance: Lazy Load Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// ===== Console Easter Egg =====
console.log('%c🚀 Applied AI Engineer Review Site', 'font-size: 20px; color: #2563eb; font-weight: bold;');
console.log('%cGood luck with your Automattic interview!', 'font-size: 14px; color: #0ea5e9;');
console.log('%cYou\'ve got this! 💪', 'font-size: 14px; color: #10b981;');