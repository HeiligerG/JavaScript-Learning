# Inhaltsverzeichnis - Routing & State in Vue.js

1. [**Routing mit Vue Router**](#routing-mit-vue-router)
   - Grundkonzept des Routings verstehen
   - Router einrichten
   - Navigation implementieren
   - Routenparameter nutzen
   - Fortgeschrittene Konzepte anwenden

2. [**State Management mit Vuex/Pinia**](#state-management-mit-vuexpinia)
   - Notwendigkeit für State Management erkennen
   - Pinia einrichten
   - Mit Pinia-Stores arbeiten
   - Vuex als Alternative
   - Komplexere State-Management-Strategien

3. [**Composition API**](#composition-api)
   - Grundkonzept der Composition API verstehen
   - Reaktivität mit ref und reactive
   - Berechnete Eigenschaften und Watcher
   - Lebenszyklus-Hooks in der Composition API
   - Wiederverwendbare Logik mit Composables

4. [**Integration von Routing, State Management und Composition API**](#integration-von-routing-state-management-und-composition-api)
   - Vollständiges Beispiel
   - Gedankengang bei der Integration

## *Routing mit Vue Router*

Dies ist der Gedankengang speziell für die Verwendung von Vue Router in Vue.js:

1. **Grundkonzept des Routings verstehen**: 
   - Was ist Client-Side-Routing? Navigation zwischen "Seiten" ohne Server-Anfragen
   - Single-Page-Application (SPA) bleibt im Browser, wechselt nur Komponenten
   - Vue Router verbindet URLs mit Komponenten und verwaltet die Navigation
   - Beispiel: `/users` zeigt eine Benutzerliste, `/users/123` zeigt Benutzerdetails

2. **Router einrichten**:
   - Installation: `npm install vue-router@4` (für Vue 3)
   - Router-Instanz erstellen und Routen definieren
   - Mit der Vue-App verbinden
   - Beispiel:
     ```javascript
     // router/index.js
     import { createRouter, createWebHistory } from 'vue-router'
     import HomeView from '../views/HomeView.vue'
     import AboutView from '../views/AboutView.vue'
     
     const router = createRouter({
       history: createWebHistory(import.meta.env.BASE_URL),
       routes: [
         {
           path: '/',
           name: 'home',
           component: HomeView
         },
         {
           path: '/about',
           name: 'about',
           component: AboutView
         }
       ]
     })
     
     export default router
     
     // main.js
     import { createApp } from 'vue'
     import App from './App.vue'
     import router from './router'
     
     const app = createApp(App)
     app.use(router)
     app.mount('#app')
     ```

3. **Navigation implementieren**:
   - Deklarativ mit `<router-link>` für Links
   - Programmgesteuert mit `router.push()`, `router.replace()` oder `router.go()`
   - Router-View für das Anzeigen der aktuellen Komponente
   - Beispiel:
     ```html
     <template>
       <div>
         <nav>
           <router-link to="/">Home</router-link>
           <router-link to="/about">About</router-link>
           <button @click="navigateToUsers">Users</button>
         </nav>
         
         <!-- Hier wird die Komponente der aktuellen Route angezeigt -->
         <router-view />
       </div>
     </template>
     
     <script setup>
     import { useRouter } from 'vue-router'
     
     const router = useRouter()
     
     function navigateToUsers() {
       router.push('/users')
     }
     </script>
     ```

4. **Routenparameter nutzen**:
   - Dynamische Segmente in Routenpfaden mit `:paramName`
   - Zugriff auf Parameter über `$route.params` oder `useRoute()`
   - Reaktion auf Parameteränderungen
   - Beispiel:
     ```javascript
     // Router-Definition
     const routes = [
       {
         path: '/users/:id',
         name: 'userDetails',
         component: UserDetails
       }
     ]
     
     // In der Komponente
     <script setup>
     import { useRoute, useRouter } from 'vue-router'
     import { ref, onMounted, watch } from 'vue'
     
     const route = useRoute()
     const router = useRouter()
     const user = ref(null)
     
     // Benutzer laden basierend auf der ID
     async function loadUser(id) {
       try {
         const response = await fetch(`/api/users/${id}`)
         user.value = await response.json()
       } catch (error) {
         console.error('Fehler beim Laden des Benutzers:', error)
         router.replace('/users') // Zurück zur Benutzerliste bei Fehler
       }
     }
     
     // Beim ersten Laden
     onMounted(() => {
       loadUser(route.params.id)
     })
     
     // Wenn sich die Parameter ändern (z.B. von /users/1 zu /users/2)
     watch(() => route.params.id, (newId) => {
       loadUser(newId)
     })
     </script>
     ```

5. **Fortgeschrittene Konzepte anwenden**:
   - Verschachtelte Routen für komplexe Layouts
   - Route-Guards für Authentifizierung und Berechtigungen
   - Lazy Loading von Routen für bessere Performance
   - Beispiel:
     ```javascript
     const routes = [
       {
         path: '/dashboard',
         component: DashboardLayout,
         meta: { requiresAuth: true },
         children: [
           { path: '', component: DashboardHome },
           { path: 'profile', component: UserProfile },
           { path: 'settings', component: UserSettings }
         ]
       },
       {
         path: '/products',
         component: () => import('./views/ProductList.vue') // Lazy loading
       }
     ]
     
     // Route-Guard für Authentifizierung
     router.beforeEach((to, from, next) => {
       const isAuthenticated = checkAuthStatus()
       
       if (to.meta.requiresAuth && !isAuthenticated) {
         next('/login')
       } else {
         next()
       }
     })
     ```

## *State Management mit Vuex/Pinia*

Dies ist der Gedankengang speziell für die Verwendung von State Management in Vue.js:

1. **Notwendigkeit für State Management erkennen**: 
   - Wann wird zentrales State Management benötigt?
   - Anzeichen: Prop-Drilling durch viele Ebenen, komplexe Datenaustausche
   - Vuex (klassisch) vs. Pinia (moderner Ansatz für Vue 3)
   - Beispiel: Eine E-Commerce-App mit Warenkorb, Benutzereinstellungen, Produkten

2. **Pinia einrichten (empfohlen für neue Vue 3 Projekte)**:
   - Installation: `npm install pinia`
   - Pinia mit der Vue-App verbinden
   - Stores definieren
   - Beispiel:
     ```javascript
     // main.js
     import { createApp } from 'vue'
     import { createPinia } from 'pinia'
     import App from './App.vue'
     
     const app = createApp(App)
     app.use(createPinia())
     app.mount('#app')
     
     // stores/counter.js
     import { defineStore } from 'pinia'
     
     export const useCounterStore = defineStore('counter', {
       state: () => ({
         count: 0,
         lastChanged: null
       }),
       
       getters: {
         doubleCount: (state) => state.count * 2,
         isPositive: (state) => state.count > 0
       },
       
       actions: {
         increment() {
           this.count++
           this.lastChanged = new Date()
         },
         async fetchInitialCount() {
           const response = await fetch('/api/counter')
           const data = await response.json()
           this.count = data.value
         }
       }
     })
     ```

3. **Mit Pinia-Stores arbeiten**:
   - Stores in Komponenten importieren und verwenden
   - State lesen und ändern
   - Aktionen aufrufen
   - Beispiel:
     ```javascript
     <script setup>
     import { useCounterStore } from '@/stores/counter'
     import { storeToRefs } from 'pinia'
     
     // Store abrufen
     const counterStore = useCounterStore()
     
     // State und Getters reaktiv destructuring (mit storeToRefs)
     const { count, lastChanged } = storeToRefs(counterStore)
     const { doubleCount, isPositive } = counterStore
     
     // Aktionen aufrufen
     function handleIncrement() {
       counterStore.increment()
     }
     
     // Initialisierung
     counterStore.fetchInitialCount()
     </script>
     
     <template>
       <div>
         <p>Aktueller Zähler: {{ count }}</p>
         <p>Doppelter Wert: {{ doubleCount }}</p>
         <p v-if="lastChanged">Zuletzt geändert: {{ lastChanged }}</p>
         <button @click="handleIncrement">Erhöhen</button>
       </div>
     </template>
     ```

4. **Vuex (alternative für bestehende Projekte)**:
   - Module für strukturierten State
   - Mutations für synchrone Änderungen
   - Actions für asynchrone Operationen
   - Beispiel:
     ```javascript
     // store/index.js
     import { createStore } from 'vuex'
     
     export default createStore({
       state: {
         count: 0,
         lastChanged: null
       },
       
       getters: {
         doubleCount: (state) => state.count * 2
       },
       
       mutations: {
         INCREMENT(state) {
           state.count++
           state.lastChanged = new Date()
         },
         SET_COUNT(state, value) {
           state.count = value
         }
       },
       
       actions: {
         increment({ commit }) {
           commit('INCREMENT')
         },
         async fetchInitialCount({ commit }) {
           const response = await fetch('/api/counter')
           const data = await response.json()
           commit('SET_COUNT', data.value)
         }
       }
     })
     ```

5. **Komplexere State-Management-Strategien**:
   - Modularisierung des Stores für verschiedene Funktionsbereiche
   - Persistenz mit localStorage oder IndexedDB
   - Optimistische UI-Updates für bessere Benutzererfahrung
   - Beispiel (Pinia mit Modularisierung und Persistenz):
     ```javascript
     // stores/user.js
     import { defineStore } from 'pinia'
     
     export const useUserStore = defineStore('user', {
       state: () => ({
         profile: null,
         preferences: {
           theme: 'light',
           notifications: true
         }
       }),
       
       actions: {
         async login(credentials) {
           // Login-API-Aufruf
           const response = await fetch('/api/login', {
             method: 'POST',
             body: JSON.stringify(credentials)
           })
           
           const user = await response.json()
           this.profile = user
           
           // Benutzereinstellungen im localStorage speichern
           localStorage.setItem('user-preferences', JSON.stringify(this.preferences))
         },
         
         logout() {
           this.profile = null
         },
         
         loadPreferences() {
           const saved = localStorage.getItem('user-preferences')
           if (saved) {
             this.preferences = JSON.parse(saved)
           }
         }
       }
     })
     ```

## *Composition API*

Dies ist der Gedankengang speziell für die Verwendung der Composition API in Vue.js:

1. **Grundkonzept der Composition API verstehen**: 
   - Was ist die Composition API? Alternativ zur Options API (data, methods, computed, ...)
   - Vorteile: Bessere Codeorganisation, Wiederverwendbarkeit, TypeScript-Unterstützung
   - Zwei Hauptansätze: `setup()` Funktion oder `<script setup>`-Syntax (empfohlen)
   - Beispiel des Unterschieds:
     ```javascript
     // Options API
     export default {
       data() {
         return { count: 0 }
       },
       methods: {
         increment() { this.count++ }
       }
     }
     
     // Composition API mit setup()
     export default {
       setup() {
         const count = ref(0)
         function increment() { count.value++ }
         
         return { count, increment }
       }
     }
     
     // Composition API mit <script setup>
     <script setup>
     const count = ref(0)
     function increment() { count.value++ }
     </script>
     ```

2. **Reaktivität mit ref und reactive**:
   - `ref()`: Macht primitive Werte reaktiv (erfordert `.value` im JavaScript)
   - `reactive()`: Macht Objekte reaktiv (direkter Zugriff ohne `.value`)
   - Reaktivität verstehen und Fallstricke vermeiden
   - Beispiel:
     ```javascript
     <script setup>
     import { ref, reactive } from 'vue'
     
     // Primitive Werte mit ref
     const count = ref(0)
     const name = ref('Max')
     
     // Komplexe Objekte mit reactive
     const user = reactive({
       firstName: 'Max',
       lastName: 'Mustermann',
       age: 30
     })
     
     // Mit Werten arbeiten
     function updateUser() {
       // Bei ref ist .value nötig
       count.value++
       name.value = 'Moritz'
       
       // Bei reactive ist direkter Zugriff möglich
       user.age = 31
       user.firstName = 'Moritz'
     }
     </script>
     ```

3. **Berechnete Eigenschaften und Watcher**:
   - `computed()`: Für abgeleitete Werte, die von reaktiven Daten abhängen
   - `watch()` und `watchEffect()`: Für Seiteneffekte bei Datenänderungen
   - Wann was verwenden? computed für Datenumwandlung, watch für Reaktionen
   - Beispiel:
     ```javascript
     <script setup>
     import { ref, computed, watch, watchEffect } from 'vue'
     
     const firstName = ref('Max')
     const lastName = ref('Mustermann')
     
     // Computed property
     const fullName = computed(() => {
       return `${firstName.value} ${lastName.value}`
     })
     
     // Watch - reagiert nur, wenn spezifische Werte sich ändern
     watch(firstName, (newVal, oldVal) => {
       console.log(`Name geändert von ${oldVal} zu ${newVal}`)
     })
     
     // WatchEffect - wird initial ausgeführt und bei jeder Änderung seiner Abhängigkeiten
     watchEffect(() => {
       document.title = `${fullName.value}'s Profil`
       // Automatisch verfolgte Abhängigkeit: fullName -> firstName, lastName
     })
     </script>
     ```

4. **Lebenszyklus-Hooks in der Composition API**:
   - Lebenszyklus-Hooks als eigenständige Funktionen
   - `onMounted`, `onUpdated`, `onBeforeUnmount`, etc.
   - Asynchrone Operationen in Lifecycle-Hooks
   - Beispiel:
     ```javascript
     <script setup>
     import { ref, onMounted, onBeforeUnmount } from 'vue'
     
     const data = ref(null)
     const timer = ref(null)
     
     onMounted(async () => {
       // Daten beim Mounten laden
       const response = await fetch('/api/data')
       data.value = await response.json()
       
       // Timer starten
       timer.value = setInterval(() => {
         console.log('Timer läuft noch')
       }, 1000)
     })
     
     onBeforeUnmount(() => {
       // Aufräumen, wenn die Komponente entfernt wird
       if (timer.value) {
         clearInterval(timer.value)
       }
     })
     </script>
     ```

5. **Wiederverwendbare Logik mit Composables**:
   - Composables sind Funktionen, die reaktive Logik kapseln
   - Konvention: Namen beginnen mit "use" (z.B. `useCounter`)
   - Ermöglichen echte Codewiederverwendung über Komponenten hinweg
   - Beispiel:
     ```javascript
     // composables/useCounter.js
     import { ref, computed } from 'vue'
     
     export function useCounter(initialValue = 0) {
       const count = ref(initialValue)
       
       const doubleCount = computed(() => count.value * 2)
       
       function increment() {
         count.value++
       }
       
       function decrement() {
         count.value--
       }
       
       function reset() {
         count.value = initialValue
       }
       
       return {
         count,
         doubleCount,
         increment,
         decrement,
         reset
       }
     }
     
     // In einer Komponente verwenden
     <script setup>
     import { useCounter } from '@/composables/useCounter'
     
     const { count, doubleCount, increment, reset } = useCounter(10)
     </script>
     ```

## *Integration von Routing, State Management und Composition API*

Ein vollständiges Beispiel, das alle drei Konzepte integriert:

```javascript
// stores/products.js
import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null
  }),
  
  getters: {
    productById: (state) => (id) => {
      return state.products.find(p => p.id === id)
    },
    totalProducts: (state) => state.products.length
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch('/api/products')
        this.products = await response.json()
      } catch (err) {
        this.error = 'Fehler beim Laden der Produkte: ' + err.message
      } finally {
        this.loading = false
      }
    },
    
    async addToCart(productId) {
      // Logik zum Hinzufügen eines Produkts zum Warenkorb
    }
  }
})

// views/ProductList.vue
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { storeToRefs } from 'pinia'

const router = useRouter()
const productStore = useProductStore()

// Destrukturierte reaktive Werte aus dem Store
const { products, loading, error } = storeToRefs(productStore)

// Produkte beim Laden der Komponente abrufen
onMounted(() => {
  productStore.fetchProducts()
})

// Navigation zu Produktdetails
function viewProductDetails(productId) {
  router.push(`/products/${productId}`)
}
</script>

<template>
  <div class="product-list">
    <h1>Unsere Produkte</h1>
    
    <!-- Ladezustand anzeigen -->
    <div v-if="loading" class="loading">
      Produkte werden geladen...
    </div>
    
    <!-- Fehlerbehandlung -->
    <div v-else-if="error" class="error">
      {{ error }}
      <button @click="productStore.fetchProducts">Erneut versuchen</button>
    </div>
    
    <!-- Produktliste anzeigen -->
    <div v-else-if="products.length > 0" class="products-grid">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="product-card"
        @click="viewProductDetails(product.id)"
      >
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }} €</p>
        <button @click.stop="productStore.addToCart(product.id)">
          In den Warenkorb
        </button>
      </div>
    </div>
    
    <!-- Keine Produkte verfügbar -->
    <div v-else class="no-products">
      Keine Produkte verfügbar.
    </div>
  </div>
</template>

// views/ProductDetail.vue
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

// Produkt-ID aus der Route
const productId = computed(() => route.params.id)

// Produkt aus dem Store abrufen
const product = computed(() => {
  return productStore.productById(productId.value)
})

// Produkte laden, falls noch nicht geschehen
onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
  
  // Zurück zur Produktliste navigieren, wenn das Produkt nicht gefunden wurde
  if (!product.value) {
    router.replace('/products')
  }
})

// Reagieren, wenn sich die Produkt-ID ändert
watch(productId, () => {
  if (productStore.products.length > 0 && !product.value) {
    router.replace('/products')
  }
})
</script>

<template>
  <div v-if="product" class="product-detail">
    <button @click="router.back()" class="back-button">
      Zurück
    </button>
    
    <div class="product-image">
      <img :src="product.image" :alt="product.name">
    </div>
    
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <p class="price">{{ product.price }} €</p>
      <p class="description">{{ product.description }}</p>
      
      <button @click="productStore.addToCart(product.id)" class="add-to-cart">
        In den Warenkorb
      </button>
    </div>
  </div>
</template>
```

Der Gedankengang bei der Integration dieser Konzepte in der Praxis wäre:
*"Ich entwickle eine E-Commerce-Anwendung, die verschiedene Seiten für Produktlisten, Produktdetails und den Warenkorb benötigt. Hierfür setze ich auf Vue Router für die Navigation zwischen diesen Seiten. Den Anwendungszustand (wie Produkte und Warenkorbinhalte) verwalte ich zentral mit Pinia, damit diese Daten überall in der Anwendung verfügbar sind. Mit den Stores kann ich Produkte abrufen, zum Warenkorb hinzufügen und den Bestellprozess verwalten. Innerhalb meiner Komponenten nutze ich die Composition API, um den Code besser zu strukturieren und wiederverwendbare Logik zu extrahieren. Dynamische Routen helfen mir, Produktdetailseiten anzuzeigen, während ich reaktive Daten aus dem Store mit storeToRefs in meine Komponenten integriere. Das Zusammenspiel dieser drei Konzepte ermöglicht eine saubere, wartbare und leistungsfähige Anwendung."*