export interface BannerType {
  createdAt: string;
  images: string;
  id: string;
}

export interface ArticlesType {
  createdAt: string;
  title: string;
  image: string;
  previewContent: string;
  content: string;
  createBy: string;
  id: string;
}

export interface CommentsType{
  createdAt:string;
  user:string;
  comment:string;
  id:string;
  articleId:string;
}