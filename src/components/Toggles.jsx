import { useEffect } from 'react';
import { useTonClient } from '../store/tonClient';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from '@ton/ton';
import useLocalStorage from 'react-use-localstorage';
import {
    settings,
    settings2,
    protection,
    protection2,
    more,
    more2,
    cancel,
    cancel2,
    balance,
    balance2,
    download,
    download2,
} from '../assets';

export const ToggleTestnet = () => {
    const [isTestnet, setTestnet] = useLocalStorage('isTestnet', 'false');

    const tonClient = useTonClient();

    useEffect(() => {
        console.log('change network');
        if (isTestnet == 'false') {
            if (
                !document
                    .getElementsByClassName('testnet')[0]
                    .classList.contains('hidden')
            )
                document
                    .getElementsByClassName('testnet')[0]
                    .classList.toggle('hidden');
        } else if (
            document
                .getElementsByClassName('testnet')[0]
                .classList.contains('hidden')
        ) {
            document
                .getElementsByClassName('testnet')[0]
                .classList.toggle('hidden');
        }

        getHttpEndpoint({
            network: isTestnet === 'true' ? 'testnet' : 'mainnet',
        }).then((endpoint) => {
            console.log(endpoint);
            tonClient.set(
                new TonClient({
                    endpoint,
                })
            );
            console.log(tonClient);
        });
    }, [isTestnet]);

    return (
        <label className="mt-auto mb-auto">
            <input
                className="dh"
                type="checkbox"
                checked={isTestnet === 'true'}
                onChange={(e) => setTestnet(String(e.target.checked))}
            />
            <span className="df" />
        </label>
    );
};

export const ToggleDarkmode = () => {
    const [isDarkmode, setDarkmode] = useLocalStorage('isDarkmode', 'false');

    useEffect(() => {
        console.log('change darkmode');
        if (isDarkmode == 'true') {
            console.log(1);
            document.getElementsByClassName('protection')[0].src = protection2;
            document.getElementsByClassName('icon_set')[0].src = settings2;
            document.getElementsByClassName('more')[0].src = more2;
            for (
                let i = 0;
                i < document.getElementsByClassName('cancel').length;
                i++
            ) {
                document.getElementsByClassName('cancel')[i].src = cancel2;
            }
            document.getElementsByClassName('balance')[0].src = balance2;
            document.getElementsByClassName('download')[0].src = download2;
            document.documentElement.classList.add('dark');
        } else {
            document.getElementsByClassName('protection')[0].src = protection;
            document.getElementsByClassName('icon_set')[0].src = settings;
            document.getElementsByClassName('more')[0].src = more;
            for (
                let i = 0;
                i < document.getElementsByClassName('cancel').length;
                i++
            ) {
                document.getElementsByClassName('cancel')[i].src = cancel;
            }
            document.getElementsByClassName('balance')[0].src = balance;
            document.getElementsByClassName('download')[0].src = download;
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkmode]);

    return (
        <label className="mt-auto mb-auto">
            <input
                className="dh"
                type="checkbox"
                checked={isDarkmode === 'true'}
                onChange={(e) => setDarkmode(String(e.target.checked))}
            />
            <span className="df" />
        </label>
    );
};
