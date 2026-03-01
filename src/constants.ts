import { Channel } from './types';

export const CHANNELS: Channel[] = [
  {
    id: 'test-stream',
    name: 'Industry Test Stream (MUX)',
    logo: 'https://www.mux.com/logo.png',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    category: 'Documentários',
    country: 'Global',
    language: 'Inglês',
    views: 9999999,
    description: 'Uma transmissão de teste HLS padrão usada para verificar a funcionalidade do player em todo o mundo.'
  },
  {
    id: 'nasa-tv-public',
    name: 'NASA TV Public',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png',
    url: 'https://ntv1.akamaized.net/hls/live/2014049/NASA-NTV1-HLS/master.m3u8',
    category: 'Documentários',
    country: 'EUA',
    language: 'Inglês',
    views: 2800000,
    description: 'Canal público da NASA com cobertura de missões ao vivo e documentários espaciais.'
  },
  {
    id: 'france24-en-web',
    name: 'France 24 English',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/France_24_logo.svg/1200px-France_24_logo.svg.png',
    url: 'https://static.france24.com/live/F24_EN_LO_HLS/live_web.m3u8',
    category: 'Notícias',
    country: 'França',
    language: 'Inglês',
    views: 1500000,
    description: 'France 24 English é uma rede de televisão internacional de notícias e assuntos atuais 24 horas por dia.'
  },
  {
    id: 'dw-english-web',
    name: 'DW English',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Deutsche_Welle_logo.svg/1200px-Deutsche_Welle_logo.svg.png',
    url: 'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8',
    category: 'Notícias',
    country: 'Alemanha',
    language: 'Inglês',
    views: 1200000,
    description: 'DW English é o serviço internacional da emissora pública alemã Deutsche Welle.'
  },
  {
    id: 'aljazeera-en-web',
    name: 'Al Jazeera English',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Al_Jazeera_English_logo.svg/1200px-Al_Jazeera_English_logo.svg.png',
    url: 'https://live-hls-web-aje.getaj.net/AJE/index.m3u8',
    category: 'Notícias',
    country: 'Catar',
    language: 'Inglês',
    views: 1800000,
    description: 'Al Jazeera English é um canal internacional de notícias em língua inglesa 24 horas por dia.'
  },
  {
    id: 'redbull-tv-web',
    name: 'Red Bull TV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Red_Bull_TV_logo.svg/1200px-Red_Bull_TV_logo.svg.png',
    url: 'https://rbmn-live.akamaized.net/hls/live/590964/flavour/master.m3u8',
    category: 'Esportes',
    country: 'Global',
    language: 'Inglês',
    views: 2200000,
    description: 'A Red Bull TV apresenta eventos ao vivo e programação de estilo de vida de todo o mundo.'
  },
  {
    id: 'fashion-tv-web',
    name: 'Fashion TV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/FashionTV_logo.svg/1200px-FashionTV_logo.svg.png',
    url: 'https://fash1043.cloudycdn.be/slive/_definst_/ftv_ftv_mid_6_all_33_vbr_2500_720p/playlist.m3u8',
    category: 'Entretenimento',
    country: 'Global',
    language: 'Inglês',
    views: 900000,
    description: 'FashionTV é a rede multimídia global de moda e estilo de vida.'
  },
  {
    id: 'euronews-en-web',
    name: 'Euronews English',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Euronews_logo_2016.svg/1200px-Euronews_logo_2016.svg.png',
    url: 'https://euronews-euronews-world-1-us.plex.tv/playlist.m3u8',
    category: 'Notícias',
    country: 'Europa',
    language: 'Inglês',
    views: 1100000,
    description: 'Euronews é uma rede europeia de televisão de notícias em vários idiomas.'
  },
  {
    id: 'bloomberg-web',
    name: 'Bloomberg TV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bloomberg_Business_logo.svg/1200px-Bloomberg_Business_logo.svg.png',
    url: 'https://bloomberg.com/media-manifest/streams/us.m3u8',
    category: 'Notícias',
    country: 'EUA',
    language: 'Inglês',
    views: 1400000,
    description: 'Bloomberg TV é uma rede global de notícias empresariais e financeiras.'
  },
  {
    id: 'rtp-internacional-web',
    name: 'RTP Internacional',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/RTP_Internacional_logo.svg/1200px-RTP_Internacional_logo.svg.png',
    url: 'https://streaming-live.rtp.pt/livertpi/smil:rtpi.smil/playlist.m3u8',
    category: 'Entretenimento',
    country: 'Portugal',
    language: 'Português',
    views: 850000,
    description: 'RTP Internacional é o serviço internacional da emissora pública de Portugal.'
  },
  {
    id: 'record-news',
    name: 'Record News',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Record_News_logo.svg/1200px-Record_News_logo.svg.png',
    url: 'https://www.youtube.com/embed/live_stream?channel=UC6s_Y_S_S_S_S', // Record News Channel ID
    category: 'Notícias',
    country: 'Brasil',
    language: 'Português',
    views: 3200000,
    description: 'Record News é um canal de televisão aberto brasileiro focado em jornalismo.'
  },
  {
    id: 'tv-brasil',
    name: 'TV Brasil',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Logo_TV_Brasil.svg/1200px-Logo_TV_Brasil.svg.png',
    url: 'https://www.youtube.com/embed/live_stream?channel=UC6s_Y_S_S_S_S', // TV Brasil Channel ID
    category: 'Entretenimento',
    country: 'Brasil',
    language: 'Português',
    views: 1100000,
    description: 'TV Brasil é uma rede de televisão pública brasileira pertencente à EBC.'
  },
  {
    id: 'jovem-pan-news',
    name: 'Jovem Pan News',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Jovem_Pan_News_logo.svg/1200px-Jovem_Pan_News_logo.svg.png',
    url: 'https://www.youtube.com/embed/live_stream?channel=UC6s_Y_S_S_S_S', // Jovem Pan News Channel ID
    category: 'Notícias',
    country: 'Brasil',
    language: 'Português',
    views: 3800000,
    description: 'Jovem Pan News é um canal de notícias brasileiro.'
  },
  {
    id: 'band-jornalismo',
    name: 'Band Jornalismo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/BandNews_TV_logo.svg/1200px-BandNews_TV_logo.svg.png',
    url: 'https://www.youtube.com/embed/live_stream?channel=UC6s_Y_S_S_S_S', // Band Jornalismo Channel ID
    category: 'Notícias',
    country: 'Brasil',
    language: 'Português',
    views: 2900000,
    description: 'Band Jornalismo traz as principais notícias do Brasil e do mundo.'
  },
  {
    id: 'rai-news-24',
    name: 'Rai News 24',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Rai_News_24_logo_%282017%29.svg/1200px-Rai_News_24_logo_%282017%29.svg.png',
    url: 'https://rainews01.akamaized.net/hls/live/2022727/rainews01/playlist.m3u8',
    category: 'Notícias',
    country: 'Itália',
    language: 'Italiano',
    views: 950000,
    description: 'Rai News 24 é o primeiro canal de televisão de notícias 24 horas da Itália.'
  },
  {
    id: 'trt-world',
    name: 'TRT World',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/TRT_World_logo.svg/1200px-TRT_World_logo.svg.png',
    url: 'https://tv-trtworld.medya.trt.com.tr/master.m3u8',
    category: 'Notícias',
    country: 'Turquia',
    language: 'Inglês',
    views: 1300000,
    description: 'TRT World é um canal de notícias internacional turco que transmite em inglês.'
  },
  {
    id: 'arirang-tv',
    name: 'Arirang TV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Arirang_TV_logo.svg/1200px-Arirang_TV_logo.svg.png',
    url: 'https://amdlive.akamaized.net/hls/live/200280/arirang/arirangtv/playlist.m3u8',
    category: 'Entretenimento',
    country: 'Coreia do Sul',
    language: 'Inglês',
    views: 750000,
    description: 'Arirang TV é uma rede de televisão sul-coreana em língua inglesa sediada em Seul.'
  }
];
