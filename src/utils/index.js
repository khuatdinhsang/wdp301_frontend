import { io } from 'socket.io-client';

let accessToken = '';
if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken') || '';
}

export const socket = io(`${process.env.REACT_APP_PUBLIC_SOCKET_URL}`, {
    auth: {
        Authorization: `Bearer ${accessToken}`,
    },
});
