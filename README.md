# Strona Projektu : https://mekambee.github.io/EasyTicket/#/

# Opis Projektu

Osoby korzystające z komunikacji miejskiej, zarówno mieszkańcy miasta, jak i turyści, muszą zaopatrzyć się w bilety. Mogą to być bilety krótkoterminowe lub okresowe, na różne strefy i z odpowiednimi ulgami. Bilety powinny obejmować tramwaje i autobusy. Podróżujący chcieliby łatwo i szybko nabyć bilety oraz wybrać odpowiednie linie komunikacji miejskiej, aby dotrzeć do celu na czas i bez stresu podczas kontroli biletów.

Istnieje jednak kilka przeszkód, które mogą napotkać:
- Trudność w znalezieniu biletomatu w pobliżu – nie na każdym przystanku znajduje się biletomat.
- Brak gotówki – niektóre biletomaty w tramwajach przyjmują tylko monety.
- Brak znajomości rozkładu jazdy w danym miejscu.
- Trudność w zaplanowaniu trasy, ze względu na szeroki wybór linii i rozbudowany rozkład jazdy.

Użytkownicy transportu publicznego w miastach potrzebują w łatwy sposób zaplanować trasę do miejsca docelowego, sprawdzić rozkład jazdy na danym przystanku i uzyskać informację o ewentualnych opóźnieniach. Dzięki aplikacji **EasyTicket** podróżujący mogą w prosty sposób, korzystając z intuicyjnych przycisków i menu głównego:
- Nabywać bilety z możliwością wyboru przysługującej im ulgi.
- Pokazywać zakupione bilety do kontroli w formie kodu QR.
- Sprawdzać rozkład jazdy.
- Wyszukiwać interesujące połączenia komunikacyjne.
- Przeglądać oraz aktywować swoje bilety.
- Zamrażać i reaktywować bilety długoterminowe.
- Generować faktury za bilety w formie plików PDF.


Projekt **EasyTicket** został więc stworzony jako rozwiązanie ułatwiające zakup, zarządzanie i korzystanie z biletów komunikacji miejskiej w sposób wygodny i intuicyjny.
---

## Technologie

Aplikacja **EasyTicket** została stworzona głównie przy pomocy frameworka `React`, z wykorzystaniem 
różnych bibliotek i narzędzi, takich jak `Wouter`, `Geojson`, `Leaflet`, `jsPDF`, `react-i18next`

---

## Funkcjonalności aplikacji

1. **Zakup biletów**
   - Użytkownik może zakupić bilety poprzez aplikację.
   - Możliwość wyboru biletu na określony czas oraz wybór ewentualnych ulg.
   - Po wyborze rodzaju biletu, użytkownik może wybrać rodzaj płatności, po czym zostaje 
   przekierowany do zewnętrznęj strony, gdzie finalizuje płatność
   - Następnie użytkownik dokonuje wyboru, czy bilet ma być aktywowany natychmiast, czy odłożony na 
   później - do sekcji "Moje bilety", gdzie użytkownik może zarządzać swoimi biletami.

2. **Aktywacja biletów**
   - Użytkownik może aktywować dowolny bilet, znadujący się w bazie biletów "Moje bilety".
   - Po aktywacji biletu, uzytkownik moze wyświetlić jego szczegóły oraz pokazać kod QR do kontroli
   poprzez kliknięcie "Pokaż bilet".

3. **Przeglądanie i zarządzanie biletami**
   - Podział biletów na:
     - **Aktywne** – bilety w użyciu, z minutnikiem czasu ważności.
     - **Posiadane** – bilety zakupione, ale nieaktywne, które w kazdej chwili mogą zostać aktywowane
     - **Historia biletów** – bilety, które wygasły.
   - Możliwość ponownej aktywacji zamrożonych biletów długoterminowych, które po zamrozeniu trafiają do sekcji 
   "Posiadane bilety"
   - Każdy bilet w swojej sekcji ma możliwość ponownego zakupu takiego biletu o tych samych parametrach.

4. **Zamrażanie biletów**
   - Bilety długoterminowe (np. miesięczne, 2 mięsięczne) można zamrozić i aktywować ponownie później
   - System przechowuje czas pozostały do końca ważności biletu i uwzględnia go po reaktywacji.
   - Kazdy bilet z ważnością na okres czasu powyżej miesiąca, moze być zamrożony, ale tylko raz. Ilość
   dostępnych zamrożeń widoczna jest po wejściu do sekcji z kodem QR i szczegółami biletu.

5. **Generowanie potwierdzeń zakupu**
   - Po zakupie biletu użytkownik może wygenerować potwierdzenie w formacie PDF, wchodząc w sekcję szczegółów biletu.
   - Faktury zawierają szczegóły dotyczące biletu, ceny oraz daty zakupu.

6. **Wyszukiwanie trasy**
   - W sekcji "Wyszukaj trasę" użytkownik może zaplanować trasę z przystanku do przystanku. Po wybraniu docelowych przystanków,
   użytkownik otrzymuje propozycję tras do wyboru, oraz może wybrać najbardziej pasującą mu opcję - "Najszybciej", "Najmniej przesiadek",
   "Najmniej chodzenia". W prawym górnym rogu użytkownik ma możliwość edycji wyglądu mapy.

7. **Rozkład Jazdy**
   - W sekcji rozkład jazdy użytkownik ma możliwość przeglądania przystanków na mapie i okolicach Krakowa. 
   Jest to kompletna baza przystanków, w której użytkownik może przeglądać szczegółowo, gdzie znajduje się dany przystanek na mapie, 
   jakie linie realizują kursy przez ten przystanek, oraz dla każdej linii użytkownik może zobaczyć dokładnie, 
   przez jakie przystanki będzie się przemieszczać pojazd komunikacji miejskiej odpowiadający wyświetlanej linii. 
   Oczywiście dla każdego przystanku użytkownik jest w stanie wyświetlić dokładny, całodobowy rozkład jazdy w formie listy jak i tabeli
   odjazdów, oraz dynamicznie przechodzić pomiędzy liniami jak i przystankami.

7. **Możliwość dynamicznej edycji wyglądu**
   - Użytkownicy na górnym pasku mają przyciski, dzięki którym mogą:
     - Dostosowywać rozmiar czcionki (3 rozmiary dostępne)
     - Dostosowywać kontrast kolorów strony (3 kontrasty dostępne)
     - Zmiana języka systemu 

---

## Instalacja i uruchomienie

Aby uruchomić projekt lokalnie, wykonaj następujące kroki:

### **1. Klonowanie repozytorium**
```bash
 git clone https://github.com/TwojeRepozytorium/EasyTicket.git
 cd easy-ticket
```

### **2. Instalacja zależności**
```bash
npm install
```

### **3. Uruchomienie aplikacji**
```bash
npm start
```

Aplikacja zostanie uruchomiona na `http://localhost:3000/`.

---

