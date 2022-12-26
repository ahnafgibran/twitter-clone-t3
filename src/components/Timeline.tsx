import Image from 'next/image'
import React from 'react'
import { RouterOutputs, trpc } from '../utils/trpc'
import CreateTweet from './CreateTweet'

function Tweet({tweet}: {tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number]}){
  return <div>
    <div>
      {tweet.author.image &&
      
      <Image src={tweet.author.image} alt={`${tweet.author.name} profile picture`} width={48} height={48} className="rounded-full"/>
      }
    </div>
  </div>
}

const Timeline = () => {

  const {data} = trpc.tweet.timeline.useQuery({limit: 2})

  return (
    <div>
      <CreateTweet/>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}

export default Timeline