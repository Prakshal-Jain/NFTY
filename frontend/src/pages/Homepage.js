import './css/homepage.css';
import { useEffect, useState } from 'react';
import FlexLayout from '../components/FlexLayout';
import img_1 from "../assets/1.png";
import img_2 from "../assets/2.png";
import img_3 from "../assets/3.png";
import img_4 from "../assets/4.png";
import img_5 from "../assets/5.png";
import img_6 from "../assets/6.png";
import img_7 from "../assets/7.png";
import img_8 from "../assets/8.png";
import auction_img from "../assets/auction.png";
import marketplace_img from "../assets/marketplace.png";
import { Image } from 'react-bootstrap';

const imgList = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8];

function Homepage() {
  const [currImg, setCurrImg] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCurrImg(currImg + 1);
    }, 500)
  }, [currImg])

  return (
    <div>
      <div className="full-page-bg">
        <FlexLayout direction="horizontal" align="center" style={{ height: '100%' }}>
          <FlexLayout direction="vertical" align="center">
            <img src={imgList[currImg % 8]} className="nft-img" alt="changing nft images" />
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
          <Image src={auction_img} style={{ width: '60%', borderRadius: '0.5em', objectFit: 'cover', marginTop: '1.5em', border: '0.1em solid gray' }} />
        </FlexLayout>
      </div>

      <div className="auction-homepage-container" id="buy_sell">
        <FlexLayout direction="vertical" align="center">
          <h2>Buy &amp; Sell</h2>
          <h5>
            NFTY is your marketplace to buy or sell NFTs at a fixed price.
          </h5>
          <Image src={marketplace_img} style={{ width: '60%', borderRadius: '0.5em', objectFit: 'cover', marginTop: '1.5em', border: '0.1em solid gray' }} />
        </FlexLayout>
      </div>
    </div>
  );
}

export default Homepage;
