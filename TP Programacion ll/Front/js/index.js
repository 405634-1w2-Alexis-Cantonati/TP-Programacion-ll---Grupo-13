document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleTheme');
    const body = document.body;
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '🌞'; 
    }
    
    toggleButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        body.classList.toggle('dark-mode');

        
        if (body.classList.contains('dark-mode')) {
            toggleButton.textContent = '🌞'; 
            localStorage.setItem('darkMode', 'enabled'); 
        } else {
            toggleButton.textContent = '🌙'; 
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});