const SERVICE_STORAGE_KEYS = {
    appointments: 'ccsjdm_appointments',
    tickets: 'ccsjdm_queue_tickets',
    queueState: 'ccsjdm_queue_state',
    notifications: 'ccsjdm_notifications',
    feedback: 'ccsjdm_feedback'
};

const QUEUE_STATUS = {
    waiting: 'Waiting',
    almost: 'Almost Your Turn',
    called: 'Called',
    serving: 'Serving',
    completed: 'Completed',
    missed: 'Missed',
    cancelled: 'Cancelled'
};

const APPOINTMENT_STATUS = {
    confirmed: 'Confirmed',
    checkedIn: 'Checked In',
    completed: 'Completed',
    cancelled: 'Cancelled',
    missed: 'Missed'
};

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SERVICE_OFFICES = [
    {
        id: 'registrar',
        prefix: 'R',
        name: 'Office of the Registrar',
        shortName: 'Registrar',
        icon: '&#128220;',
        tagline: 'Records, enrolment, and official documents',
        description: 'Handles student records, enrolment concerns, and requests for official academic documents such as transcripts, certifications, and form copies.',
        location: 'Ground Floor, Administration Building',
        room: 'Room A-101',
        days: [1, 2, 3, 4, 5],
        openTime: '08:00',
        closeTime: '17:00',
        breakStart: '12:00',
        breakEnd: '13:00',
        queueEnabled: true,
        averageServiceMinutes: 9,
        dailyQueueLimit: 60,
        contact: 'registrar@ccsjdm.edu.ph',
        services: [
            {
                id: 'registrar-tor',
                name: 'Request Transcript of Records',
                mode: 'appointment',
                processingTime: '5 to 7 working days',
                description: 'Official transcript for employment, board examinations, or transfer to another school.',
                requirements: [
                    'Valid school ID or any government-issued ID',
                    'Accomplished document request form',
                    'Official receipt of payment from the Cashier',
                    'Authorisation letter if claimed by a representative'
                ]
            },
            {
                id: 'registrar-cor',
                name: 'Certificate of Registration Copy',
                mode: 'both',
                processingTime: 'Same day',
                description: 'Reprint of your Certificate of Registration for the current term.',
                requirements: [
                    'Valid school ID',
                    'Student number',
                    'Official receipt of payment from the Cashier'
                ]
            },
            {
                id: 'registrar-goodmoral',
                name: 'Certification, Authentication and Verification',
                mode: 'appointment',
                processingTime: '3 working days',
                description: 'Certification of enrolment, units earned, graduation, or English as medium of instruction.',
                requirements: [
                    'Valid school ID',
                    'Accomplished request form indicating the purpose',
                    'Official receipt of payment from the Cashier'
                ]
            },
            {
                id: 'registrar-enrolment',
                name: 'Enrolment and Subject Concern',
                mode: 'queue',
                processingTime: 'Same day',
                description: 'Assistance for adding, dropping, or correcting subjects and sections.',
                requirements: [
                    'Valid school ID',
                    'Printed Certificate of Registration',
                    'Adviser or Program Head approval slip'
                ]
            }
        ]
    },
    {
        id: 'clinic',
        prefix: 'C',
        name: 'Medical and Dental Clinic',
        shortName: 'Clinic',
        icon: '&#127973;',
        tagline: 'Medical, dental, and health clearance services',
        description: 'Provides basic medical consultation, dental services, first aid, and medical clearance for school activities and internships.',
        location: 'Second Floor, Student Center',
        room: 'Room S-204',
        days: [1, 2, 3, 4, 5],
        openTime: '08:00',
        closeTime: '16:00',
        breakStart: '12:00',
        breakEnd: '13:00',
        queueEnabled: true,
        averageServiceMinutes: 12,
        dailyQueueLimit: 40,
        contact: 'clinic@ccsjdm.edu.ph',
        services: [
            {
                id: 'clinic-consult',
                name: 'Medical Consultation',
                mode: 'queue',
                processingTime: '10 to 15 minutes',
                description: 'Consultation for fever, headache, stomach pain, injuries, and other immediate health concerns.',
                requirements: [
                    'Valid school ID',
                    'Brief description of your symptoms',
                    'List of medicines you are currently taking, if any'
                ]
            },
            {
                id: 'clinic-dental',
                name: 'Dental Check-up',
                mode: 'appointment',
                processingTime: '20 to 30 minutes',
                description: 'Routine dental examination, cleaning advice, and tooth extraction referral.',
                requirements: [
                    'Valid school ID',
                    'Previous dental record, if available'
                ]
            },
            {
                id: 'clinic-certificate',
                name: 'Medical Certificate and Clearance',
                mode: 'both',
                processingTime: '1 to 2 working days',
                description: 'Medical clearance for internship, intramurals, field trips, and organisation activities.',
                requirements: [
                    'Valid school ID',
                    'Letter or endorsement from your department',
                    'Result of recent medical examination, if required'
                ]
            }
        ]
    },
    {
        id: 'guidance',
        prefix: 'G',
        name: 'Guidance and Counseling Office',
        shortName: 'Guidance',
        icon: '&#129504;',
        tagline: 'Counseling, good moral, and career guidance',
        description: 'Offers confidential counseling, career and academic guidance, good moral certification, and student wellbeing programmes.',
        location: 'Second Floor, Administration Building',
        room: 'Room A-210',
        days: [1, 2, 3, 4, 5],
        openTime: '08:00',
        closeTime: '17:00',
        breakStart: '12:00',
        breakEnd: '13:00',
        queueEnabled: false,
        averageServiceMinutes: 30,
        dailyQueueLimit: 0,
        contact: 'guidance@ccsjdm.edu.ph',
        services: [
            {
                id: 'guidance-counseling',
                name: 'Personal Counseling Session',
                mode: 'appointment',
                processingTime: '30 to 45 minutes',
                description: 'A private and confidential session with a licensed guidance counselor.',
                requirements: [
                    'Valid school ID',
                    'Short description of your concern, kept confidential'
                ]
            },
            {
                id: 'guidance-goodmoral',
                name: 'Good Moral Certificate',
                mode: 'both',
                processingTime: '2 to 3 working days',
                description: 'Certification of good moral character for transfer, employment, or scholarship application.',
                requirements: [
                    'Valid school ID',
                    'Official receipt of payment from the Cashier',
                    'Clearance from the Office of Student Affairs'
                ]
            },
            {
                id: 'guidance-career',
                name: 'Career and Academic Guidance',
                mode: 'appointment',
                processingTime: '30 minutes',
                description: 'Guidance on shifting programmes, study habits, internship readiness, and career planning.',
                requirements: [
                    'Valid school ID',
                    'Copy of your latest grades, if the concern is academic'
                ]
            }
        ]
    },
    {
        id: 'quality-assurance',
        prefix: 'Q',
        name: 'Quality Assurance Office',
        shortName: 'Quality Assurance',
        icon: '&#9989;',
        tagline: 'Feedback, document verification, and accreditation',
        description: 'Receives student feedback and complaints, verifies the authenticity of school-issued documents, and manages accreditation surveys.',
        location: 'Third Floor, Administration Building',
        room: 'Room A-305',
        days: [1, 2, 3, 4, 5],
        openTime: '08:00',
        closeTime: '17:00',
        breakStart: '12:00',
        breakEnd: '13:00',
        queueEnabled: true,
        averageServiceMinutes: 10,
        dailyQueueLimit: 30,
        contact: 'qao@ccsjdm.edu.ph',
        services: [
            {
                id: 'qa-feedback',
                name: 'File Feedback or Complaint',
                mode: 'both',
                processingTime: '3 to 5 working days',
                description: 'Formal channel for service complaints, suggestions, and commendations about any office or facility.',
                requirements: [
                    'Valid school ID',
                    'Written narration of the concern with date and place',
                    'Supporting evidence such as a photo or receipt, if available'
                ]
            },
            {
                id: 'qa-verification',
                name: 'Document Verification',
                mode: 'queue',
                processingTime: 'Same day',
                description: 'Verification and authentication of certificates and documents issued by the college.',
                requirements: [
                    'Valid school ID',
                    'Original copy of the document to be verified',
                    'Photocopy of the document'
                ]
            },
            {
                id: 'qa-survey',
                name: 'Accreditation Survey Assistance',
                mode: 'appointment',
                processingTime: '20 minutes',
                description: 'Assistance for students invited as respondents or student representatives during accreditation visits.',
                requirements: [
                    'Valid school ID',
                    'Invitation or endorsement from your department'
                ]
            }
        ]
    },
    {
        id: 'student-affairs',
        prefix: 'S',
        name: 'Office of Student Affairs and Services',
        shortName: 'Student Affairs',
        icon: '&#127891;',
        tagline: 'Organisations, scholarships, and student welfare',
        description: 'Supervises student organisations, scholarship assistance, student discipline, identification cards, and campus activity permits.',
        location: 'Ground Floor, Student Center',
        room: 'Room S-105',
        days: [1, 2, 3, 4, 5],
        openTime: '08:00',
        closeTime: '17:00',
        breakStart: '12:00',
        breakEnd: '13:00',
        queueEnabled: true,
        averageServiceMinutes: 8,
        dailyQueueLimit: 50,
        contact: 'osas@ccsjdm.edu.ph',
        services: [
            {
                id: 'osas-scholarship',
                name: 'Scholarship and Financial Assistance',
                mode: 'both',
                processingTime: '3 to 5 working days',
                description: 'Application, renewal, and follow-up for government and institutional scholarship grants.',
                requirements: [
                    'Valid school ID',
                    'Certificate of Registration for the current term',
                    'Latest grade report',
                    'Barangay certificate of indigency, for assistance grants'
                ]
            },
            {
                id: 'osas-id',
                name: 'Student ID Concern',
                mode: 'queue',
                processingTime: 'Same day to 3 working days',
                description: 'Application, replacement, or correction of the official student identification card.',
                requirements: [
                    'Affidavit of loss, for replacement',
                    'Official receipt of payment from the Cashier',
                    'Recent photo with white background'
                ]
            },
            {
                id: 'osas-org',
                name: 'Organisation and Activity Permit',
                mode: 'appointment',
                processingTime: '5 working days',
                description: 'Accreditation of student organisations and approval of campus activity proposals.',
                requirements: [
                    'Accomplished activity proposal form',
                    'Letter of request signed by the organisation adviser',
                    'List of officers and members',
                    'Budget plan for the activity'
                ]
            },
            {
                id: 'osas-clearance',
                name: 'Student Clearance Signature',
                mode: 'queue',
                processingTime: 'Same day',
                description: 'Signing of clearance forms for graduating students and transferees.',
                requirements: [
                    'Valid school ID',
                    'Printed clearance form',
                    'Settled accountabilities from other offices'
                ]
            }
        ]
    },
    {
        id: 'faculty',
        prefix: 'F',
        name: 'Faculty Consultation',
        shortName: 'Faculty',
        icon: '&#128218;',
        tagline: 'Book a consultation with your professor',
        description: 'Schedule a one-on-one consultation with a professor for academic advising, grade clarification, thesis guidance, or make-up requirements.',
        location: 'Faculty Room, Second Floor Academic Building',
        room: 'Room B-201',
        days: [1, 2, 3, 4, 5],
        openTime: '08:00',
        closeTime: '17:00',
        breakStart: '12:00',
        breakEnd: '13:00',
        queueEnabled: false,
        averageServiceMinutes: 20,
        dailyQueueLimit: 0,
        contact: 'faculty@ccsjdm.edu.ph',
        services: [
            {
                id: 'faculty-consultation',
                name: 'Academic Consultation',
                mode: 'appointment',
                processingTime: '20 to 30 minutes',
                description: 'One-on-one consultation with your professor during their official consultation hours.',
                requirements: [
                    'Valid school ID',
                    'Subject code and section',
                    'Specific topic or question you want to discuss'
                ]
            }
        ]
    }
];

const FACULTY_MEMBERS = [
    {
        id: 'fac-001',
        name: 'Prof. Ramon Villanueva',
        position: 'Associate Professor',
        department: 'College of Computer Studies',
        subjects: ['Data Structures', 'Algorithms', 'Capstone Project'],
        days: [1, 3, 5],
        startTime: '09:00',
        endTime: '11:00',
        room: 'Room B-201',
        email: 'rvillanueva@ccsjdm.edu.ph'
    },
    {
        id: 'fac-002',
        name: 'Prof. Celine Marquez',
        position: 'Program Head',
        department: 'College of Computer Studies',
        subjects: ['Software Engineering', 'Systems Analysis and Design'],
        days: [2, 4],
        startTime: '13:00',
        endTime: '16:00',
        room: 'Room B-203',
        email: 'cmarquez@ccsjdm.edu.ph'
    },
    {
        id: 'fac-003',
        name: 'Prof. Daniel Ocampo',
        position: 'Assistant Professor',
        department: 'College of Business and Accountancy',
        subjects: ['Financial Accounting', 'Business Statistics'],
        days: [1, 2, 4],
        startTime: '10:00',
        endTime: '12:00',
        room: 'Room C-110',
        email: 'docampo@ccsjdm.edu.ph'
    },
    {
        id: 'fac-004',
        name: 'Prof. Aileen Bautista',
        position: 'Professor',
        department: 'College of Education',
        subjects: ['Facilitating Learning', 'Assessment of Learning'],
        days: [3, 4, 5],
        startTime: '08:00',
        endTime: '10:00',
        room: 'Room D-105',
        email: 'abautista@ccsjdm.edu.ph'
    },
    {
        id: 'fac-005',
        name: 'Prof. Michael Santos',
        position: 'Associate Professor',
        department: 'College of Engineering',
        subjects: ['Engineering Mathematics', 'Thermodynamics'],
        days: [1, 3],
        startTime: '14:00',
        endTime: '16:00',
        room: 'Room E-202',
        email: 'msantos@ccsjdm.edu.ph'
    },
    {
        id: 'fac-006',
        name: 'Prof. Grace Delos Reyes',
        position: 'Instructor',
        department: 'College of Arts and Sciences',
        subjects: ['Purposive Communication', 'Technical Writing'],
        days: [2, 5],
        startTime: '09:00',
        endTime: '11:30',
        room: 'Room F-108',
        email: 'gdelosreyes@ccsjdm.edu.ph'
    }
];

let appointments = [];
let queueTickets = [];
let queueState = {};
let serviceNotifications = [];
let serviceFeedback = [];

function todayKey(date) {
    const value = date || new Date();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return value.getFullYear() + '-' + month + '-' + day;
}

function readJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (error) {
        return fallback;
    }
}

function loadServiceData() {
    appointments = readJson(SERVICE_STORAGE_KEYS.appointments, []);
    serviceFeedback = readJson(SERVICE_STORAGE_KEYS.feedback, []);
    queueTickets = readJson(SERVICE_STORAGE_KEYS.tickets, []);
    queueState = readJson(SERVICE_STORAGE_KEYS.queueState, {});
    serviceNotifications = readJson(SERVICE_STORAGE_KEYS.notifications, []);

    if (!Array.isArray(appointments)) appointments = [];
    if (!Array.isArray(queueTickets)) queueTickets = [];
    if (!queueState || typeof queueState !== 'object') queueState = {};
    if (!Array.isArray(serviceNotifications)) serviceNotifications = [];
    if (!Array.isArray(serviceFeedback)) serviceFeedback = [];
    appointments.forEach(function (item) { if (!Array.isArray(item.history)) item.history = []; });
}

function saveServiceData() {
    localStorage.setItem(SERVICE_STORAGE_KEYS.appointments, JSON.stringify(appointments));
    localStorage.setItem(SERVICE_STORAGE_KEYS.tickets, JSON.stringify(queueTickets));
    localStorage.setItem(SERVICE_STORAGE_KEYS.queueState, JSON.stringify(queueState));
    localStorage.setItem(SERVICE_STORAGE_KEYS.notifications, JSON.stringify(serviceNotifications));
    localStorage.setItem(SERVICE_STORAGE_KEYS.feedback, JSON.stringify(serviceFeedback));
}

function findOffice(officeId) {
    return SERVICE_OFFICES.find(function (office) { return office.id === officeId; }) || null;
}

function findService(serviceId) {
    for (let index = 0; index < SERVICE_OFFICES.length; index++) {
        const match = SERVICE_OFFICES[index].services.find(function (service) {
            return service.id === serviceId;
        });
        if (match) return match;
    }
    return null;
}

function findOfficeOfService(serviceId) {
    return SERVICE_OFFICES.find(function (office) {
        return office.services.some(function (service) { return service.id === serviceId; });
    }) || null;
}

function findFaculty(facultyId) {
    return FACULTY_MEMBERS.find(function (member) { return member.id === facultyId; }) || null;
}

function allServices() {
    const list = [];
    SERVICE_OFFICES.forEach(function (office) {
        office.services.forEach(function (service) {
            list.push({ office: office, service: service });
        });
    });
    return list;
}

function timeToMinutes(value) {
    const parts = String(value).split(':');
    return (parseInt(parts[0], 10) * 60) + parseInt(parts[1] || '0', 10);
}

function minutesToTime(total) {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
}

function formatTimeLabel(value) {
    const total = timeToMinutes(value);
    let hours = Math.floor(total / 60);
    const minutes = total % 60;
    const suffix = hours >= 12 ? 'PM' : 'AM';
    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;
    return hours + ':' + String(minutes).padStart(2, '0') + ' ' + suffix;
}

function formatDateLabel(isoDate) {
    const parts = String(isoDate).split('-');
    if (parts.length !== 3) return isoDate;
    const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return WEEKDAY_NAMES[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

function describeSchedule(entity) {
    const days = entity.days || [];
    if (days.length === 0) return 'By appointment only';
    const sorted = days.slice().sort();
    const names = sorted.map(function (day) { return WEEKDAY_NAMES[day].slice(0, 3); });
    let range = names.join(', ');
    if (sorted.length > 2 && sorted[sorted.length - 1] - sorted[0] === sorted.length - 1) {
        range = WEEKDAY_NAMES[sorted[0]].slice(0, 3) + ' to ' + WEEKDAY_NAMES[sorted[sorted.length - 1]].slice(0, 3);
    }
    const start = entity.openTime || entity.startTime;
    const end = entity.closeTime || entity.endTime;
    return range + ', ' + formatTimeLabel(start) + ' to ' + formatTimeLabel(end);
}

function isOfficeOpenNow(office, referenceDate) {
    const now = referenceDate || new Date();
    if ((office.days || []).indexOf(now.getDay()) === -1) return false;
    const current = (now.getHours() * 60) + now.getMinutes();
    if (current < timeToMinutes(office.openTime) || current >= timeToMinutes(office.closeTime)) return false;
    if (office.breakStart && office.breakEnd) {
        if (current >= timeToMinutes(office.breakStart) && current < timeToMinutes(office.breakEnd)) return false;
    }
    return true;
}

function officeStatusLabel(office, referenceDate) {
    const now = referenceDate || new Date();
    if ((office.days || []).indexOf(now.getDay()) === -1) return { label: 'Closed today', state: 'closed' };
    const current = (now.getHours() * 60) + now.getMinutes();
    if (office.breakStart && current >= timeToMinutes(office.breakStart) && current < timeToMinutes(office.breakEnd)) {
        return { label: 'On break until ' + formatTimeLabel(office.breakEnd), state: 'break' };
    }
    if (current < timeToMinutes(office.openTime)) {
        return { label: 'Opens at ' + formatTimeLabel(office.openTime), state: 'closed' };
    }
    if (current >= timeToMinutes(office.closeTime)) {
        return { label: 'Closed for today', state: 'closed' };
    }
    return { label: 'Open now until ' + formatTimeLabel(office.closeTime), state: 'open' };
}

function getQueueState(officeId) {
    const key = officeId + ':' + todayKey();
    if (!queueState[key]) {
        queueState[key] = { lastNumber: 0, nowServing: 0, open: true };
    }
    return queueState[key];
}

function setQueueState(officeId, patch) {
    const key = officeId + ':' + todayKey();
    queueState[key] = Object.assign(getQueueState(officeId), patch);
    saveServiceData();
}

function ticketsForOfficeToday(officeId) {
    const day = todayKey();
    return queueTickets.filter(function (ticket) {
        return ticket.officeId === officeId && ticket.date === day;
    });
}

function activeTicketsForOffice(officeId) {
    return ticketsForOfficeToday(officeId).filter(function (ticket) {
        return ticket.status === QUEUE_STATUS.waiting || ticket.status === QUEUE_STATUS.almost ||
            ticket.status === QUEUE_STATUS.called || ticket.status === QUEUE_STATUS.serving;
    });
}

function formatQueueCode(office, number) {
    return office.prefix + '-' + String(number).padStart(3, '0');
}

function queuePosition(ticket) {
    if (ticket.status === QUEUE_STATUS.serving || ticket.status === QUEUE_STATUS.called) return 0;
    const ahead = ticketsForOfficeToday(ticket.officeId).filter(function (other) {
        return other.number < ticket.number &&
            (other.status === QUEUE_STATUS.waiting || other.status === QUEUE_STATUS.almost ||
             other.status === QUEUE_STATUS.called || other.status === QUEUE_STATUS.serving);
    });
    return ahead.length;
}

function estimatedWaitMinutes(ticket) {
    const office = findOffice(ticket.officeId);
    if (!office) return 0;
    return queuePosition(ticket) * office.averageServiceMinutes;
}

function formatWaitLabel(minutes) {
    if (minutes <= 0) return 'You are next';
    if (minutes < 60) return 'About ' + minutes + ' minutes';
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return 'About ' + hours + (hours > 1 ? ' hours' : ' hour') + (rest ? ' ' + rest + ' minutes' : '');
}

function canIssueTicket(office) {
    if (!office.queueEnabled) {
        return { allowed: false, reason: 'This office accepts scheduled appointments only. Please book an appointment instead.' };
    }
    const state = getQueueState(office.id);
    if (!state.open) {
        return { allowed: false, reason: 'The queue for this office is currently closed. Please try again when the office reopens or book an appointment.' };
    }
    if (!isOfficeOpenNow(office)) {
        const status = officeStatusLabel(office);
        return { allowed: false, reason: 'The office is not accepting walk-ins right now. ' + status.label + '. You may book an appointment instead.' };
    }
    if (state.lastNumber >= office.dailyQueueLimit) {
        return { allowed: false, reason: 'The queue is already full for today. Please come back tomorrow or book an appointment.' };
    }
    return { allowed: true, reason: '' };
}

function studentHasActiveTicket(officeId, studentId) {
    return activeTicketsForOffice(officeId).some(function (ticket) {
        return ticket.studentId === studentId;
    });
}

function issueQueueTicket(officeId, serviceId, student) {
    const office = findOffice(officeId);
    if (!office) return { ok: false, message: 'That office could not be found.' };

    const check = canIssueTicket(office);
    if (!check.allowed) return { ok: false, message: check.reason };

    if (studentHasActiveTicket(officeId, student.id)) {
        return { ok: false, message: 'You already have an active queue number for this office. Please use your existing ticket.' };
    }

    const state = getQueueState(officeId);
    const number = state.lastNumber + 1;
    const service = findService(serviceId);
    const ticket = {
        id: 'TKT-' + Date.now(),
        code: formatQueueCode(office, number),
        number: number,
        officeId: officeId,
        officeName: office.name,
        serviceId: serviceId,
        serviceName: service ? service.name : 'General Service',
        studentId: student.id,
        studentName: student.name,
        date: todayKey(),
        issuedAt: new Date().toISOString(),
        status: QUEUE_STATUS.waiting,
        calledAt: null,
        completedAt: null
    };

    queueTickets.push(ticket);
    setQueueState(officeId, { lastNumber: number });
    addServiceNotification(student.id, 'Queue number ' + ticket.code + ' issued for ' + office.shortName + '.', 'queue');
    saveServiceData();
    return { ok: true, ticket: ticket };
}

function cancelQueueTicket(ticketId) {
    const ticket = queueTickets.find(function (item) { return item.id === ticketId; });
    if (!ticket) return false;
    ticket.status = QUEUE_STATUS.cancelled;
    saveServiceData();
    return true;
}

function callNextTicket(officeId) {
    const waiting = ticketsForOfficeToday(officeId)
        .filter(function (ticket) { return ticket.status === QUEUE_STATUS.waiting || ticket.status === QUEUE_STATUS.almost; })
        .sort(function (a, b) { return a.number - b.number; });

    ticketsForOfficeToday(officeId).forEach(function (ticket) {
        if (ticket.status === QUEUE_STATUS.serving) ticket.status = QUEUE_STATUS.completed;
        if (ticket.status === QUEUE_STATUS.called) ticket.status = QUEUE_STATUS.serving;
    });

    if (waiting.length === 0) {
        saveServiceData();
        return null;
    }

    const next = waiting[0];
    next.status = QUEUE_STATUS.serving;
    next.calledAt = new Date().toISOString();
    setQueueState(officeId, { nowServing: next.number });
    addServiceNotification(next.studentId, 'Your number ' + next.code + ' is now being served.', 'queue');
    saveServiceData();
    return next;
}

function updateTicketStatus(ticketId, status) {
    const ticket = queueTickets.find(function (item) { return item.id === ticketId; });
    if (!ticket) return false;
    ticket.status = status;
    if (status === QUEUE_STATUS.completed) ticket.completedAt = new Date().toISOString();
    addServiceNotification(ticket.studentId, 'Queue ' + ticket.code + ' was marked as ' + status + '.', 'queue');
    saveServiceData();
    return true;
}

function buildTimeSlots(entity, durationMinutes) {
    const start = timeToMinutes(entity.openTime || entity.startTime);
    const end = timeToMinutes(entity.closeTime || entity.endTime);
    const breakStart = entity.breakStart ? timeToMinutes(entity.breakStart) : null;
    const breakEnd = entity.breakEnd ? timeToMinutes(entity.breakEnd) : null;
    const slots = [];
    for (let cursor = start; cursor + durationMinutes <= end; cursor += durationMinutes) {
        if (breakStart !== null && cursor >= breakStart && cursor < breakEnd) continue;
        slots.push(minutesToTime(cursor));
    }
    return slots;
}

function appointmentsFor(targetId, isoDate) {
    return appointments.filter(function (item) {
        return item.targetId === targetId && item.date === isoDate &&
            item.status !== APPOINTMENT_STATUS.cancelled;
    });
}

function availableSlots(targetId, isoDate) {
    const office = findOffice(targetId);
    const faculty = findFaculty(targetId);
    const entity = office || faculty;
    if (!entity) return [];

    const parts = String(isoDate).split('-');
    const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    if ((entity.days || []).indexOf(date.getDay()) === -1) return [];

    const duration = faculty ? 30 : (office.averageServiceMinutes >= 20 ? 30 : 20);
    const taken = appointmentsFor(targetId, isoDate).map(function (item) { return item.time; });
    const now = new Date();
    const isToday = isoDate === todayKey();
    const currentMinutes = (now.getHours() * 60) + now.getMinutes();

    return buildTimeSlots(entity, duration).filter(function (slot) {
        if (taken.indexOf(slot) !== -1) return false;
        if (isToday && timeToMinutes(slot) <= currentMinutes) return false;
        return true;
    });
}

function generateAppointmentReference() {
    const year = new Date().getFullYear();
    let counter = appointments.length + 1;
    let reference = 'APT-' + year + '-' + String(counter).padStart(4, '0');
    while (appointments.some(function (item) { return item.reference === reference; })) {
        counter += 1;
        reference = 'APT-' + year + '-' + String(counter).padStart(4, '0');
    }
    return reference;
}

function bookAppointment(details) {
    const office = findOffice(details.targetId);
    const faculty = findFaculty(details.targetId);
    const entity = office || faculty;
    if (!entity) return { ok: false, message: 'That office or faculty member could not be found.' };

    if (availableSlots(details.targetId, details.date).indexOf(details.time) === -1) {
        return { ok: false, message: 'That time slot is no longer available. Please choose another schedule.' };
    }

    const duplicate = appointments.some(function (item) {
        return item.studentId === details.studentId && item.targetId === details.targetId &&
            item.date === details.date && item.status === APPOINTMENT_STATUS.confirmed;
    });
    if (duplicate) {
        return { ok: false, message: 'You already have a confirmed appointment with this office on the selected date.' };
    }

    const appointment = {
        id: 'APT-' + Date.now(),
        reference: generateAppointmentReference(),
        targetId: details.targetId,
        targetName: office ? office.name : faculty.name,
        targetType: office ? 'office' : 'faculty',
        serviceId: details.serviceId || '',
        serviceName: details.serviceName || 'Consultation',
        studentId: details.studentId,
        studentName: details.studentName,
        date: details.date,
        time: details.time,
        purpose: details.purpose || '',
        requirementsConfirmed: !!details.requirementsConfirmed,
        status: APPOINTMENT_STATUS.confirmed,
        createdAt: new Date().toISOString()
    };

    appointments.push(appointment);
    addServiceNotification(details.studentId,
        'Appointment ' + appointment.reference + ' confirmed for ' + formatDateLabel(appointment.date) + ' at ' + formatTimeLabel(appointment.time) + '.',
        'appointment');
    if (faculty) {
        addFacultyNotification(faculty.id,
            'New appointment ' + appointment.reference + ' from ' + appointment.studentName + ' (' + appointment.studentId + ') on ' +
            formatDateLabel(appointment.date) + ' at ' + formatTimeLabel(appointment.time) + '.',
            'appointment');
    }
    saveServiceData();
    return { ok: true, appointment: appointment };
}

function cancelAppointment(appointmentId) {
    const appointment = appointments.find(function (item) { return item.id === appointmentId; });
    if (!appointment) return false;
    appointment.status = APPOINTMENT_STATUS.cancelled;
    addServiceNotification(appointment.studentId, 'Appointment ' + appointment.reference + ' was cancelled.', 'appointment');
    if (appointment.targetType === 'faculty') {
        addFacultyNotification(appointment.targetId,
            'Appointment ' + appointment.reference + ' from ' + appointment.studentName + ' on ' +
            formatDateLabel(appointment.date) + ' at ' + formatTimeLabel(appointment.time) + ' was cancelled by the student.', 'appointment');
    }
    saveServiceData();
    return true;
}

function updateAppointmentStatus(appointmentId, status) {
    const appointment = appointments.find(function (item) { return item.id === appointmentId; });
    if (!appointment) return false;
    appointment.status = status;
    addServiceNotification(appointment.studentId, 'Appointment ' + appointment.reference + ' is now marked as ' + status + '.', 'appointment');
    saveServiceData();
    return true;
}

function addFacultyNotification(facultyId, message, kind) {
    serviceNotifications.unshift({
        id: 'NTF-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        studentId: '',
        facultyId: facultyId,
        message: message,
        kind: kind || 'info',
        createdAt: new Date().toISOString(),
        read: false
    });
    if (serviceNotifications.length > 120) serviceNotifications = serviceNotifications.slice(0, 120);
}

function addServiceNotification(studentId, message, kind) {
    serviceNotifications.unshift({
        id: 'NTF-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        studentId: studentId,
        message: message,
        kind: kind || 'info',
        createdAt: new Date().toISOString(),
        read: false
    });
    if (serviceNotifications.length > 120) serviceNotifications = serviceNotifications.slice(0, 120);
}

function notificationsForStudent(studentId) {
    return serviceNotifications.filter(function (item) { return item.studentId === studentId; });
}

function notificationsForFaculty(facultyId) {
    return serviceNotifications.filter(function (item) { return item.facultyId === facultyId; });
}

function notificationsForCurrentUser() {
    if (isStudentLoggedIn()) return notificationsForStudent(studentProfile.id);
    if (isFacultyLoggedIn()) return notificationsForFaculty(getFacultySession().facultyId);
    return [];
}

function appointmentsForStudent(studentId) {
    return appointments.filter(function (item) { return item.studentId === studentId; });
}

function ticketsForStudent(studentId) {
    return queueTickets.filter(function (item) { return item.studentId === studentId; });
}

function serviceModeLabel(mode) {
    if (mode === 'queue') return 'Walk-in queue';
    if (mode === 'appointment') return 'Appointment required';
    return 'Appointment or walk-in';
}

function initServiceDirectoryPage() {
    const officeGrid = document.getElementById('officeGrid');
    const facultyGrid = document.getElementById('facultyGrid');
    if (!officeGrid && !facultyGrid) return;

    const searchInput = document.getElementById('serviceSearchInput');
    const tabButtons = document.querySelectorAll('.directory-tab');
    const officePanel = document.getElementById('officePanel');
    const facultyPanel = document.getElementById('facultyPanel');
    const departmentFilter = document.getElementById('departmentFilter');
    const officeCount = document.getElementById('officeResultCount');
    const facultyCount = document.getElementById('facultyResultCount');

    if (departmentFilter && !departmentFilter.dataset.ready) {
        const departments = [];
        FACULTY_MEMBERS.forEach(function (member) {
            if (departments.indexOf(member.department) === -1) departments.push(member.department);
        });
        departmentFilter.innerHTML = '<option value="all">All Departments</option>' +
            departments.map(function (name) {
                return '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + '</option>';
            }).join('');
        departmentFilter.dataset.ready = 'true';
    }

    function renderOffices() {
        if (!officeGrid) return;
        const term = (searchInput ? searchInput.value : '').trim().toLowerCase();
        const matches = SERVICE_OFFICES.filter(function (office) {
            if (!term) return true;
            const haystack = [office.name, office.shortName, office.tagline, office.description, office.location]
                .concat(office.services.map(function (service) { return service.name; }))
                .join(' ').toLowerCase();
            return haystack.indexOf(term) !== -1;
        });

        if (officeCount) {
            officeCount.textContent = matches.length + (matches.length === 1 ? ' office' : ' offices');
        }

        if (matches.length === 0) {
            officeGrid.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128269;</div>' +
                '<h3>No office matches your search</h3>' +
                '<p>Try a different keyword such as document, medical, scholarship, or counseling.</p></div>';
            return;
        }

        officeGrid.innerHTML = matches.map(function (office) {
            const status = officeStatusLabel(office);
            const state = getQueueState(office.id);
            const waiting = activeTicketsForOffice(office.id).length;
            const queueLine = office.queueEnabled
                ? '<span class="office-queue-chip">&#127915; ' + waiting + ' in queue &bull; Now serving ' +
                  (state.nowServing ? formatQueueCode(office, state.nowServing) : 'none') + '</span>'
                : '<span class="office-queue-chip muted">&#128197; Appointment only</span>';

            return '<article class="office-card">' +
                '<div class="office-card-head">' +
                '<span class="office-icon">' + office.icon + '</span>' +
                '<div>' +
                '<h3>' + escapeHtml(office.name) + '</h3>' +
                '<p class="office-tagline">' + escapeHtml(office.tagline) + '</p>' +
                '</div>' +
                '</div>' +
                '<span class="office-status ' + status.state + '">' + escapeHtml(status.label) + '</span>' +
                '<p class="office-desc">' + escapeHtml(office.description) + '</p>' +
                '<ul class="office-meta">' +
                '<li>&#128205; ' + escapeHtml(office.location) + ' &bull; ' + escapeHtml(office.room) + '</li>' +
                '<li>&#128336; ' + escapeHtml(describeSchedule(office)) + '</li>' +
                '<li>&#128231; ' + escapeHtml(office.contact) + '</li>' +
                '</ul>' +
                queueLine +
                '<div class="office-services">' +
                office.services.slice(0, 3).map(function (service) {
                    return '<span class="service-pill">' + escapeHtml(service.name) + '</span>';
                }).join('') +
                (office.services.length > 3 ? '<span class="service-pill more">+' + (office.services.length - 3) + ' more</span>' : '') +
                '</div>' +
                '<a class="btn-primary btn-block" href="service-details.html?office=' + encodeURIComponent(office.id) + '">View Services and Requirements</a>' +
                '</article>';
        }).join('');
    }

    function renderFaculty() {
        if (!facultyGrid) return;
        const term = (searchInput ? searchInput.value : '').trim().toLowerCase();
        const department = departmentFilter ? departmentFilter.value : 'all';

        const matches = FACULTY_MEMBERS.filter(function (member) {
            const matchesDepartment = department === 'all' || member.department === department;
            if (!matchesDepartment) return false;
            if (!term) return true;
            const haystack = [member.name, member.position, member.department, member.room]
                .concat(member.subjects).join(' ').toLowerCase();
            return haystack.indexOf(term) !== -1;
        });

        if (facultyCount) {
            facultyCount.textContent = matches.length + (matches.length === 1 ? ' professor' : ' professors');
        }

        if (matches.length === 0) {
            facultyGrid.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128269;</div>' +
                '<h3>No professor matches your search</h3>' +
                '<p>Try searching by name, department, or subject.</p></div>';
            return;
        }

        const today = new Date().getDay();
        facultyGrid.innerHTML = matches.map(function (member) {
            const availableToday = member.days.indexOf(today) !== -1;
            const initials = member.name.replace('Prof. ', '').split(' ').map(function (part) {
                return part.charAt(0).toUpperCase();
            }).slice(0, 2).join('');

            return '<article class="faculty-card">' +
                '<div class="faculty-head">' +
                '<span class="faculty-avatar">' + escapeHtml(initials) + '</span>' +
                '<div>' +
                '<h3>' + escapeHtml(member.name) + '</h3>' +
                '<p class="faculty-position">' + escapeHtml(member.position) + '</p>' +
                '<p class="faculty-department">' + escapeHtml(member.department) + '</p>' +
                '</div>' +
                '</div>' +
                '<span class="office-status ' + (availableToday ? 'open' : 'closed') + '">' +
                (availableToday ? 'Consultation hours today' : 'Not available today') + '</span>' +
                '<ul class="office-meta">' +
                '<li>&#128336; ' + escapeHtml(describeSchedule(member)) + '</li>' +
                '<li>&#128205; ' + escapeHtml(member.room) + '</li>' +
                '<li>&#128231; ' + escapeHtml(member.email) + '</li>' +
                '</ul>' +
                '<div class="office-services">' +
                member.subjects.map(function (subject) {
                    return '<span class="service-pill">' + escapeHtml(subject) + '</span>';
                }).join('') +
                '</div>' +
                '<a class="btn-primary btn-block" href="service-details.html?faculty=' + encodeURIComponent(member.id) + '">Book a Consultation</a>' +
                '</article>';
        }).join('');
    }

    function switchTab(mode) {
        tabButtons.forEach(function (button) {
            const isActive = button.dataset.directory === mode;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', String(isActive));
        });
        if (officePanel) officePanel.hidden = mode !== 'offices';
        if (facultyPanel) facultyPanel.hidden = mode !== 'faculty';
    }

    tabButtons.forEach(function (button) {
        button.onclick = function () { switchTab(button.dataset.directory); };
    });

    if (searchInput) {
        searchInput.oninput = function () {
            renderOffices();
            renderFaculty();
        };
        searchInput.onkeydown = function (keyEvent) {
            if (keyEvent.key === 'Enter') {
                keyEvent.preventDefault();
                renderOffices();
                renderFaculty();
            }
        };
    }

    const searchButton = document.getElementById('serviceSearchBtn');
    if (searchButton) {
        searchButton.onclick = function () {
            renderOffices();
            renderFaculty();
        };
    }

    if (departmentFilter) {
        departmentFilter.onchange = renderFaculty;
    }

    const params = new URLSearchParams(window.location.search);
    switchTab(params.get('view') === 'faculty' ? 'faculty' : 'offices');
    renderOffices();
    renderFaculty();
}


function ccsjdmStorageKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.indexOf('ccsjdm_') === 0) keys.push(key);
    }
    return keys;
}

function dateOffsetKey(dayOffset) {
    const base = new Date();
    return todayKey(new Date(base.getFullYear(), base.getMonth(), base.getDate() + dayOffset));
}

function nextDayMatching(days, fromOffset) {
    const base = new Date();
    for (let i = fromOffset || 1; i <= 21; i++) {
        const probe = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i);
        if (days.indexOf(probe.getDay()) !== -1) return todayKey(probe);
    }
    return dateOffsetKey(1);
}

function seedDemoData() {
    loadServiceData();

    const demoStudents = [
        { id: '2026-00123', name: 'Juan Dela Cruz', course: 'BSIT 3A' },
        { id: '2026-00456', name: 'Maria Santos', course: 'BSCS 1B' },
        { id: '2026-00789', name: 'Paolo Mendoza', course: 'BSBA 2C' }
    ];

    const registrarDate = nextDayMatching([1, 2, 3, 4, 5], 1);
    const guidanceDate = nextDayMatching([1, 2, 3, 4, 5], 3);
    const facultyDate = nextDayMatching([1, 3, 5], 1);

    appointments = [
        {
            id: 'APT-DEMO-1', reference: 'APT-2026-0001', targetId: 'registrar', targetName: 'Office of the Registrar',
            targetType: 'office', serviceId: 'registrar-tor', serviceName: 'Request Transcript of Records',
            studentId: '2026-00123', studentName: 'Juan Dela Cruz', date: registrarDate, time: '10:00',
            purpose: 'Transcript for job application', requirementsConfirmed: true,
            status: APPOINTMENT_STATUS.confirmed, createdAt: new Date().toISOString(), history: []
        },
        {
            id: 'APT-DEMO-2', reference: 'APT-2026-0002', targetId: 'guidance', targetName: 'Guidance and Counseling Office',
            targetType: 'office', serviceId: 'guidance-goodmoral', serviceName: 'Good Moral Certificate',
            studentId: '2026-00123', studentName: 'Juan Dela Cruz', date: guidanceDate, time: '13:30',
            purpose: 'Scholarship application', requirementsConfirmed: true,
            status: APPOINTMENT_STATUS.confirmed, createdAt: new Date().toISOString(), history: []
        },
        {
            id: 'APT-DEMO-3', reference: 'APT-2026-0003', targetId: 'fac-001', targetName: 'Prof. Ramon Villanueva',
            targetType: 'faculty', serviceId: 'faculty-consultation', serviceName: 'Academic Consultation',
            studentId: '2026-00456', studentName: 'Maria Santos', date: facultyDate, time: '09:30',
            purpose: 'Capstone project consultation', requirementsConfirmed: true,
            status: APPOINTMENT_STATUS.confirmed, createdAt: new Date().toISOString(), history: []
        },
        {
            id: 'APT-DEMO-4', reference: 'APT-2026-0004', targetId: 'clinic', targetName: 'Medical and Dental Clinic',
            targetType: 'office', serviceId: 'clinic-dental', serviceName: 'Dental Check-up',
            studentId: '2026-00123', studentName: 'Juan Dela Cruz', date: dateOffsetKey(-6), time: '09:00',
            purpose: 'Routine check-up', requirementsConfirmed: true,
            status: APPOINTMENT_STATUS.completed, createdAt: new Date().toISOString(), history: []
        },
        {
            id: 'APT-DEMO-5', reference: 'APT-2026-0005', targetId: 'student-affairs', targetName: 'Office of Student Affairs and Services',
            targetType: 'office', serviceId: 'osas-scholarship', serviceName: 'Scholarship and Financial Assistance',
            studentId: '2026-00789', studentName: 'Paolo Mendoza', date: dateOffsetKey(-3), time: '14:00',
            purpose: 'Grant renewal', requirementsConfirmed: true,
            status: APPOINTMENT_STATUS.missed, createdAt: new Date().toISOString(), history: []
        }
    ];

    const day = todayKey();
    queueTickets = [
        {
            id: 'TKT-DEMO-1', code: 'R-001', number: 1, officeId: 'registrar', officeName: 'Office of the Registrar',
            serviceId: 'registrar-enrolment', serviceName: 'Enrolment and Subject Concern',
            studentId: '2026-00456', studentName: 'Maria Santos', date: day,
            issuedAt: new Date(Date.now() - 2400000).toISOString(), status: QUEUE_STATUS.serving,
            calledAt: new Date(Date.now() - 300000).toISOString(), completedAt: null
        },
        {
            id: 'TKT-DEMO-2', code: 'R-002', number: 2, officeId: 'registrar', officeName: 'Office of the Registrar',
            serviceId: 'registrar-cor', serviceName: 'Certificate of Registration Copy',
            studentId: '2026-00789', studentName: 'Paolo Mendoza', date: day,
            issuedAt: new Date(Date.now() - 1800000).toISOString(), status: QUEUE_STATUS.waiting,
            calledAt: null, completedAt: null
        },
        {
            id: 'TKT-DEMO-3', code: 'R-003', number: 3, officeId: 'registrar', officeName: 'Office of the Registrar',
            serviceId: 'registrar-enrolment', serviceName: 'Enrolment and Subject Concern',
            studentId: '2026-00123', studentName: 'Juan Dela Cruz', date: day,
            issuedAt: new Date(Date.now() - 900000).toISOString(), status: QUEUE_STATUS.waiting,
            calledAt: null, completedAt: null
        },
        {
            id: 'TKT-DEMO-4', code: 'C-001', number: 1, officeId: 'clinic', officeName: 'Medical and Dental Clinic',
            serviceId: 'clinic-consult', serviceName: 'Medical Consultation',
            studentId: '2026-00123', studentName: 'Juan Dela Cruz', date: day,
            issuedAt: new Date(Date.now() - 5400000).toISOString(), status: QUEUE_STATUS.completed,
            calledAt: new Date(Date.now() - 5000000).toISOString(), completedAt: new Date(Date.now() - 4500000).toISOString()
        },
        {
            id: 'TKT-DEMO-5', code: 'S-001', number: 1, officeId: 'student-affairs', officeName: 'Office of Student Affairs and Services',
            serviceId: 'osas-id', serviceName: 'Student ID Concern',
            studentId: '2026-00789', studentName: 'Paolo Mendoza', date: day,
            issuedAt: new Date(Date.now() - 7200000).toISOString(), status: QUEUE_STATUS.missed,
            calledAt: new Date(Date.now() - 6600000).toISOString(), completedAt: null
        }
    ];

    queueState = {};
    queueState['registrar:' + day] = { lastNumber: 3, nowServing: 1, open: true };
    queueState['clinic:' + day] = { lastNumber: 1, nowServing: 1, open: true };
    queueState['student-affairs:' + day] = { lastNumber: 1, nowServing: 1, open: true };
    queueState['quality-assurance:' + day] = { lastNumber: 0, nowServing: 0, open: true };

    serviceFeedback = [
        {
            id: 'FB-DEMO-1', visitType: 'appointment', visitId: 'APT-DEMO-4', officeId: 'clinic',
            officeName: 'Medical and Dental Clinic', studentId: '2026-00123', studentName: 'Juan Dela Cruz',
            rating: 5, categories: ['Staff courtesy', 'Cleanliness'], comment: 'The dentist explained everything clearly.',
            anonymous: false, createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
        },
        {
            id: 'FB-DEMO-2', visitType: 'queue', visitId: 'TKT-DEMO-4', officeId: 'clinic',
            officeName: 'Medical and Dental Clinic', studentId: '2026-00123', studentName: 'Juan Dela Cruz',
            rating: 4, categories: ['Waiting time'], comment: 'Fast service but the waiting area was full.',
            anonymous: true, createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
            id: 'FB-DEMO-3', visitType: 'appointment', visitId: 'APT-DEMO-5', officeId: 'student-affairs',
            officeName: 'Office of Student Affairs and Services', studentId: '2026-00789', studentName: 'Paolo Mendoza',
            rating: 3, categories: ['Clarity of requirements'], comment: 'I was not told to bring a barangay certificate.',
            anonymous: false, createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        }
    ];

    serviceNotifications = [
        { id: 'NTF-DEMO-1', studentId: '2026-00123', message: 'Appointment APT-2026-0001 confirmed for ' + formatDateLabel(registrarDate) + ' at 10:00 AM.', kind: 'appointment', createdAt: new Date(Date.now() - 7200000).toISOString(), read: false },
        { id: 'NTF-DEMO-2', studentId: '2026-00123', message: 'Queue number R-003 issued for Registrar.', kind: 'queue', createdAt: new Date(Date.now() - 900000).toISOString(), read: false },
        { id: 'NTF-DEMO-3', studentId: '2026-00123', message: 'Your clinic visit is completed. Please rate your visit.', kind: 'feedback', createdAt: new Date(Date.now() - 4500000).toISOString(), read: true },
        { id: 'NTF-DEMO-4', studentId: '2026-00456', message: 'Your number R-001 is now being served.', kind: 'queue', createdAt: new Date(Date.now() - 300000).toISOString(), read: false },
        { id: 'NTF-DEMO-5', studentId: '', facultyId: 'fac-001', message: 'New appointment APT-2026-0003 from Maria Santos (2026-00456) on ' + formatDateLabel(facultyDate) + ' at 9:30 AM.', kind: 'appointment', createdAt: new Date(Date.now() - 3600000).toISOString(), read: false }
    ];

    saveServiceData();

    if (typeof seedStudentDemoData === 'function') seedStudentDemoData(demoStudents);
    localStorage.setItem('ccsjdm_demo_seeded', 'v1');
}

function resetDemoData() {
    ccsjdmStorageKeys().forEach(function (key) { localStorage.removeItem(key); });
    seedDemoData();
}

loadServiceData();
if (!localStorage.getItem('ccsjdm_demo_seeded')) seedDemoData();

function parseTextTimeRange(text, isoDate) {
    if (!text) return null;
    const match = String(text).match(/(\d{1,2}):(\d{2})\s*(AM|PM)?\s*(?:-|to|&ndash;|\u2013)\s*(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!match) return null;
    function toMinutes(hour, minute, suffix) {
        let h = parseInt(hour, 10);
        const m = parseInt(minute, 10);
        const s = (suffix || '').toUpperCase();
        if (s === 'PM' && h < 12) h += 12;
        if (s === 'AM' && h === 12) h = 0;
        return (h * 60) + m;
    }
    const endSuffix = match[6] || match[3];
    const startSuffix = match[3] || match[6];
    return {
        date: isoDate,
        start: toMinutes(match[1], match[2], startSuffix),
        end: toMinutes(match[4], match[5], endSuffix)
    };
}

function eventIsoDate(event) {
    if (!event) return '';
    const parsed = parseEventDate(event.date);
    if (!parsed || isNaN(parsed.getTime())) return '';
    return todayKey(parsed);
}

function studentScheduleBlocks(studentId, isoDate) {
    const blocks = [];
    appointments.forEach(function (item) {
        if (item.studentId !== studentId || item.date !== isoDate) return;
        if (item.status === APPOINTMENT_STATUS.cancelled || item.status === APPOINTMENT_STATUS.missed) return;
        const start = timeToMinutes(item.time);
        blocks.push({ kind: 'appointment', label: item.serviceName + ' at ' + item.targetName, start: start, end: start + 30, id: item.id });
    });
    queueTickets.forEach(function (item) {
        if (item.studentId !== studentId || item.date !== isoDate) return;
        if (item.status === QUEUE_STATUS.cancelled || item.status === QUEUE_STATUS.completed || item.status === QUEUE_STATUS.missed) return;
        const issued = new Date(item.issuedAt);
        const start = (issued.getHours() * 60) + issued.getMinutes();
        blocks.push({ kind: 'queue', label: 'Queue ' + item.code + ' at ' + item.officeName, start: start, end: start + 30, id: item.id });
    });
    if (typeof registrations !== 'undefined' && typeof eventsData !== 'undefined') {
        registrations.forEach(function (reg) {
            if (reg.studentId !== studentId) return;
            const event = eventsData.find(function (item) { return item.id === reg.eventId; });
            if (!event || eventIsoDate(event) !== isoDate) return;
            const range = parseTextTimeRange(event.time, isoDate);
            if (!range) return;
            blocks.push({ kind: 'event', label: event.title, start: range.start, end: range.end, id: 'evt-' + event.id });
        });
    }
    return blocks;
}

function findScheduleConflict(studentId, isoDate, startMinutes, durationMinutes, ignoreId) {
    const end = startMinutes + (durationMinutes || 30);
    return studentScheduleBlocks(studentId, isoDate).find(function (block) {
        if (ignoreId && block.id === ignoreId) return false;
        return startMinutes < block.end && end > block.start;
    }) || null;
}

function appointmentDuration(targetId) {
    const faculty = findFaculty(targetId);
    if (faculty) return 30;
    const office = findOffice(targetId);
    return office && office.averageServiceMinutes >= 20 ? 30 : 20;
}

function initServiceDetailsPage() {
    const container = document.getElementById('serviceDetailContent');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const officeId = params.get('office');
    const facultyId = params.get('faculty');
    const office = officeId ? findOffice(officeId) : null;
    const faculty = facultyId ? findFaculty(facultyId) : null;
    const target = office || faculty;
    const crumb = document.getElementById('breadcrumbCurrent');

    if (!target) {
        if (crumb) crumb.textContent = 'Not found';
        container.innerHTML = '<div class="error-state"><h3>Service not found</h3>' +
            '<p>The office or faculty member you are looking for is not available.</p>' +
            '<a class="btn-primary" href="services.html">Back to Appointments</a></div>';
        return;
    }

    if (crumb) crumb.textContent = office ? office.shortName : faculty.name;
    document.title = (office ? office.shortName : faculty.name) + ' | Appointments and schedule';

    const services = office ? office.services : [{
        id: 'faculty-consultation',
        name: 'Academic Consultation',
        mode: 'appointment',
        processingTime: '20 to 30 minutes',
        description: 'One-on-one consultation with ' + faculty.name + ' during their official consultation hours.',
        requirements: ['Valid school ID', 'Subject code and section', 'Specific topic or question you want to discuss']
    }];

    const status = office ? officeStatusLabel(office) : {
        state: faculty.days.indexOf(new Date().getDay()) !== -1 ? 'open' : 'closed',
        label: faculty.days.indexOf(new Date().getDay()) !== -1 ? 'Consultation hours today' : 'Not available today'
    };
    const state = office ? getQueueState(office.id) : null;
    const waiting = office ? activeTicketsForOffice(office.id).length : 0;

    container.innerHTML =
        '<section class="service-hero">' +
        '<div class="service-hero-main">' +
        '<span class="office-icon">' + (office ? office.icon : '&#128218;') + '</span>' +
        '<div>' +
        '<h1>' + escapeHtml(office ? office.name : faculty.name) + '</h1>' +
        '<p class="service-hero-sub">' + escapeHtml(office ? office.tagline : faculty.position + ' &bull; ' + faculty.department) + '</p>' +
        '<span class="office-status ' + status.state + '">' + escapeHtml(status.label) + '</span>' +
        '</div>' +
        '</div>' +
        '<ul class="office-meta">' +
        '<li>&#128205; ' + escapeHtml(office ? office.location + ' &bull; ' + office.room : faculty.room) + '</li>' +
        '<li>&#128336; ' + escapeHtml(describeSchedule(target)) + '</li>' +
        '<li>&#128231; ' + escapeHtml(office ? office.contact : faculty.email) + '</li>' +
        (office && office.queueEnabled
            ? '<li>&#127915; ' + waiting + ' waiting &bull; Now serving ' + (state.nowServing ? formatQueueCode(office, state.nowServing) : 'none') +
              ' &bull; Queue ' + (state.open ? 'open' : 'closed') + '</li>'
            : '<li>&#128197; Appointment only</li>') +
        '</ul>' +
        '</section>' +
        '<section class="service-list" id="serviceList">' +
        services.map(function (service) {
            const canQueue = office && office.queueEnabled && (service.mode === 'queue' || service.mode === 'both');
            const canBook = service.mode === 'appointment' || service.mode === 'both' || !office;
            return '<article class="service-item" id="service-' + escapeHtml(service.id) + '">' +
                '<div class="service-item-head">' +
                '<div><h2>' + escapeHtml(service.name) + '</h2>' +
                '<p class="service-item-desc">' + escapeHtml(service.description) + '</p></div>' +
                '<span class="service-mode">' + escapeHtml(serviceModeLabel(service.mode)) + '</span>' +
                '</div>' +
                '<div class="service-item-grid">' +
                '<div><span class="label-small">Processing time</span><p>' + escapeHtml(service.processingTime) + '</p></div>' +
                '<div><span class="label-small">Schedule</span><p>' + escapeHtml(describeSchedule(target)) + '</p></div>' +
                '</div>' +
                '<div class="requirements-block">' +
                '<span class="label-small">Requirements checklist</span>' +
                '<ul class="requirements-list">' +
                service.requirements.map(function (item) {
                    return '<li>' + escapeHtml(item) + '</li>';
                }).join('') +
                '</ul>' +
                '</div>' +
                '<div class="service-actions">' +
                (canBook ? '<button type="button" class="btn-primary" data-book="' + escapeHtml(service.id) + '">Book appointment</button>' : '') +
                (canQueue ? '<button type="button" class="btn-outline-primary" data-queue="' + escapeHtml(service.id) + '">Get queue number</button>' : '') +
                '</div>' +
                '</article>';
        }).join('') +
        '</section>';

    container.querySelectorAll('[data-book]').forEach(function (button) {
        button.onclick = function () {
            const serviceId = button.dataset.book;
            requireStudent(function () {
                openBookingModal(target.id, serviceId);
            }, 'Please log in to book an appointment.');
        };
    });

    container.querySelectorAll('[data-queue]').forEach(function (button) {
        button.onclick = function () {
            const serviceId = button.dataset.queue;
            requireStudent(function () {
                takeQueueNumber(target.id, serviceId);
            }, 'Please log in to get a queue number.');
        };
    });
}

function takeQueueNumber(officeId, serviceId) {
    const result = issueQueueTicket(officeId, serviceId, { id: studentProfile.id, name: studentProfile.name });
    if (!result.ok) {
        showNotification(result.message, 'warning');
        return;
    }
    const office = findOffice(officeId);
    const ticket = result.ticket;
    const display = document.getElementById('queueNumberDisplay');
    const meta = document.getElementById('queueMeta');
    const modal = document.getElementById('queueModal');
    if (display) display.textContent = ticket.code;
    if (meta) {
        meta.innerHTML =
            '<li><strong>Office:</strong> ' + escapeHtml(ticket.officeName) + '</li>' +
            '<li><strong>Service:</strong> ' + escapeHtml(ticket.serviceName) + '</li>' +
            '<li><strong>People ahead:</strong> ' + queuePosition(ticket) + '</li>' +
            '<li><strong>Estimated wait:</strong> ' + escapeHtml(formatWaitLabel(estimatedWaitMinutes(ticket))) + '</li>' +
            '<li><strong>Now serving:</strong> ' + (getQueueState(officeId).nowServing ? formatQueueCode(office, getQueueState(officeId).nowServing) : 'None yet') + '</li>';
    }
    if (modal) {
        modal.hidden = false;
        document.body.classList.add('modal-open');
    }
    showNotification('Queue number ' + ticket.code + ' issued.', 'success');
    if (typeof renderNotificationBell === 'function') renderNotificationBell();
}

let bookingContext = { targetId: '', serviceId: '', slot: '', overrideConflict: false };

function openBookingModal(targetId, serviceId) {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    const service = findService(serviceId);
    const office = findOffice(targetId);
    const faculty = findFaculty(targetId);

    bookingContext = { targetId: targetId, serviceId: serviceId, slot: '', overrideConflict: false };

    const label = document.getElementById('bookingTargetLabel');
    if (label) {
        label.innerHTML = '<strong>' + escapeHtml(service ? service.name : 'Consultation') + '</strong> at ' +
            escapeHtml(office ? office.name : faculty.name);
    }

    document.getElementById('bookingName').value = studentProfile.name || '';
    document.getElementById('bookingStudentId').value = studentProfile.id || '';
    document.getElementById('bookingCourse').value = studentProfile.course || '';
    document.getElementById('bookingPurpose').value = '';
    document.getElementById('bookingRequirements').checked = false;

    const dateInput = document.getElementById('bookingDate');
    dateInput.min = todayKey();
    const target = office || faculty;
    dateInput.value = nextDayMatching(target.days, 0);
    renderSlotGrid();

    clearFormError(document.getElementById('bookingFormError'));
    modal.hidden = false;
    document.body.classList.add('modal-open');
}

function renderSlotGrid() {
    const grid = document.getElementById('slotGrid');
    const dateInput = document.getElementById('bookingDate');
    if (!grid || !dateInput) return;
    const slots = availableSlots(bookingContext.targetId, dateInput.value);
    bookingContext.slot = '';

    if (!dateInput.value) {
        grid.innerHTML = '<p class="slot-empty">Choose a date to see available times.</p>';
        return;
    }
    if (slots.length === 0) {
        grid.innerHTML = '<p class="slot-empty">No available slots on this date. The office may be closed or fully booked. Please choose another date.</p>';
        return;
    }
    grid.innerHTML = slots.map(function (slot) {
        return '<button type="button" class="slot-btn" data-slot="' + slot + '">' + escapeHtml(formatTimeLabel(slot)) + '</button>';
    }).join('');
    grid.querySelectorAll('.slot-btn').forEach(function (button) {
        button.onclick = function () {
            grid.querySelectorAll('.slot-btn').forEach(function (other) { other.classList.remove('selected'); });
            button.classList.add('selected');
            bookingContext.slot = button.dataset.slot;
            bookingContext.overrideConflict = false;
            setFieldError(button, document.getElementById('bookingSlotError'), '');
        };
    });
}

function submitBooking() {
    const courseInput = document.getElementById('bookingCourse');
    const dateInput = document.getElementById('bookingDate');
    const purposeInput = document.getElementById('bookingPurpose');
    const requirementsInput = document.getElementById('bookingRequirements');
    const formError = document.getElementById('bookingFormError');

    const okCourse = setFieldError(courseInput, document.getElementById('bookingCourseError'),
        courseInput.value.trim().length >= 2 ? '' : 'Please enter your course, year and section.');
    const okDate = setFieldError(dateInput, document.getElementById('bookingDateError'),
        dateInput.value ? '' : 'Please choose a date.');
    const okPurpose = setFieldError(purposeInput, document.getElementById('bookingPurposeError'),
        purposeInput.value.trim().length >= 5 ? '' : 'Please describe your concern in a few words.');
    const slotError = document.getElementById('bookingSlotError');
    let okSlot = true;
    if (!bookingContext.slot) {
        okSlot = false;
        slotError.textContent = 'Please choose an available time first.';
        slotError.hidden = false;
    } else {
        slotError.hidden = true;
    }
    const reqError = document.getElementById('bookingRequirementsError');
    let okReq = true;
    if (!requirementsInput.checked) {
        okReq = false;
        reqError.textContent = 'Please confirm that you have read the requirements.';
        reqError.hidden = false;
    } else {
        reqError.hidden = true;
    }

    if (!okCourse || !okDate || !okPurpose || !okSlot || !okReq) return;

    if (!bookingContext.overrideConflict) {
        const conflict = findScheduleConflict(studentProfile.id, dateInput.value,
            timeToMinutes(bookingContext.slot), appointmentDuration(bookingContext.targetId));
        if (conflict) {
            showConflictModal(conflict, function () {
                bookingContext.overrideConflict = true;
                submitBooking();
            });
            return;
        }
    }

    const service = findService(bookingContext.serviceId);
    studentProfiles[studentProfile.id] = Object.assign(studentProfiles[studentProfile.id] || {}, {
        name: studentProfile.name, course: courseInput.value.trim()
    });
    saveProfile();
    refreshStudentProfile();

    const result = bookAppointment({
        targetId: bookingContext.targetId,
        serviceId: bookingContext.serviceId,
        serviceName: service ? service.name : 'Consultation',
        studentId: studentProfile.id,
        studentName: studentProfile.name,
        date: dateInput.value,
        time: bookingContext.slot,
        purpose: purposeInput.value.trim(),
        requirementsConfirmed: true
    });

    if (!result.ok) {
        showFormError(formError, result.message);
        renderSlotGrid();
        return;
    }

    closeBookingModal();
    showConfirmation(result.appointment);
    showNotification('Your appointment was successfully booked.', 'success');
    if (typeof renderNotificationBell === 'function') renderNotificationBell();
}

function showConfirmation(appointment) {
    const modal = document.getElementById('confirmationModal');
    if (!modal) return;
    document.getElementById('confirmationMessage').textContent =
        appointment.studentName + ', your appointment at ' + appointment.targetName + ' is confirmed.';
    document.getElementById('confirmationReference').textContent = appointment.reference;
    document.getElementById('confirmationQr').src = buildQrDataUrl(appointment.reference);
    document.getElementById('confirmationMeta').innerHTML =
        '<li><strong>Service:</strong> ' + escapeHtml(appointment.serviceName) + '</li>' +
        '<li><strong>Date:</strong> ' + escapeHtml(formatDateLabel(appointment.date)) + '</li>' +
        '<li><strong>Time:</strong> ' + escapeHtml(formatTimeLabel(appointment.time)) + '</li>' +
        '<li><strong>Status:</strong> ' + escapeHtml(appointment.status) + '</li>';
    modal.hidden = false;
    document.body.classList.add('modal-open');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.hidden = true;
    document.body.classList.remove('modal-open');
}

function showConflictModal(conflict, onProceed) {
    const modal = document.getElementById('conflictModal');
    if (!modal) {
        onProceed();
        return;
    }
    document.getElementById('conflictMessage').textContent =
        'This overlaps with your existing schedule: ' + conflict.label + '. You can pick another time or continue anyway.';
    modal.hidden = false;
    document.body.classList.add('modal-open');

    document.getElementById('conflictChooseOther').onclick = function () {
        modal.hidden = true;
        document.body.classList.add('modal-open');
    };
    document.getElementById('conflictBookAnyway').onclick = function () {
        modal.hidden = true;
        onProceed();
    };
}

function initBookingControls() {
    const form = document.getElementById('bookingForm');
    if (!form) return;
    form.onsubmit = function (submitEvent) {
        submitEvent.preventDefault();
        submitBooking();
    };
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) dateInput.onchange = renderSlotGrid;
    const close = document.getElementById('closeBookingModal');
    if (close) close.onclick = closeBookingModal;
    const cancel = document.getElementById('cancelBookingModal');
    if (cancel) cancel.onclick = closeBookingModal;
    const closeConfirm = document.getElementById('closeConfirmationModal');
    if (closeConfirm) {
        closeConfirm.onclick = function () {
            document.getElementById('confirmationModal').hidden = true;
            document.body.classList.remove('modal-open');
            initServiceDetailsPage();
        };
    }
    const closeQueue = document.getElementById('closeQueueModal');
    if (closeQueue) {
        closeQueue.onclick = function () {
            document.getElementById('queueModal').hidden = true;
            document.body.classList.remove('modal-open');
            initServiceDetailsPage();
        };
    }
}

const FEEDBACK_CATEGORIES = ['Staff courtesy', 'Waiting time', 'Clarity of requirements', 'Cleanliness', 'Overall process'];

function appointmentStartDate(appointment) {
    const parts = appointment.date.split('-');
    const time = appointment.time.split(':');
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), Number(time[0]), Number(time[1]));
}

function hoursUntilAppointment(appointment) {
    return (appointmentStartDate(appointment).getTime() - Date.now()) / 3600000;
}

function appointmentIsPast(appointment) {
    return appointmentStartDate(appointment).getTime() < Date.now();
}

function feedbackForVisit(visitId) {
    return serviceFeedback.find(function (item) { return item.visitId === visitId; }) || null;
}

function statusChipClass(status) {
    const map = {
        Confirmed: 'pending', 'Checked In': 'checked', Completed: 'attended', Cancelled: 'cancelled',
        Missed: 'absent', Waiting: 'pending', 'Almost Your Turn': 'checked', Called: 'checked', 'Now Serving': 'checked'
    };
    return map[status] || 'pending';
}

function renderScheduleTabs() {
    if (!document.getElementById('myAppointmentsList')) return;
    renderAppointmentsTab();
    renderQueueTab();
    renderHistoryTab();
    renderNextItemCard();
    renderScheduleCalendar();
}

function renderNextItemCard() {
    const card = document.getElementById('nextItemCard');
    if (!card) return;
    const upcoming = appointmentsForStudent(studentProfile.id).filter(function (item) {
        return item.status === APPOINTMENT_STATUS.confirmed && !appointmentIsPast(item);
    }).sort(function (a, b) { return appointmentStartDate(a) - appointmentStartDate(b); });

    const activeTicket = ticketsForStudent(studentProfile.id).find(function (item) {
        return item.date === todayKey() &&
            (item.status === QUEUE_STATUS.waiting || item.status === QUEUE_STATUS.almost ||
             item.status === QUEUE_STATUS.called || item.status === QUEUE_STATUS.serving);
    });

    if (activeTicket) {
        card.hidden = false;
        card.innerHTML = '<span class="next-item-label">Your active queue number</span>' +
            '<div class="next-item-body"><strong class="next-item-code">' + escapeHtml(activeTicket.code) + '</strong>' +
            '<div><p class="next-item-title">' + escapeHtml(activeTicket.serviceName) + ' &bull; ' + escapeHtml(activeTicket.officeName) + '</p>' +
            '<p class="next-item-sub">' + queuePosition(activeTicket) + ' ahead of you &bull; about ' +
            escapeHtml(formatWaitLabel(estimatedWaitMinutes(activeTicket))) + ' &bull; status ' + escapeHtml(activeTicket.status) + '</p></div></div>';
        return;
    }
    if (upcoming.length > 0) {
        const next = upcoming[0];
        card.hidden = false;
        card.innerHTML = '<span class="next-item-label">Your next appointment</span>' +
            '<div class="next-item-body"><strong class="next-item-code">' + escapeHtml(next.reference) + '</strong>' +
            '<div><p class="next-item-title">' + escapeHtml(next.serviceName) + ' &bull; ' + escapeHtml(next.targetName) + '</p>' +
            '<p class="next-item-sub">' + escapeHtml(formatDateLabel(next.date)) + ' at ' + escapeHtml(formatTimeLabel(next.time)) + '</p></div></div>';
        return;
    }
    card.hidden = false;
    card.innerHTML = '<span class="next-item-label">Nothing scheduled</span>' +
        '<div class="next-item-body"><div><p class="next-item-title">You have no upcoming appointment or queue number.</p>' +
        '<p class="next-item-sub"><a href="services.html">Book an appointment or get a queue number</a>.</p></div></div>';
}

function renderAppointmentsTab() {
    const list = document.getElementById('myAppointmentsList');
    const count = document.getElementById('apptCount');
    if (!list) return;
    const items = appointmentsForStudent(studentProfile.id).filter(function (item) {
        return item.status === APPOINTMENT_STATUS.confirmed || item.status === APPOINTMENT_STATUS.checkedIn;
    }).sort(function (a, b) { return appointmentStartDate(a) - appointmentStartDate(b); });
    if (count) count.textContent = items.length;

    if (items.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128197;</div>' +
            '<h3>No active appointments</h3><p>Book a slot with an office or professor to see it here.</p>' +
            '<a class="btn-primary" href="services.html">Book an Appointment</a></div>';
        return;
    }

    list.innerHTML = items.map(function (item) {
        const locked = hoursUntilAppointment(item) < 2 || item.status === APPOINTMENT_STATUS.checkedIn;
        return '<article class="schedule-item">' +
            '<div class="schedule-item-main">' +
            '<span class="schedule-kind appointment">Appointment</span>' +
            '<h3>' + escapeHtml(item.serviceName) + '</h3>' +
            '<p class="schedule-sub">' + escapeHtml(item.targetName) + '</p>' +
            '<ul class="schedule-meta">' +
            '<li><strong>Reference:</strong> ' + escapeHtml(item.reference) + '</li>' +
            '<li><strong>Date:</strong> ' + escapeHtml(formatDateLabel(item.date)) + '</li>' +
            '<li><strong>Time:</strong> ' + escapeHtml(formatTimeLabel(item.time)) + '</li>' +
            '<li><strong>Purpose:</strong> ' + escapeHtml(item.purpose) + '</li>' +
            '</ul>' +
            '<span class="status-pill ' + statusChipClass(item.status) + '">' + escapeHtml(item.status) + '</span>' +
            '</div>' +
            '<div class="schedule-item-side">' +
            '<img class="qr-preview" src="' + buildQrDataUrl(item.reference) + '" alt="QR code for reference ' + escapeHtml(item.reference) + '">' +
            '<div class="card-actions-row">' +
            '<button type="button" class="btn-secondary btn-sm" data-reschedule="' + escapeHtml(item.id) + '"' + (locked ? ' disabled' : '') + '>Reschedule</button>' +
            '<button type="button" class="btn-danger-outline btn-sm" data-cancel-appointment="' + escapeHtml(item.id) + '"' + (locked ? ' disabled' : '') + '>Cancel</button>' +
            '</div>' +
            (locked ? '<p class="schedule-note">Changes are closed within 2 hours of your schedule or after check-in. Please contact the office directly.</p>' : '') +
            '</div>' +
            '</article>';
    }).join('');

    list.querySelectorAll('[data-cancel-appointment]').forEach(function (button) {
        button.onclick = function () {
            if (!window.confirm('Cancel this appointment? This cannot be undone.')) return;
            if (cancelAppointment(button.dataset.cancelAppointment)) {
                showNotification('Appointment cancelled.', 'success');
                initMyEventsPage();
            }
        };
    });
    list.querySelectorAll('[data-reschedule]').forEach(function (button) {
        button.onclick = function () { openRescheduleModal(button.dataset.reschedule); };
    });
}

function renderQueueTab() {
    const list = document.getElementById('myQueueList');
    const count = document.getElementById('queueCount');
    if (!list) return;
    const items = ticketsForStudent(studentProfile.id).filter(function (item) {
        return item.status !== QUEUE_STATUS.completed && item.status !== QUEUE_STATUS.cancelled && item.status !== QUEUE_STATUS.missed;
    });
    if (count) count.textContent = items.length;

    if (items.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">&#127915;</div>' +
            '<h3>No active queue numbers</h3><p>Get a digital number when an office queue is open.</p>' +
            '<a class="btn-primary" href="services.html">View Offices</a></div>';
        return;
    }

    list.innerHTML = items.map(function (ticket) {
        const office = findOffice(ticket.officeId);
        const state = getQueueState(ticket.officeId);
        return '<article class="schedule-item">' +
            '<div class="schedule-item-main">' +
            '<span class="schedule-kind queue">Queue ticket</span>' +
            '<h3>' + escapeHtml(ticket.code) + '</h3>' +
            '<p class="schedule-sub">' + escapeHtml(ticket.serviceName) + ' &bull; ' + escapeHtml(ticket.officeName) + '</p>' +
            '<ul class="schedule-meta">' +
            '<li><strong>Now serving:</strong> ' + (state.nowServing ? escapeHtml(formatQueueCode(office, state.nowServing)) : 'None yet') + '</li>' +
            '<li><strong>People ahead:</strong> ' + queuePosition(ticket) + '</li>' +
            '<li><strong>Estimated wait:</strong> ' + escapeHtml(formatWaitLabel(estimatedWaitMinutes(ticket))) + '</li>' +
            '<li><strong>Issued:</strong> ' + escapeHtml(new Date(ticket.issuedAt).toLocaleTimeString()) + '</li>' +
            '</ul>' +
            '<span class="status-pill ' + statusChipClass(ticket.status) + '">' + escapeHtml(ticket.status) + '</span>' +
            '</div>' +
            '<div class="schedule-item-side">' +
            '<img class="qr-preview" src="' + buildQrDataUrl(ticket.code) + '" alt="QR code for queue number ' + escapeHtml(ticket.code) + '">' +
            '<div class="card-actions-row">' +
            '<button type="button" class="btn-danger-outline btn-sm" data-cancel-ticket="' + escapeHtml(ticket.id) + '">Cancel number</button>' +
            '</div></div></article>';
    }).join('');

    list.querySelectorAll('[data-cancel-ticket]').forEach(function (button) {
        button.onclick = function () {
            if (!window.confirm('Cancel this queue number?')) return;
            if (cancelQueueTicket(button.dataset.cancelTicket)) {
                showNotification('Queue number cancelled.', 'success');
                initMyEventsPage();
            }
        };
    });
}

function renderHistoryTab() {
    const list = document.getElementById('historyList');
    if (!list) return;
    const pastAppointments = appointmentsForStudent(studentProfile.id).filter(function (item) {
        return item.status === APPOINTMENT_STATUS.completed || item.status === APPOINTMENT_STATUS.cancelled || item.status === APPOINTMENT_STATUS.missed;
    });
    const pastTickets = ticketsForStudent(studentProfile.id).filter(function (item) {
        return item.status === QUEUE_STATUS.completed || item.status === QUEUE_STATUS.cancelled || item.status === QUEUE_STATUS.missed;
    });

    const rows = pastAppointments.map(function (item) {
        return { sort: item.date, kind: 'appointment', title: item.serviceName, where: item.targetName,
            when: formatDateLabel(item.date) + ' at ' + formatTimeLabel(item.time), status: item.status,
            id: item.id, officeId: item.targetId, officeName: item.targetName, canRate: item.status === APPOINTMENT_STATUS.completed };
    }).concat(pastTickets.map(function (item) {
        return { sort: item.date, kind: 'queue', title: item.code + ' &bull; ' + item.serviceName, where: item.officeName,
            when: formatDateLabel(item.date), status: item.status, id: item.id, officeId: item.officeId,
            officeName: item.officeName, canRate: item.status === QUEUE_STATUS.completed };
    })).sort(function (a, b) { return a.sort < b.sort ? 1 : -1; });

    if (rows.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128220;</div>' +
            '<h3>No past visits yet</h3><p>Completed and cancelled visits will appear here.</p></div>';
        return;
    }

    list.innerHTML = rows.map(function (row) {
        const existing = feedbackForVisit(row.id);
        return '<article class="schedule-item compact">' +
            '<div class="schedule-item-main">' +
            '<span class="schedule-kind ' + row.kind + '">' + (row.kind === 'queue' ? 'Queue ticket' : 'Appointment') + '</span>' +
            '<h3>' + row.title + '</h3>' +
            '<p class="schedule-sub">' + escapeHtml(row.where) + ' &bull; ' + escapeHtml(row.when) + '</p>' +
            '<span class="status-pill ' + statusChipClass(row.status) + '">' + escapeHtml(row.status) + '</span>' +
            '</div>' +
            '<div class="schedule-item-side">' +
            (row.canRate
                ? (existing
                    ? '<p class="schedule-note">You rated this visit ' + existing.rating + ' of 5.</p>'
                    : '<button type="button" class="btn-primary btn-sm" data-feedback="' + escapeHtml(row.id) + '" data-visit-kind="' + row.kind + '" data-office="' + escapeHtml(row.officeId) + '">Rate this visit</button>')
                : '') +
            '</div></article>';
    }).join('');

    list.querySelectorAll('[data-feedback]').forEach(function (button) {
        button.onclick = function () {
            openFeedbackModal(button.dataset.feedback, button.dataset.visitKind, button.dataset.office);
        };
    });
}

let rescheduleContext = { id: '', slot: '' };

function openRescheduleModal(appointmentId) {
    const modal = document.getElementById('rescheduleModal');
    const appointment = appointments.find(function (item) { return item.id === appointmentId; });
    if (!modal || !appointment) return;
    rescheduleContext = { id: appointmentId, slot: '' };

    document.getElementById('rescheduleTargetLabel').innerHTML =
        '<strong>' + escapeHtml(appointment.serviceName) + '</strong> at ' + escapeHtml(appointment.targetName) +
        ' &bull; reference ' + escapeHtml(appointment.reference) + ' stays the same.';

    const dateInput = document.getElementById('rescheduleDate');
    dateInput.min = todayKey();
    dateInput.value = appointment.date;
    dateInput.onchange = renderRescheduleSlots;
    renderRescheduleSlots();
    clearFormError(document.getElementById('rescheduleError'));
    modal.hidden = false;
    document.body.classList.add('modal-open');
}

function renderRescheduleSlots() {
    const grid = document.getElementById('rescheduleSlotGrid');
    const dateInput = document.getElementById('rescheduleDate');
    const appointment = appointments.find(function (item) { return item.id === rescheduleContext.id; });
    if (!grid || !appointment) return;
    rescheduleContext.slot = '';
    const slots = availableSlots(appointment.targetId, dateInput.value);
    if (slots.length === 0) {
        grid.innerHTML = '<p class="slot-empty">No available slots on this date. Please choose another date.</p>';
        return;
    }
    grid.innerHTML = slots.map(function (slot) {
        return '<button type="button" class="slot-btn" data-slot="' + slot + '">' + escapeHtml(formatTimeLabel(slot)) + '</button>';
    }).join('');
    grid.querySelectorAll('.slot-btn').forEach(function (button) {
        button.onclick = function () {
            grid.querySelectorAll('.slot-btn').forEach(function (other) { other.classList.remove('selected'); });
            button.classList.add('selected');
            rescheduleContext.slot = button.dataset.slot;
        };
    });
}

function confirmReschedule() {
    const appointment = appointments.find(function (item) { return item.id === rescheduleContext.id; });
    const errorBox = document.getElementById('rescheduleError');
    const dateInput = document.getElementById('rescheduleDate');
    if (!appointment) return;
    if (hoursUntilAppointment(appointment) < 2 || appointment.status === APPOINTMENT_STATUS.checkedIn) {
        showFormError(errorBox, 'This appointment can no longer be rescheduled. Please contact the office directly.');
        return;
    }
    if (!rescheduleContext.slot) {
        showFormError(errorBox, 'Please choose a new time slot.');
        return;
    }
    const conflict = findScheduleConflict(appointment.studentId, dateInput.value,
        timeToMinutes(rescheduleContext.slot), appointmentDuration(appointment.targetId), appointment.id);
    if (conflict && !window.confirm('This overlaps with: ' + conflict.label + '. Continue anyway?')) return;

    const previous = formatDateLabel(appointment.date) + ' at ' + formatTimeLabel(appointment.time);
    appointment.history.push({ at: new Date().toISOString(), from: previous,
        to: formatDateLabel(dateInput.value) + ' at ' + formatTimeLabel(rescheduleContext.slot) });
    appointment.date = dateInput.value;
    appointment.time = rescheduleContext.slot;
    saveServiceData();
    addServiceNotification(appointment.studentId,
        'Appointment ' + appointment.reference + ' moved to ' + formatDateLabel(appointment.date) + ' at ' + formatTimeLabel(appointment.time) + '.', 'appointment');
    if (appointment.targetType === 'faculty') {
        addFacultyNotification(appointment.targetId,
            'Appointment ' + appointment.reference + ' from ' + appointment.studentName + ' was moved to ' +
            formatDateLabel(appointment.date) + ' at ' + formatTimeLabel(appointment.time) + '.', 'appointment');
    }

    document.getElementById('rescheduleModal').hidden = true;
    document.body.classList.remove('modal-open');
    showNotification('Appointment rescheduled. Your reference number stays the same.', 'success');
    initMyEventsPage();
    if (typeof renderNotificationBell === 'function') renderNotificationBell();
}

let feedbackContext = { visitId: '', kind: '', officeId: '', rating: 0 };

function openFeedbackModal(visitId, kind, officeId) {
    const modal = document.getElementById('feedbackModal');
    if (!modal) return;
    feedbackContext = { visitId: visitId, kind: kind, officeId: officeId, rating: 0 };
    const office = findOffice(officeId) || findFaculty(officeId);
    document.getElementById('feedbackTargetLabel').textContent =
        'How was your visit at ' + (office ? office.name : 'this office') + '?';
    document.getElementById('feedbackComment').value = '';
    document.getElementById('feedbackAnonymous').checked = false;
    document.getElementById('feedbackRatingError').hidden = true;

    const starRow = document.getElementById('starRow');
    starRow.innerHTML = [1, 2, 3, 4, 5].map(function (value) {
        return '<button type="button" class="star-btn" data-star="' + value + '" role="radio" aria-checked="false" aria-label="' + value + ' star' + (value > 1 ? 's' : '') + '">&#9734;</button>';
    }).join('');
    starRow.querySelectorAll('.star-btn').forEach(function (button) {
        button.onclick = function () {
            feedbackContext.rating = Number(button.dataset.star);
            starRow.querySelectorAll('.star-btn').forEach(function (other) {
                const filled = Number(other.dataset.star) <= feedbackContext.rating;
                other.innerHTML = filled ? '&#9733;' : '&#9734;';
                other.classList.toggle('filled', filled);
                other.setAttribute('aria-checked', Number(other.dataset.star) === feedbackContext.rating ? 'true' : 'false');
            });
            document.getElementById('feedbackRatingError').hidden = true;
        };
    });

    document.getElementById('feedbackCategories').innerHTML = FEEDBACK_CATEGORIES.map(function (label, index) {
        return '<label class="checkbox-row"><input type="checkbox" value="' + escapeHtml(label) + '" id="feedbackCategory' + index + '"><span>' + escapeHtml(label) + '</span></label>';
    }).join('');

    modal.hidden = false;
    document.body.classList.add('modal-open');
}

function submitFeedback() {
    if (feedbackContext.rating === 0) {
        const error = document.getElementById('feedbackRatingError');
        error.textContent = 'Please choose a star rating.';
        error.hidden = false;
        return;
    }
    if (feedbackForVisit(feedbackContext.visitId)) {
        showNotification('You already submitted feedback for this visit.', 'warning');
        return;
    }
    const office = findOffice(feedbackContext.officeId) || findFaculty(feedbackContext.officeId);
    const categories = Array.prototype.slice.call(
        document.getElementById('feedbackCategories').querySelectorAll('input:checked')
    ).map(function (input) { return input.value; });

    serviceFeedback.unshift({
        id: 'FB-' + Date.now(),
        visitType: feedbackContext.kind,
        visitId: feedbackContext.visitId,
        officeId: feedbackContext.officeId,
        officeName: office ? office.name : 'Office',
        studentId: studentProfile.id,
        studentName: studentProfile.name,
        rating: feedbackContext.rating,
        categories: categories,
        comment: document.getElementById('feedbackComment').value.trim(),
        anonymous: document.getElementById('feedbackAnonymous').checked,
        createdAt: new Date().toISOString()
    });
    saveServiceData();
    document.getElementById('feedbackModal').hidden = true;
    document.body.classList.remove('modal-open');
    showNotification('Thank you for rating your visit.', 'success');
    initMyEventsPage();
}

let calendarView = { mode: 'month', anchor: new Date() };

function scheduleItemsForDate(isoDate) {
    const items = [];
    appointmentsForStudent(studentProfile.id).forEach(function (item) {
        if (item.date !== isoDate || item.status === APPOINTMENT_STATUS.cancelled) return;
        items.push({ kind: 'appointment', time: formatTimeLabel(item.time), sort: timeToMinutes(item.time),
            label: item.serviceName + ' at ' + item.targetName, status: item.status });
    });
    ticketsForStudent(studentProfile.id).forEach(function (item) {
        if (item.date !== isoDate || item.status === QUEUE_STATUS.cancelled) return;
        const issued = new Date(item.issuedAt);
        items.push({ kind: 'queue', time: issued.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
            sort: (issued.getHours() * 60) + issued.getMinutes(),
            label: item.code + ' at ' + item.officeName, status: item.status });
    });
    registrations.filter(function (reg) { return reg.studentId === studentProfile.id; }).forEach(function (reg) {
        const event = eventsData.find(function (item) { return item.id === reg.eventId; });
        if (!event || eventIsoDate(event) !== isoDate) return;
        const range = parseTextTimeRange(event.time, isoDate);
        items.push({ kind: 'event', time: event.time, sort: range ? range.start : 0,
            label: event.title + ' at ' + event.venue, status: reg.attendanceStatus });
    });
    return items.sort(function (a, b) { return a.sort - b.sort; });
}

function renderScheduleCalendar() {
    const grid = document.getElementById('calendarGrid');
    const dayList = document.getElementById('calendarDayList');
    const title = document.getElementById('calTitle');
    if (!grid) return;

    const anchor = calendarView.anchor;
    let days = [];
    if (calendarView.mode === 'week') {
        const start = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - anchor.getDay());
        for (let i = 0; i < 7; i++) days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
        title.textContent = 'Week of ' + formatDateLabel(todayKey(days[0]));
    } else {
        const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
        const start = new Date(first.getFullYear(), first.getMonth(), 1 - first.getDay());
        for (let i = 0; i < 42; i++) days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
        title.textContent = anchor.toLocaleDateString([], { month: 'long', year: 'numeric' });
    }

    const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(function (label) {
        return '<div class="calendar-head">' + label + '</div>';
    }).join('');

    grid.innerHTML = headers + days.map(function (day) {
        const key = todayKey(day);
        const items = scheduleItemsForDate(key);
        const outside = calendarView.mode === 'month' && day.getMonth() !== anchor.getMonth();
        return '<button type="button" class="calendar-cell' + (outside ? ' outside' : '') +
            (key === todayKey() ? ' today' : '') + '" data-day="' + key + '">' +
            '<span class="calendar-date">' + day.getDate() + '</span>' +
            items.slice(0, 3).map(function (item) {
                return '<span class="calendar-chip ' + item.kind + '">' + escapeHtml(item.label) + '</span>';
            }).join('') +
            (items.length > 3 ? '<span class="calendar-more">+' + (items.length - 3) + ' more</span>' : '') +
            '</button>';
    }).join('');

    grid.querySelectorAll('.calendar-cell').forEach(function (cell) {
        cell.onclick = function () { openDayDetail(cell.dataset.day); };
    });

    if (dayList) {
        const withItems = days.filter(function (day) {
            return (calendarView.mode === 'week' || day.getMonth() === anchor.getMonth()) && scheduleItemsForDate(todayKey(day)).length > 0;
        });
        dayList.innerHTML = withItems.length === 0
            ? '<p class="slot-empty">Nothing scheduled in this period.</p>'
            : withItems.map(function (day) {
                const key = todayKey(day);
                return '<div class="dayline"><h4>' + escapeHtml(formatDateLabel(key)) + '</h4>' +
                    scheduleItemsForDate(key).map(function (item) {
                        return '<p class="dayline-item"><span class="chip-dot ' + item.kind + '"></span>' +
                            escapeHtml(item.time) + ' &bull; ' + escapeHtml(item.label) + '</p>';
                    }).join('') + '</div>';
            }).join('');
    }
}

function openDayDetail(isoDate) {
    const modal = document.getElementById('dayDetailModal');
    if (!modal) return;
    const items = scheduleItemsForDate(isoDate);
    document.getElementById('dayDetailTitle').textContent = formatDateLabel(isoDate);
    document.getElementById('dayDetailList').innerHTML = items.length === 0
        ? '<p class="slot-empty">Nothing scheduled on this day.</p>'
        : items.map(function (item) {
            return '<article class="schedule-item compact"><div class="schedule-item-main">' +
                '<span class="schedule-kind ' + item.kind + '">' + (item.kind === 'queue' ? 'Queue ticket' : item.kind === 'event' ? 'Event' : 'Appointment') + '</span>' +
                '<h3>' + escapeHtml(item.label) + '</h3>' +
                '<p class="schedule-sub">' + escapeHtml(item.time) + '</p>' +
                '<span class="status-pill ' + statusChipClass(item.status) + '">' + escapeHtml(item.status) + '</span>' +
                '</div></article>';
        }).join('');
    modal.hidden = false;
    document.body.classList.add('modal-open');
}

function initScheduleControls() {
    const closeReschedule = document.getElementById('closeRescheduleModal');
    const cancelReschedule = document.getElementById('cancelRescheduleModal');
    const confirmBtn = document.getElementById('confirmRescheduleBtn');
    const hide = function (id) {
        return function () {
            document.getElementById(id).hidden = true;
            document.body.classList.remove('modal-open');
        };
    };
    if (closeReschedule) closeReschedule.onclick = hide('rescheduleModal');
    if (cancelReschedule) cancelReschedule.onclick = hide('rescheduleModal');
    if (confirmBtn) confirmBtn.onclick = confirmReschedule;

    const closeFeedback = document.getElementById('closeFeedbackModal');
    const cancelFeedback = document.getElementById('cancelFeedbackModal');
    const submitBtn = document.getElementById('submitFeedbackBtn');
    if (closeFeedback) closeFeedback.onclick = hide('feedbackModal');
    if (cancelFeedback) cancelFeedback.onclick = hide('feedbackModal');
    if (submitBtn) submitBtn.onclick = submitFeedback;

    const closeDay = document.getElementById('closeDayDetailModal');
    const dismissDay = document.getElementById('dismissDayDetail');
    if (closeDay) closeDay.onclick = hide('dayDetailModal');
    if (dismissDay) dismissDay.onclick = hide('dayDetailModal');

    const prev = document.getElementById('calPrev');
    const next = document.getElementById('calNext');
    if (prev) {
        prev.onclick = function () {
            const a = calendarView.anchor;
            calendarView.anchor = calendarView.mode === 'week'
                ? new Date(a.getFullYear(), a.getMonth(), a.getDate() - 7)
                : new Date(a.getFullYear(), a.getMonth() - 1, 1);
            renderScheduleCalendar();
        };
    }
    if (next) {
        next.onclick = function () {
            const a = calendarView.anchor;
            calendarView.anchor = calendarView.mode === 'week'
                ? new Date(a.getFullYear(), a.getMonth(), a.getDate() + 7)
                : new Date(a.getFullYear(), a.getMonth() + 1, 1);
            renderScheduleCalendar();
        };
    }
    document.querySelectorAll('[data-calview]').forEach(function (button) {
        button.onclick = function () {
            calendarView.mode = button.dataset.calview;
            calendarView.anchor = new Date();
            document.querySelectorAll('[data-calview]').forEach(function (other) { other.classList.remove('active'); });
            button.classList.add('active');
            renderScheduleCalendar();
        };
    });
}

let hostOfficeId = 'registrar';
let reportRows = [];

function initHostServicePanel() {
    const select = document.getElementById('hostOfficeSelect');
    if (!select) return;

    select.innerHTML = SERVICE_OFFICES.map(function (office) {
        return '<option value="' + office.id + '">' + escapeHtml(office.name) + '</option>';
    }).join('');
    select.value = hostOfficeId;
    select.onchange = function () {
        hostOfficeId = select.value;
        renderHostService();
    };

    const dateInput = document.getElementById('hostApptDate');
    if (dateInput) {
        dateInput.value = todayKey();
        dateInput.onchange = renderHostAppointments;
    }
    const statusSelect = document.getElementById('hostApptStatus');
    if (statusSelect) statusSelect.onchange = renderHostAppointments;

    const tabs = document.querySelectorAll('.host-tab-btn');
    tabs.forEach(function (button) {
        button.onclick = function () {
            tabs.forEach(function (other) {
                other.classList.remove('active');
                other.setAttribute('aria-selected', 'false');
            });
            document.querySelectorAll('.host-tab-content').forEach(function (panel) { panel.classList.remove('active'); });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            document.getElementById(button.dataset.hosttab + 'HostTab').classList.add('active');
        };
        button.onkeydown = function (keyEvent) {
            if (keyEvent.key !== 'ArrowRight' && keyEvent.key !== 'ArrowLeft') return;
            keyEvent.preventDefault();
            const list = Array.prototype.slice.call(tabs);
            const index = list.indexOf(button);
            const next = keyEvent.key === 'ArrowRight' ? (index + 1) % list.length : (index - 1 + list.length) % list.length;
            list[next].focus();
            list[next].click();
        };
    });

    const reset = document.getElementById('resetDemoDataBtn');
    if (reset) {
        reset.onclick = function () {
            if (!window.confirm('Reset all demo data? Appointments, queue numbers, registrations, and feedback return to their sample values.')) return;
            resetDemoData();
            if (typeof loadStorage === 'function') loadStorage();
            showNotification('Demo data has been reset.', 'success');
            initOfficerPage();
        };
    }

    const checkinBtn = document.getElementById('officeCheckinBtn');
    if (checkinBtn) checkinBtn.onclick = runOfficeCheckin;
    const checkinInput = document.getElementById('officeCheckinInput');
    if (checkinInput) {
        checkinInput.onkeydown = function (keyEvent) {
            if (keyEvent.key === 'Enter') {
                keyEvent.preventDefault();
                runOfficeCheckin();
            }
        };
    }

    const from = document.getElementById('reportFrom');
    const to = document.getElementById('reportTo');
    if (from && to) {
        const now = new Date();
        from.value = todayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30));
        to.value = todayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30));
    }
    const apply = document.getElementById('applyReportFilters');
    if (apply) apply.onclick = renderHostReports;
    const exportBtn = document.getElementById('exportReportCsv');
    if (exportBtn) exportBtn.onclick = exportReportsCsv;
    const printBtn = document.getElementById('printReportBtn');
    if (printBtn) printBtn.onclick = function () { window.print(); };

    renderHostService();
}

function renderHostService() {
    renderHostStats();
    renderHostAppointments();
    renderQueueConsole();
    renderOfficeCheckinTable();
    renderHostFeedback();
    renderHostReports();
}

function renderHostStats() {
    const day = todayKey();
    const todayAppointments = appointments.filter(function (item) {
        return item.targetId === hostOfficeId && item.date === day && item.status !== APPOINTMENT_STATUS.cancelled;
    });
    const waiting = activeTicketsForOffice(hostOfficeId).length;
    const served = queueTickets.filter(function (item) {
        return item.officeId === hostOfficeId && item.date === day && item.status === QUEUE_STATUS.completed;
    }).length + todayAppointments.filter(function (item) {
        return item.status === APPOINTMENT_STATUS.completed;
    }).length;
    const ratings = serviceFeedback.filter(function (item) { return item.officeId === hostOfficeId; });
    const average = ratings.length === 0 ? 0 : ratings.reduce(function (sum, item) { return sum + item.rating; }, 0) / ratings.length;

    document.getElementById('hostApptToday').textContent = todayAppointments.length;
    document.getElementById('hostQueueWaiting').textContent = waiting;
    document.getElementById('hostServedToday').textContent = served;
    document.getElementById('hostAvgRating').textContent = average.toFixed(1);
}

function renderHostAppointments() {
    const body = document.getElementById('hostAppointmentsBody');
    if (!body) return;
    const dateValue = document.getElementById('hostApptDate').value;
    const statusValue = document.getElementById('hostApptStatus').value;

    const rows = appointments.filter(function (item) {
        if (item.targetId !== hostOfficeId) return false;
        if (dateValue && item.date !== dateValue) return false;
        if (statusValue !== 'all' && item.status !== statusValue) return false;
        return true;
    }).sort(function (a, b) { return timeToMinutes(a.time) - timeToMinutes(b.time); });

    if (rows.length === 0) {
        body.innerHTML = '<tr><td colspan="6" class="text-center">No appointments match these filters.</td></tr>';
        return;
    }

    body.innerHTML = rows.map(function (item) {
        const options = ['Confirmed', 'Checked In', 'Completed', 'Missed', 'Cancelled'].map(function (status) {
            return '<option value="' + status + '"' + (item.status === status ? ' selected' : '') + '>' + status + '</option>';
        }).join('');
        return '<tr>' +
            '<td><code>' + escapeHtml(item.reference) + '</code></td>' +
            '<td><strong>' + escapeHtml(item.studentName) + '</strong><br><small>' + escapeHtml(item.studentId) + '</small></td>' +
            '<td>' + escapeHtml(item.serviceName) + '<br><small>' + escapeHtml(item.purpose) + '</small></td>' +
            '<td>' + escapeHtml(formatDateLabel(item.date)) + '<br><small>' + escapeHtml(formatTimeLabel(item.time)) + '</small></td>' +
            '<td><span class="status-pill ' + statusChipClass(item.status) + '">' + escapeHtml(item.status) + '</span></td>' +
            '<td><select class="status-select" data-appt-status="' + escapeHtml(item.id) + '" aria-label="Change status of ' + escapeHtml(item.reference) + '">' + options + '</select></td>' +
            '</tr>';
    }).join('');

    body.querySelectorAll('[data-appt-status]').forEach(function (select) {
        select.onchange = function () {
            const appointment = appointments.find(function (item) { return item.id === select.dataset.apptStatus; });
            if (!appointment) return;
            updateAppointmentStatus(appointment.id, select.value);
            addServiceNotification(appointment.studentId,
                'Appointment ' + appointment.reference + ' is now marked as ' + select.value + '.', 'appointment');
            showNotification('Status updated to ' + select.value + '.', 'success');
            renderHostService();
        };
    });
}

function renderQueueConsole() {
    const console_ = document.getElementById('queueConsole');
    if (!console_) return;
    const office = findOffice(hostOfficeId);
    if (!office.queueEnabled) {
        console_.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128197;</div>' +
            '<h3>This office is appointment only</h3><p>Walk-in queue numbers are not issued here.</p></div>';
        return;
    }
    const state = getQueueState(hostOfficeId);
    const waitingTickets = queueTickets.filter(function (item) {
        return item.officeId === hostOfficeId && item.date === todayKey() &&
            (item.status === QUEUE_STATUS.waiting || item.status === QUEUE_STATUS.almost ||
             item.status === QUEUE_STATUS.called || item.status === QUEUE_STATUS.serving);
    }).sort(function (a, b) { return a.number - b.number; });

    console_.innerHTML =
        '<div class="queue-now">' +
        '<span class="label-small">Now serving</span>' +
        '<strong class="queue-now-code">' + (state.nowServing ? escapeHtml(formatQueueCode(office, state.nowServing)) : '—') + '</strong>' +
        '<div class="card-actions-row">' +
        '<button type="button" class="btn-primary" id="callNextBtn">Call next number</button>' +
        '<button type="button" class="btn-secondary" id="toggleQueueBtn">' + (state.open ? 'Close queue' : 'Open queue') + '</button>' +
        '</div>' +
        '<p class="schedule-note">Queue is currently ' + (state.open ? 'open' : 'closed') + ' &bull; ' + waitingTickets.length + ' in line.</p>' +
        '</div>' +
        '<div class="queue-list">' +
        (waitingTickets.length === 0
            ? '<p class="slot-empty">Nobody is waiting right now.</p>'
            : waitingTickets.map(function (ticket) {
                return '<div class="queue-row">' +
                    '<strong>' + escapeHtml(ticket.code) + '</strong>' +
                    '<span>' + escapeHtml(ticket.studentName) + ' &bull; ' + escapeHtml(ticket.serviceName) + '</span>' +
                    '<span class="status-pill ' + statusChipClass(ticket.status) + '">' + escapeHtml(ticket.status) + '</span>' +
                    '<div class="card-actions-row">' +
                    '<button type="button" class="btn-secondary btn-sm" data-ticket-complete="' + escapeHtml(ticket.id) + '">Completed</button>' +
                    '<button type="button" class="btn-danger-outline btn-sm" data-ticket-miss="' + escapeHtml(ticket.id) + '">No show</button>' +
                    '</div></div>';
            }).join('')) +
        '</div>';

    document.getElementById('callNextBtn').onclick = function () {
        const result = callNextTicket(hostOfficeId);
        if (!result.ok) {
            showNotification(result.message, 'warning');
            return;
        }
        addServiceNotification(result.ticket.studentId,
            'Your number ' + result.ticket.code + ' is now being served at ' + result.ticket.officeName + '.', 'queue');
        showNotification('Now serving ' + result.ticket.code + '.', 'success');
        renderHostService();
    };
    document.getElementById('toggleQueueBtn').onclick = function () {
        state.open = !state.open;
        queueState[hostOfficeId + ':' + todayKey()] = state;
        saveServiceData();
        showNotification('Queue is now ' + (state.open ? 'open' : 'closed') + '.', 'info');
        renderHostService();
    };
    console_.querySelectorAll('[data-ticket-complete]').forEach(function (button) {
        button.onclick = function () {
            const ticket = queueTickets.find(function (item) { return item.id === button.dataset.ticketComplete; });
            updateTicketStatus(button.dataset.ticketComplete, QUEUE_STATUS.completed);
            if (ticket) {
                addServiceNotification(ticket.studentId, 'Your visit for ' + ticket.code + ' is completed. Please rate your visit.', 'feedback');
            }
            showNotification('Ticket marked as completed.', 'success');
            renderHostService();
        };
    });
    console_.querySelectorAll('[data-ticket-miss]').forEach(function (button) {
        button.onclick = function () {
            const ticket = queueTickets.find(function (item) { return item.id === button.dataset.ticketMiss; });
            updateTicketStatus(button.dataset.ticketMiss, QUEUE_STATUS.missed);
            if (ticket) {
                addServiceNotification(ticket.studentId, 'Number ' + ticket.code + ' was marked as a no show. Please get a new number if you are still in the office.', 'queue');
            }
            showNotification('Ticket marked as no show.', 'warning');
            renderHostService();
        };
    });
}

function runOfficeCheckin() {
    const input = document.getElementById('officeCheckinInput');
    const result = document.getElementById('officeCheckinResult');
    if (!input || !result) return;
    const value = input.value.trim().toUpperCase();
    if (!value) {
        result.className = 'checkin-result error';
        result.textContent = 'Please enter an appointment reference or a student ID.';
        return;
    }
    const match = appointments.find(function (item) {
        return item.targetId === hostOfficeId && item.date === todayKey() &&
            (item.reference.toUpperCase() === value || item.studentId.toUpperCase() === value) &&
            item.status === APPOINTMENT_STATUS.confirmed;
    });
    if (!match) {
        result.className = 'checkin-result error';
        result.textContent = 'No confirmed appointment today matches ' + value + ' for this office.';
        return;
    }
    updateAppointmentStatus(match.id, APPOINTMENT_STATUS.checkedIn);
    addServiceNotification(match.studentId, 'You are checked in for ' + match.reference + ' at ' + match.targetName + '.', 'appointment');
    result.className = 'checkin-result success';
    result.textContent = match.studentName + ' checked in for ' + match.serviceName + ' at ' + formatTimeLabel(match.time) + '.';
    input.value = '';
    showNotification('Appointment checked in.', 'success');
    renderHostService();
}

function renderOfficeCheckinTable() {
    const body = document.getElementById('officeCheckinBody');
    if (!body) return;
    const rows = appointments.filter(function (item) {
        return item.targetId === hostOfficeId && item.date === todayKey() && item.status !== APPOINTMENT_STATUS.cancelled;
    }).sort(function (a, b) { return timeToMinutes(a.time) - timeToMinutes(b.time); });
    body.innerHTML = rows.length === 0
        ? '<tr><td colspan="4" class="text-center">No appointments scheduled today.</td></tr>'
        : rows.map(function (item) {
            return '<tr><td><code>' + escapeHtml(item.reference) + '</code></td>' +
                '<td>' + escapeHtml(item.studentName) + '</td>' +
                '<td>' + escapeHtml(formatTimeLabel(item.time)) + '</td>' +
                '<td><span class="status-pill ' + statusChipClass(item.status) + '">' + escapeHtml(item.status) + '</span></td></tr>';
        }).join('');
}

function renderHostFeedback() {
    const summary = document.getElementById('feedbackSummary');
    const list = document.getElementById('hostFeedbackList');
    if (!summary || !list) return;
    const items = serviceFeedback.filter(function (item) { return item.officeId === hostOfficeId; });

    if (items.length === 0) {
        summary.innerHTML = '';
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">&#11088;</div>' +
            '<h3>No feedback yet</h3><p>Ratings appear here after students complete a visit.</p></div>';
        return;
    }

    const average = items.reduce(function (sum, item) { return sum + item.rating; }, 0) / items.length;
    const buckets = [5, 4, 3, 2, 1].map(function (star) {
        const count = items.filter(function (item) { return item.rating === star; }).length;
        const percent = Math.round((count / items.length) * 100);
        return '<div class="rating-bar"><span>' + star + ' star</span>' +
            '<span class="rating-track"><span class="rating-fill" style="width:' + percent + '%"></span></span>' +
            '<span>' + count + '</span></div>';
    }).join('');

    summary.innerHTML = '<div class="rating-overview"><strong class="rating-average">' + average.toFixed(1) + '</strong>' +
        '<span>average from ' + items.length + ' response' + (items.length > 1 ? 's' : '') + '</span></div>' +
        '<div class="rating-bars">' + buckets + '</div>';

    list.innerHTML = items.map(function (item) {
        return '<article class="feedback-card">' +
            '<div class="feedback-head"><strong>' + '&#9733;'.repeat(item.rating) + '</strong>' +
            '<span>' + escapeHtml(item.anonymous ? 'Anonymous student' : item.studentName) + '</span>' +
            '<small>' + escapeHtml(new Date(item.createdAt).toLocaleDateString()) + '</small></div>' +
            (item.categories.length > 0
                ? '<div class="feedback-tags">' + item.categories.map(function (tag) {
                    return '<span class="service-pill">' + escapeHtml(tag) + '</span>';
                }).join('') + '</div>'
                : '') +
            (item.comment ? '<p class="feedback-comment">' + escapeHtml(item.comment) + '</p>' : '') +
            '</article>';
    }).join('');
}

function collectReportRows() {
    const from = document.getElementById('reportFrom').value;
    const to = document.getElementById('reportTo').value;
    const type = document.getElementById('reportType').value;
    const inRange = function (date) {
        if (from && date < from) return false;
        if (to && date > to) return false;
        return true;
    };
    let rows = [];
    if (type !== 'queue') {
        rows = rows.concat(appointments.filter(function (item) {
            return item.targetId === hostOfficeId && inRange(item.date);
        }).map(function (item) {
            return { date: item.date, type: 'Appointment', office: item.targetName, service: item.serviceName,
                student: item.studentName + ' (' + item.studentId + ')', status: item.status };
        }));
    }
    if (type !== 'appointment') {
        rows = rows.concat(queueTickets.filter(function (item) {
            return item.officeId === hostOfficeId && inRange(item.date);
        }).map(function (item) {
            return { date: item.date, type: 'Queue', office: item.officeName, service: item.serviceName,
                student: item.studentName + ' (' + item.studentId + ')', status: item.status };
        }));
    }
    return rows.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
}

function renderHostReports() {
    const body = document.getElementById('reportTableBody');
    const cards = document.getElementById('reportSummaryCards');
    const chart = document.getElementById('reportChart');
    if (!body || !cards || !chart) return;

    reportRows = collectReportRows();
    const completed = reportRows.filter(function (row) { return row.status === 'Completed'; }).length;
    const missed = reportRows.filter(function (row) { return row.status === 'Missed'; }).length;
    const cancelled = reportRows.filter(function (row) { return row.status === 'Cancelled'; }).length;
    const rate = reportRows.length === 0 ? 0 : Math.round((completed / reportRows.length) * 100);

    cards.innerHTML =
        '<div class="stat-card"><div class="stat-icon">&#128202;</div><div class="stat-info"><h3>' + reportRows.length + '</h3><p>Total Records</p></div></div>' +
        '<div class="stat-card"><div class="stat-icon">&#9989;</div><div class="stat-info"><h3>' + completed + '</h3><p>Completed</p></div></div>' +
        '<div class="stat-card"><div class="stat-icon">&#10060;</div><div class="stat-info"><h3>' + (missed + cancelled) + '</h3><p>Missed or Cancelled</p></div></div>' +
        '<div class="stat-card"><div class="stat-icon">&#128200;</div><div class="stat-info"><h3>' + rate + '%</h3><p>Completion Rate</p></div></div>';

    const byDate = {};
    reportRows.forEach(function (row) {
        byDate[row.date] = (byDate[row.date] || 0) + 1;
    });
    const keys = Object.keys(byDate).sort().slice(-10);
    const max = keys.reduce(function (value, key) { return Math.max(value, byDate[key]); }, 1);
    chart.innerHTML = keys.length === 0
        ? '<p class="slot-empty">No records in this period.</p>'
        : '<div class="bar-chart">' + keys.map(function (key) {
            const height = Math.round((byDate[key] / max) * 100);
            return '<div class="bar-col"><span class="bar-value">' + byDate[key] + '</span>' +
                '<span class="bar" style="height:' + Math.max(height, 6) + '%"></span>' +
                '<span class="bar-label">' + escapeHtml(key.slice(5)) + '</span></div>';
        }).join('') + '</div>';

    body.innerHTML = reportRows.length === 0
        ? '<tr><td colspan="6" class="text-center">No records match these filters.</td></tr>'
        : reportRows.map(function (row) {
            return '<tr><td>' + escapeHtml(formatDateLabel(row.date)) + '</td>' +
                '<td>' + escapeHtml(row.type) + '</td>' +
                '<td>' + escapeHtml(row.office) + '</td>' +
                '<td>' + escapeHtml(row.service) + '</td>' +
                '<td>' + escapeHtml(row.student) + '</td>' +
                '<td><span class="status-pill ' + statusChipClass(row.status) + '">' + escapeHtml(row.status) + '</span></td></tr>';
        }).join('');
}

function exportReportsCsv() {
    if (reportRows.length === 0) {
        showNotification('There is nothing to export for these filters.', 'warning');
        return;
    }
    const header = ['Date', 'Type', 'Office', 'Service', 'Student', 'Status'];
    const escapeCell = function (value) {
        return '"' + String(value).replace(/"/g, '""') + '"';
    };
    const csv = [header.join(',')].concat(reportRows.map(function (row) {
        return [row.date, row.type, row.office, row.service, row.student, row.status].map(escapeCell).join(',');
    })).join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'service-report-' + hostOfficeId + '-' + todayKey() + '.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('CSV report downloaded.', 'success');
}

function unreadNotificationCount() {
    return notificationsForCurrentUser().filter(function (item) { return !item.read; }).length;
}

function renderNotificationBell() {
    const area = document.getElementById('navAuthArea');
    if (!area) return;
    const existing = document.getElementById('notificationBell');
    if (!isStudentLoggedIn() && !isFacultyLoggedIn()) {
        if (existing) existing.remove();
        return;
    }
    const unread = unreadNotificationCount();
    const markup =
        '<button type="button" class="bell-btn" id="notificationBellBtn" aria-haspopup="true" aria-expanded="false" aria-label="Notifications">' +
        '&#128276;' + (unread > 0 ? '<span class="bell-badge">' + unread + '</span>' : '') + '</button>' +
        '<div class="bell-dropdown" id="notificationDropdown" role="menu" hidden></div>';

    let wrapper = existing;
    if (!wrapper) {
        wrapper = document.createElement('span');
        wrapper.className = 'bell-wrap';
        wrapper.id = 'notificationBell';
        area.insertBefore(wrapper, area.firstChild);
    }
    wrapper.innerHTML = markup;

    const button = document.getElementById('notificationBellBtn');
    const dropdown = document.getElementById('notificationDropdown');
    button.onclick = function () {
        const willOpen = dropdown.hidden;
        dropdown.hidden = !willOpen;
        button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (!willOpen) return;
        renderNotificationDropdown(dropdown);
        notificationsForCurrentUser().forEach(function (item) { item.read = true; });
        saveServiceData();
        setTimeout(function () { renderNotificationBell(); }, 1200);
    };
    document.addEventListener('click', function (clickEvent) {
        if (!dropdown || dropdown.hidden) return;
        if (wrapper.contains(clickEvent.target)) return;
        dropdown.hidden = true;
        button.setAttribute('aria-expanded', 'false');
    });
}

function renderNotificationDropdown(dropdown) {
    const items = notificationsForCurrentUser().slice(0, 12);
    dropdown.innerHTML = '<h4 class="bell-title">Notifications</h4>' +
        (items.length === 0
            ? '<p class="bell-empty">You have no notifications yet.</p>'
            : items.map(function (item) {
                return '<div class="bell-item' + (item.read ? '' : ' unread') + '" role="menuitem">' +
                    '<p>' + escapeHtml(item.message) + '</p>' +
                    '<small>' + escapeHtml(new Date(item.createdAt).toLocaleString()) + '</small></div>';
            }).join(''));
}

function reminderItems() {
    const day = todayKey();
    const tomorrow = dateOffsetKey(1);
    return appointmentsForStudent(studentProfile.id).filter(function (item) {
        return item.status === APPOINTMENT_STATUS.confirmed && (item.date === day || item.date === tomorrow);
    });
}

function renderReminderBanner() {
    const slot = document.getElementById('reminderBannerSlot');
    if (!slot) return;
    if (!isStudentLoggedIn()) {
        slot.innerHTML = '';
        return;
    }
    const items = reminderItems().filter(function (item) {
        return localStorage.getItem('ccsjdm_reminder_dismissed_' + item.id) !== todayKey();
    });
    if (items.length === 0) {
        slot.innerHTML = '';
        return;
    }
    slot.innerHTML = items.map(function (item) {
        const when = item.date === todayKey() ? 'today' : 'tomorrow';
        return '<div class="reminder-banner" role="status">' +
            '<span class="reminder-icon">&#9200;</span>' +
            '<p>Reminder: ' + escapeHtml(item.serviceName) + ' at ' + escapeHtml(item.targetName) + ' is ' + when +
            ' at ' + escapeHtml(formatTimeLabel(item.time)) + ' (' + escapeHtml(item.reference) + ').</p>' +
            '<a class="btn-secondary btn-sm" href="my-events.html">View</a>' +
            '<button type="button" class="close-btn" data-dismiss-reminder="' + escapeHtml(item.id) + '" aria-label="Dismiss reminder">&times;</button>' +
            '</div>';
    }).join('');
    slot.querySelectorAll('[data-dismiss-reminder]').forEach(function (button) {
        button.onclick = function () {
            localStorage.setItem('ccsjdm_reminder_dismissed_' + button.dataset.dismissReminder, todayKey());
            renderReminderBanner();
        };
    });
}

function startReminderWatcher() {
    renderReminderBanner();
    setInterval(function () {
        renderReminderBanner();
        renderNotificationBell();
    }, 60000);
}

document.addEventListener('DOMContentLoaded', function () {
    loadServiceData();

    renderNotificationBell();
    startReminderWatcher();

    const page = currentPageName();
    if (page === 'my-events.html') initScheduleControls();

    if (page === 'services.html') initServiceDirectoryPage();
    else if (page === 'service-details.html') { initServiceDetailsPage(); initBookingControls(); }
    else if (page === 'faculty.html') initFacultyDeskPage();
});

function facultyAppointments() {
    const session = getFacultySession();
    if (!session) return [];
    return appointments.filter(function (item) {
        return item.targetType === 'faculty' && item.targetId === session.facultyId;
    }).sort(function (a, b) { return appointmentStartDate(a) - appointmentStartDate(b); });
}

function facultyCanApply(appointment, action) {
    if (action === 'checkin') return appointment.status === APPOINTMENT_STATUS.confirmed;
    if (action === 'complete') return appointment.status === APPOINTMENT_STATUS.checkedIn;
    if (action === 'missed') return appointment.status === APPOINTMENT_STATUS.confirmed && appointmentIsPast(appointment);
    return false;
}

function renderFacultyProfile(faculty) {
    const profile = document.getElementById('facultyProfile');
    if (!profile) return;
    profile.innerHTML =
        '<h3>' + escapeHtml(faculty.name) + '</h3>' +
        '<p>' + escapeHtml(faculty.position) + ' &bull; ' + escapeHtml(faculty.department) + '</p>' +
        '<p>' + escapeHtml(faculty.room) + ' &bull; ' + escapeHtml(describeSchedule(faculty)) + '</p>' +
        '<p>Subjects: ' + escapeHtml((faculty.subjects || []).join(', ')) + '</p>';
}

function renderFacultyStats(items) {
    const today = todayKey();
    const active = function (item) {
        return item.status === APPOINTMENT_STATUS.confirmed || item.status === APPOINTMENT_STATUS.checkedIn;
    };
    document.getElementById('facToday').textContent = items.filter(function (item) {
        return item.date === today && active(item);
    }).length;
    document.getElementById('facUpcoming').textContent = items.filter(function (item) {
        return active(item) && !appointmentIsPast(item);
    }).length;
    document.getElementById('facPending').textContent = items.filter(function (item) {
        return item.status === APPOINTMENT_STATUS.confirmed;
    }).length;
    document.getElementById('facCompleted').textContent = items.filter(function (item) {
        return item.status === APPOINTMENT_STATUS.completed;
    }).length;
}

function facultyViewMatches(item, view) {
    const today = todayKey();
    if (view === 'all') return true;
    if (view === 'today') return item.date === today && item.status !== APPOINTMENT_STATUS.cancelled;
    if (view === 'upcoming') {
        return item.status !== APPOINTMENT_STATUS.cancelled && item.status !== APPOINTMENT_STATUS.completed &&
            item.status !== APPOINTMENT_STATUS.missed && !appointmentIsPast(item);
    }
    return appointmentIsPast(item) || item.status === APPOINTMENT_STATUS.completed || item.status === APPOINTMENT_STATUS.missed;
}

function renderFacultyDesk() {
    const session = getFacultySession();
    const faculty = session ? findFaculty(session.facultyId) : null;
    if (!faculty) return;
    renderFacultyProfile(faculty);

    const items = facultyAppointments();
    renderFacultyStats(items);

    const view = document.getElementById('facFilter').value;
    const list = document.getElementById('facAppointmentsList');
    const visible = items.filter(function (item) { return facultyViewMatches(item, view); });

    if (visible.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">&#128197;</div>' +
            '<h3>No appointments in this view</h3><p>Students who book with you will appear here, and you will be notified.</p></div>';
        return;
    }

    list.innerHTML = visible.map(function (item) {
        const actions = [];
        if (facultyCanApply(item, 'checkin')) actions.push('<button type="button" class="btn-primary btn-sm" data-fac-action="checkin" data-fac-id="' + escapeHtml(item.id) + '">Mark Checked In</button>');
        if (facultyCanApply(item, 'complete')) actions.push('<button type="button" class="btn-success btn-sm" data-fac-action="complete" data-fac-id="' + escapeHtml(item.id) + '">Mark Completed</button>');
        if (facultyCanApply(item, 'missed')) actions.push('<button type="button" class="btn-danger-outline btn-sm" data-fac-action="missed" data-fac-id="' + escapeHtml(item.id) + '">Mark Missed</button>');

        return '<article class="schedule-item">' +
            '<div class="schedule-item-main">' +
            '<span class="schedule-kind appointment">Appointment</span>' +
            '<h3>' + escapeHtml(item.studentName) + '</h3>' +
            '<p class="schedule-sub">Student ID ' + escapeHtml(item.studentId) + '</p>' +
            '<ul class="schedule-meta">' +
            '<li><strong>Reference:</strong> ' + escapeHtml(item.reference) + '</li>' +
            '<li><strong>Date:</strong> ' + escapeHtml(formatDateLabel(item.date)) + '</li>' +
            '<li><strong>Time:</strong> ' + escapeHtml(formatTimeLabel(item.time)) + '</li>' +
            '<li><strong>Purpose:</strong> ' + escapeHtml(item.purpose || 'Not stated') + '</li>' +
            '</ul>' +
            '<span class="status-pill ' + statusChipClass(item.status) + '">' + escapeHtml(item.status) + '</span>' +
            '</div>' +
            '<div class="schedule-item-side">' +
            '<div class="faculty-actions">' + (actions.length ? actions.join('') : '<p class="schedule-note">No action needed.</p>') + '</div>' +
            '</div>' +
            '</article>';
    }).join('');
}

function initFacultyDeskPage() {
    const gate = document.getElementById('facultyLoginGate');
    const main = document.getElementById('facultyMain');
    if (!gate || !main) return;
    const loggedIn = isFacultyLoggedIn();
    gate.hidden = loggedIn;
    main.hidden = !loggedIn;

    const openButton = document.getElementById('openFacultyLoginBtn');
    if (openButton) openButton.onclick = openFacultyLoginModal;
    if (!loggedIn) return;

    const filter = document.getElementById('facFilter');
    filter.onchange = renderFacultyDesk;

    const list = document.getElementById('facAppointmentsList');
    list.onclick = function (clickEvent) {
        const button = clickEvent.target.closest('[data-fac-action]');
        if (!button) return;
        const appointment = appointments.find(function (item) { return item.id === button.dataset.facId; });
        const action = button.dataset.facAction;
        if (!appointment || !facultyCanApply(appointment, action)) return;

        const statusMap = { checkin: APPOINTMENT_STATUS.checkedIn, complete: APPOINTMENT_STATUS.completed, missed: APPOINTMENT_STATUS.missed };
        updateAppointmentStatus(appointment.id, statusMap[action]);
        const messages = { checkin: 'checked in', complete: 'marked as completed', missed: 'marked as missed' };
        showNotification(appointment.studentName + ' has been ' + messages[action] + '.', 'success');
        renderFacultyDesk();
        renderNotificationBell();
    };

    renderFacultyDesk();
}
