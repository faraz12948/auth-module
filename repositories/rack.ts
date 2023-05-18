import pool from "../configs/dbConfig"
import { CommonResponseType, RackComponentListType, RackDetailsType } from "../interfaces/rack";

export const getRackDetailsFromDb = async (id: string) => {
    const data: CommonResponseType<RackDetailsType> = await pool.query(`SELECT id, "name", make, model, svg_path as "svgPath", parent_location_id as "parentLocationId" FROM public.racks where id = ` + id);
    const equipments = await pool.query('SELECT id, "name", "type", make, model, rack_position as "rackPosition", svg_path as "svgPath", parent_rack_id as "parentRackId" FROM public.equipments where parent_rack_id = ' + id)
    const equipmentTypes: RackComponentListType = {
        server: { list: [] },
        storage: { list: [] },
        router: { list: [] },
        switch: { list: [] },
        firewall: { list: [] },
        securityDevice: { list: [] },
        ap: { list: [] },
    }
    for (let equipment of equipments.rows) {
        equipmentTypes[equipment.type as keyof typeof equipmentTypes]!.list.push(equipment)
    }
    Object.keys(equipmentTypes).forEach((equipment: string) => {
        if (!equipmentTypes[equipment as keyof typeof equipmentTypes]!.list.length)
            equipmentTypes[equipment as keyof typeof equipmentTypes] = null
    })
    return { ...data.rows[0], type: "rack-details", ...equipmentTypes }
}

export const getRackUnitDetailsFromDb = async (id: string) => {
    const dummyEquipmentData = {
        "/svg/switch/cisco/c9000/C9500-16X-Front.svg": {
            title: "Core Switch",
            model: "C9500-16X",
            status: 'Active',
            serialNo: 'SL 829',
            warrantyDate: '22/01/25'
        },
        "/svg/router/cisco/ISR4000/ISR4431-K9.svg": {
            title: "Internet_RTR-01",
            model: "ISR4431/K9",
            status: 'Inactive',
            serialNo: 'SL 866',
            warrantyDate: '22/12/25'
        },
        "/svg/firewall/sophos/XGS4000/XGS-4500-Front.svg": {
            title: "Internet_FW-01",
            model: "XGS4500",
            status: 'Active',
            serialNo: 'SL 528',
            warrantyDate: '22/05/25'
        },
        "/svg/switch/cisco/c9000/C9200-24T-A-Front.svg": {
            title: "BCH-GF-SW-01",
            model: "C9200-24T-A",
            status: 'Active',
            serialNo: 'SL 339',
            warrantyDate: '22/01/25'
        },
        "/svg/switch/cisco/c9000/C9200L-48T-4X-Front.svg": {
            title: "DCH-GF-SW-01",
            model: "C9200L-48T-4X",
            status: 'Active',
            serialNo: 'SL 439',
            warrantyDate: '22/01/25'
        }
    }
    return {
        equipment: dummyEquipmentData[id as keyof typeof dummyEquipmentData]
    }
}