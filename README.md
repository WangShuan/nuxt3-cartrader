# 使用 `Nuxt3` 創建一個汽車交易頁面

原始碼連結：https://github.com/WangShuan/nuxt3-cartrader

筆記連結：https://hackmd.io/TAfW4kq-TJCQMLNfEYHaJg?view

## 創建 `Nuxt` 項目

開啟終端機，於想生成項目資料夾的位置執行指令：

`npx nuxi create cartrader`

完成後 `cd cartrader` 進入項目資料夾，
執行 `npm install` 安裝依賴項目，
最後執行 `npm run dev` 開始運行項目，
並於 `http://localhost:3000/` 顯示 `Nuxt3` 畫面。

## pages 路由

在 `Nuxt3` 中，路由是依照特定模式自動建立好的，
該模式要求我們於項目根目錄中新增名為 `pages` 的資料夾，
並在 `app.vue` 這隻主要的 `.vue` 檔案中改寫為：

```htmlembedded=
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

接著於 `pages` 資料夾中新增檔案就會自動產生對應路由了。

以該專案為例，主要的路由規則如下：

- `pages` 底下的每個 `.vue` 檔案名稱即表示路徑名稱
  - 所以假設檔案為 `/pages/about.vue`，則在網址中輸入 `/about` 即可開啟 `about.vue` 檔案顯示頁面
- 網址中的每個 `/` 就表示一個資料夾
  - 所以假設網址路徑為 `/city/cars` 則 `city` 就會是 `pages` 底下的資料夾
  - 而資料夾 `city` 底下則會有 `cars.vue` 檔案顯示該頁面
- 動態路由 `/city/:city/cars` 的建立方式為將參數 `city` 用 `[]` 包裹
  - 即新增資料夾 `[city]` 於 `/pages/city` 底下，並於 `/pages/city/[city]` 底下新增 `cars.vue` 檔案顯示頁面
- 假設 `/city/[city]/cars/[brand]` 是篩選位於該城市的特定品牌的汽車，即表示最後的這個 `[brand]` 是可選路徑
  - 當動態路由是可選的，則比原本的動態路由再幫參數多包一層 `[]` 即可
  - 所以最終應該要建立一個 `/city/[city]/cars/[[brandName]].vue` 檔案

### 頁面架構設定

- 首頁： `/`
  - 預設一張車輛大抵圖當作背景，顯示所有城市＆廠牌的連結按鈕，
  - 點擊連結按鈕後跳轉到車輛列表頁面，顯示選中的城市或廠牌底下的所有車輛。
- 車輛列表頁面： `/city/[城市]/cars/[廠牌]`
  - 最上方有篩選器，可下拉選擇城市、廠牌；可輸入價格上限、下限篩選車輛。
  - 下方顯示車輛卡片，可直接點擊車輛圖片，跳轉到車輛細節頁面。
- 車輛細節頁面： `/cars/[車輛id]-[車輛name]`
  - 顯示車輛大圖、特性、描述，最下方有聯絡表單可留言給賣家。
- 登入/註冊頁面： `/login`
  - 建立及登入帳號，以發布車輛或查看已發布車輛的留言內容。
  - 可用純電子信箱與密碼登入註冊、也可用 Google 帳號快速登入註冊。
- 個人頁面： `/account/listings`
  - 最上方有新增按鈕，可點擊新增按鈕跳轉到建立車輛頁面以上架新車輛。
  - 下方顯示所有已發布車輛卡片、可點擊車輛圖片，跳轉到車輛細節頁面；
  - 可點擊刪除按鈕，刪除已發布車輛、可點擊查看回覆按鈕，跳轉至車輛所有留言頁面。
- 建立車輛頁面： `/account/listings/create`
  - 有表單可輸入車輛所有資訊、有圖片上傳功能，可選擇本地檔案上傳至資料庫以獲取＆顯示圖片連結。
- 所有留言頁面： `/account/listings/view/[車輛id]`
  - 顯示當前車輛的所有表單留言卡片內容。

最終檔案層級參考如下圖：
![](https://hackmd.io/_uploads/rktDdP8c3.png)

## layouts 佈局

在 `Nuxt3` 中，可自定義佈局以減少重複的程式碼，
最常見的就是將 header 與 footer 獨立出來成為 layout 內容，
其設定方式要求我們於項目根目錄中新增名為 `layouts` 的資料夾，
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

而在 `layouts` 資料夾中則可新增檔案 `default.vue` 撰寫佈局架構，

舉例如下：

```htmlembedded=
<template>
  <!-- 添加共用的 navbar 元件 -->
  <NavBar />
  <!-- 添加 slot 插槽指定顯示內容的位置 -->
  <slot />
</template>
```

除了預設的 `default.vue` 檔案外，
也可在其他有重複佈局的地方新增客製化佈局，
舉例來說每個頁面的 `container` 都是固定的 `div` 搭配 `class`，
此時可以新增檔案 `custom.vue` 將 `container` 做成客製化佈局：

```htmlembedded=
<template>
  <NavBar />
  <div class="mx-auto max-w-[100%] sm:max-w-[75%] 2xl:max-w-[800px]">
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

在 `Nuxt3` 中，可將程式碼獨立拉出成為元件以便於單獨管理，
其設定方式要求我們於項目根目錄中新增名為 `components` 的資料夾，
接著建立檔案，
檔案名稱建議使用大駝峰的方式設置(`FooBar.vue`)，
也可通過 - 連結單字的方式設置(`foo-bar.vue`)

舉例來說，可建立元件 `TheHeader.vue` 存放 header 區塊的程式碼，
並在需要使用 header 元件的地方，通過以下方式使用：

```htmlembedded=
<template>
  <TheHeader />
  <!-- 也可以通過 <the-header /> 使用 -->
</template>
```

>在原本的 `Vue.js` 中需要先 import `.vue` 檔案，
>才可通過 `<TheHeader />` 的方式使用元件，
>但在 `Nuxt3` 中，則將 import 的步驟改為自動引入，
>所以不需先 import `.vue` 檔案即可使用元件。

另外元件的名稱將會使用目錄的路徑＋檔案名稱，並自動刪除重複的字段，
所以假設有多個元件的名稱帶有重複單字，比如 `DetailSidebar.vue` `DetailCard.vue`，
則可以在 `components` 的資料夾中新增 `detail` 資料夾，
並將 `DetailSidebar.vue` `DetailCard.vue` 改為 `Sidebar.vue` `Card.vue`，
最後把放置 `Sidebar.vue` `Card.vue` 檔案放於 `detail` 資料夾中，
使用時元件的名稱依舊會是 `<DetailSidebar />` `<DetailCard />`

## `composables` 組合式函數

在 `Nuxt3` 中，可以將重複使用到的函數拉出成為組合式函數，
其設定方式要求我們於項目根目錄中新增名為 `composables` 的資料夾，
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

另外針對獲取車輛資料的部分，
首先需建立一個檔案 `useCars.js`，
接著在項目根目錄中新增 `data` 資料夾，建立一支存放車輛資料的 `cars.json` 檔案，
最後在 `useCars.js` 中撰寫讀取 `json` 內容的方法並進行導出：

```javascript=
import cars from '@/data/cars.json'; // 所有車輛數據
import makes from '@/data/makes.json'; // 所有廠牌數據
import listings from '@/data/listings.json'; // 個人建立的車輛數據
import cities from '@/data/cities.json'; // 所有城市數據

export const useCars = () => {
  const toZh = (city) => cities.find(item => item.value === city).name // 這個用來獲取城市中文名稱

  return { toZh, cars, makes, listings, cities };
}
```

> 以上 data 可在[原始碼](https://github.com/WangShuan/nuxt3-cartrader)中獲取

## `useHead`

`useHead()` 是 `Nuxt3` 提供的 `composable`，
其最常被用於設置網頁的 title

另外也可設置以下內容：

- base：同 meta tag 中的 `base` 標籤
- link：同 meta tag 中的 `link` 標籤
- meta：同 meta tag 中的 `meta` 標籤
- style：同 meta tag 中的 `style` 標籤
- script：同 meta tag 中的 `script` 標籤
- noscript：同 meta tag 中的 `noscript` 標籤
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
      href: 'https://cdnjs.com/normalize.min.css' // 設置 link 標籤中的 href 值
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

在創建 `Nuxt3` 項目後，預設提供了一個錯誤頁面，
對於常規的錯誤處理可使用預設的頁面滿足大部分需求，
假設需要自定義錯誤頁面則可於項目根目錄中新增檔案 `error.vue`

針對錯誤， `Nuxt3` 提供了 `useError()` 的 `composable`，
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

>`statusCode`: HTTP 狀態碼(400/403/404/500/502 etc.)。
>`statusMessage`: HTTP 狀態碼對應的提示訊息(Internal Server Error etc.)。
>`message`: 錯誤訊息。

### `createError` & `clearError`

除此之外，也可以使用 `createError` 自定義錯誤內容：

```htmlembedded=
<script setup>
const routePars = useRoute().params;
const cars = useCars();
const car = computed(() => cars.find(item => item.id == routePars.id));

if (!car.value) { // 當 car 不存在
  throw createError({ // 拋出自定義錯誤，Nuxt 將自動切換為錯誤頁面
    statusCode: 404, // 設置狀態碼
    message: `Car "${routePars.name}-${routePars.id}" not found.` // 設置錯誤訊息
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

### `CSR` 錯誤處理

使用 `<NuxtErrorBoundary>` 標籤，將頁面內容包裹，
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

## `SSR`/`CSR`/`UR` 渲染方式速看

### 伺服器渲染 - `SSR`(Server-Side Rendering)

Server 提供完整的 `HTML` `CSS` `JS` 檔案給瀏覽器，
瀏覽器可以直接進行渲染而不需要任何解析與處理，
所以在瀏覽器中幾乎是馬上就跑出畫面。

當切換到不同頁面時，瀏覽器需要再次向服務端發送請求，
而服務端則針對當前頁面再次提供完整的 `HTML` `CSS` `JS` 檔案進行渲染。

### 客戶端渲染 - `CSR`(Client-Side Rendering)

Server 提供空的 HTML 與一整包 JS，
瀏覽器解析 `JS` 從而進行繪製 HTML 以及渲染，
在瀏覽器編譯 `JS` 的過程中需要等待。

舉例來說 `Vue.js` 提供的 HTML 只有一個 `<div id="app"></div>`，
接著瀏覽器藉由整包 `JS` 把所有內容建立出來。

當切換到不同頁面時，因 `JS` 已經獲取了所有邏輯，
所以實際上不需要再向服務端發送請求，
而是可以直接將當前元件移除並重新生成元件。

### 通用渲染 - `UR`(Universal Rendering)

Server 會先提供當前頁面的完整 `HTML`，讓瀏覽器繪製出 `UI` 但無法進行交互，
接著過一段時間後 Server 會再提供 `JS`，
藉由編譯 `JS` 使 `UI` 產生交互，
該解析 `JS` 與產生 `UI` 交互的過程被稱為 `Hydration`，
這正是 `nuxt` 使用的渲染方式，結合了一部分的 `SSR` 以及一部分的 `CSR`。

## Modules

### 安裝 `tailwindcss` 以使用 `Tailwind CSS` 快速設定樣式

開啟終端機，於項目根目錄中執行：
`npm install --save-dev @nuxtjs/tailwindcss@6.1.3`

接著開啟項目中的 `nuxt.config.ts` 檔案，
改寫為以下內容：

```typescript=
export default defineNuxtConfig({
  modules: [ // 新增 modules 為數組
    '@nuxtjs/tailwindcss' // 新增第三方套件於此
  ]
})
```

最後於終端機中按下 Control+C 關閉運行中的 `Nuxt3` 項目，
重新執行指令 `npm run dev` 以確保成功獲取 `nuxt.config.ts` 檔案的設定。
完成後即可開始在網頁中使用 `tailwindcss` 設定樣式。

### 安裝 `image` 以使用 `<NuxtImg/>` 處理圖片

開啟終端機，於項目根目錄中執行：
`npm install -D @nuxt/image-edge`

接著開啟項目中的 `nuxt.config.ts` 檔案，
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

最後於終端機中按下 Control+C 關閉運行中的 `Nuxt3` 項目，
重新執行指令 `npm run dev` 以確保成功獲取 `nuxt.config.ts` 檔案的設定。

使用方式：

1. 將 `<img />` 標籤改為 `<NuxtImg />` 標籤
2. 加上 `preload` 屬性讓重要的圖片優先載入
3. 加上 `loading="lazy"` 屬性實現懶加載
4. 加上 `sizes="sm:100vw md:50vw lg:400px"` 設置響應式圖片尺寸
5. 加上 `format="webp"` 設置圖片格式

### 安裝 `Vueuse` 以使用 `useLocalStorage` 保存數據

開啟終端機，於項目根目錄中執行：
`npm i -D @vueuse/nuxt @vueuse/core`

接著開啟項目中的 `nuxt.config.ts` 檔案，
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

最後於終端機中按下 Control+C 關閉運行中的 `Nuxt3` 項目，
重新執行指令 `npm run dev` 以確保成功獲取 `nuxt.config.ts` 檔案的設定。

以本專案來說，我們可以在每個顯示車輛資料的 `CarCard` 元件中，
通過使用 `useLocalStorage` 的方式，保存當前車輛是否有被點擊愛心，
並根據 `useLocalStorage` 切換愛心圖片為填滿或是純線框的狀態。

使用方式如下：

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
此時如果重整畫面，會發現愛心恢復為全空的狀態，但 `LocalStorage` 確實有保存到數據，
這是因為 Cards 是通過服務端渲染，但 `LocalStorage` 為客戶端的資訊。

對於該狀況有以下兩種解決方法：

1. 藉由 `Nuxt` 提供的 `ClientOnly` 標籤將愛心包起來，讓 `Nuxt` 知道該區塊的程式碼要使用客戶端渲染
2. 將愛心抽離出來成為獨立元件 `heart.vue` ，並為該元件重置後綴名稱，更改為 `heart.client.vue` 讓 `Nuxt` 知道該元件要使用客戶端渲染

而針對客戶端渲染，則又有個附帶的問題會產生，
由於客戶端渲染會執行的比服務端慢(畢竟客戶端需要將整包 `JS` 進行編譯後才能正確渲染)，
為了避免編譯過程中瀏覽器出現白畫面，通常就需要多為其添加 loading 效果，
在 `ClientOnly` 標籤的部分可以通過 `Nuxt` 提供的 `templatr#fallback` 標籤來處理：

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

這部分在 `.client.vue` 檔案中，則可以通過新增一個同名稱的 `.server.vue` 檔案作為 loading：

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

## 串接 Supabase

首先到 Supabase 官網進行註冊，可用 github 快速註冊。
（若使用信箱進行註冊，要記得收驗證信才可以開始使用哦！）

接著會進入 Supabase 的 Dashboard 頁面，請直接點擊左上角的新增專案，

Name 是專案名稱，這邊可以設為 `nuxt3-cartrader` 或其他你可識別的名稱。

Database Password 是資料庫密碼，這部分由於對安全性要求很高，建議直接點擊自動產生（但要記得先複製起來放在自己知道的地方哦！）

Region 是服務位置，可以選新加坡或東京，離你所在位置近的都可以～

Pricing Plan 預設是用免費方案，免費方案最多可以建立兩個 Project （練習用的專案就不要花冤望錢了，不夠用就再註冊新帳號～）

全部填寫完成後就可以點擊右下角的建立專案了～

### 安裝與設置 Supabase

可參考官網教學進行： <https://supabase.nuxtjs.org/get-started>

開啟終端機，於項目根目錄中執行：
`npm install @nuxtjs/supabase --save-dev`

接著開啟項目中的 `nuxt.config.ts` 檔案，
改寫為以下內容：

```typescript=
export default defineNuxtConfig({
  modules: [
    '@nuxt/image-edge', 
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/supabase', // 新增這行
  ]
})
```

接著在項目根目錄中新增 `.env` 檔案，存放以下內容：

```bash=
SUPABASE_URL=https://example.url
SUPABASE_KEY=your_project_api_key
```

> SUPABASE_URL 在 Supabase 控制台點擊進入 Setting > API 拷貝 Project URL
> SUPABASE_KEY 在 Supabase 控制台點擊進入 Setting > API 拷貝 Project API keys

最後於終端機中按下 Control+C 關閉運行中的 `Nuxt3` 項目，
重新執行指令 `npm run dev` 以確保成功獲取 `nuxt.config.ts` 檔案的設定。

### 使用 Auth 處理登入/註冊

接著回到 Supabase 控制台中，從左側 icon 選單點擊進入 Authentication 頁面，
接著在左側會看到『Providers』，點進去可以看到各種種類的供應商，
預設會開啟 Email，表示可以用 Email 與密碼的方式進行登入與註冊
（默認情況下會啟用信箱驗證，這個可以點擊展開 Email 設定，並手動關閉）

接著這邊需要再手動追加開啟 Google 登入方式，
點擊啟用 Google 後，會看到一堆不知道要輸入什麼內容的欄位，先別關閉，
此時我們先另開新視窗，搜尋並進入 Google Cloud 頁面，
然後用你的 Google 帳號快速的註冊並登入，
最後新增一個專案用來設定 Google 登入註冊服務
（過程中可能需要輸入信用卡等資訊，但練習的用量通常都不會達到要收費的地步請放心）

接著在 Google Cloud 的主控台中，直接輸入並搜尋 oauth，點擊搜尋結果中的『憑證』以進入憑證頁面
（也可以直接在左側選單點擊 API 與服務裏面的憑證，進入憑證頁面）
接著點擊左上角的『建立憑證』，並選擇建立『OAuth 用戶端 ID』，
應用程式類型選擇『網頁應用程式』，下方會出現填寫欄位，先別關閉，
這邊我們要回到 Supabase 拷貝『Callback URL (for OAuth)』，
然後將拷貝內容貼到 Google Cloud 裏面的『已授權的重新導向 URI』中，最後即可點擊右下角建立憑證。

完成後會有彈窗顯示用戶端編號、密鑰、以及下載 json 檔案等按鈕，
請依序將用戶端編號、密鑰拷貝下來，並貼到 Supabase 的『Client ID (for OAuth)』與『Client Secret (for OAuth)』中，
最後就可以點擊右下角的 Save 完成 Google 登入設定了！

現在即可開始串接登入與註冊事件：
首先要新增並撰寫 `/pages/login.vue` 檔案，
針對 Email 登入/註冊簡單建立個 form 表單，
裏面要有 email 與 password 輸入框以及登入、註冊按鈕，共四個元素，
接著再新增一個 Google 登入按鈕即可。

登入/註冊的 api 使用如下：
```javascript=
// 引入 supabase
const supabase = useSupabaseClient();
// 新增 v-model 用的 email 與 password
const email = ref('')
const password = ref('')

// 撰寫登入事件
const loginByEmail = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    return alert(error);
  }

  navigateTo('/')
}

// 撰寫註冊事件
const signUp = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    return alert(error)
  }
  alert('註冊成功！')
  loginByEmail()
}

// 撰寫 Google 登入事件
const loginByGoogle = async () => {
  const { error } = supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    return alert(error);
  }
};
```

待續⋯