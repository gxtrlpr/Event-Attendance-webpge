const DESKTOP_MIN_WIDTH = 1024;
const HOST_USERNAME = 'Adminhost';
const HOST_PASSWORD = 'hostonly!';
const STORAGE_KEYS = {
    registrations: 'ccsjdm_registrations',
    customEvents: 'ccsjdm_custom_events',
    profile: 'ccsjdm_student_profile',
    profiles: 'ccsjdm_student_profiles',
    hostSession: 'ccsjdm_host_session',
    studentSession: 'ccsjdm_student_session'
};
const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
const MONTH_LOOKUP = {
    JAN: 0, JANUARY: 0, FEB: 1, FEBRUARY: 1, MAR: 2, MARCH: 2, APR: 3, APRIL: 3,
    MAY: 4, JUN: 5, JUNE: 5, JUL: 6, JULY: 6, AUG: 7, AUGUST: 7,
    SEP: 8, SEPT: 8, SEPTEMBER: 8, OCT: 9, OCTOBER: 9, NOV: 10, NOVEMBER: 10, DEC: 11, DECEMBER: 11
};
const STATUS_PENDING = 'Not Yet Checked In';
const STUDENT_ID_PATTERN = /^\d{4}-\d{5}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
}

function parseEventDate(dateText) {
    const match = String(dateText).trim().match(/^([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})$/);
    if (!match) return null;
    const month = MONTH_LOOKUP[match[1].toUpperCase()];
    if (month === undefined) return null;
    const parsed = new Date(Number(match[3]), month, Number(match[2]));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatEventDate(dateInputValue) {
    const parts = String(dateInputValue).split('-');
    if (parts.length !== 3) return dateInputValue;
    const month = MONTH_NAMES[Number(parts[1]) - 1] || parts[1];
    return month + ' ' + String(Number(parts[2])).padStart(2, '0') + ', ' + parts[0];
}

function startOfToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function daysUntil(dateText) {
    const target = parseEventDate(dateText);
    if (!target) return null;
    return Math.round((target - startOfToday()) / 86400000);
}

function buildEventBanner(title, category) {
    const themes = {
        Seminar: ['#1e88e5', '#0d47a1'],
        Workshop: ['#43a047', '#1b5e20'],
        Culture: ['#d81b60', '#880e4f'],
        Sports: ['#fb8c00', '#e65100']
    };
    const colors = themes[category] || ['#546e7a', '#263238'];
    const initials = String(title)
        .replace(/[^A-Za-z0-9 ]/g, '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(function (word) { return word[0].toUpperCase(); })
        .join('');
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">' +
        '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="' + colors[0] + '"/><stop offset="1" stop-color="' + colors[1] + '"/>' +
        '</linearGradient></defs>' +
        '<rect width="800" height="400" fill="url(#bg)"/>' +
        '<circle cx="710" cy="60" r="150" fill="#ffffff" opacity="0.08"/>' +
        '<circle cx="70" cy="370" r="190" fill="#ffffff" opacity="0.08"/>' +
        '<circle cx="620" cy="330" r="60" fill="#ffffff" opacity="0.06"/>' +
        '<text x="400" y="205" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="110" font-weight="700" fill="#ffffff" opacity="0.92">' + escapeHtml(initials) + '</text>' +
        '<text x="400" y="262" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="6" fill="#ffffff" opacity="0.75">' + escapeHtml(String(category).toUpperCase()) + '</text>' +
        '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function buildQrDataUrl(text) {
    const size = 21;
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    let seed = hash >>> 0;
    function nextRandom() {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
    }
    function inFinderZone(row, col) {
        return (row < 7 && col < 7) || (row < 7 && col >= size - 7) || (row >= size - 7 && col < 7);
    }
    let modules = '';
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (!inFinderZone(row, col) && nextRandom() > 0.52) {
                modules += '<rect x="' + col + '" y="' + row + '" width="1" height="1"/>';
            }
        }
    }
    function finder(x, y) {
        return '<rect x="' + x + '" y="' + y + '" width="7" height="7"/>' +
            '<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="5" height="5" fill="#ffffff"/>' +
            '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3"/>';
    }
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + ' ' + size + '" shape-rendering="crispEdges">' +
        '<rect width="' + size + '" height="' + size + '" fill="#ffffff"/>' +
        '<g fill="#1a2536">' + modules + finder(0, 0) + finder(size - 7, 0) + finder(0, size - 7) + '</g>' +
        '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

const seedEvents = [
    {
        id: 1,
        title: 'Leadership Seminar 2026',
        date: 'OCT 10, 2026',
        time: '9:00 AM - 4:00 PM',
        venue: 'San Jose Hall, CCSJDM Main Campus',
        organizer: 'CCSJDM Student Council',
        category: 'Seminar',
        description: 'Join an engaging day of academic leadership training and character development.',
        capacity: 50,
        registrationDeadline: 'OCT 07, 2026',
        targetAudience: 'BSIT and BSCS majors, 2nd to 4th year',
        speaker: 'Mr. Jose S. Dela Cruz, President, CCSJDM',
        requirements: ['Student ID', 'Completed application form', 'Proof of enrollment'],
        reminderNote: 'Bring your Student ID at check-in. Seats are assigned on arrival.'
    },
    {
        id: 2,
        title: 'Freshmen Orientation',
        date: 'OCT 15, 2026',
        time: '8:00 AM - 12:00 PM',
        venue: 'Main Auditorium',
        organizer: 'CCSJDM Student Council',
        category: 'Seminar',
        description: 'A welcome event for all first-year students entering the campus.',
        capacity: 200,
        registrationDeadline: 'OCT 13, 2026',
        targetAudience: 'All first-year students',
        speaker: 'University President',
        requirements: ['Student ID', 'Valid ID'],
        reminderNote: 'Students without a registration will not be admitted.'
    },
    {
        id: 3,
        title: 'Cultural Night',
        date: 'OCT 22, 2026',
        time: '5:00 PM - 9:00 PM',
        venue: 'Open Court',
        organizer: 'Cultural Arts Group',
        category: 'Culture',
        description: 'An evening showcasing local talents, performances, and cultural heritage.',
        capacity: 100,
        registrationDeadline: 'OCT 20, 2026',
        targetAudience: 'All students',
        speaker: 'Various performers',
        requirements: ['Audience ticket', 'Performance registration form (for performers)'],
        reminderNote: 'Arrive 30 minutes early for seat assignment.'
    },
    {
        id: 4,
        title: 'Tech Workshop',
        date: 'OCT 29, 2026',
        time: '1:00 PM - 5:00 PM',
        venue: 'Computer Lab 1',
        organizer: 'CCS Society',
        category: 'Workshop',
        description: 'Hands-on web development and software basics for students.',
        capacity: 30,
        registrationDeadline: 'OCT 27, 2026',
        targetAudience: 'BSCS and BSIT majors, 2nd to 4th year',
        speaker: 'Computer Science Faculty',
        requirements: ['Laptop', 'Basic programming knowledge'],
        reminderNote: 'Please install the required software before attending.'
    }
];

seedEvents.forEach(function (event) {
    event.banner = buildEventBanner(event.title, event.category);
});

let eventsData = seedEvents.slice();
let customEvents = [];
let registrations = [];
let studentProfile = { id: '', name: '', course: '', email: '' };
let studentProfiles = {};
let pendingRegisterIntent = false;

function loadStorage() {
    try {
        const storedRegistrations = localStorage.getItem(STORAGE_KEYS.registrations);
        if (storedRegistrations) {
            registrations = JSON.parse(storedRegistrations);
        } else {
            registrations = [
                {
                    id: 101,
                    eventId: 1,
                    eventTitle: 'Leadership Seminar 2026',
                    studentId: '2026-00123',
                    studentName: 'Juan Dela Cruz',
                    studentCourse: 'BSIT 3A',
                    studentEmail: '',
                    registrationDate: new Date().toISOString(),
                    eventCode: '2026-00123',
                    attendanceStatus: STATUS_PENDING,
                    checkInTime: null,
                    checkInMethod: null
                },
                {
                    id: 102,
                    eventId: 2,
                    eventTitle: 'Freshmen Orientation',
                    studentId: '2026-00456',
                    studentName: 'Maria Santos',
                    studentCourse: 'BSCS 1B',
                    studentEmail: '',
                    registrationDate: new Date().toISOString(),
                    eventCode: '2026-00456',
                    attendanceStatus: 'Attended',
                    checkInTime: new Date(Date.now() - 3600000).toISOString(),
                    checkInMethod: 'QR Scan'
                }
            ];
            localStorage.setItem(STORAGE_KEYS.registrations, JSON.stringify(registrations));
        }

        const storedCustomEvents = localStorage.getItem(STORAGE_KEYS.customEvents);
        if (storedCustomEvents) {
            customEvents = JSON.parse(storedCustomEvents);
            customEvents.forEach(function (event) {
                if (!event.banner) event.banner = buildEventBanner(event.title, event.category);
            });
            eventsData = seedEvents.concat(customEvents);
        }

        const storedProfiles = localStorage.getItem(STORAGE_KEYS.profiles);
        if (storedProfiles) {
            const parsedProfiles = JSON.parse(storedProfiles);
            if (parsedProfiles && typeof parsedProfiles === 'object') {
                studentProfiles = parsedProfiles;
            }
        }
        refreshStudentProfile();
    } catch (error) {
        registrations = registrations.length ? registrations : [];
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEYS.registrations, JSON.stringify(registrations));
    localStorage.setItem(STORAGE_KEYS.customEvents, JSON.stringify(customEvents));
}

function saveProfile() {
    localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(studentProfiles));
}

function statusPillClass(status) {
    if (status === 'Attended') return 'attended';
    if (status === 'Late') return 'late';
    if (status === 'Absent') return 'absent';
    if (status === 'Excused') return 'excused';
    return 'pending';
}

function registeredCountFor(eventId) {
    return registrations.filter(function (reg) { return reg.eventId === eventId; }).length;
}

function showNotification(message, type) {
    const kind = type || 'info';
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'notification-toast ' + kind;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            toast.classList.add('show');
        });
    });
    setTimeout(function () {
        toast.classList.remove('show');
        setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
}

function showFormError(errorElement, message) {
    if (!errorElement) return;
    errorElement.textContent = message;
    errorElement.hidden = false;
}

function clearFormError(errorElement) {
    if (!errorElement) return;
    errorElement.textContent = '';
    errorElement.hidden = true;
}

function setFieldError(input, errorElement, message) {
    if (message) {
        input.classList.add('input-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.hidden = false;
        }
        return false;
    }
    input.classList.remove('input-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.hidden = true;
    }
    return true;
}

function isHostLoggedIn() {
    try {
        const session = JSON.parse(localStorage.getItem(STORAGE_KEYS.hostSession));
        return Boolean(session && session.username);
    } catch (error) {
        return false;
    }
}

function getHostSession() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.hostSession)) || null;
    } catch (error) {
        return null;
    }
}

function validateHostCredentials(username, password) {
    return username === HOST_USERNAME && password === HOST_PASSWORD;
}

function startHostSession(username) {
    localStorage.setItem(STORAGE_KEYS.hostSession, JSON.stringify({
        username: username,
        loginTime: new Date().toISOString()
    }));
}

function endHostSession() {
    localStorage.removeItem(STORAGE_KEYS.hostSession);
}

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (!modal || !isDesktopDevice()) return;
    modal.hidden = false;
    const usernameInput = document.getElementById('loginUsername');
    if (usernameInput) usernameInput.focus();
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (!modal) return;
    modal.hidden = true;
    const form = document.getElementById('loginForm');
    if (form) form.reset();
    clearFormError(document.getElementById('loginError'));
}

function initHostLoginModal(onGranted) {
    const modal = document.getElementById('loginModal');
    const form = document.getElementById('loginForm');
    if (!modal || !form) return;

    const openButton = document.getElementById('openLoginModalBtn');
    const closeButton = document.getElementById('closeLoginModal');
    const cancelButton = document.getElementById('cancelLoginModal');
    const errorElement = document.getElementById('loginError');

    if (openButton) openButton.onclick = openLoginModal;
    if (closeButton) closeButton.onclick = closeLoginModal;
    if (cancelButton) cancelButton.onclick = closeLoginModal;

    modal.onclick = function (clickEvent) {
        if (clickEvent.target === modal) closeLoginModal();
    };

    form.onsubmit = function (submitEvent) {
        submitEvent.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!username || !password) {
            showFormError(errorElement, 'Please enter both username and password.');
            return;
        }
        if (!validateHostCredentials(username, password)) {
            showFormError(errorElement, 'Invalid username or password. Access denied.');
            return;
        }
        if (!isDesktopDevice()) {
            showFormError(errorElement, 'The Host Dashboard is available on desktop computers only.');
            return;
        }

        startHostSession(username);
        closeLoginModal();
        applyOfficerAccess();
        if (typeof onGranted === 'function') onGranted();
        showNotification('Login successful. Welcome, ' + username + '!', 'success');
    };
}

function isDesktopDevice() {
    const viewportWidth = Math.max(window.innerWidth || 0, document.documentElement.clientWidth || 0);
    return viewportWidth >= DESKTOP_MIN_WIDTH;
}

function applyDeviceClass() {
    document.documentElement.classList.toggle('device-blocked', !isDesktopDevice());
}

function getStudentSession() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.studentSession)) || null;
    } catch (error) {
        return null;
    }
}

function isStudentLoggedIn() {
    const session = getStudentSession();
    return !!(session && session.studentId && session.username);
}

function refreshStudentProfile() {
    const session = getStudentSession();
    if (!session || !session.studentId) {
        studentProfile = { id: '', name: '', course: '', email: '' };
        return;
    }
    const saved = studentProfiles[session.studentId] || {};
    studentProfile = {
        id: session.studentId,
        name: session.username,
        course: saved.course || '',
        email: saved.email || ''
    };
}

function startStudentSession(username, studentId) {
    localStorage.setItem(STORAGE_KEYS.studentSession, JSON.stringify({
        username: username,
        studentId: studentId,
        loginTime: new Date().toISOString()
    }));
    if (!studentProfiles[studentId]) studentProfiles[studentId] = { course: '', email: '' };
    studentProfiles[studentId].name = username;
    saveProfile();
    refreshStudentProfile();
}

function endStudentSession() {
    localStorage.removeItem(STORAGE_KEYS.studentSession);
    refreshStudentProfile();
}

function currentUserLabel() {
    if (isStudentLoggedIn()) return getStudentSession().username;
    if (isHostLoggedIn()) return getHostSession().username;
    return '';
}

function injectAuthModals() {
    if (!document.getElementById('authChoiceModal')) {
        const choice = document.createElement('div');
        choice.className = 'modal auth-modal';
        choice.id = 'authChoiceModal';
        choice.hidden = true;
        choice.setAttribute('role', 'dialog');
        choice.setAttribute('aria-modal', 'true');
        choice.innerHTML =
            '<div class="modal-content auth-choice-content">' +
            '<button type="button" class="close-btn auth-close" data-auth-close aria-label="Close login window">&times;</button>' +
            '<div class="auth-choice-icon">&#128100;</div>' +
            '<h2>Log in to continue</h2>' +
            '<p class="auth-choice-text">Choose how you want to sign in. You will stay on this page after logging in.</p>' +
            '<div class="auth-choice-buttons">' +
            '<button type="button" class="auth-choice-btn" id="chooseStudentLogin">' +
            '<span class="auth-choice-emoji">&#127891;</span>' +
            '<span class="auth-choice-label">Student Login</span>' +
            '<span class="auth-choice-sub">Register for events and track attendance</span>' +
            '</button>' +
            '<button type="button" class="auth-choice-btn" id="chooseHostLogin">' +
            '<span class="auth-choice-emoji">&#128272;</span>' +
            '<span class="auth-choice-label">Host Login</span>' +
            '<span class="auth-choice-sub">Manage events and record attendance</span>' +
            '</button>' +
            '</div>' +
            '</div>';
        document.body.appendChild(choice);
    }

    if (!document.getElementById('studentLoginModal')) {
        const student = document.createElement('div');
        student.className = 'modal auth-modal';
        student.id = 'studentLoginModal';
        student.hidden = true;
        student.setAttribute('role', 'dialog');
        student.setAttribute('aria-modal', 'true');
        student.innerHTML =
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h2>Student Login</h2>' +
            '<button type="button" class="close-btn" data-auth-close aria-label="Close login window">&times;</button>' +
            '</div>' +
            '<form id="studentLoginForm" novalidate>' +
            '<div class="form-group">' +
            '<label for="studentLoginUsername">Username</label>' +
            '<input type="text" id="studentLoginUsername" placeholder="Enter your username" autocomplete="username">' +
            '<span class="field-error" id="studentLoginUsernameError" hidden></span>' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="studentLoginId">ID Number</label>' +
            '<input type="text" id="studentLoginId" placeholder="e.g. 2026-00123" autocomplete="off">' +
            '<span class="field-error" id="studentLoginIdError" hidden></span>' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="studentLoginPassword">Password</label>' +
            '<input type="password" id="studentLoginPassword" placeholder="Enter your password" autocomplete="current-password">' +
            '<span class="field-error" id="studentLoginPasswordError" hidden></span>' +
            '</div>' +
            '<div class="form-error" id="studentLoginError" hidden></div>' +
            '<div class="modal-actions">' +
            '<button type="button" class="btn-secondary" id="studentLoginBack">Back</button>' +
            '<button type="submit" class="btn-primary">Log In</button>' +
            '</div>' +
            '</form>' +
            '</div>';
        document.body.appendChild(student);
    }

    if (!document.getElementById('loginModal')) {
        const host = document.createElement('div');
        host.className = 'modal auth-modal';
        host.id = 'loginModal';
        host.hidden = true;
        host.setAttribute('role', 'dialog');
        host.setAttribute('aria-modal', 'true');
        host.innerHTML =
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h2>Host Login</h2>' +
            '<button type="button" class="close-btn" id="closeLoginModal" aria-label="Close login window">&times;</button>' +
            '</div>' +
            '<form id="loginForm" novalidate>' +
            '<div class="form-group">' +
            '<label for="loginUsername">Username</label>' +
            '<input type="text" id="loginUsername" placeholder="Enter your username" autocomplete="username">' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="loginPassword">Password</label>' +
            '<input type="password" id="loginPassword" placeholder="Enter your password" autocomplete="current-password">' +
            '</div>' +
            '<div class="form-error" id="loginError" hidden></div>' +
            '<div class="modal-actions">' +
            '<button type="button" class="btn-secondary" id="cancelLoginModal">Cancel</button>' +
            '<button type="submit" class="btn-primary">Login</button>' +
            '</div>' +
            '</form>' +
            '</div>';
        document.body.appendChild(host);
    }
}

function closeAuthModals() {
    ['authChoiceModal', 'studentLoginModal', 'loginModal'].forEach(function (id) {
        const modal = document.getElementById(id);
        if (modal) modal.hidden = true;
    });
    document.body.classList.remove('modal-open');
    pendingRegisterIntent = false;
}

function openAuthChoiceModal() {
    injectAuthModals();
    const modal = document.getElementById('authChoiceModal');
    if (!modal) return;
    ['studentLoginModal', 'loginModal'].forEach(function (id) {
        const other = document.getElementById(id);
        if (other) other.hidden = true;
    });
    modal.hidden = false;
    document.body.classList.add('modal-open');
}

function openStudentLoginModal() {
    injectAuthModals();
    const choice = document.getElementById('authChoiceModal');
    const modal = document.getElementById('studentLoginModal');
    if (choice) choice.hidden = true;
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    const first = document.getElementById('studentLoginUsername');
    if (first) first.focus();
}

function openHostLoginModal() {
    injectAuthModals();
    const choice = document.getElementById('authChoiceModal');
    const modal = document.getElementById('loginModal');
    if (choice) choice.hidden = true;
    if (!modal || !isDesktopDevice()) {
        if (!isDesktopDevice()) showNotification('The Host Dashboard is available on desktop computers only.', 'warning');
        return;
    }
    modal.hidden = false;
    document.body.classList.add('modal-open');
    const first = document.getElementById('loginUsername');
    if (first) first.focus();
}

function initAuthUi() {
    injectAuthModals();

    document.querySelectorAll('[data-auth-close]').forEach(function (button) {
        button.onclick = closeAuthModals;
    });

    ['authChoiceModal', 'studentLoginModal', 'loginModal'].forEach(function (id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.onclick = function (clickEvent) {
            if (clickEvent.target === modal) closeAuthModals();
        };
    });

    const studentChoice = document.getElementById('chooseStudentLogin');
    if (studentChoice) studentChoice.onclick = openStudentLoginModal;

    const hostChoice = document.getElementById('chooseHostLogin');
    if (hostChoice) hostChoice.onclick = openHostLoginModal;

    const backButton = document.getElementById('studentLoginBack');
    if (backButton) backButton.onclick = openAuthChoiceModal;

    const studentForm = document.getElementById('studentLoginForm');
    if (studentForm) {
        studentForm.onsubmit = function (submitEvent) {
            submitEvent.preventDefault();
            const username = document.getElementById('studentLoginUsername').value.trim();
            const studentId = document.getElementById('studentLoginId').value.trim();
            const password = document.getElementById('studentLoginPassword').value;

            const okUser = setFieldError(
                document.getElementById('studentLoginUsername'),
                document.getElementById('studentLoginUsernameError'),
                username.length >= 2 ? '' : 'Please enter your username.');
            const okId = setFieldError(
                document.getElementById('studentLoginId'),
                document.getElementById('studentLoginIdError'),
                studentId.length >= 2 ? '' : 'Please enter your ID number.');
            const okPass = setFieldError(
                document.getElementById('studentLoginPassword'),
                document.getElementById('studentLoginPasswordError'),
                password.length >= 1 ? '' : 'Please enter your password.');
            if (!okUser || !okId || !okPass) return;

            const wantedRegister = pendingRegisterIntent;
            startStudentSession(username, studentId);
            closeAuthModals();
            studentForm.reset();
            renderAuthArea();
            renderGreeting();
            refreshCurrentPage();
            showNotification('Welcome, ' + username + '!', 'success');

            if (wantedRegister) {
                const registerButton = document.getElementById('confirmRegisterBtn');
                if (registerButton) registerButton.click();
            }
        };
    }

    const hostForm = document.getElementById('loginForm');
    if (hostForm && !document.getElementById('hostLoginGate')) {
        hostForm.onsubmit = function (submitEvent) {
            submitEvent.preventDefault();
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            const errorElement = document.getElementById('loginError');

            if (!username || !password) {
                showFormError(errorElement, 'Please enter both username and password.');
                return;
            }
            if (!validateHostCredentials(username, password)) {
                showFormError(errorElement, 'Invalid username or password. Access denied.');
                return;
            }
            if (!isDesktopDevice()) {
                showFormError(errorElement, 'The Host Dashboard is available on desktop computers only.');
                return;
            }

            startHostSession(username);
            closeAuthModals();
            hostForm.reset();
            window.location.href = 'officer.html';
        };
        const cancelHost = document.getElementById('cancelLoginModal');
        if (cancelHost) cancelHost.onclick = closeAuthModals;
        const closeHost = document.getElementById('closeLoginModal');
        if (closeHost) closeHost.onclick = closeAuthModals;
    }
}

function renderAuthArea() {
    const area = document.getElementById('navAuthArea');
    if (!area) return;

    if (isStudentLoggedIn()) {
        const session = getStudentSession();
        area.innerHTML =
            '<span class="nav-user">&#127891; ' + escapeHtml(session.username) + '</span>' +
            '<button type="button" class="btn-logout" id="navLogoutBtn">Logout</button>';
    } else if (isHostLoggedIn()) {
        const session = getHostSession();
        area.innerHTML =
            '<a class="nav-link-host" href="officer.html">Host Dashboard</a>' +
            '<span class="nav-user">&#128272; ' + escapeHtml(session.username) + '</span>' +
            '<button type="button" class="btn-logout" id="navLogoutBtn">Logout</button>';
    } else {
        area.innerHTML = '<button type="button" class="btn-login" id="navLoginBtn">Log In</button>';
    }

    const loginButton = document.getElementById('navLoginBtn');
    if (loginButton) loginButton.onclick = function () { openAuthChoiceModal(); };

    const logoutButton = document.getElementById('navLogoutBtn');
    if (logoutButton) {
        logoutButton.onclick = function () {
            const wasStudent = isStudentLoggedIn();
            if (wasStudent) endStudentSession(); else endHostSession();
            renderAuthArea();
            renderGreeting();
            refreshCurrentPage();
            showNotification('You have been logged out.', 'info');
        };
    }
}

function renderGreeting() {
    const greeting = document.getElementById('userGreeting');
    if (!greeting) return;

    const name = currentUserLabel();
    if (!name) {
        greeting.hidden = true;
        greeting.innerHTML = '';
        return;
    }

    const role = isStudentLoggedIn() ? 'Student' : 'Host';
    greeting.hidden = false;
    greeting.innerHTML =
        '<span class="greeting-avatar">' + escapeHtml(name.charAt(0).toUpperCase()) + '</span>' +
        '<span class="greeting-text"><strong>Welcome back, ' + escapeHtml(name) + '!</strong>' +
        '<small>Signed in as ' + role + '</small></span>';
}

function refreshCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('event-details.html')) {
        initEventDetailsPage();
    } else if (path.includes('my-events.html')) {
        initMyEventsPage();
    } else if (path.includes('events.html')) {
        initEventsPage();
    } else if (!path.includes('officer.html') && !path.includes('checkin.html')) {
        initHomeIntroPage();
    }
}

function getProtectedMain() {
    return document.getElementById('officerMain') || document.getElementById('checkinMain');
}

function applyOfficerAccess() {
    const gate = document.getElementById('hostLoginGate');
    const main = getProtectedMain();
    const badge = document.getElementById('hostUserBadge');
    const notice = document.getElementById('desktopOnlyNotice');
    const desktop = isDesktopDevice();
    const loggedIn = isHostLoggedIn();

    applyDeviceClass();

    if (notice) notice.hidden = desktop;

    if (!desktop) {
        if (gate) gate.hidden = true;
        if (main) main.hidden = true;
        const openModal = document.getElementById('loginModal');
        if (openModal) openModal.hidden = true;
        return;
    }

    if (gate) gate.hidden = loggedIn;
    if (main) main.hidden = !loggedIn;
    if (badge && loggedIn) {
        const session = getHostSession();
        badge.textContent = 'Logged in as ' + session.username;
    }
}

function initHostAccessControls(onGranted) {
    applyOfficerAccess();
    initHostLoginModal(onGranted);

    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.onclick = function () {
            endHostSession();
            applyOfficerAccess();
            showNotification('You have been logged out.', 'info');
        };
    }
}

function initHomeIntroPage() {
    const featuredGrid = document.getElementById('featuredEventsGrid');
    const eventCountEl = document.getElementById('homeEventCount');
    if (!featuredGrid && !eventCountEl) return;

    const upcoming = eventsData.filter(function (event) {
        return daysUntil(event.date) >= 0;
    }).sort(function (a, b) {
        return parseEventDate(a.date) - parseEventDate(b.date);
    });

    if (eventCountEl) eventCountEl.textContent = upcoming.length;

    const slotEl = document.getElementById('homeSlotCount');
    if (slotEl) {
        const slots = upcoming.reduce(function (total, event) {
            return total + Math.max(event.capacity - registeredCountFor(event.id), 0);
        }, 0);
        slotEl.textContent = slots;
    }

    const orgEl = document.getElementById('homeOrgCount');
    if (orgEl) {
        const organizers = [];
        eventsData.forEach(function (event) {
            if (organizers.indexOf(event.organizer) === -1) organizers.push(event.organizer);
        });
        orgEl.textContent = organizers.length;
    }

    if (!featuredGrid) return;

    if (upcoming.length === 0) {
        featuredGrid.innerHTML = '<p class="no-events">There are no upcoming events at the moment. Please check back soon.</p>';
        return;
    }

    featuredGrid.innerHTML = upcoming.slice(0, 3).map(function (event) {
        const registeredCount = registeredCountFor(event.id);
        const slotsLeft = Math.max(event.capacity - registeredCount, 0);
        return '<article class="event-card">' +
            '<img src="' + event.banner + '" alt="' + escapeHtml(event.title) + ' event banner">' +
            '<div class="card-body">' +
            '<span class="event-category-badge ' + escapeHtml(event.category.toLowerCase()) + '">' + escapeHtml(event.category) + '</span>' +
            '<h3 class="card-title">' + escapeHtml(event.title) + '</h3>' +
            '<p class="card-info">&#128197; ' + escapeHtml(formatEventDate(event.date)) + '</p>' +
            '<p class="card-info">&#128205; ' + escapeHtml(event.venue) + '</p>' +
            '<p class="card-desc">' + escapeHtml(event.description) + '</p>' +
            '<div class="card-footer-info">' +
            '<span>' + escapeHtml(event.organizer) + '</span>' +
            '<span class="slots-badge ' + (slotsLeft > 0 ? 'available' : 'full') + '">' +
            (slotsLeft > 0 ? slotsLeft + ' slots left' : 'Full') + '</span>' +
            '</div>' +
            '<a class="btn-register" href="event-details.html?id=' + event.id + '">View Details</a>' +
            '</div>' +
            '</article>';
    }).join('');
}

function initEventsPage() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const dateFilter = document.getElementById('dateFilter');
    const orgFilter = document.getElementById('orgFilter');
    const categoryChips = document.querySelectorAll('.chip');

    const organizers = [];
    eventsData.forEach(function (event) {
        if (organizers.indexOf(event.organizer) === -1) organizers.push(event.organizer);
    });
    if (orgFilter) {
        orgFilter.innerHTML = '<option value="all">Organization: All</option>' +
            organizers.map(function (name) {
                return '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + '</option>';
            }).join('');
    }

    function renderCards(events) {
        eventsGrid.innerHTML = '';
        if (events.length === 0) {
            eventsGrid.innerHTML = '<p class="no-events">No events found matching your filters.</p>';
            return;
        }

        events.forEach(function (event) {
            const registeredCount = registeredCountFor(event.id);
            const isFull = registeredCount >= event.capacity;
            const isRegistered = registrations.some(function (reg) {
                return reg.eventId === event.id && reg.studentId === studentProfile.id;
            });

            let buttonLabel = 'View &amp; Register';
            let buttonClass = 'btn-register';
            if (isRegistered) {
                buttonLabel = '&#10003; Registered';
                buttonClass = 'btn-register btn-success';
            } else if (isFull) {
                buttonLabel = 'Event Full';
                buttonClass = 'btn-register btn-disabled';
            }

            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML =
                '<img src="' + event.banner + '" alt="' + escapeHtml(event.title) + ' event banner">' +
                '<div class="card-body">' +
                '<span class="event-category-badge ' + escapeHtml(event.category.toLowerCase()) + '">' + escapeHtml(event.category) + '</span>' +
                '<h3 class="card-title">' + escapeHtml(event.title) + '</h3>' +
                '<p class="card-info"><strong>Date:</strong> ' + escapeHtml(event.date) + '</p>' +
                '<p class="card-info"><strong>Time:</strong> ' + escapeHtml(event.time) + '</p>' +
                '<p class="card-info"><strong>Venue:</strong> ' + escapeHtml(event.venue) + '</p>' +
                '<p class="card-info"><strong>Organizer:</strong> ' + escapeHtml(event.organizer) + '</p>' +
                '<p class="card-desc">' + escapeHtml(event.description) + '</p>' +
                '<div class="card-footer-info">' +
                '<span class="slots-badge ' + (isFull ? 'full' : 'available') + '">' + registeredCount + '/' + event.capacity + ' Slots</span>' +
                '</div>' +
                '<a href="event-details.html?id=' + event.id + '" class="' + buttonClass + '">' + buttonLabel + '</a>' +
                '</div>';
            eventsGrid.appendChild(card);
        });
    }

    function filterAndRender() {
        let filtered = eventsData.slice();
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const activeChip = document.querySelector('.chip.active');
        const category = activeChip ? activeChip.getAttribute('data-category') : 'all';
        const orgValue = orgFilter ? orgFilter.value : 'all';
        const dateValue = dateFilter ? dateFilter.value : 'all';

        if (query) {
            filtered = filtered.filter(function (event) {
                return event.title.toLowerCase().includes(query) ||
                    event.description.toLowerCase().includes(query) ||
                    event.organizer.toLowerCase().includes(query) ||
                    event.venue.toLowerCase().includes(query);
            });
        }

        if (category !== 'all') {
            filtered = filtered.filter(function (event) { return event.category === category; });
        }

        if (orgValue !== 'all') {
            filtered = filtered.filter(function (event) { return event.organizer === orgValue; });
        }

        if (dateValue === 'all') {
            filtered = filtered.filter(function (event) {
                const days = daysUntil(event.date);
                return days === null || days >= 0;
            });
        } else if (dateValue === 'this-week') {
            filtered = filtered.filter(function (event) {
                const days = daysUntil(event.date);
                return days !== null && days >= 0 && days <= 7;
            });
        } else if (dateValue === 'next-week') {
            filtered = filtered.filter(function (event) {
                const days = daysUntil(event.date);
                return days !== null && days >= 8 && days <= 14;
            });
        }

        renderCards(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterAndRender);
    if (searchBtn) searchBtn.addEventListener('click', filterAndRender);
    if (dateFilter) dateFilter.addEventListener('change', filterAndRender);
    if (orgFilter) orgFilter.addEventListener('change', filterAndRender);

    categoryChips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            categoryChips.forEach(function (other) { other.classList.remove('active'); });
            chip.classList.add('active');
            filterAndRender();
        });
    });

    filterAndRender();
}

function initEventDetailsPage() {
    const container = document.getElementById('eventDetailsContainer');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'), 10);
    const event = eventsData.find(function (item) { return item.id === eventId; });

    if (!event) {
        container.innerHTML =
            '<div class="error-state">' +
            '<h3>Event not found</h3>' +
            '<p>The event you are looking for does not exist or has been removed.</p>' +
            '<a href="index.html" class="btn-primary">Back to Home</a>' +
            '</div>';
        return;
    }

    const registeredCount = registeredCountFor(eventId);
    const isFull = registeredCount >= event.capacity;
    const myRegistration = registrations.find(function (reg) {
        return reg.eventId === eventId && reg.studentId === studentProfile.id;
    });

    let actionFooter;
    if (myRegistration) {
        actionFooter =
            '<div class="registered-success-box">' +
            '<h3>You are registered for this event!</h3>' +
            '<p>Your Student ID: <code class="highlight-code">' + escapeHtml(myRegistration.eventCode) + '</code></p>' +
            '<img class="qr-preview" src="' + buildQrDataUrl(myRegistration.eventCode) + '" alt="Event code QR mock">' +
            '<a href="my-events.html" class="btn-secondary">View in My Schedule</a>' +
            '</div>';
    } else if (isFull) {
        actionFooter = '<button class="btn-register-large" disabled>Event Full</button>';
    } else {
        actionFooter = '<button class="btn-register-large" id="confirmRegisterBtn">Register Now</button>';
    }

    container.innerHTML =
        '<div class="event-detail-card">' +
        '<img src="' + event.banner + '" alt="' + escapeHtml(event.title) + ' event banner" class="event-detail-image">' +
        '<div class="event-detail-content">' +
        '<div class="event-meta-top">' +
        '<span class="event-category-badge ' + escapeHtml(event.category.toLowerCase()) + '">' + escapeHtml(event.category) + '</span>' +
        '<span class="slots-indicator">' + registeredCount + ' / ' + event.capacity + ' slots filled</span>' +
        '</div>' +
        '<h1 class="event-title">' + escapeHtml(event.title) + '</h1>' +
        '<p class="event-organizer-big">Organized by <strong>' + escapeHtml(event.organizer) + '</strong></p>' +
        '<div class="event-details-grid">' +
        '<div class="detail-item"><span class="detail-icon">&#128197;</span><div><h3>Date</h3><p>' + escapeHtml(event.date) + '</p></div></div>' +
        '<div class="detail-item"><span class="detail-icon">&#128336;</span><div><h3>Time</h3><p>' + escapeHtml(event.time) + '</p></div></div>' +
        '<div class="detail-item"><span class="detail-icon">&#128205;</span><div><h3>Venue</h3><p>' + escapeHtml(event.venue) + '</p></div></div>' +
        '<div class="detail-item"><span class="detail-icon">&#127919;</span><div><h3>Target Audience</h3><p>' + escapeHtml(event.targetAudience || 'All students') + '</p></div></div>' +
        '<div class="detail-item"><span class="detail-icon">&#127908;</span><div><h3>Speaker</h3><p>' + escapeHtml(event.speaker || 'To be announced') + '</p></div></div>' +
        '<div class="detail-item"><span class="detail-icon">&#9203;</span><div><h3>Registration Deadline</h3><p>' + escapeHtml(event.registrationDeadline) + '</p></div></div>' +
        '</div>' +
        '<div class="section-divider"></div>' +
        '<h2>About This Event</h2>' +
        '<p class="event-description-full">' + escapeHtml(event.description) + '</p>' +
        '<div class="section-divider"></div>' +
        '<h2>Requirements</h2>' +
        '<ul class="requirements-list">' +
        (event.requirements || ['Student ID']).map(function (item) {
            return '<li>&#10003; ' + escapeHtml(item) + '</li>';
        }).join('') +
        '</ul>' +
        (event.reminderNote
            ? '<div class="reminder-box"><h4>Important Reminder</h4><p>' + escapeHtml(event.reminderNote) + '</p></div>'
            : '') +
        '<div class="section-divider"></div>' +
        '<div class="event-action-footer">' + actionFooter + '</div>' +
        '</div>' +
        '</div>';

    const registerModal = document.getElementById('registerModal');
    const registerForm = document.getElementById('registerForm');
    const registerModalEventName = document.getElementById('registerModalEventName');
    const registerFormError = document.getElementById('registerFormError');
    const nameInput = document.getElementById('regName');
    const studentIdInput = document.getElementById('regStudentId');
    const courseInput = document.getElementById('regCourse');
    const emailInput = document.getElementById('regEmail');
    const nameError = document.getElementById('regNameError');
    const studentIdError = document.getElementById('regStudentIdError');
    const courseError = document.getElementById('regCourseError');
    const emailError = document.getElementById('regEmailError');
    const successModal = document.getElementById('successModal');

    if (!registerModal || !registerForm) return;

    function clearRegistrationFormErrors() {
        setFieldError(nameInput, nameError, '');
        setFieldError(studentIdInput, studentIdError, '');
        setFieldError(courseInput, courseError, '');
        setFieldError(emailInput, emailError, '');
        clearFormError(registerFormError);
    }

    function openRegisterModal() {
        clearRegistrationFormErrors();
        registerModalEventName.textContent = 'Registering for: ' + event.title + ' (' + event.date + ')';
        nameInput.value = studentProfile.name || '';
        studentIdInput.value = studentProfile.id || '';
        courseInput.value = studentProfile.course || '';
        emailInput.value = studentProfile.email || '';
        studentIdInput.readOnly = true;
        registerModal.hidden = false;
        nameInput.focus();
    }

    function closeRegisterModal() {
        registerModal.hidden = true;
    }

    const registerButton = document.getElementById('confirmRegisterBtn');
    if (registerButton) {
        registerButton.onclick = function () {
            if (!isStudentLoggedIn()) {
                pendingRegisterIntent = true;
                showNotification('Please log in as a student to register for this event.', 'info');
                openStudentLoginModal();
                return;
            }
            openRegisterModal();
        };
    }
    document.getElementById('closeRegisterModal').onclick = closeRegisterModal;
    document.getElementById('cancelRegisterModal').onclick = closeRegisterModal;

    registerForm.onsubmit = function (submitEvent) {
        submitEvent.preventDefault();
        clearFormError(registerFormError);

        const name = nameInput.value.trim();
        const studentId = studentIdInput.value.trim().toUpperCase();
        const course = courseInput.value.trim();
        const email = emailInput.value.trim();

        let valid = true;
        valid = setFieldError(nameInput, nameError, name.length < 2 ? 'Please enter your full name.' : '') && valid;
        valid = setFieldError(studentIdInput, studentIdError, !STUDENT_ID_PATTERN.test(studentId) ? 'Student ID must follow the format 2026-00123.' : '') && valid;
        valid = setFieldError(courseInput, courseError, course.length < 2 ? 'Please enter your course and year/section.' : '') && valid;
        valid = setFieldError(emailInput, emailError, email && !EMAIL_PATTERN.test(email) ? 'Please enter a valid email address.' : '') && valid;
        if (!valid) return;

        const alreadyRegistered = registrations.some(function (reg) {
            return reg.eventId === eventId && reg.studentId === studentId;
        });
        if (alreadyRegistered) {
            showFormError(registerFormError, 'This Student ID is already registered for this event.');
            return;
        }
        if (registeredCountFor(eventId) >= event.capacity) {
            showFormError(registerFormError, 'Sorry, this event has reached its capacity.');
            return;
        }
        const deadlineDays = daysUntil(event.registrationDeadline);
        if (deadlineDays !== null && deadlineDays < 0) {
            showFormError(registerFormError, 'Registration for this event has closed.');
            return;
        }

        const eventCode = studentId;
        registrations.push({
            id: Date.now(),
            eventId: eventId,
            eventTitle: event.title,
            studentId: studentId,
            studentName: name,
            studentCourse: course,
            studentEmail: email,
            registrationDate: new Date().toISOString(),
            eventCode: eventCode,
            attendanceStatus: STATUS_PENDING,
            checkInTime: null,
            checkInMethod: null
        });

        studentProfiles[studentId] = { name: name, course: course, email: email };
        studentProfile = { id: studentId, name: name, course: course, email: email };
        saveProfile();
        saveData();

        closeRegisterModal();
        registerForm.reset();

        document.getElementById('successMessage').textContent =
            name + ', you are now registered for "' + event.title + '".';
        document.getElementById('assignedEventCode').textContent = eventCode;
        document.getElementById('successQrImage').src = buildQrDataUrl(eventCode);
        successModal.hidden = false;
        showNotification('Registration submitted successfully!', 'success');
    };

    document.getElementById('closeModalBtn').onclick = function () {
        successModal.hidden = true;
        initEventDetailsPage();
    };
}

function initMyEventsPage() {
    const regGrid = document.getElementById('myRegisteredGrid');
    const historyBody = document.getElementById('attendanceHistoryBody');
    const profileSummary = document.getElementById('studentProfileSummary');
    const regCount = document.getElementById('regCount');
    const histCount = document.getElementById('histCount');

    const gate = document.getElementById('studentLoginGate');
    const main = document.getElementById('myEventsMain');
    const loggedIn = isStudentLoggedIn();
    if (gate) gate.hidden = loggedIn;
    if (main) main.hidden = !loggedIn;

    const gateButton = document.getElementById('openStudentLoginBtn');
    if (gateButton) gateButton.onclick = openStudentLoginModal;

    if (!loggedIn) return;
    if (!regGrid || !historyBody) return;

    if (profileSummary) {
        profileSummary.innerHTML =
            '<span class="badge-user">&#128100; ' + escapeHtml(studentProfile.name) + ' (' + escapeHtml(studentProfile.id) + ')</span>' +
            '<span class="badge-course">' + escapeHtml(studentProfile.course) + '</span>';
    }

    const myRegistrations = registrations.filter(function (reg) {
        return reg.studentId === studentProfile.id;
    });
    regCount.textContent = myRegistrations.length;
    histCount.textContent = myRegistrations.length;

    if (myRegistrations.length === 0) {
        regGrid.innerHTML =
            '<div class="empty-state">' +
            '<div class="empty-icon">&#128197;</div>' +
            '<h3>You have no registered events.</h3>' +
            '<p>Browse the Events page and register for upcoming events.</p>' +
            '<a href="events.html" class="btn-primary">View Events</a>' +
            '</div>';
        historyBody.innerHTML = '<tr><td colspan="5" class="text-center">No attendance history yet.</td></tr>';
    } else {
        regGrid.innerHTML = '';
        myRegistrations.forEach(function (reg) {
            const event = eventsData.find(function (item) { return item.id === reg.eventId; });
            if (!event) return;

            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML =
                '<div class="card-body">' +
                '<span class="event-code-badge">Student ID: <strong>' + escapeHtml(reg.eventCode) + '</strong></span>' +
                '<h3 class="card-title">' + escapeHtml(event.title) + '</h3>' +
                '<p class="card-info"><strong>Date:</strong> ' + escapeHtml(event.date) + ' | ' + escapeHtml(event.time) + '</p>' +
                '<p class="card-info"><strong>Venue:</strong> ' + escapeHtml(event.venue) + '</p>' +
                '<div class="status-pill ' + statusPillClass(reg.attendanceStatus) + '">' + escapeHtml(reg.attendanceStatus) + '</div>' +
                '<div class="qr-container-mini">' +
                '<img src="' + buildQrDataUrl(reg.eventCode) + '" alt="Event code QR mock">' +
                '<span class="qr-hint">Show this at the check-in desk</span>' +
                '</div>' +
                '<div class="card-actions-row">' +
                '<a href="event-details.html?id=' + event.id + '" class="btn-secondary btn-sm">Details</a>' +
                '<button type="button" class="btn-danger-outline btn-sm" data-action="cancel-registration" data-reg-id="' + reg.id + '">Cancel</button>' +
                '</div>' +
                '</div>';
            regGrid.appendChild(card);
        });

        historyBody.innerHTML = '';
        myRegistrations.forEach(function (reg) {
            const event = eventsData.find(function (item) { return item.id === reg.eventId; });
            if (!event) return;

            const row = document.createElement('tr');
            row.innerHTML =
                '<td><strong>' + escapeHtml(event.title) + '</strong></td>' +
                '<td>' + escapeHtml(event.date) + '<br><small>' + escapeHtml(event.time) + '</small></td>' +
                '<td>' + escapeHtml(event.venue) + '</td>' +
                '<td><code>' + escapeHtml(reg.eventCode) + '</code></td>' +
                '<td>' +
                '<span class="status-pill ' + statusPillClass(reg.attendanceStatus) + '">' + escapeHtml(reg.attendanceStatus) + '</span>' +
                (reg.checkInTime ? '<br><small>Checked in at ' + new Date(reg.checkInTime).toLocaleTimeString() + '</small>' : '') +
                '</td>';
            historyBody.appendChild(row);
        });
    }

    regGrid.onclick = function (clickEvent) {
        const cancelButton = clickEvent.target.closest('[data-action="cancel-registration"]');
        if (!cancelButton) return;
        const regId = Number(cancelButton.getAttribute('data-reg-id'));
        const confirmed = window.confirm('Are you sure you want to cancel this registration?');
        if (!confirmed) return;

        registrations = registrations.filter(function (reg) { return reg.id !== regId; });
        saveData();
        showNotification('Registration cancelled successfully.', 'success');
        initMyEventsPage();
    };

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(function (button) {
        button.onclick = function () {
            tabButtons.forEach(function (other) { other.classList.remove('active'); });
            tabContents.forEach(function (content) { content.classList.remove('active'); });
            button.classList.add('active');
            document.getElementById(button.dataset.tab + 'Tab').classList.add('active');
        };
    });
}

function initOfficerPage() {
    const gate = document.getElementById('hostLoginGate');
    const main = document.getElementById('officerMain');
    if (!gate || !main) return;

    initHostAccessControls(initOfficerPage);

    if (!isHostLoggedIn()) return;

    const eventsTableBody = document.getElementById('officerEventsTableBody');
    const registrantsTableBody = document.getElementById('registrantsTableBody');
    const eventFilterSelect = document.getElementById('eventFilterSelect');
    const officerSearchInput = document.getElementById('officerSearchInput');
    const createModal = document.getElementById('createEventModal');
    const createForm = document.getElementById('createEventForm');

    document.getElementById('totalEventsCount').textContent = eventsData.length;
    document.getElementById('totalRegistrantsCount').textContent = registrations.length;
    const checkedInCount = registrations.filter(function (reg) {
        return reg.attendanceStatus === 'Attended' || reg.attendanceStatus === 'Late';
    }).length;
    document.getElementById('totalAttendeesCount').textContent = checkedInCount;
    const attendanceRate = registrations.length > 0
        ? Math.round((checkedInCount / registrations.length) * 100)
        : 0;
    document.getElementById('attendanceRate').textContent = attendanceRate + '%';

    function renderOfficerEvents(searchQuery) {
        const query = (searchQuery || '').trim().toLowerCase();
        const filtered = query
            ? eventsData.filter(function (event) {
                return event.title.toLowerCase().includes(query) ||
                    event.organizer.toLowerCase().includes(query);
            })
            : eventsData;

        eventsTableBody.innerHTML = '';
        if (filtered.length === 0) {
            eventsTableBody.innerHTML = '<tr><td colspan="6" class="text-center">No events match your search.</td></tr>';
            return;
        }

        filtered.forEach(function (event) {
            const registeredCount = registeredCountFor(event.id);
            const row = document.createElement('tr');
            row.innerHTML =
                '<td><strong>' + escapeHtml(event.title) + '</strong><br><small>' + escapeHtml(event.category) + ' &bull; ' + escapeHtml(event.organizer) + '</small></td>' +
                '<td>' + escapeHtml(event.date) + '<br><small>' + escapeHtml(event.time) + '</small></td>' +
                '<td>' + escapeHtml(event.venue) + '</td>' +
                '<td>' + registeredCount + ' / ' + event.capacity + ' slots</td>' +
                '<td><span class="status-pill active">Published</span></td>' +
                '<td><a href="checkin.html?event=' + event.id + '" class="btn-primary btn-sm">Check-in Desk</a></td>';
            eventsTableBody.appendChild(row);
        });
    }

    function rebuildEventFilter() {
        const previousValue = eventFilterSelect.value;
        eventFilterSelect.innerHTML =
            '<option value="all">All Events (' + registrations.length + ' registrants)</option>' +
            eventsData.map(function (event) {
                return '<option value="' + event.id + '">' + escapeHtml(event.title) + ' (' + registeredCountFor(event.id) + ' registrants)</option>';
            }).join('');
        if (previousValue && eventFilterSelect.querySelector('option[value="' + previousValue + '"]')) {
            eventFilterSelect.value = previousValue;
        }
    }

    function renderRegistrants(filterEventId) {
        const filtered = filterEventId === 'all'
            ? registrations
            : registrations.filter(function (reg) { return String(reg.eventId) === String(filterEventId); });

        registrantsTableBody.innerHTML = '';
        if (filtered.length === 0) {
            registrantsTableBody.innerHTML = '<tr><td colspan="7" class="text-center">No registrants for this event yet.</td></tr>';
            return;
        }

        filtered.forEach(function (reg) {
            const row = document.createElement('tr');
            row.innerHTML =
                '<td><strong>' + escapeHtml(reg.studentName) + '</strong></td>' +
                '<td>' + escapeHtml(reg.studentId) + '</td>' +
                '<td>' + escapeHtml(reg.studentCourse || 'N/A') + '</td>' +
                '<td>' + escapeHtml(reg.eventTitle) + '</td>' +
                '<td><code>' + escapeHtml(reg.eventCode) + '</code></td>' +
                '<td><span class="status-pill ' + statusPillClass(reg.attendanceStatus) + '">' + escapeHtml(reg.attendanceStatus) + '</span></td>' +
                '<td>' +
                '<select class="status-select" data-action="update-status" data-reg-id="' + reg.id + '" aria-label="Update attendance status">' +
                '<option value="' + STATUS_PENDING + '"' + (reg.attendanceStatus === STATUS_PENDING ? ' selected' : '') + '>Pending</option>' +
                '<option value="Attended"' + (reg.attendanceStatus === 'Attended' ? ' selected' : '') + '>Attended</option>' +
                '<option value="Late"' + (reg.attendanceStatus === 'Late' ? ' selected' : '') + '>Late</option>' +
                '<option value="Absent"' + (reg.attendanceStatus === 'Absent' ? ' selected' : '') + '>Absent</option>' +
                '<option value="Excused"' + (reg.attendanceStatus === 'Excused' ? ' selected' : '') + '>Excused</option>' +
                '</select>' +
                '</td>';
            registrantsTableBody.appendChild(row);
        });
    }

    rebuildEventFilter();
    renderOfficerEvents('');
    renderRegistrants(eventFilterSelect.value || 'all');

    eventFilterSelect.onchange = function () {
        renderRegistrants(eventFilterSelect.value);
    };

    officerSearchInput.oninput = function () {
        renderOfficerEvents(officerSearchInput.value);
    };

    registrantsTableBody.onchange = function (changeEvent) {
        const select = changeEvent.target.closest('[data-action="update-status"]');
        if (!select) return;
        const regId = Number(select.getAttribute('data-reg-id'));
        const newStatus = select.value;
        const reg = registrations.find(function (item) { return item.id === regId; });
        if (!reg) return;

        reg.attendanceStatus = newStatus;
        if (newStatus === 'Attended' || newStatus === 'Late') {
            reg.checkInTime = new Date().toISOString();
            reg.checkInMethod = 'Host update';
        } else {
            reg.checkInTime = null;
            reg.checkInMethod = null;
        }
        saveData();
        showNotification('Updated ' + reg.studentName + "'s status to \"" + newStatus + '\".', 'success');
        initOfficerPage();
    };

    document.getElementById('openCreateEventModal').onclick = function () {
        createModal.hidden = false;
    };
    document.getElementById('closeCreateModal').onclick = function () {
        createModal.hidden = true;
    };
    document.getElementById('cancelCreateModal').onclick = function () {
        createModal.hidden = true;
    };

    createForm.onsubmit = function (submitEvent) {
        submitEvent.preventDefault();

        const nextId = eventsData.reduce(function (maxId, event) {
            return Math.max(maxId, event.id);
        }, 0) + 1;

        const title = document.getElementById('newEventTitle').value.trim();
        const category = document.getElementById('newEventCategory').value;
        const newEvent = {
            id: nextId,
            title: title,
            category: category,
            date: formatEventDate(document.getElementById('newEventDate').value),
            time: document.getElementById('newEventTime').value.trim(),
            venue: document.getElementById('newEventVenue').value.trim(),
            organizer: document.getElementById('newEventOrganizer').value.trim(),
            capacity: parseInt(document.getElementById('newEventCapacity').value, 10),
            registrationDeadline: formatEventDate(document.getElementById('newEventDeadline').value),
            description: document.getElementById('newEventDesc').value.trim(),
            speaker: document.getElementById('newEventSpeaker').value.trim() || 'To be announced',
            targetAudience: 'All students',
            requirements: ['Student ID', 'Event registration confirmation'],
            reminderNote: 'Please arrive 15 minutes before the schedule.'
        };
        newEvent.banner = buildEventBanner(newEvent.title, newEvent.category);

        customEvents.push(newEvent);
        eventsData.push(newEvent);
        saveData();

        createModal.hidden = true;
        createForm.reset();
        document.getElementById('newEventOrganizer').value = 'CCSJDM Student Council';
        document.getElementById('newEventCapacity').value = '100';
        showNotification('New event "' + title + '" published successfully!', 'success');
        initOfficerPage();
    };
}

function initCheckinPage() {
    const eventSelect = document.getElementById('checkinEventSelect');
    if (!eventSelect) return;

    initHostAccessControls(initCheckinPage);
    if (!isHostLoggedIn() || !isDesktopDevice()) return;

    const codeForm = document.getElementById('codeCheckinForm');
    const codeInput = document.getElementById('eventCodeInput');
    const simulateButton = document.getElementById('simulateQrScanBtn');
    const manualInput = document.getElementById('manualSearchInput');
    const manualResults = document.getElementById('manualResultsContainer');
    const attendeesTableBody = document.getElementById('eventAttendeesTableBody');
    const feedbackBox = document.getElementById('checkinFeedbackBox');

    const tabButtons = document.querySelectorAll('.checkin-tab-btn');
    const codeModeContent = document.getElementById('codeModeContent');
    const manualModeContent = document.getElementById('manualModeContent');

    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const mode = button.dataset.mode;
            tabButtons.forEach(function (other) {
                const isActive = other === button;
                other.classList.toggle('active', isActive);
                other.setAttribute('aria-selected', String(isActive));
            });
            codeModeContent.hidden = mode !== 'code';
            manualModeContent.hidden = mode !== 'manual';
            if (mode === 'manual') manualInput.focus();
            if (mode === 'code') codeInput.focus();
        });
    });

    eventSelect.innerHTML = eventsData.map(function (event) {
        return '<option value="' + event.id + '">' + escapeHtml(event.title) + ' (' + escapeHtml(event.venue) + ')</option>';
    }).join('');

    const urlParams = new URLSearchParams(window.location.search);
    const preselectedEvent = urlParams.get('event');
    if (preselectedEvent) eventSelect.value = preselectedEvent;

    function showFeedbackBox(isSuccess, reg, statusText) {
        if (!feedbackBox) return;
        feedbackBox.hidden = false;
        feedbackBox.classList.toggle('warning', !isSuccess);
        document.getElementById('feedbackIcon').innerHTML = isSuccess ? '&#9989;' : '&#9888;&#65039;';
        document.getElementById('feedbackTitle').textContent = isSuccess ? 'Check-in Successful!' : 'Check-in Warning';
        document.getElementById('feedbackText').textContent =
            reg.studentName + ' (' + reg.studentId + ') - ' + reg.eventTitle + ' [' + statusText + ']';
        document.getElementById('feedbackTime').textContent = new Date().toLocaleTimeString();
    }

    function processCheckinByCode(code) {
        const reg = registrations.find(function (item) {
            return item.eventCode.toUpperCase() === code;
        });
        if (!reg) {
            showNotification('Event code "' + code + '" was not found. Please try again.', 'error');
            return;
        }

        const selectedEventId = parseInt(eventSelect.value, 10);
        if (reg.eventId !== selectedEventId) {
            const otherEvent = eventsData.find(function (item) { return item.id === reg.eventId; });
            showNotification('This code belongs to "' + (otherEvent ? otherEvent.title : 'another event') + '", not the selected event.', 'error');
            showFeedbackBox(false, reg, 'Wrong event: ' + (otherEvent ? otherEvent.title : 'unknown'));
            return;
        }

        if (reg.attendanceStatus !== STATUS_PENDING) {
            const recordedAt = reg.checkInTime ? ' at ' + new Date(reg.checkInTime).toLocaleTimeString() : '';
            showNotification(reg.studentName + ' already has a recorded status of "' + reg.attendanceStatus + '"' + recordedAt + '.', 'warning');
            showFeedbackBox(false, reg, 'Status already recorded: ' + reg.attendanceStatus);
            return;
        }

        reg.attendanceStatus = 'Attended';
        reg.checkInTime = new Date().toISOString();
        reg.checkInMethod = 'Student ID / QR';
        saveData();

        showNotification(reg.studentName + ' checked in successfully!', 'success');
        showFeedbackBox(true, reg, 'Attended');
        updateCheckinDashboard();
    }

    function updateCheckinDashboard() {
        const selectedEventId = parseInt(eventSelect.value, 10);
        const eventRegistrations = registrations.filter(function (reg) {
            return reg.eventId === selectedEventId;
        });

        const totalRegistered = eventRegistrations.length;
        const totalAttended = eventRegistrations.filter(function (reg) { return reg.attendanceStatus === 'Attended'; }).length;
        const totalLate = eventRegistrations.filter(function (reg) { return reg.attendanceStatus === 'Late'; }).length;
        const totalUnchecked = Math.max(totalRegistered - totalAttended - totalLate, 0);

        document.getElementById('statRegistered').textContent = totalRegistered;
        document.getElementById('statAttended').textContent = totalAttended;
        document.getElementById('statLate').textContent = totalLate;
        document.getElementById('statAbsent').textContent = totalUnchecked;

        const attendancePercent = totalRegistered > 0
            ? Math.round(((totalAttended + totalLate) / totalRegistered) * 100)
            : 0;
        document.getElementById('attendanceProgressBar').style.width = attendancePercent + '%';
        document.getElementById('attendancePercentText').textContent = attendancePercent + '%';

        attendeesTableBody.innerHTML = '';
        if (eventRegistrations.length === 0) {
            attendeesTableBody.innerHTML = '<tr><td colspan="7" class="text-center">No registrants for this event yet.</td></tr>';
            return;
        }

        eventRegistrations.forEach(function (reg) {
            const row = document.createElement('tr');
            row.innerHTML =
                '<td><strong>' + escapeHtml(reg.studentName) + '</strong></td>' +
                '<td>' + escapeHtml(reg.studentId) + '</td>' +
                '<td>' + escapeHtml(reg.studentCourse || 'N/A') + '</td>' +
                '<td><code>' + escapeHtml(reg.eventCode) + '</code></td>' +
                '<td><span class="status-pill ' + statusPillClass(reg.attendanceStatus) + '">' + escapeHtml(reg.attendanceStatus) + '</span></td>' +
                '<td>' + (reg.checkInTime ? new Date(reg.checkInTime).toLocaleTimeString() : '---') + '</td>' +
                '<td>' +
                '<div class="table-action-btns">' +
                '<button type="button" class="btn-success btn-xs" data-action="set-attendance" data-reg-id="' + reg.id + '" data-status="Attended">&#10003; Attended</button>' +
                '<button type="button" class="btn-warning btn-xs" data-action="set-attendance" data-reg-id="' + reg.id + '" data-status="Late">&#9200; Late</button>' +
                '<button type="button" class="btn-danger btn-xs" data-action="set-attendance" data-reg-id="' + reg.id + '" data-status="Absent">&#10060; Absent</button>' +
                '</div>' +
                '</td>';
            attendeesTableBody.appendChild(row);
        });
    }

    eventSelect.addEventListener('change', updateCheckinDashboard);

    codeForm.addEventListener('submit', function (submitEvent) {
        submitEvent.preventDefault();
        const code = codeInput.value.trim().toUpperCase();
        if (!code) return;
        processCheckinByCode(code);
        codeInput.value = '';
    });

    simulateButton.addEventListener('click', function () {
        const selectedEventId = parseInt(eventSelect.value, 10);
        const pendingRegistrations = registrations.filter(function (reg) {
            return reg.eventId === selectedEventId && reg.attendanceStatus === STATUS_PENDING;
        });
        if (pendingRegistrations.length === 0) {
            showNotification('All registrants for this event have already been processed.', 'warning');
            return;
        }
        const randomRegistration = pendingRegistrations[Math.floor(Math.random() * pendingRegistrations.length)];
        processCheckinByCode(randomRegistration.eventCode);
    });

    manualInput.addEventListener('input', function () {
        const query = manualInput.value.trim().toLowerCase();
        const selectedEventId = parseInt(eventSelect.value, 10);
        const eventRegistrations = registrations.filter(function (reg) {
            return reg.eventId === selectedEventId;
        });

        manualResults.innerHTML = '';
        if (!query) return;

        const matched = eventRegistrations.filter(function (reg) {
            return reg.studentName.toLowerCase().includes(query) || reg.studentId.toLowerCase().includes(query);
        });

        if (matched.length === 0) {
            manualResults.innerHTML = '<div class="search-result-item">No student found for this event.</div>';
            return;
        }

        matched.forEach(function (reg) {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML =
                '<div>' +
                '<strong>' + escapeHtml(reg.studentName) + '</strong> (' + escapeHtml(reg.studentId) + ')<br>' +
                '<small>Student ID: ' + escapeHtml(reg.eventCode) + ' &bull; Status: ' + escapeHtml(reg.attendanceStatus) + '</small>' +
                '</div>' +
                '<button type="button" class="btn-primary btn-xs" data-action="checkin-code" data-code="' + escapeHtml(reg.eventCode) + '">Check In</button>';
            manualResults.appendChild(item);
        });
    });

    manualResults.addEventListener('click', function (clickEvent) {
        const button = clickEvent.target.closest('[data-action="checkin-code"]');
        if (!button) return;
        processCheckinByCode(button.getAttribute('data-code').toUpperCase());
        manualInput.value = '';
        manualResults.innerHTML = '';
    });

    attendeesTableBody.addEventListener('click', function (clickEvent) {
        const button = clickEvent.target.closest('[data-action="set-attendance"]');
        if (!button) return;
        const regId = Number(button.getAttribute('data-reg-id'));
        const status = button.getAttribute('data-status');
        const reg = registrations.find(function (item) { return item.id === regId; });
        if (!reg) return;

        reg.attendanceStatus = status;
        if (status === 'Attended' || status === 'Late') {
            reg.checkInTime = new Date().toISOString();
            reg.checkInMethod = 'Check-in desk';
        } else {
            reg.checkInTime = null;
            reg.checkInMethod = null;
        }
        saveData();
        showNotification('Updated ' + reg.studentName + "'s attendance to \"" + status + '\".', 'success');
        updateCheckinDashboard();
    });

    const walkinModal = document.getElementById('walkinModal');
    const walkinForm = document.getElementById('walkinForm');
    const walkinError = document.getElementById('walkinFormError');

    document.getElementById('openWalkinModalBtn').addEventListener('click', function () {
        clearFormError(walkinError);
        walkinModal.hidden = false;
    });
    document.getElementById('closeWalkinModal').addEventListener('click', function () {
        walkinModal.hidden = true;
    });
    document.getElementById('cancelWalkinModal').addEventListener('click', function () {
        walkinModal.hidden = true;
    });

    walkinForm.addEventListener('submit', function (submitEvent) {
        submitEvent.preventDefault();
        clearFormError(walkinError);

        const selectedEventId = parseInt(eventSelect.value, 10);
        const event = eventsData.find(function (item) { return item.id === selectedEventId; });
        const name = document.getElementById('walkinName').value.trim();
        const studentId = document.getElementById('walkinId').value.trim().toUpperCase();
        const course = document.getElementById('walkinCourse').value.trim();

        if (name.length < 2) {
            showFormError(walkinError, 'Please enter the student\'s full name.');
            return;
        }
        if (!STUDENT_ID_PATTERN.test(studentId)) {
            showFormError(walkinError, 'Student ID must follow the format 2026-00999.');
            return;
        }
        if (course.length < 2) {
            showFormError(walkinError, 'Please enter the course and year/section.');
            return;
        }
        const duplicate = registrations.some(function (reg) {
            return reg.eventId === selectedEventId && reg.studentId === studentId;
        });
        if (duplicate) {
            showFormError(walkinError, 'This Student ID is already registered for the selected event.');
            return;
        }

        registrations.push({
            id: Date.now(),
            eventId: selectedEventId,
            eventTitle: event ? event.title : 'School Event',
            studentId: studentId,
            studentName: name,
            studentCourse: course,
            studentEmail: '',
            registrationDate: new Date().toISOString(),
            eventCode: studentId,
            attendanceStatus: 'Attended',
            checkInTime: new Date().toISOString(),
            checkInMethod: 'Walk-in desk'
        });
        saveData();

        walkinModal.hidden = true;
        walkinForm.reset();
        showNotification(name + ' was added and checked in as a walk-in.', 'success');
        updateCheckinDashboard();
    });

    updateCheckinDashboard();
}

document.addEventListener('DOMContentLoaded', function () {
    loadStorage();
    applyDeviceClass();

    window.addEventListener('resize', function () {
        applyDeviceClass();
        if (document.getElementById('hostLoginGate')) applyOfficerAccess();
    });

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('show');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    initAuthUi();
    renderAuthArea();
    renderGreeting();

    const path = window.location.pathname;
    if (path.includes('event-details.html')) {
        initEventDetailsPage();
    } else if (path.includes('my-events.html')) {
        initMyEventsPage();
    } else if (path.includes('officer.html')) {
        initOfficerPage();
    } else if (path.includes('checkin.html')) {
        initCheckinPage();
    } else if (path.includes('events.html')) {
        initEventsPage();
    } else {
        initHomeIntroPage();
    }
});
