# TennisShop - Documentazione del Progetto

## Struttura del Progetto

### Componenti Principali
1. `Home` (src/pages/Home/Home.jsx)
   - Componente principale che gestisce la landing page
   - Integra tutti i componenti principali
   - Gestisce il carosello principale e le offerte

2. `Navbar` (src/components/Navbar)
   - Gestisce la navigazione principale
   - Integra la funzionalità di ricerca
   - Gestisce il carrello
   - Utilizza NavbarSlice per la gestione dello stato

3. `Categories` (src/components/Categorie)
   - Visualizza i prodotti in formato griglia o carosello
   - Gestisce filtri per brand, categoria, prezzo
   - Supporta visualizzazione responsive
   - Integra la funzionalità "Buy Now"

4. `ProductDetails` (src/components/ProductsDetails)
   - Mostra i dettagli completi del prodotto
   - Gestisce la visibilità tramite ProductDetailsSlice
   - Integra con il sistema di navigazione

5. `SingleProduct` (src/components/SingleProduct)
   - Visualizzazione dettagliata di un singolo prodotto
   - Gestisce lo stato del prodotto selezionato
   - Integrato con il sistema di navigazione

6. `BrandSection` (src/components/BrandSection)
   - Componente riutilizzabile per le sezioni dei brand
   - Integra il componente Categories con filtri specifici per brand

7. `SideBar` (src/components/Slidebar)
   - Menu laterale per la navigazione mobile
   - Gestito da SideBarSlice per la visibilità

### Gestione dello Stato (Redux)
1. Slices:
   - `HomeSlice`: Gestisce la visibilità della home
   - `NavbarSlice`: Gestisce tab attivo e ricerca
   - `ProductDetailsSlice`: Controlla la visibilità dei dettagli
   - `SingleProductSlice`: Gestisce prodotto selezionato e visibilità
   - `SideBarSlice`: Controlla la visibilità della sidebar

2. Pattern di Visibilità:
   - Utilizzo di un pattern comune per la gestione della visibilità
   - Implementato in visibilitySlice.js
   - Azioni standardizzate: show, hide, toggle

### Struttura dei Dati
1. `products.js` (src/data)
   - Database locale dei prodotti
   - Struttura: id, nome, prezzo, categoria, brand, etc.

2. `images.js` (src/data)
   - Gestione centralizzata delle immagini
   - Organizzate per: banner, categorie, brand, loghi

3. `constants.js` (src/config)
   - Configurazioni globali
   - Breakpoints responsive
   - Valori predefiniti
   - Categorie e brand

### Custom Hooks
1. `useResponsiveCards`
   - Gestisce il numero di card visibili in base alla viewport
   - Utilizzato nel componente Categories

2. `useCountdown`
   - Gestisce il timer per le offerte
   - Utilizzato nella sezione offerte della Home

## Flusso di Navigazione
1. Home Page
   - Banner principale (carosello automatico)
   - Categorie principali
   - Prodotti consigliati
   - Sezioni brand specifiche
   - Offerte del giorno
   - Form di contatto

2. Prodotti
   - Accesso da:
     * Categorie nella Home
     * Navigazione principale
     * Link dei brand
   - Filtri disponibili per:
     * Categoria
     * Brand
     * Prezzo
     * Promozioni

3. Dettaglio Prodotto
   - Accesso da:
     * Click su prodotto nella griglia
     * "Buy Now" button
   - Mostra:
     * Immagini prodotto
     * Descrizione dettagliata
     * Prezzo e disponibilità
     * Opzioni di acquisto

## Responsive Design
- Breakpoints principali:
  * Mobile: <= 582px
  * Tablet: <= 880px
  * Desktop Small: <= 1176px
  * Desktop Large: <= 1472px
- Adattamento automatico del layout
- Sidebar per navigazione mobile
- Numero di card responsive

## Ottimizzazioni
1. Componenti Riutilizzabili
   - BrandSection per sezioni brand
   - ProductCard per visualizzazione prodotti
   - PromoCard per offerte speciali

2. Gestione Stato Centralizzata
   - Pattern comune per visibilità
   - Slices Redux organizzati
   - Costanti centralizzate

3. Performance
   - Lazy loading delle immagini
   - Componenti ottimizzati
   - Gestione efficiente dello stato

## Tecnologie Utilizzate
- React
- Redux Toolkit
- TailwindCSS
- DaisyUI
- Vite

## Struttura delle Directory

```
/src
├── /assets                    # Risorse statiche
│   ├── /images               # Immagini del sito
│   ├── /logos               # Loghi dei brand
│   └── /icons               # Icone dell'interfaccia
│
├── /components               # Componenti riutilizzabili
│   ├── /Navbar              # ✅ COMPLETATO
│   │   ├── Navbar.jsx
│   │   └── NavbarSlice.js
│   │
│   ├── /Footer             # ✅ COMPLETATO
│   │   └── Footer.jsx
│   │
│   ├── /ProductCard        # ⏳ DA IMPLEMENTARE
│   │   └── ProductCard.jsx
│   │
│   ├── /ProductGrid        # 🔄 IN PROGRESS
│   │   └── ProductGrid.jsx
│   │
│   ├── /ProductFilter      # ✅ COMPLETATO
│   │   └── ProductFilter.jsx
│   │
│   ├── /CartDrawer         # ⏳ DA IMPLEMENTARE
│   │   └── CartDrawer.jsx
│   │
│   ├── /BrandSection       # ✅ COMPLETATO
│   │   └── BrandSection.jsx
│   │
│   └── /Categories         # ✅ COMPLETATO
│       └── Categories.jsx
│
├── /pages                   # Pagine dell'applicazione
│   ├── /Home               # ✅ COMPLETATO
│   │   └── Home.jsx
│   │
│   ├── /ProductDetail      # ✅ COMPLETATO
│   │   └── ProductDetail.jsx
│   │
│   ├── /Checkout          # ⏳ DA IMPLEMENTARE
│   │   └── Checkout.jsx
│   │
│   ├── /Cart              # ⏳ DA IMPLEMENTARE
│   │   └── Cart.jsx
│   │
│   └── /NotFound          # ⏳ DA IMPLEMENTARE
│       └── NotFound.jsx
│
├── /data                   # Gestione dati
│   ├── products.js        # ✅ COMPLETATO - Database prodotti
│   ├── images.js          # ✅ COMPLETATO - Gestione immagini
│   └── constants.js       # ✅ COMPLETATO - Configurazioni
│
├── /hooks                  # Custom hooks
│   ├── useCountdown.js    # ✅ COMPLETATO
│   ├── useResponsiveCards.js # ✅ COMPLETATO
│   └── useCart.js         # ⏳ DA IMPLEMENTARE
│
├── /context               # Context API
│   └── CartContext.jsx    # ⏳ DA IMPLEMENTARE
│
├── /redux                 # Gestione stato Redux
│   ├── store.js          # ✅ COMPLETATO
│   └── /slices           # ✅ COMPLETATO
│       ├── homeSlice.js
│       ├── navbarSlice.js
│       └── sidebarSlice.js
│
└── App.jsx               # ✅ COMPLETATO

Legenda:
✅ COMPLETATO      - Componente implementato e funzionante
🔄 IN PROGRESS    - Componente in fase di sviluppo
⏳ DA IMPLEMENTARE - Componente da sviluppare
```

### Priorità di Sviluppo
1. Sistema Carrello
   - CartDrawer.jsx
   - useCart.js
   - CartContext.jsx
   - Cart.jsx

2. Processo di Checkout
   - Checkout.jsx
   - Integrazione pagamenti
   - Gestione ordini

3. Gestione Errori
   - NotFound.jsx
   - Gestione errori API
   - Validazione form