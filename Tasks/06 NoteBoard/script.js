class NotesApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.form = document.getElementById('noteForm');
        this.input = document.getElementById('noteInput');
        this.notesList = document.getElementById('notesList');

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.renderNotes();
    }

    formatDateTime() {
        const now = new Date();
        return now.toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    handleSubmit(e) {
        e.preventDefault();

        const text = this.input.value.trim();
        if (!text) return;

        const note = {
            id: Date.now(),
            text: text,
            timestamp: this.formatDateTime()
        };

        this.notes.unshift(note);
        this.saveNotes();
        this.renderNotes();
        this.form.reset();
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    createNoteElement(note) {
        const div = document.createElement('div');
        div.className = 'note';
        div.innerHTML = `
            <p class="note-text">${note.text}</p>
            <p class="note-timestamp">${note.timestamp}</p>
            <button class="delete-btn" aria-label="Notiz löschen">✕</button>
        `;

        div.querySelector('.delete-btn').addEventListener('click',
            () => this.deleteNote(note.id)
        );

        return div;
    }

    renderNotes() {
        this.notesList.innerHTML = '';

        if (this.notes.length === 0) {
            this.notesList.innerHTML = `
                <p class="empty-state">Keine Notizen vorhanden</p>
            `;
            return;
        }

        this.notes.forEach(note => {
            this.notesList.appendChild(this.createNoteElement(note));
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
});