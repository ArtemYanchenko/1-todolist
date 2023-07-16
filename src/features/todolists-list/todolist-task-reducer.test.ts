import { TasksStateType } from "features/todolists-list/task/ui/task";
import { TodolistDomainType } from "features/todolists-list/todolists-list";
import { todolistsReducer, todolistsThunks } from "features/todolists-list/todolists/model/todolist-reducer";
import { tasksReducer } from "features/todolists-list/task/model/tasks-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  const arg = { todolist: { id: "1", title: "newtodo", order: 0, addedDate: "" } };
  const action = todolistsThunks.addTodolist.fulfilled(arg, "requestId", { title: arg.todolist.title });

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

  const arg = { todolistId: "todolistId2" };
  const action = todolistsThunks.removeTodolist.fulfilled(arg, "requestId", arg);
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
  expect(startState["todolistId2"]).toBeDefined();
});
