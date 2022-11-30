import {
    Routes, Route
} from "react-router-dom";
import AuthNavBar from "./components/AuthNavBar";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Auctions from './pages/Auctions';
import Marketplace from './pages/Marketplace';
import SellMarketplace from './pages/SellMarketplace';
import Signup from "./pages/Signup";
import { useState } from 'react';
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

    const onLogout = () => {
        setCredentials(null);
    }

    const authPages = [
        <Route path="/profile" element={<div><AuthNavBar credentials={credentials} setCredentials={setCredentials} onLogout={onLogout} /><Profile credentials={credentials} userAuctionItems={userAuctionItems} userMarketplaceItems={userMarketplaceItems} setCredentials={setCredentials} /></div>} />,
        <Route path="/auctions" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} setCredentials={setCredentials} /><Auctions auctionItems={auctionItems} /></div>} />,
        <Route path="/marketplace" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} setCredentials={setCredentials} /><Marketplace marketplaceItems={marketplaceItems} /></div>} />,
        <Route path="/marketplace-sell" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} setCredentials={setCredentials} /><SellMarketplace /></div>} />,
    ]


    return (
        <div style={{ background: '#000' }}>
            <Routes>
                <Route path="/" element={<div><NavigationBar /><Homepage /></div>} />
                <Route path="/signup" element={<div><NavigationBar /><Signup /></div>} />
                <Route path="/login" element={<div><NavigationBar /><Login /></div>} />
                {authPages}
            </Routes>
        </div>
    )
}

export default Router