const CONFIG = {
    demo: {
        url: 'demo.html'
    },
    contact: {
        email: 'hello@aedauniversity.com'
    },
    static: true
};

const API = {
    handleGetStarted() {
        console.log('Redirecting to demo page');
        window.location.href = CONFIG.demo.url;
    },

    redirectToFrontend(route = '/') {
        console.log('Redirecting to demo page');
        window.location.href = CONFIG.demo.url;
    },

    showInfo() {
        const message = `Welcome to AeDA!
        
Try our interactive demo
Contact: ${CONFIG.contact.email}
This is a preview of our upcoming platform`;
        alert(message);
    }
};

function initDraggableCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach(card => {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        // Load saved position
        const cardId = card.classList.contains('card-1') ? 'card-1' : 
                      card.classList.contains('card-2') ? 'card-2' : 'card-3';
        const savedPosition = localStorage.getItem(`${cardId}-position`);
        
        if (savedPosition) {
            const position = JSON.parse(savedPosition);
            card.style.right = position.right;
            card.style.top = position.top;
        }
        
        // Mouse events
        card.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        
        // Touch events
        card.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', endDrag);
        
        function startDrag(e) {
            e.preventDefault();
            e.stopPropagation();
            
            isDragging = true;
            card.classList.add('dragging');
            
            const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
            
            const rect = card.getBoundingClientRect();
            const parentRect = card.parentElement.getBoundingClientRect();
            
            // Calculate offset from the center of the card
            startX = clientX - (rect.left + rect.width / 2);
            startY = clientY - (rect.top + rect.height / 2);
            
            // Get current position relative to parent
            const currentRight = parentRect.right - rect.right;
            const currentTop = rect.top - parentRect.top;
            
            initialX = currentRight;
            initialY = currentTop;
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            e.preventDefault();
            
            const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
            
            const parentRect = card.parentElement.getBoundingClientRect();
            
            // Calculate new position
            const newX = clientX - startX - parentRect.left;
            const newY = clientY - startY - parentRect.top;
            
            // Convert to right-based positioning
            const newRight = parentRect.width - newX - (card.offsetWidth / 2);
            const newTop = newY - (card.offsetHeight / 2);
            
            // Apply boundaries
            const maxRight = parentRect.width - card.offsetWidth;
            const maxTop = parentRect.height - card.offsetHeight;
            
            const boundedRight = Math.max(0, Math.min(maxRight, newRight));
            const boundedTop = Math.max(0, Math.min(maxTop, newTop));
            
            card.style.right = boundedRight + 'px';
            card.style.top = boundedTop + 'px';
        }
        
        function endDrag() {
            if (!isDragging) return;
            
            isDragging = false;
            card.classList.remove('dragging');
            
            // Save position
            const position = {
                right: card.style.right,
                top: card.style.top
            };
            localStorage.setItem(`${cardId}-position`, JSON.stringify(position));
        }
    });
}

// Navigation menu toggle for mobile
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('AeDA Website initialized successfully!');
    
    initDraggableCards();
    initMobileMenu();
    initSmoothScrolling();
    
    console.log('Running in static mode - demo functionality available');
});

window.addEventListener('resize', () => {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const parentRect = card.parentElement.getBoundingClientRect();
        
        if (rect.right > parentRect.right || rect.bottom > parentRect.bottom) {
            card.style.right = '';
            card.style.top = '';
        }
    });
});