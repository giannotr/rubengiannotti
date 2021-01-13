import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import simpleHash from '../../utility/simple-hash';
import useWindowSize from '../../hooks/use-window-size';
import { Transition } from 'react-transition-group';
import styles from './contents-follower.module.scss';

const breakpoint = 800;
const duration = 250;

const defaultStyle = {
	text: { fontSize: styles.contentsFollowerFontSizeDefault, color: '#ddd' },
	bullet: {},
};

const transitionStyles = {
	text: {
		entered: { animation: `${styles['active-item-animation']} ${duration}ms ease forwards` },
	},
  bullet: {
		entered: { animation: `${styles['active-item-bullet-animation']} ${duration}ms ease-out forwards` },
	},
};

const setupObserver = ({
	section,
	setActiveSection,
	setCurrentObservers,
	callback,
	options,
}) => {
	const { ref } = section;

	if(ref && ref?.current) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if(entry.isIntersecting) {
					setActiveSection(section.title);
					callback(section.title, entry);
				}
			},
			options
		);

		setCurrentObservers(state => [...state, { observer, ref }]);
		observer.observe(ref.current);
	}
}

// [TODO]: IntersectionObserver API is not the best tool to check if div is in view
// => https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
// +  https://stackoverflow.com/questions/63817880/onscroll-in-react-functional-component

export default function ContentsFollower({ sections, containerRef, onSetActive }) {
	const [currentObservers, setCurrentObservers] = useState([]);
	const [activeSection, setActiveSection] = useState('');
	const { width } = useWindowSize();

	const setupObservers = () => {
		for(let section of sections) {
			setupObserver({
				section,
				setActiveSection,
				setCurrentObservers,
				callback: onSetActive,
				options: {
					root: null,
					rootMargin: '0px',
					threshold: width < breakpoint ? 0 : .5,
				}
			});
		}
	}

	const cleanupObservers = () => {
		for(let observerObj of currentObservers) {
			observerObj.observer.unobserve(observerObj.ref.current);
		}
	}

	useEffect(() => {
		cleanupObservers();
		setupObservers();
		return cleanupObservers;
	}, [sections, width]);

	const Item = ({ content, node }) => {
		const active = content === activeSection;

		return(
			<Transition in={active} timeout={duration}>
				{state => (
					<div
						className={styles['contents-follower__item']}
						style={{ ...defaultStyle.text, ...transitionStyles.text[state] }}
						onClick={() => {
							containerRef.current && node && containerRef.current.scrollTo({
								top: node.offsetTop,
								left: 0,
								behavior: 'smooth',
							});
						}}
					>
						<div
							className={styles['contents-follower__item__bullet']}
							style={{ ...defaultStyle.bullet, ...transitionStyles.bullet[state] }} 
						/>
						{content}
					</div>
				)}
			</Transition>
		);
	}
	
	return(
		<div className={styles['contents-follower']}>
			{sections.map(section => <Item key={simpleHash(section.title)} content={section.title} node={section.ref.current} />)}
		</div>
	);
}

ContentsFollower.propTypes = {
	sections: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		ref: PropTypes.object,
	})),
	containerRef: PropTypes.object,
	onSetActive: PropTypes.func,
}

ContentsFollower.defaultProps = {
	section: [],
	containerRef: { current: null },
	onSetActive: () => {},
}
