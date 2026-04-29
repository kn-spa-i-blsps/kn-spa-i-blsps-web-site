// data.js
const members = [
    { 
        id: "jan-mikolajczyk", 
        name: "Jan Mikołajczyk", 
        role: {
    		pl: "Prezes",
    		en: "President"
		},
        customTags: [{ pl: "Prezes", en: "President" }],
        bio: {
            pl: "Nazywam się Jasiek, studiuję Lotnictwo i Kosmonautykę na Politechnice Warszawskiej oraz Fizykę na Uniwersytecie Warszawskim. W roku 2024/2025, będąc na pierwszym roku obu moich kierunków, założyłem KN SPA oraz KN BLSPS, aby móc dalej rozwijać tworzony przeze mnie od liceum projekt budowy drona arktycznego, obecnie zwany Snow’s Eye. Po utworzeniu koła, zorientowałem się, że mając w bliskim otoczeniu wielkie zasoby bardzo zdolnych studentów oraz wybitnych naukowców pracujących na uczelniach, grzechem byłoby nie skorzystać z maksimum możliwości i nie rozwinąć koła w coś więcej niż przestrzeń dla jednego projektu. Zainicjowałem więc dwa następne projekty działające obecnie w kole, Blue Spark oraz Hawk Eye. Dodatkowo zdecydowałem się poszerzyć działalność dronową, co doprowadziło nas do obecnego stanu 4 projektów. Pełnię teraz rolę lidera projektu Hawk Eye, Snow’s Eye oraz sekcji dronowej, w projekcie Blue Spark jestem elektronikiem i prezesem całego koła. Poza kołem pracuję w firmie Creotech Instruments oraz w startupie Sentinel Eagle. Biorę tam udział w projektach realizowanych między innymi dla NATO oraz Europejskiej Agencji Kosmicznej. Interesuję się robieniem rzeczy, które działają, rozwiązują problemy oraz mają wartość naukową. Staram się udowodnić, że projekty studenckie mogą mieć sens i nie muszą być odgrzewaniem starego już zbadanego tematu. Prowadziłem badania terenowe w Arktyce, mam też na koncie kilka publikacji konferencyjnych, a w przygotowaniu publikacje w czasopismach naukowych. Lubię też nurkowanie, latanie samolotem, bieganie, a najbardziej to siedzenie nad jeziorem.",
            en: "My name is Jasiek. I study Aerospace Engineering at the Warsaw University of Technology and Physics at the University of Warsaw. In the academic year 2024/2025, during my first year of studies in both programs, I founded the Student Research Groups SPA and BLSPS to further develop an Arctic drone project that I have been working on since high school, now known as Snow’s Eye. After establishing the student groups, I realized that having access to an exceptional pool of highly talented students and outstanding researchers at the universities made it a missed opportunity to limit the group’s activity to a single project. As a result, I initiated two additional projects currently developed within the group: Blue Spark and Hawk Eye. Furthermore, I decided to expand the drone-related activities, which has led to the current portfolio of four active projects. I currently serve as the project leader of Hawk Eye, Snow’s Eye, and the drone section, while in the Blue Spark project I work as electronics engineer and act as the president of the entire student research group. Outside of the student groups, I work at Creotech Instruments and at the startup Sentinel Eagle, where I participate in projects carried out, among others, for NATO and the European Space Agency. I am interested in building systems that work, solve real problems, and have genuine scientific value. I strive to demonstrate that student projects can be meaningful and do not have to rely on revisiting already well-explored topics. I have conducted field research in the Arctic, authored several conference publications, and am currently preparing journal papers. In my free time, I enjoy scuba diving, flying airplanes, running, and—most of all—spending time by a lake."
        },
        socials: [
            { platform: "github", url: "https://github.com/JasiekMikolwjczyk" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/jan-miko%C5%82ajczyk-987073358" },
            { platform: "instagram", url: "https://www.instagram.com/jasiek_mikolajczyk?igsh=MTc0ZHdiZXFsajQ5dA%3D%3D&utm_source=qr" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "jakub-balenkowski", 
        name: "Jakub Bałenkowski", 
        role: {
    		pl: "Wiceprezes",
    		en: "Vice-President"
		},
        customTags: [{ pl: "Wiceprezes", en: "Vice-President" }],
        bio: {
    		pl: "Jestem Kuba i odkąd pamiętam interesuję się naukami ścisłymi i technologią. Jeszcze będąc w III LO w Gdyni pasjonowałem się fizyką, teraz bardziej ciekawi mnie szeroko pojęta informatyka, robotyka oraz programowanie. W kole od marca 2025 zajmuję się projektem BlueSpark, którego jestem liderem. Jestem w nim odpowiedzialny za oprogramowanie i algorytmy sterowania. W ramach programu Uczelnie Przyszłości organizowanego przez NCBR opracowuję podwodny system lokalizacyjny, który ma uzupełnić obecne rozwiązania komercyjne. Pełnię również funkcję wiceprezesa KN BLSPS. Od dwóch lat staram się przelewać swoje pasje na młodszych uczniów jako korepetytor, a w wolnych chwilach studiuję Automatykę i Robotykę.  ",
    		en: "Hi, I'm Kuba. I’ve been fascinated by science and technology for as long as I can remember. Back in high school in Gdynia I was passionate about physics, but nowadays, my interests revolve around computer science, robotics, and programming. Since March 2025, I’ve been the leader of the BlueSpark project, where I handle software and control algorithms. I’m also working on an underwater localization system intended to supplement current commercial solutions as part of the NCBR’s 'Universities of the Future' program. Currently, I serve as the Vice President of the KN BLSPS Science Club and study Automation and Robotics. In my free time, I’ve spent the last two years tutoring younger students, trying to pass on my passion for science to them."
		},
        socials: [
            { platform: "github", url: "https://github.com/Spparki" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/jakub-bałenkowski-5045b0369" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "ania-gierasinska", 
        name: "Ania Gierasińska", 
        role: {
    		pl: "Marketing | Skarbniczka",
    		en: ""
		}, 
        customTags: [{ pl: "Marketing", en: "Marketing" }, { pl: "Skarbniczka", en: "Finance Manager" }],
        bio: {
    		pl: "Mam na imię Ania i od lipca 2025 jestem członkiem KN BLSPS, gdzie aktywnie działam w teamie promocji. Jestem więc odpowiedzialna za posty i materiały, jakie widzicie na naszych social mediach. Jako skarbnik koła pomagam także w działalności naszej grupy od strony marketingowej – zajmuję się materiałami promocyjnymi takimi jak ulotki, naklejki, rollupy czy bluzy. Na co dzień studiuję Energetykę na Politechnice Warszawskiej, więc tematy techniczne też nie są mi obce. Na PW jestem delegatką do Rady Koł Naukowych z ramienia KN BLSPS. Oprócz działalności w kole jestem także członkiem Wydziałowej Rady Samorządu MEiL, gdzie prężnie działam od początku studiów.",
    		en: "My name is Ania and I have been a member of our team since July 2025, where I am actively involved in the promotion team. I am responsible for the posts and materials you see on our social media. I also help with the marketing side of our group’s activities – I deal with promotional materials such as leaflets, stickers, roll-ups, and sweatshirts. I study Power Engineering at the Warsaw University of Technology, so technical topics are also familiar to me. At WUT I am a delegate to the Student Research Group Council on behalf of KN BLSPS. In addition to my activities in the research group, I am also a member of the Students’ Union Faculty Council of the MEiL, where I have been actively involved since the beginning of my studies."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "emilia-grygiel", 
        name: "Emilia Grygiel", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Emilia i jestem studentką Lotnictwa i Kosmonautyki na Politechnice Warszawskiej. Od połowy 2025 roku jestem częścią zespołu pracującego nad budową bezzałogowego statku powietrznego do misji w stratosferze. Moją rolą jest szukanie i wdrażanie zastosowań zwiększających potencjał naukowy i komercyjny naszego projektu. Zaczynałam od planowania, a następnie budowy prototypu. Teraz za jego pomocą sprawdzam w praktyce nasze pomysły, żeby mieć pewność, że będziemy mogli je wprowadzić w ostatecznej wersji drona. Swój czas spędzany poza uczelnią poświęcam na granie w planszówki ze znajomymi.",
    		en: "My name is Emilia, and I am an Aerospace Engineering student at the Warsaw University of Technology. Since mid-2025, I have been part of a team developing an unmanned aerial vehicle (UAV) designed for stratospheric missions. My role involves identifying and implementing applications that enhance the project's scientific and commercial potential. I began with the planning phase and the construction of the prototype. Now, I am using it to test our ideas in practice, ensuring they can be successfully integrated into the final version of the drone. In my free time outside of university, I enjoy playing board games with my friends."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "georgina-riu", 
        name: "Georgina Riu", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Georgina Riu i jestem studentką studiów magisterskich na kierunku inżynieria lotnicza w ISAE-SUPAERO. Należę do sekcji dronów grupy studenckiej, a konkretnie do projektu Flysearch. Odbyłam pięciomiesięczny staż w Laboratorium Napędów Odrzutowych NASA jako inżynier testowy dla projektu Chopper Mars Helicopter, gdzie zajmowałam się aerodynamiką w warunkach marsjańskich. Współpracuję również z The Spring Institute jako inżynier systemowy dla projektu SCAMPI, którego uruchomienie planowane jest w tym roku.",
    		en: "My name is Georgina Riu and I am a Master’s student in Aerospace Engineering at ISAE-SUPAERO. I am a member of the student group’s drone section, specifically the Flysearch project. I completed a five-month internship at NASA Jet Propulsion Laboratory as a test engineer for the Chopper Mars Helicopter, where I worked on aerodynamics in Martian conditions. I am also contributing to The Spring Institute as a systems engineer for the SCAMPI project, which is planned to be launched this year."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "hubert-zientara", 
        name: "Hubert Zientara", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Cześć, jestem Hubert i studiuję Informatykę na Uniwersytecie Warszawskim. Jestem absolwentem IV LO w Toruniu, klasy mat-fiz-inf. Główny projekt, którym aktualnie się zajmuję jest Flysearch - wraz z Jankiem Matusiakiem piszę oprogramowanie, które pozwoli przetestować jak popularne LLMy radzą sobie z nawigowaniem drona. Interesuje mnie kryptografia oraz bardzo ciekawi mnie działanie maszyn i oprogramowania na niskim poziomie, ale moje zainteresowania nie kończą się na tym - lubię łapać wiedzę z bardzo różnych dziedzin informatyki, matematyki czy nawet przedmiotów humanistycznych.",
    		en: "Hi, my name is Hubert and I'm studying towards a Bachelor's degree in Computer Science at the University of Warsaw. I am a graduate of IV Highschool in Toruń. The main project that I'm currently working on is Flysearch - together with Janek Matusiak I'm developing software, that allows us to test the performance of the popular LLMs in drone navigation. I'm interested in cryptography, and am really curious about how machines and software work 'under the hood', but my interests do not end right here - I like to gain the knowledge from various fields of Computer Science, Mathematics, and also the humanities."
		},
        socials: [
            { platform: "github", url: "https://github.com/Qwerty8668" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/hubert-zientara/" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "igor-rostkowski", 
        name: "Igor Rostkowski", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Igor i pochodzę z Łeby. Obecnie studiuję informatykę i matematykę na Uniwersytecie Wrocławskim, kierunki, które od zawsze były mi bliskie i w których chętnie się rozwijam. Należę do koła od września 2025 na skutek paru wypitych piw z szanownym prezesem. W ramach koła działam w zespole dronowym, gdzie zajmujemy się opracowywaniem nowych technologii i przygotowaniami do różnorodnych konkursów. Poza studiami uwielbiam podróżować, trenuję boks, a w wolnych chwilach lubię poczytać.",
    		en: "My name is Igor, and I’m from Łeba. I am currently studying Computer Science and Mathematics at the University of Wrocław, fields I've always been passionate about and in which I enjoy developing my skills. I joined our team in September 2025 after drinking a few beers with the club president. Within the club, I am part of the drone team, where we work on developing new technologies and preparing for various competitions. Outside of my studies, I love traveling, am training in boxing and in my free time I enjoy reading."
		},
        socials: [
            { platform: "github", url: "https://github.com/for5en" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/igor-rostkowski-632205386" },
            { platform: "holo-fractals", url: "https://holographic-fractal-3d-explorer.onrender.com/" }
        ]
    },
    { 
        id: "jan-matusiak", 
        name: "Jan Matusiak", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Janek i pochodzę z Gdyni. Jestem studentem kierunku Data Engineering na Politechnice Gdańskiej oraz absolwentem klasy IB w III LO w Gdyni. Jestem częścią sekcji dronowej Koła, a konkretnie projektu Flysearch, w którym aktualnie odpowiadam za pracę nad oprogramowaniem umożliwiającym testy modeli sztucznej inteligencji do nawigacji dronem. Interesuję się i kształcę w kierunku analizy danych, sztucznej inteligencji i uczenia maszynowego. Ukończyłem 3-miesięczny staż jako Intern Java Software Developer w Sii Gdańsk. Byłem również laureatem stypendium na 2-tygodniowy udział w programie naukowym o sztucznej inteligencji na Beijing Institute of Technology w Chinach.",
    		en: "My name is Janek and I come from Gdynia. I am a Data Engineering student from Gdansk University of Technology and an IB graduate from High School no. 3 in Gdynia. I am a part of the student group's drone section, specifically of the Flysearch project, where I am currently responsible for creating software for testing AI models for drone navigation. I am interested and pursue my education in data analysis, artificial intelligence and machine learning. I have completed a 3-month internship program as Intern Java Software Develop at Sii Gdansk. I have also received a scholarship for a 2-week scientific program about artificial intelligence at Beijing Institute of Technology in China."
		},
        socials: [
            { platform: "github", url: "https://github.com/JanMatusiak" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/janmatusiak" },
            { platform: "instagram", url: "https://www.instagram.com/janmatusiak2" }
        ]
    },
    { 
        id: "jan-ciecierski", 
        name: "Jan Ciecierski", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Janek, jestem studentem informatyki drugiego roku na Uniwersytecie Warszawskim, w Kole Naukowym SPA zajmuje się programowaniem, ramieniem robotycznym i drukiem 3D, w zespole tworzącym autonomicznego drona podwodnego. Od małego interesuje się programowaniem, lecz w kole zacząłem się intereseować bardziej technicznymi aspektami projektu jak np lutowanie, aktualnie pracujemy nad konkursami w Singapurze i USA, do których piszę oprogramowanie autonomiczności i pomagam w jego budowie.",
    		en: "My name is Janek, currently I am studying Computer Science at University of Warsaw. I’m also responsible for programming, robotic arm and 3D printing in Student Research Group SPA in team creating autonomous underwater drone. From an early age I was interested in programming, but in this project, I realised my interests in more technical skills. Currently we are preparing for tournaments in Singapore and USA, to which I am writing software and help with constructing."
		},
        socials: [
            { platform: "github", url: "https://github.com/JaCier8" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/jan-ciecierski/" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "julian-maleta", 
        name: "Julian Maleta", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Mam na imię Julian i jestem studentem Lotnictwa i Kosmonautyki na Politechnice Warszawskiej, a od drugiej połowy 2025 roku działam w projekcie BlueSpark. W zespole jestem członkiem sekcji mechaniczno-projektowej, gdzie zajmuję się pracą w środowiskach CAD oraz projektowaniem elementów niezbędnych do budowy drona. Zaprojektowane części przygotowuję do druku i wykonuję je na drukarkach 3D, a następnie składam całą konstrukcję w spójną całość. Ze względu na podwodne środowisko pracy drona odpowiadam za zapewnienie pełnej szczelności konstrukcji poprzez uszczelnianie elementów i sprawdzanie newralgicznych połączeń. Odpowiadam również za odpowiednie obciążenie i wyważenie drona, aby zapewnić jego stabilną i bezpieczną pracę. ",
    		en: "My name is Julian, and I am a student of Aerospace Engineering at the Warsaw University of Technology, where I have been involved in the BlueSpark project since the second half of 2025. I am a member of the mechanical and design section, where I work with CAD environments and design components necessary for building the drone. I prepare the designed parts for manufacturing, produce them using 3D printers, and then assemble the entire structure into a cohesive system. Due to the drone’s underwater operating environment, I am responsible for ensuring full structural watertightness by sealing components and checking critical joints. I am also responsible for proper weight distribution and balancing of the drone to ensure stable and safe operation."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "karol-grzegorzewski", 
        name: "Karol Grzegorzewski", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Karol i studiuję Inżynierię Mechaniczną na Uniwersytecie w Manchesterze. Od września 2025 pracuję zdalnie w kole naukowym nad projektem drona stratosferycznego, gdzie zajmuję się głównie konstrukcją nowego prototypu. Na co dzień pasjonuję się różnymi dziedzinami inżynierii, w szczególności projektowaniem CAD oraz mechaniką. Swoją przyszłość zawodową planuję ściśle związać z inżynierią. Dodatkowo odbyłem staż wakacyjny w dziale designu firmy Sii oraz działam w zespole odpowiedzialnym za napęd w projekcie inicjatywy Hyperloop.",
    		en: "My name is Karol and I am studying Mechanical Engineering at the University of Manchester. Since September 2025, I have been working remotely in the student research group on a stratospheric drone project, where I am mainly involved in the design and construction of the new prototype. I am passionate about many fields of engineering, especially CAD design and mechanics. I plan to pursue my future career in engineering. Additionally, I completed a summer internship in the design department at Sii and I am a member of the propulsion team in a Hyperloop initiative project."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "maciej-domagalski", 
        name: "Maciej Domagalski", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Maciek i jestem studentem kierunku Energetyka na Politechnice Warszawskiej. Od lat pasjonuje mnie konstruowanie, modelowanie i tworzenie różnych projektów łączących elektronikę, automatykę oraz mechanikę. W kole działam przy projekcie Hawk Eye, w zespole konstrukcyjnym. Projektowanie i budowa drona stratosferycznego bez wątpienia jest dla mnie możliwością do realizacji pasji oraz rozwijania się w kierunku zawodowym. Oprócz tego moją pasją jest sport, w szczególności piłka nożna, w którą grałem na najwyższym szczeblu rozgrywkowym przez przeszło 12 lat.",
    		en: "I am Maciek and I am a Power Engineering student at Warsaw University of Technology. For years, I have been passionate about designing, modeling, and creating projects that integrate electronics, automation, and mechanics. Within the 'Hawk Eye' project, I am a member of the construction team. Designing and building a stratospheric drone provides me with a unique opportunity to pursue my passions while developing my professional career. Beyond engineering, I am a sports enthusiast, particularly football, which I played at the highest competitive level for over 12 years."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "maciej-borowiecki", 
        name: "Maciej Borowiecki", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Maciek i studiuję informatykę na Uniwersytecie Warszawskim. Robotyka ciekawi mnie od dziecka, a na studiach zainteresowałem się na programowaniem niskopoziomowym i drukiem 3D. Działam w kole naukowym KN SPA przy projekcie autonomicznego drona podwodnego BlueSpark, gdzie pracowałem zarówno przy jego technicznych aspektach, jak i oprogramowaniu. Zaczynałem od projektowania pierwszych prototypów robota, a teraz kieruję rozwojem i optymalizacją wizji komputerowej i programuję sterowanie. W wolnym czasie lubię pływać, a przy okazji dłuższego wypoczynku uwielbiam chodzić po górach.",
    		en: "My name is Maciek, and I study Computer Science at the University of Warsaw. I have been interested in robotics since childhood, and during my studies, I got into low-level programming and 3D printing. I am an active member of the KN SPA, working on the BlueSpark autonomous underwater drone project. My work there covers both hardware and software. I started by designing the first robot prototypes, and now I lead the development of computer vision and program the control systems. In my free time, I like swimming, and for longer breaks, I love hiking in the mountains."
		},
        socials: [
            { platform: "github", url: "https://github.com/MaciejBorowiecki" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/maciej-borowiecki1/" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "maksymilian-bernacki", 
        name: "Maksymilian Bernacki", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Maks i jestem studentem Energetyki na Politechnice Warszawskiej. Od października 2025 roku jestem członkiem zespołu BlueSpark. Projekt ten jest mi szczególnie bliski, ponieważ łączy zaawansowane technologie z moimi zainteresowaniami związanymi ze środowiskiem wodnym. Moim obszarem zainteresowań są zagadnienia związane z hydrosferą i technologiami morskimi. Oprócz tego pasjonuję się żeglarstwem, sportami wodnymi oraz budową i projektowaniem jachtów morskich, co pozwala mi patrzeć na inżynierię nie tylko teoretycznie, ale również przez pryzmat praktycznych zastosowań na wodzie.",
    		en: "My name is Maks and I am a Power Engineering student at the Warsaw University of Technology. I have been a member of the BlueSpark team since October 2025. This project is particularly close to me because it combines advanced technologies with my interests related to the aquatic environment. My main areas of interest include the hydrosphere and marine technologies. In addition, I am passionate about sailing, water sports, and the design and construction of seagoing yachts, which allows me to approach engineering not only from a theoretical perspective but also through practical, real-world applications on the water."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "marcel-kolecki", 
        name: "Marcel Kolecki", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Marcel i jestem studentem kierunku Lotnictwo i Kosmonautyka na Politechnice Warszawskiej. Jestem inicjatorem projektu BlueSpark – wielorobotycznego systemu autonomicznych pojazdów podwodnych – oraz kierownikiem jego sekcji mechaniczno-projektowej. W ramach projektu odpowiadam za koncepcję systemu, integrację sensorów, architekturę sprzętowo-programową oraz zagadnienia inżynierskie i organizacyjne. Moje zainteresowania obejmują robotykę, akustykę podwodną, mechanikę oraz projektowanie inżynierskie. Jestem finalistą programu „Uczelnie Przyszłości” organizowanego przez NCBiR. Konsekwentnie rozwijam się w kierunku kariery inżyniera, łącząc solidne podstawy teoretyczne z praktycznym projektowaniem i prototypowaniem systemów. ",
    		en: "My name is Marcel, and I am a student of Aerospace Engineering at the Warsaw University of Technology. I am the initiator of the BlueSpark project — a multi-robot system of autonomous underwater vehicles — and the head of its mechanical and design section. Within the project, I am responsible for system-level concept development, sensor integration, hardware–software architecture, as well as engineering and organizational aspects. My interests include robotics, underwater acoustics, mechanics, and engineering design. I am a finalist of the “Universities of the Future” program organized by the National Centre for Research and Development (NCBR). I consistently pursue a career as an engineer by combining strong theoretical foundations with hands-on system design and prototyping."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "maria-ancerowicz", 
        name: "Maria Ancerowicz", 
        role: {
    		pl: "Marketing",
    		en: "Marketing"
		}, 
        customTags: [{ pl: "Marketing", en: "Marketing" }],
        bio: {
    		pl: "Hej, jestem Maria. W kole działam od grudnia i zajmuję się marketingiem, promocją oraz budowaniem wizerunku. Interesuję się rynkami finansowymi, ekonomią i tym, jak biznes funkcjonuje w praktyce. W wolnych chwilach spędzam czas na siłowni i czytam książki psychologiczne. Obecnie studiuję Zarządzanie oraz Finanse Biznesu i Rachunkowość na Uniwersytecie Warszawskim i aktywnie działam także w innych kołach naukowych.",
    		en: "Hi, I’m Maria. I am a member of KN SPA since December, focusing on marketing, promotion, and building the organization’s image. I’m interested in financial markets, economics, and how businesses operate in practice. In my free time, I enjoy going to the gym and reading psychology books. I am currently studying Management and Business Finance and Accounting at the University of Warsaw and also actively participate in other student associations."
		},
        socials: [
            //{ platform: "github", url: "#" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/maria-ancerowicz-323847392/" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "stanislaw-kropiewnicki", 
        name: "Stanisław Kropiewnicki", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Jestem Stanisław i studiuję Energetykę na Politechnice Warszawskiej. Uczestniczę w projekcie HawkEye. Jestem w zespole zajmującym się częścią projektowo-konstrukcyjną naszego projektu. W zespole opracowuje rozwiązania techniczne wymagane do budowy drona stratosferycznego, a także szukam dla niego potencjalnych zastosowań komercyjnych. W wolnym czasie, poza uczestnictwem w projekcie, zajmuje się programowaniem i automatyzacją. Zainteresowania te umożliwiły mi stworzenie autorskiego komercyjnego rozwiązania do usprawnienia pracy systemów automatyki. Oprócz tego uprawiam sport, głownie jeżdżę na rowerze i chodzę na siłownię. Jestem byłym członkiem kadry narodowej w Judo, w którym mam czarny pas.",
    		en: "My name is Stanisław, and I study Power Engineering at Warsaw University of Technology. I take part in the HawkEye project, where I work in the team responsible for the design and structural aspects of our project. I develop the technical solutions needed to build a stratospheric drone and look for potential commercial applications for it. In my free time, aside from participating in the project, I focus on programming and automation, which have enabled me to create my own commercial solution designed to improve the operation of automation systems. I’m also active in sports—mainly cycling and going to the gym—and I’m a former member of the national judo team with a black belt in judo."
		},
        socials: [
            { platform: "github", url: "https://github.com/stachulskiii" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/stanislaw-kropiewnicki/" },
            { platform: "instagram", url: "https://www.instagram.com/stachuzdachu/" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "stanislaw-swiecki", 
        name: "Stanisław Świecki", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Jestem studentem kierunku Lotnictwo i Kosmonautyka na Politechnice Warszawskiej. Fascynuje mnie odkrywanie nieznanego oraz łamanie granic. Jestem członkiem koła, zespołu konstrukcyjnego zajmującego się pracą nad bezzałogowym statkiem powietrznym przystosowanym do lotu w stratosferze. Udział w tym projekcie pozwala mi rozwijać moje zainteresowania w obszarze lotnictwa i kosmonautyki, łącząc teorię z wyzwaniami praktycznymi. Moją przyszłość będę kształtował ciężką pracą, odwagą i swoim talentem.",
    		en: "I am a student of Aerospace Engineering at the Warsaw University of Technology. I am fascinated by exploring the unknown and pushing boundaries. I am a member of a student design team working on an unmanned aerial vehicle (UAV) designed for stratospheric flight. Participating in this project allows me to develop my passion for aviation and space exploration by bridging the gap between theory and practical challenges. I intend to shape my future through hard work, courage, and talent. I am a student of Aerospace Engineering at Warsaw University of Technology. I am driven by a passion for discovery and breaking limits. I am part of a construction team focused on developing a stratospheric UAV (Unmanned Aerial Vehicle)."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "szymon-skierski", 
        name: "Szymon Skierski", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Mam na imię Szymon i jestem studnetem Informatyki na Uniwersytecie Warszawskim. Od początku listopada 2025 razem z zespołem dronowym pracujemy nad projektem na konkurs ICUAS 2026. Zajmuję się głównie programowaniem , optymalizowaniem i implementowaniem algorytmów zachowań drona w Pythonie. Interesuję się szczególnie matematyką, programowaniem i sztuczną inteligencją. Działalność w kole naukowym urozmaica mój wolny czas, pozwala rozwijać umiejętności programistyczne i uczyć się praktycznej pracy z dronami.",
    		en: "My name is Szymon and I’m a Computer Science student at the University of Warsaw. Since the beginning of November 2025, I’ve been working with my drone team on a project for the ICUAS 2026 competition. I mainly focus on programming, optimizing, and implementing drone behaviour algorithms in Python. I’m especially interested in mathematics, programming, and artificial intelligence. Being part of this student research group makes my free time more enjoyable, helps me improve my programming skills, and teaches me practical experience working with drones."
		},
        socials: [
            { platform: "github", url: "https://github.com/sudogie3" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/szymon-skierski-824043399/" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "radek-palys", 
        name: "Radek Pałys", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Radek i jestem z Wrocławia. Studiuję Informatykę Stosowaną na Politechnice Wrocławskiej. W kole naukowym należę do zespołu dronowego, w którym pracujemy nad konkursem ICUAS. Zajmuję się głównie programowaniem oraz algorytmami.",
    		en: "I'm Radek and i'm from Wroclaw. I study Applied Computer Science at Wroclaw University of Science and Technology. I'm member of the drone team, where we work on ICUAS competition. I'm mainly responsible for coding and algorithms."
		},
        socials: [
            //{ platform: "github", url: "#" },
			//{ platform: "linkedin", url: "#" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "marcin-misiewicz", 
        name: "Marcin Misiewicz", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "Nazywam się Marcin i studiuję informatykę na Politechnice Warszawskiej. W kole naukowym jestem członkiem zespołu dronowego, w którym biorę udział w pracach nad projektem MUSC. Udział w projekcie pozwala mi na rozwijanie praktycznych umiejętności, które w przyszłości wykorzystam w roli Data/ML Engineera. Poza tym pasjonuję się rynkiem finansowym i światem kryptowalut.",
    		en: "My name is Marcin and I study Computer Science at the Warsaw University of Technology. In the student science club, I am a member of the drone team, where I participate in the MUSC project. Taking part in this project allows me to develop practical skills that I will use in the future as a Data/ML Engineer. Additionally, I am passionate about financial markets, including cryptocurrencies."
		},
        socials: [
            { platform: "github", url: "https://github.com/MarcinMisiewiczz" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/marcin-misiewicz-20758a3b0/" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "wojciech-rybak", 
        name: "Wojciech Rybak", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "",
    		en: ""
		},
        socials: [
            { platform: "github", url: "https://github.com/rybakwojciech589" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/wojciech-rybak--/" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "mikolaj-sczogiel", 
        name: "Mikołaj Sczogiel", 
        role: {
    		pl: "Inżynier | Programista",
    		en: "Engineer | Developer"
		}, 
        bio: {
    		pl: "",
            en: "",
        },
        socials: [
            { platform: "github", url: "https://github.com/MikolajSczogiel" },
			{ platform: "linkedin", url: "https://www.linkedin.com/in/msczogiel/" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
    { 
        id: "izabela-grodek", 
        name: "Izabela Gródek", 
        role: {
    		pl: "Marketing",
    		en: "Marketing"
		},
        customTags: [{ pl: "Marketing", en: "Marketing" }],
        bio: {
    		pl: `Hej, jestem Iza. Studiuję Zarządzanie na Uniwersytecie Warszawskim. W swoich działaniach stawiam na pro aktywność i otwartość na nowe wyzwania. Interesuję się tym, jak biznes funkcjonuje w skali globalnej oraz jak różne kultury wpływają na sposób pracy w zespole. Moją wielką pasją jest Formuła 1 – uwielbiam w niej połączenie strategii, technologii i szybkości podejmowania decyzji. W wolnych chwilach zajmuję się fotografią, która uczy mnie uważności i kreatywnego spojrzenia na świat.`,
            en: `Hi, I’m Iza. I’m a Management student at the University of Warsaw. In everything I do, I focus on being proactive and open to new challenges. I’m interested in how business operates on a global scale and how different cultures influence teamwork. My biggest passion is Formula 1 – I love the mix of strategy, technology, and split-second decision-making. In my free time, I’m into photography, which teaches me to stay observant and keep a creative perspective on the world.`,
        },
        socials: [
            //{ platform: "github", url: "https://github.com/MikolajSczogiel" },
			//{ platform: "linkedin", url: "https://www.linkedin.com/in/msczogiel/" },
            //{ platform: "instagram", url: "#" },
            //{ platform: "website", url: "#" }
        ]
    },
];

// data.js - dodajemy bazę projektów
// data.js
const projects = [
    {
        id: "musc",
        title: "MUSC",
        fullTitle: "Modular UAV Swarm Control System with Machine Learning Methods",
        ordering: 1,
        shortDesc: {
    		pl: "Projekt MUSC ma na celu opracowanie systemu sterowania autonomicznym rojem dronów opartego na wizji i komunikacji świetlnej, co zapewnia pełną odporność na jamming oraz zakłócanie sygnałów radiowych.",
    		en: "The MUSC project aims to develop an autonomous drone swarm control system based on vision and light communication, ensuring full resilience to jamming and RF interference."
		},
        fullDesc: {
    		pl: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    MUSC
                 </span>
                 <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                 to projekt którego celem jest opracowanie systemu w którym każdy UAV wyposażony jest we własne czujniki oraz system sterowania, oraz jest w stanie współpracować z innymi jednostkami przy zachowaniu jedynie minimalnej wymiany informacji. System umożliwia skoordynowaną współpracę roju bez zastosowania centralnej jednostki, każdy dron operuje autonomicznie, a zachowania całego roju wyłania się z zasad koordynacji i strategii sterowania. Takie podejście wspiera skalowalność i nie jest uzależnione od komunikacji radiowej.<br><br>
                 <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Autonomia:
                </span><br>
                 Każdy dron ocenia relatywną pozycje za pomocą wizji na bliskim dystansie, a na większych odległościach oblicza ją za pomocą triangulacji, dzięki takiemu podejściu UAV nie musi polegać na stałym dostępie do zewnętrznej infrastruktury określającej położenie. Decyzje mogą być podejmowana na poziomie lokalnym, a cały system jest w stanie funkcjonować podczas wszelkiego rodzaju zakłóceń sygnału. Komunikacja pomiędzy jednostkami może być wykorzystywana aby poprawić funkcjonowanie roju, ale nie jest wymagana.<br><br>
                 <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Skalowalność i modułowość:
                 </span><br>
                 Konstrukcja używa architektury modułowej co pozwala na wymianę czujników oraz elementów sterujących bez modyfikowania całego systemu.<br><br>
                 <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Uczenie maszynowe:
                 </span><br>
                 Algorytmy sterowania rojem wykorzystują sieci neuronowe oraz uczenie maszynowe. Są one stosowane jako dopełnienie systemu kontroli, obsługując złożone oraz niepewne interakcje podczas gdy za bezpieczeństwo odpowiadają deterministyczne metody.`,
    		en: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    MUSC
                </span>
                <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                is a project aimed at developing a system in which each UAV is equipped with its own sensors and control system, capable of collaborating with other units while maintaining only minimal information exchange. The system enables coordinated swarm cooperation without a central unit; each drone operates autonomously, and the behavior of the entire swarm emerges from coordination rules and control strategies. This approach supports scalability and is not dependent on radio communication.<br><br>
                <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Autonomy:
                </span><br>
                Each drone evaluates its relative position using vision at close range and calculates it via triangulation at greater distances. Thanks to this approach, the UAV does not need to rely on constant access to external positioning infrastructure. Decisions can be made at the local level, and the entire system is capable of functioning during various types of signal interference. Communication between units can be utilized to improve swarm performance, but it is not required.<br><br>
                <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Scalability and Modularity:
                </span><br>
                The design utilizes a modular architecture, which allows for the replacement of sensors and control components without modifying the entire system.<br><br>
                <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Machine Learning:
                </span><br>
                Swarm control algorithms utilize neural networks and machine learning. These are applied to complement the control system, handling complex and uncertain interactions, while deterministic methods ensure safety.
                `
		},
        teamIds: ["jan-mikolajczyk", "igor-rostkowski", "szymon-skierski", "radek-palys", "marcin-misiewicz", "wojciech-rybak", "mikolaj-sczogiel"],
        spec: [
            //{ label: { pl: "Silnik AI", en: "AI Engine" }, value: { pl: "YOLOv8 Nano", en: "YOLOv8 Nano" } },
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
        shortDesc: {
    		pl: "Projekt badawczo-rozwojowy budujący API do komunikacji UAV z modelami VLM. System przesyła obraz i telemetrię do analizy w czasie rzeczywistym, działając w pętli „percepcja → decyzja → ruch”.",
            en: "An R&D project developing an API for UAV-to-VLM communication. It enables drones to stream imagery and telemetry for real-time scene interpretation and autonomous mission guidance."
        },
        fullDesc: {
    		pl: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Flysearch
                 </span>
                 <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                 to projekt badawczo-rozwojowy, którego celem jest zaprojektowanie i stworzenie API umożliwiającego komunikację między platformą UAV a serwerem z modelem Vision-Language Model (VLM). Dron zbiera dane z czujników (obraz z kamery oraz telemetrię z autopilota), a następnie przekazuje je do warstwy analitycznej, gdzie VLM interpretuje scenę i cel misji, generując rekomendacje dotyczące kierunku lotu. Całość działa w pętli „percepcja → decyzja → ruch”, a jednocześnie rejestruje dane i wyniki w sposób umożliwiający późniejszą analizę i poprawę algorytmów.<br><br>
                 System jest konteneryzowany i przygotowany pod szybkie wdrożenia oraz testy terenowe — od Raspberry Pi na pokładzie drona po serwerową warstwę przetwarzania.<br><br>
                 
                 <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Co rozwijamy w ramach projektu:
                 </span><br>
                 <li>Warstwę zbierania danych na pokładzie (Raspberry Pi 5, kamera, telemetria Pixhawk) oraz walidację i ujednolicenie formatów danych (JSON, logowanie zdarzeń).</li>
                 <li>API dron ↔ serwer do wymiany ramek, telemetrii i komend.</li>
                 <li>DevOps i niezawodność: Docker/Compose, CI/CD (GitHub Actions), testy integracyjne, stabilność połączeń (np. tunelowanie zdalnego dostępu), iteracyjne testy w terenie.</li><br>
                 
                 Projekt jest świetnym polem do pracy dla osób zainteresowanych AI/ML, backendem, systemami wbudowanymi, robotyką i DevOps — od rozwoju API i infrastruktury, przez integrację sensorów, po projektowanie metryk jakości nawigacji i eksperymenty z VLM w realnych warunkach.<br><br>

                 <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Co dalej?
                 </span><br>
                 Kolejnym etapem będzie rozwinięcie FlySearch w kierunku w pełni zintegrowanego demonstratora autonomicznej eksploracji w warunkach „infrastructure-denied” (bez GNSS, internetu i sieci komórkowych), łączącego wnioskowanie VLM z nawigacją opartą o SLAM. Równolegle planowane jest wdrożenie analizy zebranych danych operatej na sztucznej inteligencji do wykrywania i interpretacji „interesujących znalezisk” i planowania misji, a także rozwój niezawodnej komunikacji w warunkach przerywanego łącza — z naciskiem na łączność optyczną jako preferowany kanał oraz mechanizmy utrzymania połączenia. Całość ma pozostać modułowa i skalowalna, a efektem ma być system zweryfikowany w testach laboratoryjnych i terenowych, docelowo na poziomie TRL 6.
            `,
    		en: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Flysearch
                </span>
                <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                is a research and development project aimed at designing and creating an API that enables communication between a UAV platform and a server hosting a Vision-Language Model (VLM). The drone collects sensor data (camera imagery and autopilot telemetry) and transmits it to an analytical layer, where the VLM interprets the scene and mission objectives to generate flight direction recommendations. The entire system operates in a "perception → decision → movement" loop, while simultaneously recording data and results to allow for subsequent analysis and algorithm improvement.<br><br>
                The system is containerized and prepared for rapid deployment and field testing — from the onboard Raspberry Pi to the server-side processing layer.<br><br>

                <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    What we are developing within the project:
                </span><br>
                <li>Onboard data collection layer (Raspberry Pi 5, camera, Pixhawk telemetry) along with validation and standardization of data formats (JSON, event logging).</li>
                <li>Drone ↔ Server API for the exchange of frames, telemetry, and commands.</li>
                <li>DevOps and reliability: Docker/Compose, CI/CD (GitHub Actions), integration testing, connection stability (e.g., remote access tunneling), and iterative field tests.</li><br>

                The project is an excellent field of work for those interested in AI/ML, backend, embedded systems, robotics, and DevOps — from API and infrastructure development, through sensor integration, to designing navigation quality metrics and VLM experiments in real-world conditions.<br><br>

                <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    What’s next?
                </span><br>
                The next stage will be evolving FlySearch into a fully integrated demonstrator for autonomous exploration in "infrastructure-denied" environments (no GNSS, internet, or cellular networks), combining VLM reasoning with SLAM-based navigation. In parallel, we plan to implement AI-driven analysis of collected data to detect and interpret "points of interest" and for mission planning, as well as the development of reliable communication in intermittent link conditions — with an emphasis on optical communication as the preferred channel and connection maintenance mechanisms. The entire system is to remain modular and scalable, with the goal of a system verified in laboratory and field tests, ultimately reaching TRL 6.`
		},
        teamIds: ["jan-mikolajczyk", "hubert-zientara", "jan-matusiak", "georgina-riu"],
        spec: [
            //{ label: { pl: "Silnik AI", en: "AI Engine" }, value: { pl: "YOLOv8 Nano", en: "YOLOv8 Nano" } },
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
        shortDesc: {
            pl: "Skalowalny system roju podwodnych robotów klasy AUV do autonomicznego mapowania dna i inspekcji infrastruktury. Jednostki wykonują równoległe misje bez udziału operatora i statku-matki.",
            en: "A scalable AUV swarm system for autonomous seabed mapping and infrastructure inspection. Independent units perform parallel missions without an operator or mother ship."
        },
        fullDesc: {
    		pl: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Bluespark
                 </span>
                 <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                 to innowacyjny, skalowalny system wielorobotyczny klasy AUV (Autonomous Underwater Vehicles), przeznaczony do autonomicznego mapowania dna morskiego, inspekcji infrastruktury podwodnej oraz gromadzenia danych środowiskowych. System działa w oparciu o niewielkie, w pełni autonomiczne jednostki, które współpracują ze sobą w roju i wykonują równoległe misje pomiarowe bez udziału operatora i bez statku-matki.<br><br>
                 W odróżnieniu od standardów rynkowych, bazujących na ROV sterowanych kablem, BlueSpark funkcjonuje w modelu „deploy and forget”: użytkownik wyznacza obszar misji, a system autonomicznie planuje trasy, zbiera dane i rotuje jednostki między pracą a ładowaniem.<br><br>
                 Odbiorcami rozwiązania są operatorzy offshore, firmy hydrograficzne, instytuty badawcze i sektor wydobywczy, dla których kluczowe są: redukcja kosztów, skrócenie czasu misji, odporność na pogodę oraz zwiększenie bezpieczeństwa prac.<br><br>
                 BlueSpark jest produktem z kategorii podwodnych systemów pomiarowo-inspekcyjnych nowej generacji, opartym na roju autonomicznych jednostek AUV. Każdy robot realizuje indywidualną trasę zadań, zbierając dane batymetryczne (single-beam/side-scan lub MBES w wersjach rozszerzonych), obrazowanie wizyjne (kamerami niskiej iluminacji), dane fizykochemiczne (pH, zasolenie, temperatura, tlen, mętność) oraz dane magnetyczne i akustyczne`,
    		en: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Bluespark
                </span>
                <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                is an innovative, scalable multi-robot system of the AUV (Autonomous Underwater Vehicles) class, designed for autonomous seabed mapping, underwater infrastructure inspection, and environmental data collection. The system operates based on small, fully autonomous units that collaborate in a swarm to perform parallel measurement missions without operator intervention and without a mother ship.<br><br>
                Unlike market standards based on cable-controlled ROVs, BlueSpark operates on a "deploy and forget" model: the user defines the mission area, and the system autonomously plans routes, collects data, and rotates units between work and charging.<br><br>
                The recipients of this solution include offshore operators, hydrographic companies, research institutes, and the mining sector, for whom key factors include: cost reduction, shorter mission times, weather resistance, and increased operational safety.<br><br>
                BlueSpark is a product in the category of next-generation underwater measurement and inspection systems, based on a swarm of autonomous AUV units. Each robot follows an individual task route, collecting bathymetric data (single-beam/side-scan or MBES in extended versions), visual imaging (using low-light cameras), physicochemical data (pH, salinity, temperature, oxygen, turbidity), as well as magnetic and acoustic data.
                `
		},
        teamIds: ["jan-mikolajczyk", "jakub-balenkowski", "jan-ciecierski", "julian-maleta", "maciej-borowiecki", "maksymilian-bernacki", "marcel-kolecki"],
        spec: [
            //{ label: { pl: "Silnik AI", en: "AI Engine" }, value: { pl: "YOLOv8 Nano", en: "YOLOv8 Nano" } },
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
        shortDesc: {
            pl: "Platforma badawcza klasy HAPS przeznaczona do misji na pułapie 20–25 km. System wynoszony balonem realizuje w pełni autonomiczny lot powrotny, prowadząc ciągłe pomiary w ekstremalnych warunkach stratosferycznych.",
            en: "A HAPS-class research platform designed for missions at altitudes of 20–25 km. Balloon-launched and capable of autonomous return flight, it conducts continuous environmental monitoring in extreme conditions."
        },
        fullDesc: {
    		pl: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Hawk Eye
                 </span>
                 <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                 Projektowany dron stratosferyczny to innowacyjna platforma badawcza klasy HAPS (High Altitude Pseudo-Satellite), przeznaczona do wykonywania misji w ekstremalnych warunkach stratosfery na pułapie operacyjnym od 20 do 25 kilometrów. System jest wynoszony za pomocą balonu, a po osiągnięciu docelowej wysokości i odłączeniu, realizuje w pełni autonomiczny lot powrotny, prowadząc ciągłe pomiary parametrów środowiskowych bez uzależnienia od zewnętrznych systemów kontroli.<br><br>
                 W odróżnieniu od obecnych standardów rynkowych, bazujących na jednorazowych radiosondach balonowych podatnych na dryf z wiatrem, dron funkcjonuje jako w pełni sterowalna platforma wielokrotnego użytku. Użytkownik zyskuje możliwość zbierania danych wzdłuż ściśle określonej trasy, co drastycznie obniża koszty jednostkowe prowadzenia pomiarów.<br><br>
                 Odbiorcami rozwiązania są państwowe instytucje naukowe i ratownicze, a także sektor technologii kosmicznych. Dla użytkowników kluczowe są: znaczna optymalizacja kosztów badań, możliwość precyzyjnego rejestrowania zjawisk dynamicznych dzięki zachowaniu ciągłości monitoringu, odporność na ekstremalne temperatury spadające do -70 °C oraz elastyczność w doborze pułapu do konkretnego zadania.<br><br>
                 Dron stratosferyczny jest produktem z kategorii zaawansowanych bezzałogowych platform badawczych nowej generacji. W zależności od charakteru misji, jednostka zbiera precyzyjne dane do profilu atmosfery (temperatura, ciśnienie, wilgotność, prędkość i kierunek wiatru), bada dynamikę warstwy ozonowej, może prowadzić obserwacje wizyjne z niższych wysokości (np. inspekcja granic, lasów czy stref katastrof), a także służyć jako latające laboratorium do testowania modułów nadawczych standardów ADS-L oraz ADS-B.`,
    		en: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Hawk Eye
                </span>
                <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                The designed stratospheric drone is an innovative HAPS (High Altitude Pseudo-Satellite) class research platform, intended for missions in extreme stratospheric conditions at an operational altitude of 20 to 25 kilometers. The system is lifted by a balloon, and upon reaching the target altitude and decoupling, it performs a fully autonomous return flight, conducting continuous environmental parameter measurements without dependence on external control systems.<br><br>
                Unlike current market standards based on disposable weather balloons prone to wind drift, the drone functions as a fully controllable, reusable platform. The user gains the ability to collect data along a strictly defined route, which drastically reduces the unit costs of conducting measurements.<br><br>
                The primary recipients of this solution include state scientific and rescue institutions, as well as the space technology sector. Key advantages for users include: significant optimization of research costs, the ability to precisely record dynamic phenomena thanks to continuous monitoring, resistance to extreme temperatures dropping to -70 °C, and flexibility in choosing the altitude for a specific task.<br><br>
                The stratospheric drone is a product within the category of advanced next-generation unmanned research platforms. Depending on the mission profile, the unit collects precise atmospheric profile data (temperature, pressure, humidity, wind speed and direction), studies ozone layer dynamics, can conduct visual observations from lower altitudes (e.g., border inspection, forests, or disaster zones), and serves as a flying laboratory for testing ADS-L and ADS-B standard transmission modules.`
		},
        teamIds: ["jan-mikolajczyk", "emilia-grygiel", "karol-grzegorzewski", "maciej-domagalski", "stanislaw-kropiewnicki", "stanislaw-swiecki"],
        spec: [
            //{ label: { pl: "Silnik AI", en: "AI Engine" }, value: { pl: "YOLOv8 Nano", en: "YOLOv8 Nano" } },
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
        shortDesc: {
            pl: "Autonomiczna platforma UAV do operacji polarnych w warunkach braku GNSS. Wykorzystuje wielowarstwową lokalizację (VIO/SLAM, UWB), zapewniając nawigację i bezpieczny powrót w skrajnie trudnych warunkach pogodowych i elektromagnetycznych.",
            en: "An autonomous UAV platform for polar operations in GNSS-denied environments. It features multi-layered localization (VIO/SLAM, UWB) to ensure navigation and safe return despite extreme weather and electromagnetic interference."
        },
        fullDesc: {
    		pl: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Snow’s Eye
                 </span>
                 <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                 to autonomiczna platforma UAV zaprojektowana do operacji w warunkach polarnych i środowiskach o ograniczonej dostępności GNSS. Regiony polarne należą do najbardziej wymagających obszarów dla systemów bezzałogowych ze względu na zakłócenia elektromagnetyczne, niskie temperatury, silne wiatry oraz brak infrastruktury wsparcia. Snow’s Eye odpowiada na te wyzwania poprzez wielowarstwową architekturę lokalizacji, łączącą GNSS, VIO/SLAM oraz system awaryjny oparty na UWB, umożliwiający bezpieczny powrót do punktu startowego w warunkach degradacji nawigacji lub łączności.<br><br>
                 <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    ARCHITEKTURA:
                 </span><br>
                 Platforma została zoptymalizowana pod kątem autonomicznych misji niskiego pułapu z wykorzystaniem precyzyjnych dalmierzy i algorytmów kontroli lotu, co pozwala na stabilne operacje pomiarowe w trudnym terenie. Zintegrowany system planowania misji redukuje obciążenie operatora i umożliwia powtarzalne kampanie badawcze. Architektura systemu jest platformowo-agnostyczna, co pozwala na integrację z różnymi klasami UAV i dostosowanie konfiguracji do konkretnych zadań naukowych.<br><br>
                 <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    REALIZACJA:
                 </span><br>
                 Wybrane podsystemy zostały zweryfikowane podczas kampanii terenowej na Svalbardzie w 2025 roku, gdzie oceniano działanie systemu w warunkach arktycznych. Jako demonstrację możliwości przeprowadzono m.in. pomiary parametrów pokrywy śnieżnej, w tym estymację SWE, traktowaną jako przykład integracji specjalistycznego ładunku badawczego z uniwersalną platformą autonomiczną.
            `,
    		en: `<span class="text-3xl font-extrabold tracking-tight text-slate-800 uppercase">
                    Snow’s Eye
                </span>
                <div class="h-1 w-full bg-[#038DAE] rounded-full my-6"></div>
                is an autonomous UAV platform designed for operations in polar conditions and GNSS-denied environments. Polar regions are among the most demanding areas for unmanned systems due to electromagnetic interference, low temperatures, strong winds, and a lack of support infrastructure. Snow’s Eye addresses these challenges through a multi-layered localization architecture, combining GNSS, VIO/SLAM, and a UWB-based emergency system, enabling a safe return to the launch point in conditions of degraded navigation or connectivity.<br><br>
                <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    ARCHITECTURE:
                </span><br>
                The platform has been optimized for low-altitude autonomous missions using precision rangefinders and flight control algorithms, allowing for stable measurement operations in difficult terrain. An integrated mission planning system reduces operator workload and enables repeatable research campaigns. The system architecture is platform-agnostic, allowing for integration with various UAV classes and adaptation of the configuration to specific scientific tasks.<br><br>
                <span class="text-xl font-extrabold tracking-tight text-slate-800 uppercase">
                    IMPLEMENTATION:
                </span><br>
                Selected subsystems were verified during a field campaign in Svalbard in 2025, where the system's performance in Arctic conditions was evaluated. As a demonstration of its capabilities, measurements of snow cover parameters were conducted, including SWE estimation, treated as an example of integrating specialized research payload with a universal autonomous platform.
            `
		},
        teamIds: ["jan-mikolajczyk", "hubert-zientara"],
        spec: [
            //{ label: { pl: "Silnik AI", en: "AI Engine" }, value: { pl: "YOLOv8 Nano", en: "YOLOv8 Nano" } },
        ]
    }
];


const news = [
    {
        id: `drone-world-expo-2026`,
        date: `2026-03-03`,
        title: {
            pl: `Relacja z DroneWorld Expo 2026`,
            en: `DroneWorld Expo 2026 Report`
        },
        shortDesc: {
            pl: `Drone World Expo 2026 było okazją do zaprezentowania projektów rozwijanych w naszym kole naukowym. Wydarzenie zgromadziło przedstawicieli branży technologii bezzałogowych z całego świata. Spotkania i rozmowy podczas targów pozwoliły na nawiązanie nowych kontaktów oraz poznanie najnowszych rozwiązań technologicznych.`,
            en: `Drone World Expo 2026 provided an opportunity to present the projects developed within our student scientific club. The event brought together representatives of the unmanned technologies industry from around the world. Meetings and discussions held during the expo enabled us to establish new connections and explore the latest technological solutions in the field.`
        },
        fullDesc: {
            pl: `W marcu 2026 roku nasze Koło Naukowe uczestniczyło w Drone World Expo – jednym z ważniejszych wydarzeń poświęconych technologiom bezzałogowych systemów powietrznych oraz rozwojowi systemów autonomicznych. Wydarzenie zgromadziło firmy technologiczne, instytucje badawcze oraz zespoły projektowe zajmujące się tworzeniem nowoczesnych rozwiązań w obszarze dronów i technologii UAV.
        Podczas targów prezentowaliśmy projekty rozwijane w naszym kole, przedstawiając rezultaty pracy naszych zespołów oraz kierunki badań, nad którymi obecnie pracujemy. Była to także okazja do bezpośrednich rozmów z przedstawicielami branży technologicznej, naukowcami oraz innymi zespołami badawczymi zainteresowanymi rozwojem systemów bezzałogowych.
        Udział w wydarzeniu pozwolił nam zapoznać się z najnowszymi trendami w technologii UAV, w tym z nowymi rozwiązaniami sprzętowymi, systemami sensorów oraz innowacyjnymi podejściami do projektowania i wykorzystania systemów autonomicznych. Targi stworzyły przestrzeń do wymiany doświadczeń, inspirujących dyskusji oraz prezentacji pomysłów rozwijanych w środowisku akademickim.
        Dla naszego zespołu udział w Drone World Expo był również ważną okazją do promocji działalności koła oraz prezentacji projektów realizowanych przez naszych studentów. Spotkania z przedstawicielami branży i środowiska naukowego umożliwiły nawiązanie nowych kontaktów oraz stworzyły potencjał do przyszłej współpracy badawczej i technologicznej.`,
            en: `In March 2026 our student scientific club participated in Drone World Expo, an international event dedicated to the development and application of unmanned aerial systems and emerging drone technologies. The expo brought together technology companies, research institutions, engineers and innovators working at the forefront of autonomous and unmanned systems.
        During the event we presented projects developed within our club, showcasing the outcomes of our student-led research and engineering activities. The exhibition provided an opportunity to highlight the scope of our work and the technological solutions currently being developed by our teams.
        Drone World Expo also created a valuable space for discussions with industry professionals, researchers and representatives of organizations involved in the development of UAV technologies. These interactions enabled us to exchange ideas, gain insights into current technological trends and learn more about innovative approaches to the design and operation of unmanned systems.
        For our team, participation in the event was not only an opportunity to present our projects but also to promote the activities of our scientific club and demonstrate the potential of student-driven research initiatives. The meetings and discussions held during the expo opened the door to new connections and potential future collaborations within the broader drone technology community.`
        },
        links: [
            ////{ label: { pl: ``, en: `` }, url: `` },
            ////{ label: { pl: ``, en: `` }, url: `` },
            ////{ label: { pl: ``, en: `` }, url: `` },
            ////{ label: { pl: ``, en: `` }, url: `` }
        ]
    },
    {
        id: `arctic-frontiers-2026`,
        date: `2026-02-02`,
        title: {
            pl: `Arctic Frontiers 2026`,
            en: `Arctic Frontiers 2026`
        },
        shortDesc: {
            pl: `W lutym 2026 roku wzięliśmy udział w konferencji Arctic Frontiers w Tromsø, prezentując projekt Snow’s Eye. Wydarzenie zgromadziło naukowców, przedstawicieli przemysłu oraz decydentów zajmujących się tematyką regionów arktycznych. Była to doskonała okazja do zaprezentowania naszych badań i wymiany doświadczeń.`,
            en: `In February 2026 we took part in the Arctic Frontiers conference in Tromsø, where we presented the Snow’s Eye project. The event brought together scientists, industry representatives and policymakers focused on Arctic research and development. 
        It provided an excellent opportunity to showcase our work and exchange insights with experts from around the world.
        `
        },
        fullDesc: {
            pl: `W lutym 2026 roku braliśmy udział w międzynarodowej konferencji Arctic Frontiers, która odbyła się w Tromsø w Norwegii. Jest to jedno z najważniejszych wydarzeń poświęconych badaniom Arktyki, skupiające naukowców, przedstawicieli instytucji badawczych, przemysłu oraz administracji publicznej z całego świata. Konferencja stanowi platformę do dyskusji na temat zmian klimatycznych, nowych technologii wykorzystywanych w badaniach polarnych oraz wyzwań związanych z funkcjonowaniem w ekstremalnych warunkach środowiskowych.
        Podczas wydarzenia zaprezentowaliśmy projekt Snow’s Eye – autonomiczną platformę UAV zaprojektowaną do pracy w trudnych warunkach arktycznych. Projekt koncentruje się na wykorzystaniu technologii bezzałogowych do wspierania badań naukowych w regionach o ograniczonym dostępie do infrastruktury oraz w miejscach, gdzie prowadzenie tradycyjnych pomiarów jest szczególnie wymagające.
        Udział w konferencji był dla nas ważną okazją do zaprezentowania efektów naszej pracy międzynarodowej społeczności naukowej. Prezentacja projektu pozwoliła również na wymianę doświadczeń z badaczami zajmującymi się tematyką systemów autonomicznych, technologii pomiarowych oraz badań środowiskowych w regionach polarnych.
        Konferencja Arctic Frontiers stworzyła przestrzeń do rozmów o przyszłości badań arktycznych oraz o roli nowoczesnych technologii w monitorowaniu zmian zachodzących w tych wyjątkowo wrażliwych ekosystemach. Udział w wydarzeniu umożliwił nam także nawiązanie nowych kontaktów naukowych i potencjalnych współprac badawczych.
        Szczegółowy opis projektu Snow’s Eye można znaleźć w sekcji projektów na naszej stronie.
        `,
            en: `In February 2026 we participated in the international Arctic Frontiers conference held in Tromsø, Norway. The conference is widely regarded as one of the leading platforms dedicated to Arctic research, bringing together scientists, research institutions, industry representatives and policymakers from across the globe. It serves as an important forum for discussing climate change, technological innovation and the challenges associated with conducting research and operations in polar environments.
        During the event we presented the Snow’s Eye project – an autonomous UAV platform designed to operate in demanding Arctic conditions. The project explores the potential of unmanned aerial technologies to support scientific research in remote regions where access to infrastructure is limited, and environmental conditions make traditional measurement campaigns particularly challenging.
        Presenting our work at Arctic Frontiers allowed us to share the outcomes of our research with the international scientific community. It also created valuable opportunities to exchange perspectives with researchers working on autonomous systems, environmental monitoring technologies and field research in polar regions.
        The conference further emphasized the growing importance of advanced technologies in studying climate processes and monitoring environmental change in the Arctic. Our participation enabled us to establish new professional connections and explore potential future collaborations with research groups and institutions engaged in polar science.
        A detailed description of the Snow’s Eye project can be found in the projects section of our website.
        `
        },
        links: [
            ////{ label: { pl: ``, en: `` }, url: `` },
            ////{ label: { pl: ``, en: `` }, url: `` },
            ////{ label: { pl: ``, en: `` }, url: `` },
            ////{ label: { pl: ``, en: `` }, url: `` }
        ]
    },
    {
        id: `siemens-tech-2026`,
        date: `2026-02-27`,
        title: {
            pl: `Wyróżnienie nagrodą Siemens – projekt Hawk Eye`,
            en: `Hawk Eye Project Recognized with a Siemens Award`
        },
        shortDesc: {
            pl: `Zostaliśmy wyróżnieni nagrodą firmy Siemens w postaci produktów o wartości 10 000 zł na rozwój projektu Hawk Eye. Projekt dotyczy wielofunkcyjnego drona stratosferycznego rozwijanego w naszym kole naukowym. Wsparcie pozwoli nam kontynuować prace nad rozwojem tej platformy.`,
            en: `Our scientific club received an award from Siemens in the form of products worth 10,000 PLN to support the development of the Hawk Eye project. The project focuses on a multifunctional stratospheric drone developed by our team. This support will allow us to continue advancing the platform.`
        },
        fullDesc: {
            pl: `Nasze Koło Naukowe zostało wyróżnione nagrodą firmy Siemens w postaci produktów o łącznej wartości 10 000 zł, które zostały przeznaczone na rozwój projektu Hawk Eye. Wsparcie to stanowi ważny krok w dalszym rozwijaniu naszej działalności badawczej oraz realizacji projektów związanych z nowoczesnymi technologiami bezzałogowymi.
        Hawk Eye to projekt wielofunkcyjnego drona stratosferycznego, którego celem jest stworzenie platformy zdolnej do długotrwałego lotu nad wybranym obszarem. Koncepcja ta łączy wybrane zalety systemów satelitarnych z elastycznością operacyjną bezzałogowych platform latających działających na niższych wysokościach.
        Tego typu rozwiązania mogą w przyszłości znaleźć zastosowanie w wielu obszarach, takich jak obserwacja Ziemi, monitoring środowiska, wczesne wykrywanie pożarów, monitoring granic czy zapewnianie łączności w regionach dotkniętych klęskami żywiołowymi. Rozwijane w projekcie technologie mają na celu zwiększenie możliwości prowadzenia badań i monitoringu w trudno dostępnych regionach.
        Otrzymane wsparcie pozwoli nam kontynuować rozwój kluczowych elementów platformy, testować nowe rozwiązania technologiczne oraz prowadzić dalsze prace badawcze w ramach działalności naszego koła. Wyróżnienie ze strony firmy Siemens stanowi dla naszego zespołu istotne docenienie pracy studentów zaangażowanych w rozwój projektu oraz potwierdzenie potencjału prowadzonych przez nas działań badawczych.
        `,
            en: `Our student scientific club has been recognized with an award from Siemens in the form of products worth 10,000 PLN, supporting the further development of the Hawk Eye project. This distinction represents an important milestone for our team and highlights the potential of the technologies being developed within our research activities.
        Hawk Eye is a project focused on the development of a multifunctional stratospheric drone designed for long-endurance missions over selected areas. The concept aims to combine certain advantages of satellite-based observation with the flexibility and accessibility of lower-altitude unmanned aerial platforms.
        Such systems have the potential to support a wide range of applications, including Earth observation, environmental monitoring, early detection of wildfires, border surveillance and the provision of communication support in areas affected by natural disasters. By exploring these possibilities, the project seeks to contribute to the development of innovative aerial monitoring solutions.
        The support provided by Siemens will allow our team to continue developing key components of the platform, test new technological solutions and further expand the research conducted within our scientific club. Receiving this award is also a significant recognition of the dedication and work of the students involved in the project.
        `
        },
        links: [
            ////{ label: { pl: ``, en: `` }, url: `` },
            ////{ label: { pl: ``, en: `` }, url: `` },
            ////{ label: { pl: ``, en: `` }, url: `` },
            ////{ label: { pl: ``, en: `` }, url: `` }
        ]
    },
    {
        id: `bit-ai-2026`,
        date: `2026-01-03`,
        title: {
            pl: `Udział w programie naukowym o AI w Chinach `,
            en: `Participation in the AI academic program in China`
        },
        shortDesc: {
            pl: `W styczniu 2026 jeden z naszych członków wziął udział w programie naukowym o sztucznej inteligencji w Chinach, na campusie Beijing Institute of Technology w Zhuhai. Była to okazja, aby poznać podstawowe zagadnienia związane z tą dziedziną, jak również poznać lepiej ten kraj poprzez liczne wycieczki i warsztaty kulturalne. Podczas finałowej prezentacji o zastosowaniu sztucznej inteligencji w Polsce nie zabrakło okazji do promowania działalności Koła.`,
            en: `In January 2026, one of our members attended an AI scientific program at the Beijing Institute of Technology in Zhuhai, China. The experience combined deep dives into AI fundamentals with rich cultural workshops and tours. The final presentation on AI in Poland provided a perfect platform to showcase our Research Club's latest projects to an international audience.`
        },
        fullDesc: {
            pl: `W styczniu 2026 jeden z członków naszego Koła, student Politechniki Gdańskiej Jan Matusiak, wziął udział w dwutygodniowym "Study in BIT" Artificial Intelligence Winter Program na campusie Beijing Institute of Technology w Zhuhai. Otrzymał on nominację do stypendium z Wydziału Elektroniki, Telekomunikacji i Informatyki swojej uczelni, dzięki czemu mógł w pełni korzystać w oferty programu.
        Główną część programu stanowiły codzienne wykłady o podstawach sztucznej inteligencji - jej zastosowaniach, etyce, a także agentach AI i uczeniu przez wzmacnianie. Nie brakowało również zajęć kulturowych, podczas których mogliśmy spróbować tradycyjnej kaligrafii oraz wycinanek.
        Była to również okazja by pozwiedzać - nie tylko Zhuhai, ale również Shenzen i Guanghzou, wiodące miasta regionu GBA i jedne z największych miast nie tylko Chin, ale i na całym świecie. 
        Zwieńczeniem programu była prezentacja końcowa, podczas której cały zespół z Politechniki Gdańskiej opowiedział o zastosowaniach w sztucznej inteligencji w Polsce. Janek opowiadał między innymi o swoim udziale w projekcie FlySearch w naszym Kole, w którym bada wpływ sztucznej inteligencji na nawigację dronem.`,
            en: `In January 2026, Jan Matusiak, a member of our Research Club and a student at Gdańsk University of Technology, participated in the two-week 'Study in BIT' Artificial Intelligence Winter Program at the Beijing Institute of Technology campus in Zhuhai. Having received a scholarship nomination from the Faculty of Electronics, Telecommunications, and Informatics, he was able to fully engage in the program's offerings.

                The core of the program consisted of daily lectures on AI fundamentals – including its applications, ethics, AI agents, and reinforcement learning. The experience was enriched by cultural workshops where participants practiced traditional calligraphy and paper-cutting.

                The trip also provided an opportunity to explore Zhuhai, Shenzhen, and Guangzhou – leading cities of the Greater Bay Area and some of the largest metropolises in the world. The program culminated in a final presentation, where the team from Gdańsk University of Technology discussed AI applications in Poland. Jan highlighted his involvement in our FlySearch project, focusing on the impact of AI on autonomous drone navigation.`
        },
        links: [
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` }
        ]
    },
    {
        id: `orlen-foundation-2025`,
        date: `2025-12-01`,
        title: {
            pl: `Grant Fundacji ORLEN dla projektu Hawk Eye Stratospheric Drone`,
            en: `ORLEN Foundation Grant for the Hawk Eye Stratospheric Drone Project`
        },
        shortDesc: {
            pl: `Nasze koło naukowe otrzymało grant Fundacji ORLEN w ramach programu „Od cząsteczki do galaktyki”. Wsparcie zostało przyznane na rozwój projektu Hawk Eye Stratospheric Drone – autonomicznej platformy stratosferycznej typu HAPS. Projekt koncentruje się na opracowaniu wielokrotnego użytku systemu do badań atmosfery, monitoringu środowiska oraz zapewniania łączności w trudno dostępnych regionach.`,
            en: `Our student scientific club has been awarded a grant from the ORLEN Foundation as part of the “From Molecule to Galaxy” program. The funding supports the development of the Hawk Eye Stratospheric Drone project – an autonomous high-altitude platform of the HAPS type. The project focuses on creating a reusable system for atmospheric research, environmental monitoring, and communication in hard-to-reach areas.`
        },
        fullDesc: {
            pl: `Nasze koło naukowe działające na Wydziale Mechaniki, Energetyki i Lotnictwa Politechniki Warszawskiej zostało laureatem programu grantowego Fundacji ORLEN „Od cząsteczki do galaktyki”. Program ten wspiera działalność studenckich kół naukowych prowadzących projekty badawcze z zakresu chemii, fizyki oraz nauk pokrewnych, umożliwiając rozwój innowacyjnych inicjatyw naukowych i technologicznych.
        Nagrodzony projekt, realizowany pod opieką dr hab. inż. Elżbiety Jarzębowskiej, prof. PW, nosi nazwę „Hawk Eye Stratospheric Drone” i koncentruje się na opracowaniu autonomicznego drona stratosferycznego typu HAPS (High Altitude Pseudo-Satellite). Planowana platforma ma operować na wysokościach od 10 do 30 km, stanowiąc elastyczną i bardziej ekonomiczną alternatywę dla tradycyjnych systemów satelitarnych.
        Jednym z kluczowych celów projektu jest ograniczenie problemu elektroodpadów powstających w wyniku wykorzystywania jednorazowych radiosond meteorologicznych. W odpowiedzi na to wyzwanie opracowywany jest system wielokrotnego użytku, zdolny do bezpiecznego powrotu i lądowania po zakończeniu misji.
        Innowacyjność projektu opiera się między innymi na wykorzystaniu ogniw fotowoltaicznych oraz zdolności platformy do długotrwałego, autonomicznego lotu, który może trwać co najmniej 24 godziny. Dron ma pełnić funkcję stratosferycznej stacji bazowej SMBS, zapewniając łączność w promieniu do 100 km, zwłaszcza w regionach o ograniczonej infrastrukturze komunikacyjnej. Platforma może także wspierać działania ratownicze typu SAR oraz monitoring klęsk żywiołowych dzięki zastosowaniu kamer wielospektralnych.
        Realizacja projektu została zaplanowana w kilku etapach, obejmujących budowę prototypu testowego, przeprowadzenie testów sterowania w warunkach stratosferycznych oraz stworzenie pełnej platformy zdolnej do pracy z zerowym bilansem energetycznym. Projekt rozwijany jest we współpracy z ekspertami z Creotech Instruments S.A. oraz Instytutu Geofizyki Polskiej Akademii Nauk.
        Otrzymany grant stanowi istotne wsparcie dla dalszego rozwoju projektu oraz umożliwia realizację kolejnych etapów badań nad autonomicznymi platformami stratosferycznymi rozwijanymi w naszym kole naukowym.
        `,
            en: `Our student research club operating at the Faculty of Power and Aeronautical Engineering of the Warsaw University of Technology has been awarded a grant from the ORLEN Foundation under the “From Molecule to Galaxy” program. The initiative supports student research groups working in the fields of chemistry, physics, and related scientific disciplines, promoting innovative academic and technological projects.
        The awarded project, supervised by Professor Elżbieta Jarzębowska, is titled “Hawk Eye Stratospheric Drone” and focuses on the development of an autonomous stratospheric UAV platform of the HAPS (High Altitude Pseudo-Satellite) type. The system is designed to operate at altitudes between 10 and 30 km, offering a flexible and cost-effective alternative to traditional satellite systems.
        One of the key objectives of the project is to address the environmental issue associated with disposable meteorological radiosondes, which generate electronic waste after a single use. The proposed solution involves the development of a reusable platform capable of safely returning and landing after completing its mission.
        The innovative character of the system is based on the integration of photovoltaic cells and the platform’s capability to perform long-endurance autonomous flights lasting at least 24 hours. The platform is intended to function as a stratospheric mobile base station (SMBS), providing communication coverage within a radius of up to 100 km, particularly in regions with limited communication infrastructure. Additionally, the system may support search-and-rescue (SAR) operations and disaster monitoring through the use of multispectral imaging systems.
        The implementation of the project includes several development stages, including the construction of a test prototype, control system testing in stratospheric conditions, and the development of a full platform capable of operating with a zero-energy balance. The project is being developed in collaboration with experts from Creotech Instruments S.A. and the Institute of Geophysics of the Polish Academy of Sciences.
        The grant awarded by the ORLEN Foundation provides significant support for the continued development of the project and enables further research on autonomous stratospheric platforms conducted within our student scientific club.
        `
        },
        links: [
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` }
        ]
    },
    {
        id: `tvp3-2026`,
        date: `2026-03-23`,
        title: {
            pl: `Nasze koło naukowe gościem programu „Dobrego dnia” w TVP3 Warszawa!`,
            en: `Our Science Club Featured on TVP3 Warsaw`
        },
        shortDesc: {
            pl: `Członkowie naszego koła naukowego byli gośćmi programu "Dobrego dnia" w TVP3 Warszawa, gdzie zaprezentowali nasze najnowsze osiągnięcia w dziedzinie technologii bezzałogowych. Podczas rozmowy przybliżyliśmy kulisy prac nad dronem stratosferycznym Hawk Eye oraz podwodnym systemem Blue Spark, podkreślając ich realny potencjał wdrożeniowy w nauce i przemyśle. To wystąpienie było doskonałą okazją do pokazania, jak w ramach ogólnopolskiej współpracy studenckiej skutecznie przekuwamy innowacyjne idee w działające rozwiązania technologiczne.`,
            en: `Members of our science club appeared on TVP3 Warsaw’s "Dobrego dnia" to showcase our latest advancements in unmanned technology. During the interview, they shared insights into the development of the Hawk Eye stratospheric drone and the Blue Spark underwater system, emphasizing their real-world application potential in both science and industry. This broadcast served as a perfect platform to demonstrate how our nationwide student collaboration effectively transforms innovative ideas into functional technological solutions.`
        },
        fullDesc: {
            pl: `Członkowie naszego koła naukowego – Jan Mikołajczyk (prezes koła i lider projektu), Stanisław Świecki (lider zespołu konstrukcyjnego) oraz Maciej Domagalski (główny inżynier projektu) – niedawno wystąpili w programie „Dobrego dnia” w TVP3 Warszawa, gdzie opowiedzieli o naszej codziennej działalności oraz kierunkach rozwoju technologii bezzałogowych. Podczas rozmowy nasi reprezentanci podkreślili, że z powodzeniem zrzeszamy ambitne osoby z różnych uczelni w całej Polsce, które wspólnie z nami chcą rozwijać swoje kompetencje poprzez pracę nad nowoczesnymi rozwiązaniami technologicznymi. Jednym z głównych tematów wystąpienia był projekt Hawk Eye, czyli zaawansowany dron stratosferyczny, nad którym obecnie pracujemy. Zaprezentowaliśmy zarówno ambitne założenia tego systemu, jak i jego aktualny stan rozwoju oparty na już działającym prototypie, który stanowi dla nas fundament dalszych prac badawczych w zakresie monitoringu środowiska i wsparcia nauki.
                Duże zainteresowanie widzów wzbudził również Blue Spark – nasz autonomiczny dron podwodny, którego potencjał w badaniach akwenów, przemyśle oraz misjach eksploracyjnych udowadnia, że rozwijane przez nas technologie nie ograniczają się wyłącznie do przestrzeni powietrznej. W trakcie programu mocno zaznaczyliśmy nasze nadrzędne założenie, wedle którego tworzone przez nas rozwiązania nie są jedynie akademickimi koncepcjami, lecz dążymy do tego, aby posiadały realny potencjał wdrożeniowy poza murami uczelni. Katalog prezentowanych inicjatyw uzupełniliśmy o inne projekty, takie jak MUSC oparty na technologii roju dronów, FlySearch oraz system Snow’s Eye, które wspólnie budują spójny i wszechstronny kierunek rozwoju technologii bezzałogowych o szerokim spektrum zastosowań.
                Udział w programie był dla nas nie tylko szansą na zaprezentowanie efektów naszej pracy szerszej publiczności, ale również ważnym krokiem w budowaniu świadomości na temat roli nowoczesnych systemów autonomicznych w nauce i przemyśle. Całe wystąpienie stało się dla nas doskonałym potwierdzeniem tego, jak skutecznie potrafimy przekładać śmiałe idee na konkretne rozwiązania technologiczne, które wkrótce mogą realnie wpłynąć na oblicze współczesnej techniki. Udział w programie był dla nas ważnym doświadczeniem, które motywuje do dalszego rozwoju naszych systemów oraz podejmowania kolejnych wyzwań inżynieryjnych.
        `,
            en: `Members of our science club – Jan Mikołajczyk (President and Project Leader), Stanisław Świecki (Construction Team Lead), and Maciej Domagalski (Chief Project Engineer) – were recently invited to the "Dobrego dnia" program on TVP3 Warsaw, where they discussed our daily operations and the strategic directions of unmanned technology development. During the interview, our representatives emphasized that we successfully unite ambitious individuals from various universities across Poland who wish to enhance their competencies by working on cutting-edge technological solutions. A central theme of the appearance was the Hawk Eye project – an advanced stratospheric drone currently under development. We presented both the ambitious objectives of this system and its current stage of development, centred around a fully functional prototype that serves as the foundation for our ongoing research into environmental monitoring and scientific support.
                The audience also showed significant interest in Blue Spark – our autonomous underwater vehicle (AUV). Its potential applications in aquatic research, industrial inspections, and exploration missions demonstrate that our technological innovations extend far beyond the aerial domain. Throughout the broadcast, we firmly highlighted our core principle: the solutions we develop are not merely academic concepts. Instead, we strive to ensure they possess genuine implementation potential outside the university environment. Our portfolio of initiatives was further supplemented by other projects, such as MUSC, based on drone swarm technology, as well as FlySearch and the Snow’s Eye system, which together form a cohesive and versatile trajectory for unmanned systems across a broad spectrum of applications.
                Participating in the program was not only an opportunity to showcase the results of our work to a wider audience but also a vital step in raising awareness regarding the role of modern autonomous systems in science and industry. The appearance served as a powerful testament to our ability to translate bold ideas into tangible technological solutions that could soon have a profound impact on the landscape of modern engineering. Our involvement in the broadcast was a significant milestone, further motivating us to refine our systems and tackle the next generation of engineering challenges.
        `
        },
        links: [
            // { label: { pl: ``, en: `` }, url: `` },
            // { label: { pl: ``, en: `` }, url: `` },
            // { label: { pl: ``, en: `` }, url: `` },
            // { label: { pl: ``, en: `` }, url: `` }
        ]
    },
    {
        id: `botland-2026`,
        date: `2026-04-10`,
        title: {
            pl: `Wspólnie dla innowacji: Partnerstwo naszego Koła Naukowego z firmą Botland`,
            en: `Powering Innovation: Our Student Research Group Partners with Botland`
        },
        shortDesc: {
            pl: `Z ogromną radością ogłaszamy nawiązanie współpracy partnerskiej pomiędzy naszym kołem a firmą Botland. Jako czołowy polski dystrybutor drukarek 3D, elektroniki i technologii dla pasjonatów, Botland wesprze nasze koło w realizacji najbardziej ambitnych projektów inżynierskich. Zapraszamy do zapoznania się ze szczegółami tego technologicznego partnerstwa oraz ofertą naszego partnera na stronie https://botland.com.pl/.`,
            en: `We are thrilled to announce a strategic partnership between our student research group and Botland. As a premier Polish distributor of 3D printers, electronics, and cutting-edge technology for enthusiasts, Botland will support our most ambitious engineering endeavors. We invite you to explore the details of this technological alliance and browse our partner's extensive portfolio at https://botland.com.pl/ `
        },
        fullDesc: {
            pl: `Z wielką przyjemnością ogłaszamy nawiązanie oficjalnej współpracy pomiędzy naszym kołem naukowym a firmą Botland. Jest to dla nas wyjątkowe wydarzenie, ponieważ łączymy siły z uznanym, polskim dystrybutorem drukarek 3D, elektroniki i nowoczesnych technologii stworzonych z myślą o pasjonatach. Wsparcie tak doświadczonego partnera otwiera przed nami zupełnie nowe możliwości w zakresie realizacji zaawansowanych projektów technicznych oraz prototypowania innowacyjnych rozwiązań.
        Współpraca z Botland to przede wszystkim dostęp do najwyższej jakości komponentów i narzędzi, które są niezbędne w codziennej pracy naszych konstruktorów. Jako marka silnie zakorzeniona w środowisku twórców i inżynierów, nasz nowy partner doskonale rozumie potrzeby ambitnych projektów studenckich. Jesteśmy przekonani, że ta współpraca zaowocuje wieloma ciekawymi konstrukcjami, które już niedługo zaprezentujemy szerszej publiczności. Zachęcamy wszystkich do odwiedzenia strony internetowej naszego partnera pod adresem https://botland.com.pl/ i śledzenia efektów naszych wspólnych działań technologicznych.
        `,
            en: `It is with great pleasure that we announce the commencement of an official partnership between our student research group and Botland. This collaboration marks a significant milestone for us, as we join forces with a renowned Polish distributor of 3D printers, electronic components, and cutting-edge technologies specifically designed for tech enthusiasts. Securing the support of such an experienced partner unlocks a wealth of new opportunities for us, particularly in executing advanced technical projects and prototyping innovative solutions.
        Our collaboration with Botland primarily ensures seamless access to high-fidelity components and specialized tools, which are indispensable for the day-to-day operations of our engineers and designers. As a brand deeply rooted in the maker and engineering communities, our new partner possesses a profound understanding of the requirements inherent in ambitious student-led initiatives. We are confident that this synergy will result in numerous sophisticated constructions, which we look forward to unveiling to a wider audience in the near future. We encourage everyone to visit our partner’s website at https://botland.com.pl/  and follow the progress of our collaborative technological ventures.
        `
        },
        links: [
            { label: { pl: `BOTLAND`, en: `BOTLAND` }, url: `https://botland.com.pl/` },
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` }
        ]
    },
    {
        id: `european-drone-forum-2026`,
        date: `2026-03-24`,
        title: {
            pl: `W centrum europejskiej debaty o dronach: Relacja z European Drone Forum`,
            en: `At the Forefront of UAS Innovation: Insights from the European Drone Forum`
        },
        shortDesc: {
            pl: `Reprezentant naszego koła naukowego wizytował European Drone Forum, kluczowe wydarzenie skupiające liderów branży i organów regulacyjnych z całej Europy. Udział w prelekcjach dotyczących certyfikacji oraz integracji systemów bezzałogowych w cywilnej przestrzeni powietrznej pozwolił nam na konfrontację naszych działań z najnowszymi światowymi standardami. Zdobyta wiedza merytoryczna oraz wgląd w procesy standaryzacji technicznej stanowią dla nas strategiczny fundament do dalszej optymalizacji realizowanych projektów inżynieryjnych.`,
            en: `A representative of our science club recently attended the European Drone Forum, a premier event gathering industry leaders and regulatory bodies from across Europe. Engaging in high-level discussions on certification and the integration of unmanned systems into civil airspace allowed us to align our current initiatives with the latest global benchmarks. The technical insights and firsthand exposure to standardization processes will serve as a strategic foundation for the further optimization of our ongoing engineering projects.`
        },
        fullDesc: {
            pl: `Niedawno przedstawiciel naszego koła naukowego miał okazję uczestniczyć w European Drone Forum – jednym z najbardziej prestiżowych wydarzeń branżowych w Europie, skupiającym kluczowych ekspertów, liderów przemysłu oraz przedstawicieli organów regulacyjnych. Udział w forum w roli wizytującego zapewnił nam bezpośredni wgląd w najnowsze trendy i priorytety rozwojowe, które obecnie kształtują rynek systemów autonomicznych. Podczas licznych prelekcji nasz reprezentant analizował zagadnienia dotyczące ewoluujących przepisów bezpieczeństwa, certyfikacji oraz integracji bezzałogowców w cywilnej przestrzeni powietrznej, co stanowi obecnie jedno z największych wyzwań dla inżynierów i operatorów na całym świecie.
        Wizyta ta była niezwykle cennym doświadczeniem merytorycznym, pozwalającym skonfrontować naszą wiedzę z wizjami największych graczy technologicznych. Obserwacja prezentowanych innowacji oraz kierunków, w jakich zmierzają europejskie regulacje, utwierdziła nas w przekonaniu, że nasza codzienna praca badawczo-rozwojowa trafnie wpisuje się w nowoczesne standardy i odpowiada na realne potrzeby rynku. Możliwość przyjrzenia się z bliska procesom standaryzacji oraz wymiana doświadczeń z praktykami z całej Europy dostarczyły nam strategicznych informacji, które realnie wpłyną na optymalizację naszych procesów projektowych i podniesienie jakości realizowanych inicjatyw.
        Udział w tak znaczącym międzynarodowym wydarzeniu to kolejny krok w stronę budowania profesjonalnego zaplecza wiedzy, niezbędnego do operowania w dynamicznym środowisku wysokich technologii. Wyjazd ten traktujemy jako kluczowy element rozwoju, dzięki któremu jesteśmy w stanie jeszcze precyzyjniej definiować nasze cele inżynieryjne i naukowe. Wracamy z forum z nowym spojrzeniem na przyszłość technologii autonomicznych oraz solidnym przygotowaniem teoretycznym, które pozwoli nam dbać o to, by każda podejmowana przez nas inicjatywa była zawsze w pełni zgodna z najbardziej aktualnymi wymogami panującymi w branży bezzałogowej.
        `,
            en: `A representative of our science club recently had the privilege of attending the European Drone Forum, one of the most prestigious industry events in Europe, bringing together key experts, industry leaders, and regulatory representatives. Participating in the forum as a visiting observer provided us with direct insight into the emerging trends and developmental priorities currently shaping the autonomous systems market. Throughout numerous presentations, our representative analysed critical issues surrounding evolving safety regulations, certification, and the integration of Unmanned Aircraft Systems (UAS) into civil airspace – one of the foremost challenges currently facing engineers and operators worldwide.
        This visit proved to be an invaluable scholarly experience, allowing us to benchmark our expertise against the visions of major technological stakeholders. Observing the showcased innovations and the trajectory of European regulations reinforced our confidence that our daily research and development efforts are firmly aligned with modern global standards and effectively address real-world market demands. Gaining a closer look at technical standardization processes and exchanging experiences with practitioners from across Europe provided us with strategic data that will tangibly influence the optimization of our design workflows and enhance the quality of our initiatives.
        Participating in such a significant international event marks another milestone in building the professional knowledge base essential for operating within the dynamic high-tech landscape. We view this involvement as a pivotal element of our development, enabling us to define our engineering and scientific objectives with even greater precision. We return from the forum with a renewed perspective on the future of autonomous technologies and a robust theoretical foundation, ensuring that every initiative we undertake remains fully compliant with the most current requirements and trends prevailing in the global unmanned industry.
        `
        },
        links: [
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` },
            //{ label: { pl: ``, en: `` }, url: `` }
        ]
    },
    {
        id: `world-of-hydrogen-expo-2026`,
        date: `2026-04-14`,
        title: {
            pl: `World of Hydrogen Expo 2026 – relacja z targów`,
            en: `World of Hydrogen Expo 2026 – Event Report
        `
        },
        shortDesc: {
            pl: `World of Hydrogen Expo 2026 za nami i był to dla naszego koła wyjątkowy udział. Wystąpiliśmy w roli partnera merytorycznego targów, zaprezentowaliśmy własne stoisko, a dwoje naszych członków stanęło na scenie jako prelegenci przed ekspertami z całej Europy. Relacjonujemy, jak przebiegło jedno z najważniejszych wydarzeń wodorowych w Polsce.`,
            en: `World of Hydrogen Expo 2026 is behind us and it was an extraordinary edition for our organisation. We took on the role of substantive partner of the expo, presented our own stand, and two of our members took to the stage as speakers before an audience of experts from across Europe. Here is our account of one of the most significant hydrogen-focused events in Poland.`
        },
        fullDesc: {
            pl: `Wzięliśmy udział w World of Hydrogen Expo 2026 – jednym z najważniejszych w Polsce wydarzeń poświęconych nowoczesnym technologiom energetycznym, gromadzącym ekspertów, przedstawicieli przemysłu oraz środowiska akademickiego. Tegoroczna edycja była dla nas wyjątkowa, ponieważ uczestniczyliśmy w niej nie tylko jako goście, ale również jako partner merytoryczny targów, aktywnie współtworząc ich ekspercki charakter. Zaprezentowaliśmy się również na własnym stoisku, które stało się miejscem spotkań z przedstawicielami branży i przestrzenią do rozmów o naszej działalności.
        Program targów oraz towarzyszącego im Hydrogen Solutions Summit skupiał się na praktycznych aspektach wdrażania technologii wodorowych i ich rosnącej roli w przemyśle oraz energetyce. Wydarzenie stworzyło wyjątkową platformę do wymiany doświadczeń między środowiskiem naukowym a rynkiem. Szczególnym wyróżnieniem dla całego koła był udział dwojga naszych członków w roli prelegentów: Jana Mikołajczyka oraz Jakuba Bałenkowskiego którzy podzielili się swoją wiedzą i doświadczeniem przed gronem specjalistów z całej Europy.
        Udział w targach przyniósł nam wiele cennych doświadczeń – bezpośredni kontakt z aktualnymi trendami, rozmowy z firmami, instytucjami i ośrodkami badawczymi, a przede wszystkim nowe znajomości, które mogą zaowocować w przyszłych projektach. 
        `,
            en: `Our student research group attended World of Hydrogen Expo 2026 – one of Poland's most prominent events dedicated to cutting-edge energy technologies, bringing together experts, industry professionals, and members of the academic community. This year's edition proved particularly significant for us: we participated not merely as attendees, but as a substantive partner of the expo, actively contributing to its expert-driven character. We also hosted our own stand, which served as a meeting point for industry representatives and an opportunity for in-depth conversations about our work.
        The programme of the expo and the accompanying Hydrogen Solutions Summit centred on the practical implementation of hydrogen technologies and their growing relevance within industry and the energy sector. The event provided an exceptional platform for the exchange of experience between the academic world and the market – an opportunity we embraced to the fullest. A particular distinction for our organisation was the participation of two of our members as speakers: Jan Mikołajczyk and Jakub Bałenkowski, who shared their expertise and insights with an audience of specialists from across Europe.
        Our involvement in the expo proved immensely rewarding – affording us direct exposure to the latest industry trends, meaningful conversations with companies, institutions, and research centres, and above all, new connections that may well bear fruit in future projects. 
        `
        },
        links: [
            // { label: { pl: ``, en: `` }, url: `` },
            // { label: { pl: ``, en: `` }, url: `` },
            // { label: { pl: ``, en: `` }, url: `` },
            // { label: { pl: ``, en: `` }, url: `` }
        ]
    },
    {
        id: `aero-2026`,
        date: `2026-04-22`,
        title: {
            pl: `AERO Friedrichshafen 2026 – relacja z jednego z kluczowych wydarzeń branży lotniczej`,
            en: `AERO Friedrichshafen 2026 – Insights from One of Europe’s Key Aviation Events`
        },
        shortDesc: {
            pl: `Jak naprawdę wygląda przyszłość lotnictwa i jakie kierunki dziś wyznaczają jej rozwój? Podczas AERO Friedrichshafen 2026 mieliśmy okazję zobaczyć to z bliska — od innowacyjnych technologii po nowe modele funkcjonowania branży aviation. To doświadczenie pozwoliło nam lepiej zrozumieć, jak teoria łączy się z praktyką w dynamicznie zmieniającym się sektorze.`,
            en: `What does the future of aviation really look like, and what are the trends shaping its development today? At AERO Friedrichshafen 2026, we had the opportunity to see it up close — from cutting-edge technologies to new models shaping the aviation industry. This experience helped us better understand how theory translates into practice in a rapidly evolving sector.`
        },
        fullDesc: {
            pl: `W dniach targowych mieliśmy okazję uczestniczyć w AERO Friedrichshafen 2026 — jednym z najważniejszych wydarzeń europejskiego sektora lotniczego, które co roku gromadzi setki wystawców oraz tysiące uczestników z całego świata.

        Obecność na targach była dla nas przede wszystkim szansą na bezpośrednie zetknięcie się z aktualnymi trendami w branży aviation. Wśród prezentowanych rozwiązań szczególną uwagę zwracały innowacje technologiczne, rozwój zrównoważonego lotnictwa oraz rosnące znaczenie integracji nowych modeli biznesowych w sektorze.

        Udział w wydarzeniu umożliwił nam również nawiązanie wartościowych kontaktów z przedstawicielami branży — od firm technologicznych, przez operatorów, aż po organizacje rozwijające rozwiązania przyszłości dla lotnictwa. Tego typu networking stanowi istotny element budowania kompetencji i zrozumienia realiów rynku już na etapie studiów.

        Nie bez znaczenia była także możliwość obserwacji, w jaki sposób teoria przekazywana w trakcie zajęć akademickich znajduje swoje odzwierciedlenie w praktyce rynkowej. Udział w AERO pozwolił nam spojrzeć szerzej na wyzwania i kierunki rozwoju współczesnego lotnictwa.

        Wracamy z nową wiedzą, inspiracjami oraz motywacją do dalszego rozwoju w obszarze aviation i business.`,
            en: `During this year’s edition of AERO Friedrichshafen 2026, we had the opportunity to take part in one of the most important events in the European aviation industry, bringing together hundreds of exhibitors and thousands of participants from around the world.

        Our presence at the event was, above all, a chance to directly engage with current trends shaping the aviation sector. Among the showcased solutions, particular attention was drawn to technological innovation, the development of sustainable aviation, and the growing importance of new business models within the industry.

        Participating in AERO also enabled us to establish valuable connections with industry representatives — from technology companies and operators to organizations working on future-oriented aviation solutions. This type of networking plays a key role in building practical understanding of the market already at the academic stage.

        Equally important was the opportunity to observe how academic knowledge translates into real-world applications. Attending AERO allowed us to gain a broader perspective on the challenges and future directions of modern aviation.

        We return with new insights, inspiration, and strong motivation to further develop in the field of aviation and business.`
        },
        links: [
            // { label: { pl: ``, en: `` }, url: `` },
            // { label: { pl: ``, en: `` }, url: `` },
            // { label: { pl: ``, en: `` }, url: `` },
            // { label: { pl: ``, en: `` }, url: `` }
        ]
    }
];

const partners = [
    {
        id: 1,
        name: "Politechnika Warszawska",
        url: "https://www.pw.edu.pl/",
        logo: "https://www.ch.pw.edu.pl/var/ch/storage/images/media/images/logo-pw/14895-2-pol-PL/logo-PW_imagelarge.png",
        category: "partner"
    },
    {
        id: 2,
        name: "Uniwersytet Warszawski",
        url: "https://www.uw.edu.pl/",
        logo: "https://www.uw.edu.pl/wp-content/uploads/2017/07/logo-2-11.png",
        category: "partner"
    },
    {
        id: 3,
        name: "Creotech GEO",
        url: "https://creotech.pl/",
        logo: "https://res.cloudinary.com/dsrdp5vrr/image/upload/v1775328864/kn-spa-i-blsps/logos/Creotech_GEO.png",
        category: "partner"
    },
    {
        id: 4,
        name: "Inkubator UW",
        url: "https://iuw.edu.pl/",
        logo: "https://iuw.edu.pl/wp-content/uploads/2022/07/logo-inkubator.svg",
        category: "partner"
    },
    {
        id: 5,
        name: "Botland",
        url: "https://botland.com.pl",
        logo: "https://botland.com.pl/img/polska-logo-1603126632.jpg",
        category: "partner"
    },
    {
        id: 6,
        name: "Siemens",
        url: "https://www.siemens.com/en-us/",
        logo: "https://press.siemens.com/profiles/c2_base/modules/c2cms_instance_logo/assets/sag-logo.png",
        category: "support"
    },
    {
        id: 7,
        name: "Fundacja Orlen",
        url: "https://fundacja.orlen.pl/pl",
        logo: "https://mojemiejscenaziemi.pl/wp-content/uploads/2022/07/Logo-ORLEN.png",
        category: "support"
    },
    {
        id: 8,
        name: "Our Future Foundation",
        url: "https://off.org.pl/",
        logo: "https://res.cloudinary.com/dsrdp5vrr/image/upload/v1775329364/kn-spa-i-blsps/logos/OFF.png",
        category: "support"
    },
    {
        id: 9,
        name: "Instytut Geofizyki PAN",
        url: "https://www.igf.edu.pl/",
        logo: "https://www.igf.edu.pl/app/uploads/2025/05/igf-pl-colour-scaled.png",
        category: "support"
    },
    {
        id: 10,
        name: "IDUB",
        url: "https://inicjatywadoskonalosci.uw.edu.pl/en/",
        logo: "https://inicjatywadoskonalosci.uw.edu.pl/wp-content/uploads/sites/11/2021/07/logotyp-IDUB-EN-poziom-kolor.svg",
        category: "support"
    },
    {
        id: 11,
        name: "NCBR",
        url: "https://www.gov.pl/web/ncbr",
        logo: "https://www.gov.pl/logo/3fe4125e-947b-4513-bdcd-cf161ce5871d",
        category: "support"
    },
    {
        id: 12,
        name: "Uczelnie przyszłości",
        url: "https://www.gov.pl/web/ncbr/projekt-uczelnie-przyszlosci",
        logo: "https://p.lodz.pl/sites/default/files/styles/max_250x250/public/2025-02/uczelenie_przyszlosci_logo.png",
        category: "support"
    },
    {
        id: 13,
        name: "PTAK Warsaw Expo",
        url: "https://warsawexpo.eu/",
        logo: "https://warsawexpo.eu/wp-content/uploads/2019/07/logo-white.png",
        category: "support"
    },
    {
        id: 14,
        name: "Ministerstwo Nauki i Szkolnictwa Wyższego",
        url: "https://www.gov.pl/web/nauka",
        logo: "https://www.gov.pl/img/units/nauka/05_znak_uproszczony_kolor_biale_tlo.png",
        category: "support"
    }
];

// Jeśli używasz modułów, dodaj export, jeśli nie - zmienna będzie dostępna globalnie