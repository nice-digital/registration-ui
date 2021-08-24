const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://main.d36975sqzx9ikk.amplifyapp.com';

export async function fetchData(context: any, url: string) {
    const res = await fetch(`${server}${url}`, {
        headers: { Cookie: context.req.headers.cookie }
    });
    return await res.json();
}