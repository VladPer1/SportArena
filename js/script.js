console.log('Страница загружена!');

window.addEventListener('DOMContentLoaded', function() {
    alert('Добро пожаловать на сайт!');
    
    const title = document.querySelector('h1');
    if (title) {
        title.style.color = '#e74c3c';
    }
});

const paragraph = document.querySelector('p');
if (paragraph) {
    paragraph.addEventListener('click', function() {
        this.textContent = 'Текст изменён! Клик сработал!';
        this.style.color = '#27ae60';
    });
}