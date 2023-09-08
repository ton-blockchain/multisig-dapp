import { Toggle } from "./Toggle";
import { ton, settings, settings2, protection, protection2, more, more2, cancel, cancel2, balance, balance2, download, download2 } from "../assets";

const Menu = () => {
      function Testnet() {
        // ОБРАБОТЧИК 
        if (document.getElementsByClassName("testnet")[0].classList.contains('hidden')) { 
          localStorage.setItem('testnet', 1);
        } else {
          localStorage.setItem('testnet', 0);
        }
        document.getElementsByClassName("testnet")[0].classList.toggle("hidden");
    }

    function DarkMode() {
      if (!document.documentElement.classList.contains('dark')) {  
        console.log(1);
        localStorage.setItem('darkmode', 1);
        document.getElementsByClassName("protection")[0].src = protection2;
        document.getElementsByClassName("icon_set")[0].src = settings2;
        document.getElementsByClassName("more")[0].src = more2;
        for (let i = 0; i < document.getElementsByClassName("cancel").length; i++) {
          document.getElementsByClassName("cancel")[i].src = cancel2;
        }
        document.getElementsByClassName("balance")[0].src = balance2;
        document.getElementsByClassName("download")[0].src = download2;
      } else {
        localStorage.setItem('darkmode', 0);
        document.getElementsByClassName("protection")[0].src = protection;
        document.getElementsByClassName("icon_set")[0].src = settings;
        document.getElementsByClassName("more")[0].src = more;
        for (let i = 0; i < document.getElementsByClassName("cancel").length; i++) {
          document.getElementsByClassName("cancel")[i].src = cancel;
        }
        document.getElementsByClassName("balance")[0].src = balance;
        document.getElementsByClassName("download")[0].src = download;
      }
      document.documentElement.classList.toggle('dark')
    };

    function Buuton_new() {
        if (document.getElementsByClassName("new")[0].classList.contains('hidden')){ // wallet, home
          window.history.pushState(null, null, '/create');
          document.getElementsByClassName("home")[0].classList.add("hidden");
          document.getElementsByClassName("new")[0].classList.remove("hidden");
          document.getElementsByClassName("wallet")[0].classList.add("hidden");
          document.getElementsByClassName('Buuton')[0].textContent = "Back to home page";
        } else {
            window.history.pushState(null, null, '/');
            document.getElementsByClassName("home")[0].classList.remove("hidden");
            document.getElementsByClassName("new")[0].classList.add("hidden");
            document.getElementsByClassName("wallet")[0].classList.add("hidden");
            document.getElementsByClassName('Buuton')[0].textContent = "New wallet";
        }
    };

    function logoBack() {
        window.history.pushState(null, null, '/');
        document.getElementsByClassName("home")[0].classList.remove("hidden");
        document.getElementsByClassName("new")[0].classList.add("hidden");
        document.getElementsByClassName("wallet")[0].classList.add("hidden");
        document.getElementsByClassName('Buuton')[0].textContent = "New wallet";
    }

    function Buuton_click() {
        // ОБРАБОТКА
        document.getElementsByClassName("settings")[0].classList.toggle("hidden");
    };

    
    if (localStorage.getItem('darkmode') == 1) {
      document.documentElement.classList.add('dark');
    }

    return (
      <header className="static bg-white-mode1 dark:bg-black-mode1  flex justify-between h-[5rem] 2xl:h-[6rem] align-middle">
        <div className="flex align-middle gap-1">
          <img onClick={logoBack} src={ton} alt="" className="cursor-pointer h-[40px] 2xl:h-[55px] mt-auto mb-auto ml-[1rem]" />
          <div className={`${localStorage.getItem('testnet') != 1 ? "hidden" : ""} testnet mt-auto mb-auto sm:ml-[0.2rem] md:ml-[2rem] max-w-max md:text-[1.2rem] font-[550] flex flex-col justify-center h-[1.5rem] md:h-[2.2rem] bg-button-blue text-center align-middle rounded-full text-white pl-[0.8rem] pr-[0.8rem] md:pl-[1.2rem] md:pr-[1.2rem]`}>Testnet</div>
                
        </div>
        <div className="flex align-middle mr-[1rem]">
          <h1 onClick={Buuton_new} className="cursor-pointer Buuton 2xl:text-[1.5rem] text-usual text-wallet dark:text-darkwallet font-semibold mt-auto mb-auto mr-[0.4rem] md:mr-[1.5rem] 2xl:mr-[2.5rem]">New wallet</h1>
          <img onClick={Buuton_click} src={localStorage.getItem('darkmode') == 0 ? settings : settings2} alt="" className="icon_set cursor-pointer h-[40px] 2xl:h-[55px] mt-auto mb-auto" />
        </div>
        <div className="hidden settings flex flex-col settings h-[7rem] bg-[#D5D7D8] dark:bg-[rgb(56,58,58)] fixed z-1 right-5 top-[5rem] pl-[1rem] pr-[1rem] rounded-lg">
          <div className="flex justify-between mt-auto mb-auto">
            <h1 className="font-mono font-[550] text-[1.5rem] lg:text-[1.9rem] mr-[0.8rem]">Testnet</h1>
            <Toggle
                label="tesnet mode"
                toggled={localStorage.getItem('testnet') == 1 ? true : false}
                onClick={Testnet}
            />
          </div>
          <div className="flex justify-between mt-auto mb-auto">
            <h1 className="font-mono font-[550] text-[1.5rem] lg:text-[1.7rem] mr-[0.8rem]">Dark mode</h1>
            <Toggle
                label="tesnet mode"
                toggled={localStorage.getItem('darkmode') == 1 ? true : false}
                onClick={DarkMode}
            />
          </div>
        </div>
      </header>
    );
  };
  
  export default Menu;
  