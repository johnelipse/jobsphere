import Image from "next/image";
import { ChevronRight, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Article {
  id: number;
  title: string;
  image: string;
  author?: string;
  views: number;
  comments: number;
}

interface FeaturedArticlesProps {
  articles: Article[];
}

export function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <div className="relative h-40">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              width={400}
              height={160}
              className="object-cover w-full h-full"
            />
            {article.author && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center space-x-2 text-white text-xs mb-1">
                  <div className="bg-gray-800 rounded-full h-5 w-5 flex items-center justify-center">
                    <User className="h-3 w-3" />
                  </div>
                  <span>{article.author}</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-sm mb-3">{article.title}</h3>
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                Read story <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {article.views}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {article.comments}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
