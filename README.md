# ServiceHub – Local Business Service Portal

## Project Overview
ServiceHub is a responsive Local Business Service Portal developed using HTML, CSS, and JavaScript. It allows customers to explore available services, book services online, and track their booking status.

This project is developed as part of the Arrowstack Web Development Internship.

## Features
- Responsive design for desktop, tablet, and mobile.
- Service listing page.
- Online service booking form.
- Automatic Booking ID generation.
- Booking status tracking.
- Admin panel to view bookings and update their status.
- Contact form with validation feedback.
- Client-side form validation.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- LocalStorage
- Git and GitHub
- GitHub Pages

## Booking Workflow
1. Customer selects a service and submits a booking.
2. System generates a unique Booking ID.
3. Customer uses the ID to track the booking.
4. Admin searches for the booking and updates its status.
5. Customer can view the updated status on the tracking page.

## Booking Statuses
- Booking Received
- Booking Confirmed
- In Progress
- Completed

## Live Demo
https://nidarasool-dev.github.io/ServiceHub/

## Project Repository
https://github.com/nidarasool-dev/ServiceHub

## Testing
The following workflow was manually tested:
- Booking submission.
- Booking ID generation.
- Booking status tracking.
- Admin status update.
- Updated status verification on the tracking page.

## Limitations
- Booking data is stored in browser LocalStorage.
- Data is not synchronized across different devices or browsers.
- Admin authentication and a shared backend database are not implemented.
- Contact form currently displays a success message but does not send messages to a server.

## Future Improvements
- Add a backend and shared database.
- Implement secure admin authentication.
- Enable real-time booking synchronization.
- Connect the contact form to a backend service.

## Author
Developed by Nida Rasool.
