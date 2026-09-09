import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
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

const auth = getAuth(app);

const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");

loginButton.addEventListener("click", async () => {

    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        loginMessage.textContent = "Login successful";

    } catch (error) {

        loginMessage.textContent = "Invalid email or password";

        console.error(error);

    }

});

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");

onAuthStateChanged(auth, (user) => {

    if (user) {

        loginSection.style.display = "none";
        dashboardSection.style.display = "block";

        loadTotalVisits();

    } else {

        loginSection.style.display = "block";
        dashboardSection.style.display = "none";

    }

});

const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", async () => {

    try {

        await signOut(auth);

    } catch (error) {

        console.error("Logout error:", error);

    }

});

async function loadTotalVisits() {

    try {

        const visitsSnapshot = await getDocs(collection(db, "visits"));

        const totalVisits = visitsSnapshot.size;

        const visitorIds = new Set();

        let desktopVisits = 0;
        let mobileVisits = 0;
        let tabletVisits = 0;
        const trafficSourceCounts = {};

        let todayVisits = 0;

        const today = new Date();

        const todayStart = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ).getTime();

        visitsSnapshot.forEach((doc) => {

            const data = doc.data();

            if (data.visitTime?.seconds) {

                const visitTime = data.visitTime.seconds * 1000;

                if (visitTime >= todayStart) {
                    todayVisits++;
                }

            }

            let source = data.referrer || "Direct";

            if (source === "Direct") {
                source = "Direct";
            } else if (source.includes("google.")) {
                source = "Google";
            } else if (source.includes("instagram.com")) {
                source = "Instagram";
            } else if (source.includes("youtube.com") || source.includes("youtu.be")) {
                source = "YouTube";
            } else if (source.includes("github.com")) {
                source = "GitHub";
            } else {
                try {
                    source = new URL(source).hostname.replace("www.", "");
                } catch {
                    source = "Other";
                }
            }

            trafficSourceCounts[source] = (trafficSourceCounts[source] || 0) + 1;

            if (data.deviceType === "Desktop") {
                desktopVisits++;
            }

            if (data.deviceType === "Mobile") {
                mobileVisits++;
            }

            if (data.deviceType === "Tablet") {
                tabletVisits++;
            }

            if (data.visitorId) {
                visitorIds.add(data.visitorId);
            }

            const recentVisitsContainer = document.getElementById("recentVisits");

            recentVisitsContainer.innerHTML = "";

            const recentVisits = [];

            visitsSnapshot.forEach((doc) => {

                const data = doc.data();

                recentVisits.push(data);

            });

            recentVisits
                .sort((a, b) => {

                    const timeA = a.visitTime?.seconds || 0;
                    const timeB = b.visitTime?.seconds || 0;

                    return timeB - timeA;

                })
                .slice(0, 10)
                .forEach((visit) => {

                    const item = document.createElement("p");

                    let visitTime = "Unknown time";

                    if (visit.visitTime?.seconds) {

                        visitTime = new Date(
                            visit.visitTime.seconds * 1000
                        ).toLocaleString();

                    }

                    let source = visit.referrer || "Direct";

                    if (source !== "Direct") {

                        try {
                            source = new URL(source).hostname.replace("www.", "");
                        } catch {
                            source = "Other";
                        }

                    }

                    item.textContent =
                        `${visitTime} | ${visit.deviceType || "Unknown"} | ${source}`;

                    recentVisitsContainer.appendChild(item);

                });

        });

const uniqueVisitors = visitorIds.size;

        document.getElementById("totalVisits").textContent = totalVisits;
        document.getElementById("uniqueVisitors").textContent = uniqueVisitors;
        document.getElementById("desktopVisits").textContent = desktopVisits;
        document.getElementById("mobileVisits").textContent = mobileVisits;
        document.getElementById("tabletVisits").textContent = tabletVisits;
        document.getElementById("todayVisits").textContent = todayVisits;

        const trafficSourcesContainer = document.getElementById("trafficSources");

        trafficSourcesContainer.innerHTML = "";

        Object.entries(trafficSourceCounts)
            .sort((a, b) => b[1] - a[1])
            .forEach(([source, count]) => {

                const item = document.createElement("p");

                item.textContent = `${source}: ${count}`;

                trafficSourcesContainer.appendChild(item);

            });

    } catch (error) {

        console.error("Error loading total visits:", error);

    }

}