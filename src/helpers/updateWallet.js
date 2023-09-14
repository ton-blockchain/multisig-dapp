import { MultisigWallet } from '@ton/ton';

export async function updateWallet(wallet, tonClient, address) {
    try {
        const multisigWallet = await MultisigWallet.fromAddress(address, {
            client: tonClient.value,
        });
        wallet.set({
            wallet: multisigWallet,
            lastActive: 100000000000,
            balance: await tonClient.value.getBalance(address),
        });
    } catch (e) {
        console.log(e);
        return;
    }
}
