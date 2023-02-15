export default function cleanObject(obj: { [key: string]: any }) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value || value === 0) {
            acc[key] = value;
        }
        return acc;
    }, {} as { [key: string]: any });
}
