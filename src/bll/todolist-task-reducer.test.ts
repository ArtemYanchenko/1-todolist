import { TasksStateType } from "features/TodolistList/Todolist/Task/Task";
import { TodolistDomainType } from "features/TodolistList/TodolistsList";
import { todolistsActions, todolistsReducer } from "bll/todolistReducer";
import { tasksReducer } from "bll/tasksReducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  const action = todolistsActions.addTodolist({ todolist: { id: "1", title: "newtodo", order: 0, addedDate: "" } });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});

test("property with todolistId should be deleted", () => {
  const startState = [
    {
      addedDate: "2023-06-09T07:44:37.557",
      id: "1",
      order: -8,
      title: "VUE",
      filter: "all",
      entityStatus: "idle",
    },
    {
      addedDate: "2023-06-09T07:44:37.557",
      id: "2",
      order: -8,
      title: "js",
      filter: "all",
      entityStatus: "idle",
    },
  ];

  const action = todolistsActions.removeTodolist({ todolistId: "todolistId2" });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
  expect(startState["todolistId2"]).toBeDefined();
});
