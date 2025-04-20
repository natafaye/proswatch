import { ChangeEvent, Fragment, useRef, useState } from "react";
import TextareaAutosize, { TextareaHeightChangeMeta } from "react-textarea-autosize";
import { parseHexCodeList } from "./oldparseHexCodeList";

type Props = {
    values?: string[]
    onChange?: (newValue: string[]) => void
}

export default function BulkAddTextbox({ values = [], onChange = () => {} }: Props) {
    const [stringValue, setStringValue] = useState(values.join("\n"))
    const [rows, setRows] = useState(2)

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleHeightChange = (height: number, { rowHeight }: TextareaHeightChangeMeta) => {
        setRows(height / rowHeight + 1)
    }

    const handleStringValueChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setStringValue(event.target.value)
        onChange(parseHexCodeList(event.target.value))
    }

    return (
        <div className="flex bg-neutral-900 pb-2 text-xl" onClick={() => textareaRef.current?.focus()}>
            <div className="mt-[0.4rem] ms-2 flex flex-col gap-1">
                <div className="w-6"></div>
                {values.concat([""]).map((hexCode, index) =>
                    <div
                        key={index}
                        className="w-6 h-6"
                        style={{ backgroundColor: hexCode ? `#${hexCode}` : "#000" }}
                    ></div>
                )}
            </div>
            <div className="mt-2 ps-1">
                {Array.from({ length: rows }).map((_, index) =>
                    <Fragment key={index}>#<br /></Fragment>
                )}
            </div>
            <TextareaAutosize
                ref={textareaRef}
                className="flex-grow outline-0 p-2 ps-0 placeholder:text-neutral-700"
                minRows={1}
                onHeightChange={handleHeightChange}
                style={{ resize: "none" }}
                placeholder="000000"
                value={stringValue}
                onChange={handleStringValueChange}
            />
        </div>
    )
}