const visitKey = "shadestroke-last-visit";

const visitorKey = "shadestroke-visitor-id";

let visitorId = localStorage.getItem(visitorKey);

if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(visitorKey, visitorId);
}

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBtJXy5bZTBFFP_dhwiRyt7ryT1loBf9sI",
    authDomain: "shadestroke-719ad.firebaseapp.com",
    projectId: "shadestroke-719ad",
    storageBucket: "shadestroke-719ad.firebasestorage.app",
    messagingSenderId: "617508100871",
    appId: "1:617508100871:web:210fab6a5e56bbb08303a2",
    measurementId: "G-V0VNEXQ5PR"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

function getDeviceType() {

    const width = window.innerWidth;

    if (width <= 768) {
        return "Mobile";
    }

    if (width <= 1024) {
        return "Tablet";
    }

    return "Desktop";
}

async function saveVisit() {

    try {

        await addDoc(collection(db, "visits"), {

            visitorId: visitorId,

            visitTime: serverTimestamp(),

            page: window.location.pathname,

            referrer: document.referrer || "Direct",

            deviceType: getDeviceType(),

            language: navigator.language,

            screenWidth: window.screen.width,

            screenHeight: window.screen.height

        });

        console.log("ShadeStroke visit recorded");

    } catch (error) {

        console.error("Visitor tracking error:", error);

    }
}

const lastVisit = localStorage.getItem(visitKey);

const now = Date.now();

const oneHour = 60 * 60 * 1000;

if (!lastVisit || now - Number(lastVisit) > oneHour) {

    saveVisit();

    localStorage.setItem(visitKey, now.toString());

}