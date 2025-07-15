import { Header, Setting } from "../type/Types";

export function getOrderedVisibleHeaders(
    header: Header[],
    order?: String[],
    hidden?: String[],
): Header[] {
    const filtered = header.filter(
        h => h.key !== "checker" && h.key !== "no"
    );
    if (!order && !hidden) return filtered;

    const newOrders = [
        ...(order
            ?.map(key => filtered.find(h => h.key === key))
            .filter(Boolean) as Header[]),

        ...filtered.filter(h => !order?.includes(h.key))
    ];

    const newHeaders = newOrders.filter(
        h => !hidden?.includes(h.key)
    );

    return newHeaders;
}


