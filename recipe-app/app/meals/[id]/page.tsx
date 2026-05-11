import { MealDetailClient } from "./MealDetailClient"

export default async function MealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <MealDetailClient id={id} />
}
