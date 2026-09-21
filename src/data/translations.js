export const translations = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
      contact: "Kontak"
    },
    hero: {
      subtitle: "Lulusan Baru Teknik Informatika Universitas Islam Riau | Software Engineer | Backend Developer | Web & Mobile Developer",
      cvBtn: "📄 Unduh CV",
      contactBtn: "💬 Hubungi Saya"
    },
    about: {
      title: "Tentang Saya",
      paragraph: "Saya Dandi Pratama, lulusan baru Program Studi Teknik Informatika Universitas Islam Riau yang berhasil menyelesaikan studi dalam waktu kurang dari empat tahun. Saya memiliki minat besar di bidang Software Engineering, khususnya Backend Development, Web Development, Mobile Development, dan Frontend Development. Selama masa perkuliahan, saya aktif mengembangkan berbagai aplikasi web dan mobile menggunakan React.js, Vue.js, Flutter, serta bahasa pemrograman Java dan Go. Saya juga memiliki pengalaman dalam merancang dan membangun RESTful API serta bekerja dengan basis data seperti MongoDB dan SQLite untuk mendukung sistem yang efisien dan skalabel. Saya senang mempelajari teknologi baru dan terus mengasah kemampuan dalam membangun solusi digital yang fungsional, rapi, dan berdampak. Saat ini saya terbuka untuk peluang sebagai Software Engineer dan siap berkontribusi dalam tim pengembangan yang dinamis.",
      stats: [
        { value: "< 4 Thn", label: "Masa Studi Teknik Informatika UIR" },
        { value: "IPK 3.46 / 4.00", label: "Indeks Prestasi Kumulatif (IPK)" }
      ],
      highlights: [
        {
          icon: "🎓",
          title: "Education & Fast Graduation",
          desc: "Lulusan Sarjana Teknik (S.T) Program Studi Teknik Informatika dari Universitas Islam Riau yang menyelesaikan studi kurang dari 4 tahun."
        },
        {
          icon: "📜",
          title: "Judul Skripsi (Tugas Akhir)",
          desc: "\"Aplikasi Eyemate Berbasis AI dalam Pengenalan Objek dan Panduan Suara dan Teks Penyandang Gangguan Penglihatan\" (dikembangkan untuk Android & iOS menggunakan YOLOv8)."
        }
      ],
      experienceBadge: "Pengalaman Kerja",
      experienceTitle: "Pengalaman Kerja",
      experienceSubtitle: "Riwayat pengalaman kerja profesional dan magang industri",
      experiences: [
        {
          role: "Backend Developer",
          company: "SIOPLAS, SKIPM Pekanbaru Project",
          location: "Pekanbaru, Indonesia",
          period: "08 Oktober 2025 – 17 Januari 2026",
          type: "Work Experience",
          icon: "💻",
          desc: "Mengembangkan backend aplikasi SIOPLAS menggunakan Go (Golang) untuk mendukung manajemen data, manajemen penugasan, dan pelaporan operasional.",
          details: [
            "Mengembangkan backend aplikasi SIOPLAS menggunakan Go (Golang) untuk mendukung manajemen data, task management, dan pelaporan operasional.",
            "Merancang dan membangun RESTful API untuk menghubungkan komunikasi antara layanan backend dan aplikasi frontend.",
            "Merancang dan mengelola basis data MySQL, termasuk struktur tabel, relasi data, serta operasi CRUD sesuai kebutuhan sistem.",
            "Mengimplementasikan business logic, validasi data, penanganan request, dan manajemen response pada layanan backend.",
            "Mengembangkan fitur penugasan dan pelaporan untuk mendukung proses administrasi serta monitoring kerja.",
            "Mengintegrasikan fungsionalitas AI untuk meringkas laporan secara otomatis sehingga informasi menjadi lebih ringkas dan efisien untuk ditinjau."
          ],
          skills: ["Go (Golang)", "RESTful API", "MySQL", "Database Management", "Business Logic", "AI Integration", "Backend Development"]
        },
        {
          role: "UI/UX Design Intern",
          company: "PT Pertamina Refinery Unit II Dumai",
          location: "Dumai, Indonesia",
          period: "01 Juli 2025 – 29 Agustus 2025",
          type: "Internship",
          icon: "🎨",
          desc: "Merancang prototipe antarmuka sistem pelaporan lapangan dan mendukung operasional pemantauan fasilitas kilang minyak.",
          details: [
            "Merancang prototipe UI/UX menggunakan Figma untuk website berbasis chatbot guna memfasilitasi pengajuan laporan lapangan ke departemen terkait yang bertanggung jawab atas peralatan dan sumber daya.",
            "Membantu entri data karyawan dan pengelolaan data administrasi perusahaan secara rapi dan akurat.",
            "Melakukan observasi lapangan langsung terhadap operasional pemrosesan dan manajemen kilang minyak.",
            "Membantu divisi CCTV dalam memantau aktivitas karyawan dan operasional kerja di PT Pertamina Refinery Unit II Dumai."
          ],
          skills: ["Figma", "UI/UX Design", "Prototyping", "Data Management", "Field Operations", "CCTV Monitoring"]
        }
      ]
    },
    skills: {
      title: "Keahlian & Tech Stack",
      teamTitle: "Keahlian Kerja & Kolaborasi",
      expLabel: "Pengalaman:",
      team: [
        {
          title: "Kolaborasi Tim & Komunikasi",
          desc: "Berpengalaman bekerja dalam tim pengembang lintas peran, aktif berdiskusi dalam perancangan arsitektur sistem, serta berkomunikasi secara akurat.",
          experience: "Proyek Tim & Perkuliahan UIR",
          badge: "Team Player",
          icon: "👥"
        },
        {
          title: "Git & Version Control",
          desc: "Terbiasa menggunakan Git & GitHub untuk kolaborasi kode, mengelola branching strategy, resolusi conflict, dan pull request review.",
          experience: "Pengembangan Multi-Project",
          badge: "Git Flow",
          icon: "🔀"
        },
        {
          title: "Problem Solving & Logic Analysis",
          desc: "Mampu melakukan analisa akar masalah (root-cause analysis), memecahkan bug kompleks, serta mengoptimalkan efisiensi algoritma dan API.",
          experience: "Tugas Akhir & Sistem Backend",
          badge: "Problem Solver",
          icon: "🧠"
        },
        {
          title: "Manajemen Tugas & Kolaborasi Kerja",
          desc: "Disiplin mengelola alur kerja perangkat lunak, memprioritaskan fitur utama, serta memastikan penyelesaian tugas sesuai target waktu serta berkomukasi sesama tim.",
          experience: "Proyek Kuliah & Aplikasi Mobile",
          badge: "Agile Mindset",
          icon: "⏱️"
        }
      ]
    },
    projects: {
      title: "Proyek Unggulan",
      subtitle: "Pilih kategori untuk melihat proyek berdasarkan bidang keahlian",
      allCategory: "Semua",
      emptyState: "Belum ada proyek dalam kategori ini.",
      categories: {
        backend: "Backend",
        fullstack: "Full Stack Developer",
        ai: "AI Engineer",
        mobile: "Mobile Developer"
      },
      items: [
        {
          id: "eyemate",
          title: "EyeMate - AI Mobile Assistant",
          desc: "Aplikasi mobile pendeteksi objek real-time berbasis YOLOv8 untuk penyandang gangguan penglihatan dengan panduan suara & teks di Android dan iOS."
        },
        {
          id: "absensiku",
          title: "Absensiku",
          desc: "Sistem absensi online berbasis web dan mobile dengan fitur Geo-tagging dan notifikasi real-time."
        },
        {
          id: "kopi-kenangan",
          title: "Kopi-Kenangan",
          desc: "Website ini untuk landing page Coffee Shop serta melihat menu."
        },
        {
          id: "sioplas",
          title: "SIOPLAS",
          desc: "Website untuk kantor karantina perikanan dan kelautan pekanbaru dalam pengajuan laporan atau tugas laporan tribulan."
        }
      ]
    },
    contact: {
      title: "Hubungi Saya",
      intro: "Saya selalu terbuka untuk berdiskusi mengenai peluang karier, proyek kolaborasi, maupun pertanyaan seputar software engineering dan AI. Jangan ragu untuk menghubungi saya!",
      email: "Email",
      location: "Lokasi",
      locationVal: "Pekanbaru, Riau, Indonesia",
      nameLabel: "Nama Lengkap",
      namePlaceholder: "Masukkan nama Anda",
      emailLabel: "Alamat Email",
      emailPlaceholder: "nama@example.com",
      subjectLabel: "Subjek / Topik",
      subjectPlaceholder: "Subjek",
      messageLabel: "Pesan",
      messagePlaceholder: "Pesan",
      sendBtn: "Kirim Pesan"
    },
    footer: {
      copy: "© 2026 Dandi Pratama"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      subtitle: "Informatics Engineering Fresh Graduate from Universitas Islam Riau | Software Engineer | Backend Developer | Web &Mobile Developer",
      cvBtn: "📄 Download CV",
      contactBtn: "💬 Contact Me"
    },
    about: {
      title: "About Me",
      paragraph: "Hello, I'm Dandi Pratama, a fresh graduate of the Informatics Engineering Program at Universitas Islam Riau who successfully completed my studies in less than four years. I have a strong interest in Software Engineering, particularly in Backend Development, Web Development, Mobile Development, and Frontend Development. During my college years, I actively developed various web and mobile applications using React.js, Vue.js, Flutter, as well as Java and Go programming languages. I also have experience in designing and building RESTful APIs and working with databases such as MongoDB and SQLite to support efficient and scalable systems. I enjoy learning new technologies and continuously honing my skills in building functional, neat, and impactful digital solutions. Currently, I am open to opportunities as a Software Engineer and ready to contribute to a dynamic development team.",
      stats: [
        { value: "< 4 Yrs", label: "Study Duration Informatics UIR" },
        { value: "GPA 3.46 / 4.00", label: "Cumulative Grade Point Average" }
      ],
      highlights: [
        {
          icon: "🎓",
          title: "Education & Fast Graduation",
          desc: "Completed Bachelor of Engineering (S.T) in Informatics Engineering at Universitas Islam Riau in under 4 years."
        },
        {
          icon: "📜",
          title: "Bachelor Thesis Title",
          desc: "\"Aplikasi Eyemate Berbasis AI dalam Pengenalan Objek dan Panduan Suara dan Teks Penyandang Gangguan Penglihatan\" (developed for Android & iOS using YOLOv8)."
        }
      ],
      experienceBadge: "Work Experience",
      experienceTitle: "Work Experience",
      experienceSubtitle: "Professional work experience and industrial internship track record",
      experiences: [
        {
          role: "Backend Developer",
          company: "SIOPLAS, SKIPM Pekanbaru Project",
          location: "Pekanbaru, Indonesia",
          period: "08 October 2025 – 17 January 2026",
          type: "Work Experience",
          icon: "💻",
          desc: "Developed the backend of the SIOPLAS application using Go (Golang) to support data management, task management, and operational reporting.",
          details: [
            "Developed the backend of the SIOPLAS application using Go (Golang) to support data management, task management, and operational reporting.",
            "Designed and developed RESTful APIs to enable communication between the backend and frontend applications.",
            "Designed and managed MySQL databases, including table structures, data relationships, and CRUD operations based on system requirements.",
            "Implemented business logic, data validation, request handling, and response management within the backend services.",
            "Developed task and reporting features to support administrative processes and work monitoring.",
            "Integrated AI functionality to summarize reports, making information more concise and efficient to review."
          ],
          skills: ["Go (Golang)", "RESTful API", "MySQL", "Database Management", "Business Logic", "AI Integration", "Backend Development"]
        },
        {
          role: "UI/UX Design Intern",
          company: "PT Pertamina Refinery Unit II Dumai",
          location: "Dumai, Indonesia",
          period: "01 July 2025 – 29 August 2025",
          type: "Internship",
          icon: "🎨",
          desc: "Designed UI/UX prototypes for field reporting systems and supported operational monitoring at the refinery facility.",
          details: [
            "Designed UI/UX prototypes using Figma for a chatbot-based website aimed at facilitating field report submissions to the relevant departments responsible for equipment and resource requests.",
            "Assisted with employee data entry and administrative data management.",
            "Conducted direct field observations of the oil processing and management operations.",
            "Assisted the CCTV division in monitoring employee activities and work operations at PT Pertamina Refinery Unit II Dumai."
          ],
          skills: ["Figma", "UI/UX Design", "Prototyping", "Data Management", "Field Operations", "CCTV Monitoring"]
        }
      ]
    },
    skills: {
      title: "Skills & Tech Stack",
      teamTitle: "Workplace & Team Skills",
      expLabel: "Experience:",
      team: [
        {
          title: "Team Collaboration & Communication",
          desc: "Experienced working in cross-functional developer teams, actively discussing system architecture, and communicating technical ideas accurately.",
          experience: "Team Projects & UIR Coursework",
          badge: "Team Player",
          icon: "👥"
        },
        {
          title: "Git & Version Control",
          desc: "Proficient in Git & GitHub workflows, branch management strategies, resolving merge conflicts, and conducting code reviews.",
          experience: "Multi-Project Development",
          badge: "Git Flow",
          icon: "🔀"
        },
        {
          title: "Problem Solving & Logic Analysis",
          desc: "Skilled in root-cause analysis, debugging complex issues, and optimizing algorithm efficiency & RESTful APIs.",
          experience: "Thesis Project & Backend Systems",
          badge: "Problem Solver",
          icon: "🧠"
        },
        {
          title: "Task Management & Team Collaboration",
          desc: "Disciplined in managing software workflows, prioritizing main features, and ensuring task completion according to target time while communicating with the team.",
          experience: "University Projects & Mobile Apps",
          badge: "Agile Mindset",
          icon: "⏱️"
        }
      ]
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Filter projects by specialization or tech focus",
      allCategory: "All",
      emptyState: "No projects found in this category.",
      categories: {
        backend: "Backend",
        fullstack: "Full Stack Developer",
        ai: "AI Engineer",
        mobile: "Mobile Developer"
      },
      items: [
        {
          id: "eyemate",
          title: "EyeMate - AI Mobile Assistant",
          desc: "Real-time object detection mobile app using YOLOv8 for visually impaired users with voice & text guidance on Android and iOS."
        },
        {
          id: "absensiku",
          title: "Absensiku",
          desc: "Web and mobile-based online attendance system with Geo-tagging feature and real-time notifications."
        },
        {
          id: "kopi-kenangan",
          title: "Kopi-Kenangan",
          desc: "Coffee Shop landing page website and menu viewer."
        },
        {
          id: "sioplas",
          title: "SIOPLAS",
          desc: "Website for the Pekanbaru Fishery and Marine Quarantine Office for submitting reports or quarterly report tasks."
        }
      ]
    },
    contact: {
      title: "Contact Me",
      intro: "I am always open to discussing career opportunities, software projects, or inquiries related to Software Engineering and AI. Feel free to reach out!",
      email: "Email",
      location: "Location",
      locationVal: "Pekanbaru, Riau, Indonesia",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your name",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      subjectLabel: "Subject / Topic",
      subjectPlaceholder: "Subject",
      messageLabel: "Message",
      messagePlaceholder: "Message",
      sendBtn: "Send Message"
    },
    footer: {
      copy: "© 2026 Dandi Pratama"
    }
  }
};
