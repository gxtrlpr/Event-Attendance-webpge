# PROGRESS

Project: Appointments and schedules (static prototype, HTML/CSS/vanilla JS/localStorage).
Verification command: `node /home/user/tools/verify.js` (expects VERIFY CLEAN).

## Phase 0 - Setup: DONE
backup-original/ holds every original file; tools/verify.js created.

## Phase 1 - Foundation: DONE
Files: all *.html, app.js, services.js, style.css
Brand rename, nav order Home/Appointments/Events/My Schedule/auth, appointments-led home
(offices open now, slots today, people in queue, events last), offices section above featured events,
services.js loaded everywhere, navbar host link and username de-styled with emoji removed,
:root CSS variables, router switched to exact page basename, duplicate login modal markup removed,
event-details Back link points to events.html.

## Phase 2 - Login and demo data: DONE
Files: app.js, services.js, all *.html
requireStudent() gate with pendingAuthAction resume after login, student ID format validated,
prototype note in both login modals plus every footer, privacy line added,
seedDemoData()/resetDemoData() seed appointments, queue tickets, registrations, notifications, feedback
for 2026-00123 / 2026-00456 / 2026-00789 on first load.

## Phase 3 - Service details and My Schedule: DONE
Files: service-details.html (new), my-events.html, services.js, app.js, style.css
Requirements checklist, booking modal with live slots, queue number issue, confirmation with reference + QR,
?office=ID and ?faculty=ID routes, My Schedule tabs Appointments / Queue Tickets / Events / Calendar / History
with next-item card and working cancel.

## Phase 4 - Host appointments and queue: DONE
Files: officer.html, services.js, style.css
Appointments and Queue section above the event tools, office picker, 4 live stat cards,
appointment status controls that notify the student, per-office queue console (call next, open/close,
completed, no show), Reset demo data button that clears only ccsjdm_* keys and re-seeds.

## Phase 5 - Reschedule and conflicts: DONE
Files: my-events.html, services.js
Reschedule modal keeps the same reference, writes a history entry, notifies, blocked within 2 hours
or after Checked In. Cross-type conflict detection uses a text-time parser over appointments,
queue tickets, and registered events, with a warning modal before booking.

## Phase 6 - QR and office check-in: DONE
Files: service-details.html, my-events.html, officer.html, services.js
QR data URI for every appointment reference and queue code; host Office Check-in panel accepts a
reference or student ID and flips the appointment to Checked In.

## Phase 7 - Notifications: DONE
Files: services.js, all *.html, style.css
Bell with unread badge and dropdown in the nav, dismissible today/tomorrow reminder banner re-checked
every 60 seconds, toasts with role=status.

## Phase 8 - Calendar: DONE
Files: my-events.html, services.js, style.css
Month grid with week toggle, colour-coded chips, day drill-down modal, day-list fallback under 768px.

## Phase 9 - Feedback: DONE
Files: my-events.html, officer.html, services.js, style.css
Star rating, category checkboxes, comment, anonymous toggle, one submission per visit;
host Feedback tab with average, star distribution, and comment cards.

## Phase 10 - Reports: DONE
Files: officer.html, services.js, style.css
Date range and type filters, four summary cards, CSS bar chart, real CSV export through Blob,
print stylesheet that prints only the report.

## Phase 11 - Theme and accessibility: DONE
Files: app.js, style.css, all *.html
Light / Dark / High contrast toggle on the Phase 1 variables, skip link on every page, focus-visible,
focus trap and Escape handling for modals, ARIA roles on tabs and dialogs, arrow-key tab navigation,
aria-live toasts, reduced-motion support.

## Verification
- node /home/user/tools/verify.js: VERIFY CLEAN
- jsdom harness: 229 passed, 0 failed
- jsdom flow smoke test: 44 passed, 0 failed

## Known issues
- Sessions and data live in localStorage only; this is a prototype, not real security.
- Queue positions and reminders refresh on page load and every 60 seconds, not through a live server.
- service-details.html is generic for faculty: every professor exposes one Academic Consultation service.

## Round 2 - Professor login and desk: DONE
Files: app.js, services.js, faculty.html (new), style.css, CHANGELOG.md
- Professor Login (username, Faculty ID fac-001 to fac-006, any password) from the Log In chooser.
- Professor sessions are exclusive with student sessions. Nav shows Professor Desk plus the username.
- Booking, cancelling, and rescheduling a professor appointment notifies that professor in the bell.
- faculty.html: login gate, profile, stats, filtered list, check-in / complete / missed actions with student notifications.
- Verification: verify.js CLEAN, jsdom suite 229/229, smoke 44/44, professor login 16/16, professor desk 18/18.

## Round 2 - Event banner upload: DONE
Files: officer.html, app.js, style.css, CHANGELOG.md
- Create-event form: optional banner upload with validation, preview, and remove button.
- If no image is uploaded, the generated banner is used (unchanged behaviour).
- Verification: banner test 17/17, full suite 229/229, smoke 44/44.
- Known issue: uploaded banners are stored in localStorage; many large uploads may approach the browser storage limit.

## Round 3 - Login order, organizer login, naming, greeting: DONE
Files: app.js, services.js, all *.html, style.css, CHANGELOG.md
- Login chooser: Student, Professor, Event Organizer.
- Organizer login uses username + organization/school ID (no password). Demo IDs ORG-001 to ORG-004.
- Nav and page wording: "Event Dashboard" after login; brand "Appointments and schedule".
- Header: only the seal links to ccsjdm.com.
- Greeting shows once per login session.
- Verification: verify.js CLEAN; regression suite 232/232; organizer/greeting/header test 26/26; smoke 44/44; professor 16/16; professor desk 18/18; banner 17/17.

## Round 4 - Organizer login restricted to faculty and staff: DONE
Files: app.js, CHANGELOG.md
- Organizer login field is "Faculty or Staff ID". Student ID numbers are refused. Accepts fac-001 to fac-006 and STF-001 to STF-003.
- Verification: verify.js CLEAN; regression suite 232/232; organizer test 29/29; smoke 44/44; professor 16/16; desk 18/18; banner 17/17.
