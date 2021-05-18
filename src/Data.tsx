export enum Editors {
    Switch,
    TextField,
    NumberField,
}

export interface Data {
    name: string;
    type: Editors;
    value: any,
    minValue?: number,
    maxValue?: number,
}

export function createData(
    name: string,
    type: Editors,
    value: any,
    minValue?: number,
    maxValue?: number,
): Data {
    return { name, type, value, minValue, maxValue };
}
