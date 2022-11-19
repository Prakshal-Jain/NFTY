import {
    Routes, Route, useNavigate
} from "react-router-dom";
import AuthNavBar from "./components/AuthNavBar";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Auctions from './pages/Auctions';
import Marketplace from './pages/Marketplace';
import Signup from "./pages/Signup";
import { useEffect, useState } from 'react';
import userProfilePhoto from './assets/1.png';
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";

function Router() {

    const [credentials, setCredentials] = useState(null);

    // Items specific to the logged in user
    const [userAuctionItems, setUserAuctionItems] = useState(null);
    const [userMarketplaceItems, setUserMarketplaceItems] = useState(null);

    // All auction and marketplace items in the database
    const [auctionItems, setAuctionItems] = useState(null);
    const [marketplaceItems, setMarketplaceItems] = useState(null);

    // ======================== Replace this with actual call to server to set credentials and user data
    useEffect(() => {
        setCredentials({ profilePhoto: userProfilePhoto, username: 'iloveNFT', balance: '1,0023' })
        setUserAuctionItems([
            // Don't send owner --> remove in the backend (redundant)
            { item_name: "Chromiesquiggle", item_image: "https://pbs.twimg.com/media/EknjjP5X0AAb4_G?format=jpg&name=medium" },
            { item_name: "Prismatic #661", item_image: "https://pbs.twimg.com/media/FHuIJR4XEAQtT_-?format=jpg&name=medium" },
            { item_name: "Prismatic #919", item_image: "https://pbs.twimg.com/media/FHuIbbNXIAMh4Dy?format=jpg&name=medium" },
        ])
        setUserMarketplaceItems([
            // Don't send owner --> remove in the backend (redundant)
            { item_name: "Prismatic #225", item_image: "https://pbs.twimg.com/media/FHuIgJVX0AIDKt9?format=jpg&name=medium" },
        ])

        setAuctionItems([
            { item_name: "Chromiesquiggle", item_image: "https://pbs.twimg.com/media/EknjjP5X0AAb4_G?format=jpg&name=medium" },
            { item_name: "Prismatic #661", item_image: "https://pbs.twimg.com/media/FHuIJR4XEAQtT_-?format=jpg&name=medium" },
            { item_name: "Prismatic #919", item_image: "https://pbs.twimg.com/media/FHuIbbNXIAMh4Dy?format=jpg&name=medium" },
        ])

        setMarketplaceItems([
            { item_name: "Prismatic #225", item_image: "https://pbs.twimg.com/media/FHuIgJVX0AIDKt9?format=jpg&name=medium" },
            { item_name: "Prismatic #661", item_image: "https://pbs.twimg.com/media/FHuIJR4XEAQtT_-?format=jpg&name=medium" },
            { item_name: "Prismatic #919", item_image: "https://pbs.twimg.com/media/FHuIbbNXIAMh4Dy?format=jpg&name=medium" },
        ])
    }, [])


    const navigate = useNavigate();

    const onLogout = () => {
        setCredentials(null);
        navigate('/');
    }

    const authPages = [
        <Route path="/profile" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} /><Profile credentials={credentials} userAuctionItems={userAuctionItems} userMarketplaceItems={userMarketplaceItems} /></div>} />,
        <Route path="/auctions" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} /><Auctions auctionItems={auctionItems} /></div>} />,
        <Route path="/marketplace" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} /><Marketplace marketplaceItems={marketplaceItems} /></div>} />
    ]


    return (
        <div style={{ background: '#000' }}>
            <Routes>
                <Route path="/" element={<div><NavigationBar /><Homepage /></div>} />
                <Route path="/signup" element={<div><NavigationBar /><Signup /></div>} />
                <Route path="/login" element={<div><NavigationBar /><Login /></div>} />
                {credentials !== null && authPages}
            </Routes>
        </div>
    )
}

export default Router