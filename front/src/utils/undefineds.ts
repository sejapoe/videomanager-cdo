export const m1u = (x?: number) => x === -1 ? undefined : x
export const bIu = (x?: string) => x === "" ? undefined : x

export const eIu = (x?: any[]) => x?.length === 0 ? undefined : x