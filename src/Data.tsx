export enum Editors {
    Switch,
    TextField,
    NumberField,
    OptionsField,
}

export interface Data {
    name: string
    type: Editors
    value: any
    minValue?: number
    maxValue?: number
    options?: Record<string, string>
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
    let type: Editors = Editors.NumberField;
    return { name, type, value, minValue, maxValue };
}

export function createOptionsFieldData(
    name: string,
    value: any,
    options?: Record<string, string>,
): Data {
    let type: Editors = Editors.OptionsField;
    return { name, type, value , options };
}
