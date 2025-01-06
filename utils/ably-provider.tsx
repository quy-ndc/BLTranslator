import Ably from 'ably';
import { AblyProvider } from 'ably/react';


export default function AblyWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const client = new Ably.Realtime({ key: '7JGA0Q.1g2U-w:mDeAHPRUHReHJ2NtnpfNoWttFWLZy1JDUXluo-xpDl8', clientId: Date.now().toString() });

    return (
        <AblyProvider client={client}>
            {children}
        </AblyProvider>
    );
}