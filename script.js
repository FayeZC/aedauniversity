// AeDA Website JavaScript
// Backend and Frontend Configuration
const CONFIG = {
    backend: {
        baseURL: 'http://localhost:8081',
        apiPath: '/api'
    },
    frontend: {
        baseURL: 'http://localhost:5174',
        routes: {
            home: '/',
            courses: '/courses',
            knowledgeGraph: '/knowledge-graph',
            teacherPortal: '/teacher-portal',
            profile: '/profile'
        }
    }
};

// API Functions
const API = {
    // Check if backend is running
    async checkBackend() {
        try {
            const response = await fetch(`${CONFIG.backend.baseURL}${CONFIG.backend.apiPath}/syllabi`);
            return response.ok;
        } catch (error) {
            console.warn('Backend not available:', error);
            return false;
        }
    },

    // Check if frontend is running
    async checkFrontend() {
        try {
            const response = await fetch(CONFIG.frontend.baseURL);
            return response.ok;
        } catch (error) {
            console.warn('Frontend not available:', error);
            return false;
        }
    },

    // Redirect to frontend application
    redirectToFrontend(route = '/') {
        const targetURL = `${CONFIG.frontend.baseURL}${route}`;
        console.log('Redirecting to frontend:', targetURL);
        window.open(targetURL, '_blank');
    },

    // Handle Get Started action
    async handleGetStarted() {
        const frontendAvailable = await this.checkFrontend();
        
        if (frontendAvailable) {
            this.redirectToFrontend(CONFIG.frontend.routes.home);
        } else {
            // Show fallback message
            this.showFallbackMessage();
        }
    },

    // Show fallback message when frontend is not available
    showFallbackMessage() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            ">
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    max-width: 500px;
                    text-align: center;
                    box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.1);
                ">
                    <h3 style="color: #6b46c1; font-size: 1.5rem; margin-bottom: 1rem;">
                        Frontend Application Starting
                    </h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        The AeDA learning platform is starting up. Please try again in a moment, or contact support if the issue persists.
                    </p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: linear-gradient(135deg, #6b46c1 0%, #6366f1 100%);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 0.5rem;
                        cursor: pointer;
                        font-weight: 600;
                    ">
                        Got it
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

// Draggable floating cards functionality
function initDraggableCards() {
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        let isDragging = false;
        let currentCard = null;
        let startX, startY;
        let offsetX, offsetY;
        
        // Prevent default dragging
        card.draggable = false;
        card.style.position = 'absolute';
        
        function startDrag(e) {
            const event = e.type === 'mousedown' ? e : e.touches[0];
            
            isDragging = true;
            currentCard = card;
            card.classList.add('dragging');
            
            // Get the mouse/touch position relative to the card center
            const rect = card.getBoundingClientRect();
            offsetX = event.clientX - rect.left - rect.width / 2;
            offsetY = event.clientY - rect.top - rect.height / 2;
            
            console.log('Started dragging:', card.textContent, 'Offset:', offsetX, offsetY);
            
            e.preventDefault();
        }
        
        function doDrag(e) {
            if (!isDragging || !currentCard) return;
            
            const event = e.type === 'mousemove' ? e : e.touches[0];
            
            // Calculate new position relative to the container
            const containerRect = currentCard.parentElement.getBoundingClientRect();
            const rect = currentCard.getBoundingClientRect();
            
            // Position based on center of card
            const newX = event.clientX - containerRect.left - rect.width / 2 - offsetX;
            const newY = event.clientY - containerRect.top - rect.height / 2 - offsetY;
            
            // Update card position
            currentCard.style.left = newX + 'px';
            currentCard.style.top = newY + 'px';
            currentCard.style.right = 'auto';
            currentCard.style.bottom = 'auto';
            
            e.preventDefault();
        }
        
        function endDrag(e) {
            if (!isDragging || !currentCard) return;
            
            isDragging = false;
            currentCard.classList.remove('dragging');
            
            // Save position
            const cardId = currentCard.classList.contains('card-1') ? 'card-1' : 
                          currentCard.classList.contains('card-2') ? 'card-2' : 'card-3';
            
            localStorage.setItem(`${cardId}-position`, JSON.stringify({
                left: currentCard.style.left,
                top: currentCard.style.top
            }));
            
            console.log('Finished dragging:', currentCard.textContent, 'Final position:', currentCard.style.left, currentCard.style.top);
            
            currentCard = null;
            e.preventDefault();
        }
        
        // Add event listeners to the card itself
        card.addEventListener('mousedown', startDrag);
        card.addEventListener('touchstart', startDrag, { passive: false });
        
        // Global move and end events
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', doDrag, { passive: false });
        document.addEventListener('touchend', endDrag);
        
        // Load saved position
        const cardId = card.classList.contains('card-1') ? 'card-1' : 
                      card.classList.contains('card-2') ? 'card-2' : 'card-3';
        
        const savedPosition = localStorage.getItem(`${cardId}-position`);
        if (savedPosition) {
            try {
                const position = JSON.parse(savedPosition);
                card.style.left = position.left;
                card.style.top = position.top;
                card.style.right = 'auto';
                card.style.bottom = 'auto';
                console.log('Loaded saved position for', cardId, ':', position);
            } catch (e) {
                console.log('Failed to load saved position for', cardId);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize draggable cards
    initDraggableCards();
    
    // 移动端导航菜单切换
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // 点击导航链接后关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // 平滑滚动
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 70; // 导航栏高度
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加背景模糊效果
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 数字动画效果
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = target.textContent;
                    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
                    const suffix = finalNumber.replace(/[\d]/g, '');
                    
                    let currentNumber = 0;
                    const increment = numericValue / 50;
                    
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= numericValue) {
                            currentNumber = numericValue;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(currentNumber) + suffix;
                    }, 30);
                    
                    observer.unobserve(target);
                }
            });
        });
        
        numbers.forEach(number => observer.observe(number));
    };
    
    // 卡片悬停效果增强
    const enhanceCardHovers = () => {
        const cards = document.querySelectorAll('.feature-card, .solution-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };
    
    // 页面加载动画
    const fadeInElements = () => {
        const elements = document.querySelectorAll('.feature-card, .solution-card, .hero-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
    };
    
    // 按钮点击波纹效果
    const addRippleEffect = () => {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    };
    
    // 视差滚动效果
    const addParallaxEffect = () => {
        const heroGraphic = document.querySelector('.hero-graphic');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (heroGraphic) {
                heroGraphic.style.transform = `translate(-50%, -50%) translateY(${parallax}px)`;
            }
        });
    };
    
    // 主题切换功能（未来扩展）
    const initThemeToggle = () => {
        // 检查本地存储的主题设置
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        }
    };
    
    // 性能优化：防抖函数
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    // 优化滚动性能
    const optimizeScrollPerformance = () => {
        let ticking = false;
        
        function updateScrollEffects() {
            // 这里放置所有滚动相关的效果
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    };
    
    // 添加服务状态指示器
    const addServiceStatusIndicator = async () => {
        const statusContainer = document.createElement('div');
        statusContainer.id = 'service-status';
        statusContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 12px 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(139, 92, 246, 0.2);
            font-size: 14px;
            z-index: 1000;
            transition: all 0.3s ease;
            cursor: pointer;
        `;
        
        // 检查服务状态
        const backendStatus = await API.checkBackend();
        const frontendStatus = await API.checkFrontend();
        
        const getStatusIcon = (status) => status ? '<span style="color: #10b981;">●</span>' : '<span style="color: #ef4444;">●</span>';
        const getStatusText = (status) => status ? 'Online' : 'Offline';
        
        statusContainer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-weight: 600; color: #6b46c1;">AeDA Services</span>
            </div>
            <div style="margin-top: 4px; font-size: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Backend:</span>
                    <span>${getStatusIcon(backendStatus)} ${getStatusText(backendStatus)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Frontend:</span>
                    <span>${getStatusIcon(frontendStatus)} ${getStatusText(frontendStatus)}</span>
                </div>
            </div>
        `;
        
        // 点击收缩/展开
        let isCollapsed = false;
        statusContainer.addEventListener('click', () => {
            isCollapsed = !isCollapsed;
            if (isCollapsed) {
                statusContainer.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: 600; color: #6b46c1;">AeDA</span>
                        <span>${getStatusIcon(backendStatus && frontendStatus)}</span>
                    </div>
                `;
            } else {
                statusContainer.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: 600; color: #6b46c1;">AeDA Services</span>
                    </div>
                    <div style="margin-top: 4px; font-size: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Backend:</span>
                            <span>${getStatusIcon(backendStatus)} ${getStatusText(backendStatus)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Frontend:</span>
                            <span>${getStatusIcon(frontendStatus)} ${getStatusText(frontendStatus)}</span>
                        </div>
                    </div>
                `;
            }
        });
        
        document.body.appendChild(statusContainer);
        
        // 自动收缩
        setTimeout(() => {
            statusContainer.click();
        }, 5000);
    };

    // 初始化所有功能
    const initializeWebsite = () => {
        animateNumbers();
        enhanceCardHovers();
        fadeInElements();
        addRippleEffect();
        addParallaxEffect();
        initThemeToggle();
        optimizeScrollPerformance();
        addServiceStatusIndicator();
        
        // 添加加载完成类
        document.body.classList.add('loaded');
        
        console.log('AeDA Website initialized successfully!');
        console.log('Backend API:', CONFIG.backend.baseURL);
        console.log('Frontend App:', CONFIG.frontend.baseURL);
    };
    
    // 延迟初始化以确保所有资源加载完成
    setTimeout(initializeWebsite, 100);
});

// 添加 CSS 动画类
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded * {
        animation-play-state: running;
    }
    
    /* 自定义滚动条 */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--gray-100);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary-400);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--primary-500);
    }
    
    /* 选中文本样式 */
    ::selection {
        background: var(--primary-200);
        color: var(--primary-800);
    }
    
    /* 焦点样式 */
    .btn:focus,
    .nav-link:focus {
        outline: 2px solid var(--primary-500);
        outline-offset: 2px;
    }
`;

document.head.appendChild(style);

// 错误处理
window.addEventListener('error', function(e) {
    console.warn('Website error:', e.error);
});

// 页面可见性API - 当页面不可见时暂停动画
document.addEventListener('visibilitychange', function() {
    const animations = document.querySelectorAll('.floating-card, .graphic-circle');
    
    if (document.hidden) {
        animations.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        animations.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});
