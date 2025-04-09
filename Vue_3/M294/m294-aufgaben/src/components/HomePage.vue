<template>
  <div class="app-container">
    <header>
      <h1>Willkommen zu deinen Aufgaben</h1>
    </header>
    
    <nav class="navigation">
      <router-link to="/aufgabe-01" class="nav-link">Aufgabe 01</router-link>
      <router-link to="/aufgabe-02" class="nav-link">Aufgabe 02</router-link>
      <router-link to="/aufgabe-03" class="nav-link">Aufgabe 03</router-link>
      <router-link to="/aufgabe-04" class="nav-link">Aufgabe 04</router-link>
      <router-link to="/aufgabe-05" class="nav-link">Aufgabe 05</router-link>
    </nav>
  
    <main class="aufgaben-container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
// TypeScript setup
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

header {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 20px 30px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: white;
  margin: 0;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.5px;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.nav-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f8f9fa;
  color: #6e8efb;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.nav-link:hover {
  background-color: #6e8efb;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-link.router-link-active {
  background-color: #6e8efb;
  color: white;
}

.aufgaben-container {
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaeaea;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-container {
    padding: 10px;
  }
  
  header {
    padding: 15px;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  .navigation {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-link {
    width: 100%;
    text-align: center;
  }
}
</style>