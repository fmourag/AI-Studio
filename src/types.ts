export interface Channel {
  id: string;
  name: string;
  logo: string;
  url: string;
  category: string;
  country: string;
  language: string;
  views: number; // Mock views for sorting
  description?: string;
}

export type Category = 'Notícias' | 'Entretenimento' | 'Filmes' | 'Música' | 'Esportes' | 'Documentários' | 'Todos';
