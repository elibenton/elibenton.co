// Package Imports
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import moment from 'moment'
import { sortBy } from 'lodash'
import { groups } from 'd3'

// Component Imports
import Intro from '../components/intro'
import Section from '../components/section'
import Entry from '../components/entry'

// Utilility Imports
import groupByDate from '../utils/group-by-date'
import { data } from 'autoprefixer'

export default function Portfolio({ groupedList }) {
	return (
		<>
			<Intro />
			<div className='flex flex-row'>
				<div className='flex-grow'>
					{groupedList.map(group =>
						group[1].map(entry => (
							<Section sectionName={entry[0]}>
								{entry
									.slice(1, 2)
									.map(article =>
										article.map(
											({ slug, title, location, date, country }) => (
												<Entry
													title={title}
													link={slug}
													dates={moment(JSON.parse(date)).format(
														'MMMM DD, YYYY'
													)}
													locations={location}
													country={country}
												/>
											)
										)
									)}
							</Section>
						))
					)}
				</div>
				<aside className='hidden lg:flex flex-col flex-wrap w-48 sticky-top self-start px-4'>
					<ul className='mt-6'>
						{groupedList.map(group =>
							group[1].map(entry => (
								<li>
									<a
										className='text-lg hover:italic expand'
										href={`#${entry[0]}`}>
										{entry[0]}
									</a>
								</li>
							))
						)}
					</ul>
				</aside>
			</div>
		</>
	)
}

export async function getStaticProps() {
	const contentRoot = path.join(process.cwd(), 'posts')

	const postData = fs.readdirSync(contentRoot).map(p => {
		const file = fs.readFileSync(path.join(contentRoot, p), 'utf8')
		const { data } = matter(file)

		return {
			...data,
			slug: p.replace(/\.mdx/, ''),
			date: JSON.stringify(data.date)
		}
	})

	const groupedList = groups(
		sortBy(
			postData.map(date => groupByDate(date)),
			'date'
		).reverse(),
		d => d.tier,
		d => d.display
	).sort((a, b) => a - b)

	return { props: { groupedList } }
}
