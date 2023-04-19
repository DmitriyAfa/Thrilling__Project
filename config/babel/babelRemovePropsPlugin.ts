/**
 * Самописный плагин для babel который будет удалять из prod-сборки ненужные нам аттрибуты.
 * Такие атрибуты нужны только на этапе разработки (тестирование и т.д.).
 * По документации babel plugin development (https://babeljs.io/docs/plugins/#plugin-development)
 *
 */

import { PluginItem } from '@babel/core';

// eslint-disable-next-line func-names
export default function (): PluginItem {
  return {
    visitor: {
      /*
        Укажем глобально ноду Program. Данная нода нужна чтобы мы могли прокидывать в
        наш плагин какие-либо пропсы.
        Данные пропсы будут аттрибутами которые нужно убрать из prod-сборки
      */
      Program(path, state) {
        const forbidden = state.opts.props || [];

        // пройдемся по всем нодам этого дерева
        path.traverse({
          // укажем тип ноды
          JSXIdentifier(current) {
            // из множества jsx identifire найдем тот, что нам нужен
            const nodeName = current.node.name;

            if (forbidden.includes(nodeName)) {
              // удаляем ноду
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}