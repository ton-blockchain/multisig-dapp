import { hookstate, useHookstate } from '@hookstate/core';
import { TonClient } from '@ton/ton';

const TonConnection = hookstate(
    new TonClient({
        endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    })
);

export function useTonClient() {
    return useHookstate(TonConnection);
}

export function setTonClient(newClient) {
    TonConnection.set(newClient);
}

export { TonConnection };
