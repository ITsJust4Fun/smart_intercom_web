export enum Editors {
    Switch,
    TextField,
    NumberField,
    OptionsField,
    Button,
}

export interface Data {
    name: string
    type: Editors
    value?: any
    minValue?: number
    maxValue?: number
    options?: Record<string, string>
    buttonHandler?: () => void
}

export function createData(
    name: string,
    type: Editors,
    value: any,
): Data {
    return { name, type, value };
}

export function createNumberFieldData(
    name: string,
    value: any,
    minValue: number,
    maxValue: number,
): Data {
    let type = Editors.NumberField;
    return { name, type, value, minValue, maxValue };
}

export function createOptionsFieldData(
    name: string,
    value: any,
    options?: Record<string, string>,
): Data {
    let type = Editors.OptionsField;
    return { name, type, value , options };
}

export function createButton (
    name: string,
    buttonHandler: () => void
) : Data {
    let type = Editors.Button
    return { name, type, buttonHandler }
}
