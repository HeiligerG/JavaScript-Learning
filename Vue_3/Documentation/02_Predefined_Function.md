# Inhaltsverzeichnis - Predifined Functions in vue.js

## Predefined Functions

1. [**Lifecycle-Hooks**](#lifecycle-hooks)
   - Identifizieren des richtigen Zeitpunkts
   - Passenden Hook auswählen
   - Syntax anwenden
   - Kompositionsprinzip verstehen
   - Anwendungsfälle berücksichtigen
   - Anwendungsbeispiel

2. [**Reactivity API**](#reactivity-api)
   - Identifizieren der Datenstruktur
   - Passende Reaktivitätsfunktion auswählen
   - Zugriff auf reaktive Daten verstehen
   - Abgeleitete Werte und Reaktionen definieren
   - Fortgeschrittene Anwendungsfälle berücksichtigen
   - Anwendungsbeispiel

3. [**Komponenten & Mounting**](#komponenten--mounting)
   - Komponentenstruktur definieren
   - Komponentendefinition einrichten
   - Komponenten-API gestalten
   - App-Initialisierung verstehen
   - Fortgeschrittene Techniken berücksichtigen
   - Anwendungsbeispiel

4. [**Provide / Inject**](#provide--inject)
   - Identifizieren von geteilten Daten
   - Datenbereitstellung planen
   - Syntax für `provide()` anwenden
   - Syntax für `inject()` anwenden
   - Provide/Inject-Muster verstehen
   - Anwendungsbeispiel

5. [**Template Refs & DOM Zugriff**](#template-refs--dom-zugriff)
   - Anwendungsfall für direkten DOM-Zugriff identifizieren
   - Template Refs einrichten
   - Komponenten-Kontext verwenden
   - CSS-Integration
   - Timing des DOM-Zugriffs verstehen
   - Anwendungsbeispiel

### *Lifecycle-Hooks*

Dies ist der Gedankengang speziell für die Verwendung von Lifecycle-Hooks in Vue.js:

1. **Identifizieren des richtigen Zeitpunkts**: 
   - An welchem Punkt im Lebenszyklus der Komponente muss der Code ausgeführt werden?
   - Beispiel: "Ich möchte Daten laden, sobald die Komponente im DOM verfügbar ist"

2. **Passenden Hook auswählen**:
   - Welcher Hook passt zum benötigten Zeitpunkt?
   - Wichtigste Hooks verstehen:
     - `onBeforeMount`: Code vor dem Einfügen ins DOM ausführen
     - `onMounted`: Code nach dem Einfügen ins DOM ausführen
     - `onBeforeUpdate`: Code vor einem Re-Rendering ausführen
     - `onUpdated`: Code nach einem Re-Rendering ausführen
     - `onBeforeUnmount`: Code vor dem Entfernen der Komponente ausführen
     - `onUnmounted`: Code nach dem Entfernen der Komponente ausführen

3. **Syntax anwenden**:
   - Hook aus Vue importieren
   - Hook-Funktion im Setup-Block aufrufen und Callback übergeben
   - Beispiel: 
     ```javascript
     import { onMounted } from 'vue'
     
     export default {
       setup() {
         onMounted(() => {
           // Code, der nach dem Mounting ausgeführt wird
         })
       }
     }
     ```

4. **Kompositionsprinzip verstehen**:
   - Hooks können mehrfach und in beliebiger Reihenfolge verwendet werden
   - Sie werden in der Reihenfolge ausgeführt, in der sie definiert wurden
   - Wiederverwendbare Logik kann in eigene Funktionen ausgelagert werden

5. **Anwendungsfälle berücksichtigen**:
   - `onMounted`: API-Aufrufe, DOM-Manipulationen, Initialisierungen
   - `onUpdated`: Reaktion auf Datenänderungen, DOM-Aktualisierungen
   - `onBeforeUnmount`/`onUnmounted`: Aufräumen (Event-Listener entfernen, Timer löschen)
   - Spezial-Hooks (`onErrorCaptured`, `onRenderTracked`) für Debugging/Fehlerbehandlung

Anwendungsbeispiel:
```javascript
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const daten = ref(null)
const ladeStatus = ref('Wird geladen...')
let zeitintervall = null

// Nach dem Mounting: Daten laden und Intervall starten
onMounted(async () => {
  try {
    const antwort = await fetch('https://api.beispiel.de/daten')
    daten.value = await antwort.json()
    ladeStatus.value = 'Daten geladen'
    
    // Starte ein Intervall, das regelmässig etwas aktualisiert
    zeitintervall = setInterval(() => {
      console.log('Aktualisiere...')
    }, 5000)
  } catch (fehler) {
    ladeStatus.value = 'Fehler beim Laden'
    console.error(fehler)
  }
})

// Vor dem Unmounting: Intervall aufräumen
onBeforeUnmount(() => {
  if (zeitintervall) {
    clearInterval(zeitintervall)
    zeitintervall = null
  }
})
</script>

<template>
  <div>
    <p v-if="!daten">{{ ladeStatus }}</p>
    <div v-else>
      <!-- Daten anzeigen -->
    </div>
  </div>
</template>
```

Der Gedankengang in der Praxis wäre: 
*"Ich benötige Daten von einer API, sobald meine Komponente im DOM dargestellt wird. Mit onMounted kann ich genau den richtigen Zeitpunkt dafür abfangen. Ausserdem starte ich ein Intervall für regelmässige Aktualisierungen. Da ich auch weiss, dass ich dieses Intervall bereinigen muss, wenn die Komponente entfernt wird, verwende ich onBeforeUnmount, um dies sicherzustellen. So verhindere ich Speicherlecks und unerwünschte Hintergrundprozesse."*

### *Reactivity API*

Dies ist der Gedankengang speziell für die Verwendung der Reactivity API in Vue.js:

1. **Identifizieren der Datenstruktur**: 
   - Welche Art von Daten soll reaktiv gemacht werden?
   - Primitive Werte (String, Number, Boolean) oder komplexe Strukturen (Objekte, Arrays)?
   - Beispiel: "Ich benötige einen reaktiven Zähler und eine reaktive Benutzerliste"

2. **Passende Reaktivitätsfunktion auswählen**:
   - `ref()`: Für primitive Werte und einfache Objektreferenzen
   - `reactive()`: Für komplexe Objekte und verschachtelte Strukturen
   - Beispiel: `const zähler = ref(0)` und `const benutzer = reactive({ liste: [] })`

3. **Zugriff auf reaktive Daten verstehen**:
   - Bei `ref()`: Über die `.value` Eigenschaft im JavaScript, direkter Zugriff im Template
   - Bei `reactive()`: Direkter Zugriff auf Properties, keine `.value` nötig
   - Beispiel: `zähler.value++` im JS, `{{ zähler }}` im Template

4. **Abgeleitete Werte und Reaktionen definieren**:
   - `computed()`: Für berechnete Werte, die sich automatisch aktualisieren
   - `watch()`: Für benutzerdefinierte Reaktionen auf Datenänderungen
   - `watchEffect()`: Für automatische Effekte, die von reaktiven Abhängigkeiten abhängen

5. **Fortgeschrittene Anwendungsfälle berücksichtigen**:
   - `toRefs()`/`toRef()`: Für die Zerlegung reaktiver Objekte
   - `readonly()`: Für schreibgeschützte Daten (z.B. in Komponenten-Props)
   - Debugging-Helfer: `isRef()`, `isReactive()`, `isReadonly()`, `isProxy()`

Anwendungsbeispiel:
```javascript
<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'

// Reaktive Primitive mit ref()
const zähler = ref(0)
const name = ref('Max')

// Reaktives Objekt mit reactive()
const benutzer = reactive({
  liste: [],
  filterAktiv: false,
  suchbegriff: ''
})

// Berechneter Wert mit computed()
const filtrierteListe = computed(() => {
  if (!benutzer.filterAktiv) return benutzer.liste
  
  return benutzer.liste.filter(person => 
    person.name.toLowerCase().includes(benutzer.suchbegriff.toLowerCase())
  )
})

// Beobachter mit watch()
watch(zähler, (neuerWert, alterWert) => {
  console.log(`Zähler hat sich von ${alterWert} auf ${neuerWert} geändert`)
}, { immediate: true })

// Automatischer Effekt mit watchEffect()
watchEffect(() => {
  document.title = `${name.value}'s Dashboard (${filtrierteListe.value.length} Benutzer)`
})

// Methoden zur Datenmanipulation
function erhöheZähler() {
  zähler.value++
}

function benutzerHinzufügen(neuerBenutzer) {
  benutzer.liste.push(neuerBenutzer)
}
</script>

<template>
  <div>
    <p>Zähler: {{ zähler }}</p>
    <button @click="erhöheZähler">+1</button>
    
    <input v-model="benutzer.suchbegriff" placeholder="Suchen...">
    <input type="checkbox" v-model="benutzer.filterAktiv"> Filter aktivieren
    
    <ul>
      <li v-for="person in filtrierteListe" :key="person.id">
        {{ person.name }}
      </li>
    </ul>
  </div>
</template>
```

Der Gedankengang in der Praxis wäre: 
*"Ich benötige verschiedene reaktive Daten in meiner Komponente. Für einfache Werte wie meinen Zähler verwende ich ref(), während ich für die komplexere Benutzerstruktur reactive() einsetze. Da ich gefilterte Ansichten der Benutzerliste benötige, erstelle ich einen computed()-Wert, der automatisch neu berechnet wird, wenn sich die relevanten Daten ändern. Mit watch() kann ich spezifische Änderungen überwachen und darauf reagieren, während watchEffect() mir hilft, den Dokumenttitel dynamisch zu aktualisieren, wann immer sich relevante Daten ändern. Diese Kombinationen der Reactivity API ermöglichen mir eine klare, deklarative und effiziente Datenverwaltung."*

### *Komponenten & Mounting*

Dies ist der Gedankengang speziell für die Verwendung von Komponenten & Mounting in Vue.js:

1. **Komponentenstruktur definieren**: 
   - Welche Art von Komponente soll erstellt werden?
   - Welche Daten, Props und Events benötigt die Komponente?
   - Beispiel: "Ich benötige eine wiederverwendbare Schaltflächen-Komponente mit anpassbarem Text und Stil"

2. **Komponentendefinition einrichten**:
   - `defineComponent()`: Für TypeScript-Unterstützung und bessere IDE-Integration
   - `defineProps()`: Für die Deklaration von Eigenschaften, die von aussen übergeben werden
   - `defineEmits()`: Für die Deklaration von Events, die nach aussen gesendet werden
   - Beispiel: 
     ```javascript
     const props = defineProps(['label', 'variant'])
     const emits = defineEmits(['click', 'hover'])
     ```

3. **Komponenten-API gestalten**:
   - `defineExpose()`: Für die Freigabe von Methoden und Daten an übergeordnete Komponenten
   - `withDefaults()`: Für die Definition von Standardwerten für Props
   - Beispiel: 
     ```javascript
     defineExpose({ reset, getData })
     const props = withDefaults(defineProps<ButtonProps>(), {
       variant: 'primary',
       size: 'medium'
     })
     ```

4. **App-Initialisierung verstehen**:
   - `createApp()`: Erstellt eine neue Vue-App-Instanz mit einer Root-Komponente
   - `mount()`: Verbindet die App mit einem DOM-Element
   - Beispiel: 
     ```javascript
     const app = createApp(App)
     app.mount('#app')
     ```

5. **Fortgeschrittene Techniken berücksichtigen**:
   - `h()`: Für programmatisches Erzeugen von Komponenten und DOM-Strukturen
   - `resolveComponent()`: Für dynamisches Laden und Nutzen von Komponenten
   - Besonders nützlich für dynamische UIs oder Plugin-Entwicklung

Anwendungsbeispiel:
```javascript
// Button.vue
<script setup>
// Props definieren
const props = defineProps({
  label: String,
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  disabled: Boolean
})

// Events definieren
const emit = defineEmits(['click', 'focus'])

// Interne Zustände und Methoden
const isActive = ref(false)

function handleClick(event) {
  if (!props.disabled) {
    isActive.value = true
    emit('click', event)
    
    // Zurücksetzen des aktiven Zustands nach kurzer Zeit
    setTimeout(() => {
      isActive.value = false
    }, 200)
  }
}

// Methoden für übergeordnete Komponenten freigeben
defineExpose({
  focus: () => {
    document.querySelector('.btn').focus()
    emit('focus')
  }
})
</script>

<template>
  <button 
    class="btn" 
    :class="[`btn-${variant}`, { active: isActive, disabled }]"
    @click="handleClick"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

// main.js (App-Initialisierung)
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')

// Beispiel für dynamische Komponenten mit resolveComponent() und h()
<script setup>
import { h, resolveComponent } from 'vue'

const props = defineProps(['componentType'])

function renderDynamicComponent() {
  const DynamicComponent = resolveComponent(props.componentType)
  return h(DynamicComponent, { 
    // Props und Eigenschaften übergeben
    title: 'Dynamisch erstellte Komponente',
    class: 'dynamic-component'
  })
}
</script>
```

Der Gedankengang in der Praxis wäre: 
*"Ich erstelle eine wiederverwendbare Button-Komponente, die verschiedene Varianten unterstützen soll. Mit defineProps() definiere ich alle Eigenschaften, die von aussen übergeben werden können, wie Label und Variante. Mit defineEmits() lege ich fest, welche Events meine Komponente nach aussen sendet, wie Click- und Focus-Events. Interne Logik wie der aktive Zustand bleibt in der Komponente gekapselt. Für Fälle, in denen die übergeordnete Komponente auf meine Button-Komponente zugreifen muss, verwende ich defineExpose(), um bestimmte Methoden wie focus() freizugeben. Bei der App-Initialisierung verwende ich createApp() und mount(), um meine Anwendung mit dem DOM zu verbinden. Für dynamische Komponenten nutze ich h() und resolveComponent(), was besonders nützlich ist, wenn Komponententypen erst zur Laufzeit bekannt sind."*

### *Provide / Inject*

Dies ist der Gedankengang speziell für die Verwendung von Provide / Inject in Vue.js:

1. **Identifizieren von geteilten Daten**: 
   - Welche Daten sollen über mehrere Komponenten-Ebenen hinweg geteilt werden?
   - Wann ist Provide/Inject besser als Props/Events oder Vuex/Pinia?
   - Beispiel: "Ein Theme oder eine Benutzereinstellung soll in einem ganzen Komponentenbaum verfügbar sein"

2. **Datenbereitstellung planen**:
   - In welcher übergeordneten Komponente sollen die Daten bereitgestellt werden?
   - Sollen die Daten reaktiv sein und Änderungen an alle abhängigen Komponenten weitergeben?
   - Beispiel: Bereitstellung eines Themes in der App- oder Layout-Komponente

3. **Syntax für `provide()` anwenden**:
   - Schlüssel (String oder Symbol) und Wert definieren
   - Entscheiden, ob primitiver Wert oder reaktives Objekt geteilt wird
   - Beispiel: 
     ```javascript
     provide('theme', ref('dark'))
     // oder
     provide('userSettings', reactive({ theme: 'dark', fontSize: 'medium' }))
     ```

4. **Syntax für `inject()` anwenden**:
   - Denselben Schlüssel wie bei `provide()` verwenden
   - Optional einen Standardwert definieren, falls nichts bereitgestellt wurde
   - Beispiel: 
     ```javascript
     const theme = inject('theme', ref('light'))
     // oder
     const userSettings = inject('userSettings')
     ```

5. **Provide/Inject-Muster verstehen**:
   - Unidirektionaler Datenfluss von oben nach unten
   - Kann zum "Prop-Drilling" über viele Ebenen vermeiden
   - Gut für appweite Konfigurationen, Services oder Funktionen geeignet

Anwendungsbeispiel:
```javascript
// App.vue (Übergeordnete Komponente)
<script setup>
import { ref, provide, readonly } from 'vue'

// Reaktiver Zustand, der geteilt werden soll
const theme = ref('light')
const fontSize = ref('medium')

// Methoden zum Ändern des geteilten Zustands
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

function setFontSize(size) {
  fontSize.value = size
}

// Werte und Funktionen bereitstellen
// Nur Lesezugriff auf Werte, aber Manipulation über Funktionen erlauben
provide('theme', readonly(theme))
provide('fontSize', readonly(fontSize))
provide('toggleTheme', toggleTheme)
provide('setFontSize', setFontSize)
</script>

// DeepNestedComponent.vue (Tief verschachtelte Komponente)
<script setup>
import { inject, computed } from 'vue'

// Bereitgestellte Werte und Funktionen abrufen
const theme = inject('theme', 'light') // Standardwert als Fallback
const fontSize = inject('fontSize', 'medium')
const toggleTheme = inject('toggleTheme')
const setFontSize = inject('setFontSize')

// Berechnete Eigenschaften basierend auf injizierten Werten
const textClass = computed(() => {
  return {
    'text-dark': theme.value === 'dark',
    'text-light': theme.value === 'light',
    [`font-${fontSize.value}`]: true
  }
})
</script>

<template>
  <div :class="textClass">
    <p>Aktuelles Theme: {{ theme }}</p>
    <p>Aktuelle Schriftgrösse: {{ fontSize }}</p>
    
    <button @click="toggleTheme">Theme wechseln</button>
    
    <select @change="e => setFontSize(e.target.value)">
      <option value="small">Klein</option>
      <option value="medium">Mittel</option>
      <option value="large">Gross</option>
    </select>
  </div>
</template>
```

Der Gedankengang in der Praxis wäre: 
*"Ich habe mehrere tief verschachtelte Komponenten, die alle auf Theme-Informationen zugreifen müssen. Anstatt diese Informationen durch viele Komponenten-Ebenen als Props durchzureichen, verwende ich provide() in meiner App-Komponente, um sie global verfügbar zu machen. Ich stelle nicht nur die Werte selbst bereit, sondern auch Funktionen, um diese zu ändern, damit die untergeordneten Komponenten den Zustand nicht direkt verändern können (was zu schwer nachvollziehbaren Datenflüssen führen würde). In meinen untergeordneten Komponenten verwende ich inject(), um auf diese gemeinsamen Daten und Funktionen zuzugreifen, ohne sie explizit als Props übergeben zu müssen. Dies macht den Code sauberer und vermeidet Prop-Drilling durch zahlreiche Zwischenkomponenten."*

### *Template Refs & DOM Zugriff*

Dies ist der Gedankengang speziell für die Verwendung von Template Refs & DOM Zugriff in Vue.js:

1. **Anwendungsfall für direkten DOM-Zugriff identifizieren**: 
   - Wann wird direkter Zugriff auf DOM-Elemente benötigt?
   - Beispiele: Fokussieren von Elementen, Integration mit Drittanbieter-Bibliotheken, Animationen
   - Beispiel: "Ich muss ein Eingabefeld fokussieren oder Canvas-Elemente manipulieren"

2. **Template Refs einrichten**:
   - Ref-Variable erstellen und im Template zuweisen
   - Zugriff auf DOM-Element nach der Komponenten-Montierung
   - Beispiel: 
     ```javascript
     const inputEl = ref(null)
     onMounted(() => {
       inputEl.value.focus()
     })
     ```
     ```html
     <input ref="inputEl" />
     ```

3. **Komponenten-Kontext verwenden**:
   - `getCurrentInstance()`: Für fortgeschrittene Anwendungsfälle, wenn interne Vue-Instanz benötigt wird
   - `useAttrs()`: Für Zugriff auf nicht als Props deklarierte Attribute
   - `useSlots()`: Für programmatischen Zugriff auf bereitgestellte Slots
   - Beispiel: 
     ```javascript
     const attrs = useAttrs()
     const slots = useSlots()
     console.log('Undeklarierte Attribute:', attrs)
     console.log('Verfügbare Slots:', Object.keys(slots))
     ```

4. **CSS-Integration**:
   - `useCssVars()`: Für reaktive CSS-Variablen innerhalb von `<style scoped>`
   - Verbindet JavaScript-Daten mit CSS-Eigenschaften
   - Beispiel: 
     ```javascript
     useCssVars(state => ({
       'text-color': state.textColor,
       'bg-color': state.bgColor
     }))
     ```

5. **Timing des DOM-Zugriffs verstehen**:
   - `nextTick()`: Warten auf das nächste DOM-Update vor Ausführung von Code
   - Wichtig, wenn Änderungen an reaktiven Daten vor DOM-Manipulation vorgenommen werden
   - Beispiel: 
     ```javascript
     async function updateAndFocus() {
       // Daten ändern
       items.value.push(newItem)
       // Warten auf DOM-Update
       await nextTick()
       // Dann auf aktualisiertes DOM zugreifen
       inputEl.value.focus()
     }
     ```

Anwendungsbeispiel:
```javascript
<script setup>
import { ref, onMounted, nextTick, useAttrs, useCssVars } from 'vue'

// Template ref für DOM-Zugriff
const textareaEl = ref(null)
const canvasEl = ref(null)
const chartContext = ref(null)

// Undeklarierte Attribute abrufen
const attrs = useAttrs()

// Reaktive Daten
const chartData = ref([12, 19, 3, 5, 2, 3])
const theme = ref('light')

// Reaktive CSS-Variablen
useCssVars((state) => {
  return {
    '--primary-color': state.theme === 'light' ? '#42b883' : '#34495e',
    '--background-color': state.theme === 'light' ? '#ffffff' : '#2c3e50',
    '--text-color': state.theme === 'light' ? '#2c3e50' : '#ffffff'
  }
})

// Nach dem Mounting auf DOM-Elemente zugreifen
onMounted(() => {
  // Textarea fokussieren
  textareaEl.value.focus()
  
  // Canvas-Kontext für Chart-Bibliothek holen
  chartContext.value = canvasEl.value.getContext('2d')
  
  // Chart initialisieren (z.B. mit Chart.js)
  initializeChart()
})

// Chart bei Datenänderung aktualisieren
function updateChartData(newData) {
  chartData.value = newData
  
  // Warten auf DOM-Update, bevor Chart aktualisiert wird
  nextTick(() => {
    updateChart()
  })
}

// Hilfsfunktionen für Chart
function initializeChart() {
  if (chartContext.value) {
    // Chart.js oder eigene Implementierung hier
    console.log('Chart initialisiert mit Daten:', chartData.value)
  }
}

function updateChart() {
  if (chartContext.value) {
    console.log('Chart aktualisiert mit Daten:', chartData.value)
  }
}

// Theme wechseln
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="chart-container">
    <textarea 
      ref="textareaEl"
      placeholder="Notizen zum Chart..."
      v-bind="attrs"
    ></textarea>
    
    <canvas ref="canvasEl" width="400" height="200"></canvas>
    
    <button @click="toggleTheme">Theme wechseln</button>
  </div>
</template>

<style scoped>
.chart-container {
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 20px;
}

textarea {
  border: 2px solid var(--primary-color);
  color: var(--text-color);
  background-color: var(--background-color);
  padding: 8px;
}

button {
  background-color: var(--primary-color);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
```

Der Gedankengang in der Praxis wäre: 
*"Ich entwickle eine Komponente mit einem Canvas für Datenvisualisierung und einem Textarea für Notizen. Um die Chart-Bibliothek zu initialisieren, benötige ich direkten Zugriff auf das Canvas-DOM-Element, wofür ich eine Template-Ref verwende. Nach dem Mounting der Komponente kann ich das Canvas-Element referenzieren und den Rendering-Kontext abrufen. Ausserdem möchte ich das Textarea-Element automatisch fokussieren, sobald die Komponente geladen ist. Für dynamische Styling-Änderungen nutze ich useCssVars, um reaktive CSS-Variablen zu definieren, die sich ändern, wenn das Theme wechselt. Wenn sich die Chart-Daten aktualisieren, verwende ich nextTick, um sicherzustellen, dass ich erst auf den Chart zugreife, nachdem Vue das DOM aktualisiert hat. Mit useAttrs() kann ich auch undeklarierte Attribute auffangen und an das Textarea-Element weiterleiten, was die Komponente flexibler macht."*