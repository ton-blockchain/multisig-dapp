import { cancel, cancel2 } from '../assets';
import { MultisigOrderBuilder, Address, Cell, beginCell } from '@ton/ton';
import { useMultisigWallet } from '../store/multisigWallet';

const Order = () => {
    const wallet = useMultisigWallet();

    let id = 0;

    const DeleteNew = (e) => {
        try {
            document.getElementById(`k${e}`).remove();
        } catch {}
    };

    function WriteNeed(g1, g2, g3) {
        document.querySelector('.elem1').value = g1;
        document.querySelector('.elem2').value = g2;
        document.querySelector('.elem3').value = g3;
    }

    function AddSmth() {
        if (document.querySelector('.list-orders').children.length >= 4) {
            return;
        }
        id++;
        let g1 = document.querySelector('.elem1').value;
        let g2 = document.querySelector('.elem2').value;
        let g3 = document.querySelector('.elem3').value;
        let h = cancel;
        if (document.documentElement.classList.contains('dark')) {
            h = cancel2;
        }
        document.querySelector('.list-orders').insertAdjacentHTML(
            'beforeend',
            `<div id="k${id}" class="grid border-2 dark:border-[rgba(16, 22, 31, 1)] ml-[2rem] mr-[2rem] grid-cols-2">
        <h1 class="el1 font-semibold md:text-[3rem] font-usual truncate w-[90%] mt-auto mb-auto">${
            g1.slice(0, 4) + '..' + g1.slice(-4)
        }</h1>
        <div class="flex gap-5 justify-end">
        <h1 class="el2 text-left max-w-max font-semibold md:text-[2rem] font-usual truncate w-[90%] mt-auto mb-auto">${g2}</h1>
            <img id='i${id}' src=${h} alt="" class="cancel cursor-pointer keyimg h-[1.4rem] md:h-[4rem] mb-auto mt-auto"/>
            <h1 class="el1 hidden">${g1}</h1>
            <h1 class="el3 hidden">${g3}</h1>
        </div>
        </div>`
        );
        let o = id;
        document
            .getElementById(`i${o}`)
            .addEventListener('click', () => DeleteNew(o));
        document
            .getElementById(`k${o}`)
            .addEventListener('click', () => WriteNeed(g1, g2, g3));
    }

    function getAllAddedMessages() {
        const orderListContainer = document.querySelector('.list-orders');
        const orders = orderListContainer.children;
        const orderObjects = [];

        for (let order of orders) {
            const destinationElem = order.querySelector('.el1.hidden');
            const amountElem = order.querySelector('.el2');
            const bodyElem = order.querySelector('.el3.hidden');

            if (destinationElem && amountElem && bodyElem) {
                const orderObject = {
                    destination: Address.parse(
                        destinationElem.textContent.trim()
                    ),
                    amount: BigInt(amountElem.textContent.trim()),
                    body: bodyElem.textContent.trim(),
                };
                orderObjects.push(orderObject);
            }
        }
        return orderObjects;
    }

    function assembleOrder() {
        const messages = getAllAddedMessages();
        let orderBuilder = new MultisigOrderBuilder(
            wallet.value.wallet.walletId
        );
        for (const msg of messages) {
            let body;
            try {
                body = Cell.fromBase64(msg.body);
            } catch (e) {
                body = beginCell().storeStringTail(msg.body).endCell();
            }
            orderBuilder.addMessage(
                {
                    info: {
                        bounce: false,
                        bounced: false,
                        createdAt: 0,
                        createdLt: 0n,
                        dest: msg.destination,
                        forwardFee: 0n,
                        ihrDisabled: true,
                        ihrFee: 0n,
                        type: 'internal',
                        value: {
                            coins: BigInt(msg.amount),
                        },
                    },
                    body,
                },
                3
            );
        }
        return orderBuilder.build();
    }

    function SaveDisk() {
        const order = assembleOrder();
        const blob = new Blob([order.toCell(wallet.value.ownerId).toBoc()]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'order.boc';
        a.click();
    }

    function SignSend() {
        // ОБРАБОТАТЬ
    }

    return (
        <div
            id="modal"
            className="hidden modal flex flex-col justify-center w-screen h-screen"
        >
            <div
                id="modal-content"
                className="dark:text-white flex flex-col gap-4 md:gap-8 bg-white-mode1 dark:bg-black-mode1 w-[90%] md:w-[45%] h-auto ml-auto mr-auto pb-[2rem] rounded-lg"
            >
                <h1 className="font-semibold dark:text-white text-[1.3rem] md:text-[2rem] pl-[1.5rem] pt-[0.3rem] pb-[0.3rem] font-usual ml-auto mr-auto">
                    Create new order
                </h1>
                <input
                    type="text"
                    name="serach"
                    className="elem1 dark:text-white pl-[1rem] ml-auto mr-auto good-input dark:bg-[rgb(30,31,34)] w-[80%] max-w-full h-[3.5rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[1.8rem]"
                    placeholder="Recipient"
                />
                <input
                    type="text"
                    name="serach"
                    className="elem2 dark:text-white pl-[1rem] ml-auto mr-auto good-input dark:bg-[rgb(30,31,34)] w-[80%] max-w-full h-[3.5rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[1.8rem]"
                    placeholder="Amount"
                />
                <input
                    type="text"
                    name="serach"
                    className="elem3 dark:text-white pl-[1rem] ml-auto mr-auto good-input dark:bg-[rgb(30,31,34)] w-[80%] max-w-full h-[3.5rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[1.8rem]"
                    placeholder="Text comment or base64 raw body"
                />
                <div className="flex gap-2">
                    <div
                        onClick={AddSmth}
                        className="cursor-pointer w-full mt-auto mb-auto text-[1.2rem] lg:text-[2rem] font-[550] flex flex-col justify-center h-[2rem] lg:h-[3rem] bg-gray-400 text-center align-middle rounded-lg ml-[1.3rem]"
                    >
                        Add
                    </div>
                    <div
                        onClick={SaveDisk}
                        className="cursor-pointer w-full mt-auto mb-auto text-[1.2rem] lg:text-[2rem] font-[550] flex flex-col justify-center h-[2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-lg mr-[1.3rem]"
                    >
                        Save to disk
                    </div>
                </div>
                <div className="flex">
                    <div
                        onClick={SignSend}
                        className="cursor-pointer w-full mt-auto mb-auto text-[1.5rem] lg:text-[2rem] font-[550] flex flex-col justify-center h-[2.2rem] lg:h-[2.6rem] bg-button-blue text-center align-middle rounded-lg ml-[1.3rem] mr-[1.3rem]"
                    >
                        Sign & send
                    </div>
                </div>
                <div className="list-orders flex flex-col gap-4"></div>
            </div>
        </div>
    );
};

export default Order;
