const API_URL = "http://localhost:8080"


export async function listAllLogs() {
    const response = await fetch(API_URL + "/logs", {
        method: "POST",
        body: JSON.stringify({}),
    });
    return response.json();
}

export async function addLog(entry) {
    const response = await fetch(API_URL + "/addLog", {
        method: 'POST',
        body: JSON.stringify(entry),
    });
    let json;
    json = await response.json();
    if (response.ok) {
        return json;
    }
    const error = new Error(json.message);
    error.response = json;
    throw error;
}