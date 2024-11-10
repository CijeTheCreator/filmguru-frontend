import 'server-only'
import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc'

// Components
import {
  BotCard,
  BotMessage,
  BotMessageText
} from '@/components/llm-weather/message'
import { spinner } from '@/components/llm-weather/spinner'

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content
    }
  ])

  const reply = createStreamableUI(
    <BotMessage className="items-center">{spinner}</BotMessage>
  )

  reply.update(<BotMessageText content={content} />)
  reply.done()
  aiState.done([...aiState.get(), { role: 'assistant', content }])

  return {
    id: Date.now(),
    display: reply.value
  }
}

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function'
  content: string
  id?: string
  name?: string
}[] = []

const initialUIState: {
  id: number
  display: React.ReactNode
}[] = []

export const AI = createAI({
  actions: {
    submitUserMessage
  },
  initialUIState,
  initialAIState
})
