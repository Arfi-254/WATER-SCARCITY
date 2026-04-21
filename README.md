
# Maji Safi 💧

**Maji Safi** is a web-based system designed to address water scarcity by monitoring water levels, tracking usage, and providing real-time alerts. The project focuses on regions like **Garissa, Kenya**, where access to clean and reliable water remains a daily challenge.

---

## 💡 Inspiration
Growing up and working in Kenya, I’ve seen firsthand how water scarcity isn't just a statistic—it’s a daily struggle that dictates the rhythm of life for families in arid regions. 

The inspiration for Maji Safi came from a simple observation: **you cannot manage what you cannot measure.** Most communities rely on guesswork to know when their tanks will run dry. I wanted to build a bridge between high-tech IoT concepts and the people who need them most, creating a visual tool that turns abstract water data into actionable insights for sustainable management.

---

## ⚠️ The Problem
Water scarcity in arid regions such as Garissa is driven by:
* **Unpredictable Rainfall:** Recurring droughts and climate instability.
* **Inefficient Distribution:** Lack of infrastructure to track where water goes.
* **No Real-Time Data:** Communities often don't know they are out of water until the tap runs dry.
* **Wastage:** High levels of water loss due to leaks or unmonitored consumption.

As a result, communities face limited access to safe water, affecting health, education, and livelihoods.

---

## ✅ The Solution
Maji Safi provides a simple, interactive platform that enables users to monitor and manage water resources more effectively. By making water usage visible and understandable, the system helps reduce wastage and improves local decision-making.

### **Core Features**
* **Monitor Water Levels:** View current water availability through a live, intuitive dashboard.
* **Simulate Usage:** Interact with the system to see how different consumption behaviors impact water levels over time.
* **Real-Time Alerts:** Get notified immediately when water levels drop below safe thresholds.
* **Track Trends:** Analyze historical data to understand consumption patterns.

---

## 🛠️ Development Process
Building Maji Safi was an exercise in creating a seamless, reactive user experience that could eventually handle high-frequency data from physical sensors.

### **Tech Stack**
* **Frontend:** React.js (Vite 7) for a fast, modern development workflow.
* **Styling:** Tailwind CSS for a responsive UI optimized for both desktop and mobile users in the field.
* **State Management:** React Context API to synchronize water levels across the simulation and alert modules.
* **Logic:** Custom JavaScript intervals to simulate real-time "drainage" and "refill" cycles.

### **Key Challenges**
1.  **Simulation Accuracy:** Implementing logic that realistically represents how water depletes based on active "taps" or users.
2.  **Predictive Alerts:** Designing the system to trigger notifications not just at a hard "low" limit, but by calculating the estimated time remaining before the source is empty.

---

## ⚙️ How It Works
The application currently uses simulated data to represent water levels. In a real-world deployment, Maji Safi is designed to integrate with **IoT sensors** (such as ultrasonic depth sensors) to provide live data from physical water tanks and pipelines.

The system calculates remaining volume ($W_{rem}$) using the formula:
$$W_{rem} = V_{initial} - (C_{rate} \times t)$$

---

## 🚀 Future Improvements
* **IoT Integration:** Connecting the dashboard to physical hardware (ESP32/Arduino).
* **Mobile App:** Developing a lightweight mobile version for wider offline access.
* **AI Predictions:** Using machine learning to predict future water shortages based on historical weather and usage data.
* **M-Pesa Integration:** Implementing a billing system for communal water points.

---

## 📥 Installation & Setup
1.  **Clone the repository:**
    ```bash
    git clone git@github.com:Arfi-254/WATER-SCARCITY.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the app:**
    ```bash
    npm run dev
    ```

---

## 📝 Conclusion
Maji Safi demonstrates how technology can be used to tackle real-world challenges like water scarcity. By combining simplicity with functionality, it provides a foundation for smarter and more sustainable water management systems in Kenya and beyond.
