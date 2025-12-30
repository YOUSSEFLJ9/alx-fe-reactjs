import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders TodoList with initial todos', () => {
    render(<TodoList />);
    
    // Check if the initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('can add a new todo', () => {
    render(<TodoList />);
    
    // Get the input and button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);
    
    // Check if the new todo is added
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
    // Check if the input is cleared
    expect(input.value).toBe('');
  });

  test('can toggle todo completion', () => {
    render(<TodoList />);
    
    // Get the first todo item
    const todoItem = screen.getByTestId('todo-item-1');
    
    // Click to toggle completion
    fireEvent.click(todoItem);
    
    // Check if the style is updated
    expect(todoItem).toHaveStyle({ textDecoration: 'line-through' });
  });

  test('can delete a todo', () => {
    render(<TodoList />);
    
    // Get the delete button for the first todo
    const deleteButton = screen.getByTestId('delete-button-1');
    
    // Click delete button
    fireEvent.click(deleteButton);
    
    // Check if the todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});