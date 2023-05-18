export type RackStorage = {
    list: {
        name: string,
        model: string,
        ipAddress: string
    }[]
}

export type RackServer = {
    list: {
        name: string,
        model: string,
        ipAddress: string
    }[]
}

export type RackRouter = {
    list: {
        name: string,
        model: string,
        ipAddress: string
    }[]
}

export type RackSwitch = {
    list: {
        name: string,
        model: string,
        ipAddress: string
    }[]
}

export type RackFirewall = {
    list: {
        name: string,
        model: string,
        ipAddress: string
    }[]
}

export type RackSecurityDevice = {
    list: {
        name: string,
        model: string,
        ipAddress: string
    }[]
}

export type RackAp = {
    list: {
        name: string,
        model: string,
        ipAddress: string
    }[]
}

export interface RackComponentListType {
    server: RackServer | null,
    storage: RackStorage | null,
    router: RackRouter | null,
    switch: RackSwitch | null,
    firewall: RackFirewall | null,
    securityDevice: RackSecurityDevice | null,
    ap: RackAp | null
}

export interface RackDetailsType extends RackComponentListType {
    svgPath: string,
    type: string,
}


export type CommonResponseType<T> = {
    rows:T[]
}