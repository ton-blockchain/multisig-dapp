import { Address } from '@ton/core';

export async function updateUserWallet(wallet, tonClient) {
    if (typeof ton === 'undefined') {
        alert('Install any TON wallet extension');
        return;
    }

    const address = Address.parse((await ton.send('ton_requestAccounts'))[0]);
    const publicKey = Buffer.from(
        (await tonClient.value.runMethod(address, 'get_public_key', [])).stack
            .readBigNumber()
            .toString(16)
            .padStart(64, '0'),
        'hex'
    );

    wallet.set({
        address: address,
        publicKey: publicKey,
    });
}
