# 🍎 Smart Food Expiry & Waste Reduction System

A **React Native app** to reduce food waste by tracking expiry dates, sending smart reminders, and suggesting recipes for soon-to-expire items.  

---

## 🚀 Features
- 📷 Barcode/QR scanning for packaged items  
- 🔍 OCR expiry detection from labels  
- 📝 Manual & voice input for fresh produce  
- 🗂 Color-coded dashboard (🟢 Safe | 🟡 Near Expiry | 🔴 Expired)  
- 🔔 Smart notifications (3 days, 1 day, expiry day)  
- 🍲 AI-powered recipe suggestions (via APIs)  
- 📊 Waste analytics + sustainability reports  
- 🏆 Gamification (streaks, badges)  
- 🏪 (Future) Supermarket integration & food sharing  

---

## 🏗️ Tech Stack
- **Frontend:** React Native (Expo / CLI)  
- **Backend:** Firebase / MongoDB Atlas  
- **APIs:** Spoonacular / Edamam, Tesseract.js / Google Vision, Barcode libs  
- **Notifications:** Firebase Cloud Messaging (FCM) / OneSignal  
- **State:** Redux / Context API  

---

## 📐 Workflow
## 📂 Structure
src/
├── components/ # UI
├── screens/ # Dashboard, Add Item, Recipes, Analytics
├── services/ # API calls
├── context/ # State
├── utils/ # Helpers
└── assets/ # Icons, images

App.js


---

⚙️ Setup
bash
 Clone & install
git clone https://github.com/yourusername/smart-food-expiry-app.git
cd smart-food-expiry-app
npm install

# Run app
npx expo start

# Extra libs
npm install react-native-camera react-native-qrcode-scanner tesseract.js

🔧 Set up Firebase (Firestore + FCM) and add google-services.json / GoogleService-Info.plist.

🔮 Future Enhancements

IoT smart fridge integration

RFID/QR supermarket tagging

AI meal planner

Food donation/community sharing
🤝 Contributing

Fork repo → git checkout -b feature-name

Commit → git push origin feature-name

Open Pull Request 🚀
