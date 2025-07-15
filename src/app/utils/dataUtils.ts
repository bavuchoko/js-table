export function getNestedValue(obj: any, path: String) {
    return path.split('.').reduce((acc, part) => {
        if (Array.isArray(acc)) {
            return acc.map(item => item[part]).join(', ');
        }
        return acc && acc[part];
    }, obj);
}
