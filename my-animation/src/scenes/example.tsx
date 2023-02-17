import { makeScene2D } from '@motion-canvas/2d/lib/scenes'
import { Rect } from '@motion-canvas/2d/lib/components'
import {
  CodeBlock,
  insert,
  lines,
} from '@motion-canvas/2d/lib/components/CodeBlock'
import { waitFor } from '@motion-canvas/core/lib/flow'
import { slideTransition } from '@motion-canvas/core/lib/transitions'
import { Direction } from '@motion-canvas/core/lib/types'
import { createRef, useScene } from '@motion-canvas/core/lib/utils'

export default makeScene2D(function* (view) {
  const code = createRef<CodeBlock>()

  yield view.add(
    <>
      <Rect
        offset={-1}
        x={-960 + 80}
        y={-540 + 80}
        height={1080 - 160}
        width={960 * 2}
        clip
      >
        <CodeBlock
          language='typescript'
          ref={code}
          fontSize={50}
          lineHeight={65}
          offsetX={-1}
          fontFamily={'JetBrains Mono'}
          x={-960}
          code={`void main() {

  await Supabase.initialize();
  runApp(const MyApp());
}`}
        />
      </Rect>
    </>
  )

  yield* slideTransition(Direction.Top, 1)
  yield* waitFor(0.3)
  yield* code().selection(lines(2), 0.8)
  yield* code().edit(2.0)`void main() {

  await Supabase.initialize(${insert(`
    url: supabaseUrl,
  `)});
  runApp(const MyApp());
}`

  useScene().enterCanTransitionOut()
})
