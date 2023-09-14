import { MultisigWallet } from '@ton/ton';

export async function updateWallet(wallet, tonClient, address) {
    try {
        const multisigWallet = await MultisigWallet.fromAddress(address, {
            client: tonClient.value,
        });
        const lastTx = (await tonClient.value.getContractState(address))
            .lastTransaction;
        const lastTxFull = await tonClient.value.getTransaction(
            address,
            lastTx.lt,
            lastTx.hash
        );
        if (
            wallet.value.lastActive === lastTxFull.now &&
            wallet.value.balance === (await tonClient.value.getBalance(address))
        ) {
            return;
        }
        wallet.set({
            wallet: multisigWallet,
            lastActive: lastTxFull.now * 1000,
            balance: await tonClient.value.getBalance(address),
        });
    } catch (e) {
        console.log(e);
        return;
    }
}
