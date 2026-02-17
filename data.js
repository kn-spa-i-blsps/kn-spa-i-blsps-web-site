// data.js
const members = [
    { 
        id: "jan-kowalski", 
        name: "Jan Kowalski", 
        role: "Prezes", 
        img: "https://i.pravatar.cc/150?u=1",
        bio: "Pasjonat robotyki i systemów wbudowanych. W kole od 2022 roku. <b>Lider projektu</b> autonomicznego drona.",
        links: { github: "https://github.com", linkedin: "#" }
    },
    { 
        id: "anna-nowak", 
        name: "Anna Nowak", 
        role: "Wiceprezes", 
        img: "https://i.pravatar.cc/150?u=2",
        bio: "Specjalistka od analizy danych i uczenia maszynowego. Koordynuje warsztaty z Pythona.",
        links: { github: "#", linkedin: "#" }
    },
    { 
        id: "michal-wisniewski", 
        name: "Michał Wiśniewski", 
        role: "Tech Lead", 
        img: "https://i.pravatar.cc/150?u=3",
        bio: "Fullstack Developer. Odpowiada za infrastrukturę serwerową naszych projektów.",
        links: { github: "#", linkedin: "#" }
    },
    { 
        id: "katarzyna-zajac", 
        name: "Katarzyna Zając", 
        role: "Social Media", 
        img: "https://i.pravatar.cc/150?u=4",
        bio: "Dba o to, aby o naszych sukcesach usłyszał cały świat (a przynajmniej cała uczelnia).",
        links: { github: "#", linkedin: "#" }
    },
    { 
        id: "marek-poczta", 
        name: "Marek Poczta", 
        role: "Elektronik", 
        img: "https://i.pravatar.cc/150?u=5",
        bio: "Magik od lutownicy. Żaden układ scalony nie ma przed nim tajemnic.",
        links: { github: "#", linkedin: "#" }
    },
    { 
        id: "julia-kwiatkowska", 
        name: "Julia Kwiatkowska", 
        role: "UX/UI Designer", 
        img: "https://i.pravatar.cc/150?u=9",
        bio: "Projektuje interfejsy, które są nie tylko ładne, ale i użyteczne.",
        links: { github: "#", linkedin: "#" }
    },
    { 
        id: "tomasz-kot", 
        name: "Tomasz Kot", 
        role: "Embedded Dev", 
        img: "https://i.pravatar.cc/150?u=12",
        bio: "Programuje mikrokontrolery w C++. Fan optymalizacji kodu.",
        links: { github: "#", linkedin: "#" }
    },
    { 
        id: "ola-sokol", 
        name: "Aleksandra Sokół", 
        role: "PR Manager", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "Organizatorka konferencji i spotkań z partnerami biznesowymi.",
        links: { github: "#", linkedin: "#" }
    },
    { 
        id: "piotr-nowicki", 
        name: "Piotr Nowicki", 
        role: "Data Scientist", 
        img: "https://i.pravatar.cc/150?u=20",
        bio: "Przeszukuje bazy danych w poszukiwaniu sensu i ciekawych statystyk.",
        links: { github: "#", linkedin: "#" }
    },
    { 
        id: "monika-mroz", 
        name: "Monika Mróz", 
        role: "Testerka", 
        img: "https://i.pravatar.cc/150?u=30",
        bio: "Znajdzie błąd tam, gdzie nikt inny go nie szukał. Perfekcjonistka.",
        links: { github: "#", linkedin: "#" }
    }
];

// data.js - dodajemy bazę projektów
// data.js
const projects = [
    {
        id: "eko-sonda",
        title: "Eko Sonda V2",
        image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&h=800&fit=crop", 
        gallery: [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=600&fit=crop"
        ],
        shortDesc: "Autonomiczna sonda do badania jakości wody w zbiornikach retencyjnych.",
        fullDesc: "Projekt Eko Sonda V2 to zaawansowana platforma badawcza wyposażona w zestaw sensorów elektrochemicznych. Urządzenie pozwala na mapowanie zanieczyszczeń w czasie rzeczywistym i przesyłanie danych za pomocą protokołu LoRaWAN bezpośrednio do stacji bazowej.",
        teamIds: ["jan-kowalski", "anna-nowak"],
        spec: [
            { label: "Procesor", value: "STM32F4 Core" },
            { label: "Zasilanie", value: "Li-Po 3S 2200mAh" },
            { label: "Łączność", value: "LoRa 868MHz" },
            { label: "Sensory", value: "pH, O2, Turbidity" }
        ]
    },
    {
        id: "drone-vision",
        title: "Drone Vision v1",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=800&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1473960104502-8a63c8ef7e82?w=800&h=600&fit=crop"
        ], // Tylko jedno dodatkowe zdjęcie
        shortDesc: "System rozpoznawania obrazu dla dronów inspekcyjnych.",
        fullDesc: "Prototyp systemu wizyjnego opartego na sztucznej inteligencji. Algorytm wykrywa mikropęknięcia w strukturach betonowych, co znacznie przyspiesza inspekcję mostów i wiaduktów.",
        teamIds: ["jan-kowalski"], // Tylko jedna osoba
        spec: [
            { label: "AI Engine", value: "YOLOv8 Nano" },
            { label: "Platforma", value: "Jetson Orin" }
        ]
    }
];

// ... (tutaj zostaje Twoja tablica members z poprzedniego kroku)