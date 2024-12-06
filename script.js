document.addEventListener("DOMContentLoaded", function () {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDg_JVrTkUgUEnr_Sc7p_8iKbEx4Zw31BU",
        authDomain: "quilt-of-lies.firebaseapp.com",
        databaseURL: "https://quilt-of-lies-default-rtdb.firebaseio.com",
        projectId: "quilt-of-lies",
        storageBucket: "quilt-of-lies.firebasestorage.app",
        messagingSenderId: "429039873205",
        appId: "1:429039873205:web:348a3ebbb688402f5e62fc",
        measurementId: "G-8EGYSJ7MZR",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Reference to Firebase database
    const messagesRef = firebase.database().ref("Collected Data");

    // Color and style data
    const getRandomColor = () => ["#000000"][Math.floor(Math.random() * 1)];
    const backgrounds = [
            "https://raw.githubusercontent.com/4muffin4/QUILT/refs/heads/main/1.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//images/2.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//images/3.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//images/5.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//images/6.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//images/7.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//images/8.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//images/10.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//images/11.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/oa-72-4703-red-dots-batiks-cotton-fabric_grande.webp",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//20.webp",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//22.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main//23.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/18.webp",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/17.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/images/15.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/images/16.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/24.avif",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/25.avif",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/26.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/27.jpg",
            "https://raw.githubusercontent.com/4muffin4/QUILT/main/28.webp",


];
    const styles = ["response-style-1",
            "response-style-2",
            "response-style-3",
            "response-style-4",
            "response-style-5",
            "response-style-6",
            "response-style-7",
            "response-style-8",
            "response-style-9",
            "response-style-10",
            "response-style-11",
            "response-style-12",
            "response-style-13",
            "response-style-14",
            "response-style-15",
            "response-style-16",
            "response-style-17",
            "response-style-18",
            "response-style-19",
            "response-style-20",
            "response-style-21",
            "response-style-22",
            "response-style-23"
        ]; // Add more styles
        
    const fonts = ["gridlite-pe-variable", "p22-folk-art-block", "fig-script"];

    function randomizeFontColors(element) {
        const title = element.querySelector('.response-title');
        const lie = element.querySelector('.response-lie');
        if (title) title.style.color = getRandomColor();
        if (lie) lie.style.color = getRandomColor();
    }

    // Save message to Firebase
    document.getElementById("contactForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const lie = document.getElementById("lie").value.trim();

        if (lie) {
            messagesRef.push({ title, lie });
            document.getElementById("contactForm").reset();
        } else {
            alert("Submit a lie you’ve been told here!");
        }
    });
 // Check if device is mobile
    function isMobile() {
        return window.innerWidth <= 768; // Mobile screen size breakpoint
    }

    // Set font variation styles on mobile for 'gridlite-pe-variable'
    function setFontVariationForMobile(responseElement, font) {
        if (isMobile() && font === 'gridlite-pe-variable') {
            responseElement.style.fontVariationSettings = "'wght' 800, 'BACK' 200, 'RECT' 100, 'ELSH' 3";
        }
    }

    // Display messages from Firebase
    function displayData() {
        messagesRef.on("value", function (snapshot) {
            const dataDisplay = document.getElementById("dataDisplay");
            dataDisplay.innerHTML = "";

            snapshot.forEach(function (childSnapshot) {
                const { title = "Untitled", lie = "No lie provided" } = childSnapshot.val();

                // Randomly select font
                const selectedFont = fonts[Math.floor(Math.random() * fonts.length)];
                const isFigScript = selectedFont === 'fig-script'; // Check if the selected font is 'fig-script'

                const responseElement = document.createElement("div");
                responseElement.classList.add(styles[Math.floor(Math.random() * styles.length)]);
                responseElement.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;
                responseElement.style.backgroundSize = "cover";
                responseElement.style.backgroundPosition = "center";

                responseElement.innerHTML = `
                    <strong class="response-title" style="font-size: ${Math.max(30, 40 - Math.floor(title.length / 5))}px;">
                        ${title}
                    </strong>
                    <span class="response-lie" style="font-family: ${selectedFont}; 
                    font-size: ${Math.max(20, 36 - Math.floor(lie.length / 5))}px;
                    ${isFigScript ? '-webkit-text-stroke: 2px black;' : ''}">
                        ${lie}
                    </span>
                `;

                // Apply mobile font variation if using 'gridlite-pe-variable' font
                setFontVariationForMobile(responseElement, selectedFont);
                
                randomizeFontColors(responseElement);
                dataDisplay.appendChild(responseElement);
            });
        });
    }
function setMinFontSize() {
        const elements = document.querySelectorAll('.gridlite-pe-variable');
        elements.forEach(element => {
            const currentFontSize = parseInt(window.getComputedStyle(element).fontSize, 10);
            if (currentFontSize < 31) {
                element.style.fontSize = '31px'; // Set to 31px if smaller
            }
        });
    }

    // Run the function to ensure font size is set correctly
    setMinFontSize();

    // Optionally, adjust on window resize (if font size is dynamic)
    window.addEventListener('resize', setMinFontSize);

    // Adjust textareas on input
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const adjustSize = () => {
            textarea.style.width = "auto";
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        };
        textarea.addEventListener('input', adjustSize);
        adjustSize();
    });

    // Display data initially
    displayData();
});
