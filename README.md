# 我的餐廳清單(CRUD)

![image](https://github.com/ciao0603/restaurant-list-CRUD/blob/main/restaurantList.png)

這是一份餐廳收藏清單，登入後可根據個人喜好進行增減/搜尋餐廳、瀏覽詳細資訊、查詢Google地圖等功能。

## 目錄

- [功能](#功能)
- [環境](#環境)
- [安裝](#安裝)
- [開發工具](#開發工具)

## 功能

- **使用者登入：** 使用者可以進行註冊登入並建立自己的餐廳清單，也可利用Facebook直接登入。

- **瀏覽餐廳：** 使用者可以瀏覽餐廳清單，查看餐廳的詳細資訊，包括名稱、菜式類型、電話號碼和評分等。

- **搜尋餐廳：** 應用程式提供搜尋功能，讓使用者可以根據餐廳的名稱或菜式類型進行搜尋。

- **查看餐廳位置：** 連結Google地圖，使用者可以查看餐廳所在地。

- **新增/刪除/編輯餐廳：** 使用者可以根據個人喜好自由編輯清單內容。

## 環境
請先確保已安裝 Node.js 和 npm 。

## 安裝

1. 將專案clone到本地:
```
git clone (https://github.com/ciao0603/restaurant-list-CRUD.git)
```
2. 在本地開啟專案:
```
cd restaurant-list-CRUD
```
3. 下載相關套件:
```
npm i
```
4. 參考.env範例設定環境變數:
```
MONGODB_URI=mongodb://localhost/restaurant
SESSION_SECRET=IAmSessionSecret
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
PORT=3000
```
5. 載入種子資料:
```
npm run seed
```
6. 啟動專案:
```
npm run start
```
7. 如果看到這行字代表啟動成功，輸入網址即可進入應用程式:
```
Express is listening on http://localhost:3000
```
8. 確認資料庫是否連線成功:
```
// 連線成功
mongoDB connected
// 連線失敗
mongoDB error
```
9. 如需停止請輸入
```
ctrl+C
```

## 開發工具
+ Node.js 18.16.1
+ Express 4.18.2
+ Express-Handlebars 4.0.2
+ Bootstrap 5.1.3
+ Font-awesome 5.8.1
+ MongoDB
+ Mongoose 7.3.1
+ Dotenv 16.3.1
+ Method-override 3.0.0
+ Bcryptjs 2.4.3
+ Connect-flash 0.1.1
+ Express-session 1.17.1
+ Passport 0.4.1
+ Passport-local 1.0.0
+ Passport-facebook 3.0.0