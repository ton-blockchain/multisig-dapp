import { hookstate, useHookstate } from '@hookstate/core';

const MultisigWallet = hookstate({
    wallet: {
        k: 0,
        owners: [],
    },
    balance: 0n,
    lastActive: 0,
});

export function useMultisigWallet() {
    return useHookstate(MultisigWallet);
}

export async function setMultisigWallet(newWallet) {
    MultisigWallet.set(newWallet);
}

export { MultisigWallet };
