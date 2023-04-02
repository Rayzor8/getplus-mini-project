import { ArticlesType, BannerType } from "@/types";
import MainBanner from "@/components/MainBanner";
import ArticlePreview from "@/components/ArticlePreview";



export async function getStaticProps() {
  const resInitialArticles = await fetch(
    "https://62d5368fd4406e5235558a46.mockapi.io/articles?page=1&limit=10"
  );

  const resInitialBanner = await fetch(
    "https://62d5368fd4406e5235558a46.mockapi.io/banners"
  );

  const initialArticles = await resInitialArticles.json();
  const initialBanners = await resInitialBanner.json();

  return {
    props: {
      initialArticles,
      initialBanners,
    },
  };
}

type HomeProps = {
  initialBanners: BannerType[];
  initialArticles: ArticlesType[];
};

export default function Home({ initialArticles, initialBanners }: HomeProps) {
  return (
    <>
      <MainBanner banners={initialBanners} />
      <ArticlePreview initialArticles={initialArticles} />
    </>
  );
}
