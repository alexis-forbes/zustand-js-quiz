import { create } from "zustand"
import type { Question } from "./types"

interface State { 
    questions: Question[],
    currentQuestion: number,
    fetchQuestions: (limit: number) => Promise<void>
}

// Podemos leer y actualizar el estado con "set" y "get"
export const useQuestionsStore = create<State>((set, get) => {
    // Create recibe un callback 
    // En el callback devolvemos el objeto que será el estado global (store)
    // En el store tenemos el estado y las formas de actualizar el estado (actions)
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            set({
                questions: [
                    {
                        "id": 1,
                        "question": "¿Cuál es la salida de este código?",
                        "code": "console.log(typeof NaN)",
                        "answers": [
                        "undefined",
                        "NaN",
                        "string",
                        "number"
                        ],
                        "correctAnswer": 3
                    }
                ]
            })
        }
    }
})
