import './homepage.css';
import NavigationBar from './components/NavigationBar';
import { useEffect, useState } from 'react';
import FlexLayout from './components/FlexLayout';

function imageLooper(idx) {
  const path = `./assets/${idx}.png`
  console.log(path)
  const image = require(`./assets/${idx}.png`)
  return image;
}

function Homepage() {
  const [currImg, setCurrImg] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (currImg >= 8) {
        setCurrImg(1);
      }
      else {
        setCurrImg(currImg + 1);
      }
    }, 500)
  }, [currImg])

  return (
    <div>
      <NavigationBar />
      <div className="full-page-bg">
        <FlexLayout direction="horizontal" align="center" style={{ height: '100%' }}>
          <FlexLayout direction="vertical" align="center">
            <img src={imageLooper(currImg)} className="nft-img" alt="changing nft images" />
            <h3 className="subtitle">Buy &amp; Sell or Auction your NFTs</h3>
          </FlexLayout>
        </FlexLayout>
      </div>

      <div className="auction-homepage-container" id="auction">
        <FlexLayout direction="vertical" align="center">
          <h2>Auction</h2>
          <h5>
            You can put your NFTs up for auction.
          </h5>
        </FlexLayout>
      </div>

      <div className="auction-homepage-container" id="buy_sell">
        <FlexLayout direction="vertical" align="center">
          <h2>Buy &amp; Sell</h2>
          <h5>
            NFTY is your markeyplace to buy or sell NFTs at a fixed price.
          </h5>
        </FlexLayout>
      </div>
    </div>
  );
}

export default Homepage;
