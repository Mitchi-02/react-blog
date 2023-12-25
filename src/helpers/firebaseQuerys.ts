import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore'
import { auth, db } from '../firebase'
import { Post, Comment } from '../types'

export const fetchAuthPosts = async (
  limitConstraint: number = 0,
  orderByConstraint: string = '',
  startsAfterConstraint: any = null
): Promise<Post[]> => {
  if (!auth.currentUser) throw new Error('Unauthenticated')
  const constraints = []
  if (orderByConstraint) constraints.push(orderBy(orderByConstraint, 'desc'))
  if (limitConstraint) constraints.push(limit(limitConstraint))
  if (startsAfterConstraint) constraints.push(startAfter(startsAfterConstraint))
  const data = await getDocs(
    query(
      collection(db, 'posts'),
      where('user.id', '==', auth.currentUser?.uid),
      ...constraints
    )
  )
  const postsData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Post[]
  return postsData
}

export const fetchPostById = async (id: string): Promise<Post | null> => {
  const data = await getDoc(doc(db, 'posts', id))
  if (data.exists()) return { id: data.id, ...data.data() } as Post
  return null
}

export const fetchPostComments = async (
  postId: string,
  limitConstraint: number = 0,
  startsAfterConstraint: any = null
): Promise<Comment[]> => {
  const constraints = []
  if (limitConstraint) constraints.push(limit(limitConstraint))
  if (startsAfterConstraint) constraints.push(startAfter(startsAfterConstraint))
  const data = await getDocs(
    query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc'),
      ...constraints
    )
  )
  const comments = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Comment[]
  return comments
}

export const addComment = async (
  postId: string,
  content: string
): Promise<Comment> => {
  if (!auth.currentUser) throw new Error('Unauthenticated')
  const newComment: any = {
    createdAt: Date.now(),
    content,
    postId,
    user: {
      id: auth.currentUser?.uid,
      name: auth.currentUser?.displayName,
      photoURL: auth.currentUser?.photoURL,
    },
  }
  const ref = await addDoc(collection(db, 'comments'), newComment)
  newComment.id = ref.id
  return newComment
}

export const deleteAuthComment = async (comment: Comment): Promise<void> => {
  if (!auth.currentUser) throw new Error('Unauthenticated')
  if (comment.user.id != auth.currentUser.uid)
    throw new Error('Can not delete others comments !')
  await deleteDoc(doc(db, 'comments', comment.id))
  return
}

export const fetchPostsPaginate = async (
  limitConstraint: number = 0,
  orderByConstraint: string = '',
  startsAfterConstraint: any = null
): Promise<Post[]> => {
  const constraints = []
  if (orderByConstraint) constraints.push(orderBy(orderByConstraint, 'desc'))
  if (limitConstraint) constraints.push(limit(limitConstraint))
  if (startsAfterConstraint) constraints.push(startAfter(startsAfterConstraint))
  const data = await getDocs(query(collection(db, 'posts'), ...constraints))
  const postsData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Post[]
  return postsData
}

export const addAuthPost = async (
  title: string,
  description: string
): Promise<void> => {
  if (!auth.currentUser) throw new Error('Unauthenticated')
  await addDoc(collection(db, 'posts'), {
    createdAt: Date.now(),
    title,
    description,
    user: {
      id: auth.currentUser?.uid,
      name: auth.currentUser?.displayName,
      photoURL: auth.currentUser?.photoURL,
    },
    likes: [],
    totalLikes: 0,
  })
  return
}

export const deleteAuthPost = async (post: Post): Promise<void> => {
  if (!auth.currentUser) throw new Error('Unauthenticated')
  if (post.user.id != auth.currentUser.uid)
    throw new Error('Can not delete others posts !')
  await deleteDoc(doc(db, 'posts', post.id))
  return
}

export const unLikePost = async (post: Post): Promise<void> => {
  if (!auth.currentUser) throw new Error('Unauthenticated')
  await updateDoc(doc(db, 'posts', post.id), {
    ...post,
    likes: post.likes.filter((post) => post.user_id != auth.currentUser?.uid),
    totalLikes: post.likes.length,
  })
  return
}

export const likePost = async (post: Post): Promise<void> => {
  if (!auth.currentUser) throw new Error('Unauthenticated')
  await updateDoc(doc(db, 'posts', post.id), {
    ...post,
    likes: [
      ...post.likes,
      {
        user_name: auth.currentUser?.displayName,
        user_id: auth.currentUser?.uid,
      },
    ],
    totalLikes: post.likes.length,
  })
  return
}

export const filters = [
  {
    text: 'Newest',
    value: 'createdAt',
  },
  {
    text: 'Most liked',
    value: 'totalLikes',
  },
]
