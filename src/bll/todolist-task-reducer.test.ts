import { addTodolistAC, todolistReducer } from "./todolistReducer";
import { taskReducer } from "./tasksReducer";
import { v1 } from "uuid";
import { TasksStateType } from "features/TodolistList/Todolist/Task/Task";
import { TodolistDomainType } from "features/TodolistList/TodolistsList";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  const newId = v1();
  const action = addTodolistAC({ id: "1", title: "newtodo", order: 0, addedDate: "" });

  const endTasksState = taskReducer(startTasksState, action);
  const endTodolistsState = todolistReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});

// test('property with todolistId should be deleted', () => {
//     const startState: TasksStateType = {
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "2", title: "milk", isDone: true },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     };
//
//     const action = removeTodolistAC("todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState["todolistId2"]).not.toBeDefined();
//     expect(startState["todolistId2"]).toBeDefined();
// });
