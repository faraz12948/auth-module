import { getRackDetailsFromDb, getRackUnitDetailsFromDb } from "../repositories/rack"

export const getRackDataById = async (id: string) => {
    const data = await getRackDetailsFromDb(id)
    return data
}

export const getRackUnitDataBySVGPath = async (id: string) => {
    const data = await getRackUnitDetailsFromDb(id)
    return data
}
