const API_URL = import.meta.env.VITE_API_URL;

export async function request(path, { method = "GET", body, token } = {}) {

    const headers = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;

    let response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    } catch (error) {
        throw new Error("No se pudo conectar con el servidor");
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message ?? "Ocurrio un error");
    }
    return data;

}

