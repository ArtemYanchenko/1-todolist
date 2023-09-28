import { Provider } from 'react-redux'
// import { AppRootStateType } from "../store";
// import { combineReducers } from "redux";
// import { tasksReducer } from "../tasksReducer";
// import { v1 } from "uuid";
// import { todolistsReducer } from "bll/todolistReducer";
// import { configureStore } from "@reduxjs/toolkit";
//
//
// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todolistsReducer
// });
//
// const initialGlobalState = {
//   todolists: [
//     { id: "todolistId1", title: "What to learn", order: 0, addedDate: "", filter: "all" },
//     { id: "todolistId2", title: "What to buy", order: 0, addedDate: "", filter: "all" }
//   ],
//   tasks: {
//     ["todolistId1"]: [
//       { id: v1(), title: "HTML&CSS", isDone: true },
//       { id: v1(), title: "JS", isDone: false }
//     ],
//     ["todolistId2"]: [
//       {
//         id: v1(), title: "Milk", isDone: false
//       },
//       { id: v1(), title: "React Book", isDone: true }
//     ]
//   }
// };
//
// export const storyBookStore = configureStore({
// rootReducer, initialGlobalState as AppRootStateType
// }))
// ;
//
// const reduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
//   return (
//     <Provider store={storyBookStore}>{storyFn()}</Provider>
//   );
// };
//
// export default reduxStoreProviderDecorator;
