import {Config} from '@remotion/cli/config';
// 复用修订版v2的全部素材/配音/字体，避免重复存储大文件
Config.setPublicDir('../../修订_20261028_v2-新素材与清晰动效/stock_public');
Config.setVideoImageFormat('jpeg');
Config.setConcurrency(4);
