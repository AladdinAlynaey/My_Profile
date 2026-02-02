/**
 * ALAADIN'S PORTFOLIO
 * Translation System - English & Arabic
 */

const translations = {
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            experience: "Experience",
            education: "Education",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact"
        },

        // Hero Section
        hero: {
            greeting: "Hello, I'm",
            name: "Alaadin",
            title: "AI Specialist | Data Engineer | Mathematics Teacher",
            typingTexts: ["AI Specialist", "Data Engineer", "AI Automation Engineer", "Data Analyst", "Mathematics Teacher"],
            description: "Passionate about creating advanced AI solutions, optimizing data pipelines, and turning complex data into actionable insights that drive innovation.",
            cta: {
                contact: "Get in Touch",
                projects: "View Projects"
            },
            stats: {
                experience: "Years Experience",
                projects: "Projects Completed",
                courses: "Courses Trained",
                students: "Students & Trainers Taught"
            }
        },

        // About Section
        about: {
            badge: "About Me",
            title: "Transforming Ideas Into",
            titleHighlight: "Intelligent Solutions",
            description1: "I'm an AI specialist with extensive experience in data engineering, analytics, and mathematics. My work focuses on creating advanced solutions for data processing, retrieval-augmented generation (RAG), and AI-driven analytics.",
            description2: "With a solid background in data science, deep learning, and big data analytics, I specialize in optimizing AI models, designing intelligent retrieval systems, and turning complex data into actionable insights that drive innovation and improve efficiency.",
            highlights: {
                ai: "AI & Machine Learning",
                data: "Data Engineering",
                automation: "AI Automation",
                analytics: "Advanced Analytics"
            },
            badges: {
                experience: "Years of Experience",
                automation: "AI Automation",
                projects: "Projects Done",
                students: "Students Taught"
            }
        },

        // Experience Section
        experience: {
            badge: "Experience",
            title: "Professional",
            titleHighlight: "Journey",
            description: "A track record of innovation and excellence in AI and data engineering",
            positions: [
                {
                    title: "AI Specialist",
                    company: "DeepSafer Company",
                    period: "Current",
                    description: "Leading AI initiatives in data engineering, integrating advanced techniques like RAG to improve performance and analysis. Leveraging Python and cloud tools to manage, clean, and analyze data effectively for AI-driven decision-making."
                },
                {
                    title: "AI Trainer & Projects Developer",
                    company: "AI Approach",
                    period: "2024",
                    description: "Led comprehensive AI training programs and developed innovative AI solutions. Designed custom AI projects using LLMs, RAG systems, and computer vision, mentoring teams on best practices."
                },
                {
                    title: "Mathematics Teacher",
                    company: "Multiple Prestigious Schools",
                    period: "2019 - 2023",
                    description: "Instructed students in mathematics at Ar-Rasheed Modern Schools, Future Leaders School, Rawabi Haddah, and Al-Nasser Institute, fostering deep understanding of core concepts and enhancing problem-solving skills."
                },
                {
                    title: "Human Resources Specialist",
                    company: "Office of Technical Education Yemen",
                    period: "2018",
                    description: "Contributed to HR department supporting various HR functions and initiatives at the Office of Technical Education and Vocational Training."
                },
                {
                    title: "Field Recorder",
                    company: "Tropical Data Organization",
                    period: "2017",
                    description: "Served as a Recorder in a comprehensive field survey for trachoma disease across the governorates of Ibb and Hodeidah."
                }
            ]
        },

        // Education Section
        education: {
            badge: "Education",
            title: "Academic",
            titleHighlight: "Background",
            description: "A strong foundation in technology and sciences",
            items: [
                {
                    title: "Bachelor's Degree",
                    institution: "International University of Technology Twinteck",
                    field: "Artificial Intelligence and Data Science",
                    icon: "fa-graduation-cap"
                },
                {
                    title: "High School Diploma",
                    institution: "Jamal Abdulnasser High School",
                    field: "Graduated with 98.25% - Top Students in Yemen",
                    icon: "fa-school"
                },
                {
                    title: "English Language Certificate",
                    institution: "A2Z English School",
                    field: "English as a Second Language (ESL)",
                    icon: "fa-language"
                }
            ]
        },

        // Skills Section
        skills: {
            badge: "Skills",
            title: "Technical",
            titleHighlight: "Expertise",
            description: "A comprehensive toolkit for building intelligent solutions",
            categories: {
                programming: {
                    title: "Programming Languages",
                    skills: ["Python", "Java", "C++", "JavaScript", "PHP", "Dart", "Assembly"]
                },
                ai: {
                    title: "AI & Machine Learning",
                    skills: ["Deep Learning", "NLP", "LLM", "RAG", "LangChain", "TensorFlow", "PyTorch", "Computer Vision"]
                },
                data: {
                    title: "Data & Analytics",
                    skills: ["Data Science", "Statistics", "Machine Learning", "Data Mining", "Big Data", "ETL"]
                },
                databases: {
                    title: "Databases",
                    skills: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Firebase", "Oracle", "PL/SQL"]
                },
                web: {
                    title: "Web & Frameworks",
                    skills: ["React", "Flask", "Web Development", "REST API", "Next.js"]
                },
                tools: {
                    title: "Tools & Cloud",
                    skills: ["AWS", "Git", "Docker", "Airflow", "Oracle Apex", "Flutter"]
                }
            }
        },

        // Projects Section
        projects: {
            badge: "Projects",
            title: "Featured",
            titleHighlight: "Work",
            description: "Innovative solutions that push the boundaries of AI and technology",
            filterAll: "All",
            filterAI: "AI/ML",
            filterData: "Data",
            filterWeb: "Web",
            moreInfo: "More information about each project will be available with source code on GitHub and Kaggle soon!",
            items: [
                { title: "CyberMind: AI-Powered Cybersecurity Assistant", category: "AI/ML" },
                { title: "RAG System for Document Q&A", category: "AI/ML" },
                { title: "ETL Pipeline with Airflow", category: "Data" },
                { title: "Real-Time Emotion Detection", category: "AI/ML" },
                { title: "Smart Web Scraping Pipeline", category: "Data" },
                { title: "AI Query Builder", category: "AI/ML" },
                { title: "Medicine Recognition App", category: "AI/ML" },
                { title: "Video Game Sales Analysis", category: "Data" },
                { title: "MCP Office Control Framework", category: "AI/ML" },
                { title: "Legal Inquiry System", category: "AI/ML" },
                { title: "ChefAI Recipe Recommendation", category: "AI/ML" },
                { title: "Automated Exam Generator", category: "AI/ML" },
                { title: "Hand Tracking Controller", category: "AI/ML" },
                { title: "Genetic Algorithm Dinosaur Game", category: "AI/ML" },
                { title: "Smart Music Manager", category: "Web" },
                { title: "Telegram Bot with Ollama", category: "AI/ML" }
            ]
        },

        // Contact Section
        contact: {
            badge: "Contact",
            title: "Let's Work",
            titleHighlight: "Together",
            description: "Have a project in mind? Let's discuss how we can collaborate",
            info: {
                email: "Email",
                phone: "Phone",
                location: "Location",
                locationValue: "Yemen"
            },
            form: {
                name: "Your Name",
                email: "Your Email",
                subject: "Subject",
                message: "Your Message",
                send: "Send Message",
                namePlaceholder: "John Doe",
                emailPlaceholder: "john@example.com",
                subjectPlaceholder: "Project Discussion",
                messagePlaceholder: "Tell me about your project..."
            },
            direct: "Or reach out directly:"
        },

        // Footer
        footer: {
            description: "AI Specialist dedicated to creating innovative solutions that transform complex data into actionable insights.",
            quickLinks: "Quick Links",
            services: "Services",
            newsletter: "Newsletter",
            newsletterText: "Subscribe to get updates on my latest projects and insights.",
            subscribe: "Subscribe",
            emailPlaceholder: "Enter your email",
            copyright: "© 2026 Alaadin. All rights reserved.",
            madeWith: "Made by Alaadin"
        },

        // Common
        common: {
            learnMore: "Learn More",
            viewAll: "View All",
            download: "Download CV",
            backToTop: "Back to Top"
        }
    },

    ar: {
        // Navigation
        nav: {
            home: "الرئيسية",
            about: "نبذة عني",
            experience: "الخبرات",
            education: "التعليم",
            skills: "المهارات",
            projects: "المشاريع",
            contact: "تواصل معي"
        },

        // Hero Section
        hero: {
            greeting: "مرحباً، أنا",
            name: "علاء الدين",
            title: "أخصائي ذكاء اصطناعي | مهندس بيانات | معلم رياضيات",
            typingTexts: ["أخصائي ذكاء اصطناعي", "مهندس بيانات", "مهندس أتمتة الذكاء الاصطناعي", "محلل بيانات", "معلم رياضيات"],
            description: "شغوف بإنشاء حلول ذكاء اصطناعي متقدمة، وتحسين خطوط البيانات، وتحويل البيانات المعقدة إلى رؤى قابلة للتنفيذ تدفع الابتكار.",
            cta: {
                contact: "تواصل معي",
                projects: "عرض المشاريع"
            },
            stats: {
                experience: "سنوات الخبرة",
                projects: "مشروع مكتمل",
                courses: "دورة تدريبية",
                students: "طالب تم تعليمهم"
            }
        },

        // About Section
        about: {
            badge: "نبذة عني",
            title: "تحويل الأفكار إلى",
            titleHighlight: "حلول ذكية",
            description1: "أنا متخصص في الذكاء الاصطناعي ولدي خبرة واسعة في هندسة البيانات والتحليلات والرياضيات. يركز عملي على إنشاء حلول متقدمة لمعالجة البيانات، والتوليد المعزز بالاسترجاع (RAG)، والتحليلات المدعومة بالذكاء الاصطناعي.",
            description2: "مع خلفية قوية في علوم البيانات والتعلم العميق وتحليلات البيانات الضخمة، أتخصص في تحسين نماذج الذكاء الاصطناعي، وتصميم أنظمة استرجاع ذكية، وتحويل البيانات المعقدة إلى رؤى قابلة للتنفيذ.",
            highlights: {
                ai: "الذكاء الاصطناعي والتعلم الآلي",
                data: "هندسة البيانات",
                automation: "أتمتة الذكاء الاصطناعي",
                analytics: "التحليلات المتقدمة"
            },
            badges: {
                experience: "سنوات من الخبرة",
                automation: "أتمتة الذكاء الاصطناعي",
                projects: "مشروع منجز",
                students: "طالب تم تدريبهم"
            }
        },

        // Experience Section
        experience: {
            badge: "الخبرات",
            title: "المسار",
            titleHighlight: "المهني",
            description: "سجل حافل بالابتكار والتميز في الذكاء الاصطناعي وهندسة البيانات",
            positions: [
                {
                    title: "أخصائي ذكاء اصطناعي",
                    company: "شركة DeepSafer",
                    period: "حالياً",
                    description: "قيادة مبادرات الذكاء الاصطناعي في هندسة البيانات، ودمج تقنيات متقدمة مثل RAG لتحسين الأداء والتحليل. استخدام Python وأدوات السحابة لإدارة وتنظيف وتحليل البيانات بفعالية."
                },
                {
                    title: "مدرب ومطور مشاريع AI",
                    company: "AI Approach",
                    period: "2024",
                    description: "قيادة برامج تدريبية شاملة على الذكاء الاصطناعي وتطوير حلول مبتكرة. تصميم مشاريع مخصصة باستخدام LLMs وأنظمة RAG والرؤية الحاسوبية."
                },
                {
                    title: "معلم رياضيات",
                    company: "مدارس متعددة مرموقة",
                    period: "2019 - 2023",
                    description: "تدريس الرياضيات في مدارس الرشيد الحديثة، ومدرسة قادة المستقبل، وروابي حدة، ومعهد الناصر، مع تعزيز الفهم العميق للمفاهيم الأساسية ومهارات حل المشكلات."
                },
                {
                    title: "أخصائي موارد بشرية",
                    company: "مكتب التعليم الفني والتدريب المهني",
                    period: "2018",
                    description: "المساهمة في قسم الموارد البشرية ودعم مختلف وظائف ومبادرات الموارد البشرية."
                },
                {
                    title: "مسجل بيانات ميداني",
                    company: "منظمة Tropical Data",
                    period: "2017",
                    description: "العمل كمسجل في مسح ميداني شامل لمرض التراخوما في محافظتي إب والحديدة."
                }
            ]
        },

        // Education Section
        education: {
            badge: "التعليم",
            title: "الخلفية",
            titleHighlight: "الأكاديمية",
            description: "أساس متين في التكنولوجيا والعلوم",
            items: [
                {
                    title: "درجة البكالوريوس",
                    institution: "الجامعة الدولية للتكنولوجيا توينتك",
                    field: "الذكاء الاصطناعي وعلوم البيانات",
                    icon: "fa-graduation-cap"
                },
                {
                    title: "شهادة الثانوية العامة",
                    institution: "ثانوية جمال عبد الناصر",
                    field: "تخرج بنسبة 98.25% - من أفضل الطلاب في اليمن",
                    icon: "fa-school"
                },
                {
                    title: "شهادة اللغة الإنجليزية",
                    institution: "مدرسة A2Z للغة الإنجليزية",
                    field: "اللغة الإنجليزية كلغة ثانية (ESL)",
                    icon: "fa-language"
                }
            ]
        },

        // Skills Section
        skills: {
            badge: "المهارات",
            title: "الخبرة",
            titleHighlight: "التقنية",
            description: "مجموعة أدوات شاملة لبناء الحلول الذكية",
            categories: {
                programming: {
                    title: "لغات البرمجة",
                    skills: ["Python", "Java", "C++", "JavaScript", "PHP", "Dart", "Assembly"]
                },
                ai: {
                    title: "الذكاء الاصطناعي والتعلم الآلي",
                    skills: ["التعلم العميق", "معالجة اللغات", "LLM", "RAG", "LangChain", "TensorFlow", "PyTorch", "الرؤية الحاسوبية"]
                },
                data: {
                    title: "البيانات والتحليلات",
                    skills: ["علوم البيانات", "الإحصاء", "التعلم الآلي", "التنقيب عن البيانات", "البيانات الضخمة", "ETL"]
                },
                databases: {
                    title: "قواعد البيانات",
                    skills: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Firebase", "Oracle", "PL/SQL"]
                },
                web: {
                    title: "تطوير الويب والأطر البرمجية",
                    skills: ["React", "Flask", "تطوير الويب", "REST API", "Next.js"]
                },
                tools: {
                    title: "الأدوات والسحابة",
                    skills: ["AWS", "Git", "Docker", "Airflow", "Oracle Apex", "Flutter"]
                }
            }
        },

        // Projects Section
        projects: {
            badge: "المشاريع",
            title: "الأعمال",
            titleHighlight: "المميزة",
            description: "حلول مبتكرة تدفع حدود الذكاء الاصطناعي والتكنولوجيا",
            filterAll: "الكل",
            filterAI: "الذكاء الاصطناعي",
            filterData: "البيانات",
            filterWeb: "الويب",
            moreInfo: "المزيد من المعلومات حول كل مشروع ستكون متاحة مع الكود المصدري على GitHub و Kaggle قريباً!",
            items: [
                { title: "CyberMind: مساعد الأمن السيبراني بالذكاء الاصطناعي", category: "AI/ML" },
                { title: "نظام RAG للأسئلة والأجوبة من المستندات", category: "AI/ML" },
                { title: "خط أنابيب ETL مع Airflow", category: "Data" },
                { title: "كشف المشاعر في الوقت الفعلي", category: "AI/ML" },
                { title: "خط سحب البيانات الذكي من الويب", category: "Data" },
                { title: "منشئ استعلامات بالذكاء الاصطناعي", category: "AI/ML" },
                { title: "تطبيق التعرف على الأدوية", category: "AI/ML" },
                { title: "تحليل مبيعات ألعاب الفيديو", category: "Data" },
                { title: "إطار التحكم MCP لـ Office", category: "AI/ML" },
                { title: "نظام الاستفسارات القانونية", category: "AI/ML" },
                { title: "ChefAI: توصيات الوصفات", category: "AI/ML" },
                { title: "مولد الامتحانات الآلي", category: "AI/ML" },
                { title: "متحكم تتبع اليد", category: "AI/ML" },
                { title: "لعبة الديناصور بالخوارزمية الجينية", category: "AI/ML" },
                { title: "مدير الموسيقى الذكي", category: "Web" },
                { title: "بوت تليجرام مع Ollama", category: "AI/ML" }
            ]
        },

        // Contact Section
        contact: {
            badge: "تواصل معي",
            title: "لنعمل",
            titleHighlight: "معاً",
            description: "هل لديك مشروع في ذهنك؟ دعنا نناقش كيف يمكننا التعاون",
            info: {
                email: "البريد الإلكتروني",
                phone: "الهاتف",
                location: "الموقع",
                locationValue: "اليمن"
            },
            form: {
                name: "اسمك",
                email: "بريدك الإلكتروني",
                subject: "الموضوع",
                message: "رسالتك",
                send: "إرسال الرسالة",
                namePlaceholder: "محمد أحمد",
                emailPlaceholder: "mohamed@example.com",
                subjectPlaceholder: "مناقشة مشروع",
                messagePlaceholder: "أخبرني عن مشروعك..."
            },
            direct: "أو تواصل مباشرة:"
        },

        // Footer
        footer: {
            description: "أخصائي ذكاء اصطناعي مكرس لإنشاء حلول مبتكرة تحول البيانات المعقدة إلى رؤى قابلة للتنفيذ.",
            quickLinks: "روابط سريعة",
            services: "الخدمات",
            newsletter: "النشرة الإخبارية",
            newsletterText: "اشترك للحصول على تحديثات حول أحدث مشاريعي ورؤاي.",
            subscribe: "اشتراك",
            emailPlaceholder: "أدخل بريدك الإلكتروني",
            copyright: "© 2026 علاء الدين. جميع الحقوق محفوظة.",
            madeWith: "صنع بـ ❤️ بواسطة علاء الدين"
        },

        // Common
        common: {
            learnMore: "اعرف المزيد",
            viewAll: "عرض الكل",
            download: "تحميل السيرة الذاتية",
            backToTop: "العودة للأعلى"
        }
    }
};

// Export for usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
