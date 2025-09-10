// AeDA Demo Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    initializeDemo();
});

function initializeDemo() {
    // Initialize knowledge graph
    if (document.getElementById('knowledge-svg')) {
        switchKnowledgeGraph('fundamentals');
    }
    
    // Tab navigation
    const navTabs = document.querySelectorAll('.nav-tab');
    const demoSections = document.querySelectorAll('.demo-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            switchTab(targetTab);
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    // Filter tabs for courses
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Simulate filtering (in real app, this would filter courses)
            simulateLoading();
        });
    });
    
    // Knowledge graph controls
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            controlBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Switch to different learning path
            const graphType = btn.getAttribute('data-graph');
            switchKnowledgeGraph(graphType);
        });
    });
    
    // Knowledge node interactions
    const knowledgeNodes = document.querySelectorAll('.knowledge-node');
    knowledgeNodes.forEach(node => {
        node.addEventListener('click', () => {
            const knowledgeType = node.getAttribute('data-knowledge');
            showKnowledgeDetail(knowledgeType);
        });
    });
    
    // Color mode selector
    const colorModeSelect = document.getElementById('colorMode');
    if (colorModeSelect) {
        colorModeSelect.addEventListener('change', (e) => {
            updateGraphColorMode(e.target.value);
        });
    }
    
    // Course card interactions
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            showCourseDetail(card);
        });
    });
    
    // Upload simulation
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            simulateFileUpload();
        });
    }
    
    // API endpoint interactions
    const endpointItems = document.querySelectorAll('.endpoint-item');
    endpointItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleEndpointResponse(item);
        });
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            simulateSearch();
        });
    }
    
    // Progress animations
    animateProgressBars();
    
    // Knowledge graph interactions
    initializeKnowledgeGraph();
}

function switchTab(tabName) {
    const sections = document.querySelectorAll('.demo-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`${tabName}-demo`);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Trigger specific animations for each section
        switch(tabName) {
            case 'courses':
                animateCoursesSection();
                break;
            case 'knowledge':
                animateKnowledgeGraph();
                break;
            case 'academic':
                animateAcademicProgram();
                break;
            case 'api':
                animateApiExplorer();
                break;
        }
    }
}

function simulateLoading() {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.opacity = '0.5';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

function updateKnowledgeGraph() {
    const nodes = document.querySelectorAll('.knowledge-node circle');
    nodes.forEach((node, index) => {
        node.style.transform = 'scale(0.8)';
        setTimeout(() => {
            node.style.transform = 'scale(1)';
        }, index * 50);
    });
    
    // Animate connections
    const lines = document.querySelectorAll('line');
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '0.6';
        }, index * 100 + 200);
    });
}

function showCourseDetail(card) {
    const courseName = card.querySelector('h3').textContent;
    
    // Create modal effect (simplified)
    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
    card.style.zIndex = '10';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        card.style.zIndex = '1';
        
        // Show notification
        showNotification(`Opening ${courseName}...`);
    }, 300);
}

function simulateFileUpload() {
    const uploadArea = document.querySelector('.upload-area');
    const fileList = document.querySelector('.file-list');
    
    uploadArea.style.background = 'linear-gradient(45deg, #8b5cf6, #a78bfa)';
    uploadArea.style.color = 'white';
    
    setTimeout(() => {
        uploadArea.style.background = 'white';
        uploadArea.style.color = 'inherit';
        
        // Add new file to list
        const newFile = document.createElement('div');
        newFile.className = 'file-item';
        newFile.innerHTML = `
            <span class="file-name">new_lecture_${Date.now()}.pdf</span>
            <span class="file-status uploaded">✓</span>
        `;
        newFile.style.opacity = '0';
        newFile.style.transform = 'translateY(-10px)';
        
        fileList.insertBefore(newFile, fileList.firstChild);
        
        setTimeout(() => {
            newFile.style.opacity = '1';
            newFile.style.transform = 'translateY(0)';
        }, 100);
        
        showNotification('File uploaded successfully!');
    }, 1000);
}

function toggleEndpointResponse(item) {
    const response = item.querySelector('.endpoint-response');
    const isVisible = response.style.display !== 'none';
    
    if (isVisible) {
        response.style.display = 'none';
        item.style.border = '1px solid var(--gray-200)';
    } else {
        response.style.display = 'block';
        item.style.border = '2px solid var(--primary-purple)';
        
        // Animate the response appearing
        response.style.opacity = '0';
        setTimeout(() => {
            response.style.opacity = '1';
        }, 100);
    }
}

function simulateSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const coursesGrid = document.querySelector('.courses-grid');
    
    searchInput.style.borderColor = 'var(--primary-purple)';
    
    // Simulate loading
    coursesGrid.style.opacity = '0.5';
    
    setTimeout(() => {
        coursesGrid.style.opacity = '1';
        searchInput.style.borderColor = 'var(--gray-200)';
        showNotification(`Found 3 courses matching "${searchInput.value}"`);
    }, 800);
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, index * 200 + 500);
    });
}

function animateCoursesSection() {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function animateKnowledgeGraph() {
    const nodes = document.querySelectorAll('.knowledge-node');
    const lines = document.querySelectorAll('line');
    
    // Hide all elements first
    nodes.forEach(node => {
        node.style.opacity = '0';
        node.style.transform = 'scale(0)';
    });
    
    lines.forEach(line => {
        line.style.opacity = '0';
    });
    
    // Animate nodes appearing
    nodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, index * 100);
    });
    
    // Animate connections
    setTimeout(() => {
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '0.6';
            }, index * 50);
        });
    }, nodes.length * 100);
}

function animateAcademicProgram() {
    // Animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animate course items
    setTimeout(() => {
        const courseItems = document.querySelectorAll('.course-item');
        courseItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }, 400);
    
    // Animate semester cards
    setTimeout(() => {
        const semesterCards = document.querySelectorAll('.semester-card');
        semesterCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 80);
        });
    }, 800);
}

function animateApiExplorer() {
    const endpointItems = document.querySelectorAll('.endpoint-item');
    endpointItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function initializeKnowledgeGraph() {
    const knowledgeNodes = document.querySelectorAll('.knowledge-node');
    
    knowledgeNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const circle = node.querySelector('circle');
            const currentFill = circle.getAttribute('fill');
            
            if (currentFill === '#10b981') { // Completed
                circle.style.filter = 'brightness(1.2)';
            } else if (currentFill === '#8b5cf6') { // Current
                circle.style.filter = 'brightness(1.2) saturate(1.3)';
            } else { // Locked
                circle.style.filter = 'brightness(0.8)';
            }
        });
        
        node.addEventListener('mouseleave', () => {
            const circle = node.querySelector('circle');
            circle.style.filter = 'none';
        });
        
        node.addEventListener('click', () => {
            const circle = node.querySelector('circle');
            const currentFill = circle.getAttribute('fill');
            
            if (currentFill !== '#d1d5db') { // Not locked
                // Simulate node expansion
                circle.style.transform = 'scale(1.5)';
                circle.style.filter = 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))';
                
                setTimeout(() => {
                    circle.style.transform = 'scale(1)';
                    circle.style.filter = 'none';
                }, 500);
                
                const nodeText = node.querySelector('text').textContent;
                showNotification(`Exploring ${nodeText} knowledge point...`);
            }
        });
    });
}

function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.demo-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'demo-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #8b5cf6, #a78bfa);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add some interactive easter eggs
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 20) {
        showNotification('🎉 You\'re really exploring! Welcome to AeDA!');
        clickCount = 0;
    }
});

// Knowledge Graph Enhanced Functions
function showKnowledgeDetail(knowledgeType) {
    const detailPanel = document.getElementById('knowledge-detail');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailPrerequisites = document.getElementById('detail-prerequisites');
    const detailResources = document.getElementById('detail-resources');
    const detailProblems = document.getElementById('detail-problems');
    
    // Knowledge point data
    const knowledgeData = {
        variables: {
            title: 'Variables and Data Types',
            description: 'Fundamental concept of storing and manipulating data in programs. Variables are containers that hold values of different types like numbers, text, and booleans.',
            prerequisites: [],
            resources: ['Interactive Tutorial', 'Video Lessons', 'Code Examples'],
            problems: ['Variable Declaration', 'Type Conversion', 'Scope Understanding']
        },
        conditionals: {
            title: 'Conditional Statements',
            description: 'Control structures that allow programs to make decisions based on different conditions using if, else if, and else statements.',
            prerequisites: ['Variables'],
            resources: ['Logic Flow Charts', 'Practice Problems', 'Real-world Examples'],
            problems: ['Boolean Logic', 'Nested Conditions', 'Switch Statements']
        },
        loops: {
            title: 'Loops and Iteration',
            description: 'Repetitive control structures including for loops, while loops, and do-while loops that allow code to execute multiple times.',
            prerequisites: ['Variables', 'Conditionals'],
            resources: ['Loop Patterns', 'Performance Tips', 'Common Mistakes'],
            problems: ['Loop Design', 'Infinite Loops', 'Nested Loops']
        },
        functions: {
            title: 'Functions and Modularity',
            description: 'Reusable blocks of code that perform specific tasks. Functions help organize code, reduce repetition, and improve maintainability.',
            prerequisites: ['Variables', 'Conditionals', 'Loops'],
            resources: ['Function Patterns', 'Best Practices', 'Parameter Passing'],
            problems: ['Function Design', 'Return Values', 'Scope Management']
        },
        arrays: {
            title: 'Arrays and Collections',
            description: 'Data structures that store multiple values in a single variable, allowing efficient organization and manipulation of related data.',
            prerequisites: ['Variables', 'Loops'],
            resources: ['Array Methods', 'Algorithms', 'Data Manipulation'],
            problems: ['Array Traversal', 'Searching', 'Sorting']
        },
        strings: {
            title: 'String Processing',
            description: 'Working with text data including string manipulation, formatting, pattern matching, and text processing algorithms.',
            prerequisites: ['Variables', 'Loops'],
            resources: ['String Methods', 'Regular Expressions', 'Text Algorithms'],
            problems: ['String Parsing', 'Pattern Matching', 'Text Validation']
        }
    };
    
    const data = knowledgeData[knowledgeType] || {
        title: 'Unknown Knowledge Point',
        description: 'This knowledge point is not yet available in the demo.',
        prerequisites: [],
        resources: [],
        problems: []
    };
    
    // Update panel content
    detailTitle.textContent = data.title;
    detailDescription.textContent = data.description;
    
    // Prerequisites
    detailPrerequisites.innerHTML = data.prerequisites.length > 0 
        ? data.prerequisites.map(p => `<span class="detail-tag">${p}</span>`).join('')
        : '<span style="color: #10b981; font-weight: 500;">No prerequisites</span>';
    
    // Resources
    detailResources.innerHTML = data.resources.map(r => 
        `<span class="detail-tag">${r}</span>`
    ).join('');
    
    // Problems
    detailProblems.innerHTML = data.problems.map(p => 
        `<span class="detail-tag">${p}</span>`
    ).join('');
    
    // Show modal with gentle click effect
    showKnowledgeModal(data);
    
    // Add highlight to selected node
    document.querySelectorAll('.knowledge-node').forEach(node => {
        node.classList.remove('selected');
    });
    const selectedNode = document.querySelector(`[data-knowledge="${knowledgeType}"]`);
    if (selectedNode) {
        selectedNode.classList.add('selected');
    }
    
    showNotification(`Exploring ${data.title}...`);
}

// Create and show knowledge modal
function showKnowledgeModal(data) {
    // Remove existing modal if any
    const existingModal = document.getElementById('knowledge-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div id="knowledge-modal" class="knowledge-modal-overlay">
            <div class="knowledge-modal-content">
                <div class="knowledge-modal-header">
                    <h3 class="knowledge-modal-title">${data.title}</h3>
                    <button class="knowledge-modal-close" onclick="closeKnowledgeModal()">×</button>
                </div>
                <div class="knowledge-modal-body">
                    <div class="knowledge-modal-section">
                        <h4>📖 Description</h4>
                        <p>${data.description}</p>
                    </div>
                    <div class="knowledge-modal-section">
                        <h4>📋 Prerequisites</h4>
                        <div class="knowledge-modal-tags">
                            ${data.prerequisites.length > 0 
                                ? data.prerequisites.map(p => `<span class="knowledge-tag prerequisite">${p}</span>`).join('')
                                : '<span class="no-prerequisites">✅ No prerequisites needed</span>'
                            }
                        </div>
                    </div>
                    <div class="knowledge-modal-section">
                        <h4>📚 Learning Resources</h4>
                        <div class="knowledge-modal-tags">
                            ${data.resources.map(r => `<span class="knowledge-tag resource">${r}</span>`).join('')}
                        </div>
                    </div>
                    <div class="knowledge-modal-section">
                        <h4>🎯 Practice Areas</h4>
                        <div class="knowledge-modal-tags">
                            ${data.problems.map(p => `<span class="knowledge-tag problem">${p}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="knowledge-modal-footer">
                    <button class="knowledge-modal-button primary" onclick="closeKnowledgeModal()">Start Learning</button>
                    <button class="knowledge-modal-button secondary" onclick="closeKnowledgeModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add animation class after a small delay
    setTimeout(() => {
        const modal = document.getElementById('knowledge-modal');
        if (modal) {
            modal.classList.add('show');
        }
    }, 10);
    
    // Close modal when clicking overlay
    document.getElementById('knowledge-modal').addEventListener('click', (e) => {
        if (e.target.classList.contains('knowledge-modal-overlay')) {
            closeKnowledgeModal();
        }
    });
    
    // Close modal with ESC key
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            closeKnowledgeModal();
        }
    };
    document.addEventListener('keydown', handleEscKey);
    
    // Store the handler for cleanup
    document.getElementById('knowledge-modal').escHandler = handleEscKey;
}

// Close knowledge modal
function closeKnowledgeModal() {
    const modal = document.getElementById('knowledge-modal');
    if (modal) {
        // Remove ESC key listener
        if (modal.escHandler) {
            document.removeEventListener('keydown', modal.escHandler);
        }
        
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    // Remove highlights
    document.querySelectorAll('.knowledge-node').forEach(node => {
        node.classList.remove('selected');
    });
}

function closeKnowledgeDetail() {
    const detailPanel = document.getElementById('knowledge-detail');
    detailPanel.style.display = 'none';
    
    // Remove highlights
    document.querySelectorAll('.knowledge-node').forEach(node => {
        node.classList.remove('selected');
    });
}

function updateGraphColorMode(mode) {
    const nodes = document.querySelectorAll('.knowledge-node circle');
    
    nodes.forEach(node => {
        const parentNode = node.parentElement;
        const knowledge = parentNode.getAttribute('data-knowledge');
        
        // Reset to default colors first
        if (parentNode.classList.contains('completed')) {
            node.setAttribute('fill', '#10b981');
        } else if (parentNode.classList.contains('current')) {
            node.setAttribute('fill', '#8b5cf6');
        } else if (parentNode.classList.contains('available')) {
            node.setAttribute('fill', '#f59e0b');
        } else {
            node.setAttribute('fill', '#d1d5db');
        }
        
        // Apply color mode
        if (mode === 'difficulty') {
            const difficultyColors = {
                'variables': '#10b981',      // Easy - Green
                'conditionals': '#f59e0b',   // Medium - Orange  
                'loops': '#f59e0b',          // Medium - Orange
                'functions': '#ef4444',      // Hard - Red
                'arrays': '#ef4444',         // Hard - Red
                'strings': '#8b5cf6'         // Medium-Hard - Purple
            };
            if (difficultyColors[knowledge]) {
                node.setAttribute('fill', difficultyColors[knowledge]);
            }
        } else if (mode === 'importance') {
            const importanceColors = {
                'variables': '#dc2626',      // Critical - Dark Red
                'conditionals': '#ea580c',   // Very Important - Orange Red
                'loops': '#d97706',          // Important - Orange
                'functions': '#dc2626',      // Critical - Dark Red
                'arrays': '#65a30d',         // Moderate - Green
                'strings': '#65a30d'         // Moderate - Green
            };
            if (importanceColors[knowledge]) {
                node.setAttribute('fill', importanceColors[knowledge]);
            }
        }
    });
    
    showNotification(`Color mode changed to: ${mode}`);
}

// Knowledge Graph Data for Different Paths
const knowledgeGraphs = {
    fundamentals: {
        title: "Programming Fundamentals",
        description: "Essential programming concepts for beginners",
        nodes: [
            { id: 'variables', name: 'Variables', subtitle: 'Data Types', status: 'completed', x: 150, y: 280 },
            { id: 'conditionals', name: 'IF', subtitle: 'Conditionals', status: 'current', x: 280, y: 200 },
            { id: 'loops', name: 'LOOP', subtitle: 'Loops', status: 'current', x: 280, y: 360 },
            { id: 'functions', name: 'FUNC', subtitle: 'Functions', status: 'available', x: 450, y: 140 },
            { id: 'arrays', name: 'ARR', subtitle: 'Arrays', status: 'available', x: 450, y: 260 },
            { id: 'strings', name: 'STR', subtitle: 'Strings', status: 'available', x: 450, y: 380 },
            { id: 'objects', name: 'OBJ', subtitle: 'Objects', status: 'locked', x: 620, y: 120 },
            { id: 'classes', name: 'CLASS', subtitle: 'Classes', status: 'locked', x: 620, y: 220 }
        ],
        stats: { completed: 1, current: 2, available: 3, locked: 2 }
    },
    datastructures: {
        title: "Data Structures",
        description: "Core data structures and their applications",
        nodes: [
            { id: 'arrays', name: 'ARRAY', subtitle: 'Arrays', status: 'completed', x: 150, y: 240 },
            { id: 'linkedlist', name: 'LIST', subtitle: 'Linked Lists', status: 'completed', x: 320, y: 180 },
            { id: 'stacks', name: 'STACK', subtitle: 'Stacks', status: 'current', x: 320, y: 300 },
            { id: 'queues', name: 'QUEUE', subtitle: 'Queues', status: 'current', x: 320, y: 420 },
            { id: 'trees', name: 'TREE', subtitle: 'Trees', status: 'available', x: 520, y: 140 },
            { id: 'graphs', name: 'GRAPH', subtitle: 'Graphs', status: 'available', x: 520, y: 240 },
            { id: 'hashtables', name: 'HASH', subtitle: 'Hash Tables', status: 'available', x: 520, y: 340 },
            { id: 'heaps', name: 'HEAP', subtitle: 'Heaps', status: 'locked', x: 700, y: 180 },
            { id: 'tries', name: 'TRIE', subtitle: 'Tries', status: 'locked', x: 700, y: 300 }
        ],
        stats: { completed: 2, current: 2, available: 3, locked: 2 }
    },
    algorithms: {
        title: "Advanced Algorithms",
        description: "Complex algorithms and optimization techniques",
        nodes: [
            { id: 'sorting', name: 'SORT', subtitle: 'Sorting', status: 'completed', x: 150, y: 210 },
            { id: 'searching', name: 'SEARCH', subtitle: 'Searching', status: 'completed', x: 150, y: 340 },
            { id: 'recursion', name: 'REC', subtitle: 'Recursion', status: 'current', x: 360, y: 180 },
            { id: 'dynamic', name: 'DP', subtitle: 'Dynamic Programming', status: 'current', x: 360, y: 280 },
            { id: 'greedy', name: 'GREEDY', subtitle: 'Greedy Algorithms', status: 'available', x: 360, y: 380 },
            { id: 'backtrack', name: 'BACK', subtitle: 'Backtracking', status: 'available', x: 580, y: 140 },
            { id: 'divide', name: 'D&C', subtitle: 'Divide & Conquer', status: 'available', x: 580, y: 240 },
            { id: 'graph-algo', name: 'GALGO', subtitle: 'Graph Algorithms', status: 'locked', x: 580, y: 340 },
            { id: 'optimization', name: 'OPT', subtitle: 'Optimization', status: 'locked', x: 780, y: 240 }
        ],
        stats: { completed: 2, current: 2, available: 3, locked: 2 }
    },
    fullstack: {
        title: "Full Stack Development",
        description: "Complete web development journey",
        nodes: [
            { id: 'html', name: 'HTML', subtitle: 'Structure', status: 'completed', x: 130, y: 180 },
            { id: 'css', name: 'CSS', subtitle: 'Styling', status: 'completed', x: 130, y: 300 },
            { id: 'javascript', name: 'JS', subtitle: 'Interactivity', status: 'completed', x: 130, y: 420 },
            { id: 'react', name: 'REACT', subtitle: 'Frontend Framework', status: 'current', x: 360, y: 240 },
            { id: 'nodejs', name: 'NODE', subtitle: 'Backend Runtime', status: 'current', x: 360, y: 360 },
            { id: 'database', name: 'DB', subtitle: 'Database', status: 'available', x: 580, y: 180 },
            { id: 'api', name: 'API', subtitle: 'REST APIs', status: 'available', x: 580, y: 300 },
            { id: 'auth', name: 'AUTH', subtitle: 'Authentication', status: 'available', x: 580, y: 420 },
            { id: 'deploy', name: 'DEPLOY', subtitle: 'Deployment', status: 'locked', x: 780, y: 240 },
            { id: 'devops', name: 'DEVOPS', subtitle: 'DevOps', status: 'locked', x: 780, y: 360 }
        ],
        stats: { completed: 3, current: 2, available: 3, locked: 2 }
    }
};

// Switch Knowledge Graph with animation
function switchKnowledgeGraph(graphType) {
    const graphData = knowledgeGraphs[graphType];
    if (!graphData) return;
    
    const svg = document.getElementById('knowledge-svg');
    
    // Fade out existing elements
    const existingNodes = svg.querySelectorAll('.knowledge-node');
    const existingLines = svg.querySelectorAll('line');
    
    // Animate existing elements out
    existingNodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.opacity = '0';
            node.style.transform = 'scale(0)';
        }, index * 30);
    });
    
    existingLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '0';
        }, index * 20);
    });
    
    // Clear and create new graph after animation
    setTimeout(() => {
        svg.innerHTML = '';
        createKnowledgeGraphAnimated(graphData);
        updateKnowledgeStats(graphData.stats);
        showNotification(`Switched to ${graphData.title}`);
    }, Math.max(existingNodes.length * 30, existingLines.length * 20) + 200);
}

// Create Knowledge Graph SVG with animation
function createKnowledgeGraphAnimated(graphData) {
    const svg = document.getElementById('knowledge-svg');
    
    // Create connections first (but hidden)
    const connections = generateConnections(graphData.nodes);
    connections.forEach((conn, index) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', conn.x1);
        line.setAttribute('y1', conn.y1);
        line.setAttribute('x2', conn.x2);
        line.setAttribute('y2', conn.y2);
        line.setAttribute('stroke', '#8b5cf6');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('opacity', '0');
        line.setAttribute('stroke-dasharray', '5,5');
        line.style.transition = 'opacity 0.4s ease';
        svg.appendChild(line);
        
        // Animate line appearing
        setTimeout(() => {
            line.setAttribute('opacity', '0.7');
        }, index * 50 + 300);
    });
    
    // Create nodes (initially hidden and scaled down)
    graphData.nodes.forEach((node, index) => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.classList.add('knowledge-node', node.status);
        group.setAttribute('data-knowledge', node.id);
        group.style.opacity = '0';
        group.style.transform = 'scale(0)';
        group.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', '25');
        circle.setAttribute('fill', getStatusColor(node.status));
        circle.setAttribute('stroke', getStatusStroke(node.status));
        circle.setAttribute('stroke-width', '3');
        
        // Main text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', getTextColor(node.status));
        text.setAttribute('font-size', '11');
        text.setAttribute('font-weight', 'bold');
        text.textContent = node.name;
        
        // Subtitle
        const subtitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        subtitle.setAttribute('x', node.x);
        subtitle.setAttribute('y', node.y + 40);
        subtitle.setAttribute('text-anchor', 'middle');
        subtitle.setAttribute('font-size', '9');
        subtitle.setAttribute('font-weight', '500');
        subtitle.setAttribute('fill', '#374151');
        subtitle.textContent = node.subtitle;
        
        group.appendChild(circle);
        group.appendChild(text);
        group.appendChild(subtitle);
        svg.appendChild(group);
        
        // Animate node appearing with spring effect
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'scale(1)';
        }, index * 100 + 50);
        
        // Add gentle click effect
        group.addEventListener('click', () => {
            // Gentle scale animation
            group.style.transform = 'scale(1.1)';
            setTimeout(() => {
                group.style.transform = 'scale(1)';
            }, 150);
            
            const knowledgeType = node.id;
            showKnowledgeDetail(knowledgeType);
        });
    });
}

// Create Knowledge Graph SVG (fallback without animation)
function createKnowledgeGraph(graphData) {
    createKnowledgeGraphAnimated(graphData);
}

// Generate connections between nodes
function generateConnections(nodes) {
    const connections = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < Math.min(i + 3, nodes.length); j++) {
            connections.push({
                x1: nodes[i].x,
                y1: nodes[i].y,
                x2: nodes[j].x,
                y2: nodes[j].y
            });
        }
    }
    return connections;
}

// Get status colors
function getStatusColor(status) {
    const colors = {
        completed: '#10b981',
        current: '#8b5cf6',
        available: '#f59e0b',
        locked: '#d1d5db'
    };
    return colors[status] || colors.locked;
}

function getStatusStroke(status) {
    const colors = {
        completed: '#059669',
        current: '#7c3aed',
        available: '#d97706',
        locked: '#9ca3af'
    };
    return colors[status] || colors.locked;
}

function getTextColor(status) {
    return status === 'locked' ? '#6b7280' : 'white';
}

// Update knowledge stats
function updateKnowledgeStats(stats) {
    const total = stats.completed + stats.current + stats.available + stats.locked;
    const progress = Math.round(((stats.completed + stats.current) / total) * 100);
    
    // Update legend counts
    document.querySelector('.legend-item:nth-child(1) span').textContent = `Mastered (${stats.completed})`;
    document.querySelector('.legend-item:nth-child(2) span').textContent = `Learning (${stats.current})`;
    document.querySelector('.legend-item:nth-child(3) span').textContent = `Available (${stats.available})`;
    document.querySelector('.legend-item:nth-child(4) span').textContent = `Locked (${stats.locked})`;
    
    // Update progress stats
    document.querySelector('.stat-item:nth-child(1) .stat-value').textContent = `${progress}% (${stats.completed + stats.current}/${total})`;
}

// Add CSS for selected node
const style = document.createElement('style');
style.textContent = `
    .knowledge-node.selected circle {
        stroke: #dc2626 !important;
        stroke-width: 4 !important;
        filter: drop-shadow(0 0 10px rgba(220, 38, 38, 0.5)) !important;
    }
`;
document.head.appendChild(style);

// Dynamic time-based greeting
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Welcome to AeDA Demo';
    
    if (hour < 12) {
        greeting = '🌅 Good morning! Explore AeDA Demo';
    } else if (hour < 18) {
        greeting = '☀️ Good afternoon! Discover AeDA';
    } else {
        greeting = '🌙 Good evening! Experience AeDA';
    }
    
    // Update any greeting elements if they exist
    const greetingElements = document.querySelectorAll('.dynamic-greeting');
    greetingElements.forEach(el => {
        el.textContent = greeting;
    });
}

updateGreeting();
