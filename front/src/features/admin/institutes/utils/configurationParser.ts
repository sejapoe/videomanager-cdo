export type InstitutesConfiguration = {
    institutes: {
        name: string;
        departments: string[];
    }[]
}

const parseJson = (json: string): InstitutesConfiguration => {
    return JSON.parse(json)
}

const parseXml = (xml: string): InstitutesConfiguration => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");

    const institutesList = xmlDoc.getElementsByTagName("institutes")[0].children;

    let institutes: { name: string, departments: string[] }[] = [];

    for (let i = 0; i < institutesList.length; i++) {
        let name = institutesList[i].getElementsByTagName('name')[0].textContent || '';
        let departmentsElems = institutesList[i].getElementsByTagName('departments')[0].children;
        let departments: string[] = [];
        for (let j = 0; j < departmentsElems.length; j++) {
            departments.push(departmentsElems[j].textContent || '');
        }
        institutes.push({name, departments});
    }

    return {institutes};
}

export const parseFile = (file: File): Promise<InstitutesConfiguration> => {
    return new Promise(async (resolve, reject) => {
        const contents = await file.text()

        if (file.type === "application/json") {
            resolve(parseJson(contents));
        } else if (file.type === "application/xml" || file.type === "text/xml") {
            resolve(parseXml(contents));
        } else {
            reject(new Error("Invalid file type"));
        }
    });
}