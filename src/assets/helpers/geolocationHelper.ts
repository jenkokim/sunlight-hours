export async function fetchCurrentLocation() {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
        if ('geolocation' in navigator) {
            const timeoutId = setTimeout(() => {
                reject(new Error('Geolocation request timed out.'));
            }, 500); // Timeout di 500 millisecondi (mezzo secondo)

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    clearTimeout(timeoutId);
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    resolve({ lat, lng });
                },
                (error) => {
                    clearTimeout(timeoutId);
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by your browser'));
        }
    });
}
