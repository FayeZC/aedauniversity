document.addEventListener('DOMContentLoaded', function() {
    initializeDemo();
});

function initializeDemo() {
    if (document.getElementById('knowledge-svg')) {
        switchKnowledgeGraph('fundamentals');
    }
    
    const navTabs = document.querySelectorAll('.nav-tab');
    const demoSections = document.querySelectorAll('.demo-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            switchTab(targetTab);
            
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            simulateLoading();
        });
    });
    
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            controlBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const graphType = btn.getAttribute('data-graph');
            switchKnowledgeGraph(graphType);
        });
    });
    
    const knowledgeNodes = document.querySelectorAll('.knowledge-node');
    knowledgeNodes.forEach(node => {
        node.addEventListener('click', () => {
            const knowledgeType = node.getAttribute('data-knowledge');
            showKnowledgeDetail(knowledgeType);
        });
    });
    
    const colorModeSelect = document.getElementById('colorMode');
    if (colorModeSelect) {
        colorModeSelect.addEventListener('change', (e) => {
            updateGraphColorMode(e.target.value);
        });
    }
    
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            showCourseDetail(card);
        });
    });
    
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            simulateFileUpload();
        });
    }
    
    const endpointItems = document.querySelectorAll('.endpoint-item');
    endpointItems.forEach(item => {
        item.addEventListener('click', () => {
            toggleEndpointResponse(item);
        });
    });
    
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            simulateSearch();
        });
    }
    
    animateProgressBars();
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
    
    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
    card.style.zIndex = '10';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        card.style.zIndex = '1';
        
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
        
        const newFile = document.createElement('div');
        newFile.className = 'file-item';
        newFile.innerHTML = `
            <span class="file-name">new_lecture_${Date.now()}.pdf</span>
            <span class="file-status uploaded">Uploaded</span>
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
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
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
        showNotification('You\'re really exploring! Welcome to AeDA!');
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
    
    // Comprehensive Knowledge Point Data with Detailed Explanations
    const knowledgeData = {
        variables: {
            title: 'Variables and Data Types',
            description: 'Variables are the fundamental building blocks of programming, much like x and y in mathematics represent changeable values. In programming, variables are named storage locations in memory that hold different types of data.\n\nCore Concepts:\n• Declaration: Tell the computer to create a storage space\n• Initialization: Give the variable an initial value\n• Assignment: Change the variable\'s value\n\nMain Data Types:\n• Integer (int): like 42, -17, 0\n• Float (float): like 3.14, -2.5\n• String (string): like "Hello", "AeDA"\n• Boolean (boolean): true or false\n\nVariable Naming Rules:\n• Use meaningful names (age instead of a)\n• Follow camelCase convention (firstName)\n• Avoid keywords and special characters\n\nPractical Applications: In any program, variables store user input, calculation results, state information, etc. Mastering variables is the first step in learning programming.',
            prerequisites: [],
            resources: ['Variable Declaration & Initialization', 'Data Type Conversion', 'Scope Explained', 'Memory Management Basics'],
            problems: ['Variable Naming Conventions', 'Type Safety Checking', 'Scope Understanding', 'Memory Leak Prevention']
        },
        conditionals: {
            title: 'Conditional Statements',
            description: 'Conditional statements are the "decision-making brain" of programs, allowing code to execute different paths based on various conditions. They work like real-life "if...then..." logic.\n\nBasic Structure:\n• if statement: Execute code block if condition is true\n• else statement: Execute alternative code if condition is false\n• else if: Handle multiple conditions in a chain\n\nComparison Operators:\n• == equal, != not equal\n• > greater than, < less than\n• >= greater than or equal, <= less than or equal\n\nLogical Operators:\n• && (AND): Both conditions must be true\n• || (OR): Either condition can be true\n• ! (NOT): Negate the condition\n\nReal-world Scenarios:\n• User login validation: Check username and password\n• Age verification: Determine if user is adult\n• Game logic: Character health status\n• Form validation: Check if input is valid\n\nSwitch Statement: When handling multiple fixed values, switch is clearer and more efficient than multiple if-else statements.',
            prerequisites: ['Variables'],
            resources: ['Boolean Logic Fundamentals', 'Conditional Expression Design', 'Nested Condition Optimization', 'Ternary Operators'],
            problems: ['Complex Conditional Logic', 'Condition Nesting Depth', 'Edge Case Handling', 'Performance Optimization']
        },
        loops: {
            title: 'Loops and Iteration',
            description: 'Loops are the "repetition engines" of programming, allowing programs to automatically repeat code blocks and avoid writing the same code multiple times. They work like efficient assembly lines for batch processing.\n\nThree Main Loop Types:\n\n1. For Loop - Known iteration count\n• Syntax: for(initialization; condition; update)\n• Use cases: Array traversal, fixed repetitions\n• Example: Print numbers 1 to 10\n\n2. While Loop - Condition-driven loop\n• Syntax: while(condition)\n• Use cases: Unknown iteration count\n• Example: Read file until end\n\n3. Do-While Loop - Execute at least once\n• Syntax: do { code } while(condition)\n• Use cases: Execute first, then check condition\n• Example: User menu selection\n\nImportant Concepts:\n• Loop variable: Variable controlling iteration count\n• Loop body: Code block that repeats\n• Termination condition: Prevents infinite loops\n\nCommon Pitfalls:\n• Infinite loops: Forgetting to update loop condition\n• Off-by-one errors: Loop boundary mistakes\n\nPractical Applications: Data processing, UI updates, game main loops, batch file processing, etc.',
            prerequisites: ['Variables', 'Conditionals'],
            resources: ['Loop Design Patterns', 'Performance Optimization', 'Nested Loop Applications', 'Loop Invariants'],
            problems: ['Infinite Loop Debugging', 'Loop Efficiency Optimization', 'Boundary Condition Handling', 'Nested Loop Complexity']
        },
        functions: {
            title: 'Functions and Modularity',
            description: 'Functions are programming "toolboxes" that break complex problems into manageable chunks. Like mathematical functions f(x) = x², they accept input and produce output.\n\nCore Concepts:\n• Function definition: Create reusable code blocks\n• Function call: Execute a defined function\n• Parameters: Input data for the function\n• Return value: Output result from the function\n\nFunction Advantages:\n• Code reuse: Avoid writing the same logic repeatedly\n• Modularity: Break large problems into smaller ones\n• Easy testing: Test each functionality independently\n• Easy maintenance: Modify functionality in one place\n\nParameter Passing Methods:\n• Pass by value: Pass a copy of the data\n• Pass by reference: Pass the address of the data\n\nScope Concepts:\n• Local variables: Variables defined inside functions\n• Global variables: Variables accessible throughout the program\n• Parameter scope: Visibility of parameters within functions\n\nFunction Design Principles:\n• Single responsibility: Each function does one thing\n• Meaningful naming: Function names should describe functionality\n• Appropriate parameters: Not too many, not too few\n• Clear return values: Make function output explicit\n\nPractical Applications: Calculator functions, data validation, UI components, algorithm implementation, etc.',
            prerequisites: ['Variables', 'Conditionals', 'Loops'],
            resources: ['Function Design Principles', 'Parameter Passing Mechanisms', 'Recursion Fundamentals', 'Higher-Order Functions'],
            problems: ['Function Decomposition Strategy', 'Parameter Design Optimization', 'Return Value Handling', 'Scope Management']
        },
        arrays: {
            title: 'Arrays and Collections',
            description: 'Arrays are programming "storage boxes" that can store multiple data items of the same type in a single variable. Like books arranged in order on a shelf, each book has a fixed position number.\n\nBasic Concepts:\n• Elements: Each data item in the array\n• Index: Position of element in array (usually starts from 0)\n• Length: Number of elements the array contains\n• Contiguous storage: Elements arranged consecutively in memory\n\nArray Operations:\n• Access: Get element value through index\n• Modify: Change element value through index\n• Traverse: Visit all elements sequentially\n• Search: Find the position of a specific element\n\nCommon Array Methods:\n• Add elements: push(), unshift()\n• Remove elements: pop(), shift(), splice()\n• Find elements: indexOf(), find(), includes()\n• Transform arrays: map(), filter(), reduce()\n\nMulti-dimensional Arrays:\n• 2D arrays: Tabular data (like chessboard)\n• 3D arrays: Three-dimensional data structures\n• Access method: array[row][column]\n\nArrays vs Other Data Structures:\n• Advantages: Fast random access, high memory efficiency\n• Disadvantages: Slow insertion/deletion, fixed size\n\nPractical Applications:\n• Student grade lists\n• Shopping cart items\n• Game map data\n• Image pixel data\n• Audio sampling data',
            prerequisites: ['Variables', 'Loops'],
            resources: ['Array Algorithm Collection', 'Multi-dimensional Array Applications', 'Dynamic Array Implementation', 'Array Performance Analysis'],
            problems: ['Array Boundary Checking', 'Memory Management Optimization', 'Search Algorithm Selection', 'Sorting Algorithm Implementation']
        },
        strings: {
            title: 'String Processing',
            description: 'Strings are programming "text processors" used to handle and manipulate text data. In modern applications, text processing is everywhere, from user interfaces to data analysis.\n\nString Fundamentals:\n• Character sequence: Strings are ordered collections of characters\n• Immutability: In many languages, strings cannot be modified after creation\n• Character encoding: ASCII, UTF-8, Unicode, etc.\n• Escape characters: \\n (newline), \\t (tab), etc.\n\nCore Operations:\n• Concatenation: Merge multiple strings\n• Splitting: Break string by delimiter\n• Searching: Find substring position\n• Replacement: Replace content with new content\n• Extraction: Extract part of a string\n\nCommon String Methods:\n• length: Get string length\n• substring/slice: Extract substring\n• indexOf/search: Find substring\n• replace: Replace content\n• split: Split into array\n• trim: Remove whitespace\n\nRegular Expressions:\n• Pattern matching: Use special syntax to describe text patterns\n• Validation: Check email, phone number formats\n• Data extraction: Extract needed information from text\n• Batch replacement: Complex find and replace operations\n\nString Algorithms:\n• Palindrome detection: Check if string is symmetric\n• Character counting: Calculate character frequency\n• String matching: KMP, Boyer-Moore algorithms\n• Edit distance: Calculate string similarity\n\nPractical Applications:\n• User input validation\n• Text editor functionality\n• Log analysis\n• Natural language processing\n• Web content parsing',
            prerequisites: ['Variables', 'Arrays'],
            resources: ['Regular Expression Guide', 'Character Encoding Details', 'Text Algorithm Collection', 'Internationalization Handling'],
            problems: ['Character Encoding Handling', 'Performance Optimization', 'Pattern Matching Complexity', 'Memory Usage Optimization']
        },
        objects: {
            title: 'Objects and Classes',
            description: 'Objects are abstract representations of real-world entities in programming. Just like a real "car" has properties like color and brand, as well as behaviors like starting and braking.\n\nObject-Oriented Core Concepts:\n• Object: Collection of data and methods to operate on that data\n• Properties: Characteristics and state of the object\n• Methods: Operations the object can perform\n• Instance: Concrete implementation of a class\n\nObject Advantages:\n• Data encapsulation: Related data organized together\n• Real-world modeling: Closer to human thinking patterns\n• Code reuse: Objects can be used multiple times\n• Easy maintenance: Changes limited to object internals\n\nObject Creation Methods:\n• Literal syntax: {name: "John", age: 25}\n• Constructor function: new Person("John", 25)\n• Object.create(): Create based on prototype\n• ES6 class syntax: class Person {}\n\nObject Operations:\n• Property access: obj.property or obj["property"]\n• Property modification: obj.property = newValue\n• Method invocation: obj.method()\n• Property traversal: for...in loop\n\nPractical Application Examples:\n• User object: Name, email, login method\n• Product object: Price, inventory, purchase method\n• Game character: Health, skills, attack method\n• Graphics object: Coordinates, color, draw method',
            prerequisites: ['Functions', 'Arrays'],
            resources: ['Object Design Patterns', 'Prototype Chain Mechanism', 'Property Descriptors', 'Object Serialization'],
            problems: ['Object Design Principles', 'Memory Management', 'Property Access Optimization', 'Object Copying Strategies']
        },
        classes: {
            title: 'Classes and Inheritance',
            description: 'Classes are "blueprints" or "templates" for creating objects, defining the properties and methods that objects should have. Inheritance allows classes to share and extend features from other classes.\n\nCore Class Concepts:\n• Class definition: Template describing object structure\n• Constructor: Initialization method executed when creating objects\n• Instantiation: Process of creating specific objects from a class\n• Member variables: Properties defined in the class\n• Member methods: Functions defined in the class\n\nInheritance Mechanism:\n• Parent/Base class: The class being inherited from\n• Child/Derived class: The class that inherits from another\n• super keyword: Access parent class methods and properties\n• Method overriding: Child class redefines parent methods\n• Polymorphism: Same interface, different implementations\n\nAccess Control:\n• public: Open access\n• private: Private access (class internal only)\n• protected: Protected access (class and subclasses)\n• static: Static members (belong to class, not instance)\n\nDesign Principles:\n• Encapsulation: Hide internal implementation details\n• Inheritance: Reuse and extend existing code\n• Polymorphism: Unified interface, different implementations\n• Abstraction: Focus on what to do, not how to do it\n\nPractical Applications:\n• Animal class → Cat class, Dog class\n• Vehicle → Car, Airplane, Ship\n• UI Components → Button, Input field, Dialog\n• Data Structures → Stack, Queue, Tree',
            prerequisites: ['Objects', 'Functions'],
            resources: ['Design Pattern Applications', 'Inheritance vs Composition', 'Abstract Classes and Interfaces', 'Class Diagram Design'],
            problems: ['Inheritance Hierarchy Design', 'Diamond Inheritance Problem', 'Interface Design Principles', 'Code Reuse Strategies']
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
                        <h4>Description</h4>
                        <p>${data.description}</p>
                    </div>
                    <div class="knowledge-modal-section">
                        <h4>Prerequisites</h4>
                        <div class="knowledge-modal-tags">
                            ${data.prerequisites.length > 0 
                                ? data.prerequisites.map(p => `<span class="knowledge-tag prerequisite">${p}</span>`).join('')
                                : '<span class="no-prerequisites">No prerequisites needed</span>'
                            }
                        </div>
                    </div>
                    <div class="knowledge-modal-section">
                        <h4>Learning Resources</h4>
                        <div class="knowledge-modal-tags">
                            ${data.resources.map(r => `<span class="knowledge-tag resource">${r}</span>`).join('')}
                        </div>
                    </div>
                    <div class="knowledge-modal-section">
                        <h4>Practice Areas</h4>
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
        if (modal.escHandler) {
            document.removeEventListener('keydown', modal.escHandler);
        }
        
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    document.querySelectorAll('.knowledge-node').forEach(node => {
        node.classList.remove('selected');
    });
}

function closeKnowledgeDetail() {
    const detailPanel = document.getElementById('knowledge-detail');
    detailPanel.style.display = 'none';
    
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
    
    // Simply hide existing elements
    existingNodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.opacity = '0';
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
        
        // Simply show the node and set transform origin
        setTimeout(() => {
            group.style.opacity = '1';
            // Set transform origin to the center of the node for smooth scaling
            group.style.transformOrigin = `${node.x}px ${node.y}px`;
        }, index * 100 + 50);
        
        // Simple click handler - no animations
        group.addEventListener('click', () => {
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
    
    document.querySelector('.legend-item:nth-child(1) span').textContent = `Mastered (${stats.completed})`;
    document.querySelector('.legend-item:nth-child(2) span').textContent = `Learning (${stats.current})`;
    document.querySelector('.legend-item:nth-child(3) span').textContent = `Available (${stats.available})`;
    document.querySelector('.legend-item:nth-child(4) span').textContent = `Locked (${stats.locked})`;
    
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
        greeting = 'Good morning! Explore AeDA Demo';
    } else if (hour < 18) {
        greeting = 'Good afternoon! Discover AeDA';
    } else {
        greeting = 'Good evening! Experience AeDA';
    }
    
    // Update any greeting elements if they exist
    const greetingElements = document.querySelectorAll('.dynamic-greeting');
    greetingElements.forEach(el => {
        el.textContent = greeting;
    });
}

updateGreeting();
