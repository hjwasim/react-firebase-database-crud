import FireDb from '../firebase.config';

const fireRef = FireDb.ref("Todos")

export const onAdd = (todo) => {
    if (todo.todo)
        fireRef.push(todo)
    else
        alert('Todo cannot be empty!')
}


export const onUpdate = (key, todo, closeModal) => {

    if (todo) {
        fireRef.child(key).update({
            todo: todo
        })
        closeModal()
    }
    else
        alert('Todo cannot be empty!')

}


export const onRemove = (key) => {
    fireRef.child(key).remove()
}
