import { ton, settings, download, balance } from "../assets";
import { Toggle } from "./Toggle";

const Wallet = () => {

    function NewOrder() {
        document.getElementById('modal').classList.remove('hidden');
    }

    function handleImageChange() {
        let h = document.querySelector('.input__file').files;
        if (h.length == 1)
            document.querySelector('.input__file-button-text').innerText = document.querySelector('.input__file').files[0].name;
        else
            document.querySelector('.input__file-button-text').innerText = "No file selected";
    }

    function SaveSmth() {
        // ОБРАБОТАТЬ 
    }

    // window.location.pathname.slice(8) - адрес кошелька

  return (
      <div className={`wallet grow flex flex-col ${window.location.pathname.slice(0,7) == '/wallet' ? "" : "hidden"}`}>
        <div className="w-[80%] lap:w-[62%] desktop:w-[54%] min-h-max mt-[4rem] bg-white-mode1 dark:bg-black-mode1 ml-auto mr-auto rounded-lg">
            <h1 className="font-semibold text-[1.3rem] md:text-[1.9rem] pt-[0.3rem] font-usual">Overview</h1>
            <h1 className="font-semibold text-[0.5rem] md:text-[1rem] pt-[0.3rem] pb-[0.3rem] font-usual">{window.location.pathname.slice(8)}</h1>
            <hr className="h-[1px] bg-wallet dark:bg-black-mode2 border-0"/>
            <div className="flex justify-around text-center flex-wrap">
                <div className="pt-[1.3rem] flex flex-col text-center mt-auto mb-auto ml-[0.5rem] mr-[0.5rem] w-[8rem] lg:w-[15rem]">
                    <h1 className="font-usual font-[550] text-[1.5rem] lg:text-[1.8rem]">Balance</h1>
                    <div className="flex ml-auto mr-auto">
                        <p className="font-usual font-[550] text-[1.5rem] lg:text-[1.8rem]">0.00</p>
                        <img src={balance} alt="" className="balance h-[20px] lg:h-[26px] ml-[5px] mt-auto mb-auto" />
                    </div>
                </div>

                <div className="pt-[1.3rem] flex flex-col text-center mt-auto mb-auto ml-[0.5rem] mr-[0.5rem] w-[8rem] lg:w-[15rem]">
                    <h1 className="font-usual font-[550] text-[1.5rem] lg:text-[1.8rem]">Owners</h1>
                    <p className="font-usual font-[550] text-[1.5rem] lg:text-[1.8rem]">4 / 5</p>
                </div>

                <div className="pt-[1.3rem] flex flex-col text-center mt-auto mb-auto ml-[0.5rem] mr-[0.5rem] w-[8rem] lg:w-[15rem]">
                    <h1 className="font-usual font-[550] text-[1.5rem] lg:text-[1.8rem]">Last active</h1>
                    <p className="font-usual font-[550] text-[1.5rem] lg:text-[1.8rem]">1 second ago</p>
                </div>
            </div>
            <hr className="h-[1px] bg-wallet mt-[2rem] dark:bg-black-mode2 border-0"/>
            <div className="flex justify-around mt-[2rem] flex-wrap ml-[0.5rem] mr-[0.5rem]">
                <div className="flex flex-col mt-[1rem]">
                    <h1 className="font-mono font-[600] text-[1.3rem] lg:text-[1.8rem]">New order</h1>
                    <div onClick={NewOrder} className="cursor-pointer font-usual mr-auto ml-auto max-w-max text-[1.3rem] md:text-[1.5rem] lg:text-[1.7rem] font-[550] flex flex-col justify-center h-[1.5rem] md:h-[2.2rem] lg:h-[2.6rem] bg-button-blue text-center align-middle rounded-full mt-[2rem] pl-[1.3rem] pr-[1.3rem]">Create new order</div>
                </div>

                <div className="flex flex-col mt-[1rem] mb-[3rem] gap-3">
                    <h1 className="font-mono font-[600] text-[1.3rem] lg:text-[1.8rem] ml-auto mr-auto">Send order</h1>
                    <div class="input__wrapper">
                        <input onChange={handleImageChange} name="file" type="file" id="input__file" class="input input__file" multiple />
                        <label for="input__file" className="h-auto input__file-button">
                        <span className="input__file-icon-wrapper mt-auto mb-auto"><img class="input__file-icon" src={download} alt="Выбрать файл" className="download mt-auto mb-auto w-[40px] md:w-[50px]" /></span>
                        <span className="input__file-button-text text-black dark:text-white lg:text-[1.9rem] min-w-max mt-auto mb-auto">No file selected</span>
                    </label>
                    </div>
                    <div onClick={SaveSmth} className="cursor-pointer font-usual mr-auto ml-auto max-w-max text-[1.3rem] md:text-[1.5rem] lg:text-[1.7rem] font-[550] flex flex-col justify-center h-[1.5rem] md:h-[2.2rem] lg:h-[2.6rem] bg-button-blue text-center align-middle rounded-full mt-[1.5rem] pl-[1.3rem] pr-[1.3rem]">Sign & Send</div>
                </div>
            </div>
        </div>
      </div>
  );
};

export default Wallet;
