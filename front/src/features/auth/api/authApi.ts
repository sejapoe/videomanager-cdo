export const authKey = [{scope: 'auth'}] as unknown[]

export const authKeys = {
    session: {
        root: [...authKey, 'session'],
        currentUser: () => [...authKeys.session.root, 'currentUser'],
    },

    activation: {
        root: [...authKey, 'activation'],
        byUUID: (uuid: string) => [...authKeys.activation.root, uuid]
    },

    mutation: {
        login: () => [...authKeys.session.root, 'login'],
        create: () => [...authKeys.session.root, 'create'],
        activate: () => [...authKeys.activation.root, 'activate']
    }
}