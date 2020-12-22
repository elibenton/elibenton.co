import Intro from '../components/intro'
import BlogList from '../components/blog-list'

import _ from 'lodash'
import moment from 'moment'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { groups } from 'd3'

const root = process.cwd()

export default function Portfolio({ groupedList }) {
	return (
		<>
			<Intro />
			<BlogList groupedList={groupedList} />
		</>
	)
}

export async function getStaticProps() {
	const contentRoot = path.join(root, 'posts')
	const postData = fs.readdirSync(contentRoot).map(p => {
		const content = fs.readFileSync(path.join(contentRoot, p), 'utf8')
		return {
			slug: p.replace(/\.mdx/, ''),
			title: matter(content).data.title,
			date: matter(content).data.date,
			location: matter(content).data.location,
			country: matter(content).data.country
		}
	})

	const groupedList = groups(
		_.sortBy(
			postData.map(date => group(date)),
			'date'
		).reverse(),
		d => d.tier,
		d => d.display
	)

	console.log(groupedList)

	return { props: { groupedList } }
}

function group(post) {
	const postDate = moment(post.date)

	if (postDate.isAfter(moment().subtract(1, 'year'))) {
		return {
			...post,
			display: postDate.format('MMMM YYYY'),
			tier: 'tier_1'
		}
	} else if (
		postDate.isBetween(
			moment().subtract(3, 'year'),
			moment().subtract(1, 'year')
		)
	) {
		if (['12', '1', '2'].includes(postDate.format('M'))) {
			return {
				...post,
				display: `Winter ${postDate.format('YYYY')}`,
				tier: 'tier_2'
			}
		} else if (['3', '4', '5'].includes(postDate.format('M'))) {
			return {
				...post,
				display: `Spring ${postDate.format('YYYY')}`,
				tier: 'tier_2'
			}
		} else if (['6', '7', '8'].includes(postDate.format('M'))) {
			return {
				...post,
				display: `Summer ${postDate.format('YYYY')}`,
				tier: 'tier_2'
			}
		} else {
			return {
				...post,
				display: `Autumn ${postDate.format('YYYY')}`,
				tier: 'tier_2'
			}
		}
	} else {
		return {
			...post,
			display: postDate.format('YYYY'),
			tier: 'tier_3'
		}
	}
}
