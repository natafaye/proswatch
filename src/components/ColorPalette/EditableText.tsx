import { useEffect, useRef, useState } from "react"

type Props = {
    value: string
    onChange: (newValue: string) => void
}

export default function EditableText({ value, onChange }: Props) {
    const [editing, setEditing] = useState(false)
    const input = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (editing) {
            input.current?.focus()
            input.current?.select()
        }
    }, [editing])
    return (
        <span onClick={() => setEditing(true)}>
            { !editing ? value : (
                <input type="text"
                    ref={input}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    onBlur={() => setEditing(false)}
                    onKeyDown={(event) => event.key === "Enter" && setEditing(false)}
                />
            ) }
        </span>
    )
}