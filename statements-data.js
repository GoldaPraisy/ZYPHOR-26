/* =========================================================
   ZYPHOR'26 — statements-data.js
   Official Hackathon Problem Statements (10 AI & 10 IoT)
   ========================================================= */

export const DOMAIN_STATEMENTS = {
 {
  "AI": [
    {
      "id": "AI11",
      "title": "The Missing Person Investigation Agent",
      "description": "A person goes missing and investigators receive fragmented information from CCTV footage, witness statements, social media activity, location history, and other available records. The information is incomplete, noisy, and spread across different sources, making it difficult to identify meaningful connections and determine the person's most probable movements.",
      "category": "AI Agents & Intelligent Investigation",
      "level": "Advanced"
    },
    {
      "id": "AI12",
      "title": "The Overwhelmed SOC Analyst",
      "description": "A security operations center receives thousands of alerts from endpoints, networks, applications, and authentication systems. Many alerts are harmless or duplicated, while a small number may indicate a coordinated cyberattack. The challenge is to automatically correlate related alerts, determine their severity, identify attack patterns, and prioritize the incidents that require immediate attention.",
      "category": "Cybersecurity AI & Autonomous Agents",
      "level": "Advanced"
    },
    {
      "id": "AI13",
      "title": "The Meeting That Forgot Everything",
      "description": "Important decisions, tasks, deadlines, and responsibilities are discussed across long and unstructured meetings. Participants may interrupt each other, change decisions, or leave actions implied rather than explicitly stated. The challenge is to understand the conversation, identify decisions and commitments, assign responsibilities, and generate an accurate actionable summary.",
      "category": "NLP & Meeting Intelligence",
      "level": "Advanced"
    },
    {
      "id": "AI14",
      "title": "The Last-Mile Delivery Puzzle",
      "description": "A logistics company must deliver hundreds of packages while dealing with traffic, delivery time windows, vehicle capacity, changing road conditions, failed deliveries, and dynamically changing customer locations. A route that appears optimal initially may become inefficient as conditions change, requiring the AI to continuously adapt delivery routes and priorities.",
      "category": "AI Optimization & Intelligent Logistics",
      "level": "Advanced"
    },
    {
      "id": "AI15",
      "title": "The Disaster Response Coordinator",
      "description": "During a disaster, emergency information arrives from weather systems, sensors, emergency calls, social media, satellite imagery, and field teams at different times and with varying reliability. The AI must combine these signals to identify critical areas, estimate changing risks, prioritize emergency resources, and recommend response actions while conditions continue to evolve.",
      "category": "AI Agents & Emergency Decision Intelligence",
      "level": "Advanced"
    },
    {
      "id": "AI16",
      "title": "The Face That Never Existed",
      "description": "A suspicious image or video appears authentic but may have been digitally manipulated using generative AI. Facial expressions, lighting, lip movements, audio, and visual artifacts may contain subtle inconsistencies that are difficult for humans to notice. The challenge is to detect whether the media has been manipulated and provide explainable evidence supporting the decision.",
      "category": "Generative AI Security & Computer Vision",
      "level": "Advanced"
    },
    {
      "id": "AI17",
      "title": "The Hidden Skill Gap",
      "description": "A student's or employee's current skills do not clearly match the skills required for a target role. Resumes, project experience, assessments, certifications, and job descriptions provide different and sometimes incomplete information. The AI must identify missing skills, distinguish critical gaps from minor ones, and generate a personalized learning path to bridge those gaps.",
      "category": "AI Recommendation & Skill Intelligence",
      "level": "Advanced"
    },
    {
      "id": "AI18",
      "title": "The Product That Looks Real",
      "description": "Counterfeit products are increasingly difficult to distinguish from genuine products because packaging, labels, logos, QR codes, and product appearance can be closely imitated. The AI must analyze visual and textual product characteristics along with available product information to estimate authenticity and identify suspicious inconsistencies.",
      "category": "Computer Vision & AI-Based Fraud Detection",
      "level": "Advanced"
    },
    {
      "id": "AI19",
      "title": "The Attack Before It Happens",
      "description": "A network appears normal even though subtle changes in login behavior, network traffic, system activity, and access patterns may indicate that an attacker is preparing for a larger cyberattack. Traditional systems often detect threats only after malicious activity occurs. The challenge is to learn early behavioral signals and predict the likelihood of an upcoming attack before significant damage occurs.",
      "category": "Predictive AI & Cybersecurity Intelligence",
      "level": "Advanced"
    },
    {
      "id": "AI20",
      "title": "The Memory Gap",
      "description": "An AI assistant interacts with a user across many conversations but gradually loses important context, causing it to forget previous decisions, commitments, preferences, and relationships between pieces of information. Some memories may also conflict, become outdated, or lack sufficient evidence. The challenge is to build an intelligent memory system that decides what information should be retained, updated, connected, or forgotten while maintaining accurate long-term context.",
      "category": "Generative AI & Long-Term Memory",
      "level": "Advanced"
    }
  ]
}

  IoT: [
    {
      id: "IOT01",
      title: "Smart Industrial Gas & Air Quality Hazard Monitoring System",
      description: "Design an IoT sensor node equipped with gas, dust, and temperature sensors that streams environmental safety metrics to a real-time dashboard and triggers automated emergency ventilation alarms.",
      category: "Industrial Safety & Hardware",
      level: "Intermediate"
    },
    {
      id: "IOT02",
      title: "Automated Solar-Powered Precision Irrigation & Soil Health Node",
      description: "Create an IoT moisture, NPK, and temperature sensing unit that wirelessly controls water solenoid valves based on real-time soil requirements and weather data.",
      category: "AgriTech & Automation",
      level: "Intermediate"
    },
    {
      id: "IOT03",
      title: "Smart City Intelligent Streetlight Network with Energy Harvesting",
      description: "Develop an IoT lighting mesh that dims streetlights when roads are empty, brightens upon motion detection, monitors power consumption, and reports lamp failures automatically.",
      category: "Smart Energy & Mesh IoT",
      level: "Intermediate"
    },
    {
      id: "IOT04",
      title: "IoT Wearable Worker Safety & Fall Detection Monitor",
      description: "Construct a compact wearable device with an MPU6050 accelerometer, heart rate sensor, and GPS module that detects industrial worker falls or cardiac distress and sends instant SMS alerts.",
      category: "Wearable Health & Embedded",
      level: "Advanced"
    },
    {
      id: "IOT05",
      title: "Smart Cold-Chain Logistics & Temperature Tamper Tracker",
      description: "Build an IoT monitoring tag for vaccine and food transport that continuously logs GPS location, temperature, humidity, and door tamper events, reporting alerts over GSM/Wi-Fi.",
      category: "Logistics & Supply Chain",
      level: "Intermediate"
    },
    {
      id: "IOT06",
      title: "Automated Smart Home Energy Metering & Appliances Control",
      description: "Design an IoT current/voltage monitoring plug that tracks appliance power usage in real time, computes electricity costs, and allows remote web/mobile power cutoff.",
      category: "Smart Home & Power Tech",
      level: "Intermediate"
    },
    {
      id: "IOT07",
      title: "IoT Water Quality & Pipeline Leakage Detection Mesh",
      description: "Create a multi-point water distribution monitoring network that measures pH, turbidity, flow rate, and pressure drops to detect pipe bursts and water contamination instantly.",
      category: "Water Tech & Sensors",
      level: "Advanced"
    },
    {
      id: "IOT08",
      title: "Smart Vehicle Collision Prevention & Blind Spot Alert System",
      description: "Develop an embedded vehicular unit utilizing ultrasonic/LiDAR sensors and buzzer/OLED alerts to warn drivers of proximity hazards and send emergency location alerts on impact.",
      category: "Automotive & Embedded Systems",
      level: "Intermediate"
    },
    {
      id: "IOT09",
      title: "IoT Patient Remote Bedside Vital Signs Telemetry Unit",
      description: "Construct a hospital bedside telemetry unit that streams pulse, SPO2, body temperature, and IV drip level metrics to a central nursing dashboard in real-time.",
      category: "MedTech & Health IoT",
      level: "Advanced"
    },
    {
      id: "IOT10",
      title: "Smart Waste Bin Level & Automated Odor Neutralizer Unit",
      description: "Build an ultrasonic trash bin monitoring node that measures fill level, tracks waste generation analytics, and triggers automatic disinfectant spray when odor threshold is crossed.",
      category: "CleanTech & Smart Sanitation",
      level: "Intermediate"
    }
  ]
};
