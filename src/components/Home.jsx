import { multisigwallet, protection, protection2 } from '../assets';
import { Address, TonClient } from '@ton/ton';
import { useTonClient } from '../store/tonClient';
import useLocalStorage from 'react-use-localstorage';

const Home = () => {
    const tonClient = useTonClient();
    const [isDarkmode, setDarkmode] = useLocalStorage('isDarkmode', 'false');

    async function handleSubmit() {
        try {
            const address = Address.parse(
                document.getElementById('wallet').value.trim()
            );
            const result = await tonClient.value.runMethod(
                address,
                'get_n_k',
                []
            );
        } catch (e) {
            console.log(e);
            return;
        }

        window.history.pushState(
            null,
            null,
            `/wallet/${document.getElementById('wallet').value}`
        );
        document.getElementsByClassName('home')[0].classList.add('hidden');
        document.getElementsByClassName('new')[0].classList.add('hidden');
        document.getElementsByClassName('wallet')[0].classList.remove('hidden');
    }

    function handleSubmit2() {
        document
            .getElementById('wallet')
            .addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    handleSubmit();
                }
            });
        if (document.getElementById('wallet').value !== '') {
            // console.log(document.getElementsByClassName("fa2"));
            document
                .getElementsByClassName('fa2')[0]
                .classList.remove('hidden');
        } else {
            document.getElementsByClassName('fa2')[0].classList.add('hidden');
        }
    }

    return (
        <div
            className={`home grow flex flex-col justify-center pb-[7rem] ${
                window.location.pathname != '/create' &&
                window.location.pathname.slice(0, 7) != '/wallet'
                    ? ''
                    : 'hidden'
            }`}
        >
            <img
                src={multisigwallet}
                className="w-[17rem] md:w-[50vw] ml-auto mr-auto mb-[2.5rem]"
                alt=""
            />
            <img
                src={isDarkmode == 'true' ? protection2 : protection}
                className="protection w-[20rem] md:w-[53vw] ml-auto mr-auto mb-[3rem]"
                alt=""
            />
            <div className="inputWithIcon w-[90%] md:w-[35rem] lg:w-[45rem] 2xl:w-[55rem] ml-auto mr-auto">
                <i className="fa dark:fa" aria-hidden="true"></i>
                <input
                    id="wallet"
                    onChange={handleSubmit2}
                    type="text"
                    name="serach"
                    className="dark:text-white dark:bg-[rgb(30,31,34)] homeInput good-input w-full max-w-full h-[4rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[1.9rem]"
                    placeholder="Enter a multi-sig wallet address to start"
                />
                <i
                    onClick={handleSubmit}
                    aria-hidden="true"
                    className="cursor-pointer fa2 dark:fa2 hidden"
                ></i>
            </div>
        </div>
    );
};

export default Home;
