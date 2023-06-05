import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_REACT_SERVER_URL, {
	transports: ['websocket']
});

function App() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.connect();

		socket.on('receive', (message) => {
			setMessages((prev) => [...prev, message]);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const handleClick = () => {
		socket.emit('send', `Sent from ${socket.id}`);
	};

	return (
		<>
			<h5>{socket.id}</h5>
			<button onClick={handleClick}>Click to broadcast message</button>

			<div>
				<p>Messages here:</p>
				{messages.map((message, index) => (
					<p key={index}>{message}</p>
				))}
			</div>
		</>
	);
}

export default App;
