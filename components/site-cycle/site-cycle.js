import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import mod from '../../utility/mod';
import padZero from '../../utility/pad-zero';
import Loader from '../loader/loader';
import Arrow from '../../assets/icons/arrow.svg';
import styles from './site-cycle.module.scss';

const slideDisplayChangeTime = parseInt(styles.slideDisplayChangeTime, 10);

const CycleLinkProc = ({ paths, handleClick, toIdx, cls }) => {
	return (
		<>
			{Number.isInteger(toIdx)
				? <div className={styles[cls]} onClick={() => handleClick(toIdx)}>
						<Link href={paths[toIdx]}>
							<Arrow />
						</Link>
					</div>
				: <></>
			}
		</>
	);
}

export default function SiteCycle({ paths, route, setRoute, setAnimateOut }) {
	const [loaded, setLoaded] = useState(false);
	const [clicked, setClicked] = useState(false);
	const [targets, setTargets] = useState([0, 0]);
	const [numOfRoutes, setNumOfRoutes] = useState(0);

	const router = useRouter();

	useEffect(() => {
		setNumOfRoutes(paths.length);

		setTimeout(() => {
			setLoaded(true);
		}, 2000);
	}, []);

	useEffect(() => {
		setTargets([mod(route - 1, numOfRoutes), mod(route + 1, numOfRoutes)]);
	}, [route, numOfRoutes]);

	const CycleLink = ({ toIdx, cls }) => {
		const cycleProps = { paths, handleClick, toIdx, cls };
		return <CycleLinkProc {...cycleProps} />
	}

	const handleClick = route => {
		setRoute(route);
		setClicked(true);
		setAnimateOut(true);
		setTimeout(() => {
			setClicked(false);
		}, slideDisplayChangeTime);
	}

	const [prev, next] = targets;

	if(loaded) {
		return(
			<div className={styles['site-cycle-container']} style={{
				display: paths.includes(router.pathname) ? 'flex' : 'none',
			}}>
				<CycleLink toIdx={prev} cls="arrow__up" />
				<div className={styles['display']}>
					<div className={styles[`display__current${clicked ? '--animated' : ''}`]}>
						{padZero(route + 1)}
					</div>
					<span className={styles['placeholder-invisible']}>06</span>
					/{padZero(numOfRoutes)}
				</div>
				<CycleLink toIdx={next} cls="arrow__down" />
			</div>
		);
	} else {
		return <div className={styles['shift-loader']}><Loader /></div>;
	}
}

SiteCycle.propTypes = {
	paths: PropTypes.arrayOf(PropTypes.string),
	route: PropTypes.number.isRequired,
	setRoute: PropTypes.func.isRequired,
	setAnimateOut: PropTypes.func,
}

SiteCycle.defaultProps = {
	setAnimateOut: () => {},
}
