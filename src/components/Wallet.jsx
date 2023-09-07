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

  return (
      <div className="hidden wallet grow flex flex-col ">
        <div className="w-[80%] min-h-max mt-[4rem] bg-white-mode1 ml-auto mr-auto rounded-lg">
            <h1 className="font-semibold text-[1.3rem] md:text-[2.4rem] pl-[1.5rem] pt-[0.3rem] pb-[0.3rem] font-usual">Overview</h1>
            <hr className="h-[1px] bg-black"/>
            <div className="flex justify-around text-center flex-wrap mt-[1.3rem]">
                <div className="flex flex-col mt-auto mb-auto">
                    <h1 className="font-usual font-[550] text-[1.5rem] lg:text-[2.5rem]">Balance</h1>
                    <div className="flex ml-auto mr-auto">
                        <p className="font-usual font-[550] text-[1.5rem] lg:text-[2.5rem]">0.00</p>
                        <img src={balance} alt="" className="h-[30px] lg:h-[36px] ml-[5px] mt-auto mb-auto" />
                    </div>
                </div>

                <div className="flex flex-col text-center mt-auto mb-auto ml-[0.5rem] mr-[0.5rem]">
                    <h1 className="font-usual font-[550] text-[1.5rem] lg:text-[2.5rem]">Owners</h1>
                    <p className="font-usual font-[550] text-[1.5rem] lg:text-[2.5rem]">4 / 5</p>
                </div>

                <div className="flex flex-col text-center mt-auto mb-auto ml-[0.5rem] mr-[0.5rem]">
                    <h1 className="font-usual font-[550] text-[1.5rem] lg:text-[2.5rem]">Last active</h1>
                    <p className="font-usual font-[550] text-[1.5rem] lg:text-[2.5rem]">1 second ago</p>
                </div>
            </div>
            <hr className="h-[1px] bg-wallet mt-[2rem]"/>
            <div className="flex justify-around mt-[2rem] flex-wrap ml-[0.5rem] mr-[0.5rem]">
                <div className="flex flex-col mt-[1rem]">
                    <h1 className="font-mono font-[600] text-[1.3rem] lg:text-[2.3rem]">New order</h1>
                    <div onClick={NewOrder} className="font-usual mr-auto ml-auto max-w-max text-[1.3rem] md:text-[1.5rem] lg:text-[2rem] font-[550] flex flex-col justify-center h-[1.5rem] md:h-[2.2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-full mt-[2rem] pl-[1.3rem] pr-[1.3rem]">Create new order</div>
                </div>

                <div className="flex flex-col mt-[1rem] mb-[3rem] gap-3">
                    <h1 className="font-mono font-[600] text-[1.3rem] lg:text-[2.3rem] ml-auto mr-auto">Send order</h1>
                    <div class="input__wrapper">
                        <input onChange={handleImageChange} name="file" type="file" id="input__file" class="input input__file" multiple />
                        <label for="input__file" className="h-auto input__file-button">
                        <span className="input__file-icon-wrapper mt-auto mb-auto"><img class="input__file-icon" src={download} alt="Выбрать файл" className="mt-auto mb-auto w-[40px] md:w-[50px]" /></span>
                        <span className="input__file-button-text text-black lg:text-[2.3rem] min-w-max mt-auto mb-auto">No file selected</span>
                    </label>
                    </div>
                    <div onClick={SaveSmth} className="font-usual mr-auto ml-auto max-w-max text-[1.3rem] md:text-[1.5rem] lg:text-[2rem] font-[550] flex flex-col justify-center h-[1.5rem] md:h-[2.2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-full mt-[1.5rem] pl-[1.3rem] pr-[1.3rem]">Sign & Send</div>
                </div>
            </div>
        </div>
      </div>
  );
};

export default Wallet;
