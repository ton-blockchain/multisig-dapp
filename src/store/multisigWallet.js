import { hookstate, useHookstate } from '@hookstate/core';

const MultisigWallet = hookstate({
    wallet: {
        k: 0,
        owners: [],
    },
    balance: 0n,
    lastActive: 0,
    ownerId: -1,
});

export function useMultisigWallet() {
    return useHookstate(MultisigWallet);
}

export async function setMultisigWallet(newWallet) {
    MultisigWallet.set(newWallet);
}

export { MultisigWallet };
