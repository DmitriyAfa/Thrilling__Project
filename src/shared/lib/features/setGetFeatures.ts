import { FeatureFlags } from '@/shared/types/featureFlags';

/*
Подразумевается, что фича-флаги в течении одной сессии не могут меняться. Поэтому
флаги не сохраняем в state или в контекст.
Если флаг помняется, то ре-рендера не произойдет так как реакт не подписан на изменения переменных.
Примечание. Обычно в рамках одной сессии фичи не меняются.
*/

let featureFlags: FeatureFlags;

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags?.[flag];
}