import Head from 'next/head';
import { Wrapper, Content } from '../components/containers/containers';
import Calendar from '../components/calendar/calendar';
import * as lessonsAvailable from '../assets/data/lessons-available.json';

const calendarProps = {
	schedule: lessonsAvailable.default,
}

// TODO: add database (SQL via PHP GET)
export default function Lessons() {
	return(
		<Wrapper id="lessons">
			<Head>
				<title>Ruben Giannotti // Online Unterricht Anmeldung</title>
			</Head>
			<Content>
				<h2 style={{margin: '0 0 25px'}}>Unterricht</h2>
				<div style={{margin: '10px 50px 25px', maxWidth: '500px'}}>
					Wählen Sie hier einen freien Unterrichtstermin
					und senden Sie die Anfrage hier ab.
					Die weitere Abwicklung erfolgt über E-Mail.
				</div>
				<Calendar {...calendarProps} />
			</Content>
		</Wrapper>
	);
}