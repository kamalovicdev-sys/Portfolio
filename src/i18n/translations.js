// Sayt matnlari: en — standart til, uz — o'zbekcha.
// Ikkala tilda ham kalitlar bir xil bo'lishi kerak.
const translations = {
  uz: {
    // Qidiruv tizimlari va ijtimoiy tarmoqlar uchun (src/seo.js): sarlavha ≤ 60, tavsif ≤ 160 belgi
    seo: {
      title: "Mavlonxon Mamadaliev — Data va Backend muhandisi | Kamalovic",
      description: "Mavlonxon Mamadaliev (Kamalovic) portfoliosi: Django va React mahsulotlari, Metabase analitik dashboardlari, Python va SQL yordamida ma'lumotlar tahlili.",
      jobTitle: "Data va Backend muhandisi",
      imageAlt: "Mavlonxon Mamadaliev — Data va Backend muhandisi portfoliosi",
    },
    nav: {
      home: "Bosh sahifa",
      experience: "Tajriba",
      projects: "Loyihalar",
      contact: "Contact",
      switchLanguage: "Ingliz tiliga o'tish",
      toggleTheme: "Mavzuni o'zgartirish",
      openMenu: "Asosiy menyuni ochish",
      closeMenu: "Menyuni yopish",
    },
    hero: {
      titleLine1: "Murakkab muammolarga",
      titleLine2: "soddalashgan yechimlar.",
      subtitle: "Ma'lumotlar tahlili va yuqori yuklanishga bardosh beruvchi, ishonchli backend tizimlarini qurishga ixtisoslashganman",
      projectsButton: "Loyihalar",
      contactButton: "Bog'lanish",
    },
    // Ish tajribasi va ta'lim — rezyumedan (Mamadaliyev_Mavlonxon_Kamalovich.pdf); Express Backend (42.uz) — qo'shimcha
    experience: {
      title: "Ish Tajribasi",
      education: "Ta'lim",
      items: {
        mehrzod: {
          role: "Team Lead",
          company: "Mehrzod Business Group · Toshkent",
          period: "Yan 2024 — Hozirgacha",
          details: [
            "IT yo'nalishiga mas'ulman: ichki tizimlar, raqamli mahsulotlar ishlab chiqish va ma'lumotlar tahlili. Loyihalarni vazifa qo'yilishidan ishga tushirishgacha olib boraman.",
            "SaaS mahsulotlar: Smart Distribution (distribyutorlar uchun Telegram Mini App), MyTeam Plus (multi-tenant farm-CRM), MyTeam (dala xodimlari nazorati), do'konlar uchun POS tizimi, Medicy va Telegram marketpleys.",
            "Analitika (Metabase, PostgreSQL, Python): O'zbekistonda uy-joy talabi va taklifi, quyosh energetikasi bozori, Pharm Holding dorixonalar tarmog'i.",
            "Stek: Django, FastAPI, PostgreSQL, Celery, Redis, React + TypeScript, React Native, Docker; MyTeam Plus'da 500+, Smart Distribution'da 130+ avtotest.",
          ],
        },
        freelance: {
          role: "Data Analyst",
          company: "Freelance",
          period: "May 2023 — Hozirgacha",
          details: [
            "FMCG va turar-joy ko'chmas mulki: sotuvlarning deskriptiv tahlili, xaridorlar va obyektlar segmentatsiyasi, narx va sotuv dinamikasi, rentabellik, ROI va Market Basket Analysis.",
            "Farmatsevtika va distribyutsiya: dorilarga talab davr va hududlar kesimida, mavsumiylik, preparatlar segmentatsiyasi, birga xarid qilinadigan preparatlar va eng foydali pozitsiyalar.",
            "Hisob-kitoblar uchun Python va SQL, vizualizatsiya uchun Power BI va Metabase.",
          ],
        },
        solar: {
          role: "Backend Developer",
          company: "Solar Nature · Toshkent",
          period: "Yan 2024 — Noy 2024",
          details: [
            "Savdo bo'limini tartibga soldim: CRM tizimini joriy qildim va xodimlar uni kundalik ishda qo'llashini nazorat qildim.",
            "Kompaniyani ERP ga o'tishga tayyorladim: qog'ozda yuritilgan ombor hisobini avtomatlashtiruvchi dastur ishlab chiqdik — qoldiqlar va hisobotlar real vaqtda.",
            "Korporativ sayt (2.0 versiya), kalkulyator va Telegram-bot ishlab chiqdim; bozor tahlili va byudjet hisob-kitobiga mas'ul bo'ldim.",
          ],
        },
      },
      educationItems: [
        { degree: "Express Backend", institution: "42.uz", date: "2024" },
        { degree: "Data Analysis Bootcamp", institution: "Coursera · Data Analyst", date: "2024" },
        { degree: "Python Backend", institution: "PDP Academy", date: "2023" },
        { degree: "Full Stack Python Developer", institution: "Mohirdev · Backend Developer", date: "2022" },
        { degree: "Servis va tadbirkorlik kasb-hunar kolleji", institution: "O'rta maxsus ta'lim", date: "2016" },
      ],
    },
    projects: {
      title: "Amaliy Loyihalar",
      categories: {
        all: "Barchasi",
        dev: "Dasturlash",
        analytics: "Analytics",
      },
      viewDashboard: "Dashboardni ko'rish",
      openApp: "Ilovani ochish",
      openInNewTab: "Yangi oynada ochish",
      close: "Yopish",
      items: {
        myteam: "Xodimlar va davomatni boshqarish tizimi: planshet va mobil ilova orqali davomat, kechikishlar nazorati, ish jadvallari va smenalar, ta'tillar, xodimlarning jonli GPS xaritasi, vakansiyalar, treninglar va KPI.",
        myteamPlus: "Farmatsevtika kompaniyalari uchun tibbiy vakillar CRM'i: shifokor, dorixona va muassasalar bazasi, vizitlar va hamrohlik hisobotlari, namunalar ombori, savdo rejasi, KPI va bonuslar, distribyutor savdosini dorixonalarga bog'lash.",
        smartDistribution: "Distribyutorlar uchun Telegram Mini App: do'konlar katalogdan buyurtma beradi, haydovchilar optimallashtirilgan yo'nalish bo'yicha yetkazadi, admin esa ombor, qaytarishlar, aksiyalar, qarzdorlik, to'lovlar, e-faktura va analitikani boshqaradi.",
        realEstate: "O'zbekistonda uy-joy talabi va taklifi: quriladigan uylar yangi oilalar va aholi o'sishiga yetadimi, 2046-yilgacha talab prognozi, hududlar bo'yicha 1 m² narxi va uy-joy olish imkoniyati. Manbalar: Statistika agentligi (SIAT), Markaziy bank, Qurilish vazirligi.",
        pharm: "Dorixonalar tarmog'i (Pharm Holding) bo'yicha sotuv, tovarlar, omborlar va dorixonalar tahlili: tushum va marja, kategoriyalar bo'yicha foyda, muddati o'tgan va tugayotgan partiyalar, tugagan va kam qolgan tovarlar uchun buyurtma ro'yxati. Demo ma'lumotlar har kuni yangilanadi.",
        solar: "Quyosh energetikasi kompaniyalari uchun O'zbekiston bo'yicha ma'lumotlar: elektr iste'moli va taqchilligi, hududlarning quyosh resursi, qurilish, quyosh stansiyalari reyestri, tijorat SES (C&I) o'zini oqlash muddati va modelni PVGIS bilan tekshirish.",
      },
    },
    stats: {
      leetcodeTitle: "Algoritmik qobiliyat (LeetCode)",
      problems: "Masalalar",
      analysisTitle: "Data Analysis",
      // Matn ikki formula bilan uch qismga bo'lingan
      analysisIntro: "Katta hajmdagi ma'lumotlar ustida amallar bajarish va ular asosida bashoratli modellarni qurish. Tahlillarda chiziqli regressiya ",
      analysisMiddle: " va o'rtacha kvadratik og'ish ",
      analysisOutro: " kabi matematik modellarni keng qo'llayman.",
    },
    contact: {
      title: "Contact",
      subtitle: "Yangi loyihalar, ma'lumotlar tahlili va backend arxitekturasi bo'yicha hamkorlikka tayyorman.",
      name: "Ism",
      namePlaceholder: "Ismingizni kiriting",
      email: "Email",
      message: "Xabar",
      messagePlaceholder: "Xabaringizni yozing...",
      sending: "Yuborilmoqda...",
      success: "Muvaffaqiyatli yuborildi!",
      error: "Xatolik yuz berdi. Qayta urinib ko'ring.",
      submit: "Xabarni yuborish",
      networks: "Tarmoqlar",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },

  en: {
    seo: {
      title: "Mavlonxon Mamadaliev — Data & Backend Engineer | Kamalovic",
      description: "Portfolio of Mavlonxon Mamadaliev (Kamalovic), Data & Backend Engineer: Django and React products, Metabase dashboards, Python and SQL data analysis.",
      jobTitle: "Data & Backend Engineer",
      imageAlt: "Mavlonxon Mamadaliev — Data & Backend Engineer portfolio",
    },
    nav: {
      home: "Home",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      switchLanguage: "Switch to Uzbek",
      toggleTheme: "Toggle theme",
      openMenu: "Open main menu",
      closeMenu: "Close menu",
    },
    hero: {
      titleLine1: "Complex problems,",
      titleLine2: "simplified solutions.",
      subtitle: "I specialize in data analysis and in building reliable backend systems that withstand high load",
      projectsButton: "Projects",
      contactButton: "Get in touch",
    },
    experience: {
      title: "Work Experience",
      education: "Education",
      items: {
        mehrzod: {
          role: "Team Lead",
          company: "Mehrzod Business Group · Tashkent",
          period: "Jan 2024 — Present",
          details: [
            "Responsible for the IT division: internal systems, digital product development and data analytics. I run projects from problem statement to launch.",
            "SaaS products: Smart Distribution (Telegram Mini App for distributors), MyTeam Plus (multi-tenant pharma CRM), MyTeam (field staff tracking), a POS system for shops, Medicy and a Telegram marketplace.",
            "Analytics (Metabase, PostgreSQL, Python): housing supply and demand in Uzbekistan, the solar energy market, the Pharm Holding pharmacy chain.",
            "Stack: Django, FastAPI, PostgreSQL, Celery, Redis, React + TypeScript, React Native, Docker; 500+ automated tests in MyTeam Plus, 130+ in Smart Distribution.",
          ],
        },
        freelance: {
          role: "Data Analyst",
          company: "Freelance",
          period: "May 2023 — Present",
          details: [
            "FMCG and residential real estate: descriptive sales analysis, customer and property segmentation, price and sales dynamics, profitability, ROI and Market Basket Analysis.",
            "Pharma and distribution: drug demand by period and region, seasonality, product segmentation, products bought together and the most profitable items.",
            "Python and SQL for calculations, Power BI and Metabase for visualization.",
          ],
        },
        solar: {
          role: "Backend Developer",
          company: "Solar Nature · Tashkent",
          period: "Jan 2024 — Nov 2024",
          details: [
            "Organized the sales department: implemented a CRM system and supervised how the team adopted it in daily work.",
            "Prepared the company for ERP: we built software that automated paper-based warehouse accounting — real-time stock levels and reporting.",
            "Developed the corporate website (version 2.0), a calculator and a Telegram bot; handled market analysis and budget calculation.",
          ],
        },
      },
      educationItems: [
        { degree: "Express Backend", institution: "42.uz", date: "2024" },
        { degree: "Data Analysis Bootcamp", institution: "Coursera · Data Analyst", date: "2024" },
        { degree: "Python Backend", institution: "PDP Academy", date: "2023" },
        { degree: "Full Stack Python Developer", institution: "Mohirdev · Backend Developer", date: "2022" },
        { degree: "College of Service and Entrepreneurship", institution: "Secondary vocational education", date: "2016" },
      ],
    },
    projects: {
      title: "Projects",
      categories: {
        all: "All",
        dev: "Development",
        analytics: "Analytics",
      },
      viewDashboard: "View dashboard",
      openApp: "Open app",
      openInNewTab: "Open in new tab",
      close: "Close",
      items: {
        myteam: "Employee and attendance management system: attendance via tablets and a mobile app, lateness tracking, work schedules and shifts, leave, a live GPS map of employees, vacancies, trainings and KPIs.",
        myteamPlus: "CRM for pharmaceutical medical representatives: database of doctors, pharmacies and institutions, visits and coaching reports, sample inventory, sales plans, KPIs and bonuses, matching distributor sales to pharmacies.",
        smartDistribution: "Telegram Mini App for distributors: shops order from a catalog, drivers deliver along optimized routes, and admins manage stock, returns, promotions, debts, payments, e-invoices and analytics.",
        realEstate: "Housing supply and demand in Uzbekistan: is enough housing being built for new families and population growth, a demand forecast to 2046, price per m² and housing affordability by region. Sources: Statistics Agency (SIAT), Central Bank, Ministry of Construction.",
        pharm: "Sales, product, warehouse and pharmacy analytics for a pharmacy chain (Pharm Holding): revenue and margin, profit by category, expired and expiring batches, a reorder list for out-of-stock and low-stock items. Demo data, updated daily.",
        solar: "Data on Uzbekistan for solar energy companies: electricity consumption and deficit, regional solar resource, construction, a registry of solar plants, commercial (C&I) solar payback period and model validation against PVGIS.",
      },
    },
    stats: {
      leetcodeTitle: "Algorithmic skills (LeetCode)",
      problems: "Problems",
      analysisTitle: "Data Analysis",
      analysisIntro: "Processing large datasets and building predictive models on top of them. In my analyses I make wide use of mathematical models such as linear regression ",
      analysisMiddle: " and standard deviation ",
      analysisOutro: ".",
    },
    contact: {
      title: "Contact",
      subtitle: "Open to collaboration on new projects, data analysis and backend architecture.",
      name: "Name",
      namePlaceholder: "Enter your name",
      email: "Email",
      message: "Message",
      messagePlaceholder: "Write your message...",
      sending: "Sending...",
      success: "Sent successfully!",
      error: "Something went wrong. Please try again.",
      submit: "Send message",
      networks: "Social links",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

export default translations;
