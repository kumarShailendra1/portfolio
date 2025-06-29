// Portfolio Data Configuration
// data.js - Portfolio Data Configuration
const portfolioData = {
    // Personal Information
    personal: {
        name: "Shailendra Kumar",
        title: "Data Engineer 2",
        tagline: "Building Scalable Systems & Data Platforms",
        description: "Results-driven Software Engineer with 5+ years of experience building scalable, high-performance backend systems and distributed architectures. Proven expertise in Java, Golang, and Kafka to design, implement, and optimize microservices powering mission-critical platforms. Adept at reducing system latency, increasing throughput, and enhancing data reliability across real-time and batch-processing pipelines.",
        profileImage: "images/my_pic.jpg", // Add your profile image path here
        resume: "resume.pdf", // Add your resume path here
        email: "shailendrakumarnirmal7524@gmail.com",
        phone: "+91-8840265502",
        location: "Bengaluru, Karnataka, IN"
    },

    // Navigation Links
    navigation: [
        { href: "#about", text: "About" },
        { href: "#timeline", text: "Experience" },
        { href: "skills.html", text: "Skills" },
        { href: "projects.html", text: "Projects" },
        { href: "contact.html", text: "Contact" }
    ],

    // Social Links
    social: [
        { icon: "fab fa-linkedin", url: "https://linkedin.com/in/shailendra-kumar", label: "LinkedIn" },
        { icon: "fab fa-github", url: "https://github.com/kumarShailendra1", label: "GitHub" },
        { icon: "fas fa-code", url: "https://leetcode.com/rathod1235", label: "LeetCode" },
        { icon: "fas fa-envelope", url: "mailto:shailendrakumarnirmal7524@gmail.com", label: "Email" }
    ],

    // Hero CTA Buttons
    heroCTA: [
        { text: "View Projects", href: "projects.html", class: "btn btn-primary" },
        { text: "Download Resume", href: "#", class: "btn btn-outline", download: true }
    ],

    // Technologies for the orbit
    technologies: [
        { 
            id: "golang", 
            icon: "fas fa-code", 
            name: "GoLang",
            description: "Expert in GoLang for scalable services and event processing systems"
        },
        { 
            id: "java", 
            icon: "fab fa-java", 
            name: "Java",
            description: "Proficient in Java & SpringBoot for microservices development"
        },
        { 
            id: "database", 
            icon: "fas fa-database", 
            name: "Databases",
            description: "Experience with MySQL, NoSQL, Redis, DynamoDB, and Apache Doris"
        },
        { 
            id: "kafka", 
            icon: "fas fa-stream", 
            name: "Kafka",
            description: "Stream processing with Apache Kafka and Apache Flink"
        },
        { 
            id: "docker", 
            icon: "fab fa-docker", 
            name: "Docker",
            description: "Containerization with Docker for scalable deployments"
        },
        { 
            id: "git", 
            icon: "fab fa-git-alt", 
            name: "Git",
            description: "Version control and collaborative development workflows"
        },
        { 
            id: "cloud", 
            icon: "fas fa-cloud", 
            name: "Cloud",
            description: "Experience with AWS and cloud-native architectures"
        }
    ],

    // About Section
    about: {
        title: "About Me",
        content: `
            <p>I'm a Data Engineer with 5+ years of experience building scalable, high-performance backend systems and distributed architectures. 
            My expertise spans from designing robust data platforms to implementing high-throughput event processing services.</p>
            
            <p>I specialize in GoLang, Java, SpringBoot, and stream processing technologies like Apache Kafka, Apache Flink, and Apache Doris. 
            My passion lies in solving complex technical challenges and creating data solutions that drive measurable business impact.</p>
            
            <p>When I'm not coding, you'll find me exploring new technologies, solving algorithmic challenges, 
            and continuously expanding my knowledge in system design and data architecture.</p>
        `
    },

    // Timeline/Experience
    timeline: [
        {
            year: "July 2023-Present",
            title: "Data Engineer 2",
            company: "Pixis",
            description: "Developed a scalable Golang event processing service handling 100K requests per minute with a 99% reduction in data loss. Designed and implemented a scalable data platform utilizing Kafka, S3 Data Lake in Parquet format, and Apache Doris as the data warehouse. This system efficiently processes over 1TB of data daily across 5,000+ pipelines, enabling real-time analytics and reducing reporting latency by 30%.",
            technologies: ["GoLang", "Kafka", "Apache Doris", "S3", "Parquet", "Data Platform"]
        },
        {
            year: "Mar 2022-July 2023",
            title: "Software Engineer",
            company: "Threedots",
            description: "Designed and developed new OTP Login/SignUp flow implementing mobile number verification system, reducing fraudulent user exploitation and costs by 25% annually. Developed the Watchlist Service from scratch, utilized by 50% of total users, increasing user retention by 15%. Built comprehensive User Activity Tracking Service with Mixpanel and WebEngage, contributing to 50% increase in actionable metrics.",
            technologies: ["GoLang", "Java", "Mixpanel", "WebEngage", "Microservices"]
        },
        {
            year: "July 2020-Feb 2022",
            title: "Software Engineer",
            company: "Ola Electric",
            description: "Developed comprehensive User Auth and SSO solution enabling concurrent logins across devices using JWT authentication, handling 50K requests per minute. Built Device Authentication and User Authentication Services, decreasing unauthorized login attempts by 40%. Designed URL Shortening Service reducing URL length by 70% and increasing usage by 25%.",
            technologies: ["Java", "SpringBoot", "JWT", "MQTT", "Authentication"]
        }
    ],

    // Skills
    skills: [
        {
            category: "Programming Languages",
            items: [
                { name: "GoLang", level: 95 },
                { name: "Java", level: 90 },
                { name: "Python", level: 75 },
                { name: "C/C++", level: 65 }
            ]
        },
        {
            category: "Frameworks & Technologies",
            items: [
                { name: "SpringBoot", level: 90 },
                { name: "Gin Framework", level: 88 },
                { name: "Microservices", level: 92 },
                { name: "Apache Flink", level: 85 }
            ]
        },
        {
            category: "Databases & Data Systems",
            items: [
                { name: "MySQL", level: 88 },
                { name: "Apache Doris", level: 85 },
                { name: "Redis", level: 85 },
                { name: "DynamoDB", level: 80 },
                { name: "MongoDB", level: 75 }
            ]
        },
        {
            category: "Messaging & Streaming",
            items: [
                { name: "Kafka", level: 90 },
                { name: "MQTT", level: 80 },
                { name: "Apache Parquet", level: 85 }
            ]
        },
        {
            category: "DevOps & Tools",
            items: [
                { name: "Docker", level: 85 },
                { name: "Git", level: 90 },
                { name: "AWS", level: 75 },
                { name: "Postman", level: 85 },
                { name: "JMeter", level: 70 }
            ]
        }
    ],

    // Contact Information
    contact: {
        message: "Feel free to reach out for collaborations or just a friendly chat.",
        email: "shailendrakumarnirmal7524@gmail.com",
        phone: "+91-8840265502",
        location: "Bengaluru, Karnataka, IN"
    },

    // Projects (based on work experience)
    projects: [
        {
            title: "Scalable Data Platform",
            description: "Designed and implemented a scalable data platform utilizing Kafka, S3 Data Lake in Parquet format, and Apache Doris as the data warehouse. This system efficiently processes over 1TB of data daily across 5,000+ pipelines, enabling real-time analytics and reducing reporting latency by 30%.",
            technologies: ["GoLang", "Kafka", "Apache Doris", "S3", "Parquet"],
            github: "#"
        },
        {
            title: "Event Processing Service",
            description: "Developed a scalable Golang event processing service handling 100K requests per minute with a 99% reduction in data loss. Integrated Kafka for data ingestion and secure API transfers, implemented exponential backoff retry mechanisms, and enhanced system resilience with Dead Letter Queues.",
            technologies: ["GoLang", "Kafka", "Microservices", "API Design"],
            github: "#"
        },
        {
            title: "User Activity Tracking System",
            description: "Built comprehensive User Activity Tracking Service leveraging Mixpanel and WebEngage to track and analyze user metrics within the application. This service contributed to a 50% increase in actionable metrics for business intelligence teams.",
            technologies: ["GoLang", "Mixpanel", "WebEngage", "Analytics"],
            github: "#"
        },
        {
            title: "Authentication & SSO Platform",
            description: "Developed comprehensive User Auth and SSO solution enabling concurrent logins across devices using JWT authentication, supporting multi-organization sign-ups and handling 50K requests per minute with 30% improved response time.",
            technologies: ["Java", "SpringBoot", "JWT", "Security"],
            github: "#"
        }
    ],

    // Achievements
    achievements: [
        { title: "The Spot Light Award", description: "Awarded at Ola Electric, Bangalore" },
        { title: "The Warthog of Backend", description: "Awarded at Threedots, Bangalore" },
        { title: "Pixis EOM", description: "Awarded at Pixis, Bangalore" }
    ],

    // Education
    education: {
        degree: "Bachelor of Technology in Electronics and Communication (ECE)",
        institution: "Indian Institute of Information Technology Allahabad",
        period: "Aug 2016 - July 2020",
        location: "Allahabad"
    },

    // Footer
    footer: {
        copyright: "© 2025 Shailendra Kumar. All rights reserved."
    }
};

// Make the data available globally
window.portfolioData = portfolioData;