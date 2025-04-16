# Inhaltsverzeichnis - Component Events & Emit in Vue.js

1. [**Component Events & Emit**](#component-events--emit)
   - Konzept der Komponentenkommunikation verstehen
   - Grundlegendes Emitteringskonzept analysieren
   - Events deklarieren
   - Events auslösen (emit)
   - Events in der Elternkomponente behandeln
   - Anwendungsbeispiel

2. [**v-model und Custom Events**](#v-model-und-custom-events)
   - v-model verstehen
   - Komponente für v-model vorbereiten
   - Modifikatoren für v-model implementieren
   - Mehrere v-model-Bindungen verwenden
   - Anwendungsbeispiel

3. [**Events im Vergleich zu anderen Kommunikationsmethoden**](#events-im-vergleich-zu-anderen-kommunikationsmethoden)
   - Props (Eltern → Kind)
   - Events/Emit (Kind → Eltern)
   - v-model (Bidirektional)
   - Provide/Inject (Vorfahre → Nachkomme)
   - Vuex/Pinia (Globaler Zustand)
   - Gedankengang zur Auswahl der richtigen Methode

## *Component Events & Emit*

Dies ist der Gedankengang speziell für die Verwendung von Component Events und emit in Vue.js:

1. **Konzept der Komponentenkommunikation verstehen**:
   - Komponenten kommunizieren über Props (von Eltern- zu Kindkomponente) und Events (von Kind- zu Elternkomponente)
   - Events bilden einen unidirektionalen Datenfluss nach oben ("one-way up binding")
   - In Vue ist dieser Mechanismus das `emit`-System, das Kindern erlaubt, Ereignisse an ihre Eltern zu senden
   - Beispiel: Eine Schaltfläche-Komponente sendet ein "click"-Event an die übergeordnete Komponente

2. **Grundlegendes Emitteringskonzept analysieren**:
   - `emit` ist keine "syntaktische Vereinfachung" wie async/await, sondern ein grundlegendes Konzept in Vue
   - Es basiert auf dem Observer/EventEmitter-Muster (ähnlich wie in Node.js)
   - Jede Vue-Komponente hat eine interne Instanz eines Event-Emitters
   - Dieser Event-Emitter kann Events "auslösen" (`emit`) und Listener registrieren (über v-on oder @)

3. **Events deklarieren**:
   - In Options API: `emits: ['submit', 'cancel']`
   - In Composition API mit `<script setup>`: `defineEmits(['submit', 'cancel'])`
   - Validierung kann über Objektsyntax hinzugefügt werden für Typprüfung und benutzerdefinierte Validierung
   - Beispiel:
     ```javascript
     // in <script setup>
     const emit = defineEmits({
       // Einfache Deklaration
       'close': null,
       
       // Mit Validierungsfunktion
       'submit': (payload) => {
         // Validierungslogik, gibt true oder false zurück
         if (!payload.email) {
           console.warn('Email fehlt in submit-Event');
           return false;
         }
         return true;
       }
     })
     ```

4. **Events auslösen (emit)**:
   - In Options API: `this.$emit('eventName', payload)`
   - In Composition API mit `<script setup>`: `emit('eventName', payload)`
   - Der Payload kann ein einzelner Wert oder ein komplexes Objekt sein
   - Mehrere Argumente können übergeben werden: `emit('event', arg1, arg2, ...)`
   - Beispiel:
     ```javascript
     function submitForm() {
       if (validateForm()) {
         // Event auslösen mit Daten
         emit('submit', {
           email: email.value,
           password: password.value,
           rememberMe: rememberMe.value
         });
       }
     }
     ```

5. **Events in der Elternkomponente behandeln**:
   - Mit v-on-Direktive (oder @-Kurzform): `v-on:eventName="handler"` oder `@eventName="handler"`
   - Der Event-Handler erhält automatisch die emittierten Payload-Argumente
   - Es kann eine Inline-Anweisung, eine Methode oder eine komplexe Funktion sein
   - Beispiel:
     ```html
     <LoginForm 
       @submit="handleLogin" 
       @cancel="showLoginForm = false" 
     />
     ```

Anwendungsbeispiel mit zwei Komponenten:

```javascript
// ChildComponent.vue (Kindkomponente, die Events emittiert)
<script setup>
import { ref } from 'vue'

// Events deklarieren
const emit = defineEmits(['update', 'submit', 'cancel'])

const inputValue = ref('')

function updateInput(e) {
  inputValue.value = e.target.value
  // Einfaches Event mit einem Argument
  emit('update', inputValue.value)
}

function handleSubmit() {
  // Event mit komplexem Objekt als Payload
  emit('submit', {
    value: inputValue.value,
    timestamp: new Date().toISOString()
  })
  
  // Zurücksetzen nach Absenden
  inputValue.value = ''
}

function handleCancel() {
  // Event ohne Payload
  emit('cancel')
  inputValue.value = ''
}
</script>

<template>
  <div class="child-component">
    <input 
      :value="inputValue" 
      @input="updateInput" 
      placeholder="Gib etwas ein..." 
    />
    
    <div class="actions">
      <button @click="handleSubmit">Absenden</button>
      <button @click="handleCancel">Abbrechen</button>
    </div>
  </div>
</template>


// ParentComponent.vue (Elternkomponente, die auf Events hört)
<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const latestUpdate = ref('')
const submissions = ref([])
const showForm = ref(true)

// Event-Handler für das Update-Event
function handleUpdate(value) {
  latestUpdate.value = value
}

// Event-Handler für das Submit-Event
function handleSubmit(data) {
  submissions.value.push(data)
  console.log('Formular abgesendet:', data)
}

// Event-Handler für das Cancel-Event
function handleCancel() {
  console.log('Abgebrochen')
  // Möglicherweise Form verstecken oder zurücksetzen
  showForm.value = false
  
  // Nach kurzer Zeit das Formular wieder anzeigen
  setTimeout(() => {
    showForm.value = true
  }, 2000)
}
</script>

<template>
  <div class="parent-component">
    <h2>Elternkomponente</h2>
    
    <div v-if="latestUpdate" class="live-preview">
      Live-Vorschau: {{ latestUpdate }}
    </div>
    
    <div v-if="showForm">
      <ChildComponent 
        @update="handleUpdate" 
        @submit="handleSubmit" 
        @cancel="handleCancel" 
      />
    </div>
    <div v-else>
      Formular wurde abgebrochen. Wird in 2 Sekunden wieder angezeigt.
    </div>
    
    <div v-if="submissions.length > 0" class="submissions">
      <h3>Bisherige Eingaben:</h3>
      <ul>
        <li v-for="(submission, index) in submissions" :key="index">
          {{ submission.value }} ({{ submission.timestamp }})
        </li>
      </ul>
    </div>
  </div>
</template>
```

## *v-model und Custom Events*

Dies ist der Gedankengang für die Verwendung von v-model mit benutzerdefinierten Komponenten, was eng mit emit zusammenhängt:

1. **v-model verstehen**:
   - `v-model` ist syntaktischer Zucker für die Kombination aus Props und Events
   - Bei nativen Elementen: `v-model="data"` entspricht `:value="data" @input="e => data = e.target.value"`
   - Bei benutzerdefinierten Komponenten: kann angepasst werden, basiert aber auf demselben Prinzip

2. **Komponente für v-model vorbereiten**:
   - Standardmäßig erwartet v-model eine `modelValue`-Prop und ein `update:modelValue`-Event
   - In Vue 3 können Komponenten mehrere v-model-Bindungen haben
   - Beispiel:
     ```javascript
     // CustomInput.vue
     <script setup>
     // Prop definieren für v-model
     const props = defineProps({
       modelValue: String
     })
     
     // Event für v-model definieren
     const emit = defineEmits(['update:modelValue'])
     
     // Event-Handler, der das Update-Event emittiert
     function updateValue(e) {
       emit('update:modelValue', e.target.value)
     }
     </script>
     
     <template>
       <input 
         :value="modelValue" 
         @input="updateValue" 
       />
     </template>
     ```

3. **Modifikatoren für v-model implementieren**:
   - Vue unterstützt Modifikatoren wie `.trim`, `.number`, `.lazy`
   - Benutzerdefinierte Komponenten können eigene Modifikatoren implementieren
   - Diese werden als Prop mit dem Suffix `Modifiers` übergeben
   - Beispiel:
     ```javascript
     <script setup>
     const props = defineProps({
       modelValue: String,
       modelModifiers: { default: () => ({}) }
     })
     
     const emit = defineEmits(['update:modelValue'])
     
     function updateValue(e) {
       let value = e.target.value
       
       // Modifikatoren anwenden
       if (props.modelModifiers.capitalize) {
         value = value.charAt(0).toUpperCase() + value.slice(1)
       }
       
       emit('update:modelValue', value)
     }
     </script>
     ```

4. **Mehrere v-model-Bindungen verwenden**:
   - In Vue 3 kann eine Komponente mehrere v-model-Bindungen haben
   - Für jede Bindung werden eigene Props und Events benötigt
   - Namenskonvention: `v-model:name` verwendet die Prop `name` und das Event `update:name`
   - Beispiel:
     ```javascript
     // UserForm.vue
     <script setup>
     // Props für mehrere v-model-Bindungen
     const props = defineProps({
       firstName: String,
       lastName: String,
       email: String
     })
     
     // Events für alle v-model-Bindungen
     const emit = defineEmits([
       'update:firstName',
       'update:lastName',
       'update:email'
     ])
     
     // Event-Handler für jedes Feld
     function updateFirstName(e) {
       emit('update:firstName', e.target.value)
     }
     
     function updateLastName(e) {
       emit('update:lastName', e.target.value)
     }
     
     function updateEmail(e) {
       emit('update:email', e.target.value)
     }
     </script>
     
     <template>
       <div class="user-form">
         <input :value="firstName" @input="updateFirstName" placeholder="Vorname" />
         <input :value="lastName" @input="updateLastName" placeholder="Nachname" />
         <input :value="email" @input="updateEmail" placeholder="E-Mail" />
       </div>
     </template>
     ```

Anwendungsbeispiel für v-model mit benutzerdefinierten Komponenten:

```javascript
// Elternkomponente, die v-model mit einer benutzerdefinierten Komponente verwendet
<script setup>
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'
import UserForm from './UserForm.vue'

// Für einfache v-model-Bindung
const searchQuery = ref('')

// Für mehrere v-model-Bindungen
const userData = ref({
  firstName: '',
  lastName: '',
  email: ''
})

// Mit Modifikatoren
const comment = ref('')

function submitSearch() {
  console.log('Suche nach:', searchQuery.value)
}

function submitUser() {
  console.log('Benutzer speichern:', userData.value)
}
</script>

<template>
  <div>
    <h2>Suche</h2>
    <form @submit.prevent="submitSearch">
      <!-- Einfaches v-model mit benutzerdefinierter Komponente -->
      <CustomInput v-model="searchQuery" />
      <button type="submit">Suchen</button>
    </form>
    
    <h2>Benutzerformular</h2>
    <form @submit.prevent="submitUser">
      <!-- Mehrere v-model-Bindungen -->
      <UserForm
        v-model:firstName="userData.firstName"
        v-model:lastName="userData.lastName"
        v-model:email="userData.email"
      />
      <button type="submit">Speichern</button>
    </form>
    
    <h2>Kommentar</h2>
    <!-- v-model mit Modifikator -->
    <CustomInput v-model.capitalize="comment" />
    <p>Vorschau: {{ comment }}</p>
  </div>
</template>
```

## *Events im Vergleich zu anderen Kommunikationsmethoden*

Dies ist ein Vergleich verschiedener Komponentenkommunikationsmethoden in Vue, um die Rolle von emit in der richtigen Perspektive zu sehen:

1. **Props (Eltern → Kind)**:
   - Unidirektionaler Datenfluss von oben nach unten
   - Gut für Daten und Konfigurationen
   - Statisch und explizit

2. **Events/Emit (Kind → Eltern)**:
   - Unidirektionaler Datenfluss von unten nach oben
   - Gut für Benutzerinteraktionen und Zustandsänderungen
   - Explizit, folgt dem Ereignismuster

3. **v-model (Bidirektional zwischen Eltern und Kind)**:
   - Bidirektionaler Datenfluss (Syntaktischer Zucker für Props + Events)
   - Gut für Formularelemente und Benutzereingaben
   - Einfach zu verwenden, aber kann die Datenflussrichtung verschleiern

4. **Provide/Inject (Entfernter Vorfahre → Beliebiger Nachkomme)**:
   - Überspringt Zwischenkomponenten im Komponentenbaum
   - Gut für appweite Werte wie Themes, Benutzereinstellungen
   - Weniger explizit, kann Datenfluss schwerer nachvollziehbar machen

5. **Vuex/Pinia (Globaler Zustand)**:
   - Zentrale Zustandsverwaltung für komplexe Anwendungen
   - Gut für appweite Daten, die von vielen Komponenten genutzt werden
   - Strukturiert, bietet Vorhersehbarkeit, aber mit mehr Boilerplate-Code

Der Gedankengang zur Auswahl der richtigen Kommunikationsmethode:
*"Für direkte Kommunikation zwischen Eltern- und Kindkomponenten verwende ich Props (abwärts) und Events mit emit (aufwärts). Wenn ich bidirektionale Bindungen für Formulare benötige, setze ich v-model ein, das auf dem emit-Mechanismus basiert. Für entferntere Komponenten-Beziehungen ist Provide/Inject sinnvoll, während ich für appweite Zustände mit vielen beteiligten Komponenten auf Vuex oder Pinia zurückgreife. Der emit-Mechanismus ist zentral für die von-unten-nach-oben Kommunikation und bildet zusammen mit Props die Grundlage für das Vue-Komponentenmodell."*

Der Gedankengang in der Praxis für die Verwendung von emit wäre:
*"Ich erstelle eine wiederverwendbare Formular-Komponente, die verschiedene Benutzerinteraktionen an die Elternkomponente kommunizieren muss. Zuerst definiere ich mit defineEmits, welche Events meine Komponente auslösen kann, was die Komponenten-API dokumentiert und TypeScript-Unterstützung bietet. Für jede relevante Benutzeraktion (wie Absenden, Abbrechen oder Änderung) implementiere ich einen Handler, der das entsprechende Event mit emit auslöst und relevante Daten als Payload übergibt. In der Elternkomponente binde ich diese Events mit der @-Syntax (v-on) und implementiere Handler, die auf die emittierten Events reagieren. Für Formulardaten, die bidirektional gebunden werden sollen, verwende ich v-model und implementiere in meiner Komponente die notwendige Props- und Events-Struktur. Dieser Ansatz hält den Datenfluss vorhersehbar: Daten fließen als Props nach unten und Änderungen werden als Events nach oben kommuniziert."*