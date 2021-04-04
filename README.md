# @xizher/cesium

## 安装

```bash
npm install @xizher/cesium
```

## 使用

```javascript
import {
  WebMap,
  MapCursor,
  Basemap,
} from '@xizher/cesium'

const webMap = new WebMap('cesium-container')
  .use(new Basemap())
  .use(new MapCursor())
  .mount()
```



