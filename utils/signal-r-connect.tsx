import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const connectToSignalR = async (client: string, hubName: string) => {
    const connection = new HubConnectionBuilder()
        .withUrl(`https://body-translator.azurewebsites.net/${hubName}`, {
            headers: {
                client: client
            },
            withCredentials: false,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

    try {
        await connection.start();
        console.log('BLT server connected');
    } catch (err) {
        console.error('Error connecting to SignalR:', err);
    }

    return connection;
};

export default connectToSignalR; 