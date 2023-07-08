import { FC, useState, useEffect } from 'react';
import './style.css';
import Layout from '../Layout/Desktop';
import SideBar from '../components/SideBar';
import ChatBox from '../components/ChatBox';
interface MainProps {
    token: string;
}
export interface ProfileData {
    fullname: string;
    avatar: string;
    isOnline: boolean;
    rooms: string[];
}
const getProfile = (token: string): Promise<any> => {
    return fetch('/api/users/', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch user profile');
            }
        });
};

const Main: FC<MainProps> = ({ token }) => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [currentRoom, setCurrentRoom] = useState<string>("")
    const handleRoomChange = (roomId: string) => {
        setCurrentRoom(roomId);
    }
    useEffect(() => {
        if (token) {
            getProfile(token)
                .then((data: any) => {
                    setProfileData(data);
                    setCurrentRoom(data.rooms[0])
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [token]);




    return (
        <Layout userData={profileData}>
            <SideBar token={token} onRoomChange={handleRoomChange} />
            <ChatBox room={currentRoom} />
        </Layout>
    );
};

export default Main;