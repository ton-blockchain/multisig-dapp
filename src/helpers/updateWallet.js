import { MultisigWallet } from '@ton/ton';

export async function updateWallet(wallet, tonClient, address, userWallet) {
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

        let ownerId;

        if (wallet.value.ownerId != -1) {
            ownerId = await wallet.value.wallet.getOwnerIdByPubkey(
                userWallet.value.publicKey
            );
        }

        if (
            wallet.value.lastActive === lastTxFull.now * 1000 &&
            wallet.value.balance ===
                (await tonClient.value.getBalance(address)) &&
            wallet.value.ownerId === ownerId
        ) {
            return;
        }

        wallet.set({
            wallet: multisigWallet,
            lastActive: lastTxFull.now * 1000,
            balance: await tonClient.value.getBalance(address),
            ownerId: ownerId,
        });

        console.log(ownerId);
    } catch (e) {
        console.log(e);
        return;
    }
}
