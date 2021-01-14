import React, { Fragment, forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link  from 'next/link';
import SocialIcons from '../social-icons/social-icons';
import styles from './navigation.module.scss';

const containerBaseCls = 'nav-container';
const burgerBaseCls = 'hamburger-icon';

const Burger = ({ expanded }) => {
	const cls = expanded ? styles[`${burgerBaseCls}--expanded`] : styles[burgerBaseCls];

	return(
		<div className={cls}>
			{[0, 1, 2].map(
				idx => <span key={idx} className={`line line-${idx}`} />
			)}
		</div>
	);
}

Burger.propTypes = {
	expanded: PropTypes.bool,
}

Burger.defaultProps = {
	expanded: false,
}

const LinkInner = forwardRef(({ onClick, href, children }, ref) => {
	const router = useRouter();
	
	const className = router.pathname === href ? styles['active'] : '';
	const dataContent = router.pathname === href ? '' : children;

	const anchorProps = {
		ref,
		href,
		onClick,
		className,
		'data-content': dataContent,
	}

  return <a {...anchorProps}>{children}</a>;
});

const NavLink = ({ href, onClick, children }) => {
	return (
		<Link href={href} passHref>
			<LinkInner onClick={onClick}>
				{children}
			</LinkInner>
		</Link>
	);
}

export default function Navigation({ routes, setRoute, setAnimateOut }) {
	const [navExpanded, setNavExpanded] = useState(false);

	const collapseNav = () => {
		setAnimateOut(true);
		setNavExpanded(false);
	}

	const handleClickLink = idx => {
		setRoute(idx);
		collapseNav();
	}

	const containerCls = navExpanded ? styles[`${containerBaseCls}--expanded`] : styles[containerBaseCls];

	return(
		<Fragment>
			<div className={styles['nav-toggle']} onClick={() => setNavExpanded(!navExpanded)}>
				<Burger expanded={navExpanded} />
			</div>
			<div className={containerCls}>
				<div className={styles['nav-grid']}>
					{routes.map(({ title, destination }, idx) => (
						<Fragment key={idx}>
							<div className={styles['nav-grid__idx']}>0{idx + 1}</div>
							<div className={styles['nav-grid__link']}>
								<NavLink href={destination} onClick={() => handleClickLink(idx)}>
									{title}
								</NavLink>
							</div>
						</Fragment>
					))}
				</div>
				<div className={styles['nav-bottom']}>
					<NavLink href="/imprint" onClick={collapseNav}>
						Impressum
					</NavLink> /
					<NavLink href="/lessons" onClick={collapseNav}>
						Online-Unterricht
					</NavLink> /
					<a href="https://open.spotify.com/album/6ydRiTj8E9OmQLBY8j6sRb?si=rsyWf7OxQBOy-1Ri-dDIoA&utm_source=embed_v2&go=1&play=1&nd=1" target="_blank" data-content="Aktuelles Album">
						Aktuelles Album
					</a>
				</div>
				<div style={{zIndex: '1'}}>
					<SocialIcons />
				</div>
			</div>
		</Fragment>
	);
}

Navigation.propTypes = {
	routes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    destination: PropTypes.string,
	})).isRequired,
	setRoute: PropTypes.func.isRequired,
	setAnimateOut: PropTypes.func,
}

Navigation.defaultProps = {
	setAnimateOut: () => {},
}
