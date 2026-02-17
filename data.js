// data.js
const members = [
    { 
        id: "ola-sokol", 
        name: "Aleksandra Sokół", 
        role: "PR Manager", 
        img: "https://i.pravatar.cc/150?u=15",
        bio: "Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!Organizatorka konferencji i spotkań z partnerami biznesowymi. <br><br> Zapraszam do kontaktu w sprawach networkingowych!",
        // Tablica linków - dodajesz tylko te, które chcesz
        socials: [
            { platform: "linkedin", url: "https://linkedin.com/in/olasokol" },
            { platform: "website", url: "https://olasokol.pl" },
            { platform: "instagram", url: "https://instagram.com/olasokol" }
        ]
    },
    { 
        id: "jan-kowalski", 
        name: "Jan Kowalski", 
        role: "Dev", 
        img: "https://i.pravatar.cc/150?u=10",
        bio: "Koduję w nocy, śpię w dzień.",
        socials: [
            { platform: "github", url: "https://github.com/jankowalski" }
        ] // Jan nie ma LinkedIn, więc nic się nie wyświetli
    },
    { 
        id: "jan-kkkkkkowalski", 
        name: "Jan Kowalski", 
        role: "Dev", 
        img: "https://i.pravatar.cc/150?u=10",
        bio: "Koduję w nocy, śpię w dzień.",
        socials: [
            { platform: "github", url: "https://github.com/jankowalski" }
        ] // Jan nie ma LinkedIn, więc nic się nie wyświetli
    },
    { 
        id: "jan-kkkkkowalski", 
        name: "Jan Kowalski", 
        role: "Dev", 
        img: "https://i.pravatar.cc/150?u=10",
        bio: "Koduję w nocy, śpię w dzień.",
        socials: [
            { platform: "github", url: "https://github.com/jankowalski" }
        ] // Jan nie ma LinkedIn, więc nic się nie wyświetli
    },
    { 
        id: "jan-kkkkowalski", 
        name: "Jan Kowalski", 
        role: "Dev", 
        img: "https://i.pravatar.cc/150?u=10",
        bio: "Koduję w nocy, śpię w dzień.",
        socials: [
            { platform: "github", url: "https://github.com/jankowalski" }
        ] // Jan nie ma LinkedIn, więc nic się nie wyświetli
    },
    { 
        id: "jan-kkkowalski", 
        name: "Jan Kowalski", 
        role: "Dev", 
        img: "https://i.pravatar.cc/150?u=10",
        bio: "Koduję w nocy, śpię w dzień.",
        socials: [
            { platform: "github", url: "https://github.com/jankowalski" }
        ] // Jan nie ma LinkedIn, więc nic się nie wyświetli
    },
    { 
        id: "jan-kkowalski", 
        name: "Jan Kowalski", 
        role: "Dev", 
        img: "https://i.pravatar.cc/150?u=10",
        bio: "Koduję w nocy, śpię w dzień.",
        socials: [
            { platform: "github", url: "https://github.com/jankowalski" }
        ] // Jan nie ma LinkedIn, więc nic się nie wyświetli
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