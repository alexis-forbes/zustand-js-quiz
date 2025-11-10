const API_URL = 'http://localhost:5173/'

// Separacion logica de la logica de negocio
export const getAllQuestions = async () => {
    const res = await fetch(`${API_URL}/data.json`)
    const json = await res.json()
    return json
}