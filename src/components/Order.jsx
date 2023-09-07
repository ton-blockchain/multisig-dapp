import { ton, settings, more, cancel } from "../assets";

const Order = () => {

    let id = 0;

    const DeleteNew = (e) => {
        try {
            document.getElementById(`k${e}`).remove();
        } catch {
        }
    } 

    function WriteNeed(g1, g2, g3) {
        document.querySelector('.elem1').value = g1;
        document.querySelector('.elem2').value = g2;
        document.querySelector('.elem3').value = g3;
    }

    function AddSmth() {
        id++;
        let g1 = document.querySelector('.elem1').value;
        let g2 = document.querySelector('.elem2').value;
        let g3 = document.querySelector('.elem3').value;
        document.querySelector('.list-orders').insertAdjacentHTML('beforeend', `<div id="k${id}" class="grid border-2 ml-[2rem] mr-[2rem] grid-cols-2">
        <h1 class="el1 font-semibold md:text-[3rem] font-usual truncate w-[90%] mt-auto mb-auto">${g1}</h1>
        <div class="flex gap-2 justify-end">
        <h1 class="el2 font-semibold md:text-[2rem] font-usual truncate w-[90%] mt-auto mb-auto">${g2}</h1>
            <img id='i${id}' src=${cancel} alt="" class="keyimg h-[1.4rem] md:h-[4rem] mb-auto mt-auto"/>
            <h1 class="el3 hidden">${g3}</h1>
        </div>
        </div>`);
        let o = id;
        document.getElementById(`i${o}`).addEventListener("click", () => DeleteNew(o));
        document.getElementById(`k${o}`).addEventListener("click", () => WriteNeed(g1, g2, g3));
    }

    function SaveDisk() {
        // ОБРАБОТАТЬ
    }

    function SignSend() {
        // ОБРАБОТАТЬ
    }

  return (
    <div id="modal" className="hidden modal flex flex-col justify-center w-screen h-screen">
        <div id="modal-content" className="flex flex-col gap-4 md:gap-8 bg-white-mode1 w-[90%] md:w-[45%] h-auto ml-auto mr-auto pb-[2rem]">
            <h1 className="font-semibold text-[1.3rem] md:text-[2.4rem] pl-[1.5rem] pt-[0.3rem] pb-[0.3rem] font-usual ml-auto mr-auto">Create new order</h1>
            <input type="text" name="serach" className="elem1 pl-[1rem] ml-auto mr-auto good-input w-[80%] max-w-full h-[4rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[2rem]" placeholder="Recipient"/>
            <input type="text" name="serach" className="elem2 pl-[1rem] ml-auto mr-auto good-input w-[80%] max-w-full h-[4rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[2rem]" placeholder="Amount"/>
            <input type="text" name="serach" className="elem3 pl-[1rem] ml-auto mr-auto good-input w-[80%] max-w-full h-[4rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[2rem]" placeholder="Text comment or base64 raw body"/>
            <div className="flex gap-2">
                <div onClick={AddSmth} className="w-full mt-auto mb-auto text-[1.2rem] lg:text-[2.3rem] font-[550] flex flex-col justify-center h-[2.2rem] lg:h-[3rem] bg-gray-400 text-center align-middle rounded-lg ml-[1.3rem]">Add</div>
                <div onClick={SaveDisk} className="w-full mt-auto mb-auto text-[1.2rem] lg:text-[2.3rem] font-[550] flex flex-col justify-center h-[2.2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-lg mr-[1.3rem]">Save to disk</div>
            </div>
            <div className="flex">
                <div onClick={SignSend} className="w-full text-[1.5rem] lg:text-[2.3rem] font-[550] flex flex-col justify-center h-[2.2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-lg ml-[1.3rem] mr-[1.3rem]">Sign & send</div>
            </div>
            <div className="list-orders flex flex-col gap-4">
                
            </div>
        </div>        
    </div>
  );
};

export default Order;
