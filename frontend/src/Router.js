import {
    BrowserRouter, Routes, Route
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import { useEffect, useState } from 'react';
import userProfilePhoto from './assets/1.png';

function Router() {

    const [credentials, setCredentials] = useState(null);
    const [userAuctionItems, setUserAuctionItems] = useState(null);
    const [userMarketplaceItems, setUserMarketplaceItems] = useState(null);

    // ======================== Replace this with actual call to server to set credentials and user data
    useEffect(() => {
        setCredentials({ profilePhoto: userProfilePhoto, username: 'iloveNFT', balance: '1,0023' })
        setUserAuctionItems([
            // Don't send owner --> remove in the backend (redundant)
            { item_name: "", item_image: "" },
            { item_name: "", item_image: "" },
            { item_name: "", item_image: "" },
            { item_name: "", item_image: "" },
        ])
    }, [])

    return (
        <div style={{ background: '#000' }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/profile" element={<Profile credentials={credentials} userAuctionItems={userAuctionItems} userMarketplaceItems={userMarketplaceItems} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router