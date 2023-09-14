import { hookstate, useHookstate } from '@hookstate/core';

const UserWallet = hookstate({
    address: null,
    publicKey: null,
});

export function useUserWallet() {
    return useHookstate(UserWallet);
}

export async function setUserWallet(newWallet) {
    UserWallet.set(newWallet);
}

export { UserWallet };
