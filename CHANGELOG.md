# CHANGELOG

## Decisions taken where the brief was open

1. Brand wording: every page now reads "Appointments and schedules"; page titles keep a short page name
   prefix (for example "My Schedule | Appointments and schedules").
2. The Appointments nav item points at services.html; the filename was kept to avoid breaking links.
3. Home keeps four stats; the event count was moved last so appointments lead.
4. Shared data layer: app.js keeps events, auth, and profiles; services.js keeps offices, faculty,
   appointments, queue, notifications, feedback, and the host service console. services.js is loaded on
   every page and reuses app.js helpers instead of duplicating them.
5. Routing now compares the exact page basename, because path.includes('events.html') also matched
   my-events.html.
6. officer.html and checkin.html no longer ship their own login modal markup; app.js injects one modal.
7. Demo seeding runs once, guarded by ccsjdm_demo_seeded, and covers three students so every screen is
   populated. Reset demo data clears only ccsjdm_* keys.
8. Faculty members expose a single Academic Consultation service with a generic requirements checklist.
9. Appointment duration for conflict checks: 30 minutes for faculty and for offices averaging 20 minutes
   or more, otherwise 20 minutes.
10. Queue tickets are treated as a 30 minute block when checking conflicts, since walk-in times are
    approximate.
11. Reschedule keeps the original reference number and appends to an appointment history array.
12. Conflicts are a warning, not a hard block: the student may continue after confirming.
13. Feedback is allowed once per completed visit, for both appointments and queue tickets.
14. Reports are scoped to the office selected in the host picker; CSV is produced in the browser with Blob.
15. Theme toggle cycles Light, Dark, High contrast and is stored in ccsjdm_theme.
16. The confirmation, success, and queue-number modals ignore Escape so they can only be closed manually.
17. Student login now validates the ID against the 2026-00123 format; any password is still accepted,
    as agreed for the demo.

## Professor login and desk (added in round 2)

18. Professor login is a third option in the Log In chooser. Demo credentials: any username, a Faculty ID from the directory (fac-001 to fac-006), any password. Mirrors the student ID approach.
19. Professor sessions are stored in ccsjdm_faculty_session. Starting a student or professor session ends the other, so only one identity is active at a time. The host session is unchanged.
20. Notifications are targeted by facultyId. The bell and dropdown show the notifications for whoever is logged in. Professors are notified on new bookings, cancellations, and reschedules that involve them.
21. Professor Desk is faculty.html. It is login-gated, shows the professor's profile and schedule, offers Today, Upcoming, Past, and All views, and provides Mark Checked In (from Confirmed), Mark Completed (from Checked In), and Mark Missed (only for past Confirmed appointments). Each action updates the record and notifies the student.

## Event banner upload (added in round 2)

22. The create-event form has an optional banner upload (JPG, PNG, WEBP, or GIF, up to 5 MB) with a live preview. Without an upload, the preview and the saved event use the generated banner.
23. Uploads are resized to at most 1200 px wide and saved as JPEG at 85% quality to keep localStorage small. GIF animation is not kept; the first frame is used.
24. Upload-only, no image URL field: external image links would break offline and in the sandboxed preview.
25. A "Remove uploaded image" button returns to the generated banner. The form resets the upload after publishing or cancelling.

## Login and naming changes (round 3, user-directed)

26. Log In chooser order is now Student Login, Professor Login, Event Organizer Login.
27. Event Organizer login replaces the Adminhost / hostonly! credentials. It takes a username and an Organization or School ID (ORG-001 to ORG-004, or the exact office or organization name), and has no password, matching the other logins. This supersedes the earlier fixed host credentials.
28. "Host Dashboard" is now "Event Dashboard" after login: nav link, page heading and title, notices, home page copy, and the attendance label "Organizer update". The logged-out gate text "You need to be a host to access this. Please log in." is unchanged, per the standing requirement.
29. Only the seal logo links to ccsjdm.com. The "Appointments and schedule" text is plain text in every header.
30. The brand is now "Appointments and schedule" (singular) in every title, header, footer, and hero heading.
31. The welcome greeting appears once per login. The marker is the session login time, so later pages and reloads hide it. Its role label reads Student, Professor, or Event Organizer.
32. Organizer login from pages other than the dashboard still redirects to the Event Dashboard, as before. Logging in from the dashboard page updates the nav and greeting in place.

33. Event Organizer login accepts only faculty IDs (fac-001 to fac-006) and staff IDs (STF-001 to STF-003). Student ID numbers are refused with a clear message, so students cannot open the Event Dashboard. Organization names are no longer accepted, which replaces the ORG-001 to ORG-004 list from item 27.
