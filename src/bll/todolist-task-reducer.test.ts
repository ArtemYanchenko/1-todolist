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
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "RxJS",
        description: "",
        todoListId: "todolistId1",
        order: 0,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        addedDate: "2023-06-09T07:44:43.06",
        entityStatus: "idle",
      },
      {
        id: "2",
        title: "hello",
        description: "",
        todoListId: "todolistId1",
        order: 0,
        status: 2,
        priority: 1,
        startDate: "",
        deadline: "",
        addedDate: "2023-06-07T16:00:25.61",
        entityStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "mutability123",
        description: "",
        todoListId: "todolistId2",
        order: 0,
        status: 2,
        priority: 1,
        startDate: "",
        deadline: "",
        addedDate: "2023-06-07T16:00:25.61",
        entityStatus: "idle",
      },
      {
        id: "2",
        title: "5",
        description: "",
        todoListId: "todolistId2",
        order: 0,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        addedDate: "2023-06-07T16:00:25.61",
        entityStatus: "idle",
      },
    ],
  };

  const action = todolistsActions.removeTodolist({ todolistId: "todolistId2" });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
  expect(startState["todolistId2"]).toBeDefined();
});
