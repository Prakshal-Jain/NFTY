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
import ShoppingCart from "./pages/ShoppingCart";
import { useEffect, useState } from 'react';
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import CreateAuctionItem from "./pages/CreateAuctionItem";
import { io } from "socket.io-client";

function Router() {

    const [credentials, setCredentials] = useState(null);
    
    useEffect(() => {
        const socket = io();
        socket.emit('auction', "NAHHHHH");
    }, [])

    const onLogout = () => {
        setCredentials(null);
    }

    const authPages = [
        <Route path="/profile" element={<div><AuthNavBar credentials={credentials} setCredentials={setCredentials} onLogout={onLogout} /><Profile credentials={credentials} setCredentials={setCredentials} /></div>} />,
        <Route path="/auctions" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} setCredentials={setCredentials} /><Auctions /></div>} />,
        <Route path="/marketplace" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} setCredentials={setCredentials} /><Marketplace /></div>} />,
        <Route path="/marketplace-sell" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} setCredentials={setCredentials} /><SellMarketplace /></div>} />,
        <Route path="/shopping-cart" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} setCredentials={setCredentials} /><ShoppingCart credentials={credentials} /></div>} />,
        <Route path="/create-auction-item" element={<div><AuthNavBar credentials={credentials} onLogout={onLogout} setCredentials={setCredentials} /><CreateAuctionItem /></div>} />,
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