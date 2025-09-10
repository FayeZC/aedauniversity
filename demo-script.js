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
    
    // Comprehensive Knowledge Point Data with Detailed Explanations
    const knowledgeData = {
        variables: {
            title: 'Variables and Data Types',
            description: '变量是编程的基础构建块，就像数学中的 x、y 一样代表可变的值。在编程中，变量是内存中的命名存储位置，用来保存不同类型的数据。\n\n核心概念：\n• 声明：告诉计算机创建一个存储空间\n• 初始化：给变量赋予初始值\n• 赋值：更改变量的值\n\n主要数据类型：\n• 整数 (int)：如 42, -17, 0\n• 浮点数 (float)：如 3.14, -2.5\n• 字符串 (string)：如 "Hello", "AeDA"\n• 布尔值 (boolean)：true 或 false\n\n变量命名规则：\n• 使用有意义的名称（age 而不是 a）\n• 遵循驼峰命名法（firstName）\n• 避免关键字和特殊字符\n\n实际应用：在任何程序中，变量都用来存储用户输入、计算结果、状态信息等。掌握变量是学习编程的第一步。',
            prerequisites: [],
            resources: ['变量声明与初始化', '数据类型转换', '作用域详解', '内存管理基础'],
            problems: ['变量命名规范', '类型安全检查', '作用域理解', '内存泄漏预防']
        },
        conditionals: {
            title: 'Conditional Statements',
            description: '条件语句是程序的"决策大脑"，让程序能够根据不同情况执行不同的代码路径。就像现实生活中的"如果...那么..."逻辑。\n\n基本结构：\n• if 语句：如果条件为真，执行代码块\n• else 语句：如果条件为假，执行替代代码\n• else if：处理多个条件的链式判断\n\n比较操作符：\n• == 等于, != 不等于\n• > 大于, < 小于\n• >= 大于等于, <= 小于等于\n\n逻辑操作符：\n• && (AND)：两个条件都为真\n• || (OR)：任一条件为真\n• ! (NOT)：条件取反\n\n实际场景：\n• 用户登录验证：检查用户名和密码\n• 年龄判断：确定是否成年\n• 游戏逻辑：角色生命值判断\n• 表单验证：检查输入是否有效\n\nSwitch 语句：当需要处理多个固定值的判断时，switch 比多个 if-else 更清晰高效。',
            prerequisites: ['Variables'],
            resources: ['布尔逻辑基础', '条件表达式设计', '嵌套条件优化', '三元运算符'],
            problems: ['复杂条件逻辑', '条件嵌套深度', '边界条件处理', '性能优化']
        },
        loops: {
            title: 'Loops and Iteration',
            description: '循环是编程中的"重复执行器"，让程序能够自动重复执行代码块，避免重复编写相同代码。就像工厂流水线一样高效处理批量任务。\n\n三种主要循环类型：\n\n1. For 循环 - 已知次数的循环\n• 语法：for(初始化; 条件; 更新)\n• 适用：遍历数组、重复固定次数\n• 示例：打印 1 到 10 的数字\n\n2. While 循环 - 条件驱动的循环\n• 语法：while(条件)\n• 适用：不确定循环次数的情况\n• 示例：读取文件直到结束\n\n3. Do-While 循环 - 至少执行一次\n• 语法：do { 代码 } while(条件)\n• 适用：需要先执行再判断的场景\n• 示例：用户菜单选择\n\n重要概念：\n• 循环变量：控制循环次数的变量\n• 循环体：重复执行的代码块\n• 终止条件：防止无限循环的条件\n\n常见陷阱：\n• 无限循环：忘记更新循环条件\n• Off-by-one 错误：循环边界错误\n\n实际应用：数据处理、用户界面更新、游戏主循环、批量文件处理等。',
            prerequisites: ['Variables', 'Conditionals'],
            resources: ['循环设计模式', '性能优化技巧', '嵌套循环应用', '循环不变式'],
            problems: ['无限循环调试', '循环效率优化', '边界条件处理', '嵌套循环复杂度']
        },
        functions: {
            title: 'Functions and Modularity',
            description: '函数是编程的"工具箱"，将复杂问题分解成可管理的小块。就像数学中的函数 f(x) = x²，接受输入并产生输出。\n\n核心概念：\n• 函数定义：创建可重用的代码块\n• 函数调用：执行已定义的函数\n• 参数：函数的输入数据\n• 返回值：函数的输出结果\n\n函数的优势：\n• 代码重用：避免重复编写相同逻辑\n• 模块化：将大问题分解为小问题\n• 易于测试：独立测试每个功能\n• 易于维护：修改功能只需改一处\n\n参数传递方式：\n• 按值传递：传递数据的副本\n• 按引用传递：传递数据的地址\n\n作用域概念：\n• 局部变量：函数内部定义的变量\n• 全局变量：程序全局可访问的变量\n• 参数作用域：参数在函数内的可见性\n\n函数设计原则：\n• 单一职责：每个函数只做一件事\n• 有意义的命名：函数名要说明其功能\n• 适当的参数：不过多不过少\n• 清晰的返回值：明确函数的输出\n\n实际应用：计算器功能、数据验证、用户界面组件、算法实现等。',
            prerequisites: ['Variables', 'Conditionals', 'Loops'],
            resources: ['函数设计原则', '参数传递机制', '递归函数入门', '高阶函数概念'],
            problems: ['函数分解策略', '参数设计优化', '返回值处理', '作用域管理']
        },
        arrays: {
            title: 'Arrays and Collections',
            description: '数组是编程中的"整理箱"，能够在一个变量中存储多个相同类型的数据项。就像书架上按顺序排列的书籍，每本书都有固定的位置编号。\n\n基本概念：\n• 元素：数组中的每个数据项\n• 索引：元素在数组中的位置（通常从 0 开始）\n• 长度：数组包含的元素个数\n• 连续存储：元素在内存中连续排列\n\n数组操作：\n• 访问：通过索引获取元素值\n• 修改：通过索引更改元素值\n• 遍历：依次访问所有元素\n• 搜索：查找特定元素的位置\n\n常用数组方法：\n• 添加元素：push(), unshift()\n• 删除元素：pop(), shift(), splice()\n• 查找元素：indexOf(), find(), includes()\n• 变换数组：map(), filter(), reduce()\n\n多维数组：\n• 二维数组：表格形式的数据（如棋盘）\n• 三维数组：立体数据结构\n• 访问方式：array[row][column]\n\n数组 vs 其他数据结构：\n• 优势：随机访问快、内存效率高\n• 劣势：插入删除慢、大小固定\n\n实际应用：\n• 学生成绩列表\n• 购物车商品\n• 游戏地图数据\n• 图像像素数据\n• 音频采样数据',
            prerequisites: ['Variables', 'Loops'],
            resources: ['数组算法集合', '多维数组应用', '动态数组实现', '数组性能分析'],
            problems: ['数组边界检查', '内存管理优化', '查找算法选择', '排序算法实现']
        },
        strings: {
            title: 'String Processing',
            description: '字符串是编程中的"文本处理器"，用于处理和操作文本数据。在现代应用中，文本处理无处不在，从用户界面到数据分析。\n\n字符串基础：\n• 字符序列：字符串是字符的有序集合\n• 不可变性：很多语言中字符串创建后不可修改\n• 字符编码：ASCII、UTF-8、Unicode 等\n• 转义字符：\\n（换行）、\\t（制表符）等\n\n核心操作：\n• 连接：将多个字符串合并\n• 分割：按分隔符将字符串拆分\n• 搜索：查找子字符串位置\n• 替换：用新内容替换指定部分\n• 截取：提取字符串的一部分\n\n常用字符串方法：\n• length：获取字符串长度\n• substring/slice：截取子字符串\n• indexOf/search：查找子字符串\n• replace：替换内容\n• split：分割为数组\n• trim：去除空白字符\n\n正则表达式：\n• 模式匹配：用特殊语法描述文本模式\n• 验证功能：检查邮箱、电话号码格式\n• 提取数据：从文本中提取所需信息\n• 批量替换：复杂的查找替换操作\n\n字符串算法：\n• 回文检测：判断字符串是否对称\n• 字符统计：计算字符出现频率\n• 字符串匹配：KMP、Boyer-Moore 算法\n• 编辑距离：计算字符串相似度\n\n实际应用：\n• 用户输入验证\n• 文本编辑器功能\n• 日志分析\n• 自然语言处理\n• 网页内容解析',
            prerequisites: ['Variables', 'Arrays'],
            resources: ['正则表达式指南', '字符编码详解', '文本算法集合', '国际化处理'],
            problems: ['字符编码处理', '性能优化技巧', '模式匹配复杂度', '内存使用优化']
        },
        objects: {
            title: 'Objects and Classes',
            description: '对象是现实世界实体在编程中的抽象表示。就像现实中的"汽车"有颜色、品牌等属性，以及启动、刹车等行为。\n\n面向对象核心概念：\n• 对象：数据和操作数据方法的集合\n• 属性：对象的特征和状态\n• 方法：对象能执行的操作\n• 实例：类的具体实现\n\n对象的优势：\n• 数据封装：相关数据组织在一起\n• 现实建模：更接近人类思维方式\n• 代码重用：对象可以被多次使用\n• 易于维护：修改局限在对象内部\n\n对象创建方式：\n• 字面量语法：{name: "John", age: 25}\n• 构造函数：new Person("John", 25)\n• Object.create()：基于原型创建\n• ES6 类语法：class Person {}\n\n对象操作：\n• 属性访问：obj.property 或 obj["property"]\n• 属性修改：obj.property = newValue\n• 方法调用：obj.method()\n• 属性遍历：for...in 循环\n\n实际应用示例：\n• 用户对象：姓名、邮箱、登录方法\n• 商品对象：价格、库存、购买方法\n• 游戏角色：生命值、技能、攻击方法\n• 图形对象：坐标、颜色、绘制方法',
            prerequisites: ['Functions', 'Arrays'],
            resources: ['对象设计模式', '原型链机制', '属性描述符', '对象序列化'],
            problems: ['对象设计原则', '内存管理', '属性访问优化', '对象拷贝策略']
        },
        classes: {
            title: 'Classes and Inheritance',
            description: '类是创建对象的"蓝图"或"模板"，定义了对象应该具有的属性和方法。继承让类能够共享和扩展其他类的特性。\n\n类的基本概念：\n• 类定义：描述对象结构的模板\n• 构造函数：创建对象时执行的初始化方法\n• 实例化：根据类创建具体对象的过程\n• 成员变量：类中定义的属性\n• 成员方法：类中定义的函数\n\n继承机制：\n• 父类/基类：被继承的类\n• 子类/派生类：继承其他类的类\n• super 关键字：访问父类的方法和属性\n• 方法重写：子类重新定义父类方法\n• 多态：同一接口的不同实现\n\n访问控制：\n• public：公开访问\n• private：私有访问（仅类内部）\n• protected：保护访问（类和子类）\n• static：静态成员（属于类而非实例）\n\n设计原则：\n• 封装：隐藏内部实现细节\n• 继承：复用和扩展现有代码\n• 多态：统一接口，不同实现\n• 抽象：关注要做什么，而非怎么做\n\n实际应用：\n• 动物类 → 猫类、狗类\n• 交通工具 → 汽车、飞机、船\n• UI组件 → 按钮、输入框、对话框\n• 数据结构 → 栈、队列、树',
            prerequisites: ['Objects', 'Functions'],
            resources: ['设计模式应用', '继承vs组合', '抽象类接口', '类图设计'],
            problems: ['继承层次设计', '菱形继承问题', '接口设计原则', '代码复用策略']
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
        group.style.transformOrigin = 'center';
        
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
        
        // Add subtle click effect
        group.addEventListener('click', () => {
            // Very gentle pulse animation - just a micro scale
            const originalTransition = group.style.transition;
            group.style.transition = 'transform 0.1s ease-out';
            group.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                group.style.transition = 'transform 0.1s ease-in';
                group.style.transform = 'scale(1)';
                
                // Restore original transition after animation
                setTimeout(() => {
                    group.style.transition = originalTransition;
                }, 100);
            }, 100);
            
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
