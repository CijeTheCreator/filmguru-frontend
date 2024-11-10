import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight, IconSparkles } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading:
      'I loved The Shawshank Redemption! Do you have any similar recommendations',
    message:
      'I loved The Shawshank Redemption! Do you have any similar recommendations'
  },
  {
    heading: `I'm in the mood for something mind-bending like Inception. What do you suggest?`,
    message: `I'm in the mood for something mind-bending like Inception. What do you suggest?`
  },
  {
    heading: `I want to watch a feel-good movie that'll make me laugh. Got any top picks?`,
    message: `I want to watch a feel-good movie that'll make me laugh. Got any top picks?`
  },
  {
    heading: `I just finished The Godfather. What's another iconic classic I should check out?`,
    message: `I just finished The Godfather. What's another iconic classic I should check out?`
  }
]

export function EmptyScreen({
  submitMessage
}: {
  submitMessage: (message: string) => void
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 mt-12">
      <div className="rounded-md bg-background p-8 dark:border-none border border-foreground-muted  mb-4 w-full justify-center flex flex-col items-center">
        {/* <h1 className="mb-2 text-lg font-semibold">Welcome Weather AI</h1> */}
        <span className="text-2xl flex items-center my-5">
          {/* <span className="text-lg font-semibold">Weather</span> */}
          FilmGuru
          <IconSparkles className="inline mr-0 ml-0.5 w-4 sm:w-5 mb-1" />
        </span>
        <p className="mb-2 leading-normal text-muted-foreground text-center">
          An AI movie companion that helps you discover the perfect film from
          the top 500 IMDb list. Ask for recommendations by genre, mood, or
          decade, and let FilmGuru guide you to your next favorite movie
        </p>

        <div className="mt-4 flex flex-col items-start space-y-2 mb-4 justify-start">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
