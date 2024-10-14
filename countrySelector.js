document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('nationality');
    
    fetch('/data/countries.json')
      .then(response => response.json())
      .then(data => {
        data.countries.forEach(country => {
          const option = document.createElement('option');
          option.value = country;
          option.textContent = country;
          selectElement.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error when loading the list of countries:', error);
      });
  });