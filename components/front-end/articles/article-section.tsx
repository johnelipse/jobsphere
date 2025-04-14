import { SectionHeader } from "../section-header";
import { ArticleCard } from "./article-card";

interface Article {
  id: number;
  title: string;
  image: string;
  date: string;
  views: number;
  comments: number;
}

interface ArticleSectionProps {
  title: string;
  articles: Article[];
}

export function ArticleSection({ title, articles }: ArticleSectionProps) {
  return (
    <div className="mb-8">
      <SectionHeader title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            image={article.image}
            date={article.date}
            views={article.views}
            comments={article.comments}
          />
        ))}
      </div>
    </div>
  );
}
