// Package Imports
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Component Imports
import Entry from '../../components/entry'
import SimpleNav from '../../components/layout/simple-nav'

export default function Portfolio({ filteredList, params }) {
	return (
		<>
			<SimpleNav />
			<div className='flex flex-col'>
				<h1 className='text-5xl sm:text-6xl md:text-7xl leading-tight text-left font-bold my-5 sm:mb-8'>
					{_.startCase(params.tag)}
				</h1>
				{filteredList.map(({ title, slug, date, location }) => (
					<Entry
						title={title}
						link={slug}
						dates={date}
						locations={location}
					/>
				))}
			</div>
		</>
	)
}

const root = process.cwd()

export async function getStaticProps({ params }) {
	const contentRoot = path.join(root, 'posts')
	const postData = fs.readdirSync(contentRoot).map(p => {
		const content = fs.readFileSync(path.join(contentRoot, p), 'utf8')
		const frontmatter = matter(content).data

		return {
			...frontmatter,
			slug: p.replace(/\.mdx/, '')
		}
	})

	const filteredList = postData.filter(post =>
		post.tags.map(tag => _.kebabCase(tag)).includes(params.tag)
	)

	return { props: { filteredList, params } }
}

export async function getStaticPaths() {
	const contentRoot = path.join(root, 'posts')

	const tags = fs.readdirSync(contentRoot).map(p => {
		const content = fs.readFileSync(path.join(contentRoot, p), 'utf8')
		return matter(content).data.tags
	})

	const tagsUniq = _.uniq(tags.flat()).map(tag => _.kebabCase(tag))

	const paths = tagsUniq.map(tag => ({
		params: {
			tag
		}
	}))

	return {
		paths: paths,
		fallback: false
	}
}