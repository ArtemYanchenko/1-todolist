import { FilterValuesType, TodolistDomainType } from "features/todolists-list/todolists-list";
import { StatusesType } from "app/appReducer";
import { todolistsActions, todolistsReducer, todolistsThunks } from "features/todolists-list/todolists/model/todolist-reducer";

let startState: TodolistDomainType[] = [];

beforeEach(() => {
  startState = [
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
});

test("correct todolists should be removed", () => {
  const arg = { todolistId: "1" };
  const endState = todolistsReducer(startState, todolistsThunks.removeTodolist.fulfilled(arg, "requestId", arg));
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe("2");
});

test("correct todolists should be added", () => {
  const arg = {
    todolist: {
      id: "3",
      title: "New todolists",
      addedDate: "",
      order: 0,
    },
  };
  const endState = todolistsReducer(startState, todolistsThunks.addTodolist.fulfilled(arg, "requestId", { title: arg.todolist.title }));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("New todolists");
  expect(endState[0].filter).toBe("all");
  expect(endState[0].id).toBeDefined();
});

test("correct todolists should change its name", () => {
  let newTodolistTitle = "New todolists";
  const arg = { todolistId: "1", title: newTodolistTitle };
  const action = todolistsThunks.changeTodolistTitle.fulfilled(arg, "requestId", arg);
  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[1].title).toBe("js");
});

test("correct filter of todolists should be changed", () => {
  let newFilter: FilterValuesType = "completed";
  const action = todolistsActions.changeFilterTodolist({ todolistId: "1", filterValue: newFilter });
  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("completed");
  expect(endState[1].filter).toBe("all");
});

test("correct entityStatus of todolists should be changed", () => {
  let newStatus: StatusesType = "loading";
  const action = todolistsActions.changeTodolistEntityStatus({ todolistId: "1", entityStatus: newStatus });
  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe(newStatus);
  expect(endState[1].entityStatus).toBe(startState[1].entityStatus);
});

test("correct todolists should be set to state", () => {
  const action = todolistsThunks.getTodolists.fulfilled({ todolists: startState }, "requestId");
  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});
