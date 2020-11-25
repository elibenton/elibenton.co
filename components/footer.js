export default function Footer() {
	return (
		<section className='pt-16 sm:pt-32'>
			<div className='pl-2'>
				<ul>
					<li>
						<a className='expand' href='#yeah'>
							Subscribe
						</a>
					</li>
					<li>
						<a className='expand' href='#yeah'>
							RSS Feed
						</a>
					</li>
					<li>
						<a className='expand' href='#yeah'>
							Sitemap
						</a>
					</li>
				</ul>
			</div>
			<section className='flex justify-between py-8'>
				<a
					href='#yep'
					className='text-sm bg-gray-300 rounded-full text-gray-700 px-2 hover:bg-gray-400 hover:text-gray-900 duration-200'>
					© {new Date().getFullYear()} Eli B. Cohen
				</a>
				<a
					href='#yep'
					className='text-sm bg-gray-300 rounded-full text-gray-700 px-2 hover:bg-gray-400 hover:text-gray-900 duration-200'>
					Terms & Privacy
				</a>
				<a
					href='#yep'
					className='text-sm bg-gray-300 rounded-full text-gray-700 px-2 hover:bg-gray-400 hover:text-gray-900 duration-200'>
					GPLv3
				</a>
			</section>
		</section>
	)
}