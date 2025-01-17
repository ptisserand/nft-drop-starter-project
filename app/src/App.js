import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import githubLogo from './assets/github-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const GITHUB_LINK = 'https://github.com/ptisserand/nft-drop-starter-project';

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('Connected with public key', response.publicKey.toString());

          /* set user's publickey in state */
          setWalletAddress(response.publicKey.toString());
        }

      } else {
        alert('Solana object not found! Get a Phantom Wallet');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const connectWallet = async () => { 
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with public key', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /*
 * We want to render this UI when the user hasn't connected
 * their wallet to our app yet.
 */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  /* when component first mount */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Language Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {/* To connect wallet */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana}/>}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>          
          <a 
            className="footer-text"
            href={GITHUB_LINK}
            target="_blank"
            rel="noreferrer"
          ><img alt="Github Logo" className="github-logo" src={githubLogo} /></a>
        </div>
      </div>
    </div>
  );
};

export default App;
