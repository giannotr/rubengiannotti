import React, { useState, useEffect } from 'react';
import reduceRoutesArray from '../utility/reduce-routes-array';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '../components/navigation/navigation';
import SiteCycle from '../components/site-cycle/site-cycle';
import HideOnPhones from '../components/hide-on-phones/hide-on-phones';
import GlitchOverlay from '../components/glitch-overlay/glitch-overlay';
import './app.scss';

const topLevelRoutes = [
	{ title: 'Home', destination: '/' },
	{ title: 'Projekte', destination: '/projects' },
	{ title: 'Termine', destination: '/dates' },
	{ title: 'Media', destination: '/media' },
	{ title: 'Opera', destination: '/opera' },
	{ title: 'Kontakt', destination: '/contact' },
];

const topLevelPaths = reduceRoutesArray(topLevelRoutes);

// [TODO]: add about me page (weave in press statements) w/ discography
// [TODO]: architecture + design for blog and dev page
// [TODO]: add blog.rubengiannotti.com (design replica => https://www.designembraced.com/)
// [TODO]: add link to blog in navigation
// [TODO]: cookie alert (blog.rubengiannotti, widgets:sc, spotify, youtube, instagram, recaptcha => all non sensible data(?))
// [TODO]: add dev.rubengiannotti.com (design replica => https://www.dhm.de/ + https://codepen.io/ReGGae/full/bmyYEj)
// [TODO]: check titles <Head>s for all \pages and other customisation factors
// [TODO]: SEO audit
// [TODO]: i18n?
// [TODO]: abstract colors and animations into global css modules (for `import`s)
// [TODO]: check if null-safe property access is possible instead of data ? data.prop : [] or data.hasOwnProperty...
// [TODO]: refactor all conditional classes into react-transition-group
// [TODO]: check if all components with props have prop types
// [TODO]: add /admin (management tool for... available lesson dates, contact form messages, text content, component design[?])
// [OPT]: check if target route is loaded before showing it
// => https://stackoverflow.com/questions/55624695/loading-screen-on-next-js-page-transition
export default function App({ Component, pageProps }) {
	const [animateOut, setAnimateOut] = useState(false);
	const [routeIdx, setRouteIdx] = useState(0);
	const router = useRouter();

	useEffect(() => {
		//console.log('page loaded');
		// does not trigger on route change => page mount check for pointer animation (trigger only here!)
		for(let i = 0;  i < topLevelRoutes.length; i++) {
			if(topLevelPaths[i] === router.pathname) {
				setRouteIdx(i);
				break;
			}
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setAnimateOut(false);
		}, 750);
	}, [router.pathname]);

	const navProps = {
		routes: topLevelRoutes,
		paths: topLevelPaths,
		route: routeIdx,
		setRoute: setRouteIdx,
		setAnimateOut: setAnimateOut,
	}

	return(
		<div className="app-container" tabIndex="0">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.gstatic.com" /> 
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;700&family=Major+Mono+Display&family=Oxygen+Mono&display=swap" />
			</Head>
			<Component {...pageProps} />
			<Navigation {...navProps} />
			<HideOnPhones>
				<SiteCycle {...navProps} />
			</HideOnPhones>
			<GlitchOverlay active={animateOut} />
		</div>
	);
}
