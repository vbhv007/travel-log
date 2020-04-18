const API_URL = "http://localhost:8080"


export async function listAllLogs() {
    const response = await fetch(API_URL + "/logs", {
        method: "POST",
        body: JSON.stringify({}),
    });
    return response.json();
}