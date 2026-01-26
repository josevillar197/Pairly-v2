import { createContext, useContext, useState } from "react";

const SignupContext = createContext();

export function SignupProvider({ children }) {
  const [selectedTasteIds, setSelectedTasteIds] = useState([]);
  const [step, setStep] = useState(1);

  const toggleTaste = (id) => {
    setSelectedTasteIds((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
  };

  const resetSignup = () => {
    setSelectedTasteIds([]);
    setStep(1);
  };

  return (
    <SignupContext.Provider
      value={{
        selectedTasteIds,
        toggleTaste,
        step,
        setStep,
        resetSignup,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  return useContext(SignupContext);
}
