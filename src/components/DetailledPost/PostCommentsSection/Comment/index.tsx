import { Comment as TypeComment } from '../../../../types'

type Props = {
  comment: TypeComment
  handleDelete: () => void
}

export default function Comment(props: Props) {
  const comment = props.comment
  return (
    <li className='flex items-start gap-2 sm:gap-3 overflow-hidden'>
      <img
        referrerPolicy='no-referrer'
        src={comment.user.photoURL}
        alt=''
        className='w-[35px] rounded-full'
      />
      <div className='py-3 px-3 bg-gray-200 grow mt-2 rounded-xl rounded-tl-none'>
        <p className='flex justify-between gap-x-4 text-sm sm:text-base flex-wrap'>
          <span className='font-bold truncate'>{comment.user.name}</span>
          <span>{new Date(comment.createdAt).toDateString()}</span>
        </p>
        <p className='flex justify-between gap-x-4 text-sm sm:text-base'>
          <span>{comment.content}</span>
          <span
            onClick={props.handleDelete}
            className='underline self-end cursor-pointer text-mainBlue font-bold hover:opacity-70'
          >
            delete
          </span>
        </p>
      </div>
    </li>
  )
}
