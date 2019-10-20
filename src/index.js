import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { useTranslation, initReactI18next } from "react-i18next";
// import i18n from "i18next";
import { LocaleProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import DocumentTitle from 'react-document-title'

moment.locale('zh-cn');

ReactDOM.render(
  // <I18nextProvider i18n={ i18n }>
  <DocumentTitle title="RWG PLATFORM">
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </DocumentTitle>
  // </I18nextProvider>
  , document.getElementById('root'));

serviceWorker.unregister();
