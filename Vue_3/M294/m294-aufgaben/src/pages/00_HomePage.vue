<template>
    <div class="code-container">
      <div class="code-block">
        <div class="code-line">
          <span class="keyword">def</span> <span class="function">holy_g</span>():
        </div>
        <div class="code-line">
          <span class="indent"></span><span class="keyword">return</span> {
        </div>
        <div class="code-line">
          <span class="indent"></span><span class="indent"></span><span class="string">"name"</span>: <span class="string">"HolyG"</span>,
        </div>
        <div class="code-line">
          <span class="indent"></span><span class="indent"></span><span class="string">"passion"</span>: <span class="string">"Turning coffee into code"</span>,
        </div>
        <div class="code-line">
          <span class="indent"></span><span class="indent"></span><span class="string">"motto"</span>: <span class="string">"Learning never stops!"</span>
        </div>
        <div class="code-line">
          <span class="indent"></span>}
        </div>
      </div>
      <div class="dev-quote">
        <span class="dev-quote-title">Dev Quote</span>
        <div class="code-block">
          <div class="code-line">
            <span class="keyword">while</span> (alive):
          </div>
          <div class="code-line">
            <span class="indent"></span>learn()
          </div>
          <div class="code-line">
            <span class="indent"></span>code()
          </div>
          <div class="code-line">
            <span class="indent"></span>grow()
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .code-container {
    background-color: #282c34; /* Dunkler Hintergrund für Code */
    color: #abb2bf; /* Helle Textfarbe */
    font-family: 'Courier New', monospace;
    padding: 20px;
    border-radius: 8px;
    animation: fadeIn 1s ease-out; /* Fade-in-Animation */
  }
  
  .code-block {
    margin-bottom: 20px;
  }
  
  .code-line {
    line-height: 1.6;
    white-space: nowrap; /* Zeilenumbruch verhindern */
    overflow: hidden; /* Text abschneiden, wenn er zu lang ist */
    animation: typeAndDelete 5s steps(30, end) infinite; /* Schreib- und Löscheffekt */
  }
  
  .keyword {
    color: #c678dd; /* Schlüsselwörter hervorheben */
  }
  
  .function {
    color: #61afef; /* Funktionsnamen hervorheben */
  }
  
  .string {
    color: #98c379; /* Strings hervorheben */
  }
  
  .indent {
    display: inline-block;
    width: 20px; /* Einrückung */
  }
  
  .dev-quote {
    margin-top: 20px;
  }
  
  .dev-quote-title {
    font-weight: bold;
    color: #e06c75; /* Titel hervorheben */
    margin-bottom: 10px;
  }
  
  /* Animationen */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes typeAndDelete {
    0%, 100% { width: 0; }
    50% { width: 100%; }
  }
  </style>