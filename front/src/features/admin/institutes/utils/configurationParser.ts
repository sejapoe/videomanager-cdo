export type InstitutesConfiguration = {
    institutes: {
        name: string;
        departments: { name: string, shortName?: string }[];
    }[]
}

const parseJson = (json: string): InstitutesConfiguration => {
    return JSON.parse(json)
}

const parseXml = (xml: string): InstitutesConfiguration => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");

    const institutesList = xmlDoc.getElementsByTagName("institutes")[0].children;

    let institutes: { name: string, departments: { name: string, shortName?: string }[] }[] = [];

    for (let i = 0; i < institutesList.length; i++) {
        let name = institutesList[i].getElementsByTagName('name')[0].textContent || '';
        let departmentsElems = institutesList[i].getElementsByTagName('departments')[0].children;
        let departments: { name: string, shortName?: string }[] = [];
        for (let j = 0; j < departmentsElems.length; j++) {
            let departmentName = departmentsElems[j].getElementsByTagName("name")[0].textContent || '';
            let departmentShortName = departmentsElems[j].getElementsByTagName("shortName").item(0)?.textContent || undefined;
            departments.push({
                name: departmentName,
                shortName: departmentShortName
            });
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