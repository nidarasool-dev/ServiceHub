// // HAMBURGER MENU

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });

}

// CLOSE MOBILE MENU
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/// Contact Form Functionality

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const formMessage = document.getElementById("form-message");

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            formMessage.style.color = "#dc2626";
            formMessage.textContent = "Please fill in all fields.";
            return;
        }

        formMessage.style.color = "#16a34a";
        formMessage.textContent = "Thank you! Your message has been submitted successfully!";

        contactForm.reset();

    });

}
// Booking Form Functionality

const bookingBtn = document.getElementById("booking-btn");

if (bookingBtn) {

    bookingBtn.addEventListener("click", function () {

        const form = document.getElementById("booking-form");

        if (!form.reportValidity()) {
            return;
        }

        const name = document.getElementById("booking-name").value.trim();
        const phone = document.getElementById("booking-phone").value.trim();
        const email = document.getElementById("booking-email").value.trim();
        const address = document.getElementById("booking-address").value.trim();
        const service = document.getElementById("booking-service").value;
        const date = document.getElementById("booking-date").value;
        const time = document.getElementById("booking-time").value;
        const notes = document.getElementById("booking-notes").value.trim();

        // Generate Booking ID
        const bookingId = "SH-" + Date.now();

        // Booking Data
        const booking = {
            id: bookingId,
            name: name,
            phone: phone,
            email: email,
            address: address,
            service: service,
            date: date,
            time: time,
            notes: notes,
            status: "Booking Received"
        };

        // Save Booking
        let bookings = JSON.parse(localStorage.getItem("serviceBookings")) || [];

        bookings.push(booking);

        localStorage.setItem("serviceBookings", JSON.stringify(bookings));

        // Show Confirmation Details
        document.getElementById("confirm-id").textContent = bookingId;
        document.getElementById("confirm-name").textContent = name;
        document.getElementById("confirm-service").textContent = service;
        document.getElementById("confirm-date").textContent = date;
        document.getElementById("confirm-time").textContent = time;

        form.style.display = "none";

        document.querySelector(".booking-heading").style.display = "none";

        document.getElementById("booking-success").style.display = "block";

        document.getElementById("booking-success").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}
// Tracking Page Functionality

const trackingBtn = document.getElementById("tracking-btn");

if (trackingBtn) {

    trackingBtn.addEventListener("click", function () {

        const trackingId = document.getElementById("tracking-id").value.trim();

        const trackingMessage = document.getElementById("tracking-message");

        const result = document.getElementById("tracking-result");

        if (trackingId === "") {
            trackingMessage.textContent = "Please enter your Booking ID.";
            trackingMessage.style.color = "red";
            result.innerHTML = "";
            return;
        }

        const bookings = JSON.parse(localStorage.getItem("serviceBookings")) || [];

        const booking = bookings.find(function (item) {
            return item.id.toLowerCase() === trackingId.toLowerCase();
        });

        if (booking) {

            trackingMessage.textContent = "Booking Found!";
            trackingMessage.style.color = "green";

            const stages = [
                "Booking Received",
                "Booking Confirmed",
                "In Progress",
                "Completed"
            ];

            const currentStage = stages.indexOf(booking.status);

            const safeText = function (value) {
                return String(value ?? "").replace(/[&<>"']/g, function (char) {
                    return {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;"
                    }[char];
                });
            };

            const stageIcons = [
                "fa-clipboard-check",
                "fa-circle-check",
                "fa-screwdriver-wrench",
                "fa-house-circle-check"
            ];

            result.innerHTML = `
        <div class="tracking-result-card">

            <div class="result-heading">
                <span>YOUR BOOKING</span>
                <h3>Booking Details</h3>
                <p>Booking ID: ${safeText(booking.id)}</p>
            </div>

            <div class="result-details">
                <p><strong>Name:</strong> ${safeText(booking.name)}</p>
                <p><strong>Service:</strong> ${safeText(booking.service)}</p>
                <p><strong>Date:</strong> ${safeText(booking.date)}</p>
                <p><strong>Time:</strong> ${safeText(booking.time)}</p>
                <p><strong>Status:</strong> ${safeText(booking.status)}</p>
            </div>

            <div class="progress-heading">
                <h3>Booking Progress</h3>
                <p>Follow your service journey</p>
            </div>

            <div class="progress-tracker">

                ${stages.map(function (stage, index) {

                let stageClass = "pending";

                if (currentStage >= 0 && index < currentStage) {
                    stageClass = "completed";
                } else if (index === currentStage) {
                    stageClass = "active";
                }

                return `
                        <div class="progress-step ${stageClass}">

                            <div class="progress-marker">
                                <i class="fa-solid ${stageIcons[index]}"></i>
                            </div>

                            <div class="progress-text">
                                <h4>${stage}</h4>
                                <p>${index === currentStage
                        ? "Current Status"
                        : index < currentStage
                            ? "Completed"
                            : "Waiting for update"}
                                </p>
                            </div>

                        </div>
                    `;

            }).join("")}

            </div>

        </div>
    `;

        } else {

            trackingMessage.textContent = "Booking ID not found. Please check your ID.";
            trackingMessage.style.color = "red";

            result.innerHTML = "";

        }
    });

}

// Admin Panel Functionality

const adminSearchBtn = document.getElementById("admin-search-btn");
const adminUpdateBtn = document.getElementById("admin-update-btn");

if (adminSearchBtn) {

    adminSearchBtn.addEventListener("click", function () {

        const bookingId = document.getElementById("admin-booking-id").value.trim();

        const details = document.getElementById("admin-booking-details");
        const updateArea = document.getElementById("admin-update-area");
        const message = document.getElementById("admin-message");

        if (bookingId === "") {
            message.textContent = "Please enter a Booking ID.";
            message.style.color = "red";
            details.innerHTML = "";
            updateArea.style.display = "none";
            return;
        }

        const bookings = JSON.parse(localStorage.getItem("serviceBookings")) || [];

        const booking = bookings.find(function (item) {
            return item.id.toLowerCase() === bookingId.toLowerCase();
        });

        if (booking) {

            message.textContent = "Booking found successfully!";
            message.style.color = "green";

            details.innerHTML = `
                <div class="admin-booking-card">
                    <p><strong>Booking ID:</strong> ${booking.id}</p>
                    <p><strong>Name:</strong> ${booking.name}</p>
                    <p><strong>Phone:</strong> ${booking.phone}</p>
                    <p><strong>Service:</strong> ${booking.service}</p>
                    <p><strong>Date:</strong> ${booking.date}</p>
                    <p><strong>Time:</strong> ${booking.time}</p>
                    <p><strong>Current Status:</strong> ${booking.status}</p>
                </div>
            `;

            document.getElementById("admin-status").value = booking.status;

            updateArea.style.display = "block";

        } else {

            message.textContent = "Booking ID not found!";
            message.style.color = "red";

            details.innerHTML = "";
            updateArea.style.display = "none";

        }

    });

}


// Update Booking Status

if (adminUpdateBtn) {

    adminUpdateBtn.addEventListener("click", function () {

        const bookingId = document.getElementById("admin-booking-id").value.trim();

        const newStatus = document.getElementById("admin-status").value;

        const message = document.getElementById("admin-message");

        let bookings = JSON.parse(localStorage.getItem("serviceBookings")) || [];

        const bookingIndex = bookings.findIndex(function (item) {
            return item.id.toLowerCase() === bookingId.toLowerCase();
        });

        if (bookingIndex === -1) {
            message.textContent = "Please search for a valid booking first.";
            message.style.color = "red";
            return;
        }

        bookings[bookingIndex].status = newStatus;

        localStorage.setItem("serviceBookings", JSON.stringify(bookings));

        message.textContent = "Booking status updated successfully!";
        message.style.color = "green";

        // Refresh booking details
        adminSearchBtn.click();

    });

}

console.log("Admin JavaScript Loaded");