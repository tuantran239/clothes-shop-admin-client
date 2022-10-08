import Loading from '@/components/Loading'
import React, { Suspense } from 'react'

interface PropsType {
  component: React.ElementType
}

const UserRouter = ({ component: Component }: PropsType) => {
  return <Suspense fallback={<Loading />}>{<Component />}</Suspense>
}

export default UserRouter
