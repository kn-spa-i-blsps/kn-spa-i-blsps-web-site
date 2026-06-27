# KN SPA i BLSPS — strona koła naukowego v2

Strona z panelem administracyjnym. Koniec z ręcznym edytowaniem `data.js` i pushowaniem na GitHub przy każdej zmianie.

## Co się zmieniło

- **Nowa szybka strona** (`site/`) — design inspirowany BlueSpark, bez Tailwind CDN, preconnect do Cloudinary, lazy loading zdjęć
- **Panel admin** pod `/admin` — logowanie, dodawanie/edycja artykułów, członków, projektów, partnerów
- **API + SQLite** — treść w bazie danych, zmiany widoczne od razu bez pusha
- **Markdown w artykułach** — przy tworzeniu artykułu wybierz format „Markdown” dla ładniejszej treści
- **BlueSpark** — bez zmian, nadal pod `/bluespark/`

## Uruchomienie lokalnie

```bash
npm install
npm start
```

- Strona: http://localhost:3000
- Admin: http://localhost:3000/admin
- Login: `admin`, hasło domyślne: `kn-admin-2026`
- Na Renderze ustaw `ADMIN_PASSWORD` — po redeployu synchronizuje się z bazą
- Awaryjny reset: `ADMIN_PASSWORD=nowe-haslo npm run reset-admin`

## Deploy na Render

1. Zmień typ serwisu ze **Static Site** na **Web Service** (albo użyj `render.yaml`)
2. **Root Directory:** zostaw puste (repo root, nie `site/`)
3. Ustaw zmienne środowiskowe:
   - `NODE_VERSION` — `22` (wymagane; Node 26 + stary better-sqlite3 nie zbuduje się)
   - `ADMIN_PASSWORD` — twoje bezpieczne hasło
   - `ADMIN_USERNAME` — opcjonalnie, domyślnie `admin`
   - `JWT_SECRET` — losowy długi string
3. Dodaj **Persistent Disk** (1 GB) zamontowany na `/opt/render/project/data` — żeby baza SQLite przetrwała restarty

## Zdjęcia

**W panelu admin** (`/admin`) możesz **wgrać plik z dysku** przy artykule, członku lub projekcie — bez logowania na cloudinary.com.

- **Bez kluczy Cloudinary:** pliki zapisują się na serwerze (`/uploads/...`) — wymaga **Persistent Disk** na Render (`DATA_DIR`)
- **Z kluczami** (`CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`): upload idzie na Cloudinary (HEIC jest automatycznie konwertowany przez `f_auto`)

Obsługiwane rozszerzenia: **jpg, jpeg, heic, heif, png, webp, avif, gif, bmp, tiff, svg** — na Cloudinary z `f_auto` (w tym HEIC z iPhone).

Ręczny upload na [cloudinary.com](https://cloudinary.com) nadal działa — wg ścieżek poniżej.

| Typ | Ścieżka |
|-----|---------|
| Artykuł — okładka | `kn-spa-i-blsps/news/{id}/main.{ext}` |
| Artykuł — galeria | `kn-spa-i-blsps/news/{id}/1.{ext}`, `2.{ext}`... |
| Członek | `kn-spa-i-blsps/members/{id}.{ext}` |
| Projekt | `kn-spa-i-blsps/projects/{id}/main.{ext}` |
| Hero slider | `kn-spa-i-blsps/main/1.{ext}`, `2.{ext}`... |

`{ext}` = jpg, jpeg, **heic**, heif, png, webp, avif, gif, bmp, tiff, svg

## Migracja danych

Przy pierwszym uruchomieniu serwer automatycznie importuje treść z `src/data.js` do SQLite.

Ponowna migracja (nadpisuje bazę!):

```bash
npm run migrate -- --force
```

## Stare URL-e

Stare linki (`article.html?id=...`, `project.html?id=...`) nadal działają jako fallback.

Nowe czyste URL-e:
- `/news/{id}` — artykuł
- `/project/{id}` — projekt
- `/member/{id}` — profil członka

## Struktura

```
site/          — nowa strona (szybka)
admin/         — panel administracyjny
server/        — Express API + SQLite
bluespark/     — pre-built Astro (bez zmian)
src/data.js    — legacy źródło (importowane przy migracji)
data/site.db   — baza SQLite (gitignored)
```
