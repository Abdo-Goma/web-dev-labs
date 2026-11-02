function TodoApp() {
    const [todos, setTodos] = React.useState([]);

    const [text, setText] = React.useState('');
    const [filter, setFilter] = React.useState('all');

    // which todo is being edited right now (null = none)
    const [editingId, setEditingId] = React.useState(null);
    const [editText, setEditText] = React.useState('');

    const handleAddTodo = (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        setTodos([...todos, newTodo]);

        setText('');
    };

    const handleDeleteTodo = (idToDelete) => {
        const updatedTodos = todos.filter(todo => todo.id !== idToDelete);
        setTodos(updatedTodos);
    };

    const handleToggleTodo = (idToToggle) => {
        const updatedTodos = todos.map(todo =>
            todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    // double click on the text -> start editing
    const handleStartEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    // Enter -> save, Escape -> cancel
    const handleEditKeyDown = (e, idToEdit) => {
        if (e.key === 'Enter') {
            if (editText.trim()) {
                const updatedTodos = todos.map(todo =>
                    todo.id === idToEdit ? { ...todo, text: editText } : todo
                );
                setTodos(updatedTodos);
            }
            setEditingId(null);
        }
        if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    const handleClearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const handleClearAll = () => {
        setTodos([]);
    };

    // which todos to show depends on the selected filter
    const visibleTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const itemsLeft = todos.filter(todo => !todo.completed).length;

    return (
    <div className="card">
    <h1>Todo App</h1>

    {/* Add Todo Form */}
    <form onSubmit={handleAddTodo} className="add-row">
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="add-btn">Add</button>
    </form>

    {/* Hint + Filter Buttons */}
    <div className="filters">
        <span></span>
        <div>
            <button
                className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter('all')}
            >
            All
            </button>
            <button
                className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter('active')}
            >
            Active
            </button>
            <button
                className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
                onClick={() => setFilter('completed')}
            >
            Completed
            </button>
        </div>
    </div>

    {/* Todo List Display */}
    {visibleTodos.length === 0 ? (
        <p>No todos here!</p>
    ) : (
        <ul>
        {visibleTodos.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'done' : ''}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
            />

            {editingId === todo.id ? (
                <input
                    type="text"
                    autoFocus
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                    onBlur={() => setEditingId(null)}
                />
            ) : (
                <span onDoubleClick={() => handleStartEdit(todo)}>
                    {todo.text}
                </span>
            )}

            <button
                className="delete-btn"
                onClick={() => handleDeleteTodo(todo.id)}
            >
            x
            </button>
        </li>
        ))}
        </ul>
    )}

    {/* Footer */}
    <div className="footer">
        <span>{itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left</span>
        <div>
            <button onClick={handleClearCompleted}>Clear completed</button>
            <button onClick={handleClearAll}>Clear all</button>
        </div>
    </div>
    </div>
    );
}

// Render the TodoApp component into the HTML root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TodoApp />);
