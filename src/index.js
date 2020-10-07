// Importera styling.
import './style.scss';

class Course {

    constructor() {
        this.url = "http://studenter.miun.se/~joka1713/dt173g/moment5/api/courses.php";
        this.form = document.querySelector('form');
        this.courses = document.querySelector('tbody');
        this.alert = document.querySelector('.alert');
    }

    // Skapa ny kurs.
    add() {

        // Kontrollera att formuläret är validerat korrekt.
        if (this.form.checkValidity()) {
            this.alert.classList.remove('error');

            // Skapa nytt objekt.
            const course = {
                "code": document.querySelector('#code').value,
                "name": document.querySelector('#name').value,
                "progression": document.querySelector('#progression').value,
                "syllabus": document.querySelector('#progression').value
            };

            // Fråga API.
            fetch(this.url, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(course)
            })
                .then(created => this.list([course]))
                .catch(error => console.error(error));

        } else {
            this.alert.classList.add('error');
        }
    }

    // Hämta alla kurser.
    get() {

        // Fråga API.
        fetch(this.url)
            .then(response => response.json())
            .then(courses => this.list(courses))
            .catch(error => console.error(error));
    }

    // Skriv ut kurser.
    list(courses) {
        courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.code}</td>
                <td>${course.name}</td>
                <td>${course.progression}</td>
                <td>
                    <a href="${course.syllabus}" target="_blank">Länk</a>
                </td>`;
            this.courses.appendChild(row);
        })
    }
}

const Courses = new Course();

window.addEventListener('DOMContentLoaded', () => {
    // Hämta alla kurser.
    Courses.get();

    // Hantera skapande av kurs.
    document.querySelector('button').addEventListener('click', event => {
        event.preventDefault();
        Courses.add();
    })
});