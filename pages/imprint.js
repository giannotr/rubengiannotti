import { useRef } from 'react';
import Head from 'next/head';
import { Wrapper, Content, PadContent, ScrollContent } from '../components/containers/containers';

// [TODO]: audit imprint content (GDPR? Cookies?)
export default function Imprint() {
	const addressRef = useRef(null);

	const scrollOffset = Number(addressRef?.current?.clientHeight) || 300;

	return(
		<Wrapper>
			<Head>
				<title>RUBEN GIANNOTTI / Impressum</title>
			</Head>
			<Content>
				<PadContent>
					<div style={{maxWidth: '750px'}}>
						<div ref={addressRef}>
							<h2>Impressum</h2>
							<div style={{margin: '20px 0'}}>
								Verantwortlich im Sinne des Presserechts
							</div>
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<div>STOA (Einzelunternehmen)</div>
								<div>Inhaber: Ruben Giannotti</div>
								<div>Pappelallee 78/79</div>
								<div>10437 Berlin</div>
							</div>
							<div style={{display: 'flex', flexDirection: 'column', margin: '25px 0'}}>
								<div>Fotos: Andrea Katheder, David Beecroft</div>
								<div>Webdesign: Ruben Giannotti</div>
							</div>
						</div>
						<ScrollContent offset={`${scrollOffset + 50}px`}>
							<div style={{margin: '30px 0'}}>
								Alle Rechte vorbehalten.
								Die durch den Autor erstellten Inhalte auf dieser Seite
								unterliegen dem Urheberrecht und anderen Gesetzen zum Schutz des geistigen Eigentums.
								Die Weitergabe, Veränderung, gewerbliche Nutzung oder Verwendung auf anderen Internetseiten ist untersagt. 
							</div>
							<div style={{margin: '10px 0 40px'}}>
								Soweit die Inhalte auf dieser Seite nicht vom Autor erstellt wurden,
								werden die Urheberrechte Dritter beachtet und die betreffenden Inhalte als solche gekennzeichnet.
								Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
								bittet der Autor um einen entsprechenden Hinweis.
								Bei Bekanntwerden von Rechtsverletzungen werden derartige Inhalte unverzüglich entfernt.
							</div>
							<h3>Haftungsausschluss</h3>
							<h4 id="disclaimer-content">Inhalt</h4>
							Der Autor übernimmt, obgleich die Inhalte dieser Seite mit größter Sorgfalt ausgewählt wurden, keinerlei Gewähr für dessen Aktualität, Richtigkeit oder Vollständigkeit. Gemäß §7 I TMG ist der Autor für eigene Inhalte dieser Seite nach den allgemeinen Gesetzen verantwortlich. Es sind jedoch Haftungsansprüche gegen den Autor, die sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen verursacht wurden, grundsätzlich ausgeschlossen. Alle Angebote sind freibleibend und unverbindlich. Darüberhinaus behält der Autor sich vor, die Angebote dieser Seite ohne gesonderte Ankündigung zu verändern, zu ergänzen oder zu löschen. Auf übermittelte oder gespeicherte fremde Inhalte hat der Autor keinen Einfluss und übernimmt dafür keinerlei Verantwortung. Sollten durch die fremden Inhalte Rechte oder gesetzliche Vorschriften verletzt werden, wird der Autor die betreffenden Inhalte bei Bekanntwerden der Rechtsverletzung unverzüglich entfernen.
							<h4 id="disclaimer-links">Links</h4>
							Das Angebot dieser Seite beinhaltet Verweise auf fremde Internetseiten (»Hyperlinks«). Sofern diese nicht im Verantwortungs- oder Einflussbereich des Autors liegen, kann für die Inhalte der verlinkten Seiten keine Gewähr übernommen werden. Der Autor erklärt hiermit, dass zum Zeitpunkt der Linksetzung auf den verlinkten Seiten keine rechtswidirgen Inhalte erkennbar waren. Eine fortwährende inhaltliche Kontrolle der verlinkten Seiten ist indessen ohne konkrete Anhaltspunkte nicht zumutbar. Daher distanziert sich der Autor ausdrücklich von den fremden Seiteninhalten. Sollten durch diese Inhalte Rechte oder gesetzliche Vorschriften verletzt werden, wird der Autor derartige Links unverzüglich entfernen, sobald ihm die Rechtsverletzung bekannt geworden ist.
							<h4 id="disclaimer-privacy">Datenschutz</h4>
							Die Nutzung der Seite ist grundsätzlich ohne die Angabe personenbezogener Daten möglich.
							Für die Kontaktaufnahme über das Kontaktformular ist jedoch die Angabe des Names und der E-Mail-Adresse notwendig. Diese werden über das formoid Plugin von Mobirise verarbeitet und dem Betreiber dieser Seite als E-Mail weitergeleitet. Der Betreiber dieser Seite speichert keinerlei Daten in einer Datenbank ab. Die gespeicherten E-Mails werden automatisch nach Ablauf von 6 Monaten gelöscht. Auf Anfrage können Nutzer dieser Seite die zum Zeitpunkt der Anfrage gespeicherten Daten übermittelt bekommen oder dessen Löschung veranlassen.
							Die Nutzung der im Rahmen des Impressums oder vergleichbarer Angaben veröffentlichten Kontaktdaten wie Postanschriften, Telefon- und Faxnummern sowie E-Mail-Adressen durch Dritte zur Übersendung von nicht ausdrücklich angefohrderten Informationen ist untersagt. Rechtliche Schritte gegen die Versender von Spam-E-Mails bei Verstößen gegen dieses Verbot sind vorbehalten.
						</ScrollContent>
					</div>
				</PadContent>
			</Content>
		</Wrapper>
	);
}