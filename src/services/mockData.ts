import { Recruitment, AdmitCard, ResultRecord, AppNotification, PlatformStats } from '../types';

export const INITIAL_RECRUITMENTS: Recruitment[] = [
  {
    id: 'rec-army-agniveer-gd-2026',
    title: 'Indian Army Agniveer (General Duty / Technical / Tradesmen) Rally 2026',
    organization: 'Indian Army',
    category: 'Soldier / Sailor / Airman',
    branch: 'General Duty & Arms Support',
    qualification: '10th Pass',
    minAge: 17.5,
    maxAge: 21,
    minPercentage: 45,
    gender: 'All',
    minHeightCm: 168,
    statesAllowed: ['All India'],
    vacancies: 25000,
    notificationDate: '2026-08-15',
    applicationStart: '2026-08-20',
    applicationEnd: '2026-09-12', // Dynamic status test: closing soon
    examDate: '2026-10-15',
    admitCardDate: '2026-10-01',
    resultDate: '2026-11-20',
    officialNotificationUrl: 'https://joinindianarmy.nic.in',
    officialApplyUrl: 'https://joinindianarmy.nic.in',
    officialWebsiteUrl: 'https://joinindianarmy.nic.in',
    description: 'Indian Army invites online applications from eligible unmarried Indian male and female candidates for enrolment as Agniveer under Agnipath Scheme for Intake 2026.',
    verifiedOfficial: true,
    status: 'Closing Soon',
    selectionProcess: [
      { stepNumber: 1, title: 'Phase I: Online Common Entrance Exam (CEE)', description: 'Computer Based Test covering General Knowledge, Science, and Mathematics.' },
      { stepNumber: 2, title: 'Phase II: Recruitment Rally', description: 'Physical Fitness Test (1.6 km Run, Beam, Ditch) & Physical Measurement Test (PMT).' },
      { stepNumber: 3, title: 'Phase III: Medical Examination', description: 'Comprehensive medical check-up at military hospital.' },
      { stepNumber: 4, title: 'Phase IV: Final Merit List', description: 'Final merit list based on CEE marks and physical rally performance.' }
    ],
    requiredDocuments: [
      { name: '10th / 12th Marksheet & Board Certificate', description: 'Original education certificate with aggregate percentage.', mandatory: true },
      { name: 'Domicile / Residential Certificate', description: 'Issued by Tehsildar / District Magistrate.', mandatory: true },
      { name: 'Caste & Character Certificate', description: 'Issued by Sarpanch / Municipal Corporation within 6 months.', mandatory: true },
      { name: 'Aadhaar Card & Passport Photos', description: '20 un-attested recent color photographs.', mandatory: true }
    ]
  },
  {
    id: 'rec-army-nda-2-2026',
    title: 'National Defence Academy & Naval Academy Examination (NDA & NA II 2026)',
    organization: 'Indian Army',
    category: 'Officer Entry',
    branch: 'Army, Navy & Air Force Wings',
    qualification: '12th Pass',
    minAge: 16.5,
    maxAge: 19.5,
    minPercentage: 60,
    gender: 'All',
    minHeightCm: 157,
    statesAllowed: ['All India'],
    vacancies: 400,
    notificationDate: '2026-07-01',
    applicationStart: '2026-07-05',
    applicationEnd: '2026-09-25',
    examDate: '2026-10-22',
    admitCardDate: '2026-10-05',
    resultDate: '2026-12-15',
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplyUrl: 'https://upsconline.nic.in',
    officialWebsiteUrl: 'https://upsc.gov.in',
    description: 'Union Public Service Commission (UPSC) conducts NDA II 2026 entrance examination for admission to the Army, Navy and Air Force wings of the NDA for the 154th Course.',
    verifiedOfficial: true,
    status: 'Open',
    selectionProcess: [
      { stepNumber: 1, title: 'UPSC Written Examination', description: 'Mathematics (300 Marks) & General Ability Test (600 Marks).' },
      { stepNumber: 2, title: 'SSB Interview (5-Day Testing)', description: 'Screening, Psychology, Group Tasks, and Personal Interview.' },
      { stepNumber: 3, title: 'CPSS (Air Force Candidates)', description: 'Computerized Pilot Selection System for Flying Branch aspirants.' },
      { stepNumber: 4, title: 'Medical Board Examination', description: 'Physical and medical fitness verification at Special Medical Board.' }
    ],
    requiredDocuments: [
      { name: 'Class 10th & 12th Passing Certificate', description: 'Proof of date of birth and educational qualification.', mandatory: true },
      { name: 'Government Photo ID Proof', description: 'Aadhaar Card, Passport, or Voter ID.', mandatory: true },
      { name: 'UPSC Admit Card & Application Printout', description: 'Original printout of application submitted on UPSC portal.', mandatory: true }
    ]
  },
  {
    id: 'rec-army-tes-53-2026',
    title: 'Indian Army Technical Entry Scheme 53 (TES 53 - Jan 2027 Course)',
    organization: 'Indian Army',
    category: 'Technical Entry',
    branch: 'Corps of Engineers, Signals & EME',
    qualification: '12th Pass',
    minAge: 16.5,
    maxAge: 19.5,
    minPercentage: 60,
    gender: 'Male',
    minHeightCm: 157.5,
    statesAllowed: ['All India'],
    vacancies: 90,
    notificationDate: '2026-08-01',
    applicationStart: '2026-08-05',
    applicationEnd: '2026-09-08',
    examDate: '2026-11-10',
    admitCardDate: '2026-10-25',
    resultDate: '2027-01-10',
    officialNotificationUrl: 'https://joinindianarmy.nic.in',
    officialApplyUrl: 'https://joinindianarmy.nic.in',
    officialWebsiteUrl: 'https://joinindianarmy.nic.in',
    description: 'Permanent Commission in the Indian Army for 10+2 PCM candidates with valid JEE Mains rank. 4-Year B.Tech course offered at Military Colleges.',
    verifiedOfficial: true,
    status: 'Closing Soon',
    selectionProcess: [
      { stepNumber: 1, title: 'Shortlisting based on JEE Mains & PCM Marks', description: 'Cut-off percentile in JEE Mains rank & Class 12 PCM aggregate.' },
      { stepNumber: 2, title: 'SSB Interview (Center Allocation)', description: '5-Day SSB evaluation at Prayagraj, Bhopal, Bengaluru, or Jalandhar.' },
      { stepNumber: 3, title: 'Medical Fitness Board', description: 'Medical checkup by Armed Forces Medical Services Board.' }
    ],
    requiredDocuments: [
      { name: 'JEE Mains Scorecard', description: 'Official NTA scorecard copy.', mandatory: true },
      { name: '12th Marksheet with Physics, Chemistry & Math', description: 'Minimum 60% aggregate in PCM.', mandatory: true }
    ]
  },
  {
    id: 'rec-navy-ssr-01-2026',
    title: 'Indian Navy Agniveer (SSR & MR) Intake 01/2026 Batch',
    organization: 'Indian Navy',
    category: 'Soldier / Sailor / Airman',
    branch: 'Seaman, Technical & Aviation Support',
    qualification: '12th Pass',
    minAge: 17.5,
    maxAge: 21,
    minPercentage: 50,
    gender: 'All',
    minHeightCm: 157,
    statesAllowed: ['All India'],
    vacancies: 3500,
    notificationDate: '2026-08-10',
    applicationStart: '2026-08-15',
    applicationEnd: '2026-09-18',
    examDate: '2026-10-20',
    admitCardDate: '2026-10-08',
    resultDate: '2026-12-05',
    officialNotificationUrl: 'https://joinindiannavy.gov.in',
    officialApplyUrl: 'https://joinindiannavy.gov.in',
    officialWebsiteUrl: 'https://joinindiannavy.gov.in',
    description: 'Indian Navy invites applications for unmarried Indian citizens for Agniveer Senior Secondary Recruit (SSR) & Chef/Steward (MR) 01/2026 batch.',
    verifiedOfficial: true,
    status: 'Open',
    selectionProcess: [
      { stepNumber: 1, title: 'Stage I: Indian Navy Entrance Test (INET)', description: 'Computer Based Online Examination in English, Science, Mathematics & General Awareness.' },
      { stepNumber: 2, title: 'Stage II: PFT & Written Assessment', description: 'Physical Fitness Test (1.6 km run in 6.5 mins, squats, push-ups).' },
      { stepNumber: 3, title: 'Stage III: Medical Examination at INS Chilka', description: 'Final recruitment medicals at naval training establishment INS Chilka.' }
    ],
    requiredDocuments: [
      { name: '10+2 Mark Sheet with Math & Physics', description: 'Original educational qualification certificate.', mandatory: true },
      { name: 'NCC Certificate (If applicable)', description: 'Bonus marks awarded for NCC A, B, C certificate holders.', mandatory: false }
    ]
  },
  {
    id: 'rec-navy-inet-officer-2026',
    title: 'Indian Navy Officer Entry (Executive, Technical & Education Branches) Jan 2027 Course',
    organization: 'Indian Navy',
    category: 'Officer Entry',
    branch: 'Executive, Hydro, Engineering & Electrical',
    qualification: 'Engineering Degree',
    minAge: 19.5,
    maxAge: 25,
    minPercentage: 60,
    gender: 'All',
    minHeightCm: 157,
    statesAllowed: ['All India'],
    vacancies: 242,
    notificationDate: '2026-08-01',
    applicationStart: '2026-08-10',
    applicationEnd: '2026-09-05',
    examDate: '2026-11-05',
    admitCardDate: '2026-10-20',
    resultDate: '2026-12-30',
    officialNotificationUrl: 'https://joinindiannavy.gov.in',
    officialApplyUrl: 'https://joinindiannavy.gov.in',
    officialWebsiteUrl: 'https://joinindiannavy.gov.in',
    description: 'Grant of Short Service Commission (SSC) in Executive, Technical and Education branches of the Indian Navy for degree holders.',
    verifiedOfficial: true,
    status: 'Closing Soon',
    selectionProcess: [
      { stepNumber: 1, title: 'Shortlisting based on B.E/B.Tech Marks', description: 'Direct shortlisting for SSB based on normalized marks in engineering degree.' },
      { stepNumber: 2, title: 'SSB Interview', description: 'Stage I & II testing at Naval Selection Boards (Coimbatore, Visakhapatnam, Bengaluru, Bhopal).' },
      { stepNumber: 3, title: 'Naval Medical Fitness Board', description: 'Medical fitness verification.' }
    ],
    requiredDocuments: [
      { name: 'B.E. / B.Tech Degree Certificate & Transcripts', description: 'Minimum 60% aggregate across all semesters.', mandatory: true }
    ]
  },
  {
    id: 'rec-iaf-afcat-02-2026',
    title: 'Air Force Common Admission Test (AFCAT 02/2026 / NCC Special Entry)',
    organization: 'Indian Air Force',
    category: 'Officer Entry',
    branch: 'Flying, Technical & Weapon Systems Branch',
    qualification: 'Graduate',
    minAge: 20,
    maxAge: 26,
    minPercentage: 60,
    gender: 'All',
    minHeightCm: 162.5,
    statesAllowed: ['All India'],
    vacancies: 317,
    notificationDate: '2026-07-20',
    applicationStart: '2026-08-01',
    applicationEnd: '2026-09-30',
    examDate: '2026-10-28',
    admitCardDate: '2026-10-12',
    resultDate: '2026-12-01',
    officialNotificationUrl: 'https://afcat.cdac.in',
    officialApplyUrl: 'https://afcat.cdac.in',
    officialWebsiteUrl: 'https://afcat.cdac.in',
    description: 'Indian Air Force invites applications for Flying Branch and Ground Duty (Technical & Non-Technical) branches for courses commencing July 2027.',
    verifiedOfficial: true,
    status: 'Open',
    selectionProcess: [
      { stepNumber: 1, title: 'AFCAT Online Examination', description: '100 Questions (300 Marks) testing Verbal Ability, Numerical Ability, Reasoning & General Awareness.' },
      { stepNumber: 2, title: 'EKT (Engineering Knowledge Test)', description: 'For Technical Branch applicants.' },
      { stepNumber: 3, title: 'AFSB Interview', description: 'Testing at Air Force Selection Boards (Dehradun, Mysuru, Gandhinagar, Varanasi).' },
      { stepNumber: 4, title: 'CPSS / Flying Medicals', description: 'For Flying branch candidates.' }
    ],
    requiredDocuments: [
      { name: 'Graduation Degree Certificate', description: 'Recognized university degree with min 60% marks.', mandatory: true },
      { name: 'Class 12th Certificate with Physics & Math', description: 'Min 50% marks in Physics and Mathematics at 10+2 level.', mandatory: true }
    ]
  },
  {
    id: 'rec-iaf-agniveervayu-01-2026',
    title: 'Indian Air Force Agniveervayu Intake 01/2026 Selection Test',
    organization: 'Indian Air Force',
    category: 'Soldier / Sailor / Airman',
    branch: 'Science Subjects & Other Than Science Subjects',
    qualification: '12th Pass',
    minAge: 17.5,
    maxAge: 21,
    minPercentage: 50,
    gender: 'All',
    minHeightCm: 152.5,
    statesAllowed: ['All India'],
    vacancies: 3500,
    notificationDate: '2026-08-01',
    applicationStart: '2026-08-10',
    applicationEnd: '2026-09-10',
    examDate: '2026-10-18',
    admitCardDate: '2026-10-05',
    resultDate: '2026-11-25',
    officialNotificationUrl: 'https://agnipathvayu.cdac.in',
    officialApplyUrl: 'https://agnipathvayu.cdac.in',
    officialWebsiteUrl: 'https://agnipathvayu.cdac.in',
    description: 'Enrolment of Agniveervayu in Indian Air Force under Agnipath scheme for Science and Non-Science subjects.',
    verifiedOfficial: true,
    status: 'Closing Soon',
    selectionProcess: [
      { stepNumber: 1, title: 'Phase I: Online Written Test', description: 'Online test with objective questions and negative marking.' },
      { stepNumber: 2, title: 'Phase II: Adaptability Test 1 & 2', description: 'Verification of documents and adaptability test.' },
      { stepNumber: 3, title: 'Phase III: Physical Fitness Test (PFT)', description: '1.6 km run in 7 mins, push-ups, sit-ups & squats.' },
      { stepNumber: 4, title: 'Phase IV: Medical Test', description: 'Medical examination by Air Force Medical Officers.' }
    ],
    requiredDocuments: [
      { name: '10+2 / Diploma Mark Sheet', description: 'With 50% aggregate and 50% in English.', mandatory: true }
    ]
  },
  {
    id: 'rec-capf-ac-2026',
    title: 'Central Armed Police Forces (Assistant Commandants) Exam 2026 (UPSC CAPF AC)',
    organization: 'CAPF',
    category: 'Police & Assistant Commandant',
    branch: 'BSF, CRPF, CISF, ITBP & SSB',
    qualification: 'Graduate',
    minAge: 20,
    maxAge: 25,
    minPercentage: 50,
    gender: 'All',
    minHeightCm: 165,
    statesAllowed: ['All India'],
    vacancies: 506,
    notificationDate: '2026-06-15',
    applicationStart: '2026-06-20',
    applicationEnd: '2026-10-10',
    examDate: '2026-11-15',
    admitCardDate: '2026-10-25',
    resultDate: '2027-01-20',
    officialNotificationUrl: 'https://upsc.gov.in',
    officialApplyUrl: 'https://upsconline.nic.in',
    officialWebsiteUrl: 'https://upsc.gov.in',
    description: 'UPSC CAPF AC Exam 2026 for recruitment of Assistant Commandants (Group A) in BSF, CRPF, CISF, ITBP and SSB.',
    verifiedOfficial: true,
    status: 'Open',
    selectionProcess: [
      { stepNumber: 1, title: 'Written Examination', description: 'Paper I (General Ability & Intelligence - 250 Marks) & Paper II (General Studies, Essay & Comprehension - 200 Marks).' },
      { stepNumber: 2, title: 'Physical Standards & Physical Efficiency Test (PET)', description: '100m sprint, 800m race, Long Jump, Shot Put.' },
      { stepNumber: 3, title: 'Medical Standards Test', description: 'Medical evaluation by Board of Medical Officers.' },
      { stepNumber: 4, title: 'Interview / Personality Test', description: '150 Marks interview conducted by UPSC Board.' }
    ],
    requiredDocuments: [
      { name: 'Bachelor Degree Certificate', description: 'From any recognized university.', mandatory: true },
      { name: 'Caste / OBC NCL / EWS Certificate', description: 'Valid government certificate for reservation benefit.', mandatory: false }
    ]
  },
  {
    id: 'rec-capf-ssc-cpo-2026',
    title: 'SSC CPO Sub-Inspector in Delhi Police & CAPF Examination 2026',
    organization: 'CAPF',
    category: 'Police & Assistant Commandant',
    branch: 'Delhi Police, BSF, CISF, CRPF, ITBP & SSB SI',
    qualification: 'Graduate',
    minAge: 20,
    maxAge: 25,
    minPercentage: 50,
    gender: 'All',
    minHeightCm: 170,
    statesAllowed: ['All India'],
    vacancies: 4187,
    notificationDate: '2026-07-10',
    applicationStart: '2026-07-15',
    applicationEnd: '2026-09-15',
    examDate: '2026-10-30',
    admitCardDate: '2026-10-15',
    resultDate: '2026-12-10',
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplyUrl: 'https://ssc.gov.in',
    officialWebsiteUrl: 'https://ssc.gov.in',
    description: 'Staff Selection Commission recruitment of Sub-Inspectors in Delhi Police and Central Armed Police Forces.',
    verifiedOfficial: true,
    status: 'Open',
    selectionProcess: [
      { stepNumber: 1, title: 'Paper I Computer Based Exam', description: 'Reasoning, GK, Quantitative Aptitude & English (200 Marks).' },
      { stepNumber: 2, title: 'PST / PET Test', description: 'Physical standard measurement and physical endurance test.' },
      { stepNumber: 3, title: 'Paper II English Language Test', description: '200 Marks objective test in English Language & Comprehension.' },
      { stepNumber: 4, title: 'Detailed Medical Examination (DME)', description: 'Medical evaluation by CAPF medical officers.' }
    ],
    requiredDocuments: [
      { name: 'Graduation Degree', description: 'Bachelor degree in any stream.', mandatory: true },
      { name: 'Driving License (Delhi Police SI)', description: 'Valid LMV Driving License for male candidates applying for Delhi Police SI.', mandatory: false }
    ]
  },
  {
    id: 'rec-icg-navik-gd-02-2026',
    title: 'Indian Coast Guard Navik (General Duty) CGEPT 02/2026 Batch',
    organization: 'Indian Coast Guard',
    category: 'Soldier / Sailor / Airman',
    branch: 'General Duty Maritime Operations',
    qualification: '12th Pass',
    minAge: 18,
    maxAge: 22,
    minPercentage: 50,
    gender: 'Male',
    minHeightCm: 157,
    statesAllowed: ['All India'],
    vacancies: 260,
    notificationDate: '2026-08-01',
    applicationStart: '2026-08-10',
    applicationEnd: '2026-09-07',
    examDate: '2026-10-12',
    admitCardDate: '2026-09-28',
    resultDate: '2026-11-18',
    officialNotificationUrl: 'https://joinindiancoastguard.cdac.in',
    officialApplyUrl: 'https://joinindiancoastguard.cdac.in',
    officialWebsiteUrl: 'https://joinindiancoastguard.cdac.in',
    description: 'Coast Guard Enrolled Personnel Test (CGEPT) for recruitment to the post of Navik (General Duty) in Indian Coast Guard.',
    verifiedOfficial: true,
    status: 'Closing Soon',
    selectionProcess: [
      { stepNumber: 1, title: 'Stage I: Computer Based Examination', description: 'Section I (Math, Science, English, GK, Reasoning) + Section II (Physics & Math 12th level).' },
      { stepNumber: 2, title: 'Stage II: Assessment & PFT', description: 'Physical Fitness Test (1.6 km run in 7 mins, 20 squats, 10 push-ups).' },
      { stepNumber: 3, title: 'Stage III: Final Medicals at INS Chilka', description: 'Document verification and final medical at INS Chilka.' }
    ],
    requiredDocuments: [
      { name: '10+2 Mark Sheet with Maths & Physics', description: 'Issued by recognized Council of Education.', mandatory: true }
    ]
  },
  {
    id: 'rec-icg-yantrik-02-2026',
    title: 'Indian Coast Guard Yantrik (Mechanical / Electrical / Electronics) 02/2026 Batch',
    organization: 'Indian Coast Guard',
    category: 'Technical Entry',
    branch: 'Marine Engineering & Aviation Tech',
    qualification: 'Diploma',
    minAge: 18,
    maxAge: 22,
    minPercentage: 60,
    gender: 'Male',
    minHeightCm: 157,
    statesAllowed: ['All India'],
    vacancies: 60,
    notificationDate: '2026-08-01',
    applicationStart: '2026-08-10',
    applicationEnd: '2026-09-14',
    examDate: '2026-10-14',
    admitCardDate: '2026-09-30',
    resultDate: '2026-11-20',
    officialNotificationUrl: 'https://joinindiancoastguard.cdac.in',
    officialApplyUrl: 'https://joinindiancoastguard.cdac.in',
    officialWebsiteUrl: 'https://joinindiancoastguard.cdac.in',
    description: 'Technical recruitment for diploma holders in Mechanical, Electrical or Electronics Engineering in Indian Coast Guard.',
    verifiedOfficial: true,
    status: 'Open',
    selectionProcess: [
      { stepNumber: 1, title: 'Stage I: Written Test', description: 'Section I + Engineering Diploma Subject Paper.' },
      { stepNumber: 2, title: 'Stage II: PFT & Trade Verification', description: 'Fitness Test & Technical trade verification.' },
      { stepNumber: 3, title: 'Stage III: Medicals at INS Chilka', description: 'Final medical verification.' }
    ],
    requiredDocuments: [
      { name: '3-Year Engineering Diploma Certificate', description: 'Recognized by AICTE.', mandatory: true }
    ]
  },
  {
    id: 'rec-mns-nursing-2026',
    title: 'Military Nursing Service (MNS) B.Sc. Nursing Course 2026',
    organization: 'Indian Army',
    category: 'Medical Entry',
    branch: 'Armed Forces Medical Services (AFMS)',
    qualification: '12th Pass',
    minAge: 17,
    maxAge: 25,
    minPercentage: 50,
    gender: 'Female',
    minHeightCm: 152,
    statesAllowed: ['All India'],
    vacancies: 220,
    notificationDate: '2026-07-25',
    applicationStart: '2026-08-01',
    applicationEnd: '2026-09-20',
    examDate: '2026-10-25',
    admitCardDate: '2026-10-10',
    resultDate: '2026-12-05',
    officialNotificationUrl: 'https://joinindianarmy.nic.in',
    officialApplyUrl: 'https://joinindianarmy.nic.in',
    officialWebsiteUrl: 'https://joinindianarmy.nic.in',
    description: 'Grant of Commission in Military Nursing Service for female candidates who have qualified NEET (UG) 2026.',
    verifiedOfficial: true,
    status: 'Open',
    selectionProcess: [
      { stepNumber: 1, title: 'NEET (UG) 2026 Qualification', description: 'Shortlisting based on NTA NEET (UG) percentile.' },
      { stepNumber: 2, title: 'ToGIGE & PAT Test', description: 'Test of General Intelligence, General English & Psychological Assessment Test.' },
      { stepNumber: 3, title: 'Personal Interview & Medicals', description: 'Interview by Board of Officers at Base Hospital Delhi Cantt.' }
    ],
    requiredDocuments: [
      { name: 'NEET UG 2026 Scorecard', description: 'Official NTA rank and score card.', mandatory: true },
      { name: 'Class 12th Certificate with PCB & English', description: 'Physics, Chemistry, Biology & English passed in first attempt.', mandatory: true }
    ]
  }
];

export const INITIAL_ADMIT_CARDS: AdmitCard[] = [
  {
    id: 'ac-army-agniveer-2026',
    recruitmentId: 'rec-army-agniveer-gd-2026',
    recruitmentTitle: 'Indian Army Agniveer Rally 2026',
    organization: 'Indian Army',
    releaseDate: '2026-10-01',
    examDate: '2026-10-15',
    officialUrl: 'https://joinindianarmy.nic.in',
    status: 'Coming Soon'
  },
  {
    id: 'ac-navy-ssr-2026',
    recruitmentId: 'rec-navy-ssr-01-2026',
    recruitmentTitle: 'Indian Navy Agniveer SSR Intake 01/2026',
    organization: 'Indian Navy',
    releaseDate: '2026-09-02',
    examDate: '2026-10-20',
    officialUrl: 'https://joinindiannavy.gov.in',
    status: 'Available'
  },
  {
    id: 'ac-afcat-2026',
    recruitmentId: 'rec-iaf-afcat-02-2026',
    recruitmentTitle: 'Air Force Common Admission Test (AFCAT 02/2026)',
    organization: 'Indian Air Force',
    releaseDate: '2026-09-04',
    examDate: '2026-10-28',
    officialUrl: 'https://afcat.cdac.in',
    status: 'Available'
  },
  {
    id: 'ac-capf-ac-2026',
    recruitmentId: 'rec-capf-ac-2026',
    recruitmentTitle: 'UPSC CAPF Assistant Commandants Exam 2026',
    organization: 'CAPF',
    releaseDate: '2026-10-25',
    examDate: '2026-11-15',
    officialUrl: 'https://upsconline.nic.in',
    status: 'Coming Soon'
  },
  {
    id: 'ac-icg-navik-2026',
    recruitmentId: 'rec-icg-navik-gd-02-2026',
    recruitmentTitle: 'Indian Coast Guard Navik (GD) 02/2026',
    organization: 'Indian Coast Guard',
    releaseDate: '2026-09-01',
    examDate: '2026-10-12',
    officialUrl: 'https://joinindiancoastguard.cdac.in',
    status: 'Available'
  }
];

export const INITIAL_RESULTS: ResultRecord[] = [
  {
    id: 'res-army-tes-52',
    recruitmentId: 'rec-army-tes-53-2026',
    recruitmentTitle: 'Indian Army Technical Entry Scheme 52 Merit List',
    organization: 'Indian Army',
    resultDate: '2026-08-28',
    officialUrl: 'https://joinindianarmy.nic.in',
    status: 'Published'
  },
  {
    id: 'res-navy-inet-2025',
    recruitmentId: 'rec-navy-inet-officer-2026',
    recruitmentTitle: 'Indian Navy Executive Branch SSC Merit List 2025',
    organization: 'Indian Navy',
    resultDate: '2026-08-14',
    officialUrl: 'https://joinindiannavy.gov.in',
    status: 'Published'
  },
  {
    id: 'res-afcat-01-2026',
    recruitmentId: 'rec-iaf-afcat-02-2026',
    recruitmentTitle: 'IAF AFCAT 01/2026 Written Exam Result & AFSB Dates',
    organization: 'Indian Air Force',
    resultDate: '2026-07-30',
    officialUrl: 'https://afcat.cdac.in',
    status: 'Published'
  },
  {
    id: 'res-capf-cpo-2025',
    recruitmentId: 'rec-capf-ssc-cpo-2026',
    recruitmentTitle: 'SSC CPO Sub-Inspector 2025 Final Result & Department Allocation',
    organization: 'CAPF',
    resultDate: '2026-08-20',
    officialUrl: 'https://ssc.gov.in',
    status: 'Published'
  },
  {
    id: 'res-icg-navik-01-2026',
    recruitmentId: 'rec-icg-navik-gd-02-2026',
    recruitmentTitle: 'Indian Coast Guard Navik (GD) 01/2026 Batch Final Select List',
    organization: 'Indian Coast Guard',
    resultDate: '2026-08-05',
    officialUrl: 'https://joinindiancoastguard.cdac.in',
    status: 'Published'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Application Deadline Warning!',
    message: 'Indian Army Agniveer Rally 2026 application closes in less than 7 days. Ensure your domicile certificate is ready.',
    date: '2026-09-04T10:30:00Z',
    type: 'Deadline',
    isRead: false,
    link: '/recruitment/rec-army-agniveer-gd-2026'
  },
  {
    id: 'notif-2',
    title: 'Admit Card Released',
    message: 'Indian Air Force AFCAT 02/2026 admit cards are now available for download on the official portal.',
    date: '2026-09-04T08:15:00Z',
    type: 'AdmitCard',
    isRead: false,
    link: '/admit-cards'
  },
  {
    id: 'notif-3',
    title: 'New Recruitment Published',
    message: 'Indian Coast Guard Navik (GD) 02/2026 batch notification has been released with 260 vacancies.',
    date: '2026-09-03T14:00:00Z',
    type: 'NewMatch',
    isRead: true,
    link: '/recruitment/rec-icg-navik-gd-02-2026'
  },
  {
    id: 'notif-4',
    title: 'Exam Result Published',
    message: 'Indian Army TES 52 Final Merit List has been officially declared on joinindianarmy.nic.in.',
    date: '2026-08-28T16:45:00Z',
    type: 'Result',
    isRead: true,
    link: '/results'
  }
];

export const INITIAL_STATS: PlatformStats = {
  totalUsers: 14820,
  activeRecruitments: 12,
  closingSoonCount: 5,
  upcomingExamsCount: 8,
  totalBookmarks: 3240,
  admitCardsReleased: 3,
  resultsPublished: 5
};
