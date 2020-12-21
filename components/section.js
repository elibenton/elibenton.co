export default function Section({ sectionName, children }) {
	return (
		<div className='flex mb-10' id={sectionName}>
			<div className='self-start sticky-top sm:mt-4 vertical'>
				<p className='font-bold text-green-500 pt-2'>{sectionName}</p>
			</div>
			<div id='projects' className='flex-col m-2 sm:m-4'>
				{children}
			</div>
		</div>
	)
}
