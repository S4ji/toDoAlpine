document.addEventListener('alpine:init', () => {
    Alpine.store('toDoList', {
        data: [],
    })
})

function ToDoList() {
    return {
        toDoList: [],
        newTodo: {
            title: '',
            description: '',
            duration: '',
            deadline: '',
            tags: '',
        },
        open: false,
        addToDo() {
            this.toDoList = [
                ...this.toDoList,
                {
                    id: Math.random().toString(36).substring(2, 15),
                    title: this.newTodo.title,
                    description: this.newTodo.description,
                    duration: this.newTodo.duration * 86400,
                    isDone: false,
                    deadline: this.newTodo.deadline,
                    tags: this.newTodo.tags,
                },
            ]
            this.newTodo.title = ''
            this.newTodo.description = ''
            this.newTodo.duration = ''
            this.newTodo.deadline = ''
            this.newTodo.tags = ''
            this.saveToStorage()
        },
        deleteToDo(id) {
            this.toDoList = [...this.toDoList].filter((todo) => todo.id !== id)
            this.saveToStorage()
        },
        loadStorage() {
            this.toDoList = JSON.parse(localStorage.getItem('toDoList')) || []
        },
        saveToStorage() {
            localStorage.setItem('toDoList', JSON.stringify(this.toDoList))
            console.log(JSON.stringify(localStorage))
        },
        getColors(myTodo) {
            // Calcul de la couleur en fonction du temps qu'il reste
            const currentDate = Date.now() / 1000

            const deadLine = new Date(myTodo.deadline).getTime()
            const deadlineinS = deadLine / 1000
            console.log('deadlineinMs', deadlineinS)
            const timeMargin = deadlineinS - currentDate - myTodo.duration
            console.log('timeMargin', timeMargin)
            const msInDay = 86400

            if (timeMargin < msInDay) {
                return 'bg-red-500'
            } else if (timeMargin >= msInDay && timeMargin < msInDay * 3) {
                return 'bg-orange-500'
            } else if (timeMargin > msInDay * 3) {
                return 'bg-white-500'
            }
            return ''
        },
        getTaskClass(myTodo) {
            let toDoBubbleClass = ''
            toDoBubbleClass += this.getColors(myTodo)

            const done = myTodo.isDone ? 'line-through' : ''
            toDoBubbleClass += ' ' + done
            return toDoBubbleClass
        },
        toDoDone(myTodo) {
            console.log(myTodo)
            myTodo.isDone = true
        },
    }
}
