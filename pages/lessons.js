import Head from 'next/head';
import { Wrapper, Content } from '../components/containers/containers';
import Calendar from '../components/calendar/calendar';

const dataMockup = {
	"months": [
		{
			"year": "2020",
			"month": "12",
			"availableDates": [
				{
					"day": "1",
					"times": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
				},
				{
					"day": "3",
					"times": ["15:00", "18:00"]
				},
				{
					"day": "15",
					"times": ["15:00", "16:00", "17:00"]
				}
			]
		},
		{
			"year": "2021",
			"month": "1",
			"availableDates": [
				{
					"day": "1",
					"times": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
				},
				{
					"day": "3",
					"times": ["15:00", "18:00"]
				},
				{
					"day": "15",
					"times": ["15:00", "16:00", "17:00"]
				},
				{
					"day": "16",
					"times": ["13:00", "16:00", "17:00"]
				},
				{
					"day": "18",
					"times": ["12:00", "16:00", "17:00"]
				},
				{
					"day": "26",
					"times": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
				}
			]
		}
	]
};

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
				<Calendar schedule={dataMockup} />
			</Content>
		</Wrapper>
	);
}