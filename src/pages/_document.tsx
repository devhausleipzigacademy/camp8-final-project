import SingleCard from '@/components/Card'
import { example_card } from '@/components/CardsUtilities'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main/>
        <SingleCard
          createNewCard={false}
          data={example_card.data}
          changingName={"false"}/>
        <NextScript />
      </body>
    </Html>
  )
}