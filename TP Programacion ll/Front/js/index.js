const modeToggleImage = document.getElementById('modeImage');
const body = document.body;

let isDarkMode = false;

modeToggleImage.addEventListener('click', () => {

    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode', isDarkMode);

    if (isDarkMode) {
        modeToggleImage.src = 'images/sol.png'; // Imagen para modo oscuro
        modeToggleImage.alt = 'Modo Oscuro';
    } else {
        modeToggleImage.src = 'images/luna.png'; // Imagen para modo claro
        modeToggleImage.alt = 'Modo Claro';
    }
});