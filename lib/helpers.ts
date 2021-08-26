const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : process.env.SELF_URL;

export const backend_url = process.env.BACKEND_URL || "https://localhost";

export async function fetchData(url: string, headersForFetch: any) {
    const headers = Object.assign({}, headersForFetch);
    const fetchUrl = url.startsWith("http") ? url : `${server}${url}`;
    const res = await fetch(fetchUrl, { headers : headers });
    return await res.json();
}