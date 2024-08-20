<template>
    <footer>
      <p>© {{ new Date().getFullYear() }} Weather App. All rights reserved.</p>
      <p>
        Developed by <a href="https://asearerdev-portfolio.vercel.app/" target="_blank" rel="noopener">Alonza Searer (asearerdev)</a>
      </p>
      <p>
        <a href="https://github.com/asearer" target="_blank" rel="noopener">GitHub</a> |
        <a href="https://twitter.com/AlonzaSearer" target="_blank" rel="noopener">Twitter</a> |
        <a href="https://www.linkedin.com/in/alonza-searer/" target="_blank" rel="noopener">LinkedIn</a> |
        <a href="https://www.facebook.com/ASearerDev" target="_blank" rel="noopener">Facebook</a>
      </p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'WeatherFooter'
  };
  </script>
  
  <style scoped>
  footer {
    background-color: #f8f9fa;
    padding: 20px;
    text-align: center;
    font-size: 0.9em;
    color: #555;
    border-top: 1px solid #ddd;
  }
  
  footer p {
    margin: 10px 0;
  }
  
  footer a {
    color: #4a90e2;
    text-decoration: none;
    margin: 0 5px;
  }
  
  footer a:hover {
    text-decoration: underline;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    footer {
      font-size: 0.8em;
      padding: 15px;
    }
  
    footer a {
      display: block;
      margin: 5px 0;
    }
  }
  
  @media (max-width: 480px) {
    footer {
      font-size: 0.7em;
      padding: 10px;
    }
  
    footer a {
      display: block;
      margin: 3px 0;
    }
  }
  </style>
  
  