import { useState } from 'react'

export default function useForm(initialState) {
    const [inputData, setInputData] = useState(initialState)

    return [
        inputData,
        e => {
            e.preventDefault()
            const inputName = e.currentTarget.name
            const inputValue = e.currentTarget.value

            setInputData({ ...inputData, [inputName]: inputValue })
        },
        data => {
            if (data) setInputData(data)
            else setInputData(initialState)
        },
    ]
}
