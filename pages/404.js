import Head from 'next/head';
import Link  from 'next/link';
import { Button } from '../components/buttons/buttons';
import GlitchText from '../components/glitch-text/glitch-text';
import styles from './error.module.scss';

export default function Error() {
	return(
		<div className={styles.body}>
			<Head>
				<title>RUBEN GIANNOTTI / 404 Page not found</title>
			</Head>
			<div className={styles.content}>
				<div className={styles.text}>
					<h2 className={styles.title}>
						<GlitchText>404</GlitchText>
					</h2>
					<span className={styles.notification}>
						Oops! The page you requested wasn't found...
					</span>
				</div>
				<Link href="/"><Button>Home</Button></Link>
			</div>
		</div>
	);
}
