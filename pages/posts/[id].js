import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Layout from '../../components/Layout'
import { getPostIds, getPostById } from '../../lib/post'
import { useRouter } from 'next/router'
import Spinner from 'react-bootstrap/Spinner'
import spinnerStyles from '../../styles/Spinner.module.css'

const Post = ({ post }) => {
	const router = useRouter()

	if (router.isFallback) {
		return (
			<Spinner
				animation='border'
				role='status'
				variant='dark'
				className={spinnerStyles.spinnerLg}
			>
				<span className='sr-only'>LOADING ....</span>
			</Spinner>
		)
	}

	return (
		<Layout>
			<Card className='my-3 shadow'>
				<Card.Body>
					<Card.Title>{post.title}</Card.Title>
					<Card.Text>{post.body}</Card.Text>
					<Link href='/posts'>
						<Button variant='dark'>Back</Button>
					</Link>
				</Card.Body>
			</Card>
		</Layout>
	)
}

export const getStaticPaths = async () => {
	const paths = await getPostIds(5)
	console.log(paths)

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps = async ({ params }) => {
	const post = await getPostById(params.id)

	return {
		props: {
			post
		},
		revalidate: 1
	}
}

export default Post
