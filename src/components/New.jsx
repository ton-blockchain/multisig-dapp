import { ton, settings, more, cancel } from "../assets";
import { Toggle } from "./Toggle";

const NewWallet = () => {

    let id = 1;

    const DeleteNew = (e) => {
        try {
            document.getElementById(`${e}`).remove();
        } catch {
        }
    } 

    const AddNew = () => {
        id++;
        document.querySelector('.keys_list').insertAdjacentHTML('beforeend', `<div id='${id}' class="key flex gap-2 md:gap-5"><input type="text" name="serach" class="pl-[1rem] keyinput pb-0 mb-auto mt-auto good-input sm:w-[13rem] md:w-[30rem] 2xl:w-[40rem] rounded-md font-usual font-semibold text-[100%] md:text-[2rem] lg:text-[2.2rem]" placeholder="Public key or address"/><img id='img${id}' src=${cancel} alt="" class="cursor-pointer keyimg h-[1.4rem] md:h-[3.1rem] mb-auto mt-auto"/></div>`)
        let o = id;
        document.getElementById(`img${o}`).addEventListener("click", () => DeleteNew(o));
    }

    function CreateMultisig() {
        // ОБРАБОТАТЬ
    }

  return (
      <div className="hidden new grow flex flex-col">
        <div className="w-[80%] lap:w-[68%] desktop:w-[62%] min-h-max mt-[4rem] bg-white-mode1 ml-auto mr-auto rounded-lg pb-[2rem]">
            <h1 className="font-semibold text-[1.3rem] md:text-[2.2rem] pl-[1.5rem] pt-[0.3rem] pb-[0.3rem] font-usual">Create new multisig wallet</h1>
            <hr className="h-[1px] bg-black"/>
            <form>
                <div className="flex justify-around text-center flex-wrap mt-[1.3rem]">
                    <input type="text" name="serach" className="mb-[1.5rem] pl-[1rem] good-input w-[14rem] 2xl:w-[17rem] rounded-md font-usual font-semibold text-[100%] md:text-[2rem] 2xl:text-[2.05rem]" placeholder="Workchain ID"/>
                    <input type="text" name="serach" className="mb-[1.5rem] pl-[1rem] good-input w-[14rem] 2xl:w-[17rem] rounded-md font-usual font-semibold text-[100%] md:text-[2rem] 2xl:text-[2.05rem]" placeholder="Wallet ID"/>
                    <input type="text" name="serach" className="mb-[1.5rem] pl-[1rem] good-input w-[14rem] 2xl:w-[17rem] rounded-md font-usual font-semibold text-[100%] md:text-[2rem] 2xl:text-[2.05rem]" placeholder="K-value"/>
                </div>
                <div className="flex sm:ml-[1rem] md:ml-[2rem] lg:ml-[4rem]">
                    <h1 className="font-semibold md:text-[2rem] lg:text-[2.2rem] font-mono mt-auto mb-auto">Public keys</h1>
                    <img onClick={AddNew} src={more} alt="" className="cursor-pointer h-[30px] md:h-[45px] ml-[1rem] mr-[0.4rem] mt-auto mb-auto"/>
                </div>
                <div className="keys_list flex flex-col gap-6 sm:ml-[1rem] md:ml-[2rem] lg:ml-[4rem] mb-[2rem] mt-[1rem]">
                    <div id='1' className="key flex gap-2 md:gap-5">
                        <input type="text" name="serach" className="pl-[1rem] keyinput pb-0 mb-auto mt-auto good-input sm:w-[13rem] md:w-[30rem] 2xl:w-[40rem] rounded-md font-usual font-semibold text-[100%] md:text-[2rem] lg:text-[2.2rem]" placeholder="Public key or address"/>
                        <img id='img1' onClick={() => DeleteNew(1)} src={cancel} alt="" className="cursor-pointer keyimg h-[1.4rem] md:h-[3.1rem] mb-auto mt-auto"/>
                    </div>
                </div>
                {/* <div onClick={CreateMultisig} className="sm:ml-[1rem] md:ml-[4rem] max-w-max text-[1.3rem] md:text-[1.5rem] lg:text-[2.5rem] font-medium flex flex-col justify-center h-[1.5rem] md:h-[2.2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-full mt-[2rem] pl-[1.3rem] pr-[1.3rem]">Create</div> */}
                <div onClick={CreateMultisig} className="cursor-pointer font-usual sm:ml-[1rem] md:ml-[4rem] max-w-max text-[1.3rem] md:text-[1.5rem] lg:text-[1.9rem] font-[600] flex flex-col justify-center h-[1.5rem] md:h-[2.2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-full mt-[2rem] pl-[1.3rem] pr-[1.3rem]">Create</div>
            </form>
        </div>
      </div>
  );
};

export default NewWallet;
