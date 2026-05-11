import { MealCookClient } from "./MealCookClient"

export default async function MealCookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <MealCookClient id={id} />
}
