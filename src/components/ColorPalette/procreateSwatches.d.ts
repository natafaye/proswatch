declare module "procreate-swatches" {
    export function createSwatchesFile(
        name: string,
        colors: Array<[[number, number, number], string] | null>
    ): Promise<ArrayBuffer>;
}