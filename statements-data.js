/* =========================================================
   ZYPHOR'26 — statements-data.js
   Official Hackathon Problem Statements (20 AI & 20 IoT)
   ========================================================= */

export const DOMAIN_STATEMENTS = {
  AI: [
    { id: "AI01", title: "The Intelligent Campus Helpdesk", description: "Build an AI assistant that understands student and staff requests across academics, facilities, events, and administration, routes each request to the correct service, and keeps track of unresolved issues until they are addressed.", category: "AI Agents & Smart Campus", level: "Advanced" },
    { id: "AI02", title: "The Personal Study Planner", description: "Create an AI system that analyzes a student's subjects, available study time, assessment dates, past performance, and learning progress to generate and continuously adapt a realistic study plan.", category: "EdTech & Recommendation AI", level: "Advanced" },
    { id: "AI03", title: "The Intelligent Expense Anomaly Detector", description: "Develop an AI system that learns normal spending patterns from transaction records and identifies unusual expenses, duplicate transactions, suspicious combinations, and emerging financial anomalies with explainable evidence.", category: "FinTech & Anomaly Detection", level: "Advanced" },
    { id: "AI04", title: "The Visual Inventory Auditor", description: "Build a computer vision solution that analyzes shelf or warehouse images to identify missing products, misplaced items, low-stock conditions, and visible inventory inconsistencies without requiring a complete manual count.", category: "Computer Vision & Retail Intelligence", level: "Advanced" },
    { id: "AI05", title: "The Intelligent Customer Support Agent", description: "Create an AI agent that understands customer conversations, retrieves relevant knowledge, identifies the actual issue, suggests suitable resolutions, and escalates cases when human intervention is necessary.", category: "Conversational AI & Service Automation", level: "Advanced" },
    { id: "AI06", title: "The Traffic Incident Understanding Agent", description: "Develop an AI system that combines traffic camera observations and available incident reports to identify possible accidents, road blockages, or unusual traffic events and communicate actionable information to traffic operators.", category: "Computer Vision & Smart Transportation", level: "Advanced" },
    { id: "AI07", title: "The Intelligent Resume-to-Role Matcher", description: "Build an AI system that compares resumes, project experience, certifications, and job requirements to identify suitable roles, explain matching strengths, and highlight evidence that supports each recommendation.", category: "NLP & Career Intelligence", level: "Advanced" },
    { id: "AI08", title: "The Document Forgery Screening Assistant", description: "Create an AI solution that examines uploaded documents for suspicious visual, textual, metadata, or structural inconsistencies and presents evidence that can help a reviewer decide whether further verification is required.", category: "Document AI & Fraud Detection", level: "Advanced" },
    { id: "AI09", title: "The Multimodal Search Assistant", description: "Develop an AI search system that allows users to retrieve relevant information using combinations of text, images, audio, and structured metadata while explaining why each result matches the request.", category: "Multimodal AI & Information Retrieval", level: "Advanced" },
    { id: "AI10", title: "The AI Resource Allocation Planner", description: "Build an AI system that allocates limited resources such as rooms, equipment, staff time, or service slots while considering priorities, constraints, conflicts, and changing requirements.", category: "AI Optimization & Decision Intelligence", level: "Advanced" },
    {
      id: "AI11",
      title: "The Missing Person Investigation Agent",
      description: "A person goes missing and investigators receive fragmented information from CCTV footage, witness statements, social media activity, location history, and other available records. The information is incomplete, noisy, and spread across different sources, making it difficult to identify meaningful connections and determine the person's most probable movements.",
      category: "AI Agents & Intelligent Investigation",
      level: "Advanced"
    },
    {
      id: "AI12",
      title: "The Overwhelmed SOC Analyst",
      description: "A security operations center receives thousands of alerts from endpoints, networks, applications, and authentication systems. Many alerts are harmless or duplicated, while a small number may indicate a coordinated cyberattack. The challenge is to automatically correlate related alerts, determine their severity, identify attack patterns, and prioritize the incidents that require immediate attention.",
      category: "Cybersecurity AI & Autonomous Agents",
      level: "Advanced"
    },
    {
      id: "AI13",
      title: "The Meeting That Forgot Everything",
      description: "Important decisions, tasks, deadlines, and responsibilities are discussed across long and unstructured meetings. Participants may interrupt each other, change decisions, or leave actions implied rather than explicitly stated. The challenge is to understand the conversation, identify decisions and commitments, assign responsibilities, and generate an accurate actionable summary.",
      category: "NLP & Meeting Intelligence",
      level: "Advanced"
    },
    {
      id: "AI14",
      title: "The Last-Mile Delivery Puzzle",
      description: "A logistics company must deliver hundreds of packages while dealing with traffic, delivery time windows, vehicle capacity, changing road conditions, failed deliveries, and dynamically changing customer locations. A route that appears optimal initially may become inefficient as conditions change, requiring the AI to continuously adapt delivery routes and priorities.",
      category: "AI Optimization & Intelligent Logistics",
      level: "Advanced"
    },
    {
      id: "AI15",
      title: "The Disaster Response Coordinator",
      description: "During a disaster, emergency information arrives from weather systems, sensors, emergency calls, social media, satellite imagery, and field teams at different times and with varying reliability. The AI must combine these signals to identify critical areas, estimate changing risks, prioritize emergency resources, and recommend response actions while conditions continue to evolve.",
      category: "AI Agents & Emergency Decision Intelligence",
      level: "Advanced"
    },
    {
      id: "AI16",
      title: "The Face That Never Existed",
      description: "A suspicious image or video appears authentic but may have been digitally manipulated using generative AI. Facial expressions, lighting, lip movements, audio, and visual artifacts may contain subtle inconsistencies that are difficult for humans to notice. The challenge is to detect whether the media has been manipulated and provide explainable evidence supporting the decision.",
      category: "Generative AI Security & Computer Vision",
      level: "Advanced"
    },
    {
      id: "AI17",
      title: "The Hidden Skill Gap",
      description: "A student's or employee's current skills do not clearly match the skills required for a target role. Resumes, project experience, assessments, certifications, and job descriptions provide different and sometimes incomplete information. The AI must identify missing skills, distinguish critical gaps from minor ones, and generate a personalized learning path to bridge those gaps.",
      category: "AI Recommendation & Skill Intelligence",
      level: "Advanced"
    },
    {
      id: "AI18",
      title: "The Product That Looks Real",
      description: "Counterfeit products are increasingly difficult to distinguish from genuine products because packaging, labels, logos, QR codes, and product appearance can be closely imitated. The AI must analyze visual and textual product characteristics along with available product information to estimate authenticity and identify suspicious inconsistencies.",
      category: "Computer Vision & AI-Based Fraud Detection",
      level: "Advanced"
    },
    {
      id: "AI19",
      title: "The Attack Before It Happens",
      description: "A network appears normal even though subtle changes in login behavior, network traffic, system activity, and access patterns may indicate that an attacker is preparing for a larger cyberattack. Traditional systems often detect threats only after malicious activity occurs. The challenge is to learn early behavioral signals and predict the likelihood of an upcoming attack before significant damage occurs.",
      category: "Predictive AI & Cybersecurity Intelligence",
      level: "Advanced"
    },
    {
      id: "AI20",
      title: "The Memory Gap",
      description: "An AI assistant interacts with a user across many conversations but gradually loses important context, causing it to forget previous decisions, commitments, preferences, and relationships between pieces of information. Some memories may also conflict, become outdated, or lack sufficient evidence. The challenge is to build an intelligent memory system that decides what information should be retained, updated, connected, or forgotten while maintaining accurate long-term context.",
      category: "Generative AI & Long-Term Memory",
      level: "Advanced"
    }
  ],

  IoT: [
    {
      id: "IOT01",
      title: "Smart Classroom Guardian",
      description: "Build an IoT system that detects whether a classroom is being used efficiently and automatically manages unnecessary devices. It should identify situations such as an empty room with lights or fans running and take suitable action.",
      category: "Smart Campus & Energy Management",
      level: "Intermediate"
    },
    {
      id: "IOT02",
      title: "Smart Student Bag",
      description: "Design an IoT-enabled student bag that detects situations such as unusual weight, forgotten items, or unexpected movement. The system should provide useful alerts without requiring the student to continuously check the bag.",
      category: "Wearable IoT & Student Safety",
      level: "Intermediate"
    },
    {
      id: "IOT03",
      title: "Smart Door Queue",
      description: "Create an IoT system that manages people entering a restricted room without requiring a security person to manually count them. It should prevent overcrowding and maintain an accurate real-time count of people inside.",
      category: "Smart Access & Occupancy Monitoring",
      level: "Intermediate"
    },
    {
      id: "IOT04",
      title: "Emergency Vehicle Parking Priority",
      description: "Build a smart parking system that identifies an emergency vehicle and provides the fastest available parking or entry route. Normal vehicles should continue using the parking system without disturbing emergency priority.",
      category: "Smart Transportation & Emergency Response",
      level: "Advanced"
    },
    {
      id: "IOT05",
      title: "Smart Parcel Locker",
      description: "Design a connected parcel locker that detects package delivery, verifies the authorized receiver, and records opening and closing events. The locker should remain secure even when the internet connection temporarily fails.",
      category: "Smart Logistics & Security",
      level: "Advanced"
    },
    {
      id: "IOT06",
      title: "Smart Canteen Food Counter",
      description: "Create an IoT system that monitors food availability in a college canteen and estimates when an item may run out. The system should help staff reduce food wastage while informing students about current availability.",
      category: "Smart Campus & Food Management",
      level: "Intermediate"
    },
    {
      id: "IOT07",
      title: "Smart Charging Station",
      description: "Build an IoT charging station that manages multiple devices connected at the same time and intelligently distributes available power. It should prevent overload while providing users with useful charging-status information.",
      category: "Smart Energy & Power Management",
      level: "Intermediate"
    },
    {
      id: "IOT08",
      title: "Smart Library Seat System",
      description: "Develop an IoT system that detects available library seats and identifies seats occupied for a long time without actual usage. The system should provide reliable real-time seat availability to students.",
      category: "Smart Campus & Occupancy Monitoring",
      level: "Intermediate"
    },
    {
      id: "IOT09",
      title: "Smart Tool Tracking System",
      description: "Create an IoT system for a laboratory or workshop that tracks commonly used tools and identifies when a tool is missing. The system should show the tool's last known location or associated user.",
      category: "Asset Tracking & Industrial IoT",
      level: "Intermediate"
    },
    {
      id: "IOT10",
      title: "Smart Home Power Scheduler",
      description: "Build an IoT system that decides when selected household devices should operate based on usage patterns and available power. It should reduce unnecessary consumption while keeping manual user control available.",
      category: "Smart Home & Energy Optimization",
      level: "Intermediate"
    },
    {
      id: "IOT11",
      title: "Smart Flood Warning System",
      description: "Build an IoT system that monitors rainfall, water level, and environmental conditions to identify the possibility of flooding. The system should provide an early warning and continue basic operation even when internet connectivity is unavailable.",
      category: "Disaster Management & Environmental IoT",
      level: "Advanced"
    },
    {
      id: "IOT12",
      title: "Early Fire Detection System",
      description: "Develop an IoT solution that detects early signs of fire using multiple environmental parameters such as temperature, smoke, and gas. The challenge is to reduce false alarms and provide a fast local emergency response.",
      category: "Safety & Environmental Monitoring",
      level: "Advanced"
    },
    {
      id: "IOT13",
      title: "AI-Based Smart Farmer Assistant",
      description: "Create an IoT system that collects soil and environmental data to help farmers decide when and how much to irrigate. The system should use intelligent analysis to provide useful recommendations and work in low-connectivity areas.",
      category: "AgriTech & Intelligent IoT",
      level: "Advanced"
    },
    {
      id: "IOT14",
      title: "Disaster-Resilient IoT Communication",
      description: "Design an IoT communication network that can continue sharing emergency information when the primary internet or communication link fails. The system should automatically use an alternative communication path to keep critical data moving.",
      category: "Resilient Networks & Disaster Communication",
      level: "Advanced"
    },
    {
      id: "IOT15",
      title: "Smart Energy Theft Detection",
      description: "Build an IoT system that monitors electricity usage and identifies unusual consumption patterns that may indicate unauthorized usage. The solution should distinguish normal changes in demand from suspicious activity and generate alerts.",
      category: "Smart Energy & Security Analytics",
      level: "Advanced"
    },
    {
      id: "IOT16",
      title: "Predictive Machine Failure Detection",
      description: "Develop an IoT monitoring system that observes machine parameters such as vibration, temperature, and operating conditions. The system should identify abnormal patterns and predict possible machine failure before a breakdown occurs.",
      category: "Industrial IoT & Predictive Maintenance",
      level: "Advanced"
    },
    {
      id: "IOT17",
      title: "Intelligent Road Condition Monitoring",
      description: "Create an IoT-based system that detects potholes, rough road surfaces, or other road abnormalities using sensors or connected devices. The system should record the location and severity of detected problems for maintenance planning.",
      category: "Smart Roads & Transportation IoT",
      level: "Advanced"
    },
    {
      id: "IOT18",
      title: "Smart Livestock Health Monitoring",
      description: "Design a wearable or non-invasive IoT system that monitors livestock activity and environmental conditions. The solution should identify unusual behavior or changes that may indicate a health or safety problem.",
      category: "AgriTech & Animal Health IoT",
      level: "Advanced"
    },
    {
      id: "IOT19",
      title: "Smart Water Pipeline Leakage Detection",
      description: "Build an IoT system that monitors water flow and pressure to identify possible pipeline leakage. The system should detect abnormal flow patterns and provide an alert, with an option to estimate the affected section.",
      category: "Water Management & Infrastructure IoT",
      level: "Advanced"
    },
    {
      id: "IOT20",
      title: "Offline Smart Village IoT Network",
      description: "Develop an IoT network that collects important village-level information such as water, environment, agriculture, or energy data. The system should continue collecting, processing, and displaying essential information locally even without internet access.",
      category: "Rural Technology & Resilient IoT",
      level: "Advanced"
    }
  ]
};

export const HACKATHON_NOTE = "Participants may use suitable IoT hardware, sensors, edge devices, communication protocols, databases, dashboards, and AI/ML techniques. Preference may be given to solutions that are reliable, low-cost, scalable, energy-efficient, and capable of handling network failures.";
