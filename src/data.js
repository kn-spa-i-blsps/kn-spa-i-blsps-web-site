// data.js
const members = [
    { 
        id: "jan-mikolajczyk", 
        name: "Jan Mikołajczyk", 
        role: "Prezes",
        customTags: ["Prezes"],
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "jakub-balenkowski", 
        name: "Jakub Bałenkowski", 
        role: "Wiceprezes",
        customTags: ["Wiceprezes"],
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "ania-gierasinska", 
        name: "Ania Gierasińska", 
        role: "Marketing | Skarbniczka", 
        customTags: ["Marketing", "Skarbniczka"],
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "emilia-grygiel", 
        name: "Emilia Grygiel", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "georgina-riu", 
        name: "Georgina Riu", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "hubert-zientara", 
        name: "Hubert Zientara", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "igor-rostkowski", 
        name: "Igor Rostkowski", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bioSource: "bios/igor-rostkowski.md",
        bio: "ASEFNJIASEFDSFKLASDFNJASLEKFJNSADFNJL,F ASDFJNS. SEFNJASEFIJNASEFNJFEASNF NJSAEFKLJSAEF NJKLS EKJASKLSAEFSF NJKLF E AESFANJKLJNLSEFLKNASEFNJKLASEFSEAEKLJFNASEFANSJEFL",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "jan-matusiak", 
        name: "Jan Matusiak", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "jan-ciecierski", 
        name: "Jan Ciecierski", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "julian-maleta", 
        name: "Julian Maleta", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "karol-grzegorzewski", 
        name: "Karol Grzegorzewski", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "maciej-domagalski", 
        name: "Maciej Domagalski", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "maciej-borowiecki", 
        name: "Maciej Borowiecki", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "maksymilian-bernacki", 
        name: "Maksymilian Bernacki", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "marcel-kolecki", 
        name: "Marcel Kolecki", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "maria-ancerowicz", 
        name: "Maria Ancerowicz", 
        role: "Marketing", 
        customTags: ["Marketing"],
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "radek-palys", 
        name: "Radek Pałys", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "stanislaw-kropiewnicki", 
        name: "Stanisław Kropiewnicki", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "stanislaw-swiecki", 
        name: "Stanisław Świecki", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    },
    { 
        id: "szymon-skierski", 
        name: "Szymon Skierski", 
        role: "#", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "#",
        socials: [
            { platform: "linkedin", url: "#" },
            { platform: "website", url: "#" },
            { platform: "instagram", url: "#" }
        ]
    }
];

// data.js - dodajemy bazę projektów
// data.js
const projects = [
    {
        id: "musc",
        title: "MUSC",
        fullTitle: "Modular UAV Swarm Control System with Machine Learning Methods",
        ordering: 1,
        image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop", 
        gallery: [
            "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop", 
            "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop", 
            "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop", 
            "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop", 
            "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop", 
            "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop", 
        ],
        shortDesc: "Autonomiczna sonda do badania jakości wody w zbiornikach retencyjnych.",
        fullDesc: "Projekt Eko Sonda V2 to zaawansowana platforma badawcza wyposażona w zestaw sensorów elektrochemicznych. Urządzenie pozwala na mapowanie zanieczyszczeń w czasie rzeczywistym i przesyłanie danych za pomocą protokołu LoRaWAN bezpośrednio do stacji bazowej.",
        teamIds: ["jan-mikolajczyk", "igor-rostkowski", "radek-palys", "szymon-skierski"],
        spec: [
            { label: "Procesor", value: "STM32F4 Core" },
            { label: "Zasilanie", value: "Li-Po 3S 2200mAh" },
            { label: "Łączność", value: "LoRa 868MHz" },
            { label: "Sensory", value: "pH, O2, Turbidity" }
        ]
    },
    {
        id: "flysearch",
        title: "Flysearch",
        ordering: 2,
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=800&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1473960104502-8a63c8ef7e82?w=800&h=600&fit=crop"
        ],
        shortDesc: "System rozpoznawania obrazu dla dronów inspekcyjnych.",
        fullDesc: "Prototyp systemu wizyjnego opartego na sztucznej inteligencji. Algorytm wykrywa mikropęknięcia w strukturach betonowych, co znacznie przyspiesza inspekcję mostów i wiaduktów.",
        teamIds: ["hubert-zientara", "jan-matusiak", "georgina-riu", "jan-mikolajczyk"],
        spec: [
            { label: "AI Engine", value: "YOLOv8 Nano" },
            { label: "Platforma", value: "Jetson Orin" }
        ]
    },
    {
        id: "bluespark",
        title: "Bluespark",
        ordering: 3,
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=800&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1473960104502-8a63c8ef7e82?w=800&h=600&fit=crop"
        ],
        shortDesc: "System rozpoznawania obrazu dla dronów inspekcyjnych.",
        fullDesc: "Prototyp systemu wizyjnego opartego na sztucznej inteligencji. Algorytm wykrywa mikropęknięcia w strukturach betonowych, co znacznie przyspiesza inspekcję mostów i wiaduktów.",
        teamIds: ["jakub-balenkowski", "jan-ciecierski", "jan-mikolajczyk", "julian-maleta", "maciej-borowiecki", "maksymilian-bernacki", "marcel-kolecki"],
        spec: [
            { label: "AI Engine", value: "YOLOv8 Nano" },
            { label: "Platforma", value: "Jetson Orin" }
        ]
    },
    {
        id: "hawk-eye",
        title: "Hawk Eye",
        ordering: 4,
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=800&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1473960104502-8a63c8ef7e82?w=800&h=600&fit=crop"
        ],
        shortDesc: "System rozpoznawania obrazu dla dronów inspekcyjnych.",
        fullDesc: "Prototyp systemu wizyjnego opartego na sztucznej inteligencji. Algorytm wykrywa mikropęknięcia w strukturach betonowych, co znacznie przyspiesza inspekcję mostów i wiaduktów.",
        teamIds: ["emilia-grygiel", "karol-grzegorzewski", "maciej-domagalski", "stanislaw-kropiewnicki", "stanislaw-swiecki", "jan-mikolajczyk"],
        spec: [
            { label: "AI Engine", value: "YOLOv8 Nano" },
            { label: "Platforma", value: "Jetson Orin" }
        ]
    },
    {
        id: "snows-eye",
        title: "Snow's Eye",
        ordering: 5,
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=800&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1473960104502-8a63c8ef7e82?w=800&h=600&fit=crop"
        ],
        shortDesc: "System rozpoznawania obrazu dla dronów inspekcyjnych.",
        fullDesc: "Prototyp systemu wizyjnego opartego na sztucznej inteligencji. Algorytm wykrywa mikropęknięcia w strukturach betonowych, co znacznie przyspiesza inspekcję mostów i wiaduktów.",
        teamIds: ["jan-mikolajczyk", "hubert-zientara"],
        spec: [
            { label: "AI Engine", value: "YOLOv8 Nano" },
            { label: "Platforma", value: "Jetson Orin" }
        ]
    }
];

// ... (tutaj zostaje Twoja tablica members z poprzedniego kroku)