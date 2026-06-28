import { ChelseaDashboardView } from "@/components/chelsea";
import { getChelseaData } from "@/lib/chelsea-data";
import { getChelseaNews } from "@/lib/chelsea-news";

export default async function ChelseaPage() {
  const [data, news] = await Promise.all([getChelseaData(), getChelseaNews()]);
  return <ChelseaDashboardView data={{ ...data, news }} />;
}
