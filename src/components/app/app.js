import React, { Component } from 'react'; // Подключение библиотеки React

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
    maxId = 100;

    // Инициализируем состояние
    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],

        term: '',
        filter: 'all' //active, all, done
    };

    // Создаём элемент массива 
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    // Удаление элемента массива
    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id == id);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    // Добавление элемента массива
    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArr
            }
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id == id);

        //1. Обнволяем массив 
        const oldItem = arr[idx];
        const newItem = { ...oldItem,
            [propName]: !oldItem[propName]
        };

        //2. Строим новый массив
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    // Изменяем состояние done
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    // Изменяем состояние important
    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    // Установить состояние из строки поиска
    onSearchChange = (term) => {
    	this.setState ({ term });
    };

    // Установить состояние из строки поиска
    onFilterChange = (filter) => {
    	this.setState ({ filter });
    };

    // Функция поиска
    search(items, term) {
        if (term.length == 0) {
            return items;
        }

        // Првоеряем массив на вхождение
        return items.filter((item) => {
            return item.label
            .toLowerCase()
            .indexOf(term.toLowerCase()) > -1;
        });
    }

    // Фильтр списка в зависимости от состояния
    filter(items, filter) {

    	switch(filter) {
    		case 'all':
    			return items;
    		case 'active':
    			return items.filter((item) => !item.done);
    		case 'done':
    			return items.filter((item) => item.done);
    		default:
    			return items;
    	}
    }

    // Тело приложения 
    render() {
        const { todoData, term, filter } = this.state;
        // Фильтрация списка из поиска
        const visibleItems = this.filter(this.search(todoData, term), filter);
        // Получаем количество незавершенных дел
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div>
			<AppHeader toDo={todoCount} done={doneCount} />
			<SearchPanel 
				onSearchChange={this.onSearchChange}/>
			<ItemStatusFilter 
				filter={filter}
				onFilterChange={this.onFilterChange}/>
			<div className="clearfix"></div>
			<TodoList 
				todos={visibleItems} 
				onDeleted={ this.deleteItem }
				onToggleImportant={this.onToggleImportant}
				onToggleDone={this.onToggleDone}/>
			<ItemAddForm 
				onItemAdded={ this.addItem }
			/>
			</div>
        );
    }
};