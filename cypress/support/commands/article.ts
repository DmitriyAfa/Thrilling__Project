/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  title: 'TESTIN ARTICLE',
  subtitle: 'TESTIN subtitle',
  img: 'https://avatars.mds.yandex.net/get-zen_doc/2746556/pub_5f50dd7e1a1ddf4776aa5569_5f50decd2506f211d1de6284/scale_1200',
  views: 1022,
  createdAt: '26.02.2022',
  userId: '1',
  type: [
    'SCIENCE',
  ],
  blocks: [],
};

export const createArticle = (article?: Article) => cy.request({
  method: 'POST',
  url: 'http://localhost:8000/articles',
  headers: { Authorization: 'assda' },
  body: article ?? defaultArticle,
}).then((response) => response.body);

export const removeArticle = (articleId: string) => cy.request({
  method: 'DELETE',
  url: `http://localhost:8000/articles/${articleId}`,
  headers: { Authorization: 'assda' },
});

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}