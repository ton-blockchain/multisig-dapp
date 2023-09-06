import { Toggle } from "./Toggle";
import { ton, settings, multisigwallet, protection } from "../assets";

const Menu = () => {
    const Testnet = state => {
        // ОБРАБОТЧИК 
        document.getElementsByClassName("testnet")[0].classList.toggle("hidden");
    }

    function Buuton_new() {
        if (document.getElementsByClassName("new")[0].classList.contains('hidden')){ // wallet, home
            console.log(1);
            document.getElementsByClassName("home")[0].classList.add("hidden");
            document.getElementsByClassName("new")[0].classList.remove("hidden");
            document.getElementsByClassName("wallet")[0].classList.add("hidden");
            document.getElementsByClassName('Buuton')[0].textContent = "Connect wallet";
        } else {
            document.getElementsByClassName("home")[0].classList.remove("hidden");
            document.getElementsByClassName("new")[0].classList.add("hidden");
            document.getElementsByClassName("wallet")[0].classList.add("hidden");
            document.getElementsByClassName('Buuton')[0].textContent = "New wallet";
        }
    };

    function logoBack() {
        document.getElementsByClassName("home")[0].classList.remove("hidden");
        document.getElementsByClassName("new")[0].classList.add("hidden");
        document.getElementsByClassName("wallet")[0].classList.add("hidden");
        document.getElementsByClassName('Buuton')[0].textContent = "New wallet";
    }

    function Buuton_click() {
        // ОБРАБОТКА
        document.getElementsByClassName("settings")[0].classList.toggle("hidden");
    };

    return (
      <header className="static bg-white-mode1 flex justify-between h-[5rem] 2xl:h-[6rem] align-middle">
        <div className="flex align-middle gap-1">
          <img onClick={logoBack} src={ton} alt="" className="h-[50px] 2xl:h-[70px] mt-auto mb-auto ml-[1rem]" />
          <div className="hidden testnet mt-auto mb-auto sm:ml-[1rem] md:ml-[4rem] max-w-max text-[1.5rem] font-bold flex flex-col justify-center h-[2.2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-full text-white pl-[1.3rem] pr-[1.3rem]">Testnet</div>
        </div>
        <div className="flex align-middle mr-[1rem]">
          <h1 onClick={Buuton_new} className="Buuton 2xl:text-[1.7rem] text-usual text-wallet font-semibold mt-auto mb-auto mr-[1.5rem]">New wallet</h1>
          <img onClick={Buuton_click} src={settings} alt="" className="h-[50px] 2xl:h-[70px] mt-auto mb-auto" />
        </div>
        <div className="hidden settings flex flex-col settings w-[15rem] h-[5rem] bg-[#D5D7D8] fixed z-1 right-5 top-[5rem] rounded-lg">
          <div className="flex gap-4 mt-auto mb-auto">
          <h1 className="font-mono font-[550] text-[1.5rem] lg:text-[2.2rem]">Testnet</h1>
            <Toggle
                label="tesnet mode"
                toggled={false}
                onClick={Testnet}
            />
          </div>
        </div>
      </header>
    );
  };
  
  export default Menu;
  