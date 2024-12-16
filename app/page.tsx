import dynamic from 'next/dynamic'

const StoryGenerator = dynamic(
  () => import('@/components/story-generator-enhanced'),
  { ssr: false }
)

export default function Page() {
  return (
    <main>
      <StoryGenerator />
    </main>
  )
}