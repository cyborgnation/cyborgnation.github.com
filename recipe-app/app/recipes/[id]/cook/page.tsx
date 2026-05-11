import { RecipeCookClient } from "./RecipeCookClient"

export default async function RecipeCookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <RecipeCookClient id={id} />
}
