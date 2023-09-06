import { ton, settings, multisigwallet, protection } from "../assets";

const Home = () => {

  function handleSubmit() {
    // ОБРАБОТКА
    let can = true; // НАДО ПРОВЕРИТЬ МОЖНО ИЛИ НЕТ
    if (can) {
      document.getElementsByClassName("home")[0].classList.add("hidden");
      document.getElementsByClassName("new")[0].classList.add("hidden");
      document.getElementsByClassName("wallet")[0].classList.remove("hidden");
    }
  };

  function handleSubmit2() {
    if (document.getElementById('wallet').value !== '' ) {
      // console.log(document.getElementsByClassName("fa2"));
      document.getElementsByClassName("fa2")[0].classList.remove("hidden");
    } else {
      document.getElementsByClassName("fa2")[0].classList.add("hidden");
    }
  };

  return (
    <div className="home grow flex flex-col justify-center pb-[7rem]">
      {/* <h1 className="text-[6rem] gradient-text font-Inter font-semibold">Multisig wallet</h1> */}
      <img src={multisigwallet} className="w-[17rem] md:w-[50vw] ml-auto mr-auto mb-[2.5rem]" alt="" />
      <img src={protection} className="w-[20rem] md:w-[53vw] ml-auto mr-auto mb-[3rem]" alt="" />
      <div className="inputWithIcon w-[90%] md:w-[35rem] lg:w-[45rem] 2xl:w-[55rem] ml-auto mr-auto">
        <i className="fa" aria-hidden="true"></i>
        <input id="wallet" onChange={handleSubmit2} type="text" name="serach" className="good-input w-full max-w-full h-[4rem] rounded-md font-usual font-semibold mm:text-[0.82rem] md:text-[2rem]" placeholder="Enter a multi-sig wallet address to start"/>
        <i onClick={handleSubmit} aria-hidden="true" className="fa2 hidden"></i>
      </div>
    </div>
  );
};

export default Home;
