const Order = () => {

    function AddSmth() {
        // ОБРАБОТАТЬ
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
            <input type="text" name="serach" className="pl-[1rem] ml-auto mr-auto good-input w-[80%] max-w-full h-[4rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[2rem]" placeholder="Recipient"/>
            <input type="text" name="serach" className="pl-[1rem] ml-auto mr-auto good-input w-[80%] max-w-full h-[4rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[2rem]" placeholder="Amount"/>
            <input type="text" name="serach" className="pl-[1rem] ml-auto mr-auto good-input w-[80%] max-w-full h-[4rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[2rem]" placeholder="Body or Base64 BOC"/>
            <div className="flex gap-2">
                <div onClick={AddSmth} className="w-full mt-auto mb-auto text-[1.2rem] lg:text-[2.5rem] font-[550] flex flex-col justify-center h-[2.2rem] lg:h-[3rem] bg-gray-400 text-center align-middle rounded-lg ml-[1.3rem]">Add</div>
                <div onClick={SaveDisk} className="w-full mt-auto mb-auto text-[1.2rem] lg:text-[2.5rem] font-[550] flex flex-col justify-center h-[2.2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-lg mr-[1.3rem]">Save to disk</div>
            </div>
            <div className="flex">
                <div onClick={SignSend} className="w-full text-[1.5rem] lg:text-[2.5rem] font-[550] flex flex-col justify-center h-[2.2rem] lg:h-[3rem] bg-button-blue text-center align-middle rounded-lg ml-[1.3rem] mr-[1.3rem]">Sign & send</div>
            </div>
        
        </div>        
    </div>
  );
};

export default Order;
