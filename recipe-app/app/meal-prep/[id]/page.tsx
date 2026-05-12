import { MealPrepDetailClient } from "./MealPrepDetailClient"

export default async function MealPrepDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <MealPrepDetailClient id={id} />
}
