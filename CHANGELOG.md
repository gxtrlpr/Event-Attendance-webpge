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
