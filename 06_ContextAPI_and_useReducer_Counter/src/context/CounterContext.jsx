import { createContext, useReducer } from "react";

// creating context
export const CounterContext = createContext();

// provider
export const CounterProvider = ({ children }) => {
  const initialState = {
    count: 0,
  };

  const counterReducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "incrementBy5":
        return { count: state.count + action.payload };
      case "decrement":
        return { count: state.count - 1 };
      case "decrementBy5":
        return { count: state.count - action.payload };
      default:
        return state;
    }
  }; // Remove the redundant const { state, dispatch } declaration

  // Now, use useReducer to create state and dispatch
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    // Providing state and dispatch to the provider
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
