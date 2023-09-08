import './App.css';
import {Home, Wallet, New, Order, Menu} from './components'
import React from 'react'

let testnet = false;

function getTestnet() {
  return testnet;
}

function ChangeTestnet(new_val) {
  testnet = new_val;
}


function App() {
  window.onclick = function (event) {
    console.log(document.getElementById('modal'));
    if (event.target == document.getElementById('modal')) {
      document.getElementById('modal').classList.add('hidden');
    }
  };

  return (
    <div className="App">
      <Order></Order>
      <div className="bg-white-mode2 dark:bg-black-mode2 text-black dark:text-white h-screen align-middle text-center flex flex-col">
        <Menu></Menu>
        <Home></Home>
        <Wallet></Wallet>
        <New></New>
      </div>
    </div>
  );
}

export default App;
