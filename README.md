# 使用 Nuxt3 創建一個汽車交易頁面

## 創建 nuxt 項目

開啟終端機，於想生成項目資料夾的位置執行指令： 
`npx nuxi create cartrader`

完成後 `cd cartrader` 進入項目資料夾
執行 `npm install` 安裝依賴項目
最後執行 `npm run dev` 開始運行項目
並於 http://localhost:3000/ 顯示 Nuxt3 畫面

## 安裝第三方套件

首先需要安裝 `@nuxtjs/tailwindcss` 以於項目中使用 Tailwind CSS

開啟新的終端機，於項目資料夾中執行：
`npm install --save-dev @nuxtjs/tailwindcss@6.1.3` 安裝 Tailwind CSS

接著開啟項目中的 `nuxt.config.ts` 檔案
改寫為以下內容：
```typescript=
export default defineNuxtConfig({
  modules: [ // 新增 modules 為數組
    '@nuxtjs/tailwindcss' // 新增第三方套件於此
  ]
})
```

接著於終端機中按下 Control+C 關閉運行中的 Nuxt3 項目
重新執行指令 `npm run dev` 以確保成功獲取 `nuxt.config.ts` 檔案的設定


## pages 路由

在 Nuxt3 中，路由是依照特定模式自動建立好的
該模式要求我們於項目根目錄中新增名為 `pages` 的資料夾
並在 `app.vue` 這隻主要的 `.vue` 檔案中改寫為：
```htmlembedded=
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

接著於 `pages` 資料夾中新增檔案就會自動產生對應路由了

主要規則如下：
1. `pages` 底下的每個 `.vue` 檔案名稱及表示路徑名稱，所以假設檔案為 `about.vue` 則在網址中輸入 `/about` 即可開啟 `about.vue` 的頁面
2. 網址中的每個 `/` 就表示一個資料夾，所以假設網址路徑為 `/city/:cityId` ， `city` 就會是 `pages` 底下的資料夾
3. 動態路由的建立方式為將參數 `cityId` 用 `[]` 包裹，即新增檔案 `[cityId].vue` 於 `/pages/city` 底下
4. 假設路徑 `/city/:cityId` 是顯示所有該城市的車輛，而 `/city/:cityId/:brandName` 則篩選特定品牌的汽車，即表示最後的這個 `/:brandName` 是可選的，而如果動態路由是可選的，則比動態路由再多包一層 `[]` 即可，所以最終應該要建立一個 `[[brandName]].vue` 檔案

以本項目而言，主要會有三種路由：
1.  首頁：
路徑 `/` 對應檔案 `/pages/index.vue`
2.  商品總覽頁：
路徑 `/city/taipei/cars/toyota` 對應檔案 `/pages/city/[city]/car/[[brand]].vue`
3.  商品細節頁：
路徑 `/cars/jimny-1` 對應檔案 `/pages/cars/[name]-[id].vue`

## layouts 佈局

在 Nuxt3 中，可自定義佈局以減少重複的程式碼，
最常見的就是將 header 與 footer 獨立出來成為 layout 內容，
其設定方式要求我們於項目根目錄中新增名為 `layouts` 的資料夾
並在 `app.vue` 這隻主要的 `.vue` 檔案中改寫為：
```htmlembedded=
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

而在 `layouts` 資料夾中則可新增檔案 `default.vue` 撰寫佈局架構
舉例如下：
```htmlembedded=
<template>
  <NavBar /> // 添加共用的 navbar 元件
  <slot /> // 添加 slot 插槽指定顯示內容的位置
</template>
```

除了預設的 `default.vue` 檔案外
也可在其他有重複佈局的地方新增客製化佈局
舉例來說每個頁面的 `container` 都是固定的 `div` 搭配 `class`
此時可以新增檔案 `custom.vue` 將 `container` 做成客製化佈局：
```htmlembedded=
<template>
  <NavBar />
  <div
    class="mx-auto max-w-[100%] sm:max-w-[75%] 2xl:max-w-[800px]">
    <slot />
  </div>
</template>
```
接著在需要使用的檔案中撰寫以下程式碼，
告知該檔案要用的 layout 為 custom：
```htmlembedded=
<script setup>
definePageMeta({
  layout: 'custom',
});
</script>
```

## components 元件

在 Nuxt3 中，可將程式碼獨立拉出成為元件以便於單獨管理，
其設定方式要求我們於項目根目錄中新增名為 `components` 的資料夾
接著建立檔案，
檔案名稱建議使用大駝峰的方式設置(FooBar.vue)，
也可通過 - 連結單字的方式設置(foo-bar.vue)

舉例來說，可建立元件 `TheHeader.vue` 存放 header 區塊的程式碼，
並在需要使用 header 元件的地方，通過以下方式使用：
```htmlembedded=
<template>
  <TheHeader /> // 也可以通過 <the-header /> 使用
</template>
```
>在原本的 Vue.js 中需要先 import .vue 檔案，
>才可通過 <TheHeader /> 的方式使用元件
>而在 Nuxt3 中，則將 import 的步驟改為自動引入，
>所以不需先 import .vue 檔案即可使用元件

另外元件的名稱將會使用目錄的路徑＋檔案名稱，並自動刪除重複的字段
所以假設有多個元件的名稱帶有重複單字，比如 `DetailSidebar.vue` `DetailCard.vue` 
則可以在 `components` 的資料夾中新增 `detail` 資料夾
並將 `DetailSidebar.vue` `DetailCard.vue` 改為 `Sidebar.vue` `Card.vue` 
最後把放置 `Sidebar.vue` `Card.vue` 檔案放於 `detail` 資料夾中
使用時元件的名稱依舊會是 `<DetailSidebar />` `<DetailCard />`


## composables 組合式函數

在 Nuxt3 中，可以將重複使用到的函數拉出成為組合式函數，
其設定方式要求我們於項目根目錄中新增名為 `composables` 的資料夾
並新增檔案 `useXxxx.js` 或 `useXxxx.ts`

舉例來說，在 title 中需使用大小寫轉換的函數，
可以建立一個檔案 `useUtilites.js` 並將函數放置於內進行導出：
```javascript=
export const useUtilites = () => {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0 .toUpperCase() + txt.substr(1).toLowerCase())
    })
  }
  return {
    toTitleCase,
  }
}
```

接著於需要使用該函數的地方撰寫以下內容：
```htmlembedded=
<script setup>
const routePars = useRoute().params;
const { toTitleCase } = useUtilites();

useHead({
  title: toTitleCase(`CARTRADER - ${routePars.name}`),
});
</script>
```

## useHead

`useHead()` 為 Nuxt3 提供的 composable
其最常被用於設置網頁的 title

另外也可設置以下內容：
- base：同 meta tag 中的 base 標籤
- link：同 meta tag 中的 link 標籤
- meta：同 meta tag 中的 meta 標籤
- style：同 meta tag 中的 style 標籤
- script：同 meta tag 中的 script 標籤
- noscript：同 meta tag 中的 noscript 標籤
- titleTemplate：配置動態模板，用以自定義標題

用法：
```htmlembedded=
<script setup>
useHead({
  titleTemplate: (title) => `My App - ${title}`, // 使用動態模板自定義網頁標題
  viewport: "width=device-width, initial-scale=1, maximum-scale=1", // 設置 viewport
  charset: "utf-8", // 設置網頁語系
  meta: [{ name: "description", content: "My amazing site." }], // 新增 meta 標籤
  bodyAttrs: { // 為 body 標籤增加屬性
    class: "container", // 為 body 標籤設置 class
  },
  link: [
    { 
      rel: 'stylesheet', // 設置 link 標籤中的 rel 值
      href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' // 設置 link 標籤中的 href 值
    },
  ],
  script: [
    {
      src: 'https://third-party-script.com',
      body: true // body 預設是 false，設為 true 表示要將 script 放在 </body> 前一行
    }
  ]
});
</script>
```

## 處理錯誤

### 自定義錯誤頁面

在創建 Nuxt3 項目後，預設提供了一個錯誤頁面
對於常規的錯誤處理可使用預設的頁面滿足大部分需求
假設需要自定義錯誤頁面則可於項目根目錄中新增檔案 `error.vue`

針對錯誤， Nuxt3 提供了 `useError()` 的 composable
可以藉由 `useError()` 獲取主要的錯誤資訊顯示於畫面中：
```htmlembedded=
<script setup>
const err = useError();
</script>

<template>
  <div>
    <h1>{{ err.statusCode }}</h1>
    <p>{{ err.message }}</p>
    <NuxtLink to="/">Go Back</NuxtLink>
  </div>
</template>
```
>statusCode: HTTP 狀態碼(400/403/404/500/502 etc.)
>statusMessage: HTTP 狀態碼對應的提示訊息(Internal Server Error/Not Found/Method Not Allowed etc.)
>message: 錯誤訊息

### createError & clearError

除此之外，也可以使用 `createError` 自定義錯誤內容：
```htmlembedded=
<script setup>
const routePars = useRoute().params;
const cars = useCars();
const car = computed(() => cars.find(item => item.id == routePars.id));

if (!car.value) { // 當 car 不存在
  throw createError({ // 拋出自定義錯誤，Nuxt 將自動切換為錯誤頁面
    statusCode: 404, // 設置狀態碼
    message: `Car "${routePars.name}-${routePars.id}" not found.` // 設置訊息
  })
}
</script>
```

假設使用了 `throw createError` 則必須在 `error.vue` 中通過 `clearError` 清除錯誤並跳轉是首頁或其他頁面：
```htmlembedded=
<template>
  <div>
    <h1>{{ err.statusCode }}</h1>
    <p>{{ err.message }}</p>
    <button @click="handleError()">Go Back</button>
  </div>
</template>

<script setup>
const err = useError();
const handleError = () => {
  clearError({
    redirect: '/',
  })
};
</script>
```

### CSR 錯誤處理

使用 `<NuxtErrorBoundary>` 標籤，將頁面內容包裹
並通過 `<template>` 標籤，建立錯誤時顯示的內容：
```htmlembedded=
<template>
  <NuxtErrorBoundary>
    <NavBar />
    <NuxtPage />
    
    <template #error="{ error }">
      <p>Sorry, something wrong: {{ error }}</p>
      <button @click="error.value = null">Go back</button>
    </template>
  </NuxtErrorBoundary>
</template>
```

## Server-Side Rendering&Client-Side Rendering&Universal Rendering

### Server-Side Rendering

Server 提供完整的 HTML CSS JS 檔案給瀏覽器
瀏覽器可以直接進行渲染而不需要任何解析與處理
所以在瀏覽器中幾乎是馬上就跑出畫面

當切換到不同頁面時，瀏覽器需要再次向服務端發送請求，
而服務端則針對當前頁面再次提供完整的 HTML CSS JS 檔案進行渲染

### Client-Side Rendering

Server 提供空的 HTML 與一整包 JS，
瀏覽器解析 JS 從而進行繪製 HTML 以及渲染
在瀏覽器編譯 JS 的過程中需要等待
>舉例來說 Vue.js 提供的 HTML 只有一個 `<div id="app"></div>` 
>接著瀏覽器藉由整包 JS 把所有內容建立出來

當切換到不同頁面時，因 JS 已經獲取了所有邏輯，
所以實際上不需要再向服務端發送請求，
而是可以直接將當前元件移除並重新生成元件

### Universal Rendering

Server 會先提供當前頁面的完整 HTML，讓瀏覽器繪製出 UI 但無法進行交互
接著過一段時間後 Server 會再提供 JS，
藉由編譯 JS 使 UI 產生交互，
該解析 JS 與產生 UI 交互的過程被稱為 Hydration
這正是 nuxt 使用的渲染方式，結合了一部分的 SSR 以及一部分的 CSR

## Modules

### tailwindcss

安裝以使用 Tailwind CSS 快速設定樣式

開啟終端機，於項目根目錄中執行：
`npm install --save-dev @nuxtjs/tailwindcss@6.1.3`

接著開啟項目中的 `nuxt.config.ts` 檔案
改寫為以下內容：
```typescript=
export default defineNuxtConfig({
  modules: [ // 新增 modules 為數組
    '@nuxtjs/tailwindcss' // 新增第三方套件於此
  ]
})
```

### image

安裝以使用 <NuxtImg/> 處理圖片

開啟終端機，於項目根目錄中執行：
`npm install -D @nuxt/image-edge`

接著開啟項目中的 `nuxt.config.ts` 檔案
改寫為以下內容：
```typescript=
export default defineNuxtConfig({
  modules: [
    '@nuxt/image-edge', // 新增這行
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ]
})
```

使用方式：
1. 將 `<img />` 標籤改為 `<NuxtImg />` 標籤
2. 加上 `preload` 屬性讓重要的圖片優先載入
3. 加上 `loading="lazy"` 屬性實現懶加載
4. 加上 `sizes="sm:100vw md:50vw lg:400px"` 設置響應式圖片尺寸
5. 加上 `format="webp"` 設置圖片格式

### Vueuse

安裝以使用 useLocalStorage 保存數據

開啟終端機，於項目根目錄中執行：
`npm i -D @vueuse/nuxt @vueuse/core`

接著開啟項目中的 `nuxt.config.ts` 檔案
改寫為以下內容：
```typescript=
export default defineNuxtConfig({
  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt', // 新增這行
  ]
})
```

使用方式：
```htmlembedded=
<template>
  <ul>
    <CarCard 
      v-for="car in cars" 
      :key="car.id" 
      :car="car" 
      @favor="handleFavorite" 
      :favored="car.id in favorite" 
    />
  </ul>
</template>

<script setup>
const cars = useCars();

const favorite = useLocalStorage( // 使用 useLocalStorage 設置 LocalStorage 保存喜愛狀態
  'favorite',
  {},
)

const handleFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id]
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true
    }
  }
}
</script>
```
```htmlembedded=
<template>
  <li>
    <NuxtLink to="`/cars/${car.name}-${car.id}`">
      {{ car.name }}
    </NuxtLink>
    <img 
      class="mx-3" 
      width="24" 
      @click.stop="emit('favor', car.id)" 
      :src="favored ? heartFilled : heartOutline" 
    />
  </li>
</template>

<script setup>
import heartFilled from "@/assets/heartFilled.png";
import heartOutline from "@/assets/heartOutline.png";

const props = defineProps({
  car: Object,
  favored: Boolean,
});

const emit = defineEmits(['favor']); // 通過 defineEmits 調用父層函數
</script>
```

完成後可先嘗試點擊幾輛車的愛心加入喜愛，
此時如果重整畫面，會發現愛心恢復為全空的狀態，但 LocalStorage 確實有保存到數據
這是因為 Cards 是通過服務端渲染，但 LocalStorage 為客戶端的資訊
此時有兩種解決方法：
1. 藉由 Nuxt 提供的 ClientOnly 標籤將愛心包起來，讓 Nuxt 知道該區塊的程式碼要使用客戶端渲染
2. 將愛心抽離出來成為獨立元件 `heart.vue` ，並為該元件重置後綴名稱，更改為 `heart.client.vue` 讓 Nuxt 知道該元件要使用客戶端渲染

而針對客戶端渲染，則又有個附帶的問題會產生，
由於客戶端渲染會執行的比服務端慢(畢竟客戶端需要將整包 JS 進行編譯後才能正確渲染)
為了避免編譯過程中瀏覽器出現白畫面，通常就需要多為其添加 loading 效果
在 ClientOnly 標籤的部分可以通過 Nuxt 提供的 templatr#fallback 標籤來處理：
```htmlembedded
<template>
  <li>
    <NuxtLink to="`/cars/${car.name}-${car.id}`">
      {{ car.name }}
    </NuxtLink>
    <ClientOnly>
      <img 
        class="mx-3" 
        width="24" 
        @click.stop="emit('favor', car.id)" 
        :src="favored ? heartFilled : heartOutline" 
      />
      <template #fallback>
        <p>Loading ...</p>
      </template>
    </ClientOnly>
  </li>
</template>
```
而在 `.client.vue` 檔案中，則可以通過新增一個同名稱的 `.server.vue` 檔案作為 loading：
```htmlembedded
<!-- heart.client.vue -->

<template>
  <img 
    class="mx-3" 
    width="24" 
    @click.stop="emit('favor', car.id)" 
    :src="favored ? heartFilled : heartOutline" 
  />
</template>

<!-- heart.server.vue -->
<template>
  <p class="w-64 text-center">載入中，請稍候⋯</p>
</template>
```

待續。